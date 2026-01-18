// Core Types for OLYMPUS

export type GodName = 'zeus' | 'athena' | 'hermes';

export interface God {
  name: GodName;
  displayName: string;
  role: string;
  description: string;
  avatar: string;
  color: string;
}

export interface AIThought {
  id: string;
  godName: GodName;
  content: string;
  timestamp: Date;
  type: 'analysis' | 'decision' | 'execution' | 'observation';
}

export interface Trade {
  id: string;
  tokenAddress: string;
  tokenSymbol: string;
  tokenName: string;
  action: 'buy' | 'sell';
  amount: number;
  price: number;
  solAmount: number;
  timestamp: Date;
  status: 'pending' | 'executed' | 'failed';
  pnl?: number;
  pnlPercent?: number;
  aiReasoning: AIThought[];
}

export interface Holder {
  address: string;
  balance: number;
  rank: number;
  totalEarnings: number;
  lastDistribution?: Date;
}

export interface Distribution {
  id: string;
  tradeId: string;
  totalProfit: number;
  recipients: {
    address: string;
    amount: number;
    rank: number;
  }[];
  timestamp: Date;
  txSignature?: string;
}

export interface TreasuryStats {
  totalValue: number;
  totalTrades: number;
  winRate: number;
  totalProfit: number;
  totalDistributed: number;
}

export interface Position {
  tokenAddress: string;
  tokenSymbol: string;
  tokenName: string;
  amount: number;
  avgBuyPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
}
