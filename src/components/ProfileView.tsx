import React from 'react';
import { motion } from 'motion/react';
import { Flame, Trophy, Gem, Award, Shield, BookOpen } from 'lucide-react';
import { UserState } from '../types';
import { LANGUAGES } from '../data/languages';
import { LEAGUES } from '../data/leaderboardData';
import { DuoMascot } from './DuoMascot';

interface ProfileViewProps {
  userState: UserState;
  onOpenShop: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ userState, onOpenShop }) => {
  const currentLangObj = LANGUAGES.find((l) => l.id === userState.currentLanguage) || LANGUAGES[0];
  const league = LEAGUES[userState.leagueId] || LEAGUES.bronze;

  return (
    <div className="max-w-2xl mx-auto py-6 px-4 pb-24 space-y-6">
      {/* Profile Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-md flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
        <div className="relative">
          <DuoMascot mood="happy" outfit={userState.activeOutfit} size="lg" />
          <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white rounded-full p-2 border-2 border-white dark:border-slate-900 shadow-md">
            <Shield className="w-4 h-4" />
          </div>
        </div>

        <div className="space-y-2 flex-1">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">
              {userState.name}
            </h2>
            <span className="text-2xl">{currentLangObj.flag}</span>
          </div>

          <p className="text-xs font-bold text-slate-400">
            Learning {currentLangObj.name} • Joined July 2026
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
            <span className="px-3 py-1 bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 font-extrabold text-xs rounded-full flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-orange-500" /> {userState.streak} Day Streak
            </span>
            <span className="px-3 py-1 bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 font-extrabold text-xs rounded-full flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5 text-amber-500" /> {league.name}
            </span>
          </div>
        </div>
      </div>

      {/* Overview Statistics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-3xl text-center space-y-1 shadow-xs">
          <Flame className="w-6 h-6 text-orange-500 fill-orange-500 mx-auto" />
          <span className="text-2xl font-black text-slate-900 dark:text-slate-100 block">
            {userState.streak}
          </span>
          <span className="text-[11px] font-bold text-slate-400 uppercase">Day Streak</span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-3xl text-center space-y-1 shadow-xs">
          <Trophy className="w-6 h-6 text-amber-500 mx-auto" />
          <span className="text-2xl font-black text-slate-900 dark:text-slate-100 block">
            {userState.xp}
          </span>
          <span className="text-[11px] font-bold text-slate-400 uppercase">Total XP</span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-3xl text-center space-y-1 shadow-xs">
          <Gem className="w-6 h-6 text-cyan-500 fill-cyan-400 mx-auto" />
          <span className="text-2xl font-black text-slate-900 dark:text-slate-100 block">
            {userState.gems}
          </span>
          <span className="text-[11px] font-bold text-slate-400 uppercase">Gems</span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-3xl text-center space-y-1 shadow-xs">
          <Award className="w-6 h-6 text-emerald-500 mx-auto" />
          <span className="text-2xl font-black text-slate-900 dark:text-slate-100 block">
            {Object.keys(userState.completedNodes).length}
          </span>
          <span className="text-[11px] font-bold text-slate-400 uppercase">Lessons</span>
        </div>
      </div>

      {/* Languages Mastered */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-3">
        <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
          Your Courses
        </h3>

        <div className="space-y-2">
          {LANGUAGES.map((lang) => {
            const isCurrent = lang.id === userState.currentLanguage;
            return (
              <div
                key={lang.id}
                className={`flex items-center justify-between p-3 rounded-2xl ${
                  isCurrent
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800'
                    : 'bg-slate-50 dark:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{lang.flag}</span>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100">
                      {lang.name}
                    </h4>
                    <span className="text-xs text-slate-400 font-medium">
                      {isCurrent ? 'Active Course' : 'Available'}
                    </span>
                  </div>
                </div>

                {isCurrent && (
                  <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/60 px-3 py-1 rounded-full">
                    Current
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
