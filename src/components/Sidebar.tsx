import React from 'react';
import { BookOpen, Trophy, Target, ShoppingBag, Sparkles, User } from 'lucide-react';

export type TabType = 'learn' | 'leaderboard' | 'quests' | 'shop' | 'chat' | 'profile';

interface SidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: 'learn', label: 'Learn', icon: BookOpen, color: 'text-emerald-500' },
    { id: 'leaderboard', label: 'Leagues', icon: Trophy, color: 'text-amber-500' },
    { id: 'quests', label: 'Quests', icon: Target, color: 'text-blue-500' },
    { id: 'shop', label: 'Shop', icon: ShoppingBag, color: 'text-pink-500' },
    { id: 'chat', label: 'Duo AI Chat', icon: Sparkles, color: 'text-purple-500' },
    { id: 'profile', label: 'Profile', icon: User, color: 'text-indigo-500' },
  ];

  return (
    <>
      {/* Desktop Left Navigation Bar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-2 shrink-0 min-h-screen">
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-3 py-4 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500 flex items-center justify-center text-white font-black text-xl shadow-md">
            🦉
          </div>
          <div>
            <h1 className="font-extrabold text-xl text-slate-900 dark:text-slate-100 tracking-tight leading-none">
              LingoPulse
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">
              Gamified Language Learning
            </p>
          </div>
        </div>

        {/* Navigation Options */}
        <nav className="space-y-1.5 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => onTabChange(item.id as TabType)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-extrabold text-sm transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400 border-2 border-emerald-500 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-500' : item.color}`} />
                <span>{item.label}</span>
                {item.id === 'chat' && (
                  <span className="ml-auto text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/60 dark:text-purple-300">
                    AI
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 flex items-center justify-around z-40 shadow-lg">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`mobile-nav-${item.id}`}
              onClick={() => onTabChange(item.id as TabType)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'text-emerald-600 dark:text-emerald-400 scale-105'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
              }`}
            >
              <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'text-emerald-500' : ''}`} />
              <span className="text-[10px]">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
