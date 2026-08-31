/**
 * Exercise Data Update Template
 * 
 * This file shows how to add skill tags and difficulty levels to your exercises
 * in src/data/exercisesData.ts
 * 
 * Copy these patterns and apply to your existing exercises.
 */

import { Exercise, Lesson } from '../types';

// ============================================================================
// SKILL TAGS REFERENCE
// ============================================================================
// Use these skill tags to categorize exercises:
// - "vocabulary"    : Word recognition, translation, new words
// - "grammar"       : Grammar rules, verb conjugation, sentence structure
// - "listening"     : Audio comprehension, pronunciation
// - "speaking"      : Speaking exercises, pronunciation practice
// - "comprehension" : Reading comprehension, context understanding

// ============================================================================
// DIFFICULTY LEVELS
// ============================================================================
// - "easy"   : For beginners, single concepts, high success rate expected
// - "medium" : Standard exercises, combining multiple skills
// - "hard"   : Advanced, combining multiple skills, critical thinking

// ============================================================================
// EXAMPLE 1: Multiple Choice Exercise
// ============================================================================
const vocabularyMultipleChoice: Exercise = {
  id: 'vocab-mc-001',
  type: 'multiple_choice',
  prompt: 'Choose the correct translation of "bonjour"',
  skillTags: ['vocabulary', 'comprehension'],
  difficulty: 'easy',
  options: [
    { id: 'opt-1', text: 'Hello', imageEmoji: '👋' },
    { id: 'opt-2', text: 'Goodbye', imageEmoji: '👋' },
    { id: 'opt-3', text: 'Thank you', imageEmoji: '🙏' },
    { id: 'opt-4', text: 'Please', imageEmoji: '🤲' },
  ],
  correctAnswerId: 'opt-1',
  hint: 'This greeting is used in the morning and afternoon',
};

// ============================================================================
// EXAMPLE 2: Grammar Exercise
// ============================================================================
const grammarWordBank: Exercise = {
  id: 'grammar-wb-001',
  type: 'word_bank',
  prompt: 'Arrange the words to form a correct sentence',
  skillTags: ['grammar', 'vocabulary'],
  difficulty: 'medium',
  correctSentence: ['Je', 'suis', 'étudiant'],
  wordBankPool: ['Je', 'suis', 'étudiant', 'content', 'toujours'],
  hint: 'Subject pronoun + to be + noun',
};

// ============================================================================
// EXAMPLE 3: Listening Exercise
// ============================================================================
const listeningExercise: Exercise = {
  id: 'listen-001',
  type: 'listening',
  prompt: 'Listen and select what you hear',
  audioText: 'Bonjour, comment allez-vous?',
  skillTags: ['listening', 'vocabulary'],
  difficulty: 'easy',
  options: [
    { id: 'opt-1', text: 'Hello, how are you?' },
    { id: 'opt-2', text: 'Goodbye, see you soon' },
    { id: 'opt-3', text: 'What is your name?' },
  ],
  correctAnswerId: 'opt-1',
  hint: 'This is a common greeting',
};

// ============================================================================
// EXAMPLE 4: Speaking Exercise
// ============================================================================
const speakingExercise: Exercise = {
  id: 'speak-001',
  type: 'speaking',
  prompt: 'Say the following sentence: "I love learning languages"',
  skillTags: ['speaking', 'vocabulary'],
  difficulty: 'medium',
  hint: 'Pronounce each word clearly',
};

// ============================================================================
// EXAMPLE 5: Matching Pairs Exercise
// ============================================================================
const matchingPairsExercise: Exercise = {
  id: 'match-001',
  type: 'match_pairs',
  prompt: 'Match the French words with their English translations',
  skillTags: ['vocabulary', 'comprehension'],
  difficulty: 'easy',
  pairs: [
    { id: 'pair-1', left: 'Bonjour', right: 'Hello' },
    { id: 'pair-2', left: 'Chat', right: 'Cat' },
    { id: 'pair-3', left: 'Livre', right: 'Book' },
    { id: 'pair-4', left: 'Maison', right: 'House' },
  ],
};

