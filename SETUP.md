# 🚀 Quick Setup Guide

## ✅ Almost Done! Just 2 Steps:

### Step 1: Create `.env.local` file

Create a file named `.env.local` in the `olympus` folder with:

```env
# Your Token Contract Address (REQUIRED)
NEXT_PUBLIC_TOKEN_ADDRESS=YOUR_CONTRACT_ADDRESS_HERE

# OpenAI API Key (optional - only needed for AI analysis)
OPENAI_API_KEY=your_openai_api_key_here

# Solana RPC (optional - defaults to mainnet)
NEXT_PUBLIC_RPC_URL=https://api.mainnet-beta.solana.com

# Token Mint Address (optional - for fetching real holder data)
TOKEN_MINT_ADDRESS=your_token_mint_address_here
```

### Step 2: Start the server

```bash
npm run dev
```

Then open **http://localhost:3000** in your browser!

---

## 🎯 What Works Right Now:

✅ **Full UI** - Beautiful interface with Greek god images  
✅ **Wallet Connection** - Connect Phantom, Solflare, etc.  
✅ **Dashboard** - Stats, leaderboard, trade history  
✅ **Contract Address Display** - Shows your CA on the homepage  
✅ **Real-time Updates** - Auto-refreshes every 30 seconds  

## ⚠️ Note:

- The app currently uses **mock/demo data** for trades and holders
- For **real blockchain data**, you'll need to integrate with:
  - Solana RPC for fetching holder data
  - Jupiter/Raydium for actual trading
  - Your token's on-chain data

But the **UI is 100% ready** and will display your contract address!

---

**That's it! Just add your CA to `.env.local` and you're good to go! 🎉**
