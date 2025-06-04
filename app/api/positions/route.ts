import { NextRequest, NextResponse } from 'next/server';

// Simple endpoint to manage positions
export async function GET() {
  try {
    // In a real app, you'd load this from a database
    const positions = {}; // This will be shared with the webhook
    
    return NextResponse.json({
      activePositions: Object.keys(positions).length,
      positions: positions
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get positions' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    // Clear all positions
    // In a real app, you'd clear from database
    return NextResponse.json({ message: 'All positions cleared' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to clear positions' }, { status: 500 });
  }
}