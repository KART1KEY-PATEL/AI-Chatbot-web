# Quick Start Guide

## ⚠️ Important: Node.js Version Requirement

This project requires **Node.js 20.9.0 or higher**. Your current version is 18.20.8.

### Upgrade Node.js

#### Option 1: Using nvm (Recommended)
```bash
# Install nvm if you don't have it
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install Node.js 20
nvm install 20

# Use Node.js 20
nvm use 20

# Verify version
node --version  # Should show v20.x.x
```

#### Option 2: Download from nodejs.org
Visit https://nodejs.org/ and download Node.js 20 LTS

---

## Running the Application

### 1. Start Development Server

```bash
cd /Users/kartikey/Desktop/friends/junaid/ai-chat/my-app
npm run dev
```

Open http://localhost:3000 in your browser

### 2. Login

- Click "Get Started" on the landing page
- Enter any email and password (it's a mock login)
- You'll be redirected to the chat interface

### 3. Try the Features

**Chat Interface:**
- Type a message and press Cmd/Ctrl+Enter or click Send
- The AI will respond with a mock message
- Try sending code snippets to see syntax highlighting

**Model Selector:**
- Click the dropdown in the sidebar
- Select different AI models

**Parameters:**
- Adjust the sliders for Temperature, Max Tokens, and Top P
- Values are saved automatically

**Templates:**
- Click "Templates" in the sidebar
- Click "New Template" to create one
- Load templates by clicking on them

**Theme Toggle:**
- Click the moon/sun icon in the header
- Switch between light and dark modes

**Export:**
- Click "Export" in the header to download your conversation as JSON

---

## Integrating Real AI API (Optional)

### Using Hugging Face (Free)

1. **Get API Key:**
   - Go to https://huggingface.co/settings/tokens
   - Create a new token (read access is enough)

2. **Add to Environment:**
   ```bash
   echo "NEXT_PUBLIC_HF_API_KEY=your_token_here" > .env.local
   ```

3. **Update API Route:**
   - Open `app/api/chat/route.ts`
   - Comment out the mock API code (lines 8-45)
   - Uncomment the real API code (lines 50-90)

4. **Restart Server:**
   ```bash
   npm run dev
   ```

### Alternative Free APIs

**Groq (Very Fast):**
- Sign up at https://console.groq.com
- Get API key
- Similar integration process

**Together AI:**
- Sign up at https://api.together.xyz
- Get free trial credits

---

## Building for Production

### 1. Build the Project

```bash
npm run build
```

### 2. Test Production Build Locally

```bash
npm start
```

Open http://localhost:3000

---

## Deploying to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: AI Chat Interface"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to https://vercel.com
2. Click "Import Project"
3. Select your GitHub repository
4. Click "Deploy"

Vercel will automatically detect Next.js and deploy your app!

### 3. Add Environment Variables (if using real API)

In Vercel dashboard:
1. Go to Settings → Environment Variables
2. Add `NEXT_PUBLIC_HF_API_KEY` with your API key
3. Redeploy

---

## Running Storybook (Optional)

**Note:** Requires Node.js 20+

```bash
# Install Storybook
npx storybook@latest init --yes

# Run Storybook
npm run storybook
```

Open http://localhost:6006

---

## Project Structure

```
my-app/
├── app/                  # Next.js pages and API routes
├── components/           # React components
├── contexts/             # React Context providers
├── data/                 # Mock JSON data
├── lib/                  # Utility functions
├── stories/              # Storybook stories
├── types/                # TypeScript types
└── README.md             # Full documentation
```

---

## Troubleshooting

### "Module not found" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port 3000 already in use
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

### Theme not persisting
- Check browser console for localStorage errors
- Try clearing browser cache

### Build fails
- Ensure you're using Node.js 20+
- Check for TypeScript errors: `npm run lint`

---

## Key Files to Customize

**Colors:**
- `app/globals.css` - Update CSS variables

**Models:**
- `data/models.json` - Add/remove AI models

**Templates:**
- `data/templates.json` - Add default templates

**API Integration:**
- `app/api/chat/route.ts` - Uncomment real API code

**Branding:**
- `lib/constants.ts` - Update app name and description
- `app/layout.tsx` - Update metadata

---

## Need Help?

**Documentation:**
- Full README: `README.md`
- Walkthrough: See artifacts
- Implementation Plan: See artifacts

**Resources:**
- Next.js Docs: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Framer Motion: https://www.framer.com/motion/

---

**Happy Coding! 🚀**
