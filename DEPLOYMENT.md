# 🚀 Deployment Guide

## Deploy to Vercel (Recommended - Free)

### Option 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/import?s=https://github.com/your-username/solana-telegram-alerts)

### Option 2: Manual Deployment

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd solana-telegram-alerts
   vercel --prod
   ```

4. **Set Environment Variables**
   After deployment, go to your Vercel dashboard and add:
   ```
   TELEGRAM_BOT_TOKEN=8165335138:AAE0rkqsGU7Ci1Ae2zVAU6EOlUIUkcfyAQc
   TELEGRAM_CHAT_ID=5039957435
   TELEGRAM_ADMIN_IDS=5039957435
   TELEGRAM_NOTIFICATION_LEVEL=ALL
   MONITORED_WALLET=DfMxre4cKmvogbLrPigxmibVTTQDuzjdXojWzjCXXhzj
   ```

5. **Redeploy**
   ```bash
   vercel --prod
   ```

## Alternative Deployment Options

### Netlify (Free)

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variables in Netlify dashboard

### Railway (Free Tier)

1. Connect GitHub repository
2. Railway will auto-detect Next.js
3. Add environment variables
4. Deploy

### DigitalOcean App Platform

1. Create new app from GitHub
2. Choose Node.js environment
3. Set build command: `npm run build`
4. Add environment variables

## Post-Deployment Steps

1. **Test Webhook Endpoint**
   ```bash
   curl https://your-app.vercel.app/api/webhook
   ```

2. **Configure Helius Webhook**
   - URL: `https://your-app.vercel.app/api/webhook`
   - Type: ADDRESS_TRANSACTION
   - Address: `DfMxre4cKmvogbLrPigxmibVTTQDuzjdXojWzjCXXhzj`

3. **Test Telegram Bot**
   Send a test message to verify configuration

## Monitoring

- **Vercel Functions:** Monitor in Vercel dashboard
- **Helius Webhooks:** Check delivery status in Helius dashboard
- **Telegram:** Monitor message delivery

## Troubleshooting

**Functions timing out:**
- Check Vercel function logs
- Verify environment variables are set
- Ensure Telegram credentials are correct

**Webhook not receiving:**
- Verify Helius webhook URL is correct
- Check if wallet address matches exactly
- Ensure function is deployed and accessible

**Telegram not sending:**
- Verify bot token and chat ID
- Check if bot has send message permissions
- Test bot with a simple message first