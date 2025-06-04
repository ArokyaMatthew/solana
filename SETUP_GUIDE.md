# 🚀 Complete Setup Guide - Solana Trading Alerts

Your alert system is **already deployed and ready**! Just follow these 3 simple steps:

## Step 1: Create Free Helius Account (2 minutes)

1. **Go to Helius**: Visit [helius.dev](https://helius.dev)
2. **Sign Up**: Click "Get Started" or "Sign Up" 
3. **Create Account**: Use your email and create a password
4. **Verify Email**: Check your email and verify your account
5. **Create Project**: 
   - Click "Create New Project"
   - Name it anything (e.g., "Solana Alerts")
   - Select "Mainnet"
   - Click "Create"

## Step 2: Configure Webhook (3 minutes)

1. **Go to Webhooks Section**:
   - In your Helius dashboard, find "Webhooks" in the sidebar
   - Click "Create Webhook"

2. **Fill in These EXACT Settings**:
   ```
   Webhook URL: https://66a2e9cb-2963-4f02-90ad-f752ad622e9c.scout.page/api/webhook
   
   Transaction Types: ADDRESS_TRANSACTION
   
   Account Addresses: DfMxre4cKmvogbLrPigxmibVTTQDuzjdXojWzjCXXhzj
   
   Commitment: confirmed
   ```

3. **Save Webhook**: Click "Create" or "Save"

## Step 3: Test Your Setup (1 minute)

1. **Test the Webhook**:
   - Go to: https://66a2e9cb-2963-4f02-90ad-f752ad622e9c.scout.page
   - Click the "🟢 Test BUY" button
   - Check your Telegram for a test message

2. **Test SELL Alert**:
   - Click the "🔴 Test SELL" button  
   - You should get a SELL message with profit calculation

## ✅ That's It! You're Done!

Your wallet `DfMxre4cKmvogbLrPigxmibVTTQDuzjdXojWzjCXXhzj` is now being monitored 24/7.

Every time you buy or sell tokens, you'll get instant Telegram messages like:

**BUY Alert:**
```
🟢 BUY

🪙 Token: USD Coin (USDC)
🔗 Token Address: EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v
```

**SELL Alert:**
```
🔴 SELL

🪙 Token: USD Coin (USDC)
🔗 Token Address: EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v

📈 Result: 1.50x (+50.0%)
```

## 🆘 Troubleshooting

**Not receiving messages?**
1. Double-check the webhook URL is exactly correct
2. Make sure the wallet address matches exactly
3. Verify your Telegram bot token in the deployed app

**Webhook says "failed"?**
1. Check if the URL is accessible: https://66a2e9cb-2963-4f02-90ad-f752ad622e9c.scout.page/api/webhook
2. Should return: `{"status":"active",...}`

**Test buttons not working?**
1. Check browser console for errors
2. Make sure you're on the correct URL

## 💰 Cost: $0/month Forever
- Helius free tier: 1M credits/month (way more than needed)
- Hosting: Free serverless deployment
- Telegram: Free Bot API

## 🎯 What Happens Next?
Your system is now monitoring your wallet 24/7. Every trade will trigger an instant Telegram alert with token images and profit calculations!

---

**Need help?** The system is already running - just set up Helius and you're good to go! 🚀