// ============================================================================
// EXAMPLE 6: Lesson with Mixed Exercise Types
// ============================================================================
const beginnerFrenchLesson: Lesson = {
  id: 'french-lesson-1',
  title: 'Basic Greetings',
  unitId: 'fr-unit-1',
  xpReward: 50,
  gemReward: 10,
  exercises: [
    {
      id: 'ex-1',
      type: 'multiple_choice',
      prompt: 'What does "Bonjour" mean?',
      skillTags: ['vocabulary'],
      difficulty: 'easy',
      options: [
        { id: 'a', text: 'Hello' },
        { id: 'b', text: 'Goodbye' },
        { id: 'c', text: 'Good night' },
      ],
      correctAnswerId: 'a',
      hint: 'It is used to greet someone',
    },
    {
      id: 'ex-2',
      type: 'listening',
      prompt: 'Listen and select the correct response',
      audioText: 'Bonjour, comment allez-vous?',
      skillTags: ['listening', 'comprehension'],
      difficulty: 'easy',
      options: [
        { id: 'x', text: 'Je vais bien, merci' },
        { id: 'y', text: 'Au revoir' },
      ],
      correctAnswerId: 'x',
      hint: 'This is a polite response',
    },
    {
      id: 'ex-3',
      type: 'speaking',
      prompt: 'Greet someone by saying "Bonjour, comment allez-vous?"',
      skillTags: ['speaking', 'vocabulary'],
      difficulty: 'medium',
      hint: 'Pronounce slowly and clearly',
    },
  ],
};

// ============================================================================
// BEGINNER VOCABULARY PROGRESSION
// ============================================================================
export const beginnerVocabularyExercises: Exercise[] = [
  {
    id: 'vocab-001',
    type: 'multiple_choice',
    prompt: 'What is "apple" in French?',
    skillTags: ['vocabulary'],
    difficulty: 'easy',
    options: [
      { id: 'opt-1', text: 'Pomme', imageEmoji: '🍎' },
      { id: 'opt-2', text: 'Pain', imageEmoji: '🍞' },
      { id: 'opt-3', text: 'Chat', imageEmoji: '🐱' },
    ],
    correctAnswerId: 'opt-1',
    hint: 'Fruits are typically feminine in French',
  },
  {
    id: 'vocab-002',
    type: 'word_bank',
    prompt: 'Complete: "Je m\'appelle ___"',
    skillTags: ['vocabulary', 'grammar'],
    difficulty: 'easy',
    correctSentence: ['Marc'],
    wordBankPool: ['Marc', 'suis', 'vous'],
    hint: 'Fill in with a name',
  },
  {
    id: 'vocab-003',
    type: 'match_pairs',
    prompt: 'Match numbers with their French names',
    skillTags: ['vocabulary'],
    difficulty: 'easy',
    pairs: [
      { id: 'p-1', left: '1', right: 'Un' },
      { id: 'p-2', left: '2', right: 'Deux' },
      { id: 'p-3', left: '3', right: 'Trois' },
    ],
  },
];

// ============================================================================
// INTERMEDIATE GRAMMAR PROGRESSION
// ============================================================================
export const intermediateGrammarExercises: Exercise[] = [
  {
    id: 'grammar-001',
    type: 'word_bank',
    prompt: 'Conjugate: "Je (être) en France"',
    skillTags: ['grammar', 'vocabulary'],
    difficulty: 'medium',
    correctSentence: ['Je', 'suis', 'en', 'France'],
    wordBankPool: ['Je', 'suis', 'sont', 'en', 'France', 'Paris'],
    hint: 'Use the present tense of "être" (to be)',
  },
  {
    id: 'grammar-002',
    type: 'multiple_choice',
    prompt: 'Which past tense is correct?',
    skillTags: ['grammar'],
    difficulty: 'hard',
    options: [
      { id: 'a', text: 'J\'ai mangé une pomme' },
      { id: 'b', text: 'Je mange une pomme hier' },
      { id: 'c', text: 'J\'ai mangé demain' },
    ],
    correctAnswerId: 'a',
    hint: 'Look for passé composé conjugation',
  },
  {
    id: 'grammar-003',
    type: 'word_bank',
    prompt: 'Form a negative sentence: "Je _____ pas aller"',
    skillTags: ['grammar'],
    difficulty: 'medium',
    correctSentence: ['Je', 'ne', 'veux', 'pas', 'aller'],
    wordBankPool: ['ne', 'ne pas', 'veux', 'ne veux', 'aller'],
    hint: 'Negative sentences need "ne" and "pas"',
  },
];

