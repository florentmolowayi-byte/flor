import {
  UserLearningProfile,
  ExercisePerformance,
  SkillCategory,
  SkillProficiency,
  UserState,
  Exercise,
  Lesson,
} from '../types';

/**
 * Adaptive Learning Service
 * Analyzes user performance and provides AI-powered personalized learning paths
 * inspired by Duolingo's adaptive algorithm
 */

const SKILL_CATEGORIES: SkillCategory[] = ['vocabulary', 'grammar', 'listening', 'speaking', 'comprehension'];

/**
 * Initialize a learning profile for a new user
 */
export function initializeLearningProfile(userId?: string): UserLearningProfile {
  const skillProficiencies: Record<SkillCategory, SkillProficiency> = {} as Record<SkillCategory, SkillProficiency>;

  SKILL_CATEGORIES.forEach((skill) => {
    skillProficiencies[skill] = {
      skill,
      proficiency: 0, // 0-100
      mastery: 0, // 0-100
      lastPracticedDate: new Date().toISOString(),
      exerciseCount: 0,
      correctAnswers: 0,
      weakTopics: [],
    };
  });

  return {
    userId,
    skillProficiencies,
    exerciseHistory: [],
    lastAnalyzedDate: new Date().toISOString(),
    recommendedNextLessons: [],
    recommendedDifficulty: 'easy',
    learningPace: 'normal',
    consistencyScore: 0,
    focusAreas: SKILL_CATEGORIES,
  };
}

/**
 * Record exercise performance and update skill proficiencies
 */
export function recordExercisePerformance(
  profile: UserLearningProfile,
  performance: ExercisePerformance,
): UserLearningProfile {
  // Add performance to history
  const updatedProfile = { ...profile };
  updatedProfile.exerciseHistory = [...(profile.exerciseHistory || []), performance];

  // Update skill proficiencies based on performance
  performance.skillTags.forEach((skillTag) => {
    const skill = skillTag as SkillCategory;
    if (skillTag in profile.skillProficiencies) {
      const skillProf = profile.skillProficiencies[skill];
      skillProf.exerciseCount += 1;

      if (performance.correct) {
        skillProf.correctAnswers += 1;
        // Increase proficiency based on difficulty
        const difficultyMultiplier = {
          easy: 2,
          medium: 4,
          hard: 8,
        }[performance.difficulty];

        skillProf.proficiency = Math.min(100, skillProf.proficiency + difficultyMultiplier);
        skillProf.mastery = Math.min(100, skillProf.mastery + difficultyMultiplier / 2);
      } else {
        // Slight proficiency decrease on wrong answer
        skillProf.proficiency = Math.max(0, skillProf.proficiency - 1);
      }

      skillProf.lastPracticedDate = performance.timestamp;
    }
  });

  // Recompute learning metrics
  return recomputeLearningMetrics(updatedProfile);
}

/**
 * Recompute all learning metrics based on exercise history
 */
export function recomputeLearningMetrics(profile: UserLearningProfile): UserLearningProfile {
  const updatedProfile = { ...profile };
  const now = new Date();

  // Identify weak skills and topics
  const focusAreas: SkillCategory[] = [];
  Object.values(updatedProfile.skillProficiencies).forEach((skillProf) => {
    if (skillProf.proficiency < 60) {
      focusAreas.push(skillProf.skill);
    }
    // Identify weak topics based on error rate
    if (skillProf.exerciseCount > 0) {
      const errorRate = 1 - skillProf.correctAnswers / skillProf.exerciseCount;
      if (errorRate > 0.3) {
        // 30% error rate or higher indicates weakness
        skillProf.weakTopics = skillProf.weakTopics.slice(0, 3); // Keep top 3 weak topics
      }
    }
  });

  updatedProfile.focusAreas = focusAreas;

  // Determine learning pace based on exercise frequency
  const recentExercises = profile.exerciseHistory.filter((e) => {
    const exerciseDate = new Date(e.timestamp);
    return now.getTime() - exerciseDate.getTime() < 7 * 24 * 60 * 60 * 1000; // Last 7 days
  });

  if (recentExercises.length < 5) {
    updatedProfile.learningPace = 'slow';
  } else if (recentExercises.length > 20) {
    updatedProfile.learningPace = 'fast';
  } else {
    updatedProfile.learningPace = 'normal';
  }

  // Calculate consistency score (0-100)
  const lastExerciseDate = profile.exerciseHistory.length > 0 ? new Date(profile.exerciseHistory[profile.exerciseHistory.length - 1].timestamp) : now;
  const daysSinceLastExercise = (now.getTime() - lastExerciseDate.getTime()) / (24 * 60 * 60 * 1000);
  updatedProfile.consistencyScore = Math.max(0, 100 - daysSinceLastExercise * 5);

  updatedProfile.lastAnalyzedDate = now.toISOString();

  return updatedProfile;
}

/**
 * Determine recommended difficulty based on recent performance
 */
