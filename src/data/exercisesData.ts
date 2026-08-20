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
      prompt: 'Select the correct translation for "Merhaba"',
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

const EXTENDED_TURKISH_TOPICS: Array<[string, string]> = [
  ['sabah rutinleri', 'Sabah rutinleri'],
  ['ev ve mahalle', 'Ev ve mahalle'],
  ['hava durumu', 'Hava durumu'],
  ['alışveriş ve kıyafetler', 'Alışveriş ve kıyafetler'],
  ['geçmiş deneyimler', 'Geçmiş deneyimler'],
  ['gelecek planları', 'Gelecek planları'],
  ['şehir hayatı', 'Şehir hayatı'],
  ['doğa ve açık hava', 'Doğa ve açık hava'],
  ['medya ve teknoloji', 'Medya ve teknoloji'],
  ['fikirler ve karşılaştırmalar', 'Fikirler ve karşılaştırmalar'],
  ['günlük konuşmalar', 'Günlük konuşmalar'],
  ['seyahat hikayeleri', 'Seyahat hikayeleri'],
  ['kültür ve gelenekler', 'Kültür ve gelenekler'],
  ['haberler ve toplum', 'Haberler ve toplum'],
  ['akıcı konuşma tekrarı', 'Akıcı konuşma tekrarı'],
];

const createExtendedTurkishExercises = (unitNumber: number, lessonNumber: number, topic: string): Exercise[] => {
  const id = `tr-${unitNumber}-${lessonNumber}`;
  const phrase = lessonNumber === 1 ? `Bugün ${topic} hakkında konuşuyoruz.` : `${topic} hakkında ne düşünüyorsun?`;

  return [
    {
      id: `ex-${id}-1`,
      type: 'multiple_choice',
      prompt: `What does this Turkish sentence mean? "${phrase}"`,
      audioText: phrase,
      options: [
        { id: `opt-${id}-1`, text: `We are talking about ${topic} today.`, translation: phrase },
        { id: `opt-${id}-2`, text: 'I am going home tomorrow.' },
        { id: `opt-${id}-3`, text: 'Where is the train station?' },
      ],
      correctAnswerId: `opt-${id}-1`,
      hint: 'Bugün means “today”, hakkında means “about”, and konuşuyoruz means “we are talking”.',
    },
    {
      id: `ex-${id}-2`,
      type: 'word_bank',
      prompt: 'Build the Turkish sentence: "I like this topic."',
      audioText: `Bu konuyu seviyorum.`,
      correctSentence: ['Bu', 'konuyu', 'seviyorum.'],
      wordBankPool: ['Bu', 'konuyu', 'seviyorum.', 'Yarın', 'çok', 'değil.'],
      hint: 'In Turkish, the object ending -yu comes before the verb.',
    },
    {
      id: `ex-${id}-3`,
      type: 'match_pairs',
      prompt: 'Match the Turkish conversation words',
      pairs: [
        { id: `pair-${id}-1`, left: 'Bugün', right: 'Today' },
        { id: `pair-${id}-2`, left: 'Yarın', right: 'Tomorrow' },
        { id: `pair-${id}-3`, left: 'Neden?', right: 'Why?' },
        { id: `pair-${id}-4`, left: 'Bence', right: 'In my opinion' },
      ],
    },
    {
      id: `ex-${id}-4`,
      type: 'listening',
      prompt: 'Listen and choose the phrase you hear:',
      audioText: `Bu konu hakkında konuşabiliriz.`,
      options: [
        { id: `listen-${id}-1`, text: 'Bu konu hakkında konuşabiliriz.' },
        { id: `listen-${id}-2`, text: 'Bu kitabı yarın okuyacağım.' },
        { id: `listen-${id}-3`, text: 'Bugün hava çok soğuk.' },
      ],
      correctAnswerId: `listen-${id}-1`,
    },
    {
      id: `ex-${id}-5`,
      type: 'speaking',
      prompt: 'Say this Turkish sentence aloud:',
      audioText: `Bu konu hakkında konuşabiliriz.`,
      hint: 'Speak slowly and keep the vowel sounds clear.',
    },
  ];
};

Object.assign(
  EXERCISES_BANK,
  Object.fromEntries(
    EXTENDED_TURKISH_TOPICS.flatMap(([topic]) =>
      [1, 2, 3].map((lessonNumber) => {
        const unitNumber = EXTENDED_TURKISH_TOPICS.findIndex(([currentTopic]) => currentTopic === topic) + 6;
        return [`tr-${unitNumber}-${lessonNumber === 3 ? 'checkpoint' : lessonNumber}`, createExtendedTurkishExercises(unitNumber, lessonNumber, topic)];
      })
    )
  )
);

