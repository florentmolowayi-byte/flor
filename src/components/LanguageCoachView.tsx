import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Send, Sparkles, Volume2, HelpCircle, CheckCircle } from 'lucide-react';
import { LanguageId, UserState } from '../types';
import { LANGUAGES } from '../data/languages';
import { CoachMascot } from './CoachMascot';
import { soundManager } from '../utils/audio';
import { speakText } from '../utils/speech';

interface LanguageCoachViewProps {
  userState: UserState;
  onEarnXp: (amount: number) => void;
}

interface ChatMessage {
  id: string;
  sender: 'duo' | 'user';
  text: string;
  correction?: string | null;
  tip?: string | null;
  timestamp: string;
}

const WELCOME_MESSAGES: Partial<Record<LanguageId, string>> = {
  en: 'Hello! I am your Language AI. Let\'s practice chatting in English! Send me a message, ask me a question, or introduce yourself.',
  fr: 'Bonjour ! Je suis votre IA de langue. Pratiquons le français ! Envoyez-moi un message ou posez-moi une question.',
  de: 'Hallo! Ich bin deine Sprach-KI. Lass uns Deutsch üben! Schreib mir eine Nachricht oder stelle mir eine Frage.',
  it: 'Ciao! Sono la tua IA per le lingue. Pratichiamo l\'italiano! Scrivimi un messaggio o fammi una domanda.',
  ja: 'こんにちは！私はあなたの語学AIです。日本語で会話を練習しましょう。メッセージや質問を送ってください。',
  es: '¡Hola! Soy tu IA de idiomas. ¡Practiquemos español! Envíame un mensaje o hazme una pregunta.',
  pt: 'Olá! Sou a sua IA de idiomas. Vamos praticar português! Envie uma mensagem ou faça uma pergunta.',
  tr: 'Merhaba! Ben senin dil yapay zekânım. Türkçe pratik yapalım! Bana bir mesaj gönder veya soru sor.',
  zh: '你好！我是你的语言 AI。让我们练习中文对话吧！给我发消息或提问。',
};

const REQUESTED_LANGUAGES: Array<{ id: LanguageId; names: string[] }> = [
  { id: 'en', names: ['english'] },
  { id: 'fr', names: ['french', 'français'] },
  { id: 'de', names: ['german', 'deutsch'] },
  { id: 'it', names: ['italian', 'italiano'] },
  { id: 'ja', names: ['japanese', '日本語'] },
  { id: 'es', names: ['spanish', 'español'] },
  { id: 'pt', names: ['portuguese', 'português'] },
  { id: 'tr', names: ['turkish', 'türkçe'] },
  { id: 'zh', names: ['chinese', '中文'] },
];

