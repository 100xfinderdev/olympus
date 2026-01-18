import { create } from 'zustand';
import type { Trade, Holder, AIThought, TreasuryStats, Position } from '@/types';

interface OlympusState {
  // AI Activity
  thoughts: AIThought[];
  isThinking: boolean;
  activeGod: 'zeus' | 'athena' | 'hermes' | null;

  // Trading
  trades: Trade[];
  positions: Position[];
  treasuryStats: TreasuryStats;

  // Holders
  topHolders: Holder[];
  connectedWallet: string | null;
  userRank: number | null;

  // Actions
  addThought: (thought: AIThought) => void;
  setActiveGod: (god: 'zeus' | 'athena' | 'hermes' | null) => void;
  setIsThinking: (thinking: boolean) => void;
  addTrade: (trade: Trade) => void;
  updateTrade: (id: string, updates: Partial<Trade>) => void;
  setTopHolders: (holders: Holder[]) => void;
  setConnectedWallet: (wallet: string | null) => void;
  setTreasuryStats: (stats: TreasuryStats) => void;
  setPositions: (positions: Position[]) => void;
}

export const useOlympusStore = create<OlympusState>((set) => ({
  // Initial state
  thoughts: [],
  isThinking: false,
  activeGod: null,
  trades: [],
  positions: [],
  treasuryStats: {
    totalValue: 0,
    totalTrades: 0,
    winRate: 0,
    totalProfit: 0,
    totalDistributed: 0,
  },
  topHolders: [],
  connectedWallet: null,
  userRank: null,

  // Actions
  addThought: (thought) =>
    set((state) => ({
      thoughts: [thought, ...state.thoughts].slice(0, 100), // Keep last 100 thoughts
    })),

  setActiveGod: (god) => set({ activeGod: god }),

  setIsThinking: (thinking) => set({ isThinking: thinking }),

  addTrade: (trade) =>
    set((state) => ({
      trades: [trade, ...state.trades],
    })),

  updateTrade: (id, updates) =>
    set((state) => ({
      trades: state.trades.map((t) =>
        t.id === id ? { ...t, ...updates } : t
      ),
    })),

  setTopHolders: (holders) => set({ topHolders: holders }),

  setConnectedWallet: (wallet) => set({ connectedWallet: wallet }),

  setTreasuryStats: (stats) => set({ treasuryStats: stats }),

  setPositions: (positions) => set({ positions }),
}));
