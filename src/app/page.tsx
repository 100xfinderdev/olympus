'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/ui/Header';
import { GodCard } from '@/components/gods/GodCard';
import { ThoughtsFeed } from '@/components/gods/ThoughtsFeed';
import { TreasuryStats } from '@/components/dashboard/TreasuryStats';
import { Leaderboard } from '@/components/dashboard/Leaderboard';
import { TradeHistory } from '@/components/dashboard/TradeHistory';
import { useOlympusStore } from '@/store/useOlympusStore';
import { useOlympusData } from '@/hooks/useOlympusData';
import { useAIAnalysis } from '@/hooks/useAIAnalysis';
import { motion } from 'framer-motion';

export default function Home() {
  const { activeGod, isThinking } = useOlympusStore();
  useOlympusData(); // Initialize data fetching
  const { triggerAnalysis } = useAIAnalysis();
  const [contractAddress, setContractAddress] = useState<string>('');

  useEffect(() => {
    // Get contract address from environment or API
    const address = process.env.NEXT_PUBLIC_TOKEN_ADDRESS || '';
    setContractAddress(address);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif text-gold mb-6"
          >
            <div className="god-name-smoke-wrapper inline-block">
              <span className="god-name-smoke">OLYMPUS</span>
            </div>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gold max-w-2xl mx-auto font-serif"
          >
            Three divine AI entities trade memecoins autonomously.
            <br />
            Top 10 holders receive profit distributions after every winning trade.
          </motion.p>

          {/* Token Address & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <div className="inline-flex items-center gap-2 bg-black/60 border border-gold/20 rounded-lg px-4 py-2">
              <span className="text-gold/50 text-sm">CA:</span>
              <code className="text-gold font-mono text-sm">
                {contractAddress || 'Set NEXT_PUBLIC_TOKEN_ADDRESS in .env.local'}
              </code>
              {contractAddress && (
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(contractAddress);
                  }}
                  className="ml-2 text-gold/50 hover:text-gold transition-colors cursor-pointer"
                  title="Copy address"
                >
                  📋
                </button>
              )}
            </div>
            <button
              onClick={triggerAnalysis}
              disabled={isThinking}
              className={`
                px-6 py-2 rounded-lg font-medium transition-all
                ${isThinking
                  ? 'bg-gold/30 text-gold/50 cursor-not-allowed'
                  : 'bg-gold text-black hover:bg-gold/90 hover:shadow-lg hover:shadow-gold/30'
                }
              `}
            >
              {isThinking ? 'Gods Thinking...' : '⚡ Trigger AI Analysis'}
            </button>
          </motion.div>
        </div>
      </section>

      {/* Gods Section */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-serif text-gold mb-8 text-center">
            <div className="god-name-smoke-wrapper inline-block">
              <span className="god-name-smoke">The Divine Council</span>
            </div>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GodCard
              godName="athena"
              isActive={activeGod === 'athena'}
              isThinking={isThinking && activeGod === 'athena'}
            />
            <GodCard
              godName="zeus"
              isActive={activeGod === 'zeus'}
              isThinking={isThinking && activeGod === 'zeus'}
            />
            <GodCard
              godName="hermes"
              isActive={activeGod === 'hermes'}
              isThinking={isThinking && activeGod === 'hermes'}
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <TreasuryStats />
        </div>
      </section>

      {/* Main Dashboard */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* AI Activity Feed - Takes 2 columns */}
          <div className="lg:col-span-2">
            <ThoughtsFeed />
          </div>

          {/* Leaderboard */}
          <div>
            <Leaderboard />
          </div>
        </div>
      </section>

      {/* Trade History */}
      <section className="py-8 px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <TradeHistory />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gold/20 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-6 mb-4">
            <a href="#" className="text-gold/50 hover:text-gold transition-colors">
              <div className="god-name-smoke-wrapper inline-block">
                <span className="god-name-smoke text-sm">Twitter</span>
              </div>
            </a>
            <a href="#" className="text-gold/50 hover:text-gold transition-colors">
              <div className="god-name-smoke-wrapper inline-block">
                <span className="god-name-smoke text-sm">Telegram</span>
              </div>
            </a>
            <a href="#" className="text-gold/50 hover:text-gold transition-colors">
              <div className="god-name-smoke-wrapper inline-block">
                <span className="god-name-smoke text-sm">Docs</span>
              </div>
            </a>
          </div>
          <p className="text-gold/30 text-sm">
            <div className="god-name-smoke-wrapper inline-block">
              <span className="god-name-smoke text-xs">OLYMPUS - Divine AI Trading on Solana</span>
            </div>
          </p>
          <p className="text-gold/20 text-xs mt-2">
            <div className="god-name-smoke-wrapper inline-block">
              <span className="god-name-smoke text-[10px]">Trading involves risk. Past performance does not guarantee future results.</span>
            </div>
          </p>
        </div>
      </footer>
    </div>
  );
}
