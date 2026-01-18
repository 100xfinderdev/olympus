'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useEffect } from 'react';
import { useOlympusStore } from '@/store/useOlympusStore';

export function Header() {
  const { publicKey, connected } = useWallet();
  const { setConnectedWallet } = useOlympusStore();

  useEffect(() => {
    setConnectedWallet(connected && publicKey ? publicKey.toBase58() : null);
  }, [connected, publicKey, setConnectedWallet]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-2xl font-serif text-gold tracking-wider">
              <div className="god-name-smoke-wrapper inline-block">
                <span className="god-name-smoke">OLYMPUS</span>
              </div>
            </h1>
          </div>
        </div>

        {/* Token Info */}
        <div className="hidden md:flex items-center gap-6">
          <div className="text-center">
            <div className="text-gold/50 text-xs">$OLYMP Price</div>
            <div className="text-gold font-medium">$0.00042</div>
          </div>
          <div className="text-center">
            <div className="text-gold/50 text-xs">Market Cap</div>
            <div className="text-gold font-medium">$420K</div>
          </div>
          <div className="text-center">
            <div className="text-gold/50 text-xs">Holders</div>
            <div className="text-gold font-medium">1,247</div>
          </div>
        </div>

        {/* Wallet */}
        <div className="wallet-button-wrapper">
          <WalletMultiButton />
        </div>
      </div>
    </header>
  );
}
