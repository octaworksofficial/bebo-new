'use server';

import { eq } from 'drizzle-orm';
import { createHmac } from 'crypto';

import { db } from '@/libs/DB';
import { userSchema } from '@/models/Schema';
import { Env } from '@/libs/Env';

interface PayTRCreditCallbackPayload {
  merchant_oid: string;
  status: string;
  total_amount: string;
  hash: string;
  payment_type?: string;
  failed_reason_code?: string;
  failed_reason_msg?: string;
}

/**
 * PayTR kredi ödeme callback'ini doğrular ve kredileri yükler
 */
export async function validatePayTRCreditCallback(
  payload: PayTRCreditCallbackPayload,
): Promise<{ success: boolean; error?: string; creditsAdded?: number }> {
  try {
    const { merchant_oid, status, total_amount, hash } = payload;

    // Kredi ödeme kontrolü - merchant_oid CRD ile başlıyor
    if (!merchant_oid.startsWith('CRD')) {
      return { success: false, error: 'Not a credit payment' };
    }

    // PayTR Hash doğrulaması
    const merchantKey = Env.PAYTR_MERCHANT_KEY;
    const merchantSalt = Env.PAYTR_MERCHANT_SALT;

    const expectedHash = createHmac('sha256', merchantKey)
      .update(`${merchant_oid}${merchantSalt}${status}${total_amount}`)
      .digest('base64');

    if (hash !== expectedHash) {
      return { success: false, error: 'Invalid hash signature' };
    }

    // Ödeme başarılıysa kredileri yükle
    if (status === '1') { // PayTR'de 1 = başarılı
      const creditAmount = Math.floor(parseInt(total_amount, 10) / 150); // 1.5 TL = 1 kredi
      
      // merchant_oid'den user ID'sini çıkar (format: CRD{timestamp}_{userId} veya sadece userId'yi al)
      // Güvenlik için: merchant_oid içinde user bilgisi olmalı
      const userId = merchant_oid.replace(/^CRD\d+_?/, ''); // CRD ve timestamp'i kaldır
      
      if (!userId) {
        return { success: false, error: 'Cannot extract user ID from merchant_oid' };
      }

      // Kullanıcının kredilerini güncelle
      const userRecord = await db
        .select()
        .from(userSchema)
        .where(eq(userSchema.id, userId))
        .limit(1);

      if (userRecord.length === 0) {
        // Kullanıcı kaydı yoksa oluştur
        await db.insert(userSchema).values({
          id: userId,
          artCredits: creditAmount,
        });
      } else {
        // Mevcut kredilere ekle
        const currentCredits = userRecord[0]!.artCredits;
        await db
          .update(userSchema)
          .set({
            artCredits: currentCredits + creditAmount,
            updatedAt: new Date(),
          })
          .where(eq(userSchema.id, userId));
      }

      return {
        success: true,
        creditsAdded: creditAmount,
      };
    }

    // Ödeme başarısız
    return {
      success: true, // Callback olarak başarılı (PayTR'a OK döndür)
      error: `Payment failed: ${payload.failed_reason_msg || 'Unknown error'}`,
    };
  } catch (error) {
    console.error('Credit callback validation error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}