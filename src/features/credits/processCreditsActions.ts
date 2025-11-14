'use server';

import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import { db } from '@/libs/DB';
import { userSchema } from '@/models/Schema';

// Geçici kredi işlemi kayıt sistemi - merchant_oid bazlı güvenlik
const processedTransactions = new Set<string>();

/**
 * PayTR'den gelen merchant_oid ile güvenli kredi yükleme
 * Merchant_oid'yi kullanarak aynı işlemin tekrar edilmesini önler
 */
export async function processSuccessfulCreditPurchase(
  merchantOid: string,
  creditAmount: number = 10,
): Promise<{
    success: boolean;
    message: string;
    creditsAdded?: number;
  }> {
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: 'Kullanıcı girişi bulunamadı',
      };
    }

    // Güvenlik kontrolü: merchant_oid daha önce işlendiyse reddet
    if (processedTransactions.has(merchantOid)) {
      return {
        success: false,
        message: 'Bu kredi satın alma işlemi daha önce tamamlanmış',
      };
    }

    // Merchant_oid format kontrolü (PayTR formatı: kullanıcıID_timestamp formatında olmalı)
    if (!merchantOid || !merchantOid.includes(userId)) {
      return {
        success: false,
        message: 'Geçersiz işlem numarası',
      };
    }

    // Kullanıcının mevcut kredilerini getir
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

    // İşlemi tamamlandı olarak kaydet
    processedTransactions.add(merchantOid);

    // Cache'i temizle
    revalidatePath('/design');
    revalidatePath('/purchase-credits');

    return {
      success: true,
      message: `${creditAmount} Sanat Hakkı başarıyla hesabınıza eklendi`,
      creditsAdded: creditAmount,
    };
  } catch (error) {
    console.error('Credit processing error:', error);
    return {
      success: false,
      message: 'Kredi yükleme sırasında bir hata oluştu',
    };
  }
}