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

  // Base skin color (Gold outfit changes skin to 24k gold gradient!)
  const isGold = outfit === 'outfit_gold';
  const isCyberpunk = outfit === 'outfit_cyberpunk';
  const isSuper = outfit === 'outfit_super';
  const isGentleman = outfit === 'outfit_gentleman';

  const bodyFill = isGold ? 'url(#goldGrad)' : '#58CC02';
  const wingFill = isGold ? 'url(#goldDarkGrad)' : '#46A302';
  const bellyFill = isGold ? '#FEF08A' : '#78D824';

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* Optional Speech Bubble */}
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

      {/* Duo SVG Mascot Container */}
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
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md overflow-visible">
          <defs>
            {/* 24k Gold Gradient */}
            <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="50%" stopColor="#EAB308" />
              <stop offset="100%" stopColor="#CA8A04" />
            </linearGradient>
            <linearGradient id="goldDarkGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#EAB308" />
              <stop offset="100%" stopColor="#A16207" />
            </linearGradient>

            {/* Cyberpunk Visor Gradient */}
            <linearGradient id="cyberVisor" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="50%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>

          {/* Superhero Cape */}
          {isSuper && (
            <motion.path
              d="M30 65 Q 15 95 10 110 L 60 100 L 110 110 Q 105 95 90 65 Z"
              fill="#EF4444"
              stroke="#B91C1C"
              strokeWidth="2"
              animate={{ d: ["M30 65 Q 15 95 10 110 L 60 100 L 110 110 Q 105 95 90 65 Z", "M30 65 Q 10 95 5 112 L 60 100 L 115 112 Q 110 95 90 65 Z"] }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.8 }}
            />
          )}

          {/* Main Body */}
          <path
            d="M 60,15 C 32,15 20,40 20,70 C 20,95 35,108 60,108 C 85,108 100,95 100,70 C 100,40 88,15 60,15 Z"
            fill={bodyFill}
            stroke="#3B8206"
            strokeWidth="3"
          />

          {/* Feathered Ears / Tufts */}
          <path d="M 28,25 Q 15,10 38,20 Z" fill={bodyFill} stroke="#3B8206" strokeWidth="2" />
          <path d="M 92,25 Q 105,10 82,20 Z" fill={bodyFill} stroke="#3B8206" strokeWidth="2" />

          {/* Belly Feather Patch */}
          <ellipse cx="60" cy="78" rx="26" ry="20" fill={bellyFill} opacity="0.9" />

          {/* Left Wing */}
          <motion.path
            d={
              mood === 'cheering' || mood === 'happy'
                ? 'M 22,55 C 8,35 10,25 18,35 C 24,42 25,58 22,55 Z'
                : mood === 'sad'
                ? 'M 22,60 C 12,80 15,90 20,85 C 24,78 24,65 22,60 Z'
                : 'M 22,55 C 10,65 12,80 20,78 C 24,75 25,60 22,55 Z'
            }
            fill={wingFill}
            stroke="#367E02"
            strokeWidth="2"
          />

          {/* Right Wing */}
          <motion.path
            d={
              mood === 'cheering' || mood === 'happy'
                ? 'M 98,55 C 112,35 110,25 102,35 C 96,42 95,58 98,55 Z'
                : mood === 'sad'
                ? 'M 98,60 C 108,80 105,90 100,85 C 96,78 96,65 98,60 Z'
                : 'M 98,55 C 110,65 108,80 100,78 C 96,75 95,60 98,55 Z'
            }
            fill={wingFill}
            stroke="#367E02"
            strokeWidth="2"
          />

          {/* Eyes Base (Big White Circles) */}
          <circle cx="44" cy="48" r="14" fill="#FFFFFF" stroke="#333" strokeWidth="1.5" />
          <circle cx="76" cy="48" r="14" fill="#FFFFFF" stroke="#333" strokeWidth="1.5" />

          {/* Eye Pupils (Direction / Mood) */}
          {mood === 'sad' ? (
            <>
              {/* Sad Droopy Eyes */}
              <circle cx="46" cy="50" r="5" fill="#1E293B" />
              <circle cx="74" cy="50" r="5" fill="#1E293B" />
              <path d="M 34,38 Q 44,44 54,40" fill="none" stroke="#333" strokeWidth="2.5" />
              <path d="M 66,40 Q 76,44 86,38" fill="none" stroke="#333" strokeWidth="2.5" />
            </>
          ) : mood === 'hyped' ? (
            <>
              {/* Hyped Star Eyes */}
              <text x="36" y="54" fontSize="16">🔥</text>
              <text x="68" y="54" fontSize="16">🔥</text>
            </>
          ) : mood === 'thinking' ? (
            <>
              {/* Looking up */}
              <circle cx="44" cy="44" r="5" fill="#1E293B" />
              <circle cx="76" cy="44" r="5" fill="#1E293B" />
            </>
          ) : (
            <>
              {/* Normal / Happy Eyes */}
              <circle cx="46" cy="48" r="6" fill="#1E293B" />
              <circle cx="74" cy="48" r="6" fill="#1E293B" />
              {/* Eye Catchlights */}
              <circle cx="48" cy="45" r="2" fill="#FFFFFF" />
              <circle cx="76" cy="45" r="2" fill="#FFFFFF" />
            </>
          )}

          {/* Beak */}
          {mood === 'cheering' || mood === 'happy' || mood === 'surprised' ? (
            /* Open Beak */
            <path d="M 52,56 Q 60,52 68,56 Q 60,72 52,56 Z" fill="#FF9600" stroke="#D97706" strokeWidth="2" />
          ) : (
            /* Closed Cute Beak */
            <path d="M 52,56 Q 60,52 68,56 Q 60,66 52,56 Z" fill="#FF9600" stroke="#D97706" strokeWidth="2" />
          )}

          {/* Feet */}
          <path d="M 44,106 L 40,115 M 48,106 L 48,116 M 52,106 L 56,115" stroke="#FF9600" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 68,106 L 64,115 M 72,106 L 72,116 M 76,106 L 80,115" stroke="#FF9600" strokeWidth="3.5" strokeLinecap="round" />

          {/* Outfit Extras */}
          {isCyberpunk && (
            <g>
              <rect x="26" y="40" width="68" height="16" rx="4" fill="url(#cyberVisor)" opacity="0.95" stroke="#00FFFF" strokeWidth="1.5" />
              <line x1="28" y1="48" x2="92" y2="48" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.8" />
            </g>
          )}

          {isGentleman && (
            <g>
              {/* Top Hat */}
              <path d="M 32,20 L 88,20 L 84,2 Z" fill="#1E293B" />
              <rect x="28" y="18" width="64" height="4" rx="2" fill="#0F172A" />
              <rect x="36" y="14" width="48" height="4" fill="#EF4444" />
              {/* Monocle */}
              <circle cx="76" cy="48" r="10" fill="none" stroke="#F59E0B" strokeWidth="2" />
              <line x1="84" y1="54" x2="92" y2="72" stroke="#F59E0B" strokeWidth="1.5" />
              {/* Bowtie */}
              <path d="M 52,70 L 68,70 L 60,65 Z M 52,70 L 68,70 L 60,75 Z" fill="#EF4444" />
            </g>
          )}
        </svg>

        {/* Hyped Flame Aura Effect */}
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
