import React, { useState, useEffect } from 'react';
import { UserState, LanguageId, ShopItem, Competitor } from './types';
import { LANGUAGES } from './data/languages';
import { EXERCISES_BANK } from './data/exercisesData';
import { INITIAL_COMPETITORS } from './data/leaderboardData';
import { INITIAL_ACHIEVEMENTS, INITIAL_DAILY_QUESTS } from './data/achievementsData';
import { Navbar } from './components/Navbar';
import { Sidebar, TabType } from './components/Sidebar';
import { PathView } from './components/PathView';
import { LeaderboardView } from './components/LeaderboardView';
import { ShopView } from './components/ShopView';
import { QuestsAchievementsView } from './components/QuestsAchievementsView';
import { LanguageCoachView } from './components/LanguageCoachView';
import { ProfileView } from './components/ProfileView';
import { StreakModal } from './components/StreakModal';
import { RefillHeartsModal } from './components/RefillHeartsModal';
import { LessonEngine } from './components/LessonEngine';

const STORAGE_KEY = 'flor_app_user_state_v2';
const LEGACY_STORAGE_KEY = 'flor_app_user_state_v1';
const ENGLISH_DEFAULT_MIGRATION_KEY = 'flor_english_default_migrated_v1';

const DEFAULT_USER_STATE: UserState = {
  name: 'Language Learner',
  avatar: '🌍',
  currentLanguage: 'en',
  xp: 140,
  gems: 280,
  hearts: 5,
  maxHearts: 5,
  streak: 5,
  lastActiveDate: new Date().toISOString().split('T')[0],
  streakFreezeCount: 1,
  hasActiveFreeze: true,
  activeOutfit: 'default',
  doubleXpTimer: 0,
  completedNodes: { 'tr-1-1': 3 },
  dailyXpTarget: 30,
  dailyXpEarned: 20,
  claimedQuests: [],
  unlockedAchievements: [],
  inventory: ['outfit_default'],
  leagueId: 'bronze',
  leagueWeeklyXp: 140,
  weeklyStreakHistory: [
    { date: 'Mon', active: true },
    { date: 'Tue', active: true },
    { date: 'Wed', active: true },
    { date: 'Thu', active: true },
    { date: 'Fri', active: true },
    { date: 'Sat', active: false },
    { date: 'Sun', active: false },
  ],
};

