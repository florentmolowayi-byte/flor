import { Exercise, LanguageId } from '../types';

const createEnglishLessonExercises = (lessonId: string, topic: string, sentence: string[]) => [
  {
    id: `${lessonId}-review-1`,
    type: 'multiple_choice' as const,
    prompt: `Choose the word connected to ${topic}`,
    options: [
      { id: `${lessonId}-review-option-1`, text: topic },
      { id: `${lessonId}-review-option-2`, text: 'Yesterday' },
      { id: `${lessonId}-review-option-3`, text: 'Perhaps' },
    ],
    correctAnswerId: `${lessonId}-review-option-1`,
  },
  {
    id: `${lessonId}-review-2`,
    type: 'word_bank' as const,
    prompt: `Build the ${topic} sentence`,
    correctSentence: sentence,
    wordBankPool: [...sentence, 'please', 'today'],
  },
  {
    id: `${lessonId}-review-3`,
    type: 'match_pairs' as const,
    prompt: `Match the ${topic} phrases`,
    pairs: [
      { id: `${lessonId}-review-pair-1`, left: topic, right: 'Main topic' },
      { id: `${lessonId}-review-pair-2`, left: 'Please', right: 'Polite request' },
      { id: `${lessonId}-review-pair-3`, left: 'Thanks', right: 'Gratitude' },
      { id: `${lessonId}-review-pair-4`, left: 'Goodbye', right: 'Farewell' },
    ],
  },
  {
    id: `${lessonId}-review-4`,
    type: 'listening' as const,
    prompt: `Listen for the ${topic} phrase`,
    audioText: sentence.join(' '),
    options: [
      { id: `${lessonId}-review-listen-1`, text: sentence.join(' ') },
      { id: `${lessonId}-review-listen-2`, text: 'I was there yesterday' },
      { id: `${lessonId}-review-listen-3`, text: 'See you next week' },
    ],
    correctAnswerId: `${lessonId}-review-listen-1`,
  },
  {
    id: `${lessonId}-review-5`,
    type: 'speaking' as const,
    prompt: `Say this ${topic} phrase`,
    audioText: sentence.join(' '),
  },
  {
    id: `${lessonId}-review-6`,
    type: 'multiple_choice' as const,
    prompt: `Which phrase is useful for ${topic}?`,
    options: [
      { id: `${lessonId}-review-use-1`, text: sentence.join(' ') },
      { id: `${lessonId}-review-use-2`, text: 'The sky is blue' },
      { id: `${lessonId}-review-use-3`, text: 'I closed the window' },
    ],
    correctAnswerId: `${lessonId}-review-use-1`,
  },
  {
    id: `${lessonId}-review-7`,
    type: 'word_bank' as const,
    prompt: `Practice another ${topic} sentence`,
    correctSentence: ['I', 'practice', topic.toLowerCase(), 'today.'],
    wordBankPool: ['I', 'practice', topic.toLowerCase(), 'today.', 'never', 'yesterday'],
  },
  {
    id: `${lessonId}-review-8`,
    type: 'match_pairs' as const,
    prompt: `Match ${topic} vocabulary`,
    pairs: [
      { id: `${lessonId}-review-vocab-1`, left: topic, right: 'Useful vocabulary' },
      { id: `${lessonId}-review-vocab-2`, left: 'Today', right: 'This day' },
      { id: `${lessonId}-review-vocab-3`, left: 'Tomorrow', right: 'The next day' },
      { id: `${lessonId}-review-vocab-4`, left: 'Now', right: 'At this moment' },
    ],
  },
  {
    id: `${lessonId}-review-9`,
    type: 'listening' as const,
    prompt: 'Listen and select the complete sentence',
    audioText: `I am learning ${topic.toLowerCase()}`,
    options: [
      { id: `${lessonId}-review-complete-1`, text: `I am learning ${topic.toLowerCase()}` },
      { id: `${lessonId}-review-complete-2`, text: `I finished ${topic.toLowerCase()} yesterday` },
      { id: `${lessonId}-review-complete-3`, text: `I forgot my ${topic.toLowerCase()}` },
    ],
    correctAnswerId: `${lessonId}-review-complete-1`,
  },
  {
    id: `${lessonId}-review-10`,
    type: 'speaking' as const,
    prompt: `Say: "I am learning ${topic.toLowerCase()}"`,
    audioText: `I am learning ${topic.toLowerCase()}`,
  },
];

