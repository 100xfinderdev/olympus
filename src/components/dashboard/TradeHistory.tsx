'use client';

import { motion } from 'framer-motion';
import { useOlympusStore } from '@/store/useOlympusStore';
import type { Trade } from '@/types';

function TradeRow({ trade }: { trade: Trade }) {
  const isProfit = (trade.pnl ?? 0) >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-gold/10 hover:border-gold/20 transition-colors"
    >
      <div className="flex items-center gap-4">
        <div className={`
          px-2 py-1 rounded text-xs font-bold
          ${trade.action === 'buy' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}
        `}>
          {trade.action.toUpperCase()}
        </div>

        <div>
          <div className="text-gold font-medium">
            <div className="god-name-smoke-wrapper inline-block">
              <span className="god-name-smoke text-xs">{trade.tokenSymbol}</span>
            </div>
          </div>
          <div className="text-gold/40 text-xs">
            <div className="god-name-smoke-wrapper inline-block">
              <span className="god-name-smoke text-[10px]">{trade.tokenName}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-right">
        <div className="text-gray-300">
          <div className="god-name-smoke-wrapper inline-block">
            <span className="god-name-smoke text-xs">{trade.solAmount.toFixed(4)} SOL</span>
          </div>
        </div>
        {trade.pnl !== undefined && (
          <div className={`text-xs ${isProfit ? 'text-green-400' : 'text-red-400'}`}>
            <div className="god-name-smoke-wrapper inline-block">
              <span className="god-name-smoke text-[10px]">
                {isProfit ? '+' : ''}{trade.pnl.toFixed(4)} SOL ({trade.pnlPercent?.toFixed(1)}%)
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="text-gold/40 text-xs">
        {new Date(trade.timestamp).toLocaleString()}
      </div>
    </motion.div>
  );
}

export function TradeHistory() {
  const { trades } = useOlympusStore();

  // Demo trades for display
  const displayTrades: Trade[] = trades.length > 0 ? trades : [
    {
      id: '1',
      tokenAddress: 'pump123...',
      tokenSymbol: '$PEPE2',
      tokenName: 'Pepe 2.0',
      action: 'buy',
      amount: 1000000,
      price: 0.0000001,
      solAmount: 0.5,
      timestamp: new Date(Date.now() - 3600000),
      status: 'executed',
      pnl: 0.15,
      pnlPercent: 30,
      aiReasoning: [],
    },
    {
      id: '2',
      tokenAddress: 'pump456...',
      tokenSymbol: '$DOGE3',
      tokenName: 'Doge 3.0',
      action: 'sell',
      amount: 500000,
      price: 0.0000002,
      solAmount: 0.8,
      timestamp: new Date(Date.now() - 7200000),
      status: 'executed',
      pnl: 0.25,
      pnlPercent: 45,
      aiReasoning: [],
    },
    {
      id: '3',
      tokenAddress: 'pump789...',
      tokenSymbol: '$WOJAK',
      tokenName: 'Wojak Finance',
      action: 'buy',
      amount: 2000000,
      price: 0.00000005,
      solAmount: 0.3,
      timestamp: new Date(Date.now() - 10800000),
      status: 'executed',
      pnl: -0.05,
      pnlPercent: -16.7,
      aiReasoning: [],
    },
  ];

  return (
    <div className="bg-black/40 rounded-2xl border border-gold/20 p-6">
      <h2 className="text-xl font-serif text-gold mb-4">
        <div className="god-name-smoke-wrapper inline-block">
          <span className="god-name-smoke">Trade History</span>
        </div>
      </h2>

      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {displayTrades.length === 0 ? (
          <div className="text-center text-gold/40 py-10">
            <p className="text-3xl mb-2">📭</p>
            <p>No trades yet</p>
          </div>
        ) : (
          displayTrades.map((trade) => (
            <TradeRow key={trade.id} trade={trade} />
          ))
        )}
      </div>
    </div>
  );
}
