import { NextRequest, NextResponse } from 'next/server';
import { athenaAnalyze, zeusDecide, hermesExecute, findTradingOpportunities } from '@/lib/aiAgents';

export async function POST(request: NextRequest) {
  try {
    const { treasuryBalance = 10 } = await request.json();

    // Find potential tokens
    const tokens = await findTradingOpportunities();
    if (tokens.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'No trading opportunities found',
      });
    }

    const token = tokens[0];
    const thoughts = [];

    // Step 1: Athena analyzes
    const athenaThought = await athenaAnalyze(token);
    thoughts.push(athenaThought);

    // Step 2: Zeus decides
    const { thought: zeusThought, decision } = await zeusDecide(
      token,
      athenaThought.content,
      treasuryBalance
    );
    thoughts.push(zeusThought);

    // Step 3: Hermes executes (if decision made)
    if (decision) {
      const hermesThought = await hermesExecute(decision);
      thoughts.push(hermesThought);
    }

    return NextResponse.json({
      success: true,
      thoughts,
      decision,
      token,
    });
  } catch (error) {
    console.error('AI analysis error:', error);
    return NextResponse.json(
      { success: false, error: 'Analysis failed' },
      { status: 500 }
    );
  }
}

// GET endpoint for demo/testing
export async function GET() {
  return NextResponse.json({
    message: 'AI Analysis endpoint. Use POST to trigger analysis.',
    gods: ['Athena (Analyst)', 'Zeus (Decider)', 'Hermes (Executor)'],
  });
}
