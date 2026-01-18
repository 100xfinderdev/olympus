'use client';

import { useCallback } from 'react';
import { useOlympusStore } from '@/store/useOlympusStore';
import type { AIThought } from '@/types';
import type { TradeDecision } from '@/lib/aiAgents';

export function useAIAnalysis() {
  const {
    addThought,
    setActiveGod,
    setIsThinking,
    addTrade,
    treasuryStats,
  } = useOlympusStore();

  const triggerAnalysis = useCallback(async () => {
    setIsThinking(true);
    setActiveGod('athena');

    try {
      const response = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          treasuryBalance: treasuryStats.totalValue || 10,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Add all thoughts to the feed
        if (data.thoughts && Array.isArray(data.thoughts)) {
          data.thoughts.forEach((thought: AIThought) => {
            addThought(thought);
            
            // Update active god based on thought
            if (thought.godName === 'athena') {
              setActiveGod('athena');
            } else if (thought.godName === 'zeus') {
              setActiveGod('zeus');
            } else if (thought.godName === 'hermes') {
              setActiveGod('hermes');
            }
          });
        }

        // If a decision was made and executed, create a trade
        if (data.decision && data.token) {
          const trade = {
            id: `trade-${Date.now()}`,
            tokenAddress: data.token.address || 'unknown',
            tokenSymbol: data.token.symbol || 'UNKNOWN',
            tokenName: data.token.name || 'Unknown Token',
            action: (data.decision.action || 'buy') as 'buy' | 'sell',
            amount: 0, // Will be calculated from position size
            price: data.decision.entryPrice || data.token.price || 0,
            solAmount: (treasuryStats.totalValue || 10) * (data.decision.positionSizePercent || 5) / 100,
            timestamp: new Date(),
            status: 'pending' as const,
            aiReasoning: data.thoughts || [],
          };
          addTrade(trade);
        }
      } else {
        throw new Error(data.error || 'Analysis failed');
      }
    } catch (error) {
      console.error('AI analysis failed:', error);
      addThought({
        id: `error-${Date.now()}`,
        godName: 'athena',
        content: 'The gods encountered an error. Please try again.',
        timestamp: new Date(),
        type: 'observation',
      });
    } finally {
      setIsThinking(false);
      setActiveGod(null);
    }
  }, [addThought, setActiveGod, setIsThinking, addTrade, treasuryStats]);

  return { triggerAnalysis };
}
