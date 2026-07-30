import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, Shield, ArrowUpRight, ArrowDownRight, Clock, Flame, Zap, RefreshCw } from 'lucide-react';
import { Competitor, UserState } from '../types';
import { LEAGUES } from '../data/leaderboardData';
import { soundManager } from '../utils/audio';

interface LeaderboardViewProps {
  userState: UserState;
  competitors: Competitor[];
  onSimulateOpponents: () => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  userState,
  competitors,
  onSimulateOpponents,
}) => {
  const [isSimulating, setIsSimulating] = useState(false);
  const league = LEAGUES[userState.leagueId] || LEAGUES.bronze;

  // Merge User into competitor list
  const userCompetitor: Competitor = {
    id: 'user_main',
    name: userState.name || 'You',
    avatar: '🦉',
    flag: '🇪🇸',
    weeklyXp: userState.leagueWeeklyXp,
    isUser: true,
    streak: userState.streak,
    status: 'Learning Spanish',
  };

  const allCompetitors = [...competitors.filter((c) => !c.isUser), userCompetitor].sort(
    (a, b) => b.weeklyXp - a.weeklyXp
  );

  const userRankIndex = allCompetitors.findIndex((c) => c.isUser);
  const userRank = userRankIndex + 1;

  const handleSimulate = () => {
    soundManager.playClick();
    setIsSimulating(true);
    onSimulateOpponents();
    setTimeout(() => setIsSimulating(false), 600);
  };

  return (
    <div className="max-w-2xl mx-auto py-6 px-4 pb-24 space-y-6">
      {/* Current League Header Banner */}
      <div className={`rounded-3xl p-6 border-2 shadow-xl ${league.borderBg} space-y-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{league.icon}</span>
            <div>
              <h2 className="text-2xl font-black tracking-tight">{league.name}</h2>
              <p className="text-xs font-semibold opacity-80">
                Top {league.promotionSeats} promote to the next league!
              </p>
            </div>
          </div>
          <button
            onClick={handleSimulate}
            className="p-2.5 bg-white/10 hover:bg-white/20 rounded-2xl transition-all text-xs font-bold cursor-pointer flex items-center gap-1.5"
            title="Simulate live opponent activity"
          >
            <RefreshCw className={`w-4 h-4 ${isSimulating ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Live Activity</span>
          </button>
        </div>

        {/* Timer & User Rank Summary */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="bg-black/20 rounded-2xl p-3 flex items-center gap-2.5">
            <Clock className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Reset In</span>
              <span className="font-extrabold text-xs text-white">2 days 14 hours</span>
            </div>
          </div>

          <div className="bg-black/20 rounded-2xl p-3 flex items-center gap-2.5">
            <Trophy className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Your Rank</span>
              <span className="font-extrabold text-xs text-white">
                #{userRank} of {allCompetitors.length} ({userState.leagueWeeklyXp} XP)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard Competitors List */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-2 sm:p-4 shadow-md divide-y divide-slate-100 dark:divide-slate-800">
        <div className="flex items-center justify-between px-3 py-2 text-xs font-extrabold text-slate-400 uppercase tracking-wider">
          <span>Rank & Learner</span>
          <span>Weekly XP</span>
        </div>

        {allCompetitors.map((comp, idx) => {
          const rank = idx + 1;
          const isPromotionZone = rank <= league.promotionSeats;
          const isDemotionZone = rank > allCompetitors.length - league.demotionSeats && league.demotionSeats > 0;

          return (
            <motion.div
              key={comp.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-center justify-between p-3 rounded-2xl transition-all ${
                comp.isUser
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 border-2 border-emerald-500 my-1 shadow-md'
                  : isPromotionZone
                  ? 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  : isDemotionZone
                  ? 'hover:bg-rose-50/50 dark:hover:bg-rose-950/20'
                  : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Rank Badge */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                    rank === 1
                      ? 'bg-amber-400 text-amber-950 shadow-md'
                      : rank === 2
                      ? 'bg-slate-300 text-slate-800'
                      : rank === 3
                      ? 'bg-amber-700 text-amber-100'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`}
                </div>

                {/* Avatar & Info */}
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{comp.avatar}</span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-sm text-slate-900 dark:text-slate-100">
                        {comp.name}
                      </span>
                      {comp.isUser && (
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500 text-white">
                          YOU
                        </span>
                      )}
                      <span className="text-xs">{comp.flag}</span>
                    </div>
                    {comp.status && (
                      <span className="text-xs text-slate-400 font-medium block">
                        {comp.status}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* XP & Promotion Tag */}
              <div className="flex items-center gap-3">
                {isPromotionZone && (
                  <span className="hidden sm:flex items-center gap-0.5 text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-1 rounded-lg">
                    <ArrowUpRight className="w-3 h-3" /> Promotes
                  </span>
                )}
                {isDemotionZone && (
                  <span className="hidden sm:flex items-center gap-0.5 text-[10px] font-extrabold text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-950/60 px-2 py-1 rounded-lg">
                    <ArrowDownRight className="w-3 h-3" /> Demotes
                  </span>
                )}

                <div className="text-right">
                  <span className="font-black text-sm text-slate-900 dark:text-slate-100 block">
                    {comp.weeklyXp} XP
                  </span>
                  <span className="text-[10px] font-bold text-orange-500 flex items-center justify-end gap-0.5">
                    <Flame className="w-3 h-3 fill-orange-500" /> {comp.streak}d
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