// ============================================================================
// LISTENING COMPREHENSION PROGRESSION
// ============================================================================
export const listeningComprehensionExercises: Exercise[] = [
  {
    id: 'listen-001',
    type: 'listening',
    prompt: 'What did the person say?',
    audioText: 'Bonjour, je suis Jean',
    skillTags: ['listening', 'comprehension'],
    difficulty: 'easy',
    options: [
      { id: '1', text: 'My name is Jean' },
      { id: '2', text: 'Nice to meet you' },
      { id: '3', text: 'How are you?' },
    ],
    correctAnswerId: '1',
    hint: 'Focus on "je suis"',
  },
  {
    id: 'listen-002',
    type: 'listening',
    prompt: 'Where is the person going?',
    audioText: 'Je vais à la bibliothèque pour étudier',
    skillTags: ['listening', 'comprehension'],
    difficulty: 'medium',
    options: [
      { id: '1', text: 'To the library' },
      { id: '2', text: 'To the restaurant' },
      { id: '3', text: 'To the park' },
    ],
    correctAnswerId: '1',
    hint: 'Listen for place names',
  },
];

// ============================================================================
// SPEAKING EXERCISES
// ============================================================================
export const speakingExercises: Exercise[] = [
  {
    id: 'speak-001',
    type: 'speaking',
    prompt: 'Introduce yourself in French',
    skillTags: ['speaking', 'vocabulary'],
    difficulty: 'easy',
    hint: 'Say: "Bonjour, je m\'appelle..." followed by your name',
  },
  {
    id: 'speak-002',
    type: 'speaking',
    prompt: 'Ask someone "How are you?" in French',
    skillTags: ['speaking', 'vocabulary'],
    difficulty: 'easy',
    hint: 'Say: "Comment allez-vous?"',
  },
  {
    id: 'speak-003',
    type: 'speaking',
    prompt: 'Have a simple conversation: greet, introduce, ask how they are',
    skillTags: ['speaking', 'grammar', 'vocabulary'],
    difficulty: 'hard',
    hint: 'Combine multiple simple phrases',
  },
];

// ============================================================================
// SKILL PROGRESSION MAPPING
// ============================================================================
export const skillProgressionMap = {
  vocabulary: {
    easy: ['Basic greetings', 'Common nouns', 'Simple verbs'],
    medium: ['Adjectives', 'Adverbs', 'Abstract nouns'],
    hard: ['Idiomatic expressions', 'Technical terms', 'Colloquialisms'],
  },
  grammar: {
    easy: ['Present tense', 'Subject pronouns', 'Basic word order'],
    medium: ['Past tense (passé composé)', 'Object pronouns', 'Adjective agreement'],
    hard: ['Subjunctive mood', 'Complex tenses', 'Conditional statements'],
  },
  listening: {
    easy: ['Isolated words', 'Slow speech', 'Clear pronunciation'],
    medium: ['Short conversations', 'Normal speech rate', 'Background noise'],
    hard: ['Long passages', 'Fast speech', 'Multiple speakers', 'Native accent'],
  },
  speaking: {
    easy: ['Single word repetition', 'Simple phrases', 'Reading from text'],
    medium: ['Short sentences', 'Conversation responses', 'Semi-spontaneous'],
    hard: ['Extended speech', 'Spontaneous conversation', 'Complex ideas'],
  },
  comprehension: {
    easy: ['Single sentence understanding', 'One concept per exercise'],
    medium: ['Paragraph understanding', 'Multiple related ideas'],
    hard: ['Complex texts', 'Implied meanings', 'Cultural context'],
  },
};