export default function App() {
  const [userState, setUserState] = useState<UserState>(() => {
    try {
      const rawSaved = localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem(LEGACY_STORAGE_KEY);
      const shouldSetEnglishDefault = localStorage.getItem(ENGLISH_DEFAULT_MIGRATION_KEY) !== '1';
      if (rawSaved) {
        const parsed = JSON.parse(rawSaved) as Partial<UserState>;
        const validLanguageIds = new Set(LANGUAGES.map((language) => language.id));
        if (parsed && typeof parsed === 'object') {
          const selectedLanguage = typeof parsed.currentLanguage === 'string' ? parsed.currentLanguage : null;
          if (selectedLanguage && validLanguageIds.has(selectedLanguage as LanguageId)) {
            return {
              ...DEFAULT_USER_STATE,
              ...parsed,
              currentLanguage: shouldSetEnglishDefault ? 'en' : selectedLanguage as LanguageId,
            };
          }
        }
      }
    } catch {
      // fallback
    }
    return DEFAULT_USER_STATE;
  });

  const [activeTab, setActiveTab] = useState<TabType>('learn');
  const [showStreakModal, setShowStreakModal] = useState(false);
  const [showHeartsModal, setShowHeartsModal] = useState(false);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  const [competitors, setCompetitors] = useState<Competitor[]>(INITIAL_COMPETITORS);
  const [quests, setQuests] = useState(INITIAL_DAILY_QUESTS);
  const [achievements, setAchievements] = useState(INITIAL_ACHIEVEMENTS);

  // Save userState to localStorage whenever modified
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userState));
      localStorage.setItem(ENGLISH_DEFAULT_MIGRATION_KEY, '1');
    } catch {
      // ignore
    }
  }, [userState]);

  useEffect(() => {
    document.title = '';
  }, []);

  // Language Change
  const handleSelectLanguage = (id: LanguageId) => {
    setUserState((prev) => ({ ...prev, currentLanguage: id }));
  };

  // Node Clicked on Skill Path
  const handleSelectNode = (nodeId: string) => {
    if (userState.hearts <= 0) {
      setShowHeartsModal(true);
      return;
    }
    setActiveLessonId(nodeId);
  };

  // Lesson Finished
  const handleCompleteLesson = ({
    xpEarned,
    gemsEarned,
    accuracy,
  }: {
    xpEarned: number;
    gemsEarned: number;
    accuracy: number;
  }) => {
    setUserState((prev) => {
      const newXp = prev.xp + xpEarned;
      const newGems = prev.gems + gemsEarned;
      const newDailyXp = prev.dailyXpEarned + xpEarned;

      const updatedNodes = { ...prev.completedNodes };
      if (activeLessonId) {
        updatedNodes[activeLessonId] = 3;
      }

      return {
        ...prev,
        xp: newXp,
        gems: newGems,
        dailyXpEarned: newDailyXp,
        completedNodes: updatedNodes,
        leagueWeeklyXp: prev.leagueWeeklyXp + xpEarned,
      };
    });

    // Update Quests progress
    setQuests((prevQuests) =>
      prevQuests.map((q) => {
        if (q.id === 'q_xp') return { ...q, progress: Math.min(q.target, q.progress + xpEarned) };
        if (q.id === 'q_lessons') return { ...q, progress: Math.min(q.target, q.progress + 1) };
        if (q.id === 'q_perfect' && accuracy >= 100) return { ...q, progress: Math.min(q.target, q.progress + 5) };
        return q;
      })
    );

    setActiveLessonId(null);
  };

  // Heart Lost
  const handleLoseHeart = () => {
    setUserState((prev) => ({
      ...prev,
      hearts: Math.max(0, prev.hearts - 1),
    }));
  };

  // Refill Hearts
  const handleRefillWithGems = () => {
    if (userState.gems < 100) return;
    setUserState((prev) => ({
      ...prev,
      gems: prev.gems - 100,
      hearts: prev.maxHearts,
    }));
    setShowHeartsModal(false);
  };

  // Buy Shop Items
  const handleBuyShopItem = (item: ShopItem) => {
    if (userState.gems < item.cost) return;

    setUserState((prev) => {
      const updatedInventory = [...prev.inventory, item.id];
      let newHearts = prev.hearts;
      let newFreeze = prev.streakFreezeCount;

      if (item.type === 'refill') {
        newHearts = prev.maxHearts;
      }
      if (item.id === 'streak_freeze') {
        newFreeze = prev.streakFreezeCount + 1;
      }

      return {
        ...prev,
        gems: prev.gems - item.cost,
        inventory: updatedInventory,
        hearts: newHearts,
        streakFreezeCount: newFreeze,
        hasActiveFreeze: newFreeze > 0,
      };
    });
  };

  // Equip Outfit
  const handleEquipOutfit = (outfitId: string) => {
    setUserState((prev) => ({
      ...prev,
      activeOutfit: outfitId,
    }));
  };

  // Claim Chest Node
  const handleClaimChest = (nodeId: string, gemReward: number) => {
    setUserState((prev) => ({
      ...prev,
      gems: prev.gems + gemReward,
      completedNodes: { ...prev.completedNodes, [nodeId]: 3 },
    }));
  };

  // Claim Quest Reward
  const handleClaimQuest = (questId: string) => {
    const q = quests.find((item) => item.id === questId);
    if (!q) return;

    setUserState((prev) => ({
      ...prev,
      gems: prev.gems + q.rewardGems,
      xp: prev.xp + q.rewardXp,
      claimedQuests: [...prev.claimedQuests, questId],
    }));
  };

  // Claim Achievement Reward
  const handleClaimAchievement = (achievementId: string) => {
    const ach = achievements.find((item) => item.id === achievementId);
    if (!ach) return;

    setUserState((prev) => ({
      ...prev,
      gems: prev.gems + ach.rewardGems,
      unlockedAchievements: [...prev.unlockedAchievements, achievementId],
    }));
  };

  // Simulate Competitors XP Activity
  const handleSimulateOpponents = () => {
    setCompetitors((prev) =>
      prev.map((c) => ({
        ...c,
        weeklyXp: c.weeklyXp + Math.floor(Math.random() * 25 + 10),
      }))
    );
  };

  // AI Chat Earn XP
  const handleEarnXpFromChat = (amount: number) => {
    setUserState((prev) => ({
      ...prev,
      xp: prev.xp + amount,
      dailyXpEarned: prev.dailyXpEarned + amount,
      leagueWeeklyXp: prev.leagueWeeklyXp + amount,
    }));
  };

  const currentLanguageObj = LANGUAGES.find((l) => l.id === userState.currentLanguage) || LANGUAGES[0];
  const activeExercises = EXERCISES_BANK[activeLessonId || 'en-1-1'] || EXERCISES_BANK['en-1-1'];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col md:flex-row antialiased font-sans">
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Navbar */}
        <Navbar
          userState={userState}
          onSelectLanguage={handleSelectLanguage}
          onOpenStreakModal={() => setShowStreakModal(true)}
          onOpenShop={() => setActiveTab('shop')}
          onOpenRefillHearts={() => setShowHeartsModal(true)}
        />

        {/* Tab Views */}
        <main className="flex-1 overflow-y-auto">
          {activeTab === 'learn' && (
            <PathView
              language={currentLanguageObj}
              userState={userState}
              onSelectNode={handleSelectNode}
              onClaimChest={handleClaimChest}
              onStartPractice={() => handleSelectNode(`${userState.currentLanguage}-1-1`)}
            />
          )}

          {activeTab === 'leaderboard' && (
            <LeaderboardView
              userState={userState}
              competitors={competitors}
              onSimulateOpponents={handleSimulateOpponents}
            />
          )}

          {activeTab === 'quests' && (
            <QuestsAchievementsView
              userState={userState}
              quests={quests}
              achievements={achievements}
              onClaimQuest={handleClaimQuest}
              onClaimAchievement={handleClaimAchievement}
            />
          )}

          {activeTab === 'shop' && (
            <ShopView
              userState={userState}
              onBuyItem={handleBuyShopItem}
              onEquipOutfit={handleEquipOutfit}
            />
          )}

          {activeTab === 'chat' && (
            <LanguageCoachView userState={userState} onEarnXp={handleEarnXpFromChat} />
          )}

          {activeTab === 'profile' && (
            <ProfileView userState={userState} onOpenShop={() => setActiveTab('shop')} />
          )}
        </main>
      </div>

      {/* Modals */}
      {showStreakModal && (
        <StreakModal
          userState={userState}
          onClose={() => setShowStreakModal(false)}
          onBuyStreakFreeze={() => {
            const freezeItem = {
              id: 'streak_freeze',
              name: 'Streak Freeze',
              description: 'Protects streak',
              cost: 200,
              type: 'powerup' as const,
              icon: '🧊',
              category: 'boosts' as const,
            };
            handleBuyShopItem(freezeItem);
          }}
        />
      )}

      {showHeartsModal && (
        <RefillHeartsModal
          currentHearts={userState.hearts}
          maxHearts={userState.maxHearts}
          gems={userState.gems}
          onClose={() => setShowHeartsModal(false)}
          onRefillWithGems={handleRefillWithGems}
          onStartPractice={() => {
            setShowHeartsModal(false);
            handleSelectNode(`${userState.currentLanguage}-1-1`);
          }}
        />
      )}

      {/* Active Lesson Modal Screen */}
      {activeLessonId && (
        <LessonEngine
          lessonTitle="Language Lesson"
          exercises={activeExercises}
          userState={userState}
          languageId={userState.currentLanguage}
          onCompleteLesson={handleCompleteLesson}
          onLoseHeart={handleLoseHeart}
          onQuit={() => setActiveLessonId(null)}
        />
      )}
    </div>
  );
}
