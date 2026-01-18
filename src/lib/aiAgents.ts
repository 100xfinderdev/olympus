import OpenAI from 'openai';
import { GOD_PROMPTS } from './gods';
import type { AIThought, GodName } from '@/types';

// Initialize OpenAI client (can swap for Anthropic)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export interface TokenData {
  address: string;
  symbol: string;
  name: string;
  price: number;
  marketCap: number;
  volume24h: number;
  holders: number;
  liquidity: number;
  priceChange24h: number;
  topHolderPercent: number;
  createdAt: string;
}

export interface TradeDecision {
  action: 'buy' | 'sell' | 'hold';
  token: TokenData;
  positionSizePercent: number;
  entryPrice: number;
  takeProfitPrice: number;
  stopLossPrice: number;
  reasoning: string;
}

// Athena analyzes the token
export async function athenaAnalyze(token: TokenData): Promise<AIThought> {
  const prompt = `
${GOD_PROMPTS.athena}

Analyze this token opportunity:
- Symbol: ${token.symbol}
- Name: ${token.name}
- Price: $${token.price}
- Market Cap: $${token.marketCap.toLocaleString()}
- 24h Volume: $${token.volume24h.toLocaleString()}
- Holders: ${token.holders}
- Liquidity: $${token.liquidity.toLocaleString()}
- 24h Change: ${token.priceChange24h}%
- Top Holder %: ${token.topHolderPercent}%
- Created: ${token.createdAt}

Provide your analysis as Athena, Goddess of Wisdom.
`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 800,
      temperature: 0.7,
    });

    return {
      id: `athena-${Date.now()}`,
      godName: 'athena',
      content: response.choices[0]?.message?.content || 'Unable to analyze at this time.',
      timestamp: new Date(),
      type: 'analysis',
    };
  } catch (error) {
    console.error('Athena analysis error:', error);
    return {
      id: `athena-${Date.now()}`,
      godName: 'athena',
      content: 'My wisdom is temporarily clouded. Analysis unavailable.',
      timestamp: new Date(),
      type: 'analysis',
    };
  }
}

// Zeus makes the decision
export async function zeusDecide(
  token: TokenData,
  athenaAnalysis: string,
  treasuryBalance: number
): Promise<{ thought: AIThought; decision: TradeDecision | null }> {
  const prompt = `
${GOD_PROMPTS.zeus}

Treasury Balance: ${treasuryBalance} SOL

Athena's Analysis:
${athenaAnalysis}

Token Details:
- Symbol: ${token.symbol}
- Price: $${token.price}
- Market Cap: $${token.marketCap.toLocaleString()}

Make your decision as Zeus, King of the Gods.
If you decide to EXECUTE, provide:
- Position size (% of treasury)
- Entry price target
- Take profit price
- Stop loss price

Respond in JSON format:
{
  "verdict": "EXECUTE" | "PASS",
  "positionSizePercent": number (1-25),
  "entryPrice": number,
  "takeProfitPrice": number,
  "stopLossPrice": number,
  "reasoning": "your reasoning"
}
`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 600,
      temperature: 0.5,
    });

    const content = response.choices[0]?.message?.content || '';

    // Extract JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    let decision: TradeDecision | null = null;

    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0]);
        if (parsed.verdict === 'EXECUTE') {
          decision = {
            action: 'buy',
            token,
            positionSizePercent: parsed.positionSizePercent || 5,
            entryPrice: parsed.entryPrice || token.price,
            takeProfitPrice: parsed.takeProfitPrice || token.price * 1.5,
            stopLossPrice: parsed.stopLossPrice || token.price * 0.8,
            reasoning: parsed.reasoning || 'Divine intuition',
          };
        }
      } catch {
        // JSON parse failed, no decision
      }
    }

    return {
      thought: {
        id: `zeus-${Date.now()}`,
        godName: 'zeus',
        content: content,
        timestamp: new Date(),
        type: 'decision',
      },
      decision,
    };
  } catch (error) {
    console.error('Zeus decision error:', error);
    return {
      thought: {
        id: `zeus-${Date.now()}`,
        godName: 'zeus',
        content: 'The heavens are silent. Decision postponed.',
        timestamp: new Date(),
        type: 'decision',
      },
      decision: null,
    };
  }
}

// Hermes executes the trade
export async function hermesExecute(
  decision: TradeDecision
): Promise<AIThought> {
  const prompt = `
${GOD_PROMPTS.hermes}

Zeus has commanded:
- Action: BUY ${decision.token.symbol}
- Position: ${decision.positionSizePercent}% of treasury
- Entry: $${decision.entryPrice}
- TP: $${decision.takeProfitPrice}
- SL: $${decision.stopLossPrice}

Report your execution status as Hermes, Messenger of the Gods.
Be swift and precise in your response.
`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 300,
      temperature: 0.3,
    });

    return {
      id: `hermes-${Date.now()}`,
      godName: 'hermes',
      content: response.choices[0]?.message?.content || 'Execution in progress...',
      timestamp: new Date(),
      type: 'execution',
    };
  } catch (error) {
    console.error('Hermes execution error:', error);
    return {
      id: `hermes-${Date.now()}`,
      godName: 'hermes',
      content: 'Swift feet have stumbled. Retrying...',
      timestamp: new Date(),
      type: 'execution',
    };
  }
}

// Simulate finding tokens to analyze (replace with real pump.fun API)
export async function findTradingOpportunities(): Promise<TokenData[]> {
  // In production, this would fetch from pump.fun API
  // For now, return mock data
  return [
    {
      address: 'pump123abc...',
      symbol: '$ZEUS',
      name: 'Zeus Token',
      price: 0.000042,
      marketCap: 42000,
      volume24h: 15000,
      holders: 234,
      liquidity: 8500,
      priceChange24h: 125,
      topHolderPercent: 12,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
  ];
}
