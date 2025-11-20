import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

import { db } from '@/libs/DB';
import { userSchema } from '@/models/Schema';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, creditAmount } = body;

    if (!userId || !creditAmount) {
      return NextResponse.json(
        { error: 'Missing userId or creditAmount' },
        { status: 400 },
      );
    }

    // Önce mevcut krediyi al
    const [currentUser] = await db
      .select({ artCredits: userSchema.artCredits })
      .from(userSchema)
      .where(eq(userSchema.id, userId))
      .limit(1);

    if (!currentUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 },
      );
    }

    // Yeni kredi miktarını hesapla
    const newCreditAmount = currentUser.artCredits + creditAmount;

    console.log(`🔧 DEBUG: Adding ${creditAmount} credits to user ${userId}`);
    console.log(`📊 DEBUG: Current: ${currentUser.artCredits} → New: ${newCreditAmount}`);

    // Kredileri güncelle
    await db
      .update(userSchema)
      .set({
        artCredits: newCreditAmount,
      })
      .where(eq(userSchema.id, userId));

    console.log(`✅ DEBUG: Successfully updated credits for user ${userId}`);

    return NextResponse.json({
      success: true,
      oldCredits: currentUser.artCredits,
      newCredits: newCreditAmount,
      addedCredits: creditAmount,
    });
  } catch (error) {
    console.error('❌ DEBUG: Error adding credits:', error);
    return NextResponse.json(
      { error: 'Failed to add credits' },
      { status: 500 },
    );
  }
}
