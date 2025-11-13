import { NextResponse } from 'next/server';

import { getUserOrders } from '@/features/orders/ordersActions';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    console.log('🔍 API /orders called');
    const orders = await getUserOrders();
    console.log('✅ Orders fetched:', orders.length);
    console.log('📦 First order:', orders[0]);
    return NextResponse.json(orders);
  } catch (error) {
    console.error('❌ Orders API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 },
    );
  }
}
