import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  X,
  Volume2,
  Mic,
  MicOff,
  CheckCircle2,
  XCircle,
  Sparkles,
  Flame,
  Award,
  ArrowRight,
  Zap,
} from 'lucide-react';
import { Exercise, DuoMascotMood, UserState, LanguageId, Option } from '../types';
import { CoachMascot } from './CoachMascot';
import { soundManager } from '../utils/audio';
import { speakText } from '../utils/speech';

interface LessonEngineProps {
  lessonTitle: string;
  exercises: Exercise[];
  userState: UserState;
  languageId: LanguageId;
  onCompleteLesson: (stats: { xpEarned: number; gemsEarned: number; accuracy: number }) => void;
  onLoseHeart: () => void;
  onQuit: () => void;
  onExerciseCompleted?: (exercise: Exercise, correct: boolean, timeSpent: number) => void;
}

const shuffleOptions = (options: Option[]) => {
  const shuffled = [...options];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }
  return shuffled;
};

const shuffleValues = <T,>(values: T[]) => {
  const shuffled = [...values];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }
  return shuffled;
};

export const LessonEngine: React.FC<LessonEngineProps> = ({
  lessonTitle,
  exercises,
  userState,
  languageId,
  onCompleteLesson,
  onLoseHeart,
  onQuit,
  onExerciseCompleted,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [retryNonce, setRetryNonce] = useState(0);
  const [userAnswerId, setUserAnswerId] = useState<string | null>(null);
  const [shuffledOptions, setShuffledOptions] = useState<Option[]>([]);
  const [shuffledPairs, setShuffledPairs] = useState<typeof exercises[number]['pairs']>([]);
  const [shuffledRightPairs, setShuffledRightPairs] = useState<typeof exercises[number]['pairs']>([]);
  const [wordBankSelected, setWordBankSelected] = useState<string[]>([]);
  const [wordBankAvailable, setWordBankAvailable] = useState<string[]>([]);

  // Match Pairs state
  const [matchedPairIds, setMatchedPairIds] = useState<string[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);

  // Speaking state
  const [isRecording, setIsRecording] = useState(false);
  const [recordedSuccess, setRecordedSuccess] = useState(false);
  const [recordingError, setRecordingError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingStreamRef = useRef<MediaStream | null>(null);
  const recordingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Feedback banner state
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [duoMood, setDuoMood] = useState<DuoMascotMood>('idle');
  const [combo, setCombo] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isLessonFinished, setIsLessonFinished] = useState(false);
  const [exerciseStartedAt, setExerciseStartedAt] = useState(Date.now());

  const currentEx = exercises[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / exercises.length) * 100);

  // Initialize word bank pool when exercise changes
  useEffect(() => {
    if (currentEx?.type === 'word_bank' && currentEx.wordBankPool) {
      setWordBankAvailable(shuffleValues(currentEx.wordBankPool));
      setWordBankSelected([]);
    }
    if (currentEx?.type === 'match_pairs') {
      setShuffledPairs(shuffleValues(currentEx.pairs || []));
      setShuffledRightPairs(shuffleValues(currentEx.pairs || []));
      setMatchedPairIds([]);
      setSelectedLeft(null);
      setSelectedRight(null);
    }
    setUserAnswerId(null);
    setShuffledOptions(shuffleOptions(currentEx?.options || []));
    setExerciseStartedAt(Date.now());
    setStatus('idle');
    setDuoMood('idle');
    setIsRecording(false);
    setRecordedSuccess(false);
    setRecordingError(null);

    // Auto-play TTS for audio exercises
    if (currentEx?.audioText && (currentEx.type === 'listening' || currentEx.type === 'speaking')) {
      speakText(currentEx.audioText, languageId);
    }
  }, [currentIndex, currentEx, languageId, retryNonce]);

  // Handle Match Pairs Selection
  const handleSelectLeftPair = (leftWord: string) => {
    soundManager.playClick();
    setSelectedLeft(leftWord);
    if (selectedRight && currentEx.pairs) {
      checkPairMatch(leftWord, selectedRight);
    }
  };

  const handleSelectRightPair = (rightWord: string) => {
    soundManager.playClick();
    setSelectedRight(rightWord);
    if (selectedLeft && currentEx.pairs) {
      checkPairMatch(selectedLeft, rightWord);
    }
  };

  const checkPairMatch = (left: string, right: string) => {
    const match = currentEx.pairs?.find((p) => p.left === left && p.right === right);
    if (match) {
      soundManager.playCorrect();
      setMatchedPairIds((prev) => [...prev, match.id]);
      setSelectedLeft(null);
      setSelectedRight(null);

      // Check if all pairs matched
      if (matchedPairIds.length + 1 === currentEx.pairs?.length) {
        setStatus('correct');
        setDuoMood('happy');
      }
    } else {
      soundManager.playIncorrect();
      setSelectedLeft(null);
      setSelectedRight(null);
    }
  };

  // Word Bank Tile Click Handlers
  const handleAddWordTile = (word: string, idx: number) => {
    soundManager.playClick();
    speakText(word.replace(/[^a-zA-ZáéíóúñÁÉÍÓÚÑÀèìòù]/g, ''), languageId, 1.1);
    setWordBankSelected((prev) => [...prev, word]);
    setWordBankAvailable((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleRemoveWordTile = (word: string, idx: number) => {
    soundManager.playClick();
    setWordBankSelected((prev) => prev.filter((_, i) => i !== idx));
    setWordBankAvailable((prev) => [...prev, word]);
  };

  // Check Answer Handler
  const handleCheckAnswer = () => {
    let isCorrect = false;

    if (currentEx.type === 'multiple_choice' || currentEx.type === 'listening') {
      isCorrect = userAnswerId === currentEx.correctAnswerId;
    } else if (currentEx.type === 'word_bank') {
      const normalizeSentence = (words: string[]) =>
        words.join(' ').normalize('NFC').replace(/\s+/g, ' ').trim();
      const formattedUser = normalizeSentence(wordBankSelected);
      const formattedCorrect = normalizeSentence(currentEx.correctSentence || []);
      isCorrect = formattedUser === formattedCorrect;
    } else if (currentEx.type === 'match_pairs') {
      isCorrect = matchedPairIds.length === (currentEx.pairs?.length || 0);
    } else if (currentEx.type === 'speaking') {
      isCorrect = recordedSuccess;
    }

    onExerciseCompleted?.(currentEx, isCorrect, Date.now() - exerciseStartedAt);

    if (isCorrect) {
      soundManager.playCorrect();
      setStatus('correct');
      setDuoMood(combo >= 2 ? 'hyped' : 'happy');
      setCombo((c) => c + 1);
      setCorrectCount((c) => c + 1);
    } else {
      soundManager.playIncorrect();
      onLoseHeart();
      soundManager.playHeartLost();
      setStatus('incorrect');
      setDuoMood('sad');
      setCombo(0);
    }
  };

  // Move to next exercise or finish
  const handleContinue = () => {
    soundManager.playClick();
    if (status === 'incorrect') {
      setRetryNonce((nonce) => nonce + 1);
      return;
    }
    if (currentIndex + 1 < exercises.length) {
      setCurrentIndex((i) => i + 1);
    } else {
      // Finish Lesson!
      triggerCompletion();
    }
  };

  const triggerCompletion = () => {
    setIsLessonFinished(true);
    soundManager.playFanfare();
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
    });

    const accuracy = Math.round((correctCount / exercises.length) * 100);
    const isDoubleXp = userState.doubleXpTimer > Date.now();
    const baseVal = 20;
    const xpEarned = isDoubleXp ? baseVal * 2 : baseVal;
    const gemsEarned = 15;

    setTimeout(() => {
      onCompleteLesson({ xpEarned, gemsEarned, accuracy });
    }, 3500);
  };

  const stopRecordingStream = () => {
    if (recordingTimerRef.current) {
      clearTimeout(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    recordingStreamRef.current?.getTracks().forEach((track) => track.stop());
    recordingStreamRef.current = null;
    mediaRecorderRef.current = null;
  };

  // Record a real microphone sample when the browser supports it.
  const handleToggleRecord = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      return;
    }

    soundManager.playClick();
    setRecordingError(null);

    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      setRecordingError('Microphone recording is not supported in this browser.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      recordingStreamRef.current = stream;
      mediaRecorderRef.current = recorder;
      setIsRecording(true);

      recorder.onstop = () => {
        stopRecordingStream();
        setIsRecording(false);
        setRecordedSuccess(true);
        setStatus('correct');
        setDuoMood('happy');
      };
      recorder.onerror = () => {
        stopRecordingStream();
        setIsRecording(false);
        setRecordingError('Recording failed. Please try again.');
      };
      recorder.start();
      recordingTimerRef.current = setTimeout(() => recorder.stop(), 3000);
    } catch {
      stopRecordingStream();
      setRecordingError('Microphone access was blocked. Allow microphone access and try again.');
    }
  };

  useEffect(() => () => stopRecordingStream(), []);

  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-slate-900 flex flex-col justify-between overflow-hidden">
      {/* Top Header Bar */}
      <div className="max-w-4xl mx-auto w-full px-4 pt-6 pb-4 flex items-center justify-between gap-4">
        <button
          onClick={onQuit}
          className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Lesson Progress Bar */}
        <div className="flex-1 bg-slate-200 dark:bg-slate-800 h-4 rounded-full overflow-hidden relative">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.4 }}
            className="bg-emerald-500 h-full rounded-full relative"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-white/30 rounded-full animate-pulse" />
          </motion.div>
        </div>

        {/* Combo Counter Badge */}
        {combo >= 2 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-1 bg-orange-500 text-white font-black text-xs px-2.5 py-1 rounded-full shadow-md animate-bounce"
          >
            <Flame className="w-4 h-4 fill-white" /> {combo} STREAK
          </motion.div>
        )}

        {/* Hearts */}
        <div className="flex items-center gap-1 font-bold text-rose-500 text-sm">
          <span>❤️</span>
          <span>{userState.hearts}</span>
        </div>
      </div>

      {/* Main Exercise Area */}
      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-2 flex flex-col items-center justify-center overflow-y-auto">
        {!isLessonFinished ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full space-y-6"
            >
              {/* Mascot & Prompt Layout */}
              <div className="flex items-start gap-4">
                <CoachMascot mood={duoMood} outfit={userState.activeOutfit} size="md" />

                <div className="flex-1 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-3xl p-5 shadow-xs relative">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      {currentEx.type.replace('_', ' ')}
                    </span>
                    {currentEx.audioText && (
                      <button
                        onClick={() => speakText(currentEx.audioText!, languageId)}
                        className="p-1.5 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full hover:scale-110 transition-transform cursor-pointer"
                        title="Listen Audio"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-800 dark:text-slate-100">
                    {currentEx.prompt}
                  </h3>

                </div>
              </div>

              {/* 1. Multiple Choice & Listening Options */}
              {(currentEx.type === 'multiple_choice' || currentEx.type === 'listening') && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {shuffledOptions.map((opt) => {
                    const isSelected = userAnswerId === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => {
                          if (status !== 'idle') return;
                          soundManager.playClick();
                          setUserAnswerId(opt.id);
                          if (opt.text) speakText(opt.text, languageId);
                        }}
                        className={`flex items-center gap-3.5 p-4 rounded-2xl border-2 font-extrabold text-left transition-all cursor-pointer shadow-xs ${
                          isSelected
                            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 scale-[1.02]'
                            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600'
                        }`}
                      >
                        {opt.imageEmoji && <span className="text-3xl">{opt.imageEmoji}</span>}
                        <div>
                          <span className="text-base sm:text-lg block leading-snug">{opt.text}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* 2. Word Bank Sentence Assembly */}
              {currentEx.type === 'word_bank' && (
                <div className="space-y-4 pt-2">
                  {/* Selected Answer Box */}
                  <div className="min-h-[70px] border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-3 flex flex-wrap gap-2 items-center bg-slate-50/50 dark:bg-slate-800/40">
                    {wordBankSelected.map((word, idx) => (
                      <motion.button
                        key={`${word}-${idx}`}
                        layout
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        onClick={() => handleRemoveWordTile(word, idx)}
                        className="px-3.5 py-2 bg-emerald-500 text-white font-extrabold text-sm rounded-xl shadow-md cursor-pointer hover:bg-emerald-600 active:scale-95"
                      >
                        {word}
                      </motion.button>
                    ))}
                    {wordBankSelected.length === 0 && (
                      <span className="text-xs font-bold text-slate-400 mx-auto">
                        Tap words below in order
                      </span>
                    )}
                  </div>

                  {/* Available Word Bank Pool */}
                  <div className="flex flex-wrap gap-2 justify-center pt-2">
                    {wordBankAvailable.map((word, idx) => (
                      <motion.button
                        key={`${word}-${idx}`}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() => handleAddWordTile(word, idx)}
                        className="px-3.5 py-2 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-extrabold text-sm rounded-xl shadow-xs hover:border-emerald-400 cursor-pointer active:scale-95"
                      >
                        {word}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Match Pairs Exercise */}
              {currentEx.type === 'match_pairs' && currentEx.pairs && (
                <div className="grid grid-cols-2 gap-4 pt-2">
                  {/* Left Column */}
                  <div className="space-y-2.5">
                    {shuffledPairs.map((p) => {
                      const isMatched = matchedPairIds.includes(p.id);
                      const isSelected = selectedLeft === p.left;
                      return (
                        <button
                          key={`left-${p.id}`}
                          disabled={isMatched}
                          onClick={() => handleSelectLeftPair(p.left)}
                          className={`w-full p-3.5 rounded-2xl border-2 font-extrabold text-sm transition-all cursor-pointer shadow-xs ${
                            isMatched
                              ? 'opacity-30 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-400'
                              : isSelected
                              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 scale-[1.02]'
                              : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100'
                          }`}
                        >
                          {p.left}
                        </button>
                      );
                    })}
                  </div>

                  {/* Right Column */}
                  <div className="space-y-2.5">
                    {shuffledRightPairs.map((p) => {
                      const isMatched = matchedPairIds.includes(p.id);
                      const isSelected = selectedRight === p.right;
                      return (
                        <button
                          key={`right-${p.id}`}
                          disabled={isMatched}
                          onClick={() => handleSelectRightPair(p.right)}
                          className={`w-full p-3.5 rounded-2xl border-2 font-extrabold text-sm transition-all cursor-pointer shadow-xs ${
                            isMatched
                              ? 'opacity-30 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-400'
                              : isSelected
                              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 scale-[1.02]'
                              : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100'
                          }`}
                        >
                          {p.right}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 4. Speaking Exercise */}
              {currentEx.type === 'speaking' && (
                <div className="flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-4">
                  <motion.button
                    disabled={status !== 'idle'}
                    animate={isRecording ? { scale: [1, 1.15, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 1 }}
                    onClick={handleToggleRecord}
                    className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg cursor-pointer transition-all ${
                      isRecording
                        ? 'bg-rose-500 text-white animate-pulse'
                        : recordedSuccess
                        ? 'bg-emerald-500 text-white'
                        : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                    }`}
                  >
                    {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                  </motion.button>
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    {isRecording
                      ? 'Listening... Speak now!'
                      : recordedSuccess
                      ? 'Great pronunciation! Your coach understood you perfectly!'
                      : 'Tap mic and pronounce the phrase above.'}
                  </p>
                  {recordingError && (
                    <p className="text-xs font-bold text-rose-600 dark:text-rose-400 text-center">
                      {recordingError}
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        ) : (
          /* Finished Celebration View */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center space-y-6 max-w-md"
          >
            <CoachMascot mood="cheering" outfit={userState.activeOutfit} size="lg" />

            <div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100">
                Lesson Completed!
              </h2>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mt-1">
                You’re mastering {languageId.toUpperCase()} step by step!
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-3 w-full">
              <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 p-3.5 rounded-2xl flex flex-col items-center">
                <Zap className="w-6 h-6 text-amber-500 mb-1" />
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Total XP</span>
                <span className="text-lg font-black text-amber-600 dark:text-amber-400">+20 XP</span>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 p-3.5 rounded-2xl flex flex-col items-center">
                <Award className="w-6 h-6 text-emerald-500 mb-1" />
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Accuracy</span>
                <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                  {Math.round((correctCount / exercises.length) * 100)}%
                </span>
              </div>

              <div className="bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-300 dark:border-cyan-800 p-3.5 rounded-2xl flex flex-col items-center">
                <Sparkles className="w-6 h-6 text-cyan-500 mb-1" />
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Gems</span>
                <span className="text-lg font-black text-cyan-600 dark:text-cyan-400">+15</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer Banner */}
      {!isLessonFinished && (
        <div
          className={`border-t-2 px-4 py-4 sm:py-6 transition-colors ${
            status === 'correct'
              ? 'bg-emerald-100 dark:bg-emerald-950 border-emerald-400'
              : status === 'incorrect'
              ? 'bg-rose-100 dark:bg-rose-950 border-rose-400'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
          }`}
        >
          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Feedback Info */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {status === 'correct' && (
                <>
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-black text-emerald-900 dark:text-emerald-200 text-lg">
                      Excellent!
                    </h4>
                    <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                      You nailed this translation!
                    </p>
                  </div>
                </>
              )}

              {status === 'incorrect' && (
                <>
                  <div className="w-12 h-12 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0">
                    <XCircle className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-black text-rose-900 dark:text-rose-200 text-lg">
                      Correct answer:
                    </h4>
                    <p className="text-xs font-bold text-rose-800 dark:text-rose-300">
                      {currentEx.correctAnswerId
                        ? currentEx.options?.find((o) => o.id === currentEx.correctAnswerId)?.text
                        : currentEx.correctSentence?.join(' ')}
                    </p>
                  </div>
                </>
              )}

              {status === 'idle' && (
                <span className="text-xs font-bold text-slate-400 hidden sm:inline">
                  Select an answer above to continue
                </span>
              )}
            </div>

            {/* Action Buttons */}
            {status === 'idle' ? (
              <button
                id="btn-check-exercise"
                disabled={
                  (currentEx.type === 'multiple_choice' || currentEx.type === 'listening') &&
                  !userAnswerId
                }
                onClick={handleCheckAnswer}
                className="w-full sm:w-auto px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 text-white font-black text-base rounded-2xl shadow-lg transition-all cursor-pointer uppercase tracking-wider active:scale-95"
              >
                Check
              </button>
            ) : (
              <button
                id="btn-continue-exercise"
                onClick={handleContinue}
                className={`w-full sm:w-auto px-8 py-3.5 font-black text-base rounded-2xl shadow-lg transition-all cursor-pointer uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 ${
                  status === 'correct'
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                    : 'bg-rose-500 hover:bg-rose-600 text-white'
                }`}
              >
                Continue <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
