# 🏛️ OLYMPUS - Divine AI Trading

Three divine AI entities (Zeus, Athena, and Hermes) trade memecoins autonomously on Solana. Top 10 holders receive profit distributions after every winning trade.

## ✨ Features

- **AI-Powered Trading**: Three AI agents work together to analyze, decide, and execute trades
  - **Athena**: Analyzes tokens, charts, and market data
  - **Zeus**: Makes final trading decisions
  - **Hermes**: Executes trades swiftly
- **Real-time Dashboard**: Live updates of trades, treasury stats, and AI thoughts
- **Top Holder Rewards**: Automatic profit distribution to top 10 holders
- **Solana Wallet Integration**: Connect with Phantom, Solflare, and other wallets
- **Beautiful UI**: Luxury gold-themed interface with smooth animations

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- OpenAI API key (for AI analysis)
- Solana wallet (Phantom, Solflare, etc.)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd olympus
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create a `.env.local` file in the root directory:
```env
OPENAI_API_KEY=your_openai_api_key_here
NEXT_PUBLIC_RPC_URL=https://api.mainnet-beta.solana.com
TOKEN_MINT_ADDRESS=your_token_mint_address_here
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
olympus/
├── src/
│   ├── app/              # Next.js app router
│   │   ├── api/          # API routes
│   │   │   ├── ai/       # AI analysis endpoint
│   │   │   ├── trades/   # Trade management
│   │   │   ├── holders/  # Holder data
│   │   │   └── distribute/ # Profit distribution
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Home page
│   ├── components/       # React components
│   │   ├── dashboard/    # Dashboard components
│   │   ├── gods/         # God card and thoughts feed
│   │   └── ui/           # UI components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilities and AI agents
│   ├── store/            # Zustand state management
│   └── types/            # TypeScript types
├── public/               # Static assets
└── package.json
```

## 🎯 Usage

### Triggering AI Analysis

Click the "⚡ Trigger AI Analysis" button on the home page to start a trading analysis cycle:

1. **Athena** analyzes potential tokens and market conditions
2. **Zeus** reviews the analysis and makes a trading decision
3. **Hermes** executes the trade if approved

### Viewing Data

- **Treasury Stats**: See total value, trades, win rate, and profits
- **Divine Thoughts**: Real-time feed of AI agent reasoning
- **Leaderboard**: Top 10 holders and their earnings
- **Trade History**: Complete log of all trades

### Wallet Connection

1. Click the wallet button in the header
2. Select your wallet (Phantom, Solflare, etc.)
3. Approve the connection
4. Your rank and earnings will be displayed if you're in the top 10

## 🔧 Configuration

### Environment Variables

- `OPENAI_API_KEY`: Required for AI analysis (get from [OpenAI](https://platform.openai.com))
- `NEXT_PUBLIC_RPC_URL`: Solana RPC endpoint (defaults to mainnet)
- `TOKEN_MINT_ADDRESS`: Your token's mint address (for production)

### Customization

- **God Prompts**: Edit `src/lib/gods.ts` to customize AI personalities
- **Distribution Weights**: Modify `src/app/api/distribute/route.ts`
- **Styling**: Update `src/app/globals.css` for theme changes

## 🏗️ Architecture

### AI Agent Flow

```
Token Discovery → Athena Analysis → Zeus Decision → Hermes Execution
```

### State Management

Uses Zustand for global state:
- AI thoughts and activity
- Trade history
- Treasury statistics
- Holder rankings
- Wallet connection

### API Endpoints

- `POST /api/ai/analyze` - Trigger AI analysis
- `GET /api/trades` - Fetch trade history
- `POST /api/trades` - Create new trade
- `GET /api/holders` - Get top holders
- `POST /api/distribute` - Distribute profits

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Other Platforms

The app can be deployed to any platform supporting Next.js:
- Netlify
- Railway
- AWS Amplify
- Self-hosted

## 📝 Development

### Adding Features

1. Create components in `src/components/`
2. Add API routes in `src/app/api/`
3. Update types in `src/types/index.ts`
4. Extend store in `src/store/useOlympusStore.ts`

### Testing

```bash
npm run lint
```

## ⚠️ Important Notes

- This is a demo/prototype. Real trading requires:
  - Actual Solana program integration
  - Real token mint and treasury management
  - Secure wallet signing for trades
  - Production-grade error handling
- AI analysis uses OpenAI API (costs apply)
- Mock data is used for development
- Always test on devnet before mainnet

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Built with Next.js, React, and TypeScript
- Solana Web3.js for blockchain integration
- OpenAI for AI capabilities
- Framer Motion for animations

---

**Built with ⚡ by the OLYMPUS team**
