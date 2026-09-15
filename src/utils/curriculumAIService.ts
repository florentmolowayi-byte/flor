import { GoogleGenerativeAI } from '@google/genai';
import { Language, UserLearningProfile } from '../types';
import { LearningPathStep, getNextLesson, getNextLessonsSequence } from './curriculumSequencingService';

/**
 * AI Curriculum Generation Service
 * 
 * Uses Google Generative AI to create intelligent, personalized curriculum paths
 * that avoid repetition and adapt to student performance.
 */

let genAI: GoogleGenerativeAI | null = null;

export function getAIInstance(): GoogleGenerativeAI | null {
  return genAI;
}

export function setAIInstance(instance: GoogleGenerativeAI) {
  genAI = instance;
}

/**
 * Generate an optimized learning sequence for the student
 */
export async function generatePersonalizedCurriculum(
  languages: Language[],
  currentLanguage: string,
  completedNodes: Record<string, number>,
  learningProfile: UserLearningProfile | undefined,
  studentPerformanceSummary: string,
): Promise<{
  nextLesson: LearningPathStep | null;
  upcomingLessons: LearningPathStep[];
  curriculumStrategy: string;
  estimatedCompletionDate: string;
}> {
  // Get basic sequencing first (works without AI)
  const nextLesson = getNextLesson(languages, currentLanguage, completedNodes, learningProfile);
  const upcomingLessons = getNextLessonsSequence(languages, currentLanguage, completedNodes, learningProfile, 5);

  if (!genAI) {
    // Fallback to non-AI version
    return {
      nextLesson,
      upcomingLessons,
      curriculumStrategy: 'Linear progression through curriculum with performance-based adaptation.',
      estimatedCompletionDate: estimateCompletionDate(upcomingLessons),
    };
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
You are an expert curriculum designer for language learning. Create a personalized learning strategy for a student.

STUDENT PROFILE:
- Performance Summary: ${studentPerformanceSummary}
- Learning Pace: ${learningProfile?.learningPace || 'normal'}
- Consistency Score: ${learningProfile ? Math.round(learningProfile.consistencyScore) : 'N/A'}/100
- Focus Areas: ${learningProfile?.focusAreas.join(', ') || 'All skills'}
- Overall Accuracy: ${getLearningAccuracy(learningProfile)}%

COMPLETED LESSONS:
${Object.keys(completedNodes).filter((k) => completedNodes[k] > 0).length} lessons completed

RECOMMENDED NEXT STEPS:
1. Next Lesson: ${nextLesson?.title || 'Curriculum complete'}
2. Upcoming (2-5): ${upcomingLessons.map((l) => l.title).join(', ') || 'No upcoming lessons'}

Based on this profile, provide:
1. A concise curriculum strategy (2-3 sentences) explaining the personalized approach
2. Specific learning recommendations to maximize progress
3. Areas to focus on before moving to advanced content

Respond ONLY in this JSON format:
{
  "strategy": "Clear explanation of the personalized curriculum strategy...",
  "recommendations": ["recommendation 1", "recommendation 2", "recommendation 3"],
  "focusAreas": "Specific areas to work on..."
}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      const response = JSON.parse(jsonMatch ? jsonMatch[0] : responseText);

      return {
        nextLesson,
        upcomingLessons,
        curriculumStrategy: response.strategy || 'Continue with personalized learning path.',
        estimatedCompletionDate: estimateCompletionDate(upcomingLessons),
      };
    } catch (parseError) {
      return {
        nextLesson,
        upcomingLessons,
        curriculumStrategy: responseText.substring(0, 200),
        estimatedCompletionDate: estimateCompletionDate(upcomingLessons),
      };
    }
  } catch (error) {
    console.error('Error generating curriculum:', error);
    return {
      nextLesson,
      upcomingLessons,
      curriculumStrategy: 'Continue with personalized learning path based on your performance.',
      estimatedCompletionDate: estimateCompletionDate(upcomingLessons),
    };
  }
}

/**
 * Get AI suggestions for catching up on weak areas
 */
