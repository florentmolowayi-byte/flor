# AI-Powered Adaptive Learning System Documentation

## Overview

This document describes the implementation of an AI-powered personalized learning system for the Flor language learning application, inspired by Duolingo's adaptive algorithm. The system analyzes user performance, identifies strengths and weaknesses, and automatically adjusts the learning path to optimize progress.

## Key Features

### 1. **Performance Tracking**
- Granular exercise-level performance metrics
- Skill proficiency scoring (0-100)
- Mastery tracking for long-term retention
- Exercise history with timestamps and confidence levels

### 2. **Adaptive Difficulty**
- Automatic difficulty adjustment based on accuracy
- Exercise difficulty recommendation system
- Contextual challenge matching user's current level

### 3. **Personalized Learning Paths**
- AI-generated lesson recommendations
- Weak area identification and focused practice
- Spaced repetition optimization
- Skill-based exercise sequencing

### 4. **Engagement Monitoring**
- Consistency scoring
- Learning pace detection
- Engagement risk prediction
- Motivational feedback generation

### 5. **AI-Powered Analysis**
- Google Generative AI integration for:
  - Learning recommendations
  - Personalized feedback
  - Weak area analysis
  - Engagement prediction

## Architecture

### Type System

#### Core Learning Types

```typescript
// Skill categories tracked by the system
type SkillCategory = 'vocabulary' | 'grammar' | 'listening' | 'speaking' | 'comprehension';

// User's proficiency in a specific skill
interface SkillProficiency {
  skill: SkillCategory;
  proficiency: number;        // 0-100
  mastery: number;            // 0-100 (harder to increase)
  lastPracticedDate: string;  // ISO date
  exerciseCount: number;
  correctAnswers: number;
  weakTopics: string[];       // Specific topics needing focus
}

// Individual exercise result
interface ExercisePerformance {
  exerciseId: string;
  timestamp: string;
  correct: boolean;
  timeSpent: number;          // milliseconds
  difficulty: 'easy' | 'medium' | 'hard';
  skillTags: string[];        // Which skills this exercise targets
  confidenceLevel: number;    // 1-5
}

// Comprehensive user learning profile
interface UserLearningProfile {
  userId?: string;
  skillProficiencies: Record<SkillCategory, SkillProficiency>;
  exerciseHistory: ExercisePerformance[];
  lastAnalyzedDate: string;
  recommendedNextLessons: string[];
  recommendedDifficulty: 'easy' | 'medium' | 'hard';
  learningPace: 'slow' | 'normal' | 'fast';
  consistencyScore: number;   // 0-100
  focusAreas: SkillCategory[];
}
```

### Core Modules

#### 1. Adaptive Learning Service (`src/utils/adaptiveLearningService.ts`)

Core algorithms for analyzing performance and generating recommendations.

**Key Functions:**

```typescript
// Initialize a new learning profile
initializeLearningProfile(userId?: string): UserLearningProfile

// Record exercise completion and update profile
recordExercisePerformance(
  profile: UserLearningProfile,
  performance: ExercisePerformance
): UserLearningProfile

// Determine if exercise difficulty matches user level
calculateRecommendedDifficulty(profile: UserLearningProfile): 'easy' | 'medium' | 'hard'

// Get learning insights for UI display
getLearningInsights(profile: UserLearningProfile): {
  strongSkills: SkillCategory[];
  weakSkills: SkillCategory[];
  overallAccuracy: number;
  totalExercises: number;
  consistencyScore: number;
  learningPace: 'slow' | 'normal' | 'fast';
  recommendedDifficulty: 'easy' | 'medium' | 'hard';
}

// Sort exercises by relevance to user's needs
getPersonalizedExerciseOrder(
  exercises: Exercise[],
  profile: UserLearningProfile
): Exercise[]

// Suggest next lesson based on progress
suggestNextLessonPath(
  profile: UserLearningProfile,
  availableLessons: Lesson[],
  completedLessonIds: Set<string>
): { lessons: Lesson[]; reason: string }

// Generate actionable feedback
generateAdaptiveFeedback(profile: UserLearningProfile): string
```

#### 2. AI Service (`src/utils/aiService.ts`)

Google Generative AI integration for advanced recommendations.

**Key Functions:**

```typescript
// Initialize AI service with API key
initializeAIService(): boolean

// Get AI-powered learning recommendations
generateLearningRecommendations(
  profile: UserLearningProfile,
  availableLessons: Lesson[],
  userLanguage: string
): Promise<{
  lessons: Lesson[];
  explanation: string;
  focusArea: SkillCategory | null;
}>

// Generate personalized motivational feedback
generatePersonalizedFeedback(
  profile: UserLearningProfile,
  userName: string
): Promise<string>

// Analyze specific weak areas
analyzeWeakAreas(
  profile: UserLearningProfile,
  language: string
): Promise<{
  weakTopics: string[];
  recommendations: string[];
}>

// Calculate optimal exercise difficulty
calculateExerciseDifficulty(
  exercise: Exercise,
  profile: UserLearningProfile
): Promise<'easy' | 'medium' | 'hard'>

// Predict churn risk
predictEngagementRisk(profile: UserLearningProfile): Promise<{
  riskLevel: 'low' | 'medium' | 'high';
  reason: string;
  suggestion: string;
}>
```

