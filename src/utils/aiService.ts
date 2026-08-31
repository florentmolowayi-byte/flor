import { GoogleGenerativeAI } from '@google/genai';
import {
  UserLearningProfile,
  Exercise,
  Lesson,
  SkillCategory,
  ExercisePerformance,
  UserState,
} from '../types';
import { getLearningInsights } from './adaptiveLearningService';

/**
 * AI Service using Google Generative AI
 * Provides personalized learning recommendations and content generation
 */

let genAI: GoogleGenerativeAI | null = null;

export function initializeAIService() {
  const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY || process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) {
    console.warn('GOOGLE_AI_API_KEY not found. AI features will be limited.');
    return false;
  }
  genAI = new GoogleGenerativeAI(apiKey);
  return true;
}

/**
 * Generate personalized learning recommendations using AI
 */
export async function generateLearningRecommendations(
  profile: UserLearningProfile,
  availableLessons: Lesson[],
  userLanguage: string,
): Promise<{
  lessons: Lesson[];
  explanation: string;
  focusArea: SkillCategory | null;
}> {
  if (!genAI) {
    console.warn('AI service not initialized');
    return {
      lessons: availableLessons.slice(0, 3),
      explanation: 'Recommended lessons based on your progress.',
      focusArea: null,
    };
  }

  try {
    const insights = getLearningInsights(profile);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
You are an intelligent language learning advisor. Based on a user's learning profile, recommend the best lessons to focus on next.

User Profile:
- Learning Pace: ${profile.learningPace}
- Overall Accuracy: ${insights.overallAccuracy}%
- Total Exercises Completed: ${insights.totalExercises}
- Weak Skills: ${insights.weakSkills.join(', ') || 'None identified yet'}
- Strong Skills: ${insights.strongSkills.join(', ') || 'All skills developing'}
- Consistency Score: ${insights.consistencyScore}/100
- Target Language: ${userLanguage}

Available Lessons:
${availableLessons
  .slice(0, 10)
  .map((l) => `- ${l.title} (Exercises: ${l.exercises.map((e) => e.type).join(', ')})`)
  .join('\n')}

Based on this profile, provide:
1. A JSON array of lesson IDs to focus on (pick the 2-3 most relevant)
2. A brief explanation of why these lessons are recommended
3. Which skill area should be the primary focus (one of: vocabulary, grammar, listening, speaking, comprehension)

Respond ONLY in this JSON format:
{
  "lessonTitles": ["lesson1", "lesson2", "lesson3"],
  "explanation": "Why these lessons...",
  "focusSkill": "vocabulary|grammar|listening|speaking|comprehension"
}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    try {
      // Extract JSON from response (might be wrapped in markdown code blocks)
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      const response = JSON.parse(jsonMatch ? jsonMatch[0] : responseText);

      const recommendedLessons = availableLessons.filter((l) => response.lessonTitles.includes(l.title)).slice(0, 3);

      return {
        lessons: recommendedLessons.length > 0 ? recommendedLessons : availableLessons.slice(0, 3),
        explanation: response.explanation,
        focusArea: response.focusSkill as SkillCategory,
      };
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      return {
        lessons: availableLessons.slice(0, 3),
        explanation: 'Recommended lessons based on your learning progress.',
        focusArea: insights.weakSkills[0] || null,
      };
    }
  } catch (error) {
    console.error('Error generating AI recommendations:', error);
    return {
      lessons: availableLessons.slice(0, 3),
      explanation: 'Unable to generate AI recommendations. Check your connection.',
      focusArea: null,
    };
  }
}

/**
 * Generate personalized feedback and motivation
 */