export function calculateRecommendedDifficulty(profile: UserLearningProfile): 'easy' | 'medium' | 'hard' {
  if (profile.exerciseHistory.length < 5) return 'easy';

  // Look at last 10 exercises
  const recentExercises = profile.exerciseHistory.slice(-10);
  const correctRate = recentExercises.filter((e) => e.correct).length / recentExercises.length;

  if (correctRate > 0.85) return 'hard';
  if (correctRate < 0.6) return 'easy';
  return 'medium';
}

/**
 * Get learning insights and summary for UI display
 */
export function getLearningInsights(profile: UserLearningProfile) {
  const strongSkills = Object.values(profile.skillProficiencies)
    .filter((s) => s.proficiency > 70)
    .map((s) => s.skill);

  const weakSkills = Object.values(profile.skillProficiencies)
    .filter((s) => s.proficiency < 50)
    .map((s) => s.skill);

  const totalExercises = profile.exerciseHistory.length;
  const correctExercises = profile.exerciseHistory.filter((e) => e.correct).length;
  const overallAccuracy = totalExercises > 0 ? Math.round((correctExercises / totalExercises) * 100) : 0;

  return {
    strongSkills,
    weakSkills,
    overallAccuracy,
    totalExercises,
    consistencyScore: Math.round(profile.consistencyScore),
    learningPace: profile.learningPace,
    recommendedDifficulty: calculateRecommendedDifficulty(profile),
  };
}

/**
 * Filter and sort exercises based on user's learning profile
 * Prioritizes exercises that target weak areas
 */
export function getPersonalizedExerciseOrder(
  exercises: Exercise[],
  profile: UserLearningProfile,
): Exercise[] {
  const sorted = [...exercises];

  sorted.sort((a, b) => {
    let scoreA = 0;
    let scoreB = 0;

    // Prioritize exercises that target weak areas
    a.skillTags?.forEach((tag) => {
      if (profile.focusAreas.includes(tag as SkillCategory)) {
        scoreA += 10;
      }
    });

    b.skillTags?.forEach((tag) => {
      if (profile.focusAreas.includes(tag as SkillCategory)) {
        scoreB += 10;
      }
    });

    // Prefer recommended difficulty
    const recommendedDiff = calculateRecommendedDifficulty(profile);
    if (a.difficulty === recommendedDiff) scoreA += 5;
    if (b.difficulty === recommendedDiff) scoreB += 5;

    // Prefer exercises the user hasn't seen recently
    // (This would need exercise history tracking)

    return scoreB - scoreA; // Higher score first
  });

  return sorted;
}

/**
 * Suggest next lesson based on current progress and weak areas
 */
export function suggestNextLessonPath(
  profile: UserLearningProfile,
  availableLessons: Lesson[],
  completedLessonIds: Set<string>,
): { lessons: Lesson[]; reason: string } {
  const uncompletedLessons = availableLessons.filter((l) => !completedLessonIds.has(l.id));

  if (uncompletedLessons.length === 0) {
    return { lessons: [], reason: 'All lessons completed! Continue practicing to strengthen your skills.' };
  }

  const focusSkills = profile.focusAreas;
  let recommendedLessons: Lesson[] = [];
  let reason = '';

  if (focusSkills.length > 0) {
    // Prioritize lessons that target weak areas
    recommendedLessons = uncompletedLessons.sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;

      a.exercises.forEach((ex) => {
        ex.skillTags?.forEach((tag) => {
          if (focusSkills.includes(tag as SkillCategory)) scoreA += 1;
        });
      });

      b.exercises.forEach((ex) => {
        ex.skillTags?.forEach((tag) => {
          if (focusSkills.includes(tag as SkillCategory)) scoreB += 1;
        });
      });

      return scoreB - scoreA;
    });

    reason = `Focus on ${focusSkills.join(' and ')} to strengthen your weaker areas.`;
  } else {
    recommendedLessons = uncompletedLessons;
    reason = 'Continue with the next lesson in your learning path.';
  }

  return {
    lessons: recommendedLessons.slice(0, 3), // Return top 3 recommendations
    reason,
  };
}

/**
 * Analyze user performance over time and provide actionable feedback
 */
export function generateAdaptiveFeedback(profile: UserLearningProfile): string {
  const insights = getLearningInsights(profile);

  if (insights.totalExercises === 0) {
    return "Let's get started! Complete your first exercise to begin your personalized learning journey.";
  }

  let feedback = '';

  // Consistency feedback
  if (profile.consistencyScore > 80) {
    feedback += '🔥 You are on fire! Keep up the excellent consistency.\n';
  } else if (profile.consistencyScore < 30) {
    feedback += '⏰ Try to practice more regularly for better results.\n';
  }

  // Accuracy feedback
  if (insights.overallAccuracy > 80) {
    feedback += '💪 Excellent accuracy! You are mastering the material.\n';
  } else if (insights.overallAccuracy < 50) {
    feedback += '📚 Focus on the basics before moving forward. Try easier exercises first.\n';
  }

  // Skill-specific feedback
  if (insights.weakSkills.length > 0) {
    feedback += `📌 Weak areas to focus on: ${insights.weakSkills.join(', ')}\n`;
  }

  if (insights.strongSkills.length > 0) {
    feedback += `⭐ Strong areas: ${insights.strongSkills.join(', ')}\n`;
  }

  return feedback.trim();
}