export async function generateRemediationPlan(
  weakAreas: string[],
  learningProfile: UserLearningProfile,
  language: Language,
): Promise<{
  plan: string;
  prioritizedTopics: string[];
  estimatedTimeWeeks: number;
}> {
  if (!genAI || weakAreas.length === 0) {
    return {
      plan: `Focus on strengthening: ${weakAreas.join(', ')}`,
      prioritizedTopics: weakAreas,
      estimatedTimeWeeks: 2,
    };
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
You are a language learning specialist creating a remediation plan.

WEAK AREAS: ${weakAreas.join(', ')}
LEARNER PROFILE:
- Consistency: ${Math.round(learningProfile.consistencyScore)}/100
- Learning Pace: ${learningProfile.learningPace}
- Language: ${language.name}

Create a specific remediation plan to strengthen these areas.

Respond ONLY in JSON:
{
  "plan": "Detailed remediation strategy...",
  "prioritizedTopics": ["topic1", "topic2", "topic3"],
  "estimatedWeeks": 2
}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      const response = JSON.parse(jsonMatch ? jsonMatch[0] : responseText);

      return {
        plan: response.plan,
        prioritizedTopics: response.prioritizedTopics,
        estimatedTimeWeeks: response.estimatedWeeks || 2,
      };
    } catch {
      return {
        plan: `Focus on: ${weakAreas.join(', ')}. Practice regularly to improve these skills.`,
        prioritizedTopics: weakAreas,
        estimatedTimeWeeks: 2,
      };
    }
  } catch (error) {
    console.error('Error generating remediation plan:', error);
    return {
      plan: `Work on: ${weakAreas.join(', ')}`,
      prioritizedTopics: weakAreas,
      estimatedTimeWeeks: 2,
    };
  }
}

/**
 * Get AI-powered progress analysis
 */
export async function getProgressAnalysis(
  learningProfile: UserLearningProfile,
  lessonsCompleted: number,
  totalLessons: number,
): Promise<string> {
  if (!genAI) {
    const percentage = Math.round((lessonsCompleted / totalLessons) * 100);
    return `You've completed ${percentage}% of the curriculum. ${learningProfile.learningPace === 'fast' ? 'Great pace!' : 'Keep going!'}`;
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
Provide brief, encouraging progress feedback for a language learner.

Progress: ${lessonsCompleted}/${totalLessons} lessons (${Math.round((lessonsCompleted / totalLessons) * 100)}%)
Pace: ${learningProfile.learningPace}
Consistency: ${Math.round(learningProfile.consistencyScore)}/100
Focus Areas: ${learningProfile.focusAreas.join(', ')}

Give 1-2 sentences of encouragement and next steps.`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    return `You're making great progress! Keep up the consistent practice.`;
  }
}

/**
 * Estimate curriculum completion date
 */
function estimateCompletionDate(upcomingLessons: LearningPathStep[]): string {
  if (upcomingLessons.length === 0) {
    return 'Curriculum complete!';
  }

  const totalMinutes = upcomingLessons.reduce((sum, lesson) => sum + lesson.estimatedDuration, 0);
  const minutesPerDay = 30; // Assume 30 minutes per day
  const daysNeeded = Math.ceil(totalMinutes / minutesPerDay);

  const completionDate = new Date();
  completionDate.setDate(completionDate.getDate() + daysNeeded);

  return completionDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Helper to get learning accuracy from profile
 */
function getLearningAccuracy(profile: UserLearningProfile | undefined): number {
  if (!profile || profile.exerciseHistory.length === 0) return 0;

  const correctCount = profile.exerciseHistory.filter((e) => e.correct).length;
  return Math.round((correctCount / profile.exerciseHistory.length) * 100);
}

/**
 * Get next milestone recommendation
 */
export async function getNextMilestoneRecommendation(
  completedUnits: number,
  totalUnits: number,
  learningProfile: UserLearningProfile,
): Promise<{
  milestone: string;
  daysToAchieve: number;
  actionItems: string[];
}> {
  const nextMilestoneUnit = completedUnits + 1;
  const progressPercent = Math.round((completedUnits / totalUnits) * 100);

  if (!genAI) {
    return {
      milestone: `Complete Unit ${nextMilestoneUnit}`,
      daysToAchieve: 7,
      actionItems: ['Complete all lessons in current unit', 'Pass the checkpoint test'],
    };
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
Suggest the next learning milestone for a student.

Progress: ${completedUnits}/${totalUnits} units (${progressPercent}%)
Pace: ${learningProfile.learningPace}
Consistency: ${Math.round(learningProfile.consistencyScore)}/100

Provide:
1. Specific milestone name
2. Estimated days to achieve
3. 3 action items to reach it

JSON format:
{
  "milestone": "...",
  "daysToAchieve": 7,
  "actionItems": ["item1", "item2", "item3"]
}`;

    const result = await model.generateContent(prompt);
    const jsonMatch = result.response.text().match(/\{[\s\S]*\}/);
    const response = JSON.parse(jsonMatch ? jsonMatch[0] : '{}');

    return {
      milestone: response.milestone || `Complete Unit ${nextMilestoneUnit}`,
      daysToAchieve: response.daysToAchieve || 7,
      actionItems: response.actionItems || ['Continue learning'],
    };
  } catch (error) {
    return {
      milestone: `Complete Unit ${nextMilestoneUnit}`,
      daysToAchieve: 7,
      actionItems: ['Complete all lessons', 'Pass the checkpoint', 'Review weak areas'],
    };
  }
}