export async function generatePersonalizedFeedback(
  profile: UserLearningProfile,
  userName: string,
): Promise<string> {
  if (!genAI) {
    return `Great work, ${userName}! Keep practicing to improve your skills.`;
  }

  try {
    const insights = getLearningInsights(profile);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
You are an encouraging language learning coach. Generate a brief, personalized motivational message for a learner.

Learner Profile:
- Name: ${userName}
- Learning Pace: ${profile.learningPace}
- Accuracy: ${insights.overallAccuracy}%
- Exercises Completed: ${insights.totalExercises}
- Weak Areas: ${insights.weakSkills.join(', ') || 'None yet'}
- Strong Areas: ${insights.strongSkills.join(', ') || 'Developing all skills'}
- Consistency: ${Math.round(profile.consistencyScore)}/100

Generate an encouraging, concise message (max 50 words) that:
1. Acknowledges their current progress
2. Identifies one area to focus on
3. Provides motivation to continue

Keep the tone friendly and uplifting.`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Error generating feedback:', error);
    return `Keep up the great work, ${userName}! Every exercise brings you closer to fluency.`;
  }
}

/**
 * Identify specific weak topics that need more practice
 */
export async function analyzeWeakAreas(
  profile: UserLearningProfile,
  language: string,
): Promise<{
  weakTopics: string[];
  recommendations: string[];
}> {
  if (!genAI) {
    return {
      weakTopics: profile.focusAreas,
      recommendations: ['Practice more exercises in your weak areas.'],
    };
  }

  try {
    const insights = getLearningInsights(profile);
    const recentWrongAnswers = profile.exerciseHistory.filter((e) => !e.correct).slice(-10);

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
You are a language learning diagnostic expert. Analyze a learner's performance and identify specific weak areas.

Language: ${language}
Weak Skills: ${insights.weakSkills.join(', ') || 'None identified'}
Recent Errors: ${recentWrongAnswers.length} in last 10 exercises
Overall Accuracy: ${insights.overallAccuracy}%

Identify:
1. Top 3 specific weak topics (e.g., "past tense verbs", "irregular plurals", "listening comprehension")
2. 3 actionable recommendations to improve

Respond in JSON format:
{
  "weakTopics": ["topic1", "topic2", "topic3"],
  "recommendations": ["recommendation1", "recommendation2", "recommendation3"]
}`;

    const result = await model.generateContent(prompt);

    try {
      const jsonMatch = result.response.text().match(/\{[\s\S]*\}/);
      const response = JSON.parse(jsonMatch ? jsonMatch[0] : result.response.text());
      return response;
    } catch (parseError) {
      return {
        weakTopics: insights.weakSkills,
        recommendations: [
          'Practice more regularly',
          'Focus on exercises you get wrong',
          'Review grammar rules for weak areas',
        ],
      };
    }
  } catch (error) {
    console.error('Error analyzing weak areas:', error);
    return {
      weakTopics: profile.focusAreas,
      recommendations: ['Practice more exercises', 'Review previous lessons', 'Take a practice quiz'],
    };
  }
}

/**
 * Generate adaptive exercise difficulty recommendations
 */
export async function calculateExerciseDifficulty(
  exercise: Exercise,
  profile: UserLearningProfile,
): Promise<'easy' | 'medium' | 'hard'> {
  if (!genAI) {
    // Fallback: use basic algorithm
    const avgProficiency =
      Object.values(profile.skillProficiencies).reduce((sum, s) => sum + s.proficiency, 0) /
      Object.keys(profile.skillProficiencies).length;

    if (avgProficiency > 75) return 'hard';
    if (avgProficiency < 50) return 'easy';
    return 'medium';
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const exerciseProficiency = exercise.skillTags
      ? exercise.skillTags
          .map((tag) => profile.skillProficiencies[tag as SkillCategory]?.proficiency || 0)
          .reduce((a, b) => a + b, 0) / exercise.skillTags.length
      : 50;

    const prompt = `
Given an exercise and user proficiency, determine if it should be EASY, MEDIUM, or HARD.

Exercise Type: ${exercise.type}
Exercise Skills: ${exercise.skillTags?.join(', ') || 'General'}
User Proficiency in These Skills: ${Math.round(exerciseProficiency)}%
User Accuracy Rate: ${getLearningInsights(profile).overallAccuracy}%

The user should be challenged but not overwhelmed.

Respond with ONLY one word: EASY, MEDIUM, or HARD`;

    const result = await model.generateContent(prompt);
    const response = result.response.text().trim().toUpperCase();

    if (response.includes('HARD')) return 'hard';
    if (response.includes('EASY')) return 'easy';
    return 'medium';
  } catch (error) {
    console.error('Error calculating difficulty:', error);
    return 'medium';
  }
}

/**
 * Predict if user might quit based on engagement patterns
 */
export async function predictEngagementRisk(profile: UserLearningProfile): Promise<{
  riskLevel: 'low' | 'medium' | 'high';
  reason: string;
  suggestion: string;
}> {
  const insights = getLearningInsights(profile);
  const daysSinceLastExercise =
    (new Date().getTime() - new Date(profile.exerciseHistory[profile.exerciseHistory.length - 1]?.timestamp || 0).getTime()) /
    (24 * 60 * 60 * 1000);

  if (daysSinceLastExercise > 7) {
    return {
      riskLevel: 'high',
      reason: 'No activity in the last week',
      suggestion: 'Come back and complete just one exercise to get your streak back!',
    };
  }

  if (insights.overallAccuracy < 40) {
    return {
      riskLevel: 'high',
      reason: 'Low accuracy might be discouraging',
      suggestion: 'Try easier exercises to build confidence. You can adjust difficulty anytime.',
    };
  }

  if (profile.consistencyScore < 30) {
    return {
      riskLevel: 'medium',
      reason: 'Inconsistent practice patterns detected',
      suggestion: 'Set a daily goal and try the same time each day to build a habit.',
    };
  }

  return {
    riskLevel: 'low',
    reason: 'Good engagement detected',
    suggestion: 'Keep up the great work!',
  };
}
