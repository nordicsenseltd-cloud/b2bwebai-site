# 🚀 b2bweb.ai — Vercel Deployment Guide

## What's in this package

```
b2bweb-site/
├── index.html          ← Your landing page + AI scanner
├── vercel.json         ← Vercel configuration
├── images/
│   └── logo.png        ← Your b2bweb.ai logo
└── api/
    └── scan.js         ← Secure AI scanner backend (hides your API key)
```

---

## Step 1 — Get your Anthropic API Key

1. Go to **https://console.anthropic.com**
2. Sign up or log in
3. Click **API Keys** in the left menu
4. Click **Create Key**, give it a name like "b2bweb-scanner"
5. Copy the key — it starts with `sk-ant-...`
6. Keep it safe — you won't see it again

---

## Step 2 — Create a Vercel Account

1. Go to **https://vercel.com**
2. Click **Sign Up**
3. Sign up with GitHub (recommended) or email
4. Choose the **Hobby (Free)** plan

---

## Step 3 — Deploy your site

1. From your Vercel dashboard, click **Add New → Project**
2. Choose **"Deploy from your computer"** or drag and drop
3. Drag the entire **b2bweb-site** folder into the upload area
4. Vercel will detect the configuration automatically
5. Click **Deploy**

Your site will be live at a temporary URL like `b2bweb-site.vercel.app` within 60 seconds.

---

## Step 4 — Add your Anthropic API Key (IMPORTANT)

This is what makes the scanner work. Your API key is stored securely on Vercel's servers — it is never visible to website visitors.

1. In your Vercel project, click **Settings**
2. Click **Environment Variables** in the left menu
3. Click **Add New**
4. Set:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** paste your `sk-ant-...` key here
   - **Environment:** tick All (Production, Preview, Development)
5. Click **Save**
6. Go back to your project and click **Redeploy** → **Redeploy** (to apply the new key)

✅ Your scanner is now live and working!

---

## Step 5 — Connect your b2bweb.ai domain

1. In your Vercel project, click **Settings → Domains**
2. Type `b2bweb.ai` and click **Add**
3. Vercel will show you DNS records to add
4. Log into wherever you bought b2bweb.ai (e.g. Namecheap, GoDaddy)
5. Go to DNS settings and add the records Vercel shows you
6. Wait 10–30 minutes for DNS to update

✅ Your site is now live at **https://b2bweb.ai**

---

## Updating your site in future

Whenever you want to make changes:

1. Ask Claude to make the edit
2. Download the updated file
3. In Vercel, go to your project
4. Click **Settings → Git** or drag the new file into the project
5. Live in under 60 seconds ✅

---

## Costs

| Item | Cost |
|------|------|
| Vercel Hobby Plan | Free |
| Anthropic API per scan | ~$0.01–0.03 per scan |
| Domain (b2bweb.ai) | Already purchased |

The scanner costs roughly 1–3 cents per use. At 100 scans a month that's ~£2. Very manageable.

---

## Need help?

Ask Claude at **claude.ai** — just say "I need to update my b2bweb.ai site" and share the relevant file.
