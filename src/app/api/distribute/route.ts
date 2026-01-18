import { NextRequest, NextResponse } from 'next/server';
import type { Distribution } from '@/types';

// Distribution weights for top 10 holders (total = 100%)
const DISTRIBUTION_WEIGHTS = [
  25, // Rank 1: 25%
  18, // Rank 2: 18%
  14, // Rank 3: 14%
  11, // Rank 4: 11%
  9,  // Rank 5: 9%
  7,  // Rank 6: 7%
  6,  // Rank 7: 6%
  5,  // Rank 8: 5%
  3,  // Rank 9: 3%
  2,  // Rank 10: 2%
];

// Mock top 10 holder addresses
const TOP_HOLDERS = [
  '7xKXgF8j2mNQpR9sT4vW5yZ6aB7cD8eF9gH0iJ1kL2m3',
  '3mNPqR4sT5uV6wX7yZ8aB9cD0eF1gH2iJ3kL4mN5oP6q',
  '9pQRsT0uV1wX2yZ3aB4cD5eF6gH7iJ8kL9mN0oP1qR2s',
  '2hJKlM3nO4pQ5rS6tU7vW8xY9zA0bC1dE2fG3hI4jK5l',
  '5tYUvW6xX7yY8zZ9aA0bB1cC2dD3eE4fF5gG6hH7iI8j',
  '8wXCyD9eE0fF1gG2hH3iI4jJ5kK6lL7mM8nN9oO0pP1q',
  '1zVBnC2dD3eE4fF5gG6hH7iI8jJ9kK0lL1mM2nN3oO4p',
  '4nMLkJ5iI6hH7gG8fF9eE0dD1cC2bB3aA4zZ5yY6xX7w',
  '6kOPlM7nN8oO9pP0qQ1rR2sS3tT4uU5vV6wW7xX8yY9z',
  '0jHGfE1dD2cC3bB4aA5zZ6yY7xX8wW9vV0uU1tT2sS3r',
];

// In-memory distributions store
let distributions: Distribution[] = [];

export async function GET() {
  return NextResponse.json({
    success: true,
    distributions,
    totalDistributed: distributions.reduce((sum, d) => sum + d.totalProfit, 0),
    distributionWeights: DISTRIBUTION_WEIGHTS,
  });
}

export async function POST(request: NextRequest) {
  try {
    const { tradeId, profit } = await request.json();

    if (!profit || profit <= 0) {
      return NextResponse.json(
        { success: false, error: 'No profit to distribute' },
        { status: 400 }
      );
    }

    // Calculate distribution amounts
    const recipients = TOP_HOLDERS.map((address, index) => ({
      address,
      rank: index + 1,
      amount: (profit * DISTRIBUTION_WEIGHTS[index]) / 100,
    }));

    const distribution: Distribution = {
      id: `dist-${Date.now()}`,
      tradeId: tradeId || 'manual',
      totalProfit: profit,
      recipients,
      timestamp: new Date(),
      // txSignature will be added after actual blockchain transaction
    };

    // In production, this would:
    // 1. Create a multi-send transaction
    // 2. Send SOL to each recipient
    // 3. Record the transaction signature

    distributions.unshift(distribution);

    return NextResponse.json({
      success: true,
      distribution,
      message: `Distributed ${profit} SOL to top 10 holders`,
    });
  } catch (error) {
    console.error('Distribution error:', error);
    return NextResponse.json(
      { success: false, error: 'Distribution failed' },
      { status: 500 }
    );
  }
}
