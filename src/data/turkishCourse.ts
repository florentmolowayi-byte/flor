import { Exercise, Unit } from '../types';

type Phrase = { turkish: string; english: string };
type LessonContent = {
  focus: string;
  vocabulary: [string, string][];
  phrases: [Phrase, Phrase];
  grammar: string;
  grammarQuestion: string;
  grammarAnswer: string;
  grammarDistractor: string;
};

const lessonNode = (id: string, title: string) => ({
  id,
  title,
  type: 'lesson' as const,
  totalSteps: 13,
  xpReward: 20,
  gemReward: 12,
  unlocked: false,
  completed: false,
  stars: 0,
});

export const TURKISH_EXTRA_UNITS: Unit[] = [
  {
    id: 'unit-tr-6', number: 6, title: 'Unit 6: A2 — Everyday Life',
    description: 'Build daily routines, talk about schedules, and use the present continuous.',
    grammar: 'Aorist / habitual present (vowel-harmony variants) and present continuous (-yor)', verbs: 'kalkmak · çalışmak · buluşmak',
    pronunciation: 'The ı in -ıyor is a dotless vowel; keep it short and relaxed.', color: '#E30A17',
    nodes: [lessonNode('tr-6-1', 'Daily Routines'), lessonNode('tr-6-2', 'Time & Schedules')],
  },
  {
    id: 'unit-tr-7', number: 7, title: 'Unit 7: A2 — Past & Future',
    description: 'Share what happened and make clear plans for the days ahead.',
    grammar: 'Past tense (-dı/-di/-du/-dü, -tı/-ti/-tu/-tü) and future tense (-acak/-ecek)', verbs: 'gitmek · görmek · ziyaret etmek',
    pronunciation: 'Suffix vowels follow vowel harmony; listen for the final vowel of the stem.', color: '#C81E3A',
    nodes: [lessonNode('tr-7-1', 'Past Experiences'), lessonNode('tr-7-2', 'Future Plans')],
  },
  {
    id: 'unit-tr-8', number: 8, title: 'Unit 8: A2+ — Home & Description',
    description: 'Use possessive endings, location phrases, and comparisons in context.',
    grammar: 'Possessive suffixes, locative -da/-de/-ta/-te, and daha + adjective', verbs: 'oturmak · almak · yaşamak',
    pronunciation: 'The final consonant may soften before a vowel suffix: kitap → kitabı.', color: '#B91C3C',
    nodes: [lessonNode('tr-8-1', 'Possessions & Places'), lessonNode('tr-8-2', 'Comparisons')],
  },
  {
    id: 'unit-tr-9', number: 9, title: 'Unit 9: B1 — Confident Communication',
    description: 'Make polite requests, explain needs, and give opinions with reasons.',
    grammar: 'Can / polite requests (-ebilir) · necessity (-meli, gerek)', verbs: 'konuşmak · istemek · düşünmek',
    pronunciation: 'In polite questions, raise your tone gently at the end.', color: '#A31635',
    nodes: [lessonNode('tr-9-1', 'Polite Requests & Needs'), lessonNode('tr-9-2', 'Opinions & Reasons')],
  },
  {
    id: 'unit-tr-10', number: 10, title: 'Unit 10: B1 — Stories & Real Life',
    description: 'Connect ideas, describe past habits, and handle longer everyday conversations.',
    grammar: 'Past habits (-ardı/-erdi/-ırdı/-irdi/-urdu/-ürdü), connectors, and conversation strategies', verbs: 'anlatmak · tanışmak · karar vermek',
    pronunciation: 'Link words smoothly; Turkish spelling is a reliable guide to pronunciation.', color: '#8F1230',
    nodes: [lessonNode('tr-10-1', 'Stories & Past Habits'), lessonNode('tr-10-2', 'Real-life Conversations')],
  },
];

