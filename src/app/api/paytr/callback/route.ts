import { NextResponse } from 'next/server';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(_request: Request) {
  console.log('PAYTR CALLBACK REACHED (SIMPLE MODE)');
  return new NextResponse('OK');
}

export async function GET() {
  return new NextResponse('Method not allowed', { status: 405 });
}
