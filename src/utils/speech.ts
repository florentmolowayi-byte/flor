import { LanguageId } from '../types';

const langMap: Record<LanguageId, string> = {
  es: 'es-ES',
  fr: 'fr-FR',
  de: 'de-DE',
  ja: 'ja-JP',
  it: 'it-IT',
  zh: 'zh-CN',
  tr: 'tr-TR',
};

export function speakText(text: string, langId: LanguageId = 'es', rate: number = 0.9) {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    return;
  }

  try {
    window.speechSynthesis.cancel(); // Stop any ongoing speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langMap[langId] || 'es-ES';
    utterance.rate = rate; // Slightly slower for language learners

    // Pick best available voice if matching target language
    const voices = window.speechSynthesis.getVoices();
    const targetLangCode = langMap[langId];
    const matchingVoice = voices.find((v) => v.lang.startsWith(targetLangCode.slice(0, 2)));

    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.error('Speech synthesis error:', err);
  }
}