const TURKISH_LESSONS: Record<string, LessonContent> = {
  'tr-1-1': {
    focus: 'Greetings and introductions', vocabulary: [['merhaba', 'hello'], ['günaydın', 'good morning'], ['lütfen', 'please'], ['teşekkürler', 'thank you']],
    phrases: [
      { turkish: 'Merhaba, benim adım Elif.', english: 'Hello, my name is Elif.' },
      { turkish: 'İyiyim, teşekkür ederim. Ya sen?', english: 'I am well, thank you. And you?' },
    ],
    grammar: 'Turkish sentence order is commonly subject–object–verb; ben (“I”) is often omitted when the verb ending is clear.',
    grammarQuestion: 'Which phrase means “My name is Elif”?', grammarAnswer: 'Benim adım Elif.', grammarDistractor: 'Elif nerede?',
  },
  'tr-1-2': {
    focus: 'Numbers and shopping', vocabulary: [['bir', 'one'], ['iki', 'two'], ['lira', 'lira'], ['ne kadar', 'how much']],
    phrases: [
      { turkish: 'Bir kahve, lütfen.', english: 'One coffee, please.' },
      { turkish: 'Bu ne kadar?', english: 'How much is this?' },
    ],
    grammar: 'Use bir for “one/a”; Turkish usually puts the describing word before the noun.',
    grammarQuestion: 'Which phrase asks the price?', grammarAnswer: 'Bu ne kadar?', grammarDistractor: 'Bu nerede?',
  },
  'tr-1-3': {
    focus: 'Turkish sounds and vowel harmony', vocabulary: [['ı', 'dotless i'], ['ş', 'sh sound'], ['ç', 'ch sound'], ['ğ', 'often lengthens or links adjacent vowels; not a hard g']],
    phrases: [
      { turkish: 'Şu üç küçük çiçek.', english: 'Those three small flowers.' },
      { turkish: 'Türkiye’de Türkçe öğreniyorum.', english: 'I am learning Turkish in Türkiye.' },
    ],
    grammar: 'Turkish spelling is mostly phonetic. Suffix vowels change to harmonize with the last vowel in a word.',
    grammarQuestion: 'Which Turkish letter sounds like “sh”?', grammarAnswer: 'ş', grammarDistractor: 'ç',
  },
  'tr-2-1': {
    focus: 'Asking questions', vocabulary: [['ne', 'what'], ['kim', 'who'], ['nerede', 'where'], ['nasıl', 'how']],
    phrases: [
      { turkish: 'Senin adın ne?', english: 'What is your name?' },
      { turkish: 'Nerelisin?', english: 'Where are you from?' },
    ],
    grammar: 'Question words include ne (what), kim (who), nerede (where), and nasıl (how).',
    grammarQuestion: 'Which word means “where”?', grammarAnswer: 'nerede', grammarDistractor: 'ne',
  },
  'tr-2-2': {
    focus: 'Food and dining', vocabulary: [['ekmek', 'bread'], ['su', 'water'], ['menü', 'menu'], ['hesap', 'bill']],
    phrases: [
      { turkish: 'Bir çorba ve bir su alabilir miyim?', english: 'Could I have a soup and a water?' },
      { turkish: 'Hesabı alabilir miyim, lütfen?', english: 'Could I have the bill, please?' },
    ],
    grammar: 'Use alabilir miyim? (“could I get?”) to make a polite request in a café or restaurant.',
    grammarQuestion: 'Which phrase politely asks for the bill?', grammarAnswer: 'Hesabı alabilir miyim?', grammarDistractor: 'Hesap nerede?',
  },
  'tr-3-1': {
    focus: 'Family and relationships', vocabulary: [['anne', 'mother'], ['baba', 'father'], ['kardeş', 'sibling'], ['aile', 'family']],
    phrases: [
      { turkish: 'Ailem İstanbul’da yaşıyor.', english: 'My family lives in Istanbul.' },
      { turkish: 'Bir kız kardeşim ve bir erkek kardeşim var.', english: 'I have one sister and one brother.' },
    ],
    grammar: 'Express possession with var (“there is / I have”); add possessive endings such as -im/-ım to nouns.',
    grammarQuestion: 'Which word commonly means “there is / I have”?', grammarAnswer: 'var', grammarDistractor: 'yok (“there is not”)',
  },
  'tr-3-2': {
    focus: 'Hobbies and interests', vocabulary: [['kitap okumak', 'to read books'], ['müzik', 'music'], ['yüzmek', 'to swim'], ['boş zaman', 'free time']],
    phrases: [
      { turkish: 'Boş zamanlarımda kitap okumayı seviyorum.', english: 'I like reading books in my free time.' },
      { turkish: 'Hafta sonları arkadaşlarımla yüzüyorum.', english: 'I swim with my friends on weekends.' },
    ],
    grammar: 'Use -mayı/-meyi before sevmek to say you like doing an activity.',
    grammarQuestion: 'Which phrase means “I like reading books”?', grammarAnswer: 'Kitap okumayı seviyorum.', grammarDistractor: 'Kitap okumuyorum.',
  },
  'tr-4-1': {
    focus: 'Travel and transportation', vocabulary: [['otobüs', 'bus'], ['tren', 'train'], ['bilet', 'ticket'], ['istasyon', 'station']],
    phrases: [
      { turkish: 'İstanbul’a trenle gitmek istiyorum.', english: 'I want to go to Istanbul by train.' },
      { turkish: 'Ankara treni saat kaçta kalkıyor?', english: 'What time does the Ankara train leave?' },
    ],
    grammar: 'Add -le/-la to a noun for “by / with”: trenle (by train), otobüsle (by bus).',
    grammarQuestion: 'What does trenle mean?', grammarAnswer: 'by train', grammarDistractor: 'at the train station',
  },
  'tr-4-2': {
    focus: 'Directions and places', vocabulary: [['sağ', 'right'], ['sol', 'left'], ['düz', 'straight'], ['yanında', 'next to']],
    phrases: [
      { turkish: 'Eczane nerede? Sağa mı, sola mı?', english: 'Where is the pharmacy? To the right or left?' },
      { turkish: 'Köşede sola dönün, lütfen.', english: 'Turn left at the corner, please.' },
    ],
    grammar: 'Use -a/-e (or buffer-y forms -ya/-ye) for a destination; polite commands use -ın/-in/-un/-ün, sometimes with buffer y.',
    grammarQuestion: 'What does sola dönün mean?', grammarAnswer: 'Turn left.', grammarDistractor: 'Go straight.',
  },
  'tr-5-1': {
    focus: 'Health and wellness', vocabulary: [['hasta', 'ill'], ['doktor', 'doctor'], ['baş', 'head'], ['ağrımak', 'to hurt']],
    phrases: [
      { turkish: 'Başım ağrıyor ve kendimi yorgun hissediyorum.', english: 'I have a headache and feel tired.' },
      { turkish: 'Doktora gitmem gerekiyor.', english: 'I need to go to the doctor.' },
    ],
    grammar: 'Use gerekiyor to express necessity; body-part possession endings identify whose body part hurts.',
    grammarQuestion: 'Which phrase means “I need to go”?', grammarAnswer: 'gitmem gerekiyor', grammarDistractor: 'gitmek istiyorum (“I want to go”)',
  },
  'tr-5-2': {
    focus: 'Work and careers', vocabulary: [['meslek', 'profession'], ['öğretmen', 'teacher'], ['mühendis', 'engineer'], ['çalışmak', 'to work']],
    phrases: [
      { turkish: 'Bir şirkette mühendis olarak çalışıyorum.', english: 'I work as an engineer at a company.' },
      { turkish: 'Mesleğinizi neden seviyorsunuz?', english: 'Why do you like your profession?' },
    ],
    grammar: 'Add -yor to a verb stem for an action in progress or a current situation: çalışıyorum (“I work/am working”).',
    grammarQuestion: 'What does the ending -yor commonly express?', grammarAnswer: 'an action happening now or a current situation', grammarDistractor: 'a completed past action',
  },
  'tr-1-checkpoint': {
    focus: 'A1 greetings and shopping review', vocabulary: [['merhaba', 'hello'], ['lütfen', 'please'], ['bir', 'one'], ['ne kadar', 'how much']],
    phrases: [
      { turkish: 'Bir kahve, lütfen.', english: 'One coffee, please.' },
      { turkish: 'Bu ne kadar?', english: 'How much is this?' },
    ],
    grammar: 'Use lütfen to make a request polite; ne kadar asks about price or quantity.',
    grammarQuestion: 'Which phrase asks “How much is this?”', grammarAnswer: 'Bu ne kadar?', grammarDistractor: 'Nasılsınız?',
  },
  'tr-2-checkpoint': {
    focus: 'A1+ questions and food review', vocabulary: [['nerede', 'where'], ['yemek', 'food / meal'], ['su', 'water'], ['hesap', 'bill']],
    phrases: [
      { turkish: 'Restoran nerede?', english: 'Where is the restaurant?' },
      { turkish: 'Hesabı alabilir miyim?', english: 'Could I have the bill?' },
    ],
    grammar: 'Question words such as ne, nerede, and nasıl usually appear before the verb or at the end.',
    grammarQuestion: 'Which word asks “where”?', grammarAnswer: 'nerede', grammarDistractor: 'çünkü',
  },
  'tr-3-checkpoint': {
    focus: 'A2 people and interests review', vocabulary: [['aile', 'family'], ['arkadaş', 'friend'], ['kitap', 'book'], ['sevmek', 'to like / love']],
    phrases: [
      { turkish: 'Ailemle kitap okumayı seviyorum.', english: 'I like reading books with my family.' },
      { turkish: 'Arkadaşım müzik dinliyor.', english: 'My friend is listening to music.' },
    ],
    grammar: 'The ending -yor describes an action happening now; -mayı/-meyi can turn an action into “doing”.',
    grammarQuestion: 'Which ending commonly describes an action happening now?', grammarAnswer: '-yor', grammarDistractor: '-acak only',
  },
  'tr-4-checkpoint': {
    focus: 'A2 travel and directions review', vocabulary: [['otobüs', 'bus'], ['bilet', 'ticket'], ['sağ', 'right'], ['sol', 'left']],
    phrases: [
      { turkish: 'Otobüs durağı nerede?', english: 'Where is the bus stop?' },
      { turkish: 'Köşede sola dönün.', english: 'Turn left at the corner.' },
    ],
    grammar: 'The polite command dönün means “turn”; sola/sağa indicate direction.',
    grammarQuestion: 'What does sola mean in directions?', grammarAnswer: 'to the left', grammarDistractor: 'to the right',
  },
  'tr-5-checkpoint': {
    focus: 'A2 health and work review', vocabulary: [['doktor', 'doctor'], ['hasta', 'ill'], ['meslek', 'profession'], ['çalışmak', 'to work']],
    phrases: [
      { turkish: 'Doktora gitmem gerekiyor.', english: 'I need to go to the doctor.' },
      { turkish: 'Bir şirkette mühendis olarak çalışıyorum.', english: 'I work as an engineer at a company.' },
    ],
    grammar: 'Gerekiyor expresses necessity; olarak can mean “as” before a profession.',
    grammarQuestion: 'Which word in the example expresses necessity?', grammarAnswer: 'gerekiyor', grammarDistractor: 'olarak',
  },
  'tr-6-1': {
    focus: 'Daily routines', vocabulary: [['uyanmak', 'to wake up'], ['kahvaltı', 'breakfast'], ['işe gitmek', 'to go to work'], ['dinlenmek', 'to rest']],
    phrases: [
      { turkish: 'Her sabah saat yedide kalkarım.', english: 'I get up at seven every morning.' },
      { turkish: 'Bu akşam kitap okuyorum.', english: 'I am reading a book this evening.' },
    ],
    grammar: 'The aorist expresses habits and uses vowel-harmony forms such as -r, -ar/-er, and -ır/-ir/-ur/-ür; -yor often marks an action in progress.',
    grammarQuestion: 'Which set includes common aorist endings used for habits?', grammarAnswer: '-r, -ar/-er, and -ır/-ir/-ur/-ür', grammarDistractor: '-miş only',
  },
  'tr-6-2': {
    focus: 'Time and schedules', vocabulary: [['saat', 'clock / hour'], ['buluşmak', 'to meet'], ['geç kalmak', 'to be late'], ['öğleden sonra', 'in the afternoon']],
    phrases: [
      { turkish: 'Saat üçte buluşuyoruz.', english: 'We are meeting at three o’clock.' },
      { turkish: 'Otobüs saat sekizde kalkıyor.', english: 'The bus leaves at eight.' },
    ],
    grammar: 'Attach the locative suffix -da/-de/-ta/-te to a time to say “at”: üçte (at three), sekizde (at eight).',
    grammarQuestion: 'How do you usually say “at three o’clock”?', grammarAnswer: 'saat üçte', grammarDistractor: 'saat üçten',
  },
  'tr-7-1': {
    focus: 'Past experiences', vocabulary: [['dün', 'yesterday'], ['geçen hafta', 'last week'], ['sinema', 'cinema'], ['gezmek', 'to visit / travel']],
    phrases: [
      { turkish: 'Dün arkadaşlarımla sinemaya gittim.', english: 'I went to the cinema with my friends yesterday.' },
      { turkish: 'Geçen hafta güzel bir kitap okudum.', english: 'I read a good book last week.' },
    ],
    grammar: 'The definite past uses -dı/-di/-du/-dü or -tı/-ti/-tu/-tü after voiceless consonants.',
    grammarQuestion: 'Which definite-past suffix form appears after t in gittim (“I went”)?', grammarAnswer: '-ti (the -DI suffix after a voiceless consonant)', grammarDistractor: 'the future -ecek',
  },
  'tr-7-2': {
    focus: 'Future plans', vocabulary: [['yarın', 'tomorrow'], ['gelecek hafta', 'next week'], ['plan', 'plan'], ['ziyaret etmek', 'to visit']],
    phrases: [
      { turkish: 'Yarın ailemi ziyaret edeceğim.', english: 'I will visit my family tomorrow.' },
      { turkish: 'Hafta sonu denize gitmek istiyoruz.', english: 'We want to go to the seaside this weekend.' },
    ],
    grammar: 'Use -acak/-ecek for the future; attach the personal ending: geleceğim (“I will come”).',
    grammarQuestion: 'Which suffix commonly marks a future action?', grammarAnswer: '-acak / -ecek', grammarDistractor: '-dı / -di',
  },
  'tr-8-1': {
    focus: 'Possessions and places', vocabulary: [['anahtar', 'key'], ['çanta', 'bag'], ['ev', 'house'], ['odada', 'in the room']],
    phrases: [
      { turkish: 'Anahtarım çantamda.', english: 'My key is in my bag.' },
      { turkish: 'Kitabım masanın üstünde.', english: 'My book is on the table.' },
    ],
    grammar: 'Possessive endings show whose item it is; -da/-de/-ta/-te marks “in/at/on” depending on context.',
    grammarQuestion: 'What does the ending -ım/-im often show in anahtarım?', grammarAnswer: 'my key (first-person possession)', grammarDistractor: 'your key (second-person possession)',
  },
  'tr-8-2': {
    focus: 'Comparisons', vocabulary: [['daha', 'more'], ['ucuz', 'cheap'], ['kalabalık', 'crowded'], ['sessiz', 'quiet']],
    phrases: [
      { turkish: 'Bu otel diğerinden daha ucuz.', english: 'This hotel is cheaper than the other one.' },
      { turkish: 'İstanbul Ankara’dan daha kalabalık.', english: 'Istanbul is more crowded than Ankara.' },
    ],
    grammar: 'Make a comparison with daha + adjective; the comparison standard takes -dan/-den/-tan/-ten before daha: Ankara’dan daha kalabalık.',
    grammarQuestion: 'What does daha güzel mean?', grammarAnswer: 'more beautiful', grammarDistractor: 'the most beautiful',
  },
  'tr-9-1': {
    focus: 'Polite requests and needs', vocabulary: [['yavaş', 'slow'], ['tekrar', 'again'], ['yardım', 'help'], ['gerek', 'necessary']],
    phrases: [
      { turkish: 'Daha yavaş konuşabilir misiniz?', english: 'Could you speak more slowly?' },
      { turkish: 'Erken çıkmam gerekiyor.', english: 'I need to leave early.' },
    ],
    grammar: 'Use -ebilir misiniz? for a polite “could you?” request; gerekiyor expresses necessity.',
    grammarQuestion: 'Which phrase politely asks “Could you…?”', grammarAnswer: '-ebilir misiniz?', grammarDistractor: '-di mi?',
  },
  'tr-9-2': {
    focus: 'Opinions and reasons', vocabulary: [['bence', 'in my opinion'], ['çünkü', 'because'], ['ilginç', 'interesting'], ['katılmak', 'to agree']],
    phrases: [
      { turkish: 'Bence Türkçe çok güzel çünkü her gün yeni bir şey öğreniyorum.', english: 'I think Turkish is beautiful because I learn something new every day.' },
      { turkish: 'Bu fikre katılıyorum ama başka bir çözüm de deneyebiliriz.', english: 'I agree with this idea, but we can also try another solution.' },
    ],
    grammar: 'Put bence (“in my opinion”) before your view; çünkü (“because”) introduces a reason.',
    grammarQuestion: 'Which connector introduces a reason (“because”)?', grammarAnswer: 'çünkü', grammarDistractor: 'ama (“but”)',
  },
  'tr-10-1': {
    focus: 'Stories and past habits', vocabulary: [['çocukken', 'when I was a child'], ['köy', 'village'], ['genellikle', 'usually'], ['hatırlamak', 'to remember']],
    phrases: [
      { turkish: 'Çocukken yazları köyde yaşardım.', english: 'When I was a child, I used to live in the village in summer.' },
      { turkish: 'Dedem bize her akşam hikâyeler anlatırdı.', english: 'My grandfather used to tell us stories every evening.' },
    ],
    grammar: 'The past-habit pattern has vowel-harmony forms such as -ardı/-erdi/-ırdı/-irdi/-urdu/-ürdü.',
    grammarQuestion: 'What does yaşardım suggest in this story?', grammarAnswer: 'I used to live (a past habit)', grammarDistractor: 'I will live (a future plan)',
  },
  'tr-10-2': {
    focus: 'Real-life conversations', vocabulary: [['tanışmak', 'to meet (for the first time)'], ['memnun', 'pleased'], ['tavsiye', 'recommendation'], ['mahalle', 'neighbourhood']],
    phrases: [
      { turkish: 'Sizinle tanıştığıma memnun oldum.', english: 'I was pleased to meet you.' },
      { turkish: 'Bu mahallede güzel bir kafe tavsiye eder misiniz?', english: 'Would you recommend a nice café in this neighbourhood?' },
    ],
    grammar: 'Use polite -ebilir misiniz? questions and natural follow-up questions to keep a conversation going.',
    grammarQuestion: 'Which is a polite way to ask for a recommendation?', grammarAnswer: 'Tavsiye eder misiniz?', grammarDistractor: 'Tavsiye sen?',
  },
};

