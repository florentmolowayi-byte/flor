/**
 * Integration Example: Using Adaptive Learning in LessonEngine
 * 
 * This file demonstrates how to integrate the AI-powered adaptive learning
 * system into your existing LessonEngine component.
 * 
 * Copy and adapt these patterns to your actual LessonEngine component.
 */

import React, { useState, useEffect, useRef } from 'react';
import { UserState, Exercise, Lesson } from '../types';
import { useAdaptiveLearning } from '../hooks/useAdaptiveLearning';
import {
  getPersonalizedExerciseOrder,
  calculateRecommendedDifficulty,
} from '../utils/adaptiveLearningService';
import { calculateExerciseDifficulty } from '../utils/aiService';

interface LessonEngineExampleProps {
  lesson: Lesson;
  userState: UserState;
  onLessonComplete: (stars: number) => void;
}

/**
 * STEP 1: Initialize adaptive learning hook in your component
 */
export const LessonEngineExample: React.FC<LessonEngineExampleProps> = ({
  lesson,
  userState,
  onLessonComplete,
}) => {
  // Initialize adaptive learning system
  const {
    learningProfile,
    currentSession,
    recordExerciseCompletion,
    startSession,
    endSession,
    getRecommendedDifficulty,
  } = useAdaptiveLearning(userState);

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState<number>(Date.now());
  const [scores, setScores] = useState<number[]>([]);
  const exerciseTimers = useRef<Record<string, number>>({});

  /**
   * STEP 2: Start session when lesson begins
   */
  useEffect(() => {
    startSession('lesson');
    setSessionStartTime(Date.now());
    return () => {
      // Optional: End session when component unmounts
      // endSession();
    };
  }, [lesson.id, startSession]);

  /**
   * STEP 3: Get personalized exercise order based on user profile
   */
  const personalizedExercises = learningProfile
    ? getPersonalizedExerciseOrder(lesson.exercises, learningProfile)
    : lesson.exercises;

  const currentExercise = personalizedExercises[currentExerciseIndex];

  /**
   * STEP 4: Record exercise completion with performance metrics
   */
  const handleExerciseSubmit = async (isCorrect: boolean, userAnswer: any) => {
    if (!currentExercise) return;

    // Calculate time spent on this exercise
    const exerciseStartTime = exerciseTimers.current[currentExercise.id] || Date.now();
    const timeSpent = Date.now() - exerciseStartTime;

    // Get skill tags from exercise (make sure these are set in your exercise data)
    const skillTags = currentExercise.skillTags || ['general'];

    // Determine exercise difficulty
    const difficulty =
      currentExercise.difficulty || getRecommendedDifficulty();

    // Estimate confidence level (1-5) based on user hesitation
    // In real implementation, track response time or user behavior
    const confidenceLevel = isCorrect ? 4 : 2;

    /**
     * STEP 5: Record the performance
     * This automatically updates the learning profile with:
     * - Skill proficiencies
     * - Exercise history
     * - Recomputed metrics (weak areas, pace, consistency)
     */
    const performance = recordExerciseCompletion(
      currentExercise.id,
      skillTags,
      isCorrect,
      timeSpent,
      difficulty,
      confidenceLevel,
    );

    // Store score
    setScores([...scores, isCorrect ? 1 : 0]);

    // Move to next exercise
    if (currentExerciseIndex < personalizedExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      exerciseTimers.current[personalizedExercises[currentExerciseIndex + 1].id] = Date.now();
    } else {
      // Lesson complete - process results
      await handleLessonComplete(performance);
    }
  };

  /**
   * STEP 6: Handle lesson completion with adaptive feedback
   */
  const handleLessonComplete = async (lastPerformance: any) => {
    // End the session
    const sessionData = endSession();

    // Calculate lesson score/stars
    const correctCount = scores.filter((s) => s === 1).length;
    const accuracy = correctCount / scores.length;

    let stars = 1;
    if (accuracy > 0.7) stars = 2;
    if (accuracy > 0.85) stars = 3;

    // Optional: Adjust next lesson difficulty based on performance
    if (learningProfile) {
      const nextDifficulty = calculateRecommendedDifficulty(learningProfile);
      console.log(
        `Lesson complete! Accuracy: ${(accuracy * 100).toFixed(1)}%. Next recommended difficulty: ${nextDifficulty}`,
      );
    }

    // Call parent callback
    onLessonComplete(stars);
  };

  /**
   * STEP 7: Display adaptive difficulty indicator
   */
  const renderDifficultyIndicator = () => {
    const recommendedDifficulty = getRecommendedDifficulty();
    const colors = {
      easy: 'text-green-600',
      medium: 'text-yellow-600',
      hard: 'text-red-600',
    };

    return (
      <div className={`text-sm font-medium ${colors[recommendedDifficulty]}`}>
        Difficulty: {recommendedDifficulty}
      </div>
    );
  };

  /**
   * STEP 8: Display learning profile summary
   */
  const renderProfileSummary = () => {
    if (!learningProfile) return null;

    const accuracy = scores.length > 0 ? (scores.filter((s) => s).length / scores.length * 100).toFixed(1) : 'N/A';

    return (
      <div className="bg-blue-50 p-3 rounded border border-blue-200 text-sm">
        <div className="font-medium text-blue-900">Learning Profile</div>
        <div className="text-blue-700 mt-2 space-y-1">
          <div>Pace: {learningProfile.learningPace}</div>
          <div>Consistency: {Math.round(learningProfile.consistencyScore)}/100</div>
          <div>Current Accuracy: {accuracy}%</div>
          <div>Focus Areas: {learningProfile.focusAreas.join(', ')}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header with adaptive info */}
      <div className="flex justify-between items-center">
        <h2>{lesson.title}</h2>
        {renderDifficultyIndicator()}
      </div>

      {/* Profile Summary */}
      {renderProfileSummary()}

      {/* Current Exercise */}
      {currentExercise && (
        <ExerciseComponent
          exercise={currentExercise}
          onSubmit={handleExerciseSubmit}
          progress={(currentExerciseIndex + 1) / personalizedExercises.length}
        />
      )}

      {/* Progress Indicator */}
      <div className="text-sm text-gray-600">
        Exercise {currentExerciseIndex + 1} of {personalizedExercises.length}
      </div>
    </div>
  );
};