const EXTENDED_ENGLISH_LESSONS = [
  { topic: 'introductions and people', sentence: 'My name is Maya and I am from Canada.', answer: 'My name is Maya and I am from Canada.', words: ['My', 'name', 'is', 'Maya', 'and', 'I', 'am', 'from', 'Canada.'], pairs: [['name', 'What someone is called'], ['country', 'A nation'], ['friend', 'A person you like']] },
  { topic: 'food and drinks', sentence: 'I would like a sandwich and a glass of water.', answer: 'I would like a sandwich and a glass of water.', words: ['I', 'would', 'like', 'a', 'sandwich', 'and', 'water.'], pairs: [['menu', 'A list of food'], ['bill', 'Money owed at a restaurant'], ['thirsty', 'Needing a drink']] },
  { topic: 'home and family', sentence: 'There are three bedrooms in my house.', answer: 'There are three bedrooms in my house.', words: ['There', 'are', 'three', 'bedrooms', 'in', 'my', 'house.'], pairs: [['kitchen', 'A room for cooking'], ['parent', 'A mother or father'], ['quiet', 'Making little noise']] },
  { topic: 'daily routines', sentence: 'I wake up at seven and take the bus to work.', answer: 'I wake up at seven and take the bus to work.', words: ['I', 'wake', 'up', 'at', 'seven', 'and', 'take', 'the', 'bus.'], pairs: [['early', 'Before the usual time'], ['usually', 'Most of the time'], ['schedule', 'A plan of times']] },
  { topic: 'shopping', sentence: 'Do you have this shirt in a larger size?', answer: 'Do you have this shirt in a larger size?', words: ['Do', 'you', 'have', 'this', 'shirt', 'in', 'a', 'larger', 'size?'], pairs: [['cheap', 'Low in price'], ['cashier', 'A person who takes payment'], ['receipt', 'Proof of purchase']] },
  { topic: 'travel', sentence: 'Our flight leaves from gate twelve at noon.', answer: 'Our flight leaves from gate twelve at noon.', words: ['Our', 'flight', 'leaves', 'from', 'gate', 'twelve', 'at', 'noon.'], pairs: [['luggage', 'Bags for a trip'], ['ticket', 'Proof of travel'], ['arrival', 'The act of reaching a place']] },
  { topic: 'directions and places', sentence: 'The library is next to the park.', answer: 'The library is next to the park.', words: ['The', 'library', 'is', 'next', 'to', 'the', 'park.'], pairs: [['corner', 'Where two streets meet'], ['across', 'On the other side'], ['straight', 'Without turning']] },
  { topic: 'weather and seasons', sentence: 'It will be sunny but cold tomorrow.', answer: 'It will be sunny but cold tomorrow.', words: ['It', 'will', 'be', 'sunny', 'but', 'cold', 'tomorrow.'], pairs: [['forecast', 'A prediction about weather'], ['cloudy', 'Full of clouds'], ['season', 'A part of the year']] },
  { topic: 'hobbies and free time', sentence: 'I enjoy reading novels on the weekend.', answer: 'I enjoy reading novels on the weekend.', words: ['I', 'enjoy', 'reading', 'novels', 'on', 'the', 'weekend.'], pairs: [['hobby', 'An activity you enjoy'], ['practice', 'To do something repeatedly'], ['free time', 'Time without work']] },
  { topic: 'health and wellness', sentence: 'I have a headache and need to rest.', answer: 'I have a headache and need to rest.', words: ['I', 'have', 'a', 'headache', 'and', 'need', 'to', 'rest.'], pairs: [['symptom', 'A sign of illness'], ['medicine', 'Something used to treat illness'], ['healthy', 'In good physical condition']] },
  { topic: 'work and careers', sentence: 'She works as an engineer for a small company.', answer: 'She works as an engineer for a small company.', words: ['She', 'works', 'as', 'an', 'engineer', 'for', 'a', 'company.'], pairs: [['meeting', 'A planned work discussion'], ['salary', 'Money earned for work'], ['skill', 'An ability to do something']] },
  { topic: 'past experiences', sentence: 'We visited the museum last Saturday.', answer: 'We visited the museum last Saturday.', words: ['We', 'visited', 'the', 'museum', 'last', 'Saturday.'], pairs: [['yesterday', 'The day before today'], ['memory', 'Something remembered'], ['visited', 'Went to see a place']] },
  { topic: 'future plans', sentence: 'I am going to study abroad next year.', answer: 'I am going to study abroad next year.', words: ['I', 'am', 'going', 'to', 'study', 'abroad', 'next', 'year.'], pairs: [['plan', 'Something you intend to do'], ['hope', 'A positive expectation'], ['soon', 'In a short time']] },
  { topic: 'technology', sentence: 'I use my phone to check the weather.', answer: 'I use my phone to check the weather.', words: ['I', 'use', 'my', 'phone', 'to', 'check', 'the', 'weather.'], pairs: [['password', 'Secret text for access'], ['screen', 'The display of a device'], ['download', 'Copy from the internet']] },
  { topic: 'opinions and comparisons', sentence: 'This book is more interesting than that one.', answer: 'This book is more interesting than that one.', words: ['This', 'book', 'is', 'more', 'interesting', 'than', 'that', 'one.'], pairs: [['opinion', 'What you think'], ['similar', 'Almost the same'], ['different', 'Not the same']] },
  { topic: 'nature and the environment', sentence: 'We should protect forests and keep rivers clean.', answer: 'We should protect forests and keep rivers clean.', words: ['We', 'should', 'protect', 'forests', 'and', 'keep', 'rivers', 'clean.'], pairs: [['recycle', 'Use something again'], ['forest', 'A large area of trees'], ['pollution', 'Harmful waste in nature']] },
  { topic: 'culture and celebrations', sentence: 'My family cooks together during the holiday.', answer: 'My family cooks together during the holiday.', words: ['My', 'family', 'cooks', 'together', 'during', 'the', 'holiday.'], pairs: [['tradition', 'A custom passed down'], ['celebrate', 'Mark a special event'], ['guest', 'Someone invited to an event']] },
  { topic: 'conversations', sentence: 'That sounds interesting. Tell me more about it.', answer: 'That sounds interesting. Tell me more about it.', words: ['That', 'sounds', 'interesting.', 'Tell', 'me', 'more', 'about', 'it.'], pairs: [['actually', 'In fact'], ['perhaps', 'Maybe'], ['exactly', 'Precisely']] },
  { topic: 'English fluency', sentence: 'I can explain my ideas clearly in English.', answer: 'I can explain my ideas clearly in English.', words: ['I', 'can', 'explain', 'my', 'ideas', 'clearly', 'in', 'English.'], pairs: [['explain', 'Make something clear'], ['improve', 'Make better'], ['confident', 'Sure of yourself']] },
  { topic: 'common English verbs', sentence: 'I go, went, and have gone to the store.', answer: 'I go, went, and have gone to the store.', words: ['I', 'go,', 'went,', 'and', 'have', 'gone', 'to', 'the', 'store.'], pairs: [['go - went - gone', 'Travel to a place'], ['make - made - made', 'Create something'], ['take - took - taken', 'Move something with you']] },
] as const;

