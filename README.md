# 🌲 Black Forest Intelligence Platform

Influencer Marketing Command Center for Black Forest Supplements.

## Features

- **Dashboard** - Key metrics, performance trends, product distribution
- **Influencer Leaderboard** - Clickable profiles with charts and analytics
- **Script Leaderboard** - Performance tracking with mini sparklines
- **Deep Insights** - AI-powered pattern detection and recommendations
- **Script Brain** - Chat with AI about your marketing data
- **Script Generator** - AI-powered script creation based on top performers

---

## 🚀 Deploy to Railway (Recommended)

### Step 1: Push to GitHub

1. Create a new repository on GitHub (e.g., `bfs-intelligence`)
2. Push this folder:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/bfs-intelligence.git
git push -u origin main
```

### Step 2: Deploy on Railway

1. Go to [railway.app](https://railway.app) and sign in with GitHub
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your `bfs-intelligence` repository
4. Railway will auto-detect and start building

### Step 3: Add Your API Key

1. In Railway, go to your project → **Variables** tab
2. Add a new variable:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** Your API key from [console.anthropic.com](https://console.anthropic.com)
3. Railway will automatically redeploy with the new variable

### Step 4: Get Your Public URL

1. Go to **Settings** → **Domains**
2. Click **"Generate Domain"** to get a free `.railway.app` URL
3. Or add your own custom domain

**That's it!** Share the URL with your partners.

---

## 💰 Cost Estimates

### Railway
- **Free tier:** $5/month credit (enough for light use)
- **Pro:** $20/month for more resources

### Anthropic API
- **Claude Sonnet:** ~$3 per 1M input tokens, ~$15 per 1M output tokens
- **Typical usage:** $5-20/month depending on how much Script Brain/Generator is used

---

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# In another terminal, start the API server
node server.js
```

Open [http://localhost:5173](http://localhost:5173)

---

## 📁 Project Structure

```
bfs-intelligence/
├── src/
│   ├── App.jsx        # Main React application
│   └── main.jsx       # React entry point
├── server.js          # Express server (API proxy)
├── index.html         # HTML template
├── package.json       # Dependencies
├── vite.config.js     # Vite configuration
└── railway.json       # Railway deployment config
```

---

## 🔐 Security Notes

- API key is stored as an environment variable (never in code)
- All API calls go through your server (key never exposed to browser)
- Partners don't need their own API keys

---

## 📊 Data

The platform comes pre-loaded with data from the Move The Needle document including:
- 12 influencers with full performance metrics
- 7 scripts with effectiveness ratings
- Hooks, angles, and promo configurations

To update the data, edit the arrays at the top of `src/App.jsx`.

---

## Support

For issues or feature requests, open a GitHub issue or contact your team.
