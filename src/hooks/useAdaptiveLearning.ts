import { useState, useCallback, useEffect } from 'react';
import {
  UserState,
  ExercisePerformance,
  UserLearningProfile,
  SkillCategory,
  AdaptiveLearningSession,
} from '../types';
import {
  initializeLearningProfile,
  recordExercisePerformance,
  calculateRecommendedDifficulty,
} from '../utils/adaptiveLearningService';

const LEARNING_PROFILE_STORAGE_KEY = 'flor_learning_profile_v1';

/**
 * Custom hook for managing adaptive learning and exercise performance tracking
 */
export function useAdaptiveLearning(userState: UserState) {
  const [learningProfile, setLearningProfile] = useState<UserLearningProfile | undefined>(() => {
    // Initialize from localStorage or create new
    const stored = localStorage.getItem(LEARNING_PROFILE_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return initializeLearningProfile(userState.name);
  });

  const [currentSession, setCurrentSession] = useState<AdaptiveLearningSession | null>(null);

  // Save learning profile to localStorage whenever it changes
  useEffect(() => {
    if (learningProfile) {
      localStorage.setItem(LEARNING_PROFILE_STORAGE_KEY, JSON.stringify(learningProfile));
    }
  }, [learningProfile]);

  /**
   * Record exercise performance and update learning profile
   */
  const recordExerciseCompletion = useCallback(
    (
      exerciseId: string,
      skillTags: string[],
      correct: boolean,
      timeSpent: number, // milliseconds
      difficulty: 'easy' | 'medium' | 'hard' = 'medium',
      confidenceLevel: number = 3, // 1-5
    ) => {
      if (!learningProfile) return;

      const performance: ExercisePerformance = {
        exerciseId,
        timestamp: new Date().toISOString(),
        correct,
        timeSpent,
        difficulty,
        skillTags: skillTags as SkillCategory[],
        confidenceLevel: Math.max(1, Math.min(5, confidenceLevel)),
      };

      const updatedProfile = recordExercisePerformance(learningProfile, performance);
      setLearningProfile(updatedProfile);

      // Add to current session if exists
      if (currentSession) {
        setCurrentSession({
          ...currentSession,
          exercises: [
            ...currentSession.exercises,
            {
              exerciseId,
              recommended: false,
              aiGenerated: false,
            },
          ],
        });
      }

      return performance;
    },
    [learningProfile, currentSession],
  );

  /**
   * Start a new learning session
   */
  const startSession = useCallback((sessionType: 'lesson' | 'practice' = 'lesson') => {
    const sessionId = `session_${Date.now()}`;
    const session: AdaptiveLearningSession = {
      sessionId,
      userId: userState.name,
      startTime: new Date().toISOString(),
      exercises: [],
      performanceMetrics: {
        sessionType,
        exerciseCount: 0,
        correctCount: 0,
        duration: 0,
      },
    };
    setCurrentSession(session);
    return session;
  }, [userState.name]);

  /**
   * End current learning session
   */
  const endSession = useCallback(() => {
    if (!currentSession || !learningProfile) return null;

    const endTime = new Date().getTime();
    const startTime = new Date(currentSession.startTime).getTime();
    const duration = endTime - startTime;

    // Store session in history
    const updatedProfile = {
      ...learningProfile,
      adaptiveSessionHistory: [
        ...(learningProfile.adaptiveSessionHistory || []),
        {
          ...currentSession,
          performanceMetrics: {
            ...currentSession.performanceMetrics,
            duration,
          },
        },
      ],
    };

    setLearningProfile(updatedProfile);
    setCurrentSession(null);

    return currentSession;
  }, [currentSession, learningProfile]);

  /**
   * Get recommended difficulty for next exercise
   */
  const getRecommendedDifficulty = useCallback(() => {
    return learningProfile ? calculateRecommendedDifficulty(learningProfile) : 'medium';
  }, [learningProfile]);

  /**
   * Reset learning profile (for testing or user request)
   */
  const resetProfile = useCallback(() => {
    const newProfile = initializeLearningProfile(userState.name);
    setLearningProfile(newProfile);
    localStorage.removeItem(LEARNING_PROFILE_STORAGE_KEY);
  }, [userState.name]);

  /**
   * Export learning profile data (for analytics or backup)
   */
  const exportProfileData = useCallback(() => {
    return learningProfile ? JSON.stringify(learningProfile, null, 2) : null;
  }, [learningProfile]);

  return {
    learningProfile,
    currentSession,
    recordExerciseCompletion,
    startSession,
    endSession,
    getRecommendedDifficulty,
    resetProfile,
    exportProfileData,
  };
}