#### 3. Custom Hook (`src/hooks/useAdaptiveLearning.ts`)

React hook for managing learning profile state and exercise tracking.

```typescript
export function useAdaptiveLearning(userState: UserState) {
  // State
  learningProfile: UserLearningProfile | undefined;
  currentSession: AdaptiveLearningSession | null;

  // Functions
  recordExerciseCompletion(
    exerciseId: string,
    skillTags: string[],
    correct: boolean,
    timeSpent: number,
    difficulty?: 'easy' | 'medium' | 'hard',
    confidenceLevel?: number
  ): ExercisePerformance;

  startSession(sessionType?: 'lesson' | 'practice'): AdaptiveLearningSession;
  endSession(): AdaptiveLearningSession | null;
  getRecommendedDifficulty(): 'easy' | 'medium' | 'hard';
  resetProfile(): void;
  exportProfileData(): string | null;
}
```

#### 4. UI Component (`src/components/AdaptiveLearningPanel.tsx`)

React component displaying personalized recommendations and insights.

**Features:**
- Overview tab: Feedback, stats, skill proficiency
- Recommendations tab: Suggested next lessons
- Weak Areas tab: Topics needing focus with recommendations
- Insights tab: Learning trends and patterns
- Real-time AI analysis with loading states

## Integration Guide

### Setup

1. **Add Google AI API Key**
   ```bash
   # In .env
   VITE_GOOGLE_AI_API_KEY=your_api_key_here
   ```

2. **Initialize AI Service (in App.tsx)**
   ```typescript
   import { initializeAIService } from './utils/aiService';

   useEffect(() => {
     initializeAIService();
   }, []);
   ```

### Basic Usage

1. **Initialize Learning Profile**
   ```typescript
   const { learningProfile, recordExerciseCompletion } = useAdaptiveLearning(userState);

   if (!learningProfile) {
     // First time user - profile initialized automatically
   }
   ```

2. **Track Exercise Completion**
   ```typescript
   // After user completes an exercise
   recordExerciseCompletion(
     exerciseId,
     ['vocabulary', 'listening'],  // skill tags
     true,                          // correct?
     5000,                          // time spent (ms)
     'medium',                      // difficulty
     4                              // confidence level (1-5)
   );
   ```

3. **Display Personalized Recommendations**
   ```typescript
   import { AdaptiveLearningPanel } from './components/AdaptiveLearningPanel';

   <AdaptiveLearningPanel
     learningProfile={learningProfile}
     availableLessons={lessons}
     userName={userState.name}
     userLanguage={userState.currentLanguage}
     onLessonSelected={(lessonId) => {
       // Handle lesson selection
     }}
   />
   ```

### Advanced Usage

1. **Get Next Lesson Recommendation**
   ```typescript
   import { suggestNextLessonPath } from './utils/adaptiveLearningService';

   const { lessons, reason } = suggestNextLessonPath(
     learningProfile,
     allLessons,
     new Set(completedLessonIds)
   );
   ```

2. **Analyze Weak Areas**
   ```typescript
   import { analyzeWeakAreas } from './utils/aiService';

   const { weakTopics, recommendations } = await analyzeWeakAreas(
     learningProfile,
     'french'
   );
   ```

3. **Predict Engagement**
   ```typescript
   import { predictEngagementRisk } from './utils/aiService';

   const { riskLevel, reason, suggestion } = await predictEngagementRisk(
     learningProfile
   );
   ```

## Algorithm Details

### Proficiency Scoring

```
Proficiency Change = Base Points × Difficulty Multiplier

Base Points:
  - Correct: +1 to 4 points (depending on exercise complexity)
  - Incorrect: -1 point (slight penalty)

Difficulty Multiplier:
  - Easy: 2x
  - Medium: 4x
  - Hard: 8x

Example: Correct hard exercise = +4 × 8 = +32 points (capped at 100)
```

### Learning Pace Detection

```
Recent Exercises (last 7 days):
  - < 5: Slow pace → Recommend more frequent practice
  - 5-20: Normal pace → Continue current rhythm
  - > 20: Fast pace → Challenge with harder exercises
```

### Consistency Score

```
Consistency Score = 100 - (days_since_last_exercise × 5)

Score Interpretation:
  - 80-100: Excellent (daily or near-daily practice)
  - 50-80: Good (practice several times per week)
  - 20-50: Fair (inconsistent practice)
  - 0-20: Poor (significant gaps in practice)
```

### Focus Area Priority

```
Skills are marked for focus if:
1. Proficiency < 60% (below competency threshold)
2. Error rate > 30% in recent exercises
3. Not practiced in last 7 days
```

### Engagement Risk Prediction

