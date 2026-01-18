'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useOlympusStore } from '@/store/useOlympusStore';
import { GODS } from '@/lib/gods';
import { GodAvatar } from './GodAvatar';
import type { AIThought } from '@/types';

function ThoughtBubble({ thought }: { thought: AIThought }) {
  const god = GODS[thought.godName];

  const typeColors = {
    analysis: 'border-l-blue-500',
    decision: 'border-l-gold',
    execution: 'border-l-green-500',
    observation: 'border-l-purple-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={`
        p-4 bg-black/60 rounded-lg border border-gold/10
        border-l-4 ${typeColors[thought.type]}
      `}
    >
      <div className="flex items-center gap-2 mb-2">
        <GodAvatar godName={thought.godName} size="sm" />
        <div className="god-name-smoke-wrapper">
          <span className="text-gold font-serif god-name-smoke">{god.displayName}</span>
        </div>
        <span className="text-gold/40 text-xs ml-auto">
          {new Date(thought.timestamp).toLocaleTimeString()}
        </span>
      </div>
      <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
        <div className="god-name-smoke-wrapper inline-block">
          <span className="god-name-smoke text-xs">{thought.content}</span>
        </div>
      </p>
    </motion.div>
  );
}

export function ThoughtsFeed() {
  const { thoughts, isThinking } = useOlympusStore();

  return (
    <div className="bg-black/40 rounded-2xl border border-gold/20 p-6 h-[500px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-serif text-gold">Divine Thoughts</h2>
        {isThinking && (
          <motion.div
            className="flex items-center gap-2 text-gold/60 text-sm"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <div className="w-2 h-2 bg-gold rounded-full animate-ping" />
            Gods are thinking...
          </motion.div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-gold/20">
        <AnimatePresence mode="popLayout">
          {thoughts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gold/40 py-20"
            >
              <p className="text-4xl mb-4">🏛️</p>
              <p>The gods are observing the markets...</p>
              <p className="text-sm mt-2">Activity will appear here</p>
            </motion.div>
          ) : (
            thoughts.map((thought) => (
              <ThoughtBubble key={thought.id} thought={thought} />
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
