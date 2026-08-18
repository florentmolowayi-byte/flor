export type LanguageId = 'es' | 'fr' | 'de' | 'ja' | 'it' | 'zh' | 'tr';

export interface Language {
  id: LanguageId;
  name: string;
  flag: string;
  nativeName: string;
  description: string;
  color: string;
  units: Unit[];
}

export interface Unit {
  id: string;
  number: number;
  title: string;
  description: string;
  color: string;
  nodes: PathNode[];
}

export type NodeType = 'lesson' | 'chest' | 'checkpoint' | 'practice';

export interface PathNode {
  id: string;
  title: string;
  type: NodeType;
  totalSteps: number;
  xpReward: number;
  gemReward?: number;
  unlocked: boolean;
  completed: boolean;
  stars: number; // 0 to 3 stars
}

export type ExerciseType = 'multiple_choice' | 'word_bank' | 'match_pairs' | 'listening' | 'speaking';

export interface Option {
  id: string;
  text: string;
  translation?: string;
  imageEmoji?: string;
}

export interface Pair {
  id: string;
  left: string;
  right: string;
}

export interface Exercise {
  id: string;
  type: ExerciseType;
  prompt: string;
  audioText?: string;
  options?: Option[];
  correctAnswerId?: string; // for multiple choice
  correctSentence?: string[]; // for word bank
  wordBankPool?: string[]; // available tiles for word bank
  pairs?: Pair[]; // for match_pairs
  hint?: string;
}

export interface Lesson {
  id: string;
  title: string;
  unitId: string;
  xpReward: number;
  gemReward: number;
  exercises: Exercise[];
}

export type DuoMascotMood = 'idle' | 'happy' | 'cheering' | 'sad' | 'hyped' | 'thinking' | 'surprised';

export interface UserState {
  name: string;
  avatar: string;
  currentLanguage: LanguageId;
  xp: number;
  gems: number;
  hearts: number;
  maxHearts: number;
  streak: number;
  lastActiveDate: string; // YYYY-MM-DD
  streakFreezeCount: number;
  hasActiveFreeze: boolean;
  activeOutfit: string; // 'default' | 'cyberpunk' | 'super' | 'gentleman' | 'gold'
  doubleXpTimer: number; // timestamp until double XP ends
  completedNodes: Record<string, number>; // nodeId -> stars earned
  dailyXpTarget: number;
  dailyXpEarned: number;
  claimedQuests: string[];
  unlockedAchievements: string[];
  inventory: string[]; // item ids owned
  leagueId: LeagueTier;
  leagueWeeklyXp: number;
  weeklyStreakHistory: { date: string; active: boolean; frozen?: boolean }[];
}

export type LeagueTier =
  | 'bronze'
  | 'silver'
  | 'gold'
  | 'sapphire'
  | 'ruby'
  | 'emerald'
  | 'amethyst'
  | 'pearl'
  | 'obsidian'
  | 'diamond';

export interface Competitor {
  id: string;
  name: string;
  avatar: string;
  flag: string;
  weeklyXp: number;
  isUser?: boolean;
  streak: number;
  status?: string;
}

export interface LeagueInfo {
  id: LeagueTier;
  name: string;
  icon: string;
  color: string;
  borderBg: string;
  minXpToPromote: number;
  promotionSeats: number;
  demotionSeats: number;
}

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  cost: number;
  type: 'powerup' | 'outfit' | 'refill';
  icon: string;
  category: 'boosts' | 'style' | 'health';
  unlocked?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  target: number;
  current: number;
  rewardGems: number;
  unlocked: boolean;
}

export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  target: number;
  progress: number;
  rewardGems: number;
  rewardXp: number;
  completed: boolean;
  claimed: boolean;
}
