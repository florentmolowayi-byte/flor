import React from 'react';
import { motion } from 'motion/react';
import { Target, Award, Check, Sparkles, Gem, Zap } from 'lucide-react';
import { Achievement, DailyQuest, UserState } from '../types';
import { soundManager } from '../utils/audio';

interface QuestsAchievementsViewProps {
  userState: UserState;
  quests: DailyQuest[];
  achievements: Achievement[];
  onClaimQuest: (questId: string) => void;
  onClaimAchievement: (achievementId: string) => void;
}

export const QuestsAchievementsView: React.FC<QuestsAchievementsViewProps> = ({
  userState,
  quests,
  achievements,
  onClaimQuest,
  onClaimAchievement,
}) => {
  return (
    <div className="max-w-2xl mx-auto py-6 px-4 pb-24 space-y-8">
      {/* Daily Quests Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Daily Quests</h2>
          </div>
          <span className="text-xs font-bold text-slate-400">Resets in 18h</span>
        </div>

        <div className="space-y-3">
          {quests.map((q) => {
            const isCompleted = q.progress >= q.target;
            const isClaimed = userState.claimedQuests.includes(q.id);
            const percent = Math.min(100, Math.round((q.progress / q.target) * 100));

            return (
              <div
                key={q.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 shadow-sm flex items-center justify-between gap-4"
              >
                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100">
                      {q.title}
                    </h4>
                    <span className="text-xs font-bold text-slate-400">
                      {q.progress}/{q.target}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{q.description}</p>
                  {/* Progress bar */}
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percent}%` }}
                      className="bg-blue-500 h-full rounded-full"
                    />
                  </div>
                </div>

                {/* Claim Button */}
                {isClaimed ? (
                  <span className="text-xs font-black text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl">
                    Claimed
                  </span>
                ) : isCompleted ? (
                  <button
                    onClick={() => {
                      soundManager.playGemSparkle();
                      onClaimQuest(q.id);
                    }}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer animate-pulse flex items-center gap-1"
                  >
                    <Gem className="w-3.5 h-3.5 fill-white" /> +{q.rewardGems} Gems
                  </button>
                ) : (
                  <span className="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl flex items-center gap-1">
                    <Gem className="w-3.5 h-3.5 text-cyan-500" /> +{q.rewardGems}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges & Achievements Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Award className="w-6 h-6 text-amber-500" />
          <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Achievements</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {achievements.map((ach) => {
            const isUnlocked = ach.current >= ach.target;
            const isClaimed = userState.unlockedAchievements.includes(ach.id);
            const percent = Math.min(100, Math.round((ach.current / ach.target) * 100));

            return (
              <div
                key={ach.id}
                className={`bg-white dark:bg-slate-900 border rounded-3xl p-4 shadow-sm space-y-3 ${
                  isUnlocked ? 'border-amber-400 dark:border-amber-600' : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
                      isUnlocked
                        ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-500 shadow-md'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400 grayscale'
                    }`}
                  >
                    {ach.icon}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100">
                      {ach.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {ach.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-bold text-slate-400">
                    <span>Progress</span>
                    <span>
                      {ach.current}/{ach.target}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${percent}%` }}
                      className="bg-amber-400 h-full rounded-full"
                    />
                  </div>
                </div>

                {isClaimed ? (
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <Check className="w-4 h-4" /> Unlocked & Claimed
                  </span>
                ) : isUnlocked ? (
                  <button
                    onClick={() => {
                      soundManager.playGemSparkle();
                      onClaimAchievement(ach.id);
                    }}
                    className="w-full py-2 bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-xs rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-1"
                  >
                    <Sparkles className="w-4 h-4" /> Claim +{ach.rewardGems} Gems
                  </button>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
