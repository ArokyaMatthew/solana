# 🔔 Solana Trading Alerts with Profit Tracking

Smart BUY/SELL notifications with automatic profit calculations - **completely free** and runs 24/7 without keeping your PC on!

![Status](https://img.shields.io/badge/status-active-brightgreen)
![Platform](https://img.shields.io/badge/platform-vercel-black)
![Cost](https://img.shields.io/badge/cost-100%25%20free-brightgreen)

## ✨ Features

- 🟢 **BUY Detection** - Automatic detection when tokens are purchased
- 🔴 **SELL Detection** - Smart detection when tokens are sold
- 📈 **Profit Tracking** - Calculate 1x, 2x, 0.5x multipliers automatically
- 🖼️ **Token Images** - Rich notifications with token logos
- 💰 **100% Free** - Uses free tiers of Helius + Vercel + Telegram
- 🔄 **24/7 Monitoring** - Runs continuously without your computer
- ⚡ **Fast setup** - Get running in under 10 minutes

## 🎯 Monitored Wallet

**Address:** `DfMxre4cKmvogbLrPigxmibVTTQDuzjdXojWzjCXXhzj`

All transactions (incoming/outgoing) for this wallet will trigger Telegram notifications.

## 🚀 Quick Start

### 1. Deploy to Vercel (Free)

Deploy this app to Vercel for free hosting:

```bash
# Install Vercel CLI if you haven't already
npm install -g vercel

# Deploy
vercel --prod
```

**Or use the Vercel Dashboard:**
1. Go to [vercel.com](https://vercel.com)
2. Connect your GitHub account
3. Import this repository
4. Deploy with one click

### 2. Create Helius Account (Free)

1. Sign up at [helius.dev](https://www.helius.dev/) (free account)
2. Create a new project
3. Get your API key from the dashboard

**Free tier includes:**
- 1M credits per month
- 1 webhook (perfect for our needs)
- 10 RPC requests per second

### 3. Configure Webhook in Helius

1. Go to your [Helius Dashboard](https://dashboard.helius.dev/)
2. Navigate to "Webhooks" section
3. Create a new webhook with these settings:

**Webhook Configuration:**
- **Webhook URL:** `https://your-app.vercel.app/api/webhook`
- **Transaction Type:** `ADDRESS_TRANSACTION`
- **Account Address:** `DfMxre4cKmvogbLrPigxmibVTTQDuzjdXojWzjCXXhzj`
- **Commitment:** `confirmed`

### 4. Set Environment Variables

In your Vercel dashboard, add these environment variables:

```env
TELEGRAM_BOT_TOKEN=8165335138:AAE0rkqsGU7Ci1Ae2zVAU6EOlUIUkcfyAQc
TELEGRAM_CHAT_ID=5039957435
TELEGRAM_ADMIN_IDS=5039957435
TELEGRAM_NOTIFICATION_LEVEL=ALL
MONITORED_WALLET=DfMxre4cKmvogbLrPigxmibVTTQDuzjdXojWzjCXXhzj
```

## 📱 Telegram Notifications

### BUY Notifications:
```
🟢 BUY

🪙 Token: USD Coin (USDC)
🔗 Token Address: EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v
```

### SELL Notifications:
```
🔴 SELL

🪙 Token: USD Coin (USDC)
🔗 Token Address: EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v

📈 Result: 1.50x (+50.0%)
```

**Plus token images are automatically included when available!**

## 🛠️ Technical Details

### Architecture
- **Frontend:** Next.js 15 + React 19 + Tailwind CSS
- **Backend:** Next.js API Routes (serverless functions)
- **Deployment:** Vercel (free tier)
- **Monitoring:** Helius webhooks (free tier)
- **Notifications:** Telegram Bot API

### Webhook Endpoint
- **URL:** `/api/webhook`
- **Method:** `POST`
- **Authentication:** None required (Helius handles security)
- **Rate Limiting:** Handled by Vercel

### Supported Trading Types
- ✅ Token purchases (BUY detection)
- ✅ Token sales (SELL detection)
- ✅ DEX swaps (Raydium, Jupiter, etc.)
- ✅ Profit/loss calculations
- ✅ Token metadata & images
- ✅ Position tracking

## 🔧 Development

### Local Development

```bash
# Clone the repository
git clone <repository-url>
cd solana-telegram-alerts

# Install dependencies
bun install

# Copy environment variables
cp .env.example .env.local

# Edit .env.local with your credentials

# Run development server
bun dev
```

### Testing Webhook

You can test your webhook endpoint:

```bash
# Check webhook status
curl https://your-app.vercel.app/api/webhook

# Expected response
{
  "status": "active",
  "timestamp": "2025-06-04T15:30:00.000Z",
  "monitoredWallet": "DfMxre4cKmvogbLrPigxmibVTTQDuzjdXojWzjCXXhzj"
}
```

## 💡 Cost Breakdown

| Service | Plan | Cost | Usage |
|---------|------|------|-------|
| Helius | Free | $0/month | 1M credits, 1 webhook |
| Vercel | Hobby | $0/month | 100GB bandwidth, serverless functions |
| Telegram | Bot API | $0/month | Unlimited messages |
| **Total** | | **$0/month** | |

## 🔒 Security

- Environment variables are encrypted in Vercel
- No sensitive data stored in the application
- Webhook endpoint is public but only accepts Helius payloads
- Telegram bot token is securely stored

## 📊 Monitoring

- **Webhook Status:** Check `/api/webhook` endpoint
- **Vercel Analytics:** Built-in deployment and function metrics
- **Helius Dashboard:** Webhook delivery statistics
- **Telegram:** Real-time notification delivery confirmation

## 🎨 Customization

### Modify Notification Format

Edit `/app/api/webhook/route.ts` to customize message format:

```typescript
function createTransactionMessage(transaction: HeliusWebhookPayload): string {
  // Customize your message format here
  let message = `🔔 Custom Alert Format\n\n`;
  // ... rest of your custom logic
  return message;
}
```

### Add Multiple Wallets

To monitor multiple wallets, modify the webhook logic:

```typescript
const MONITORED_WALLETS = [
  'DfMxre4cKmvogbLrPigxmibVTTQDuzjdXojWzjCXXhzj',
  'AnotherWalletAddress...'
];
```

### Filter Transactions

Add filters for specific transaction types or amounts:

```typescript
// Only notify for transactions > 0.1 SOL
if (Math.abs(account.nativeBalanceChange) < 100_000_000) {
  continue; // Skip small transactions
}
```

## 🆘 Troubleshooting

### Common Issues

**Webhook not triggering:**
1. Verify webhook URL is correct in Helius dashboard
2. Check Vercel function logs for errors
3. Ensure wallet address is exactly correct

**Telegram messages not sending:**
1. Verify bot token and chat ID are correct
2. Check if bot is added to the group/chat
3. Verify bot has permission to send messages

**Environment variables not working:**
1. Redeploy after adding environment variables
2. Check variable names match exactly
3. Ensure no extra spaces or quotes

### Debug Mode

Enable detailed logging by adding to your environment:

```env
DEBUG=true
```

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Helius](https://helius.dev) - For excellent Solana infrastructure
- [Vercel](https://vercel.com) - For seamless deployment
- [Telegram](https://telegram.org) - For the Bot API

---

**🚀 Deploy now and never miss a transaction again!**