/**
 * Example Exercise Component
 * Adapt this to your actual exercise UI
 */
interface ExerciseComponentProps {
  exercise: Exercise;
  onSubmit: (isCorrect: boolean, userAnswer: any) => void;
  progress: number;
}

const ExerciseComponent: React.FC<ExerciseComponentProps> = ({ exercise, onSubmit, progress }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!selectedAnswer) return;

    // Check if answer is correct
    const isCorrect = selectedAnswer === exercise.correctAnswerId;
    onSubmit(isCorrect, selectedAnswer);

    // Reset for next exercise
    setSelectedAnswer(null);
  };

  return (
    <div className="space-y-4 border rounded-lg p-6 bg-white">
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Exercise prompt */}
      <div className="text-lg font-medium">{exercise.prompt}</div>

      {/* Exercise type specific rendering */}
      {exercise.type === 'multiple_choice' && exercise.options && (
        <div className="space-y-2">
          {exercise.options.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedAnswer(option.id)}
              className={`w-full p-3 text-left rounded border transition-all ${
                selectedAnswer === option.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {option.text}
              {option.imageEmoji && <span className="ml-2">{option.imageEmoji}</span>}
            </button>
          ))}
        </div>
      )}

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        disabled={!selectedAnswer}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-medium"
      >
        Submit Answer
      </button>

      {/* Hint if available */}
      {exercise.hint && (
        <div className="text-sm text-gray-600 bg-yellow-50 p-3 rounded border border-yellow-200">
          💡 Hint: {exercise.hint}
        </div>
      )}
    </div>
  );
};

/**
 * INTEGRATION CHECKLIST:
 * 
 * [ ] Add skill tags to all exercises in your exercise data
 *     Example: { id: "ex-1", skillTags: ["vocabulary", "listening"], ... }
 * 
 * [ ] Ensure exercises have difficulty levels
 *     Example: { difficulty: "medium", ... }
 * 
 * [ ] Initialize AI service in App.tsx:
 *     import { initializeAIService } from './utils/aiService';
 *     useEffect(() => { initializeAIService(); }, []);
 * 
 * [ ] Add Google AI API key to .env:
 *     VITE_GOOGLE_AI_API_KEY=your_key_here
 * 
 * [ ] Update UserState interface to include learningProfile:
 *     See types.ts modifications
 * 
 * [ ] Display AdaptiveLearningPanel somewhere in your UI:
 *     import { AdaptiveLearningPanel } from './components/AdaptiveLearningPanel';
 *     <AdaptiveLearningPanel
 *       learningProfile={learningProfile}
 *       availableLessons={lessons}
 *       userName={userState.name}
 *       userLanguage={userState.currentLanguage}
 *       onLessonSelected={(id) => handleLessonSelect(id)}
 *     />
 * 
 * [ ] Test with sample exercises and verify:
 *     - Profile initializes
 *     - Performance records correctly
 *     - Recommendations update after exercises
 *     - AI feedback generates
 * 
 * [ ] Add to your persistence layer:
 *     Include learningProfile in user state serialization
 */
