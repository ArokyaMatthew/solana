import { NextRequest, NextResponse } from 'next/server';

// Telegram Bot Configuration
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Monitored wallet address
const MONITORED_WALLET = 'DfMxre4cKmvogbLrPigxmibVTTQDuzjdXojWzjCXXhzj';

// Simple in-memory storage for positions (in production, use a database)
let positions: Record<string, {
  buyPrice: number;
  buyAmount: number;
  buyTimestamp: number;
  tokenName?: string;
  tokenSymbol?: string;
}> = {};

interface HeliusWebhookPayload {
  accountData: Array<{
    account: string;
    nativeBalanceChange: number;
    tokenBalanceChanges: Array<{
      mint: string;
      rawTokenAmount: {
        decimals: number;
        tokenAmount: string;
      };
      tokenAccount: string;
      userAccount: string;
    }>;
  }>;
  description: string;
  type: string;
  source: string;
  fee: number;
  feePayer: string;
  signature: string;
  slot: number;
  timestamp: number;
  tokenTransfers: Array<{
    fromTokenAccount: string;
    fromUserAccount: string;
    mint: string;
    toTokenAccount: string;
    toUserAccount: string;
    tokenAmount: number;
    tokenStandard: string;
  }>;
  nativeTransfers: Array<{
    fromUserAccount: string;
    toUserAccount: string;
    amount: number;
  }>;
  instructions: Array<{
    accounts: string[];
    data: string;
    programId: string;
    innerInstructions: any[];
  }>;
  events: any;
}

interface TokenMetadata {
  name: string;
  symbol: string;
  image?: string;
  description?: string;
}

async function sendTelegramMessage(message: string, imageUrl?: string) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error('Telegram credentials not configured');
    return;
  }

  try {
    let method = 'sendMessage';
    let body: any = {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'HTML',
      disable_web_page_preview: !imageUrl,
    };

    // If we have an image URL, send as photo with caption
    if (imageUrl) {
      method = 'sendPhoto';
      body = {
        chat_id: TELEGRAM_CHAT_ID,
        photo: imageUrl,
        caption: message,
        parse_mode: 'HTML',
      };
    }

    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/${method}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.error('Failed to send Telegram message:', await response.text());
    }
  } catch (error) {
    console.error('Error sending Telegram message:', error);
  }
}

async function getTokenMetadata(mintAddress: string): Promise<TokenMetadata | null> {
  try {
    // Try Jupiter API first for token metadata
    const jupiterResponse = await fetch(`https://tokens.jup.ag/token/${mintAddress}`);
    if (jupiterResponse.ok) {
      const data = await jupiterResponse.json();
      return {
        name: data.name || 'Unknown Token',
        symbol: data.symbol || mintAddress.slice(0, 6),
        image: data.logoURI,
        description: data.description,
      };
    }

    // Fallback to Solana token list
    const solanaResponse = await fetch('https://raw.githubusercontent.com/solana-labs/token-list/main/src/tokens/solana.tokenlist.json');
    if (solanaResponse.ok) {
      const tokenList = await solanaResponse.json();
      const token = tokenList.tokens.find((t: any) => t.address === mintAddress);
      if (token) {
        return {
          name: token.name,
          symbol: token.symbol,
          image: token.logoURI,
        };
      }
    }

    return null;
  } catch (error) {
    console.error('Error fetching token metadata:', error);
    return null;
  }
}

async function getTokenPrice(mintAddress: string): Promise<number | null> {
  try {
    // Use Jupiter Price API
    const response = await fetch(`https://price.jup.ag/v6/price?ids=${mintAddress}`);
    if (response.ok) {
      const data = await response.json();
      return data.data?.[mintAddress]?.price || null;
    }
    return null;
  } catch (error) {
    console.error('Error fetching token price:', error);
    return null;
  }
}

function calculateProfit(buyPrice: number, sellPrice: number): { multiplier: string; profit: number; isProfit: boolean } {
  const multiplier = sellPrice / buyPrice;
  const profit = ((sellPrice - buyPrice) / buyPrice) * 100;
  
  return {
    multiplier: multiplier.toFixed(2) + 'x',
    profit: Math.abs(profit),
    isProfit: profit > 0
  };
}

async function createBuyMessage(mintAddress: string, amount: number, solSpent: number, metadata: TokenMetadata | null): Promise<{ message: string; imageUrl?: string }> {
  const tokenName = metadata?.name || 'Unknown Token';
  const tokenSymbol = metadata?.symbol || mintAddress.slice(0, 6);
  
  let message = `🟢 <b>BUY</b>\n\n`;
  message += `🪙 <b>Token:</b> ${tokenName} (${tokenSymbol})\n`;
  message += `🔗 <b>Token Address:</b> ${mintAddress}`;

  return {
    message,
    imageUrl: metadata?.image
  };
}

