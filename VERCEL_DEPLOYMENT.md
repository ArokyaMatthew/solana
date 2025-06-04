# 🚀 Vercel Deployment Guide

## 📋 Complete File List

Here are ALL the files you need for Vercel deployment:

### **Core Application Files:**
1. `package.json` - Dependencies and scripts
2. `next.config.ts` - Next.js configuration
3. `tsconfig.json` - TypeScript configuration
4. `tailwind.config.ts` - Tailwind CSS configuration
5. `postcss.config.mjs` - PostCSS configuration
6. `components.json` - ShadCN UI configuration

### **Source Code:**
7. `app/layout.tsx` - Root layout
8. `app/page.tsx` - Main dashboard page
9. `app/globals.css` - Global styles
10. `app/api/webhook/route.ts` - **Main webhook handler**
11. `app/api/test/route.ts` - Test endpoint
12. `app/api/positions/route.ts` - Position management

### **UI Components:**
13. `components/ui/` - Complete folder with all UI components
14. `lib/utils.ts` - Utility functions
15. `hooks/use-mobile.ts` - Mobile detection hook

### **Configuration:**
16. `.env.example` - Environment variables template
17. `vercel.json` - Vercel deployment configuration
18. `README.md` - Setup documentation

## 🎯 Quick Deployment Steps:

### 1. **Download All Files**
- Download the complete `solana-telegram-alerts` folder
- Keep the folder structure exactly as is

### 2. **Deploy to Vercel**
```bash
# Option A: Drag & Drop
# - Go to vercel.com
# - Drag the folder to "Import Project"

# Option B: CLI
npm install -g vercel
cd solana-telegram-alerts
vercel --prod
```

### 3. **Add Environment Variables in Vercel**
Go to your project settings and add:
```
TELEGRAM_BOT_TOKEN=8165335138:AAE0rkqsGU7Ci1Ae2zVAU6EOlUIUkcfyAQc
TELEGRAM_CHAT_ID=-1002213745081
MONITORED_WALLET=DfMxre4cKmvogbLrPigxmibVTTQDuzjdXojWzjCXXhzj
```

### 4. **Update Helius Webhook**
Replace with your new Vercel URL:
```
https://your-project-name.vercel.app/api/webhook
```

## ✅ **Pre-configured Settings:**
- ✅ **Channel ID**: `-1002213745081` (Allen calls channel)
- ✅ **Bot Token**: `8165335138:AAE0rkqsGU7Ci1Ae2zVAU6EOlUIUkcfyAQc`
- ✅ **Wallet**: `DfMxre4cKmvogbLrPigxmibVTTQDuzjdXojWzjCXXhzj`

## 🎉 **Result:**
Your "Allen calls" channel will get instant BUY/SELL alerts with token images and profit calculations!

**Total deployment time: ~5 minutes** 🚀