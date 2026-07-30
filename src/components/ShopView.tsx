import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Gem, Zap, Check, Heart, Shield, Sparkles } from 'lucide-react';
import { ShopItem, UserState } from '../types';
import { SHOP_ITEMS } from '../data/shopData';
import { soundManager } from '../utils/audio';

interface ShopViewProps {
  userState: UserState;
  onBuyItem: (item: ShopItem) => void;
  onEquipOutfit: (outfitId: string) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  userState,
  onBuyItem,
  onEquipOutfit,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'boosts' | 'style' | 'health'>('all');

  const filteredItems = SHOP_ITEMS.filter((item) =>
    activeCategory === 'all' ? true : item.category === activeCategory
  );

  const handlePurchase = (item: ShopItem) => {
    if (userState.gems < item.cost) return;
    soundManager.playGemSparkle();
    onBuyItem(item);
  };

  return (
    <div className="max-w-2xl mx-auto py-6 px-4 pb-24 space-y-6">
      {/* Gem Store Header */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl p-6 text-white shadow-xl flex items-center justify-between">
        <div>
          <span className="text-xs font-black uppercase tracking-wider bg-black/20 px-3 py-1 rounded-full">
            Duo Gem Store
          </span>
          <h2 className="text-2xl font-black mt-2">Power-ups & Styling</h2>
          <p className="text-xs text-cyan-100 mt-1">
            Spend your hard-earned gems to boost learning & dress Duo!
          </p>
        </div>

        <div className="bg-white/20 backdrop-blur-md rounded-2xl px-4 py-2.5 flex items-center gap-2 border border-white/30">
          <Gem className="w-6 h-6 text-cyan-200 fill-cyan-200" />
          <span className="font-black text-xl">{userState.gems}</span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
        {(['all', 'boosts', 'style', 'health'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => {
              soundManager.playClick();
              setActiveCategory(cat);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-cyan-500 text-white shadow-md'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredItems.map((item) => {
          const isOwned = userState.inventory.includes(item.id);
          const isEquipped = userState.activeOutfit === item.id;
          const canAfford = userState.gems >= item.cost;

          return (
            <motion.div
              key={item.id}
              whileHover={{ y: -3 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-md flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-4xl p-2 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                    {item.icon}
                  </span>
                  {item.type === 'outfit' && isEquipped && (
                    <span className="text-[10px] font-black uppercase bg-emerald-500 text-white px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Check className="w-3 h-3" /> Equipped
                    </span>
                  )}
                </div>

                <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-base">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>

              {/* Action Button */}
              {item.type === 'outfit' && isOwned ? (
                <button
                  onClick={() => {
                    soundManager.playClick();
                    onEquipOutfit(item.id);
                  }}
                  className={`w-full py-2.5 font-black text-xs rounded-2xl cursor-pointer transition-all ${
                    isEquipped
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-default'
                      : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm'
                  }`}
                >
                  {isEquipped ? 'Currently Wearing' : 'Equip Outfit'}
                </button>
              ) : (
                <button
                  onClick={() => handlePurchase(item)}
                  disabled={!canAfford}
                  className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-40 text-white font-black text-xs rounded-2xl shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Gem className="w-4 h-4 fill-white" /> {item.cost} Gems
                </button>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