export const EXERCISES_BANK: Record<string, Exercise[]> = {
  // ENGLISH UNIT 1: Everyday English Basics
  'en-1-1': [
    {
      id: 'ex-en-1-1-1',
      type: 'multiple_choice',
      prompt: 'What does "Hello" mean?',
      audioText: 'Hello',
      options: [
        { id: 'en-hello-1', text: 'Goodbye', imageEmoji: '👋' },
        { id: 'en-hello-2', text: 'Hello', imageEmoji: '😊' },
        { id: 'en-hello-3', text: 'Thank you', imageEmoji: '🙏' },
      ],
      correctAnswerId: 'en-hello-2',
    },
    {
      id: 'ex-en-1-1-2',
      type: 'word_bank',
      prompt: 'Build the sentence: "My name is Flor"',
      audioText: 'My name is Flor',
      correctSentence: ['My', 'name', 'is', 'Flor.'],
      wordBankPool: ['My', 'name', 'is', 'Flor.', 'your', 'hello'],
    },
    {
      id: 'ex-en-1-1-3',
      type: 'match_pairs',
      prompt: 'Match the everyday phrases',
      pairs: [
        { id: 'en-p1', left: 'Hello', right: 'A greeting' },
        { id: 'en-p2', left: 'Goodbye', right: 'A farewell' },
        { id: 'en-p3', left: 'Please', right: 'A polite request' },
        { id: 'en-p4', left: 'Thanks', right: 'Gratitude' },
      ],
    },
    {
      id: 'ex-en-1-1-4',
      type: 'listening',
      prompt: 'Listen and choose what you hear:',
      audioText: 'Good morning',
      options: [
        { id: 'en-listen-1', text: 'Good evening' },
        { id: 'en-listen-2', text: 'Good morning' },
        { id: 'en-listen-3', text: 'Goodbye' },
      ],
      correctAnswerId: 'en-listen-2',
    },
    {
      id: 'ex-en-1-1-5',
      type: 'speaking',
      prompt: 'Say: "Nice to meet you"',
      audioText: 'Nice to meet you',
    },
    {
      id: 'ex-en-1-1-6',
      type: 'multiple_choice',
      prompt: 'Choose the polite way to ask for help',
      options: [
        { id: 'en-help-1', text: 'Help me now.' },
        { id: 'en-help-2', text: 'Please, can you help me?' },
        { id: 'en-help-3', text: 'You help.' },
      ],
      correctAnswerId: 'en-help-2',
    },
    {
      id: 'ex-en-1-1-7',
      type: 'word_bank',
      prompt: 'Build the sentence: "How are you?"',
      audioText: 'How are you?',
      correctSentence: ['How', 'are', 'you?'],
      wordBankPool: ['How', 'are', 'you?', 'I', 'am', 'hello'],
    },
    {
      id: 'ex-en-1-1-8',
      type: 'match_pairs',
      prompt: 'Match the questions and answers',
      pairs: [
        { id: 'en-qa-1', left: 'How are you?', right: 'I am fine.' },
        { id: 'en-qa-2', left: 'What is your name?', right: 'I am Flor.' },
        { id: 'en-qa-3', left: 'Where are you from?', right: 'I am from Brazil.' },
        { id: 'en-qa-4', left: 'See you soon?', right: 'See you!' },
      ],
    },
    {
      id: 'ex-en-1-1-9',
      type: 'listening',
      prompt: 'Listen and choose the correct phrase:',
      audioText: 'Thank you very much',
      options: [
        { id: 'en-thanks-1', text: 'Thank you very much' },
        { id: 'en-thanks-2', text: 'Please sit down' },
        { id: 'en-thanks-3', text: 'Nice to meet you' },
      ],
      correctAnswerId: 'en-thanks-1',
    },
    {
      id: 'ex-en-1-1-10',
      type: 'speaking',
      prompt: 'Say: "Have a great day"',
      audioText: 'Have a great day',
    },
  ],

  'en-1-2': [
    {
      id: 'ex-en-1-2-1',
      type: 'multiple_choice',
      prompt: 'Choose the correct phrase for a morning greeting',
      audioText: 'Good morning',
      options: [
        { id: 'en-daily-1', text: 'Good morning' },
        { id: 'en-daily-2', text: 'Good night' },
        { id: 'en-daily-3', text: 'See you tomorrow' },
      ],
      correctAnswerId: 'en-daily-1',
    },
    {
      id: 'ex-en-1-2-2',
      type: 'word_bank',
      prompt: 'Build the sentence: "I am from London"',
      audioText: 'I am from London',
      correctSentence: ['I', 'am', 'from', 'London.'],
      wordBankPool: ['I', 'am', 'from', 'London.', 'you', 'where'],
    },
    {
      id: 'ex-en-1-2-3',
      type: 'match_pairs',
      prompt: 'Match everyday questions and answers',
      pairs: [
        { id: 'en-daily-p1', left: 'How old are you?', right: 'I am twenty.' },
        { id: 'en-daily-p2', left: 'Where do you live?', right: 'I live in London.' },
        { id: 'en-daily-p3', left: 'What do you do?', right: 'I am a student.' },
        { id: 'en-daily-p4', left: 'Are you ready?', right: 'Yes, I am.' },
      ],
    },
    {
      id: 'ex-en-1-2-4',
      type: 'listening',
      prompt: 'Listen and choose what you hear:',
      audioText: 'I live in a small town',
      options: [
        { id: 'en-live-1', text: 'I work in a small shop' },
        { id: 'en-live-2', text: 'I live in a small town' },
        { id: 'en-live-3', text: 'I study in a big city' },
      ],
      correctAnswerId: 'en-live-2',
    },
    {
      id: 'ex-en-1-2-5',
      type: 'speaking',
      prompt: 'Say: "I speak English"',
      audioText: 'I speak English',
    },
    ...createEnglishLessonExercises('en-1-2-extra', 'daily English', ['I', 'speak', 'English.']).slice(0, 5),
  ],

  'en-2-1': [
    {
      id: 'ex-en-2-1-1', type: 'multiple_choice', prompt: 'Which word means a meal in the morning?',
      options: [{ id: 'food-1', text: 'Breakfast' }, { id: 'food-2', text: 'Dinner' }, { id: 'food-3', text: 'Snack' }], correctAnswerId: 'food-1',
    },
    {
      id: 'ex-en-2-1-2', type: 'word_bank', prompt: 'Build the sentence: "I like fresh fruit"',
      correctSentence: ['I', 'like', 'fresh', 'fruit.'], wordBankPool: ['I', 'like', 'fresh', 'fruit.', 'eat', 'bread'],
    },
    {
      id: 'ex-en-2-1-3', type: 'match_pairs', prompt: 'Match the food words',
      pairs: [{ id: 'food-p1', left: 'Apple', right: 'Fruit' }, { id: 'food-p2', left: 'Carrot', right: 'Vegetable' }, { id: 'food-p3', left: 'Bread', right: 'Bakery food' }, { id: 'food-p4', left: 'Water', right: 'Drink' }],
    },
    {
      id: 'ex-en-2-1-4', type: 'listening', prompt: 'Listen and choose the order:', audioText: 'A sandwich, please',
      options: [{ id: 'order-1', text: 'A sandwich, please' }, { id: 'order-2', text: 'A salad, thanks' }, { id: 'order-3', text: 'A coffee, please' }], correctAnswerId: 'order-1',
    },
    { id: 'ex-en-2-1-5', type: 'speaking', prompt: 'Say: "I would like some water"', audioText: 'I would like some water' },
    ...createEnglishLessonExercises('en-2-1-extra', 'food', ['I', 'like', 'fresh', 'food.']).slice(0, 5),
  ],

  'en-2-2': [
    {
      id: 'ex-en-2-2-1', type: 'multiple_choice', prompt: 'Choose the correct word: "The train is ___ the station."',
      options: [{ id: 'travel-1', text: 'at' }, { id: 'travel-2', text: 'blue' }, { id: 'travel-3', text: 'quickly' }], correctAnswerId: 'travel-1',
    },
    {
      id: 'ex-en-2-2-2', type: 'word_bank', prompt: 'Build the sentence: "Where is the airport?"',
      correctSentence: ['Where', 'is', 'the', 'airport?'], wordBankPool: ['Where', 'is', 'the', 'airport?', 'train', 'near'],
    },
    {
      id: 'ex-en-2-2-3', type: 'match_pairs', prompt: 'Match travel words',
      pairs: [{ id: 'travel-p1', left: 'Ticket', right: 'Permission to travel' }, { id: 'travel-p2', left: 'Station', right: 'Transport stop' }, { id: 'travel-p3', left: 'Map', right: 'Shows places' }, { id: 'travel-p4', left: 'Luggage', right: 'Travel bags' }],
    },
    {
      id: 'ex-en-2-2-4', type: 'listening', prompt: 'Listen and choose the direction:', audioText: 'Turn left at the corner',
      options: [{ id: 'direction-1', text: 'Turn right at the corner' }, { id: 'direction-2', text: 'Turn left at the corner' }, { id: 'direction-3', text: 'Stop at the station' }], correctAnswerId: 'direction-2',
    },
    { id: 'ex-en-2-2-5', type: 'speaking', prompt: 'Say: "How can I get to the hotel?"', audioText: 'How can I get to the hotel?' },
    ...createEnglishLessonExercises('en-2-2-extra', 'travel', ['I', 'need', 'a', 'ticket.']).slice(0, 5),
  ],

  'en-3-1': [
    {
      id: 'ex-en-3-1-1', type: 'multiple_choice', prompt: 'Which word describes yesterday?',
      options: [{ id: 'time-1', text: 'Past' }, { id: 'time-2', text: 'Future' }, { id: 'time-3', text: 'Later' }], correctAnswerId: 'time-1',
    },
    {
      id: 'ex-en-3-1-2', type: 'word_bank', prompt: 'Build the sentence: "I watched a film yesterday"',
      correctSentence: ['I', 'watched', 'a', 'film', 'yesterday.'], wordBankPool: ['I', 'watched', 'a', 'film', 'yesterday.', 'read', 'book'],
    },
    {
      id: 'ex-en-3-1-3', type: 'match_pairs', prompt: 'Match present and past verbs',
      pairs: [{ id: 'past-p1', left: 'go', right: 'went' }, { id: 'past-p2', left: 'eat', right: 'ate' }, { id: 'past-p3', left: 'see', right: 'saw' }, { id: 'past-p4', left: 'make', right: 'made' }],
    },
    {
      id: 'ex-en-3-1-4', type: 'listening', prompt: 'Listen and choose what happened:', audioText: 'She visited her family last weekend',
      options: [{ id: 'past-listen-1', text: 'She visited her family last weekend' }, { id: 'past-listen-2', text: 'She will visit her family tomorrow' }, { id: 'past-listen-3', text: 'She calls her family every day' }], correctAnswerId: 'past-listen-1',
    },
    { id: 'ex-en-3-1-5', type: 'speaking', prompt: 'Say: "I went to the park"', audioText: 'I went to the park' },
    ...createEnglishLessonExercises('en-3-1-extra', 'past tense', ['I', 'visited', 'the', 'park.']).slice(0, 5),
  ],

  'en-3-2': [
    {
      id: 'ex-en-3-2-1', type: 'multiple_choice', prompt: 'Choose the future form: "I ___ call you tomorrow."',
      options: [{ id: 'future-1', text: 'will' }, { id: 'future-2', text: 'was' }, { id: 'future-3', text: 'did' }], correctAnswerId: 'future-1',
    },
    {
      id: 'ex-en-3-2-2', type: 'word_bank', prompt: 'Build the sentence: "We will meet next week"',
      correctSentence: ['We', 'will', 'meet', 'next', 'week.'], wordBankPool: ['We', 'will', 'meet', 'next', 'week.', 'last', 'month'],
    },
    {
      id: 'ex-en-3-2-3', type: 'match_pairs', prompt: 'Match time expressions',
      pairs: [{ id: 'future-p1', left: 'Yesterday', right: 'The day before today' }, { id: 'future-p2', left: 'Today', right: 'This day' }, { id: 'future-p3', left: 'Tomorrow', right: 'The day after today' }, { id: 'future-p4', left: 'Next week', right: 'The coming week' }],
    },
    {
      id: 'ex-en-3-2-4', type: 'listening', prompt: 'Listen and choose the plan:', audioText: 'We will travel next summer',
      options: [{ id: 'future-listen-1', text: 'We traveled last summer' }, { id: 'future-listen-2', text: 'We will travel next summer' }, { id: 'future-listen-3', text: 'We travel every summer' }], correctAnswerId: 'future-listen-2',
    },
    { id: 'ex-en-3-2-5', type: 'speaking', prompt: 'Say: "I will practice tomorrow"', audioText: 'I will practice tomorrow' },
    ...createEnglishLessonExercises('en-3-2-extra', 'future plans', ['I', 'will', 'practice', 'tomorrow.']).slice(0, 5),
  ],

  'en-4-1': [
    {
      id: 'ex-en-4-1-1', type: 'multiple_choice', prompt: 'Which phrase gives an opinion?',
      options: [{ id: 'opinion-1', text: 'I think it is useful.' }, { id: 'opinion-2', text: 'Close the door.' }, { id: 'opinion-3', text: 'Where is it?' }], correctAnswerId: 'opinion-1',
    },
    {
      id: 'ex-en-4-1-2', type: 'word_bank', prompt: 'Build the sentence: "In my opinion, it is interesting"',
      correctSentence: ['In', 'my', 'opinion,', 'it', 'is', 'interesting.'], wordBankPool: ['In', 'my', 'opinion,', 'it', 'is', 'interesting.', 'boring'],
    },
    {
      id: 'ex-en-4-1-3', type: 'match_pairs', prompt: 'Match opinion phrases',
      pairs: [{ id: 'opinion-p1', left: 'I think', right: 'My idea is' }, { id: 'opinion-p2', left: 'I agree', right: 'We have the same idea' }, { id: 'opinion-p3', left: 'I disagree', right: 'I have a different idea' }, { id: 'opinion-p4', left: 'Maybe', right: 'Possibly' }],
    },
    {
      id: 'ex-en-4-1-4', type: 'listening', prompt: 'Listen and choose the opinion:', audioText: 'I think this book is helpful',
      options: [{ id: 'opinion-listen-1', text: 'I think this book is helpful' }, { id: 'opinion-listen-2', text: 'I bought a new book yesterday' }, { id: 'opinion-listen-3', text: 'I left the book at home' }], correctAnswerId: 'opinion-listen-1',
    },
    { id: 'ex-en-4-1-5', type: 'speaking', prompt: 'Say: "I agree with you"', audioText: 'I agree with you' },
    ...createEnglishLessonExercises('en-4-1-extra', 'opinions', ['I', 'think', 'it', 'is', 'useful.']).slice(0, 5),
  ],

  'en-4-2': [
    {
      id: 'ex-en-4-2-1', type: 'multiple_choice', prompt: 'Choose the best way to end a polite email',
      options: [{ id: 'email-1', text: 'Best wishes' }, { id: 'email-2', text: 'See ya, robot' }, { id: 'email-3', text: 'Give me that' }], correctAnswerId: 'email-1',
    },
    {
      id: 'ex-en-4-2-2', type: 'word_bank', prompt: 'Build the sentence: "Thank you for your message"',
      correctSentence: ['Thank', 'you', 'for', 'your', 'message.'], wordBankPool: ['Thank', 'you', 'for', 'your', 'message.', 'email', 'today'],
    },
    {
      id: 'ex-en-4-2-3', type: 'match_pairs', prompt: 'Match formal expressions',
      pairs: [{ id: 'email-p1', left: 'Dear', right: 'Formal greeting' }, { id: 'email-p2', left: 'Could you please', right: 'Polite request' }, { id: 'email-p3', left: 'Thank you', right: 'Expression of gratitude' }, { id: 'email-p4', left: 'Best regards', right: 'Formal closing' }],
    },
    {
      id: 'ex-en-4-2-4', type: 'listening', prompt: 'Listen and choose the request:', audioText: 'Could you send me the document?',
      options: [{ id: 'email-listen-1', text: 'Could you send me the document?' }, { id: 'email-listen-2', text: 'Did you read the document?' }, { id: 'email-listen-3', text: 'I wrote the document.' }], correctAnswerId: 'email-listen-1',
    },
    { id: 'ex-en-4-2-5', type: 'speaking', prompt: 'Say: "Thank you for your help"', audioText: 'Thank you for your help' },
    ...createEnglishLessonExercises('en-4-2-extra', 'polite communication', ['Thank', 'you', 'for', 'your', 'help.']).slice(0, 5),
  ],

  'en-5-1': createEnglishLessonExercises('en-5-1', 'work and careers', ['I', 'work', 'with', 'a', 'team.']),
  'en-6-1': createEnglishLessonExercises('en-6-1', 'health and wellness', ['I', 'feel', 'much', 'better', 'today.']),
  'en-7-1': createEnglishLessonExercises('en-7-1', 'home and family', ['My', 'family', 'lives', 'nearby.']),
  'en-8-1': createEnglishLessonExercises('en-8-1', 'shopping and money', ['How', 'much', 'does', 'it', 'cost?']),
  'en-9-1': createEnglishLessonExercises('en-9-1', 'nature and environment', ['The', 'weather', 'is', 'beautiful', 'today.']),
  'en-10-1': createEnglishLessonExercises('en-10-1', 'advanced conversation', ['I', 'would', 'like', 'to', 'discuss', 'this.']),

  // SPANISH LESSON 1: Greetings 1
  'es-1-1': [
    {
      id: 'ex-es-1-1-1',
      type: 'multiple_choice',
      prompt: 'Select the correct translation for "Hello"',
      audioText: 'Hola',
      options: [
        { id: 'opt-1', text: 'Gracias', translation: 'Thank you', imageEmoji: '🙏' },
        { id: 'opt-2', text: 'Por favor', translation: 'Please', imageEmoji: '✨' },
        { id: 'opt-3', text: 'Hola', translation: 'Hello', imageEmoji: '👋' },
        { id: 'opt-4', text: 'Adiós', translation: 'Goodbye', imageEmoji: '🚶' },
      ],
      correctAnswerId: 'opt-3',
      hint: '"Hola" is the most common friendly hello in Spanish!',
    },
    {
      id: 'ex-es-1-1-2',
      type: 'word_bank',
      prompt: 'Translate this sentence: "Hello, my name is Duo"',
      audioText: 'Hola, me llamo Duo',
      correctSentence: ['Hola,', 'me', 'llamo', 'Duo.'],
      wordBankPool: ['Hola,', 'me', 'llamo', 'Duo.', 'gracias', 'adios', 'favor', 'como'],
      hint: 'Spanish uses "me llamo" to mean "I call myself / my name is".',
    },
    {
      id: 'ex-es-1-1-3',
      type: 'match_pairs',
      prompt: 'Tap the matching pairs',
      pairs: [
        { id: 'p1', left: 'Hola', right: 'Hello' },
        { id: 'p2', left: 'Gracias', right: 'Thank you' },
        { id: 'p3', left: 'Buenos días', right: 'Good morning' },
        { id: 'p4', left: 'Adiós', right: 'Goodbye' },
      ],
      hint: 'Match Spanish words on the left with English translations on the right.',
    },
    {
      id: 'ex-es-1-1-4',
      type: 'listening',
      prompt: 'Listen to the audio and select what you hear:',
      audioText: 'Buenos días, ¿cómo estás?',
      options: [
        { id: 'l1', text: 'Buenas noches, adiós' },
        { id: 'l2', text: 'Muchas gracias, por favor' },
        { id: 'l3', text: 'Buenos días, ¿cómo estás?' },
      ],
      correctAnswerId: 'l3',
      hint: 'The phrase starts with "Buenos días" (Good morning).',
    },
    {
      id: 'ex-es-1-1-5',
      type: 'speaking',
      prompt: 'Repeat after Duo in Spanish: "¡Muchas gracias!"',
      audioText: 'Muchas gracias',
      hint: 'Press the microphone button and say "Muchas gracias" clearly!',
    },
  ],

  // SPANISH LESSON 2: Basics 2
  'es-1-2': [
    {
      id: 'ex-es-1-2-1',
      type: 'multiple_choice',
      prompt: 'What does "Por favor" mean?',
      audioText: 'Por favor',
      options: [
        { id: 'opt-2-1', text: 'Good morning', imageEmoji: '🌅' },
        { id: 'opt-2-2', text: 'Excuse me', imageEmoji: '🙋‍♂️' },
        { id: 'opt-2-3', text: 'Welcome', imageEmoji: '🏡' },
        { id: 'opt-2-4', text: 'Please', imageEmoji: '🤲' },
      ],
      correctAnswerId: 'opt-2-4',
      hint: 'Use "por favor" whenever requesting something politely.',
    },
    {
      id: 'ex-es-1-2-2',
      type: 'word_bank',
      prompt: 'Translate: "Yes, please and thank you"',
      audioText: 'Sí, por favor y gracias',
      correctSentence: ['Sí,', 'por', 'favor', 'y', 'gracias.'],
      wordBankPool: ['Sí,', 'por', 'favor', 'y', 'gracias.', 'No,', 'de', 'nada'],
      hint: '"y" means "and" in Spanish.',
    },
    {
      id: 'ex-es-1-2-3',
      type: 'match_pairs',
      prompt: 'Match the polite terms',
      pairs: [
        { id: 'mp1', left: 'Sí', right: 'Yes' },
        { id: 'mp2', left: 'No', right: 'No' },
        { id: 'mp3', left: 'De nada', right: "You're welcome" },
        { id: 'mp4', left: 'Perdón', right: 'Sorry' },
      ],
    },
    {
      id: 'ex-es-1-2-4',
      type: 'listening',
      prompt: 'Listen and choose the matching phrase:',
      audioText: 'De nada, mi amigo',
      options: [
        { id: 'lo1', text: 'Hola, mi amigo' },
        { id: 'lo2', text: 'Buenas tardes, señor' },
        { id: 'lo3', text: 'De nada, mi amigo' },
      ],
      correctAnswerId: 'lo3',
    },
    {
      id: 'ex-es-1-2-5',
      type: 'speaking',
      prompt: 'Practice saying: "De nada, por favor"',
      audioText: 'De nada, por favor',
      hint: 'Pronounce "De nada" as "day nah-dah"',
    },
  ],

  // SPANISH LESSON 3: Polite Words
  'es-1-3': [
    {
      id: 'ex-es-1-3-1',
      type: 'multiple_choice',
      prompt: 'Select the correct translation for "Good evening / Good night"',
      audioText: 'Buenas noches',
      options: [
        { id: 'opt-3-1', text: 'Buenas noches', imageEmoji: '🌙' },
        { id: 'opt-3-2', text: 'Buenos días', imageEmoji: '☀️' },
        { id: 'opt-3-3', text: 'Buenas tardes', imageEmoji: '🌆' },
      ],
      correctAnswerId: 'opt-3-1',
    },
    {
      id: 'ex-es-1-3-2',
      type: 'word_bank',
      prompt: 'Translate: "Good night, see you tomorrow!"',
      audioText: 'Buenas noches, ¡hasta mañana!',
      correctSentence: ['Buenas', 'noches,', '¡hasta', 'mañana!'],
      wordBankPool: ['Buenas', 'noches,', '¡hasta', 'mañana!', 'hoy', 'ayer', 'tarde'],
    },
    {
      id: 'ex-es-1-3-3',
      type: 'match_pairs',
      prompt: 'Match time greetings',
      pairs: [
        { id: 'mg1', left: 'Buenos días', right: 'Good morning' },
        { id: 'mg2', left: 'Buenas tardes', right: 'Good afternoon' },
        { id: 'mg3', left: 'Buenas noches', right: 'Good night' },
        { id: 'mg4', left: 'Hasta luego', right: 'See you later' },
      ],
    },
    {
      id: 'ex-es-1-3-4',
      type: 'listening',
      prompt: 'Listen and pick the correct option:',
      audioText: 'Hasta luego, amigo',
      options: [
        { id: 'lis1', text: 'Hasta luego, amigo' },
        { id: 'lis2', text: 'Hasta mañana, amigo' },
        { id: 'lis3', text: 'Buenos días, amigo' },
      ],
      correctAnswerId: 'lis1',
    },
    {
      id: 'ex-es-1-3-5',
      type: 'speaking',
      prompt: 'Say out loud: "¡Hasta mañana!"',
      audioText: 'Hasta mañana',
    },
  ],

  // FRENCH LESSON 1: Greetings 1
  'fr-1-1': [
    {
      id: 'ex-fr-1-1-1',
      type: 'multiple_choice',
      prompt: 'What is "Hello" in French?',
      audioText: 'Bonjour',
      options: [
        { id: 'fr-o1', text: 'Bonjour', translation: 'Hello', imageEmoji: '🥖' },
        { id: 'fr-o2', text: 'Merci', translation: 'Thank you', imageEmoji: '🙏' },
        { id: 'fr-o3', text: 'Au revoir', translation: 'Goodbye', imageEmoji: '👋' },
        { id: 'fr-o4', text: 'S’il vous plaît', translation: 'Please', imageEmoji: '✨' },
      ],
      correctAnswerId: 'fr-o1',
    },
    {
      id: 'ex-fr-1-1-2',
      type: 'word_bank',
      prompt: 'Translate: "Hello, thank you very much!"',
      audioText: 'Bonjour, merci beaucoup!',
      correctSentence: ['Bonjour,', 'merci', 'beaucoup!'],
      wordBankPool: ['Bonjour,', 'merci', 'beaucoup!', 'oui', 'non', 'salut'],
    },
    {
      id: 'ex-fr-1-1-3',
      type: 'match_pairs',
      prompt: 'Match French greetings',
      pairs: [
        { id: 'fp1', left: 'Bonjour', right: 'Hello' },
        { id: 'fp2', left: 'Merci', right: 'Thank you' },
        { id: 'fp3', left: 'Salut', right: 'Hi / Bye' },
        { id: 'fp4', left: 'Oui', right: 'Yes' },
      ],
    },
    {
      id: 'ex-fr-1-1-4',
      type: 'listening',
      prompt: 'Listen to the French phrase:',
      audioText: 'Comment allez-vous?',
      options: [
        { id: 'fl1', text: 'Comment allez-vous?' },
        { id: 'fl2', text: 'Bonjour monsieur' },
        { id: 'fl3', text: 'Merci beaucoup' },
      ],
      correctAnswerId: 'fl1',
    },
    {
      id: 'ex-fr-1-1-5',
      type: 'speaking',
      prompt: 'Speak in French: "Bonjour et merci!"',
      audioText: 'Bonjour et merci',
    },
  ],

  // GERMAN LESSON 1
  'de-1-1': [
    {
      id: 'ex-de-1-1-1',
      type: 'multiple_choice',
      prompt: 'Select the German word for "Hello"',
      audioText: 'Hallo',
      options: [
        { id: 'de-o1', text: 'Hallo', imageEmoji: '🥨' },
        { id: 'de-o2', text: 'Danke', imageEmoji: '🙏' },
        { id: 'de-o3', text: 'Tschüss', imageEmoji: '👋' },
      ],
      correctAnswerId: 'de-o1',
    },
    {
      id: 'ex-de-1-1-2',
      type: 'word_bank',
      prompt: 'Translate: "Hello and thank you"',
      audioText: 'Hallo und danke',
      correctSentence: ['Hallo', 'und', 'danke.'],
      wordBankPool: ['Hallo', 'und', 'danke.', 'bitte', 'ja', 'nein'],
    },
    {
      id: 'ex-de-1-1-3',
      type: 'match_pairs',
      prompt: 'Match German words',
      pairs: [
        { id: 'dp1', left: 'Hallo', right: 'Hello' },
        { id: 'dp2', left: 'Danke', right: 'Thank you' },
        { id: 'dp3', left: 'Bitte', right: 'Please / You are welcome' },
        { id: 'dp4', left: 'Ja', right: 'Yes' },
      ],
    },
    {
      id: 'ex-de-1-1-4',
      type: 'listening',
      prompt: 'Listen and select the German phrase:',
      audioText: 'Guten Morgen!',
      options: [
        { id: 'dl1', text: 'Guten Morgen!' },
        { id: 'dl2', text: 'Guten Abend!' },
        { id: 'dl3', text: 'Auf Wiedersehen!' },
      ],
      correctAnswerId: 'dl1',
    },
    {
      id: 'ex-de-1-1-5',
      type: 'speaking',
      prompt: 'Repeat after Duo: "Guten Tag!"',
      audioText: 'Guten Tag',
    },
  ],

  // JAPANESE LESSON 1
  'ja-1-1': [
    {
      id: 'ex-ja-1-1-1',
      type: 'multiple_choice',
      prompt: 'Select "Hello" in Japanese (Konnichiwa)',
      audioText: 'こんにちは',
      options: [
        { id: 'ja-o1', text: 'こんにちは (Konnichiwa)', imageEmoji: '🌸' },
        { id: 'ja-o2', text: 'ありがとう (Arigatou)', imageEmoji: '🙏' },
        { id: 'ja-o3', text: 'さようなら (Sayounara)', imageEmoji: '👋' },
      ],
      correctAnswerId: 'ja-o1',
    },
    {
      id: 'ex-ja-1-1-2',
      type: 'match_pairs',
      prompt: 'Match Japanese greetings with English',
      pairs: [
        { id: 'jp1', left: 'こんにちは', right: 'Hello' },
        { id: 'jp2', left: 'ありがとう', right: 'Thank you' },
        { id: 'jp3', left: 'はい', right: 'Yes' },
        { id: 'jp4', left: 'いいえ', right: 'No' },
      ],
    },
    {
      id: 'ex-ja-1-1-3',
      type: 'word_bank',
      prompt: 'Translate: "Hello, thank you very much!"',
      audioText: 'こんにちは、ありがとうございます！',
      correctSentence: ['こんにちは、', 'ありがとう', 'ございます！'],
      wordBankPool: ['こんにちは、', 'ありがとう', 'ございます！', 'はい', 'いいえ'],
    },
    {
      id: 'ex-ja-1-1-4',
      type: 'listening',
      prompt: 'Listen and select what you hear:',
      audioText: 'おはようございます',
      options: [
        { id: 'jl1', text: 'おはようございます (Good morning)' },
        { id: 'jl2', text: 'こんばんは (Good evening)' },
        { id: 'jl3', text: 'おやすみなさい (Good night)' },
      ],
      correctAnswerId: 'jl1',
    },
    {
      id: 'ex-ja-1-1-5',
      type: 'speaking',
      prompt: 'Say clearly in Japanese: "Arigatou gozaimasu!"',
      audioText: 'ありがとうございます',
    },
  ],

  // ITALIAN LESSON 1
  'it-1-1': [
    {
      id: 'ex-it-1-1-1',
      type: 'multiple_choice',
      prompt: 'Select "Hello / Bye" in Italian',
      audioText: 'Ciao',
      options: [
        { id: 'it-o1', text: 'Ciao', imageEmoji: '🍕' },
        { id: 'it-o2', text: 'Grazie', imageEmoji: '🙏' },
        { id: 'it-o3', text: 'Prego', imageEmoji: '✨' },
      ],
      correctAnswerId: 'it-o1',
    },
    {
      id: 'ex-it-1-1-2',
      type: 'match_pairs',
      prompt: 'Match Italian words',
      pairs: [
        { id: 'itp1', left: 'Ciao', right: 'Hi / Bye' },
        { id: 'itp2', left: 'Grazie', right: 'Thank you' },
        { id: 'itp3', left: 'Buongiorno', right: 'Good morning' },
        { id: 'itp4', left: 'Per favore', right: 'Please' },
      ],
    },
    {
      id: 'ex-it-1-1-3',
      type: 'word_bank',
      prompt: 'Translate: "Ciao, thank you very much!"',
      audioText: 'Ciao, grazie mille!',
      correctSentence: ['Ciao,', 'grazie', 'mille!'],
      wordBankPool: ['Ciao,', 'grazie', 'mille!', 'si', 'no', 'prego'],
    },
    {
      id: 'ex-it-1-1-4',
      type: 'listening',
      prompt: 'Listen to Italian phrase:',
      audioText: 'Buongiorno a tutti!',
      options: [
        { id: 'itl1', text: 'Buongiorno a tutti!' },
        { id: 'itl2', text: 'Buona sera a tutti!' },
        { id: 'itl3', text: 'Arrivederci a tutti!' },
      ],
      correctAnswerId: 'itl1',
    },
    {
      id: 'ex-it-1-1-5',
      type: 'speaking',
      prompt: 'Speak in Italian: "Grazie mille!"',
      audioText: 'Grazie mille',
    },
  ],

  // MANDARIN LESSON 1
  'zh-1-1': [
    {
      id: 'ex-zh-1-1-1',
      type: 'multiple_choice',
      prompt: 'Select "Hello" in Mandarin Chinese (Nǐ hǎo)',
      audioText: '你好',
      options: [
        { id: 'zh-o1', text: '你好 (Nǐ hǎo)', imageEmoji: '🇨🇳' },
        { id: 'zh-o2', text: '谢谢 (Xièxie)', imageEmoji: '🙏' },
        { id: 'zh-o3', text: '再见 (Zàijiàn)', imageEmoji: '👋' },
      ],
      correctAnswerId: 'zh-o1',
    },
    {
      id: 'ex-zh-1-1-2',
      type: 'match_pairs',
      prompt: 'Match Chinese phrases',
      pairs: [
        { id: 'zhp1', left: '你好', right: 'Hello' },
        { id: 'zhp2', left: '谢谢', right: 'Thank you' },
        { id: 'zhp3', left: '再见', right: 'Goodbye' },
        { id: 'zhp4', left: '不客气', right: "You're welcome" },
      ],
    },
    {
      id: 'ex-zh-1-1-3',
      type: 'word_bank',
      prompt: 'Translate: "Hello, thank you!"',
      audioText: '你好，谢谢！',
      correctSentence: ['你好，', '谢谢！'],
      wordBankPool: ['你好，', '谢谢！', '再见', '对不起'],
    },
    {
      id: 'ex-zh-1-1-4',
      type: 'listening',
      prompt: 'Listen to the Mandarin audio:',
      audioText: '早上好，你好吗？',
      options: [
        { id: 'zhl1', text: '早上好，你好吗？(Good morning, how are you?)' },
        { id: 'zhl2', text: '晚上好，再见 (Good evening, bye)' },
      ],
      correctAnswerId: 'zhl1',
    },
    {
      id: 'ex-zh-1-1-5',
      type: 'speaking',
      prompt: 'Repeat in Mandarin: "Xièxie nǐ!"',
      audioText: '谢谢你',
    },
  ],

  // TURKISH LESSON 1: Greetings & Introductions
  'tr-1-1': [
    {
      id: 'ex-tr-1-1-1',
      type: 'multiple_choice',
      prompt: 'Merhaba: which Turkish word belongs to this greeting?',
      audioText: 'Merhaba',
      options: [
        { id: 'tr-opt-1', text: 'Merhaba', translation: 'Hello', imageEmoji: '👋' },
        { id: 'tr-opt-2', text: 'Teşekkür ederim', translation: 'Thank you', imageEmoji: '🙏' },
        { id: 'tr-opt-3', text: 'Lütfen', translation: 'Please', imageEmoji: '✨' },
        { id: 'tr-opt-4', text: 'Hoşça kalın', translation: 'Goodbye', imageEmoji: '🚶' },
      ],
      correctAnswerId: 'tr-opt-1',
      hint: '"Merhaba" is the most common friendly hello in Turkish!',
    },
    {
      id: 'ex-tr-1-1-2',
      type: 'word_bank',
      prompt: 'Translate this sentence: "Hello, my name is Duo"',
      audioText: 'Merhaba, benim adım Duo',
      correctSentence: ['Merhaba,', 'benim', 'adım', 'Duo.'],
      wordBankPool: ['Merhaba,', 'benim', 'adım', 'Duo.', 'teşekkür', 'hoşça', 'lütfen', 'nasıl'],
      hint: 'Turkish uses "benim adım" to mean "my name is".',
    },
    {
      id: 'ex-tr-1-1-3',
      type: 'match_pairs',
      prompt: 'Tap the matching pairs',
      pairs: [
        { id: 'tr-p1', left: 'Merhaba', right: 'Hello' },
        { id: 'tr-p2', left: 'Teşekkür ederim', right: 'Thank you' },
        { id: 'tr-p3', left: 'Günaydın', right: 'Good morning' },
        { id: 'tr-p4', left: 'Hoşça kalın', right: 'Goodbye' },
      ],
      hint: 'Match Turkish words on the left with English translations on the right.',
    },
    {
      id: 'ex-tr-1-1-4',
      type: 'listening',
      prompt: 'Listen to the audio and select what you hear:',
      audioText: 'Günaydın, nasılsınız?',
      options: [
        { id: 'tr-l1', text: 'Günaydın, nasılsınız?' },
        { id: 'tr-l2', text: 'İyi akşamlar, hoşça kalın' },
        { id: 'tr-l3', text: 'Çok teşekkür ederim, lütfen' },
      ],
      correctAnswerId: 'tr-l1',
      hint: 'The phrase starts with "Günaydın" (Good morning).',
    },
    {
      id: 'ex-tr-1-1-5',
      type: 'speaking',
      prompt: 'Repeat after Duo in Turkish: "Çok teşekkür ederim!"',
      audioText: 'Çok teşekkür ederim',
      hint: 'Press the microphone button and say "Çok teşekkür ederim" clearly!',
    },
    {
      id: 'ex-tr-1-1-6',
      type: 'multiple_choice',
      prompt: 'How do you say "Please" in Turkish?',
      audioText: 'Lütfen',
      options: [
        { id: 'tr-please-1', text: 'Lütfen', imageEmoji: '🤲' },
        { id: 'tr-please-2', text: 'Güle güle', imageEmoji: '👋' },
        { id: 'tr-please-3', text: 'Nasılsınız?', imageEmoji: '😊' },
      ],
      correctAnswerId: 'tr-please-1',
    },
    {
      id: 'ex-tr-1-1-7',
      type: 'word_bank',
      prompt: 'Translate: "How are you?"',
      audioText: 'Nasılsın?',
      correctSentence: ['Nasılsın?'],
      wordBankPool: ['Nasılsın?', 'Merhaba', 'Teşekkürler', 'Lütfen'],
      hint: 'Use "Nasılsın?" when asking one person how they are.',
    },
    {
      id: 'ex-tr-1-1-8',
      type: 'match_pairs',
      prompt: 'Match more Turkish greetings',
      pairs: [
        { id: 'tr-greet-p1', left: 'Nasılsın?', right: 'How are you?' },
        { id: 'tr-greet-p2', left: 'İyiyim', right: 'I am fine' },
        { id: 'tr-greet-p3', left: 'Görüşürüz', right: 'See you' },
        { id: 'tr-greet-p4', left: 'Hoş geldin', right: 'Welcome' },
      ],
    },
    {
      id: 'ex-tr-1-1-9',
      type: 'listening',
      prompt: 'Listen and choose the phrase you hear:',
      audioText: 'Benim adım Flor',
      options: [
        { id: 'tr-name-1', text: 'Benim adım Flor' },
        { id: 'tr-name-2', text: 'Ben Türkçe öğreniyorum' },
        { id: 'tr-name-3', text: 'Görüşürüz, arkadaşım' },
      ],
      correctAnswerId: 'tr-name-1',
    },
    {
      id: 'ex-tr-1-1-10',
      type: 'speaking',
      prompt: 'Say in Turkish: "I am fine, thank you"',
      audioText: 'İyiyim, teşekkür ederim',
      hint: 'Say "İyiyim, teşekkür ederim" clearly.',
    },
  ],

  // TURKISH LESSON 2: Numbers & Shopping
  'tr-1-2': [
    {
      id: 'ex-tr-1-2-1',
      type: 'multiple_choice',
      prompt: 'What does "Bir" mean in Turkish?',
      audioText: 'Bir',
      options: [
        { id: 'tr-opt-2-1', text: 'One', imageEmoji: '1️⃣' },
        { id: 'tr-opt-2-2', text: 'Two', imageEmoji: '2️⃣' },
        { id: 'tr-opt-2-3', text: 'Three', imageEmoji: '3️⃣' },
        { id: 'tr-opt-2-4', text: 'Zero', imageEmoji: '0️⃣' },
      ],
      correctAnswerId: 'tr-opt-2-1',
      hint: 'Use "bir" when counting or ordering something.',
    },
    {
      id: 'ex-tr-1-2-2',
      type: 'word_bank',
      prompt: 'Translate: "How much does it cost?"',
      audioText: 'Ne kadar tutuyor?',
      correctSentence: ['Ne', 'kadar', 'tutuyor?'],
      wordBankPool: ['Ne', 'kadar', 'tutuyor?', 'kaç', 'fiyat', 'para', 'ucuz'],
      hint: '"Ne kadar" means "how much" in Turkish.',
    },
    {
      id: 'ex-tr-1-2-3',
      type: 'match_pairs',
      prompt: 'Match Turkish numbers with English',
      pairs: [
        { id: 'tr-mp1', left: 'Bir', right: 'One' },
        { id: 'tr-mp2', left: 'İki', right: 'Two' },
        { id: 'tr-mp3', left: 'Üç', right: 'Three' },
        { id: 'tr-mp4', left: 'Dört', right: 'Four' },
      ],
    },
    {
      id: 'ex-tr-1-2-4',
      type: 'listening',
      prompt: 'Listen and choose the correct option:',
      audioText: 'Beş lira, lütfen',
      options: [
        { id: 'tr-lo1', text: 'Beş lira, lütfen' },
        { id: 'tr-lo2', text: 'Altı lira, teşekkür ederim' },
        { id: 'tr-lo3', text: 'Yedi lira, hoşça kalın' },
      ],
      correctAnswerId: 'tr-lo1',
      hint: '"Beş" means five in Turkish.',
    },
    {
      id: 'ex-tr-1-2-5',
      type: 'speaking',
      prompt: 'Practice saying in Turkish: "Bir kahve, lütfen"',
      audioText: 'Bir kahve, lütfen',
      hint: 'Pronounce: "One coffee, please" - ordering a basic item at a café!',
    },
  ],

  // TURKISH LESSON 3: Asking Questions
  'tr-2-1': [
    {
      id: 'ex-tr-2-1-1',
      type: 'multiple_choice',
      prompt: 'What does "Nerelisin?" mean?',
      audioText: 'Nerelisin?',
      options: [
        { id: 'tr-opt-3-1', text: 'Where are you from?', imageEmoji: '🌍' },
        { id: 'tr-opt-3-2', text: 'What is your name?', imageEmoji: '📝' },
        { id: 'tr-opt-3-3', text: 'How old are you?', imageEmoji: '🎂' },
        { id: 'tr-opt-3-4', text: 'What do you do?', imageEmoji: '💼' },
      ],
      correctAnswerId: 'tr-opt-3-1',
      hint: '"Nerelisin" is used to ask where someone is from.',
    },
    {
      id: 'ex-tr-2-1-2',
      type: 'word_bank',
      prompt: 'Translate: "What is your name?"',
      audioText: 'Senin adın ne?',
      correctSentence: ['Senin', 'adın', 'ne?'],
      wordBankPool: ['Senin', 'adın', 'ne?', 'nerede', 'kaç', 'kim'],
      hint: '"Adın" means "your name" in Turkish.',
    },
    {
      id: 'ex-tr-2-1-3',
      type: 'match_pairs',
      prompt: 'Match Turkish questions with English',
      pairs: [
        { id: 'tr-mp-q1', left: 'Nerelisin?', right: 'Where are you from?' },
        { id: 'tr-mp-q2', left: 'Kaç yaşındasın?', right: 'How old are you?' },
        { id: 'tr-mp-q3', left: 'Ne yaparsın?', right: 'What do you do?' },
        { id: 'tr-mp-q4', left: 'Neredesin?', right: 'Where are you?' },
      ],
    },
    {
      id: 'ex-tr-2-1-4',
      type: 'listening',
      prompt: 'Listen and choose the correct question:',
      audioText: 'Nasılsın?',
      options: [
        { id: 'tr-lo-q1', text: 'Nasılsın? (How are you?)' },
        { id: 'tr-lo-q2', text: 'Neredesin? (Where are you?)' },
        { id: 'tr-lo-q3', text: 'Ne iyisin? (What are you good at?)' },
      ],
      correctAnswerId: 'tr-lo-q1',
      hint: '"Nasılsın" is a common greeting asking how someone is.',
    },
    {
      id: 'ex-tr-2-1-5',
      type: 'speaking',
      prompt: 'Ask in Turkish: "How are you?" - Nasılsın?',
      audioText: 'Nasılsın?',
      hint: 'A friendly way to greet and ask how someone is doing!',
    },
  ],

  // TURKISH LESSON 4: Food & Dining
  'tr-2-2': [
    {
      id: 'ex-tr-2-2-1',
      type: 'multiple_choice',
      prompt: 'What does "Yemek" mean?',
      audioText: 'Yemek',
      options: [
        { id: 'tr-opt-4-1', text: 'Food', imageEmoji: '🍽️' },
        { id: 'tr-opt-4-2', text: 'Drink', imageEmoji: '🍷' },
        { id: 'tr-opt-4-3', text: 'Bread', imageEmoji: '🍞' },
        { id: 'tr-opt-4-4', text: 'Water', imageEmoji: '💧' },
      ],
      correctAnswerId: 'tr-opt-4-1',
      hint: '"Yemek" is one of the most important words for dining!',
    },
    {
      id: 'ex-tr-2-2-2',
      type: 'word_bank',
      prompt: 'Translate: "I like Turkish food"',
      audioText: 'Türk yemeği seviyorum',
      correctSentence: ['Türk', 'yemeği', 'seviyorum'],
      wordBankPool: ['Türk', 'yemeği', 'seviyorum', 'içeceği', 'pişirmeyi', 'yemekle'],
      hint: '"seviyorum" means "I like" in Turkish.',
    },
    {
      id: 'ex-tr-2-2-3',
      type: 'match_pairs',
      prompt: 'Match Turkish food words',
      pairs: [
        { id: 'tr-mp-f1', left: 'Döner', right: 'Turkish meat dish' },
        { id: 'tr-mp-f2', left: 'Meze', right: 'Appetizer' },
        { id: 'tr-mp-f3', left: 'Kebap', right: 'Kebab' },
        { id: 'tr-mp-f4', left: 'Baklava', right: 'Turkish dessert' },
      ],
    },
    {
      id: 'ex-tr-2-2-4',
      type: 'listening',
      prompt: 'Listen to the food order:',
      audioText: 'Bir döner ve bir ayran, lütfen',
      options: [
        { id: 'tr-lo-f1', text: 'Bir döner ve bir ayran, lütfen' },
        { id: 'tr-lo-f2', text: 'Bir kebap ve bir su, lütfen' },
        { id: 'tr-lo-f3', text: 'Bir baklava ve bir çay, lütfen' },
      ],
      correctAnswerId: 'tr-lo-f1',
      hint: '"Döner" and "ayran" (yogurt drink) are popular Turkish food items.',
    },
    {
      id: 'ex-tr-2-2-5',
      type: 'speaking',
      prompt: 'Order at a Turkish restaurant: "Bir kebap, lütfen"',
      audioText: 'Bir kebap, lütfen',
      hint: 'Practice ordering the famous Turkish kebab!',
    },
  ],

  // TURKISH LESSON 5: Family & Relationships
  'tr-3-1': [
    {
      id: 'ex-tr-3-1-1',
      type: 'multiple_choice',
      prompt: 'What does "Aile" mean?',
      audioText: 'Aile',
      options: [
        { id: 'tr-opt-5-1', text: 'Family', imageEmoji: '👨‍👩‍👧‍👦' },
        { id: 'tr-opt-5-2', text: 'Friend', imageEmoji: '👫' },
        { id: 'tr-opt-5-3', text: 'House', imageEmoji: '🏠' },
        { id: 'tr-opt-5-4', text: 'Work', imageEmoji: '💼' },
      ],
      correctAnswerId: 'tr-opt-5-1',
      hint: '"Aile" is essential for talking about family!',
    },
    {
      id: 'ex-tr-3-1-2',
      type: 'word_bank',
      prompt: 'Translate: "My mother is very kind"',
      audioText: 'Annem çok nazik',
      correctSentence: ['Annem', 'çok', 'nazik'],
      wordBankPool: ['Annem', 'çok', 'nazik', 'benim', 'güzel', 'akıllı'],
      hint: '"Annem" means "my mother" in Turkish.',
    },
    {
      id: 'ex-tr-3-1-3',
      type: 'match_pairs',
      prompt: 'Match Turkish family words',
      pairs: [
        { id: 'tr-mp-fam1', left: 'Anne', right: 'Mother' },
        { id: 'tr-mp-fam2', left: 'Baba', right: 'Father' },
        { id: 'tr-mp-fam3', left: 'Kardeş', right: 'Sibling' },
        { id: 'tr-mp-fam4', left: 'Büyükbaba', right: 'Grandfather' },
      ],
    },
    {
      id: 'ex-tr-3-1-4',
      type: 'listening',
      prompt: 'Listen to the family description:',
      audioText: 'Babam mühendis ve annem öğretmen',
      options: [
        { id: 'tr-lo-fam1', text: 'Babam mühendis ve annem öğretmen' },
        { id: 'tr-lo-fam2', text: 'Babam doktor ve annem hemşire' },
        { id: 'tr-lo-fam3', text: 'Babam polis ve annem mimar' },
      ],
      correctAnswerId: 'tr-lo-fam1',
      hint: '"Mühendis" means engineer, "öğretmen" means teacher.',
    },
    {
      id: 'ex-tr-3-1-5',
      type: 'speaking',
      prompt: 'Introduce your family: "Bu benim ailem"',
      audioText: 'Bu benim ailem',
      hint: '"Bu benim ailem" means "This is my family"',
    },
  ],

  // TURKISH LESSON 6: Hobbies & Interests
  'tr-3-2': [
    {
      id: 'ex-tr-3-2-1',
      type: 'multiple_choice',
      prompt: 'What does "Hobisi" mean?',
      audioText: 'Hobisi',
      options: [
        { id: 'tr-opt-6-1', text: 'Hobby', imageEmoji: '🎮' },
        { id: 'tr-opt-6-2', text: 'Sport', imageEmoji: '⚽' },
        { id: 'tr-opt-6-3', text: 'Work', imageEmoji: '💼' },
        { id: 'tr-opt-6-4', text: 'Class', imageEmoji: '📚' },
      ],
      correctAnswerId: 'tr-opt-6-1',
      hint: '"Hobisi" is used to discuss what people like to do in their spare time.',
    },
    {
      id: 'ex-tr-3-2-2',
      type: 'word_bank',
      prompt: 'Translate: "I like reading books"',
      audioText: 'Kitap okumayı seviyorum',
      correctSentence: ['Kitap', 'okumayı', 'seviyorum'],
      wordBankPool: ['Kitap', 'okumayı', 'seviyorum', 'yazılı', 'konuşmayı', 'dinlemeyi'],
      hint: '"Kitap" means book, "oku" means read.',
    },
    {
      id: 'ex-tr-3-2-3',
      type: 'match_pairs',
      prompt: 'Match Turkish hobbies with English',
      pairs: [
        { id: 'tr-mp-hob1', left: 'Futbol oynamak', right: 'Playing football' },
        { id: 'tr-mp-hob2', left: 'Müzik dinlemek', right: 'Listening to music' },
        { id: 'tr-mp-hob3', left: 'Yüzmek', right: 'Swimming' },
        { id: 'tr-mp-hob4', left: 'Resim yapmak', right: 'Painting' },
      ],
    },
    {
      id: 'ex-tr-3-2-4',
      type: 'listening',
      prompt: 'Listen to the hobby discussion:',
      audioText: 'Benim hobbim müzik dinlemek ve gitar çalmak',
      options: [
        { id: 'tr-lo-hob1', text: 'Benim hobbim müzik dinlemek ve gitar çalmak' },
        { id: 'tr-lo-hob2', text: 'Benim hobbim futbol oynamak ve yüzmek' },
        { id: 'tr-lo-hob3', text: 'Benim hobbim kitap okumak ve film izlemek' },
      ],
      correctAnswerId: 'tr-lo-hob1',
      hint: '"Gitar çalmak" means playing guitar.',
    },
    {
      id: 'ex-tr-3-2-5',
      type: 'speaking',
      prompt: 'Share your hobby: "Benim hobbim..."',
      audioText: 'Benim hobbim film izlemek',
      hint: 'Practice describing your favorite hobby in Turkish!',
    },
  ],

  // TURKISH LESSON 7: Travel & Transportation
  'tr-4-1': [
    {
      id: 'ex-tr-4-1-1',
      type: 'word_bank',
      prompt: 'Translate: "I want to go to Istanbul by bus"',
      audioText: 'İstanbul\'a otobüs ile gitmek istiyorum',
      correctSentence: ['İstanbul\'a', 'otobüs', 'ile', 'gitmek', 'istiyorum'],
      wordBankPool: ['İstanbul\'a', 'otobüs', 'ile', 'gitmek', 'istiyorum', 'uçak', 'tren', 'araba', 'yürü'],
      hint: '"otobüs" means bus, "gitmek" means to go.',
    },
    {
      id: 'ex-tr-4-1-2',
      type: 'listening',
      prompt: 'What transportation method is mentioned?',
      audioText: 'Uçakla Ankara\'ya saat dokuzda uçuyoruz',
      options: [
        { id: 'tr-trans-1', text: 'By plane to Ankara at 9 o\'clock' },
        { id: 'tr-trans-2', text: 'By train to Ankara at 6 o\'clock' },
        { id: 'tr-trans-3', text: 'By bus to Ankara at 3 o\'clock' },
      ],
      correctAnswerId: 'tr-trans-1',
      hint: '"Uçakla" means by plane.',
    },
    {
      id: 'ex-tr-4-1-3',
      type: 'multiple_choice',
      prompt: 'How do you say "airport" in Turkish?',
      audioText: 'Havaalanı',
      options: [
        { id: 'tr-air-2', text: 'Tren istasyonu', imageEmoji: '🚂' },
        { id: 'tr-air-1', text: 'Havaalanı', imageEmoji: '✈️' },
        { id: 'tr-air-3', text: 'Otobüs terminali', imageEmoji: '🚌' },
        { id: 'tr-air-4', text: 'Liman', imageEmoji: '⛴️' },
      ],
      correctAnswerId: 'tr-air-1',
      hint: '"Hava" means air, "alanı" means area/field.',
    },
    {
      id: 'ex-tr-4-1-4',
      type: 'match_pairs',
      prompt: 'Match transportation terms',
      pairs: [
        { id: 'tr-trans-p1', left: 'Taksi', right: 'Taxi' },
        { id: 'tr-trans-p2', left: 'Gemi', right: 'Ship' },
        { id: 'tr-trans-p3', left: 'Bisiklet', right: 'Bicycle' },
        { id: 'tr-trans-p4', left: 'Metro', right: 'Subway' },
      ],
    },
    {
      id: 'ex-tr-4-1-5',
      type: 'speaking',
      prompt: 'Say: "How much is a ticket to Izmir?"',
      audioText: 'İzmir biletinin fiyatı ne kadar?',
      hint: 'Essential question for buying travel tickets!',
    },
  ],

  // TURKISH LESSON 8: Directions & Places
  'tr-4-2': [
    {
      id: 'ex-tr-4-2-1',
      type: 'listening',
      prompt: 'Listen and identify the location:',
      audioText: 'Kütüphaneler semtin ortasında, caminin yanında',
      options: [
        { id: 'tr-loc-1', text: 'Library is next to the mosque in the center of town' },
        { id: 'tr-loc-2', text: 'Market is next to the police station' },
        { id: 'tr-loc-3', text: 'Restaurant is near the school' },
      ],
      correctAnswerId: 'tr-loc-1',
      hint: '"Caminin yanında" means "next to the mosque".',
    },
    {
      id: 'ex-tr-4-2-2',
      type: 'multiple_choice',
      prompt: 'What does "sağda" mean?',
      audioText: 'Sağda',
      options: [
        { id: 'tr-dir-3', text: 'Behind', imageEmoji: '↩️' },
        { id: 'tr-dir-1', text: 'On the right', imageEmoji: '➡️' },
        { id: 'tr-dir-2', text: 'On the left', imageEmoji: '⬅️' },
        { id: 'tr-dir-4', text: 'Straight', imageEmoji: '⬆️' },
      ],
      correctAnswerId: 'tr-dir-1',
    },
    {
      id: 'ex-tr-4-2-3',
      type: 'word_bank',
      prompt: 'Translate: "Turn left at the corner"',
      audioText: 'Köşede sola dönün',
      correctSentence: ['Köşede', 'sola', 'dönün'],
      wordBankPool: ['Köşede', 'sola', 'dönün', 'sağa', 'düz', 'geri', 'ileri'],
      hint: '"Sola" means left, "dönün" means turn.',
    },
    {
      id: 'ex-tr-4-2-4',
      type: 'match_pairs',
      prompt: 'Match Turkish directions',
      pairs: [
        { id: 'tr-dir-p1', left: 'İleri doğru', right: 'Straight ahead' },
        { id: 'tr-dir-p2', left: 'Geri', right: 'Backward' },
        { id: 'tr-dir-p3', left: 'Yukarı', right: 'Upward' },
        { id: 'tr-dir-p4', left: 'Aşağı', right: 'Downward' },
      ],
    },
    {
      id: 'ex-tr-4-2-5',
      type: 'speaking',
      prompt: 'Ask for directions: "Benimhastaneye nasıl gidirim?"',
      audioText: 'Hastaneye nasıl gidirim?',
      hint: '"Hastane" means hospital - asking for directions!',
    },
  ],

  // TURKISH LESSON 9: Health & Wellness
  'tr-5-1': [
    {
      id: 'ex-tr-5-1-1',
      type: 'multiple_choice',
      prompt: 'What does "Hasta" mean?',
      audioText: 'Hasta',
      options: [
        { id: 'tr-health-2', text: 'Doctor', imageEmoji: '👨‍⚕️' },
        { id: 'tr-health-3', text: 'Sick/Ill', imageEmoji: '🤒' },
        { id: 'tr-health-1', text: 'Hospital', imageEmoji: '🏥' },
        { id: 'tr-health-4', text: 'Medicine', imageEmoji: '💊' },
      ],
      correctAnswerId: 'tr-health-3',
      hint: '"Hasta" describes someone who is ill.',
    },
    {
      id: 'ex-tr-5-1-2',
      type: 'listening',
      prompt: 'What health problem is described?',
      audioText: 'Başım ağrıyor ve ateşim yüksek',
      options: [
        { id: 'tr-symp-1', text: 'Headache and high fever' },
        { id: 'tr-symp-2', text: 'Sore throat and cough' },
        { id: 'tr-symp-3', text: 'Stomach pain and nausea' },
      ],
      correctAnswerId: 'tr-symp-1',
      hint: '"Başım ağrıyor" means "my head hurts", "ateşim" means "my fever".',
    },
    {
      id: 'ex-tr-5-1-3',
      type: 'word_bank',
      prompt: 'Translate: "I need to see a doctor"',
      audioText: 'Doktor görmem gerekiyor',
      correctSentence: ['Doktor', 'görmem', 'gerekiyor'],
      wordBankPool: ['Doktor', 'görmem', 'gerekiyor', 'hemşire', 'eczacı', 'ziyaret'],
      hint: '"görmek" means to see, "gerekiyor" means is needed.',
    },
    {
      id: 'ex-tr-5-1-4',
      type: 'match_pairs',
      prompt: 'Match health/body parts',
      pairs: [
        { id: 'tr-body-p1', left: 'Baş', right: 'Head' },
        { id: 'tr-body-p2', left: 'Göz', right: 'Eye' },
        { id: 'tr-body-p3', left: 'Dış', right: 'Teeth' },
        { id: 'tr-body-p4', left: 'Kalp', right: 'Heart' },
      ],
    },
    {
      id: 'ex-tr-5-1-5',
      type: 'speaking',
      prompt: 'Tell the doctor: "Midem ağrıyor"',
      audioText: 'Midem ağrıyor',
      hint: '"Mide" means stomach - describing a symptom!',
    },
  ],

  // TURKISH LESSON 10: Work & Careers
  'tr-5-2': [
    {
      id: 'ex-tr-5-2-1',
      type: 'word_bank',
      prompt: 'Translate: "What is your profession?"',
      audioText: 'Mesleği nedir?',
      correctSentence: ['Mesleği', 'nedir?'],
      wordBankPool: ['Mesleği', 'nedir?', 'adı', 'yaşı', 'hobisi', 'evi'],
      hint: '"Meslek" means profession/job.',
    },
    {
      id: 'ex-tr-5-2-2',
      type: 'listening',
      prompt: 'What job is mentioned?',
      audioText: 'Mühendis olarak büyük bir şirkette çalışıyorum',
      options: [
        { id: 'tr-job-1', text: 'Working as an engineer at a big company' },
        { id: 'tr-job-2', text: 'Working as a teacher at a school' },
        { id: 'tr-job-3', text: 'Working as a nurse at a hospital' },
      ],
      correctAnswerId: 'tr-job-1',
      hint: '"Mühendis" means engineer, "şirkette çalışıyorum" means I work at a company.',
    },
    {
      id: 'ex-tr-5-2-3',
      type: 'multiple_choice',
      prompt: 'How do you say "programmer" in Turkish?',
      audioText: 'Programcı',
      options: [
        { id: 'tr-career-2', text: 'Avukat', imageEmoji: '⚖️' },
        { id: 'tr-career-3', text: 'Öğretmen', imageEmoji: '👨‍🏫' },
        { id: 'tr-career-1', text: 'Programcı', imageEmoji: '💻' },
        { id: 'tr-career-4', text: 'Aşçı', imageEmoji: '👨‍🍳' },
      ],
      correctAnswerId: 'tr-career-1',
    },
    {
      id: 'ex-tr-5-2-4',
      type: 'match_pairs',
      prompt: 'Match Turkish professions',
      pairs: [
        { id: 'tr-prof-p1', left: 'Doktor', right: 'Doctor' },
        { id: 'tr-prof-p2', left: 'Polis', right: 'Police officer' },
        { id: 'tr-prof-p3', left: 'Hemşire', right: 'Nurse' },
        { id: 'tr-prof-p4', left: 'Kütüphaneci', right: 'Librarian' },
      ],
    },
    {
      id: 'ex-tr-5-2-5',
      type: 'speaking',
      prompt: 'Introduce your job: "Ben öğretmenim"',
      audioText: 'Ben öğretmenim',
      hint: 'Practice stating your profession in Turkish!',
    },
  ],
};
