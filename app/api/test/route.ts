import { NextRequest, NextResponse } from 'next/server';

// GET endpoint for easy browser testing
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const type = url.searchParams.get('type') || 'BUY';
    const mintAddress = url.searchParams.get('mintAddress') || 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';

    // Simulate a transaction based on type
    const simulatedTransaction = {
      signature: `test_${Date.now()}`,
      timestamp: Math.floor(Date.now() / 1000),
      tokenTransfers: [
        {
          fromUserAccount: type === 'BUY' ? 'TestUser123...' : 'DfMxre4cKmvogbLrPigxmibVTTQDuzjdXojWzjCXXhzj',
          toUserAccount: type === 'BUY' ? 'DfMxre4cKmvogbLrPigxmibVTTQDuzjdXojWzjCXXhzj' : 'TestUser123...',
          mint: mintAddress,
          tokenAmount: type === 'BUY' ? 1000000 : 800000,
          tokenStandard: 'fungible'
        }
      ],
      nativeTransfers: [
        {
          fromUserAccount: type === 'BUY' ? 'DfMxre4cKmvogbLrPigxmibVTTQDuzjdXojWzjCXXhzj' : 'TestUser123...',
          toUserAccount: type === 'BUY' ? 'TestUser123...' : 'DfMxre4cKmvogbLrPigxmibVTTQDuzjdXojWzjCXXhzj',
          amount: type === 'BUY' ? 100000000 : 150000000 // 0.1 SOL or 0.15 SOL
        }
      ]
    };

    // Forward to webhook endpoint
    const baseUrl = new URL(request.url).origin;
    const webhookUrl = `${baseUrl}/api/webhook`;
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(simulatedTransaction)
    });

    if (response.ok) {
      return NextResponse.json({ 
        success: true, 
        message: `✅ ${type} alert sent to Telegram!`,
        type: type,
        token: mintAddress
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to process simulation' 
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Test endpoint error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Test failed' 
    }, { status: 500 });
  }
}

// POST endpoint for programmatic testing
export async function POST(request: NextRequest) {
  try {
    const { type, mintAddress } = await request.json();
    
    if (!type || !mintAddress) {
      return NextResponse.json({ error: 'Missing type or mintAddress' }, { status: 400 });
    }

    // Simulate a transaction
    const simulatedTransaction = {
      signature: `test_${Date.now()}`,
      timestamp: Math.floor(Date.now() / 1000),
      tokenTransfers: [
        {
          fromUserAccount: type === 'BUY' ? 'TestUser123...' : 'DfMxre4cKmvogbLrPigxmibVTTQDuzjdXojWzjCXXhzj',
          toUserAccount: type === 'BUY' ? 'DfMxre4cKmvogbLrPigxmibVTTQDuzjdXojWzjCXXhzj' : 'TestUser123...',
          mint: mintAddress,
          tokenAmount: type === 'BUY' ? 1000000 : 800000,
          tokenStandard: 'fungible'
        }
      ],
      nativeTransfers: [
        {
          fromUserAccount: type === 'BUY' ? 'DfMxre4cKmvogbLrPigxmibVTTQDuzjdXojWzjCXXhzj' : 'TestUser123...',
          toUserAccount: type === 'BUY' ? 'TestUser123...' : 'DfMxre4cKmvogbLrPigxmibVTTQDuzjdXojWzjCXXhzj',
          amount: type === 'BUY' ? 100000000 : 150000000
        }
      ]
    };

    // Forward to webhook endpoint
    const baseUrl = new URL(request.url).origin;
    const webhookUrl = `${baseUrl}/api/webhook`;
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(simulatedTransaction)
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
