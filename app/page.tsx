'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Copy, ExternalLink, Bell, Wallet, Bot, Server } from 'lucide-react';

export default function Home() {
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const MONITORED_WALLET = 'DfMxre4cKmvogbLrPigxmibVTTQDuzjdXojWzjCXXhzj';

  useEffect(() => {
    checkWebhookStatus();
  }, []);

  const checkWebhookStatus = async () => {
    try {
      const response = await fetch('/api/webhook');
      const data = await response.json();
      setStatus(data);
    } catch (error) {
      console.error('Failed to check webhook status:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const testTrading = async (type: 'BUY' | 'SELL') => {
    try {
      // Use USDC as test token
      const usdcMint = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
      
      const response = await fetch('/api/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: type,
          mintAddress: usdcMint
        })
      });
      
      if (response.ok) {
        alert(`${type} test sent! Check your Telegram for the notification.`);
      } else {
        alert('Test failed. Check console for details.');
      }
    } catch (error) {
      console.error('Test error:', error);
      alert('Test failed. Check console for details.');
    }
  };

  const webhookUrl = typeof window !== 'undefined' ? `${window.location.origin}/api/webhook` : '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-indigo-100 rounded-xl">
              <Bell className="h-8 w-8 text-indigo-600" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Solana Trading Alerts
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Smart BUY/SELL notifications with profit tracking and token images. 
            Get instant alerts with X multipliers for your trades!
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <Badge variant="outline" className="text-sm px-3 py-1">
              🟢 BUY Detection
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1">
              🔴 SELL Detection
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1">
              📈 Profit Tracking
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1">
              🖼️ Token Images
            </Badge>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <Server className="h-4 w-4 text-green-600" />
                Webhook Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="animate-pulse bg-gray-200 h-6 w-20 rounded"></div>
              ) : (
                <Badge variant={status?.status === 'active' ? 'default' : 'destructive'} className="text-sm">
                  {status?.status === 'active' ? '🟢 Active' : '🔴 Inactive'}
                </Badge>
              )}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <Wallet className="h-4 w-4 text-blue-600" />
                Monitored Wallet
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-mono text-gray-600 break-all">
                {MONITORED_WALLET.slice(0, 8)}...{MONITORED_WALLET.slice(-8)}
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <Bot className="h-4 w-4 text-purple-600" />
                Telegram Bot
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="outline" className="text-sm">
                ✅ Allen calls channel
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Setup Instructions */}
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800">Setup Instructions</CardTitle>
            <CardDescription>
              Follow these steps to complete your Solana transaction monitoring setup
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-indigo-100 text-indigo-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Deploy to Vercel (Free)</h3>
                  <p className="text-gray-600 mb-3">
                    Deploy this application to Vercel for free hosting that runs 24/7.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <p className="text-sm text-gray-600 mb-2">Run in your terminal:</p>
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">npx vercel --prod</code>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-4">
                <div className="bg-indigo-100 text-indigo-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Create Helius Account (Free)</h3>
                  <p className="text-gray-600 mb-3">
                    Sign up for a free Helius account to get webhook access.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => window.open('https://www.helius.dev/', '_blank')}
                    className="mb-3"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Sign up at Helius.dev
                  </Button>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800">
                      <strong>Free tier includes:</strong> 1M credits/month, 1 webhook, 10 RPC requests/sec
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-4">
                <div className="bg-indigo-100 text-indigo-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Configure Webhook</h3>
                  <p className="text-gray-600 mb-3">
                    Use your deployed Vercel URL as the webhook endpoint in Helius dashboard.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <p className="text-sm text-gray-600 mb-2">Webhook URL:</p>
                    <div className="flex items-center gap-2">
                      <code className="text-sm bg-white px-3 py-2 rounded border flex-1 font-mono">
                        {webhookUrl || 'https://your-app.vercel.app/api/webhook'}
                      </code>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => copyToClipboard(webhookUrl || 'https://your-app.vercel.app/api/webhook')}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-3 space-y-2">
                    <p className="text-sm font-medium text-gray-700">Webhook Configuration:</p>
                    <ul className="text-sm text-gray-600 space-y-1 pl-4">
                      <li>• <strong>Transaction Type:</strong> ADDRESS_TRANSACTION</li>
                      <li>• <strong>Account Address:</strong> {MONITORED_WALLET}</li>
                      <li>• <strong>Webhook URL:</strong> Your deployed URL + /api/webhook</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-4">
                <div className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                  ✓
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2 text-green-800">Ready!</h3>
                  <p className="text-gray-600">
                    Once configured, you'll receive instant Telegram notifications for all transactions 
                    on wallet <code className="bg-gray-100 px-2 py-1 rounded text-sm">{MONITORED_WALLET}</code>
                  </p>
                  <div className="mt-3 p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-green-800">
                      <strong>What you'll get:</strong> Clean BUY/SELL alerts with token names, addresses, profit calculations (1x, 2x, 0.5x), 
                      and token images. Simple and focused notifications!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-lg">Useful Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => window.open(`https://solscan.io/account/${MONITORED_WALLET}`, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Wallet on Solscan
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => window.open('https://dashboard.helius.dev/', '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Helius Dashboard
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => window.open('https://vercel.com/dashboard', '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Vercel Dashboard
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-lg">Test Trading Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-600">
                Test BUY/SELL notifications with popular tokens like USDC.
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="default" 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => testTrading('BUY')}
                >
                  🟢 Test BUY
                </Button>
                <Button 
                  variant="default" 
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() => testTrading('SELL')}
                >
                  🔴 Test SELL
                </Button>
              </div>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={checkWebhookStatus}
                disabled={loading}
              >
                {loading ? 'Checking...' : 'Check Status'}
              </Button>
              {status && (
                <div className="text-xs text-gray-500 mt-2">
                  Active positions: {status.activePositions || 0} | Last checked: {status.timestamp ? new Date(status.timestamp).toLocaleString() : 'Never'}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Built with Next.js, deployed on Vercel, powered by Helius webhooks
          </p>
        </div>
      </div>
    </div>
  );
}