```
HIGH RISK if:
  - No activity in last 7 days
  - Accuracy < 40% (discouraging)
  - Consistency score < 30%

MEDIUM RISK if:
  - Consistency score < 50%
  - Haven't practiced in 3+ days

LOW RISK:
  - Regular practice with reasonable accuracy
```

## Performance Optimization

1. **Local Caching**: Learning profiles cached in localStorage
2. **Lazy Loading**: AI services only initialized on demand
3. **Batch Processing**: Exercise history analyzed in batches
4. **Debounced Updates**: Profile updates debounced to prevent excessive re-renders

## Data Structure Example

```typescript
// Sample learning profile after several exercises
{
  userId: "user123",
  skillProficiencies: {
    vocabulary: {
      skill: "vocabulary",
      proficiency: 75,
      mastery: 45,
      lastPracticedDate: "2024-01-15",
      exerciseCount: 45,
      correctAnswers: 36,
      weakTopics: ["irregular verbs", "idiomatic expressions"]
    },
    grammar: {
      skill: "grammar",
      proficiency: 62,
      mastery: 38,
      lastPracticedDate: "2024-01-14",
      exerciseCount: 38,
      correctAnswers: 26,
      weakTopics: ["past tense", "subjunctive mood"]
    },
    // ... other skills
  },
  exerciseHistory: [
    {
      exerciseId: "ex-001",
      timestamp: "2024-01-15T10:30:00Z",
      correct: true,
      timeSpent: 3500,
      difficulty: "medium",
      skillTags: ["vocabulary"],
      confidenceLevel: 4
    },
    // ... more exercises
  ],
  recommendedDifficulty: "medium",
  learningPace: "normal",
  consistencyScore: 85,
  focusAreas: ["grammar"],
  recommendedNextLessons: ["lesson_past_tense", "lesson_subjunctive"]
}
```

## Testing & Validation

### Manual Testing Checklist

- [ ] Learning profile initializes for new users
- [ ] Exercise performance records correctly
- [ ] Difficulty adjusts based on accuracy
- [ ] Weak areas identified accurately
- [ ] Recommendations update after each exercise
- [ ] AI feedback generates successfully
- [ ] Engagement risk alerts trigger appropriately
- [ ] LocalStorage persistence works
- [ ] Profile export/reset functions work

### Example Test Data

```typescript
// Create test performance data
const testExercises: ExercisePerformance[] = [
  {
    exerciseId: "test-1",
    timestamp: new Date().toISOString(),
    correct: true,
    timeSpent: 4000,
    difficulty: "easy",
    skillTags: ["vocabulary"],
    confidenceLevel: 5
  },
  {
    exerciseId: "test-2",
    timestamp: new Date().toISOString(),
    correct: false,
    timeSpent: 8000,
    difficulty: "medium",
    skillTags: ["grammar"],
    confidenceLevel: 2
  }
];
```

## Future Enhancements

1. **Spaced Repetition**: Implement SM-2 algorithm for optimal review intervals
2. **Predictive Analytics**: ML model to predict lesson completion time
3. **Social Learning**: Peer comparison and group challenges
4. **Voice Recognition**: AI-powered pronunciation analysis
5. **Content Generation**: AI generates custom exercises based on weak areas
6. **Adaptive Timing**: Suggest optimal times for practice sessions
7. **Multi-language Support**: Cross-language skill transfer analysis
8. **Mobile Optimization**: Offline-first learning profiles with sync

## API Reference

### Google Generative AI Model

- **Model**: `gemini-1.5-flash` (Fast, cost-effective)
- **Alternative**: `gemini-1.5-pro` (More powerful analysis)
- **Rate Limits**: Subject to Google's rate limiting policies

### Environment Variables

```bash
VITE_GOOGLE_AI_API_KEY    # Frontend API key (with restrictions)
GOOGLE_AI_API_KEY         # Backend API key (full access)
```

## Troubleshooting

### AI Service Not Responding
- Check API key validity
- Verify rate limits not exceeded
- Check network connection
- Fall back to default algorithm

### Learning Profile Not Saving
- Check localStorage not disabled
- Verify sufficient storage space
- Check browser console for errors

### Incorrect Recommendations
- Ensure skillTags on exercises are accurate
- Verify exercise difficulty levels
- Check that recent exercises are being recorded
- May need more data (minimum 10 exercises for accuracy)

## Performance Metrics

Monitor these KPIs to evaluate system effectiveness:

1. **User Retention**: % returning after 7 days
2. **Accuracy Improvement**: Average accuracy trend over time
3. **Lesson Completion Rate**: % completing recommended lessons
4. **Time to Proficiency**: Days to reach 70% proficiency per skill
5. **Engagement Consistency**: Average consistency score
6. **AI Recommendation Accuracy**: % completing recommended vs. random lessons

## License & Attribution

This adaptive learning system is built using:
- Google Generative AI API
- React & TypeScript
- Inspired by Duolingo's adaptive algorithm research
