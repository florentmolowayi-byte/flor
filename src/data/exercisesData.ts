import { Exercise, LanguageId } from '../types';

export const EXERCISES_BANK: Record<string, Exercise[]> = {
  // SPANISH LESSON 1: Greetings 1
  'es-1-1': [
    {
      id: 'ex-es-1-1-1',
      type: 'multiple_choice',
      prompt: 'Select the correct translation for "Hello"',
      audioText: 'Hola',
      options: [
        { id: 'opt-1', text: 'Hola', translation: 'Hello', imageEmoji: '👋' },
        { id: 'opt-2', text: 'Gracias', translation: 'Thank you', imageEmoji: '🙏' },
        { id: 'opt-3', text: 'Por favor', translation: 'Please', imageEmoji: '✨' },
        { id: 'opt-4', text: 'Adiós', translation: 'Goodbye', imageEmoji: '🚶' },
      ],
      correctAnswerId: 'opt-1',
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
        { id: 'l1', text: 'Buenos días, ¿cómo estás?' },
        { id: 'l2', text: 'Buenas noches, adiós' },
        { id: 'l3', text: 'Muchas gracias, por favor' },
      ],
      correctAnswerId: 'l1',
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
        { id: 'opt-2-1', text: 'Please', imageEmoji: '🤲' },
        { id: 'opt-2-2', text: 'Good morning', imageEmoji: '🌅' },
        { id: 'opt-2-3', text: 'Excuse me', imageEmoji: '🙋‍♂️' },
        { id: 'opt-2-4', text: 'Welcome', imageEmoji: '🏡' },
      ],
      correctAnswerId: 'opt-2-1',
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
        { id: 'lo1', text: 'De nada, mi amigo' },
        { id: 'lo2', text: 'Hola, mi amigo' },
        { id: 'lo3', text: 'Buenas tardes, señor' },
      ],
      correctAnswerId: 'lo1',
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
};
