import {
  Language,
  Unit,
  PathNode,
  UserLearningProfile,
  SkillCategory,
} from '../types';

/**
 * Curriculum Sequencing Service
 * 
 * Manages continuous learning paths without repetition.
 * Tracks completed lessons, identifies skill gaps, and generates
 * the next appropriate lesson based on performance and prerequisites.
 */

export interface CurriculumProgress {
  completedLessonIds: Set<string>;
  completedTopics: Set<string>; // topic strings like "greetings", "past_tense"
  currentLessonId: string | null;
  nextRecommendedLessonId: string | null;
  completedUnitsCount: number;
  totalUnitsCount: number;
  progressPercentage: number; // 0-100
}

export interface LearningPathStep {
  lessonId: string;
  unitId: string;
  title: string;
  description: string;
  prerequisitesmet: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  skillGapsFilled: SkillCategory[];
  estimatedDuration: number; // minutes
  rationale: string; // why this lesson is recommended
}

/**
 * Extract curriculum progress from user's completed nodes
 */
export function getCurriculumProgress(
  completedNodes: Record<string, number>,
  languages: Language[],
  currentLanguage: string,
): CurriculumProgress {
  const completedLessonIds = new Set(Object.keys(completedNodes).filter((id) => completedNodes[id] > 0));
  const completedTopics = new Set<string>();

  // Find which topics have been learned
  const currentLanguageDef = languages.find((l) => l.id === currentLanguage);
  if (!currentLanguageDef) {
    return {
      completedLessonIds,
      completedTopics,
      currentLessonId: null,
      nextRecommendedLessonId: null,
      completedUnitsCount: 0,
      totalUnitsCount: 0,
      progressPercentage: 0,
    };
  }

  let totalLessons = 0;
  let completedLessonsCount = 0;

  currentLanguageDef.units.forEach((unit) => {
    unit.nodes.forEach((node) => {
      totalLessons++;
      if (completedNodes[node.id]) {
        completedLessonsCount++;
        // Extract topic from node title
        const topic = extractTopic(node.title);
        if (topic) {
          completedTopics.add(topic);
        }
      }
    });
  });

  // Count completed units (units where all lessons are done)
  let completedUnitsCount = 0;
  currentLanguageDef.units.forEach((unit) => {
    const allNodesDone = unit.nodes.every((node) => completedNodes[node.id]);
    if (allNodesDone) {
      completedUnitsCount++;
    }
  });

  return {
    completedLessonIds,
    completedTopics,
    currentLessonId: null,
    nextRecommendedLessonId: null,
    completedUnitsCount,
    totalUnitsCount: currentLanguageDef.units.length,
    progressPercentage: totalLessons > 0 ? Math.round((completedLessonsCount / totalLessons) * 100) : 0,
  };
}

/**
 * Find the next lesson the user should do
 * Respects prerequisites and prevents repetition
 */
