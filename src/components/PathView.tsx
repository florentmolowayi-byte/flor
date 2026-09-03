import React from 'react';
import { motion } from 'motion/react';
import { Check, Star, Lock, Gift, Zap, Sparkles } from 'lucide-react';
import { Language, UserLearningProfile, UserState } from '../types';
import { LearningPathStep } from '../utils/curriculumSequencingService';
import { soundManager } from '../utils/audio';

interface PathViewProps {
  language: Language;
  userState: UserState;
  onSelectNode: (nodeId: string) => void;
  onClaimChest: (nodeId: string, gemAmount: number) => void;
  onStartPractice: () => void;
  learningProfile?: UserLearningProfile;
  nextLesson?: LearningPathStep | null;
  upcomingLessons?: LearningPathStep[];
  onLessonSelected?: (lessonId: string) => void;
}

export const PathView: React.FC<PathViewProps> = ({
  language,
  userState,
  onSelectNode,
  onClaimChest,
  onStartPractice,
  learningProfile,
  nextLesson,
  upcomingLessons = [],
  onLessonSelected,
}) => {
  const lessonNodes = language.units.flatMap((unit) => unit.nodes.filter((node) => node.type === 'lesson'));
  const completedLessons = lessonNodes.filter((node) => userState.completedNodes[node.id] > 0).length;
  const completedExercises = learningProfile?.exerciseHistory || [];
  const correctExercises = completedExercises.filter((exercise) => exercise.correct).length;
  const accuracy = completedExercises.length > 0 ? Math.round((correctExercises / completedExercises.length) * 100) : 0;
  const weakestSkills = learningProfile
    ? Object.values(learningProfile.skillProficiencies)
        .sort((first, second) => first.proficiency - second.proficiency)
        .slice(0, 3)
    : [];

  return (
    <div className="max-w-xl mx-auto py-6 px-4 pb-24 space-y-10">
      {nextLesson && (
        <div className="bg-slate-900 rounded-3xl p-5 text-white shadow-xl space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-emerald-300">Adaptive next step</p>
              <h2 className="text-xl font-black mt-1">{nextLesson.title}</h2>
              <p className="text-sm text-slate-300 mt-1">{nextLesson.rationale}</p>
            </div>
            <span className="text-xs font-bold text-slate-300 whitespace-nowrap">{nextLesson.estimatedDuration} min</span>
          </div>
          {learningProfile && learningProfile.focusAreas.length > 0 && (
            <p className="text-xs font-bold text-amber-300">
              Focus: {learningProfile.focusAreas.slice(0, 2).join(' and ')}
            </p>
          )}
          <button
            onClick={() => onLessonSelected?.(nextLesson.lessonId)}
            className="w-full px-4 py-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-sm rounded-2xl transition-colors cursor-pointer"
          >
            Continue learning
          </button>
          <div className="grid grid-cols-3 gap-2 border-t border-white/15 pt-4 text-center">
            <div>
              <p className="text-lg font-black">{completedLessons}/{lessonNodes.length}</p>
              <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Level progress</p>
            </div>
            <div>
              <p className="text-lg font-black">{accuracy}%</p>
              <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Accuracy</p>
            </div>
            <div>
              <p className="text-lg font-black">{learningProfile?.exerciseHistory.length || 0}</p>
              <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Answers tracked</p>
            </div>
          </div>
          {weakestSkills.length > 0 && (
            <div className="space-y-2 border-t border-white/15 pt-4">
              <p className="text-xs font-black uppercase tracking-wider text-slate-400">Skills needing practice</p>
              {weakestSkills.map((skill) => (
                <div key={skill.skill} className="flex items-center gap-2 text-xs">
                  <span className="w-24 capitalize text-slate-300">{skill.skill}</span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-amber-300" style={{ width: `${skill.proficiency}%` }} />
                  </div>
                  <span className="w-8 text-right font-bold text-slate-300">{Math.round(skill.proficiency)}%</span>
                </div>
              ))}
            </div>
          )}
          {upcomingLessons.length > 1 && (
            <div className="space-y-2 border-t border-white/15 pt-4">
              <p className="text-xs font-black uppercase tracking-wider text-slate-400">Your organized classes</p>
              {upcomingLessons.slice(1).map((lesson, index) => (
                <button
                  key={lesson.lessonId}
                  onClick={() => onLessonSelected?.(lesson.lessonId)}
                  className="flex w-full items-center gap-3 rounded-xl bg-white/10 px-3 py-2 text-left hover:bg-white/15 transition-colors cursor-pointer"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15 text-xs font-black">
                    {index + 2}
                  </span>
                  <span className="flex-1 text-sm font-bold text-slate-200">{lesson.title}</span>
                  <span className="text-[10px] font-bold text-slate-400">{lesson.estimatedDuration} min</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Quick Start Floating Header Card */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-5 text-white shadow-xl flex items-center justify-between relative overflow-hidden">
        <div className="z-10 space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{language.flag}</span>
            <span className="font-black text-xl">{language.name} Path</span>
          </div>
          <p className="text-xs font-semibold text-emerald-100 max-w-xs">
            {language.description}
          </p>
        </div>
        <button
          onClick={() => {
            soundManager.playClick();
            onStartPractice();
          }}
          className="z-10 px-4 py-2.5 bg-white hover:bg-emerald-50 text-emerald-700 font-black text-xs rounded-2xl shadow-md transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
        >
          <Zap className="w-4 h-4 fill-emerald-600" /> Practice
        </button>
        {/* Decorative Circle */}
        <div className="absolute -right-6 -bottom-10 w-32 h-32 rounded-full bg-white/10 blur-md pointer-events-none" />
      </div>

      {/* Units List */}
      {language.units.map((unit) => (
        <div key={unit.id} className="space-y-6">
          {/* Unit Banner Header */}
          <div
            style={{ backgroundColor: unit.color }}
            className="rounded-3xl p-5 text-white shadow-lg space-y-2 relative"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider bg-black/20 px-3 py-1 rounded-full">
                {unit.title.split(':')[0]}
              </span>
              <span className="text-xs font-bold bg-white/20 px-2.5 py-1 rounded-full">
                Unit {unit.number}
              </span>
            </div>
            <h3 className="text-xl font-black">{unit.title.split(':')[1] || unit.title}</h3>
            <p className="text-xs font-medium opacity-90">{unit.description}</p>
            {unit.grammar && (
              <p className="text-xs font-bold text-white/90">
                Grammar: <span className="font-black">{unit.grammar}</span>
              </p>
            )}
            {unit.verbs && (
              <p className="text-xs font-bold text-white/90">
                Verbs: <span className="font-black">{unit.verbs}</span>
              </p>
            )}
            {unit.pronunciation && (
              <p className="text-xs font-bold text-white/90">
                Pronunciation: <span className="font-black">{unit.pronunciation}</span>
              </p>
            )}
          </div>

          {/* Winding Path Nodes */}
          <div className="relative flex flex-col items-center space-y-7 py-2">
            {unit.nodes.map((node, idx) => {
              const stars = userState.completedNodes[node.id] || 0;
              const isCompleted = stars > 0;
              // Node is unlocked if first node OR previous completed
              const isUnlocked = idx === 0 || userState.completedNodes[unit.nodes[idx - 1]?.id] !== undefined || isCompleted;

              // Sinusoidal offset calculation for Duolingo snake effect!
              const offsetPx = Math.sin(idx * 1.1) * 65;

              return (
                <div
                  key={node.id}
                  style={{ transform: `translateX(${offsetPx}px)` }}
                  className="relative flex flex-col items-center"
                >
                  {/* Active Bouncing Halo indicator */}
                  {!isCompleted && isUnlocked && node.type !== 'chest' && (
                    <motion.div
                      animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0.2, 0.6] }}
                      transition={{ repeat: Infinity, duration: 1.8 }}
                      className="absolute -inset-3 rounded-full bg-emerald-500/40 -z-10"
                    />
                  )}

                  {/* Chest Node */}
                  {node.type === 'chest' ? (
                    <button
                      onClick={() => {
                        if (isUnlocked && !isCompleted) {
                          soundManager.playGemSparkle();
                          onClaimChest(node.id, node.gemReward || 50);
                        }
                      }}
                      className={`w-16 h-16 rounded-3xl flex items-center justify-center shadow-lg transition-transform cursor-pointer border-4 ${
                        isCompleted
                          ? 'bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-400'
                          : isUnlocked
                          ? 'bg-amber-400 border-amber-300 text-amber-950 animate-bounce'
                          : 'bg-slate-200 dark:bg-slate-800 border-slate-300 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <Gift className="w-8 h-8" />
                    </button>
                  ) : (
                    /* Lesson / Checkpoint Node */
                    <button
                      id={`path-node-${node.id}`}
                      disabled={!isUnlocked}
                      onClick={() => {
                        soundManager.playClick();
                        onSelectNode(node.id);
                      }}
                      className={`w-20 h-20 rounded-full flex flex-col items-center justify-center font-black transition-all shadow-xl cursor-pointer border-4 relative active:scale-95 ${
                        isCompleted
                          ? 'bg-amber-400 border-amber-500 text-amber-950 shadow-amber-500/30'
                          : isUnlocked
                          ? 'bg-emerald-500 border-emerald-400 text-white shadow-emerald-500/40 hover:scale-105'
                          : 'bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-400 cursor-not-allowed opacity-75'
                      }`}
                    >
                      {isCompleted ? (
                        <div className="flex flex-col items-center">
                          <Check className="w-8 h-8 stroke-[3]" />
                          <div className="flex gap-0.5 mt-0.5">
                            {Array.from({ length: 3 }).map((_, sIdx) => (
                              <Star
                                key={sIdx}
                                className={`w-3 h-3 ${
                                  sIdx < stars ? 'fill-amber-950 text-amber-950' : 'text-amber-600/50'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      ) : isUnlocked ? (
                        <div className="flex flex-col items-center">
                          <span className="text-2xl">🦉</span>
                          <span className="text-[10px] font-extrabold uppercase tracking-tight">START</span>
                        </div>
                      ) : (
                        <Lock className="w-7 h-7" />
                      )}

                      {/* Tooltip Title */}
                      <span className="absolute -bottom-6 whitespace-nowrap text-[11px] font-extrabold text-slate-700 dark:text-slate-300 bg-white/90 dark:bg-slate-800/90 px-2.5 py-0.5 rounded-full border border-slate-200 dark:border-slate-700 shadow-xs">
                        {node.title}
                      </span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