export const LanguageCoachView: React.FC<LanguageCoachViewProps> = ({ userState, onEarnXp }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatLanguageId, setChatLanguageId] = useState<LanguageId>(userState.currentLanguage);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const langObj = LANGUAGES.find((l) => l.id === chatLanguageId) || LANGUAGES[0];

  const getRequestedLanguage = (message: string) => {
    const normalizedMessage = message.toLocaleLowerCase();
    return REQUESTED_LANGUAGES.find((language) =>
      language.names.some((name) => normalizedMessage.includes(name.toLocaleLowerCase()))
    );
  };

  useEffect(() => {
    // Initial welcome message from the language coach
    const initialMsg: ChatMessage = {
      id: 'welcome_1',
      sender: 'duo',
      text: WELCOME_MESSAGES[chatLanguageId] || `Hello! Let\'s practice chatting in ${langObj.name}. Send me a message or ask me a question!`,
      tip: 'Practicing conversations earns you +10 XP per turn!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([initialMsg]);
  }, [chatLanguageId, langObj.name]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || loading) return;

    soundManager.playClick();
    const userMsgText = inputText;
    setInputText('');

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: userMsgText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const requestedLanguage = getRequestedLanguage(userMsgText);
      const responseLanguage = requestedLanguage
        ? LANGUAGES.find((language) => language.id === requestedLanguage.id) || langObj
        : langObj;
      const res = await fetch('/api/duo-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: responseLanguage.name,
          userMessage: userMsgText,
          history: messages.map((m) => ({ sender: m.sender, text: m.text })),
        }),
      });

      const data = await res.json();
      if (!res.ok || typeof data.reply !== 'string' || !data.reply.trim()) {
        throw new Error(data.error || 'The language AI returned an invalid response.');
      }

      const duoReply: ChatMessage = {
        id: `duo_${Date.now()}`,
        sender: 'duo',
        text: data.reply || `Great work! Keep practicing ${langObj.name}!`,
        correction: data.correction,
        tip: data.tip,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, duoReply]);
      soundManager.playCorrect();
      speakText(duoReply.text, chatLanguageId);
      onEarnXp(10);
    } catch (err) {
      const fallbackMsg: ChatMessage = {
        id: `duo_${Date.now()}`,
        sender: 'duo',
        text: `I received your ${langObj.name} question: "${userMsgText}". The coach is reconnecting, so please send it again in a moment.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
      onEarnXp(10);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-4 px-4 pb-24 h-[calc(100vh-120px)] flex flex-col justify-between">
      {/* Header */}
      <div className="bg-purple-600 text-white rounded-3xl p-4 shadow-lg flex items-center justify-between shrink-0 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-700 flex items-center justify-center text-2xl shadow-inner">
            🌍
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-extrabold text-base">Language AI Chat</h3>
              <Sparkles className="w-4 h-4 text-purple-200" />
            </div>
            <p className="text-xs text-purple-100 font-medium">
              Practicing {langObj.name} ({langObj.flag}) with Language AI
            </p>
          </div>
        </div>
        <select
          value={chatLanguageId}
          onChange={(e) => setChatLanguageId(e.target.value as LanguageId)}
          className="bg-purple-700 text-white border border-purple-400 rounded-xl px-2 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-white/70 cursor-pointer"
          aria-label="Choose chat language"
        >
          {LANGUAGES.map((language) => (
            <option key={language.id} value={language.id} className="text-slate-900">
              {language.flag} {language.name}
            </option>
          ))}
        </select>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {messages.map((m) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-start gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            {m.sender === 'duo' && (
              <CoachMascot mood="happy" outfit={userState.activeOutfit} size="sm" className="shrink-0" />
            )}

            <div
              className={`max-w-[80%] rounded-3xl p-4 space-y-2 shadow-xs ${
                m.sender === 'user'
                  ? 'bg-emerald-500 text-white rounded-tr-none'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-tl-none'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-black uppercase opacity-70">
                  {m.sender === 'user' ? 'You' : 'AI'}
                </span>
                {m.sender === 'duo' && (
                  <button
                    onClick={() => speakText(m.text, chatLanguageId)}
                    className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors cursor-pointer"
                    title="Pronounce"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-purple-500" />
                  </button>
                )}
              </div>

              <p className="text-sm font-semibold leading-relaxed">{m.text}</p>

              {/* Grammar Correction Badge */}
              {m.correction && (
                <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-300 text-amber-900 dark:text-amber-200 p-2.5 rounded-2xl text-xs font-medium space-y-0.5">
                  <span className="font-bold flex items-center gap-1 text-amber-600">
                    <CheckCircle className="w-3.5 h-3.5" /> Grammar Suggestion:
                  </span>
                  <span>{m.correction}</span>
                </div>
              )}

              {/* Grammar Tip */}
              {m.tip && (
                <div className="bg-purple-50 dark:bg-purple-950/40 border border-purple-200 text-purple-800 dark:text-purple-200 p-2 rounded-xl text-[11px] font-medium flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                  <span>{m.tip}</span>
                </div>
              )}

              <span className="text-[10px] text-right block opacity-60 font-medium">
                {m.timestamp}
              </span>
            </div>
          </motion.div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold pl-12 animate-pulse">
            🌍 Language AI is thinking in {langObj.name}...
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSendMessage} className="pt-3 shrink-0 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Type a message in ${langObj.name}...`}
          className="flex-1 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:border-purple-500 transition-colors shadow-inner"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || loading}
          className="px-5 py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white font-extrabold text-sm rounded-2xl shadow-md transition-all cursor-pointer flex items-center gap-1"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