const makeLessonExercises = (lessonId: string, lesson: LessonContent): Exercise[] => {
  const [firstPhrase, secondPhrase] = lesson.phrases;
  const options = (prefix: string, correct: string, wrong: string, otherWrong = lesson.grammarDistractor) => [
    { id: `${prefix}-correct`, text: correct },
    { id: `${prefix}-wrong-1`, text: wrong },
    { id: `${prefix}-wrong-2`, text: otherWrong },
  ];
  const correctOption = (prefix: string, correct: string, wrong: string, otherWrong?: string) => ({
    options: options(prefix, correct, wrong, otherWrong), correctAnswerId: `${prefix}-correct`,
  });
  const wordBank = (prefix: string, phrase: string): Exercise => {
    const words = phrase.replace(/[.!?]$/, '').split(' ');
    return {
      id: prefix, type: 'word_bank', prompt: `Build the Turkish sentence: “${phrase}”`, audioText: phrase,
      correctSentence: words.map((word, index) => index === words.length - 1 ? `${word}${phrase.slice(-1)}` : word),
      wordBankPool: [...words.map((word, index) => index === words.length - 1 ? `${word}${phrase.slice(-1)}` : word), 'ama', 'bugün'],
      hint: lesson.grammar,
    };
  };
  const vocab = lesson.vocabulary;
  return [
    {
      id: `${lessonId}-q1`, type: 'multiple_choice', prompt: `What does “${vocab[0][0]}” mean?`, audioText: vocab[0][0],
      ...correctOption(`${lessonId}-q1`, vocab[0][1], vocab[1][1], vocab[2][1]), hint: `New word: ${vocab[0][0]} = ${vocab[0][1]}.`,
    },
    {
      id: `${lessonId}-q2`, type: 'multiple_choice', prompt: `Choose the correct grammar note for ${lesson.focus.toLowerCase()}.`,
      ...correctOption(`${lessonId}-q2`, lesson.grammar, lesson.grammarDistractor, 'The Turkish alphabet has 29 letters.'), hint: lesson.grammar,
    },
    wordBank(`${lessonId}-q3`, firstPhrase.turkish),
    {
      id: `${lessonId}-q4`, type: 'match_pairs', prompt: `Match Turkish ${lesson.focus.toLowerCase()} vocabulary.`,
      pairs: vocab.map(([left, right], index) => ({ id: `${lessonId}-v${index + 1}`, left, right })), hint: 'Match each Turkish word with its English meaning.',
    },
    {
      id: `${lessonId}-q5`, type: 'listening', prompt: 'Listen and choose the meaning of the sentence.', audioText: firstPhrase.turkish,
      ...correctOption(`${lessonId}-q5`, firstPhrase.english, secondPhrase.english, `It means: ${vocab[0][1]}.`), hint: 'Listen for the key words, then choose the closest meaning.',
    },
    wordBank(`${lessonId}-q6`, secondPhrase.turkish),
    {
      id: `${lessonId}-q7`, type: 'match_pairs', prompt: 'Match each Turkish example with its meaning.',
      pairs: lesson.phrases.map((phrase, index) => ({ id: `${lessonId}-phrase${index + 1}`, left: phrase.turkish, right: phrase.english })),
      hint: 'Read the whole sentence before matching.',
    },
    {
      id: `${lessonId}-q8`, type: 'multiple_choice', prompt: `Which sentence means: “${secondPhrase.english}”`,
      ...correctOption(`${lessonId}-q8`, secondPhrase.turkish, firstPhrase.turkish, 'Merhaba, nasılsın?'), hint: 'Check the subject, time word, and verb ending.',
    },
    {
      id: `${lessonId}-q9`, type: 'listening', prompt: 'Listen and select the Turkish sentence you hear.', audioText: secondPhrase.turkish,
      options: [
        { id: `${lessonId}-q9-correct`, text: secondPhrase.turkish },
        { id: `${lessonId}-q9-wrong-1`, text: firstPhrase.turkish },
        { id: `${lessonId}-q9-wrong-2`, text: 'Yarın hava çok güzel.' },
      ], correctAnswerId: `${lessonId}-q9-correct`, hint: 'Listen for the verb ending and time expression.',
    },
    {
      id: `${lessonId}-q10`, type: 'multiple_choice', prompt: lesson.grammarQuestion,
      ...correctOption(`${lessonId}-q10`, lesson.grammarAnswer, lesson.grammarDistractor, 'This ending marks a different tense or meaning.'), hint: lesson.grammar,
    },
    {
      id: `${lessonId}-q11`, type: 'multiple_choice', prompt: `What does “${vocab[2][0]}” mean?`, audioText: vocab[2][0],
      ...correctOption(`${lessonId}-q11`, vocab[2][1], vocab[3][1], vocab[0][1]), hint: `New word: ${vocab[2][0]} = ${vocab[2][1]}.`,
    },
    {
      id: `${lessonId}-q12`, type: 'speaking', prompt: `Say this Turkish sentence: “${firstPhrase.turkish}”`, audioText: firstPhrase.turkish,
      hint: `Meaning: ${firstPhrase.english}`,
    },
    {
      id: `${lessonId}-q13`, type: 'speaking', prompt: `Say this Turkish sentence: “${secondPhrase.turkish}”`, audioText: secondPhrase.turkish,
      hint: `Meaning: ${secondPhrase.english}`,
    },
  ];
};

export const TURKISH_EXTRA_EXERCISES: Record<string, Exercise[]> = Object.fromEntries(
  Object.entries(TURKISH_LESSONS).map(([lessonId, lesson]) => [lessonId, makeLessonExercises(lessonId, lesson)]),
);
