'use client';

import { motion } from 'framer-motion';
import { useOlympusStore } from '@/store/useOlympusStore';

export function Leaderboard() {
  const { topHolders, connectedWallet } = useOlympusStore();

  const getRankEmoji = (rank: number) => {
    switch (rank) {
      case 1: return '👑';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const formatSol = (amount: number) => {
    return amount.toFixed(4);
  };

  // Demo data for display
  const displayHolders = topHolders.length > 0 ? topHolders : [
    { address: '7xKX...9Fj2', rank: 1, balance: 50000000, totalEarnings: 12.5 },
    { address: '3mNP...kL8s', rank: 2, balance: 35000000, totalEarnings: 8.75 },
    { address: '9pQR...vW4x', rank: 3, balance: 28000000, totalEarnings: 7.0 },
    { address: '2hJK...mN6y', rank: 4, balance: 22000000, totalEarnings: 5.5 },
    { address: '5tYU...pO3z', rank: 5, balance: 18000000, totalEarnings: 4.5 },
    { address: '8wXC...qR7a', rank: 6, balance: 15000000, totalEarnings: 3.75 },
    { address: '1zVB...sT5b', rank: 7, balance: 12000000, totalEarnings: 3.0 },
    { address: '4nML...uI2c', rank: 8, balance: 10000000, totalEarnings: 2.5 },
    { address: '6kOP...wE9d', rank: 9, balance: 8000000, totalEarnings: 2.0 },
    { address: '0jHG...xD1e', rank: 10, balance: 6000000, totalEarnings: 1.5 },
  ];

  return (
    <div className="bg-black/40 rounded-2xl border border-gold/20 p-6">
      <h2 className="text-xl font-serif text-gold mb-4">
        <div className="god-name-smoke-wrapper inline-block">
          <span className="god-name-smoke">Top 10 Holders</span>
        </div>
      </h2>
      <p className="text-gold/50 text-sm mb-6">
        <div className="god-name-smoke-wrapper inline-block">
          <span className="god-name-smoke text-xs">Profit distribution recipients</span>
        </div>
      </p>

      <div className="space-y-2">
        {displayHolders.map((holder, index) => {
          const isConnected = holder.address === connectedWallet;

          return (
            <motion.div
              key={holder.address}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`
                flex items-center justify-between p-3 rounded-lg
                ${isConnected
                  ? 'bg-gold/20 border border-gold/40'
                  : 'bg-black/40 border border-gold/10 hover:border-gold/20'
                }
                transition-colors
              `}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg w-8">{getRankEmoji(holder.rank)}</span>
                <span className={`font-mono text-sm ${isConnected ? 'text-gold' : 'text-gray-400'}`}>
                  <div className="god-name-smoke-wrapper inline-block">
                    <span className="god-name-smoke text-xs">
                      {typeof holder.address === 'string' && holder.address.includes('...')
                        ? holder.address
                        : formatAddress(holder.address)}
                      {isConnected && <span className="ml-2">(You)</span>}
                    </span>
                  </div>
                </span>
              </div>

              <div className="text-right">
                <div className="text-gold font-medium">
                  <div className="god-name-smoke-wrapper inline-block">
                    <span className="god-name-smoke text-xs">+{formatSol(holder.totalEarnings)} SOL</span>
                  </div>
                </div>
                <div className="text-gold/40 text-xs">
                  <div className="god-name-smoke-wrapper inline-block">
                    <span className="god-name-smoke text-[10px]">{(holder.balance / 1000000).toFixed(1)}M tokens</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
