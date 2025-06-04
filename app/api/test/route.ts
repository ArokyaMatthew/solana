import { NextRequest, NextResponse } from 'next/server';

// Test endpoint to simulate transactions
export async function POST(request: NextRequest) {
  try {
    const { type, mintAddress } = await request.json();
    
    if (!type || !mintAddress) {
      return NextResponse.json({ error: 'Missing type or mintAddress' }, { status: 400 });
    }

    // Simulate a buy transaction
    const simulatedBuyTransaction = {
      signature: `test_${Date.now()}`,
      timestamp: Math.floor(Date.now() / 1000),
      tokenTransfers: [
        {
          fromUserAccount: type === 'BUY' ? 'DeFiUser123...' : 'DfMxre4cKmvogbLrPigxmibVTTQDuzjdXojWzjCXXhzj',
          toUserAccount: type === 'BUY' ? 'DfMxre4cKmvogbLrPigxmibVTTQDuzjdXojWzjCXXhzj' : 'DeFiUser123...',
          mint: mintAddress,
          tokenAmount: type === 'BUY' ? 1000000 : 800000,
          tokenStandard: 'fungible'
        }
      ],
      nativeTransfers: [
        {
          fromUserAccount: type === 'BUY' ? 'DfMxre4cKmvogbLrPigxmibVTTQDuzjdXojWzjCXXhzj' : 'DeFiUser123...',
          toUserAccount: type === 'BUY' ? 'DeFiUser123...' : 'DfMxre4cKmvogbLrPigxmibVTTQDuzjdXojWzjCXXhzj',
          amount: type === 'BUY' ? 100000000 : 150000000 // 0.1 SOL or 0.15 SOL
        }
      ]
    };

    // Forward to webhook endpoint
    const webhookUrl = new URL('/api/webhook', request.url).toString();
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(simulatedBuyTransaction)
    });

    if (response.ok) {
      return NextResponse.json({ message: `Simulated ${type} transaction sent` });
    } else {
      return NextResponse.json({ error: 'Failed to process simulation' }, { status: 500 });
    }
  } catch (error) {
    console.error('Test endpoint error:', error);
    return NextResponse.json({ error: 'Test failed' }, { status: 500 });
  }
}