// ============================================================================
// DIFFICULTY SELECTION GUIDE
// ============================================================================
/*
 * Use these guidelines when setting exercise difficulty:
 * 
 * EASY exercises if:
 * - Teaching a new concept for the first time
 * - Isolated single skill (not combining concepts)
 * - User has <40% proficiency in this skill
 * - Confidence building phase
 * 
 * MEDIUM exercises if:
 * - Combining 2-3 skills
 * - User has 40-75% proficiency
 * - Reinforcing known concepts
 * - Standard progression
 * 
 * HARD exercises if:
 * - Combining 3+ skills
 * - User has >75% proficiency
 * - Critical thinking required
 * - Challenge/mastery phase
 * 
 * Example progression for a user:
 * Session 1: All EASY (building foundation)
 * Session 2-5: Mix of EASY (70%) and MEDIUM (30%)
 * Session 6-15: Mix of MEDIUM (60%) and EASY (20%) and HARD (20%)
 * Session 16+: Mix of MEDIUM (40%) and HARD (50%) and EASY (10%)
 */

// ============================================================================
// SKILL TAG ASSIGNMENT EXAMPLES
// ============================================================================
/*
 * SINGLE SKILL TAGS (focused exercises):
 * - Just vocabulary: word-to-image matching
 * - Just listening: simple audio comprehension
 * - Just speaking: pronunciation drill
 * 
 * DUAL SKILL TAGS (combining concepts):
 * ["vocabulary", "listening"] - audio word recognition
 * ["grammar", "vocabulary"] - sentence building with new words
 * ["comprehension", "vocabulary"] - reading with new vocabulary
 * 
 * TRIPLE SKILL TAGS (complex exercises):
 * ["vocabulary", "grammar", "comprehension"] - full sentence understanding
 * ["listening", "grammar", "comprehension"] - audio conversation
 * 
 * RARELY USED:
 * [Multiple] tags should be used sparingly for truly complex exercises
 * Most exercises should focus on 1-2 skill areas
 */

export const exerciseDataTemplate = {
  basicExercise: {
    id: 'template-basic',
    type: 'multiple_choice' as const,
    prompt: 'Template question?',
    skillTags: ['vocabulary'], // ← Add your skill tags here
    difficulty: 'easy' as const, // ← Set appropriate difficulty
    options: [
      { id: 'opt-1', text: 'Option 1' },
      { id: 'opt-2', text: 'Option 2' },
    ],
    correctAnswerId: 'opt-1',
    hint: 'Optional hint',
  },

  advancedExercise: {
    id: 'template-advanced',
    type: 'listening' as const,
    prompt: 'Listen and understand',
    audioText: 'Audio content here',
    skillTags: ['listening', 'comprehension'], // ← Multiple related skills
    difficulty: 'hard' as const,
    options: [{ id: '1', text: 'Answer option' }],
    correctAnswerId: '1',
    hint: 'Guidance for complex exercise',
  },
};

// ============================================================================
// VALIDATION CHECKLIST
// ============================================================================
/*
 * Before exporting your exercises, verify:
 * 
 * [ ] Each exercise has skillTags array
 * [ ] Each exercise has difficulty level (easy/medium/hard)
 * [ ] skillTags only contain valid categories
 * [ ] Difficulty matches content complexity
 * [ ] Exercise prompts are clear and unambiguous
 * [ ] Hints are helpful but don't give away answers
 * [ ] Audio text is included for listening exercises
 * [ ] Speaking exercises have clear instructions
 * [ ] All answer IDs match option IDs
 * [ ] Exercises are logically ordered by difficulty
 * [ ] Mix of exercise types per lesson
 * [ ] No spelling or grammar errors in content
 */
