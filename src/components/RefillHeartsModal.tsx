import React from 'react';
import { motion } from 'motion/react';
import { Heart, X, Sparkles, BookOpen } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface RefillHeartsModalProps {
  currentHearts: number;
  maxHearts: number;
  gems: number;
  onClose: () => void;
  onRefillWithGems: () => void;
  onStartPractice: () => void;
}

export const RefillHeartsModal: React.FC<RefillHeartsModalProps> = ({
  currentHearts,
  maxHearts,
  gems,
  onClose,
  onRefillWithGems,
  onStartPractice,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-slate-900 border-2 border-rose-500/30 rounded-3xl p-6 max-w-md w-full shadow-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center mt-2 mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            {Array.from({ length: maxHearts }).map((_, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Heart
                  className={`w-9 h-9 ${
                    idx < currentHearts
                      ? 'text-rose-500 fill-rose-500 drop-shadow-sm'
                      : 'text-slate-300 dark:text-slate-700 fill-slate-200 dark:fill-slate-800'
                  }`}
                />
              </motion.div>
            ))}
          </div>

          <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">
            {currentHearts === maxHearts ? 'Hearts are Full!' : 'Need More Hearts?'}
          </h2>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1 max-w-xs">
            {currentHearts === maxHearts
              ? 'You have 5/5 hearts ready for learning!'
              : 'Hearts protect you during lessons when you make mistakes.'}
          </p>
        </div>

        {currentHearts < maxHearts && (
          <div className="space-y-3">
            {/* Option 1: Refill with Gems */}
            <button
              onClick={() => {
                soundManager.playGemSparkle();
                onRefillWithGems();
              }}
              disabled={gems < 100}
              className="w-full flex items-center justify-between p-4 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/40 border-2 border-rose-400 rounded-2xl transition-all cursor-pointer disabled:opacity-50 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center text-xl shadow-md">
                  ❤️
                </div>
                <div className="text-left">
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100">
                    Instant Refill (5 Hearts)
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Use your saved gems
                  </p>
                </div>
              </div>
              <span className="font-extrabold text-xs px-3 py-1.5 rounded-xl bg-rose-500 text-white flex items-center gap-1 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" /> 100 Gems
              </span>
            </button>

            {/* Option 2: Practice to earn heart */}
            <button
              onClick={() => {
                soundManager.playClick();
                onStartPractice();
              }}
              className="w-full flex items-center justify-between p-4 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/40 border-2 border-emerald-400 rounded-2xl transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center text-xl shadow-md">
                  📖
                </div>
                <div className="text-left">
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100">
                    Practice to Earn +1 Heart
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Review past material with zero penalty
                  </p>
                </div>
              </div>
              <span className="font-extrabold text-xs px-3 py-1.5 rounded-xl bg-emerald-500 text-white flex items-center gap-1 shadow-sm">
                <BookOpen className="w-3.5 h-3.5" /> Free Practice
              </span>
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
