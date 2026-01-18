'use client';

import { useEffect, useCallback } from 'react';
import { useOlympusStore } from '@/store/useOlympusStore';
import type { Trade, Holder, TreasuryStats } from '@/types';

export function useOlympusData() {
  const {
    trades,
    topHolders,
    treasuryStats,
    setTopHolders,
    setTreasuryStats,
    addTrade,
    updateTrade,
    connectedWallet,
  } = useOlympusStore();

  // Fetch trades
  const fetchTrades = useCallback(async () => {
    try {
      const response = await fetch('/api/trades');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.success && data.trades && Array.isArray(data.trades)) {
        // Update store with new trades
        data.trades.forEach((trade: Trade) => {
          const exists = trades.find((t) => t.id === trade.id);
          if (!exists) {
            addTrade(trade);
          } else {
            updateTrade(trade.id, trade);
          }
        });
      }
    } catch (error) {
      console.error('Failed to fetch trades:', error);
      // Silently fail - don't break the UI
    }
  }, [trades, addTrade, updateTrade]);

  // Fetch holders
  const fetchHolders = useCallback(async () => {
    try {
      const url = connectedWallet
        ? `/api/holders?wallet=${connectedWallet}`
        : '/api/holders';
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.success && data.holders && Array.isArray(data.holders)) {
        setTopHolders(data.holders);
      }
    } catch (error) {
      console.error('Failed to fetch holders:', error);
      // Silently fail - don't break the UI
    }
  }, [connectedWallet, setTopHolders]);

  // Fetch treasury stats
  const fetchTreasuryStats = useCallback(async () => {
    try {
      const response = await fetch('/api/trades');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.success && data.stats) {
        const stats: TreasuryStats = {
          totalValue: (data.stats.totalPnl || 0) + 10, // Base treasury + profits
          totalTrades: data.stats.totalTrades || 0,
          winRate: data.stats.totalTrades > 0
            ? (data.stats.winningTrades / data.stats.totalTrades) * 100
            : 0,
          totalProfit: data.stats.totalPnl || 0,
          totalDistributed: (data.stats.totalPnl || 0) * 0.8, // 80% distributed
        };
        setTreasuryStats(stats);
      }
    } catch (error) {
      console.error('Failed to fetch treasury stats:', error);
      // Silently fail - don't break the UI
    }
  }, [setTreasuryStats]);

  // Initial fetch
  useEffect(() => {
    fetchTrades();
    fetchHolders();
    fetchTreasuryStats();
  }, [fetchTrades, fetchHolders, fetchTreasuryStats]);

  // Poll for updates every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchTrades();
      fetchHolders();
      fetchTreasuryStats();
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchTrades, fetchHolders, fetchTreasuryStats]);

  return {
    refreshTrades: fetchTrades,
    refreshHolders: fetchHolders,
    refreshStats: fetchTreasuryStats,
  };
}
