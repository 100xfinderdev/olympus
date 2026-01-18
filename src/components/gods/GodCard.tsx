'use client';

import { motion } from 'framer-motion';
import { GODS } from '@/lib/gods';
import { GodAvatar } from './GodAvatar';
import type { GodName } from '@/types';

interface GodCardProps {
  godName: GodName;
  isActive?: boolean;
  isThinking?: boolean;
}

export function GodCard({ godName, isActive, isThinking }: GodCardProps) {
  const god = GODS[godName];

  return (
    <motion.div
      className={`
        relative p-6 rounded-2xl border backdrop-blur-sm
        transition-all duration-500
        ${isActive
          ? 'border-gold bg-gold/10 shadow-lg shadow-gold/20'
          : 'border-gold/20 bg-black/40 hover:border-gold/40'
        }
      `}
      animate={isThinking ? { scale: [1, 1.02, 1] } : {}}
      transition={{ repeat: Infinity, duration: 2 }}
    >
      {/* Glow effect when active */}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gold/5"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      )}

      <div className="relative z-10">
        {/* Avatar with Name */}
        <div className="mb-4 flex flex-col items-center">
          <div className="relative">
            <GodAvatar godName={godName} size="lg" />
            {isActive && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-gold animate-pulse"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            )}
          </div>
          <div className="god-name-smoke-wrapper">
            <h3 className="text-xl font-serif text-gold text-center mt-4 god-name-smoke">
              {god.displayName}
            </h3>
          </div>
          <p className="text-gold/60 text-sm text-center mt-1">{god.role}</p>
        </div>

        {/* Status indicator */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              isActive ? 'bg-green-500 animate-pulse' : 'bg-gold/30'
            }`}
          />
          <span className="text-xs text-gold/50">
            {isThinking ? 'Thinking...' : isActive ? 'Active' : 'Standby'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