async function createSellMessage(
  mintAddress: string, 
  amount: number, 
  solReceived: number, 
  metadata: TokenMetadata | null,
  profitData: { multiplier: string; profit: number; isProfit: boolean } | null
): Promise<{ message: string; imageUrl?: string }> {
  const tokenName = metadata?.name || 'Unknown Token';
  const tokenSymbol = metadata?.symbol || mintAddress.slice(0, 6);
  
  let message = `🔴 <b>SELL</b>\n\n`;
  message += `🪙 <b>Token:</b> ${tokenName} (${tokenSymbol})\n`;
  message += `🔗 <b>Token Address:</b> ${mintAddress}`;
  
  if (profitData) {
    const profitSign = profitData.isProfit ? '+' : '-';
    message += `\n\n📈 <b>Result:</b> ${profitData.multiplier} (${profitSign}${profitData.profit.toFixed(1)}%)`;
  }

  return {
    message,
    imageUrl: metadata?.image
  };
}

function detectTradingAction(transaction: HeliusWebhookPayload): { type: 'BUY' | 'SELL' | null; mintAddress: string; tokenAmount: number; solAmount: number } | null {
  // Look for token transfers and SOL transfers in the same transaction
  const tokenTransfers = transaction.tokenTransfers || [];
  const nativeTransfers = transaction.nativeTransfers || [];
  
  for (const tokenTransfer of tokenTransfers) {
    if (tokenTransfer.fromUserAccount === MONITORED_WALLET || tokenTransfer.toUserAccount === MONITORED_WALLET) {
      // Find corresponding SOL transfer
      const solTransfer = nativeTransfers.find(transfer => 
        (transfer.fromUserAccount === MONITORED_WALLET && tokenTransfer.toUserAccount === MONITORED_WALLET) ||
        (transfer.toUserAccount === MONITORED_WALLET && tokenTransfer.fromUserAccount === MONITORED_WALLET)
      );

      if (solTransfer) {
        const solAmount = solTransfer.amount / 1_000_000_000; // Convert lamports to SOL
        
        if (tokenTransfer.toUserAccount === MONITORED_WALLET && solTransfer.fromUserAccount === MONITORED_WALLET) {
          // Receiving tokens, spending SOL = BUY
          return {
            type: 'BUY',
            mintAddress: tokenTransfer.mint,
            tokenAmount: tokenTransfer.tokenAmount,
            solAmount: solAmount
          };
        } else if (tokenTransfer.fromUserAccount === MONITORED_WALLET && solTransfer.toUserAccount === MONITORED_WALLET) {
          // Sending tokens, receiving SOL = SELL
          return {
            type: 'SELL',
            mintAddress: tokenTransfer.mint,
            tokenAmount: tokenTransfer.tokenAmount,
            solAmount: solAmount
          };
        }
      }
    }
  }
  
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('Received webhook:', JSON.stringify(body, null, 2));

    const transactions = Array.isArray(body) ? body : [body];

    for (const transaction of transactions) {
      const tradingAction = detectTradingAction(transaction);
      
      if (tradingAction) {
        const { type, mintAddress, tokenAmount, solAmount } = tradingAction;
        const metadata = await getTokenMetadata(mintAddress);
        const currentPrice = await getTokenPrice(mintAddress);
        
        if (type === 'BUY') {
          // Store position for profit calculation
          if (currentPrice) {
            positions[mintAddress] = {
              buyPrice: currentPrice,
              buyAmount: tokenAmount,
              buyTimestamp: transaction.timestamp,
              tokenName: metadata?.name,
              tokenSymbol: metadata?.symbol
            };
          }
          
          const { message, imageUrl } = await createBuyMessage(mintAddress, tokenAmount, solAmount, metadata);
          await sendTelegramMessage(message, imageUrl);
          
        } else if (type === 'SELL') {
          let profitData: { multiplier: string; profit: number; isProfit: boolean } | null = null;
          
          // Calculate profit if we have the buy data
          if (positions[mintAddress] && currentPrice) {
            profitData = calculateProfit(positions[mintAddress].buyPrice, currentPrice);
            // Remove position after selling
            delete positions[mintAddress];
          }
          
          const { message, imageUrl } = await createSellMessage(mintAddress, tokenAmount, solAmount, metadata, profitData);
          await sendTelegramMessage(message, imageUrl);
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({ 
    status: 'active', 
    timestamp: new Date().toISOString(),
    monitoredWallet: MONITORED_WALLET,
    activePositions: Object.keys(positions).length
  });
}