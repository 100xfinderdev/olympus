import { NextRequest, NextResponse } from 'next/server';
import { Connection, PublicKey } from '@solana/web3.js';

// In production, replace with actual token mint address
const TOKEN_MINT = process.env.TOKEN_MINT_ADDRESS || '';
const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || 'https://api.mainnet-beta.solana.com';

interface Holder {
  address: string;
  balance: number;
  rank: number;
  totalEarnings: number;
}

// Mock data for development
const MOCK_HOLDERS: Holder[] = [
  { address: '7xKXgF8j2mNQpR9sT4vW5yZ6aB7cD8eF9gH0iJ1kL2m3', rank: 1, balance: 50000000, totalEarnings: 12.5 },
  { address: '3mNPqR4sT5uV6wX7yZ8aB9cD0eF1gH2iJ3kL4mN5oP6q', rank: 2, balance: 35000000, totalEarnings: 8.75 },
  { address: '9pQRsT0uV1wX2yZ3aB4cD5eF6gH7iJ8kL9mN0oP1qR2s', rank: 3, balance: 28000000, totalEarnings: 7.0 },
  { address: '2hJKlM3nO4pQ5rS6tU7vW8xY9zA0bC1dE2fG3hI4jK5l', rank: 4, balance: 22000000, totalEarnings: 5.5 },
  { address: '5tYUvW6xX7yY8zZ9aA0bB1cC2dD3eE4fF5gG6hH7iI8j', rank: 5, balance: 18000000, totalEarnings: 4.5 },
  { address: '8wXCyD9eE0fF1gG2hH3iI4jJ5kK6lL7mM8nN9oO0pP1q', rank: 6, balance: 15000000, totalEarnings: 3.75 },
  { address: '1zVBnC2dD3eE4fF5gG6hH7iI8jJ9kK0lL1mM2nN3oO4p', rank: 7, balance: 12000000, totalEarnings: 3.0 },
  { address: '4nMLkJ5iI6hH7gG8fF9eE0dD1cC2bB3aA4zZ5yY6xX7w', rank: 8, balance: 10000000, totalEarnings: 2.5 },
  { address: '6kOPlM7nN8oO9pP0qQ1rR2sS3tT4uU5vV6wW7xX8yY9z', rank: 9, balance: 8000000, totalEarnings: 2.0 },
  { address: '0jHGfE1dD2cC3bB4aA5zZ6yY7xX8wW9vV0uU1tT2sS3r', rank: 10, balance: 6000000, totalEarnings: 1.5 },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const walletAddress = searchParams.get('wallet');

  try {
    // In production, fetch real holder data from blockchain
    // For now, return mock data
    let holders = MOCK_HOLDERS;
    let userRank: number | null = null;

    // Check if connected wallet is in top 10
    if (walletAddress) {
      const userHolder = holders.find(h => h.address === walletAddress);
      if (userHolder) {
        userRank = userHolder.rank;
      }
    }

    return NextResponse.json({
      success: true,
      holders,
      userRank,
      totalHolders: 1247, // Mock total
    });
  } catch (error) {
    console.error('Holders fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch holders' },
      { status: 500 }
    );
  }
}

// POST endpoint to check if address is eligible for distributions
export async function POST(request: NextRequest) {
  try {
    const { address } = await request.json();

    if (!address) {
      return NextResponse.json(
        { success: false, error: 'Address required' },
        { status: 400 }
      );
    }

    // Check if address is in top 10
    const holder = MOCK_HOLDERS.find(h => h.address === address);
    const isEligible = !!holder;

    return NextResponse.json({
      success: true,
      isEligible,
      rank: holder?.rank || null,
      balance: holder?.balance || 0,
      totalEarnings: holder?.totalEarnings || 0,
    });
  } catch (error) {
    console.error('Eligibility check error:', error);
    return NextResponse.json(
      { success: false, error: 'Check failed' },
      { status: 500 }
    );
  }
}
