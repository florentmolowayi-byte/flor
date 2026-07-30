import React, { useState } from 'react';
import { Flame, Gem, Heart, Volume2, VolumeX, ChevronDown } from 'lucide-react';
import { LanguageId, UserState } from '../types';
import { LANGUAGES } from '../data/languages';
import { soundManager } from '../utils/audio';

interface NavbarProps {
  userState: UserState;
  onSelectLanguage: (id: LanguageId) => void;
  onOpenStreakModal: () => void;
  onOpenShop: () => void;
  onOpenRefillHearts: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  userState,
  onSelectLanguage,
  onOpenStreakModal,
  onOpenShop,
  onOpenRefillHearts,
}) => {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(soundManager.isSoundEnabled());

  const currentLangObj = LANGUAGES.find((l) => l.id === userState.currentLanguage) || LANGUAGES[0];

  const handleToggleSound = () => {
    const newState = soundManager.toggleSound();
    setSoundEnabled(newState);
    if (newState) soundManager.playClick();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-2.5 flex items-center justify-between shadow-xs">
      {/* Left: Language Selector */}
      <div className="relative">
        <button
          id="btn-language-selector"
          onClick={() => {
            soundManager.playClick();
            setLangDropdownOpen(!langDropdownOpen);
          }}
          className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl transition-colors text-slate-800 dark:text-slate-100 font-bold text-sm cursor-pointer border border-slate-200 dark:border-slate-700"
        >
          <span className="text-xl">{currentLangObj.flag}</span>
          <span className="hidden sm:inline">{currentLangObj.name}</span>
          <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Menu */}
        {langDropdownOpen && (
          <div className="absolute top-full left-0 mt-2 w-52 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-2 z-50">
            <div className="text-xs font-bold text-slate-400 px-3 py-1 uppercase tracking-wider">
              Select Language
            </div>
            {LANGUAGES.map((lang) => (
              <button
                key={lang.id}
                onClick={() => {
                  soundManager.playClick();
                  onSelectLanguage(lang.id);
                  setLangDropdownOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left font-bold text-sm transition-colors cursor-pointer ${
                  lang.id === userState.currentLanguage
                    ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">{lang.flag}</span>
                  <span>{lang.name}</span>
                </div>
                {lang.id === userState.currentLanguage && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right: Gamification Stats Bar (Streaks, Gems, Hearts, Sound) */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Streak Flame Counter */}
        <button
          id="btn-streak-counter"
          onClick={() => {
            soundManager.playClick();
            onOpenStreakModal();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 hover:bg-orange-100 dark:bg-orange-950/40 dark:hover:bg-orange-900/40 border border-orange-200 dark:border-orange-800/60 rounded-xl transition-all cursor-pointer group scale-100 active:scale-95"
          title="Daily Streak - Click for streak calendar & freezes"
        >
          <Flame className="w-5 h-5 text-orange-500 fill-orange-500 animate-bounce" />
          <span className="font-extrabold text-orange-600 dark:text-orange-400 text-sm sm:text-base">
            {userState.streak}
          </span>
        </button>

        {/* Gem Counter */}
        <button
          id="btn-gem-counter"
          onClick={() => {
            soundManager.playClick();
            onOpenShop();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-50 hover:bg-cyan-100 dark:bg-cyan-950/40 dark:hover:bg-cyan-900/40 border border-cyan-200 dark:border-cyan-800/60 rounded-xl transition-all cursor-pointer group active:scale-95"
          title="Gems Store"
        >
          <Gem className="w-5 h-5 text-cyan-500 fill-cyan-400" />
          <span className="font-extrabold text-cyan-600 dark:text-cyan-400 text-sm sm:text-base">
            {userState.gems}
          </span>
        </button>

        {/* Hearts Counter */}
        <button
          id="btn-hearts-counter"
          onClick={() => {
            soundManager.playClick();
            onOpenRefillHearts();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/40 border border-rose-200 dark:border-rose-800/60 rounded-xl transition-all cursor-pointer group active:scale-95"
          title="Hearts remaining"
        >
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
          <span className="font-extrabold text-rose-600 dark:text-rose-400 text-sm sm:text-base">
            {userState.hearts}
          </span>
        </button>

        {/* Audio Toggle */}
        <button
          id="btn-audio-toggle"
          onClick={handleToggleSound}
          className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
          title={soundEnabled ? 'Mute audio' : 'Unmute audio'}
        >
          {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
        </button>
      </div>
    </header>
  );
};
