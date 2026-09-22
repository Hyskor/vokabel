/** Vokabeln aus Pick-up A: We're from Greenwich (S. 184) */
export const CHAPTER = {
  id: 'pua',
  title: "We're from Greenwich",
  subtitle: 'Pick-up A · Vocabulary',
  page: 184,
};

export const VOCAB = [
  {
    id: 1,
    en: "We're from ...",
    phonetic: 'wɪə frɒm',
    de: 'Wir sind aus ...',
    example: "We're from Greenwich.",
  },
  {
    id: 2,
    en: "Here's your ball.",
    phonetic: "ˌhɪəz jɔː 'bɔːl",
    de: 'Hier ist dein Ball.',
    example: "Here's your ball, Sherlock.",
  },
  {
    id: 3,
    en: 'Hello.',
    phonetic: "hel'əʊ",
    de: 'Hallo.',
    example: '',
  },
  {
    id: 4,
    en: "I'm ...",
    phonetic: "aɪm 'piːə",
    de: 'Ich heiße ...; Ich bin ...',
    example: "Hello, I'm Pia.",
  },
  {
    id: 5,
    en: "You're a nice dog.",
    phonetic: "jɔːrə 'naɪs ˌdɒɡ",
    de: 'Du bist ein lieber Hund.',
    example: '',
  },
  {
    id: 6,
    en: "What's your name?",
    phonetic: "ˌwɒts jə 'neɪm",
    de: 'Wie heißt du?; Wie heißen Sie?',
    example: "What's your name? – I'm Olivia.",
  },
  {
    id: 7,
    en: 'Sorry, my dog is crazy.',
    phonetic: "ˌsɒri maɪ ˌdɒɡ ɪz 'kreɪzi",
    de: 'Tut mir leid, mein Hund ist verrückt.',
    example: '',
  },
  {
    id: 8,
    en: 'and',
    phonetic: 'ænd; ənd',
    de: 'und',
    example: '',
    tip: 'Wenn man „and“ nicht betont, spricht man es [ənd].',
  },
  {
    id: 9,
    en: 'My name is ...',
    phonetic: "maɪ 'neɪm ɪz",
    de: 'Ich heiße ...',
    example: "What's your name? – My name is Luke.",
  },
  {
    id: 10,
    en: 'Where are you from?',
    phonetic: "ˌweər ə ju 'frɒm",
    de: 'Woher kommst du?; Woher kommt ihr?; Woher kommen Sie?',
    example: "Where are you from? – We're from Greenwich.",
  },
  {
    id: 11,
    en: "I'm from ...",
    phonetic: "'aɪm frəm",
    de: 'Ich bin aus ...',
    example: "Where are you from? – I'm from Cologne.",
  },
  {
    id: 12,
    en: 'in',
    phonetic: 'ɪn',
    de: 'in; im; rein; herein',
    example: 'Cologne is in Germany.',
  },
  {
    id: 13,
    en: 'Are you on holiday in ... ?',
    phonetic: "ˌɑː ju ɒn 'hɒlədeɪ ɪn",
    de: 'Bist du im Urlaub in ... ?; Sind Sie im Urlaub in ... ?; Seid ihr im Urlaub in ... ?',
    example: "Are you on holiday in London? – Yes, I'm here with my parents.",
  },
  {
    id: 14,
    en: 'yes',
    phonetic: 'jes',
    de: 'ja',
    example: '',
  },
  {
    id: 15,
    en: "I'm here with my parents.",
    phonetic: "aɪm ˌhɪə wɪð maɪ 'peərənts",
    de: 'Ich bin mit meinen Eltern hier.',
    example: '',
  },
  {
    id: 16,
    en: 'How old are you?',
    phonetic: "ˌhaʊ 'əʊld ə juː",
    de: 'Wie alt bist du?; Wie alt seid ihr?; Wie alt sind Sie?',
    example: '',
    tip: 'Achte beim Sprechen auf die Verbindung zwischen den Wörtern.',
  },
  {
    id: 17,
    en: 'You too?',
    phonetic: "juː 'tuː",
    de: 'Du auch?; Sie auch?; Ihr auch?',
    example: "How old are you? – I'm ten. You too?",
  },
  {
    id: 18,
    en: 'no',
    phonetic: 'nəʊ',
    de: 'nein',
    example: '',
    tip: 'Gegenteil von yes.',
  },
  {
    id: 19,
    en: 'the',
    phonetic: 'ðə; ði',
    de: 'der; die (auch Pl.); das',
    example: '',
  },
  {
    id: 20,
    en: 'boy',
    phonetic: 'bɔɪ',
    de: 'Junge',
    example: 'Luke is a boy from Greenwich.',
  },
  {
    id: 21,
    en: 'girl',
    phonetic: 'ɡɜːl',
    de: 'Mädchen',
    example: 'And Pia is a girl from Germany.',
  },
  {
    id: 22,
    en: 'me too',
    phonetic: 'miː tuː',
    de: 'ich auch',
    example: "I'm eleven. – Me too.",
  },
  {
    id: 23,
    en: 'friend',
    phonetic: 'frend',
    de: 'Freund/-in',
    example: 'Dave and Luke are friends.',
  },
  {
    id: 24,
    en: 'he',
    phonetic: 'hiː',
    de: 'er',
    example: "Dave is nice. He's my friend.",
  },
];

export function primaryDe(de) {
  return de.split(';')[0].trim();
}

export function normalizeAnswer(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[.…!?,'"„“”]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function answersMatch(userInput, expected) {
  const user = normalizeAnswer(userInput);
  const variants = expected.split(';').map((v) => normalizeAnswer(v));
  return variants.some((v) => v === user || v.includes(user) || user.includes(v));
}

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
