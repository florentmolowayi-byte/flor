import React from 'react';
import { motion } from 'motion/react';
import { Flame, Shield, Check, X, Target, Zap } from 'lucide-react';
import { UserState } from '../types';
import { soundManager } from '../utils/audio';

interface StreakModalProps {
  userState: UserState;
  onClose: () => void;
  onBuyStreakFreeze: () => void;
}

export const StreakModal: React.FC<StreakModalProps> = ({
  userState,
  onClose,
  onBuyStreakFreeze,
}) => {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const handleBuyFreeze = () => {
    soundManager.playGemSparkle();
    onBuyStreakFreeze();
  };

  const dailyXpPercent = Math.min(100, Math.round((userState.dailyXpEarned / userState.dailyXpTarget) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-slate-900 border-2 border-orange-500/30 rounded-3xl p-6 max-w-md w-full shadow-2xl relative overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Big Animated Streak Flame Banner */}
        <div className="flex flex-col items-center text-center mt-2 mb-6">
          <div className="relative mb-2">
            <motion.div
              animate={{ scale: [1, 1.12, 1], rotate: [0, -3, 3, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-24 h-24 rounded-full bg-orange-100 dark:bg-orange-950/60 flex items-center justify-center border-4 border-orange-400 shadow-inner"
            >
              <Flame className="w-16 h-16 text-orange-500 fill-orange-500" />
            </motion.div>
            {userState.hasActiveFreeze && (
              <div className="absolute -bottom-1 -right-1 bg-cyan-500 text-white rounded-full p-1.5 shadow-md border-2 border-white dark:border-slate-900" title="Streak Freeze Active">
                <Shield className="w-4 h-4" />
              </div>
            )}
          </div>

          <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            {userState.streak} Day Streak!
          </h2>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mt-1">
            Practice every day to build your streak flame!
          </p>
        </div>

        {/* Daily XP Target Bar */}
        <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-4 mb-5">
          <div className="flex items-center justify-between text-xs font-extrabold uppercase text-slate-500 dark:text-slate-400 mb-2">
            <span className="flex items-center gap-1.5">
              <Target className="w-4 h-4 text-emerald-500" /> Daily Goal
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">
              {userState.dailyXpEarned} / {userState.dailyXpTarget} XP
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-3 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${dailyXpPercent}%` }}
              transition={{ duration: 1 }}
              className="bg-emerald-500 h-full rounded-full"
            />
          </div>
          {dailyXpPercent >= 100 ? (
            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-2 flex items-center gap-1">
              <Check className="w-4 h-4" /> Daily goal met! Your streak flame is safe today!
            </p>
          ) : (
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-2">
              Earn {userState.dailyXpTarget - userState.dailyXpEarned} more XP today to lock in your streak!
            </p>
          )}
        </div>

        {/* Weekly Activity Heatmap */}
        <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-4 mb-5">
          <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3">
            This Week's Activity
          </h3>
          <div className="grid grid-cols-7 gap-2 text-center">
            {daysOfWeek.map((day, idx) => {
              const active = idx < userState.streak;
              return (
                <div key={day} className="flex flex-col items-center">
                  <span className="text-[11px] font-bold text-slate-400 mb-1">{day}</span>
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shadow-xs ${
                      active
                        ? 'bg-orange-500 text-white shadow-orange-500/30'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
                    }`}
                  >
                    {active ? <Flame className="w-5 h-5 fill-white" /> : idx + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Streak Freeze Armor Info & Buy Button */}
        <div className="flex items-center justify-between bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500 text-white flex items-center justify-center text-xl shadow-md">
              🧊
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-cyan-900 dark:text-cyan-200">
                Streak Freeze
              </h4>
              <p className="text-xs text-cyan-700 dark:text-cyan-400">
                {userState.streakFreezeCount > 0
                  ? `${userState.streakFreezeCount} Freeze equipped`
                  : 'Protects streak if you miss a day'}
              </p>
            </div>
          </div>

          <button
            onClick={handleBuyFreeze}
            disabled={userState.gems < 200 || userState.streakFreezeCount >= 2}
            className="px-3 py-2 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Zap className="w-4 h-4" /> 200 Gems
          </button>
        </div>
      </motion.div>
    </div>
  );
};