export function getNextLesson(
  languages: Language[],
  currentLanguage: string,
  completedNodes: Record<string, number>,
  learningProfile?: UserLearningProfile,
): LearningPathStep | null {
  const currentLanguageDef = languages.find((l) => l.id === currentLanguage);
  if (!currentLanguageDef) return null;

  // Collect all available lessons
  const allLessons: Array<{ node: PathNode; unit: Unit; unitIndex: number }> = [];

  currentLanguageDef.units.forEach((unit, unitIndex) => {
    unit.nodes.forEach((node) => {
      if (node.type === 'lesson') {
        allLessons.push({ node, unit, unitIndex });
      }
    });
  });

  // Filter out completed lessons (prevent repetition)
  const uncompletedLessons = allLessons.filter(
    (lesson) =>
      !completedNodes[lesson.node.id] &&
      isPrerequisitesMet(lesson.node, lesson.unit, completedNodes, currentLanguageDef),
  );

  if (uncompletedLessons.length === 0) {
    // All lessons completed - user has finished the curriculum
    return null;
  }

  // Prioritize lessons based on multiple factors
  let bestLesson = uncompletedLessons[0];
  let bestScore = -Infinity;

  uncompletedLessons.forEach((lesson) => {
    let score = 0;

    // Factor 1: Linear progression (prefer earlier units)
    score += (100 - lesson.unitIndex) * 10;

    // Factor 2: Prerequisites met (check if previous lessons done)
    if (isPrerequisitesMet(lesson.node, lesson.unit, completedNodes, currentLanguageDef)) {
      score += 50;
    }

    // Factor 3: Matches weak skills from learning profile
    if (learningProfile && learningProfile.focusAreas.length > 0) {
      const lessonSkills = extractSkillsFromNodeTitle(lesson.node.title);
      const matchCount = lessonSkills.filter((skill) => learningProfile.focusAreas.includes(skill as SkillCategory))
        .length;
      score += matchCount * 30;
    }

    // Factor 4: Optimal difficulty progression
    if (learningProfile) {
      const avgProficiency =
        Object.values(learningProfile.skillProficiencies).reduce((sum, s) => sum + s.proficiency, 0) /
        Object.keys(learningProfile.skillProficiencies).length;

      if (avgProficiency < 30) {
        // Very early stage - prefer easy lessons
        if (lesson.node.type === 'lesson') score += 20;
      } else if (avgProficiency > 70) {
        // Advanced - prefer harder content
        if (lesson.node.type !== 'lesson') score += 20; // Checkpoints and practice
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestLesson = lesson;
    }
  });

  // Build recommendation step
  const skillGaps = learningProfile ? learningProfile.focusAreas : [];

  return {
    lessonId: bestLesson.node.id,
    unitId: bestLesson.unit.id,
    title: bestLesson.node.title,
    description: bestLesson.unit.description || '',
    prerequisitesmet: isPrerequisitesMet(bestLesson.node, bestLesson.unit, completedNodes, currentLanguageDef),
    difficulty: determineDifficulty(bestLesson.node, bestLesson.unitIndex),
    skillGapsFilled: skillGaps.slice(0, 2),
    estimatedDuration: bestLesson.node.totalSteps * 2, // ~2 minutes per step
    rationale: generateRecommendationRationale(bestLesson.node, bestLesson.unit, learningProfile),
  };
}

/**
 * Get the next N lessons in the learning path
 */
export function getNextLessonsSequence(
  languages: Language[],
  currentLanguage: string,
  completedNodes: Record<string, number>,
  learningProfile: UserLearningProfile | undefined,
  count: number = 5,
): LearningPathStep[] {
  const sequence: LearningPathStep[] = [];
  const modifiedCompletedNodes = { ...completedNodes };

  for (let i = 0; i < count; i++) {
    const next = getNextLesson(languages, currentLanguage, modifiedCompletedNodes, learningProfile);
    if (!next) break;

    sequence.push(next);
    // Simulate completion to get the next one
    modifiedCompletedNodes[next.lessonId] = 1;
  }

  return sequence;
}

/**
 * Check if all prerequisites for a lesson are met
 */
function isPrerequisitesMet(
  node: PathNode,
  unit: Unit,
  completedNodes: Record<string, number>,
  language: Language,
): boolean {
  // Find unit index
  const unitIndex = language.units.findIndex((u) => u.id === unit.id);
  if (unitIndex === 0) return true; // First unit has no prerequisites

  // Check if all lessons in previous units are completed
  for (let i = 0; i < unitIndex; i++) {
    const prevUnit = language.units[i];
    const allPrevCompleted = prevUnit.nodes.every((n) => completedNodes[n.id]);
    if (!allPrevCompleted) return false;
  }

  return true;
}

/**
 * Determine difficulty level based on progression
 */
function determineDifficulty(node: PathNode, unitIndex: number): 'beginner' | 'intermediate' | 'advanced' {
  if (unitIndex === 0) return 'beginner';
  if (unitIndex < 3) return 'intermediate';
  return 'advanced';
}

/**
 * Extract topic keywords from lesson title
 */
function extractTopic(title: string): string {
  // Convert title to lowercase and remove common words
  const cleaned = title.toLowerCase().replace(/lesson|lesson \d+|checkpoint|practice/gi, '').trim();
  return cleaned.replace(/[^a-z0-9_\s]/g, '').replace(/\s+/g, '_');
}

/**
 * Extract skill categories from node title
 */
function extractSkillsFromNodeTitle(title: string): string[] {
  const lowerTitle = title.toLowerCase();
  const skills: string[] = [];

  if (lowerTitle.includes('vocabulary') || lowerTitle.includes('vocab') || lowerTitle.includes('word')) {
    skills.push('vocabulary');
  }
  if (lowerTitle.includes('grammar') || lowerTitle.includes('verb') || lowerTitle.includes('tense')) {
    skills.push('grammar');
  }
  if (lowerTitle.includes('listening') || lowerTitle.includes('audio') || lowerTitle.includes('hear')) {
    skills.push('listening');
  }
  if (lowerTitle.includes('speaking') || lowerTitle.includes('speak') || lowerTitle.includes('pronunciation')) {
    skills.push('speaking');
  }
  if (lowerTitle.includes('comprehension') || lowerTitle.includes('reading') || lowerTitle.includes('understand')) {
    skills.push('comprehension');
  }

  return skills.length > 0 ? skills : ['vocabulary']; // Default to vocabulary
}

/**
 * Generate human-readable rationale for recommendation
 */
function generateRecommendationRationale(
  node: PathNode,
  unit: Unit,
  learningProfile?: UserLearningProfile,
): string {
  const reasons: string[] = [];

  if (!learningProfile) {
    reasons.push(`Continue with ${node.title} in ${unit.title}`);
    return reasons.join('. ');
  }

  // Check if it addresses weak areas
  const nodeSkills = extractSkillsFromNodeTitle(node.title);
  const relevantWeaks = nodeSkills.filter((s) => learningProfile.focusAreas.includes(s as SkillCategory));

  if (relevantWeaks.length > 0) {
    reasons.push(`Strengthen your ${relevantWeaks.join(' and ')} skills`);
  }

  // Check if it's optimal difficulty
  const avgProf =
    Object.values(learningProfile.skillProficiencies).reduce((sum, s) => sum + s.proficiency, 0) /
    Object.keys(learningProfile.skillProficiencies).length;

  if (avgProf < 40) {
    reasons.push('Building a solid foundation');
  } else if (avgProf > 70) {
    reasons.push('Challenge yourself with advanced content');
  }

  // Learning pace
  if (learningProfile.learningPace === 'fast') {
    reasons.push('Match your fast learning pace');
  }

  if (reasons.length === 0) {
    reasons.push(`Continue with ${node.title}`);
  }

  return reasons.join('. ') + '.';
}

/**
 * Check if user is ready for a checkpoint/test
 */
export function isReadyForCheckpoint(
  completedNodes: Record<string, number>,
  unit: Unit,
): boolean {
  // Check if all lesson nodes in unit are completed
  const lessonNodes = unit.nodes.filter((n) => n.type === 'lesson');
  return lessonNodes.length > 0 && lessonNodes.every((n) => completedNodes[n.id]);
}

/**
 * Get recommended review lessons based on weak areas
 */
export function getReviewLessonsForWeakAreas(
  languages: Language[],
  currentLanguage: string,
  completedNodes: Record<string, number>,
  learningProfile: UserLearningProfile,
  maxRecommendations: number = 3,
): PathNode[] {
  const currentLanguageDef = languages.find((l) => l.id === currentLanguage);
  if (!currentLanguageDef) return [];

  // Collect completed lessons
  const completedLessons: PathNode[] = [];

  currentLanguageDef.units.forEach((unit) => {
    unit.nodes.forEach((node) => {
      if (completedNodes[node.id] && node.type === 'lesson') {
        completedLessons.push(node);
      }
    });
  });

  if (completedLessons.length === 0) return [];

  // Score each completed lesson by relevance to weak areas
  const scoredLessons = completedLessons
    .map((lesson) => {
      let score = 0;
      const lessonSkills = extractSkillsFromNodeTitle(lesson.title);

      // Prioritize lessons addressing weak skills
      lessonSkills.forEach((skill) => {
        if (learningProfile.focusAreas.includes(skill as SkillCategory)) {
          score += 10;
        }
      });

      // Prefer lessons with lower proficiency
      const proficiencies = lessonSkills
        .map((s) => learningProfile.skillProficiencies[s as SkillCategory]?.proficiency || 50)
        .sort((a, b) => a - b);
      if (proficiencies[0]) {
        score += 100 - proficiencies[0]; // Lower proficiency = higher score
      }

      return { lesson, score };
    })
    .sort((a, b) => b.score - a.score);

  return scoredLessons.slice(0, maxRecommendations).map((s) => s.lesson);
}

/**
 * Calculate user's position in curriculum
 */
export function calculateCurriculumPosition(
  completedNodes: Record<string, number>,
  language: Language,
): {
  currentUnit: Unit | null;
  currentUnitIndex: number;
  lessonsCompletedInUnit: number;
  totalLessonsInUnit: number;
} {
  let latestUnitIndex = -1;
  let latestLessonCount = 0;

  // Find the latest unit with completed lessons
  language.units.forEach((unit, idx) => {
    const completedInUnit = unit.nodes.filter((n) => completedNodes[n.id]).length;
    if (completedInUnit > 0) {
      latestUnitIndex = idx;
      latestLessonCount = completedInUnit;
    }
  });

  if (latestUnitIndex === -1) {
    return {
      currentUnit: null,
      currentUnitIndex: 0,
      lessonsCompletedInUnit: 0,
      totalLessonsInUnit: 0,
    };
  }

  const currentUnit = language.units[latestUnitIndex];
  const totalLessons = currentUnit.nodes.filter((n) => n.type === 'lesson').length;

  return {
    currentUnit,
    currentUnitIndex: latestUnitIndex,
    lessonsCompletedInUnit: latestLessonCount,
    totalLessonsInUnit: totalLessons,
  };
}
