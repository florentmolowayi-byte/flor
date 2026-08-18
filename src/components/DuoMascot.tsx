import React from 'react';
import { motion } from 'motion/react';
import { DuoMascotMood } from '../types';

interface DuoMascotProps {
  mood?: DuoMascotMood;
  outfit?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  speechBubble?: string;
  className?: string;
}

export const DuoMascot: React.FC<DuoMascotProps> = ({
  mood = 'idle',
  outfit = 'default',
  size = 'md',
  speechBubble,
  className = '',
}) => {
  const sizePx = {
    sm: 64,
    md: 96,
    lg: 140,
    xl: 180,
  }[size];

  const accent =
    outfit === 'outfit_gold'
      ? 'from-yellow-400 via-amber-500 to-orange-600'
      : outfit === 'outfit_cyberpunk'
      ? 'from-cyan-400 via-blue-500 to-fuchsia-500'
      : outfit === 'outfit_super'
      ? 'from-red-500 via-pink-500 to-violet-500'
      : 'from-emerald-400 via-teal-500 to-cyan-500';

  const icon = mood === 'sad' ? '✦' : mood === 'hyped' ? '⚡' : '🌍';

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {speechBubble && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="mb-3 max-w-xs bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-2 border-emerald-500 rounded-2xl px-4 py-2 text-sm font-bold shadow-lg text-center relative z-20"
        >
          {speechBubble}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-emerald-500" />
        </motion.div>
      )}

      <motion.div
        animate={
          mood === 'cheering' || mood === 'happy'
            ? { y: [0, -12, 0, -8, 0], rotate: [0, -5, 5, -3, 0] }
            : mood === 'hyped'
            ? { scale: [1, 1.05, 1], rotate: [0, -2, 2, 0] }
            : mood === 'sad'
            ? { y: [0, 4, 0] }
            : { y: [0, -4, 0] }
        }
        transition={{
          repeat: mood === 'idle' ? Infinity : 0,
          duration: mood === 'idle' ? 3 : 0.6,
          ease: 'easeInOut',
        }}
        style={{ width: sizePx, height: sizePx }}
        className="relative cursor-pointer select-none"
      >
        <div
          className={`w-full h-full rounded-[30%] bg-gradient-to-br ${accent} shadow-lg border-4 border-white/70 flex items-center justify-center text-3xl font-black text-white`}
        >
          {icon}
        </div>
        {mood === 'hyped' && (
          <motion.div
            animate={{ opacity: [0.4, 0.9, 0.4], scale: [0.95, 1.1, 0.95] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="absolute inset-0 bg-amber-400/20 blur-xl rounded-full -z-10 pointer-events-none"
          />
        )}
      </motion.div>
    </div>
  );
};
