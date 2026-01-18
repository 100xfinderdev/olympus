'use client';

import { motion } from 'framer-motion';
import { useOlympusStore } from '@/store/useOlympusStore';

export function TreasuryStats() {
  const { treasuryStats } = useOlympusStore();

  // Demo stats if no real data
  const stats = treasuryStats.totalValue > 0 ? treasuryStats : {
    totalValue: 25.5,
    totalTrades: 47,
    winRate: 68,
    totalProfit: 15.3,
    totalDistributed: 12.8,
  };

  const statCards = [
    {
      label: 'Treasury Value',
      value: `${stats.totalValue.toFixed(2)} SOL`,
      text: 'TV',
      color: 'text-gold',
    },
    {
      label: 'Total Trades',
      value: stats.totalTrades.toString(),
      text: 'TT',
      color: 'text-gold',
    },
    {
      label: 'Win Rate',
      value: `${stats.winRate}%`,
      text: 'WR',
      color: 'text-gold',
    },
    {
      label: 'Total Profit',
      value: `${stats.totalProfit >= 0 ? '+' : ''}${stats.totalProfit.toFixed(2)} SOL`,
      text: 'TP',
      color: 'text-gold',
    },
    {
      label: 'Distributed',
      value: `${stats.totalDistributed.toFixed(2)} SOL`,
      text: 'DT',
      color: 'text-gold',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-black/40 rounded-xl border border-gold/20 p-4 text-center"
        >
          <div className="mb-2">
            <div className="god-name-smoke-wrapper">
              <span className="text-gold font-serif font-bold text-lg god-name-smoke">{stat.text}</span>
            </div>
          </div>
          <div className="god-name-smoke-wrapper">
            <div className={`text-xl font-bold font-serif ${stat.color} god-name-smoke`}>{stat.value}</div>
          </div>
          <div className="text-gold/50 text-xs mt-1 font-serif">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
