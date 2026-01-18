import { NextRequest, NextResponse } from 'next/server';
import type { Trade } from '@/types';

// In-memory store for demo (use database in production)
let trades: Trade[] = [
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
    tokenSymbol: '$WOJAK',
    tokenName: 'Wojak Finance',
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
];

export async function GET() {
  return NextResponse.json({
    success: true,
    trades,
    stats: {
      totalTrades: trades.length,
      winningTrades: trades.filter(t => (t.pnl ?? 0) > 0).length,
      totalPnl: trades.reduce((sum, t) => sum + (t.pnl ?? 0), 0),
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const trade: Trade = await request.json();

    // Validate trade data
    if (!trade.tokenSymbol || !trade.action || !trade.solAmount) {
      return NextResponse.json(
        { success: false, error: 'Invalid trade data' },
        { status: 400 }
      );
    }

    // Add trade to store
    const newTrade: Trade = {
      ...trade,
      id: `trade-${Date.now()}`,
      timestamp: new Date(),
      status: 'pending',
    };

    trades.unshift(newTrade);

    // In production, this would:
    // 1. Execute the actual swap via Jupiter/Raydium
    // 2. Update the trade status
    // 3. Trigger distribution if profitable

    return NextResponse.json({
      success: true,
      trade: newTrade,
    });
  } catch (error) {
    console.error('Trade creation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create trade' },
      { status: 500 }
    );
  }
}