const createExtendedEnglishExercises = (unitNumber: number, lessonNumber: number, lesson: typeof EXTENDED_ENGLISH_LESSONS[number]): Exercise[] => {
  const id = `en-${unitNumber}-${lessonNumber}`;
  const sentence = lesson.sentence;
  const alternate = lessonNumber === 1
    ? `What is one useful word about ${lesson.topic}?`
    : `Which sentence is about ${lesson.topic}?`;

  return [
    {
      id: `ex-${id}-1`,
      type: 'multiple_choice',
      prompt: `Choose the correct sentence about ${lesson.topic}:`,
      audioText: sentence,
      options: [
        { id: `opt-${id}-1`, text: sentence, translation: sentence },
        { id: `opt-${id}-2`, text: alternate },
        { id: `opt-${id}-3`, text: 'Please open the window.' },
      ],
      correctAnswerId: `opt-${id}-1`,
      hint: `This lesson focuses on ${lesson.topic}.`,
    },
    {
      id: `ex-${id}-2`,
      type: 'word_bank',
      prompt: `Build the sentence: "${lesson.answer}"`,
      audioText: lesson.answer,
      correctSentence: [...lesson.words],
      wordBankPool: [...lesson.words, 'yesterday', 'not', 'very'],
      hint: 'Start with the subject, then build the sentence in natural English order.',
    },
    {
      id: `ex-${id}-3`,
      type: 'match_pairs',
      prompt: `Match the ${lesson.topic} words`,
      pairs: lesson.pairs.map(([left, right], index) => ({ id: `pair-${id}-${index + 1}`, left, right })),
    },
    {
      id: `ex-${id}-4`,
      type: 'listening',
      prompt: 'Listen and choose the phrase you hear:',
      audioText: lesson.answer,
      options: [
        { id: `listen-${id}-1`, text: lesson.answer },
        { id: `listen-${id}-2`, text: 'I will call you next week.' },
        { id: `listen-${id}-3`, text: 'The weather is cold today.' },
      ],
      correctAnswerId: `listen-${id}-1`,
    },
    {
      id: `ex-${id}-5`,
      type: 'speaking',
      prompt: 'Say this English sentence aloud:',
      audioText: lesson.answer,
      hint: `Speak clearly while practicing ${lesson.topic} vocabulary.`,
    },
  ];
};

Object.assign(
  EXERCISES_BANK,
  Object.fromEntries(
    EXTENDED_ENGLISH_LESSONS.flatMap((lesson, index) => {
      const unitNumber = index + 2;
      return [1, 2, 3].map((lessonNumber) => [
        `en-${unitNumber}-${lessonNumber === 3 ? 'checkpoint' : lessonNumber}`,
        createExtendedEnglishExercises(unitNumber, lessonNumber, lesson),
      ]);
    })
  )
);
