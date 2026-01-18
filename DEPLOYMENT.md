# 🚀 How to Deploy OLYMPUS Website

## Quick Deploy Options

### Option 1: Vercel (Recommended - Easiest & Free)

Vercel is made by the Next.js team - perfect for this project!

#### Steps:

1. **Push to GitHub** (if not already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js settings
   - Click "Deploy"

3. **Add Environment Variables**:
   - In Vercel dashboard → Your Project → Settings → Environment Variables
   - Add:
     ```
     NEXT_PUBLIC_TOKEN_ADDRESS=your_contract_address
     OPENAI_API_KEY=your_key (optional)
     NEXT_PUBLIC_RPC_URL=https://api.mainnet-beta.solana.com
     ```

4. **Add Custom Domain**:
   - In Vercel dashboard → Your Project → Settings → Domains
   - Click "Add Domain"
   - Enter your domain (e.g., `olympus.xyz` or `www.olympus.xyz`)
   - Follow DNS instructions:
     - Add a CNAME record pointing to: `cname.vercel-dns.com`
     - Or add an A record (Vercel will show you the IP)
   - Wait 5-60 minutes for DNS to propagate
   - Done! Your site is live at your domain

**Cost**: FREE for personal projects (with Vercel subdomain)
**Custom Domain**: FREE (you just pay for the domain itself)

---

### Option 2: Netlify (Also Easy & Free)

1. **Push to GitHub** (same as above)

2. **Deploy to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Sign up/login
   - Click "Add new site" → "Import an existing project"
   - Connect GitHub and select your repo
   - Build settings (auto-detected):
     - Build command: `npm run build`
     - Publish directory: `.next`
   - Click "Deploy site"

3. **Add Environment Variables**:
   - Site settings → Environment variables
   - Add your variables

4. **Add Custom Domain**:
   - Site settings → Domain management
   - Add custom domain
   - Follow DNS setup instructions

**Cost**: FREE tier available

---

### Option 3: Railway (Good for Full-Stack)

1. Go to [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Select your repo
4. Add environment variables
5. Add custom domain in settings

**Cost**: ~$5/month (has free trial)

---

### Option 4: Your Own Server (VPS)

If you have a VPS (DigitalOcean, AWS, etc.):

```bash
# On your server
git clone YOUR_REPO_URL
cd olympus
npm install
npm run build
npm start

# Or use PM2 to keep it running
npm install -g pm2
pm2 start npm --name "olympus" -- start
pm2 save
```

Then point your domain's A record to your server IP.

---

## Domain Setup Guide

### Where to Buy a Domain:
- **Namecheap** - ~$10-15/year
- **Google Domains** - ~$12/year  
- **Cloudflare** - ~$8-10/year (cheapest)
- **GoDaddy** - ~$12-15/year

### DNS Configuration:

**For Vercel/Netlify:**
1. Buy domain from any registrar
2. Go to your domain's DNS settings
3. Add CNAME record:
   - Name: `@` or `www`
   - Value: `cname.vercel-dns.com` (Vercel) or Netlify's provided URL
4. Wait for DNS propagation (5-60 minutes)

**For Your Own Server:**
1. Add A record:
   - Name: `@` or `www`
   - Value: Your server's IP address
2. Wait for DNS propagation

---

## Quick Start (Recommended Path):

1. **Push code to GitHub** ✅
2. **Deploy to Vercel** (5 minutes) ✅
3. **Add environment variables** (2 minutes) ✅
4. **Buy domain** (5 minutes) ✅
5. **Connect domain in Vercel** (2 minutes) ✅
6. **Wait for DNS** (5-60 minutes) ⏳
7. **DONE!** 🎉

**Total time: ~20-30 minutes + DNS wait**

---

## After Deployment:

Your site will be live at:
- Vercel subdomain: `your-project.vercel.app` (instant)
- Your custom domain: `yourdomain.com` (after DNS setup)

---

## Need Help?

Just ask and I can:
- Help you set up the deployment
- Configure the domain
- Troubleshoot any issues
- Add SSL/HTTPS (automatic with Vercel/Netlify)

**Vercel is the easiest - I recommend starting there!** 🚀
