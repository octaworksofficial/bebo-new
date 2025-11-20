'use server';

import { eq } from 'drizzle-orm';

import { db } from '@/libs/DB';
import { userSchema } from '@/models/Schema';

export async function debugAddCredits(userId: string, creditAmount: number) {
  try {
    // Önce mevcut krediyi al
    const [currentUser] = await db
      .select({ artCredits: userSchema.artCredits })
      .from(userSchema)
      .where(eq(userSchema.id, userId))
      .limit(1);

    if (!currentUser) {
      console.error(`❌ DEBUG: User not found: ${userId}`);
      return {
        success: false,
        error: 'User not found',
      };
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

    return {
      success: true,
      oldCredits: currentUser.artCredits,
      newCredits: newCreditAmount,
      addedCredits: creditAmount,
    };
  } catch (error) {
    console.error('❌ DEBUG: Error adding credits:', error);
    return {
      success: false,
      error: 'Failed to add credits',
    };
  }
}
