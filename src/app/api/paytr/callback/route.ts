import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { validatePayTRCallback } from '@/features/checkout/paytrActions';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * PayTR Bildirim URL (Webhook) Endpoint
 *
 * PayTR'dan ödeme sonucu bildirimi alır.
 * PayTR Paneli > Destek & Kurulum > Ayarlar > Bildirim URL'de tanımlanmalı:
 * https://yourdomain.com/api/paytr/callback
 */
export async function POST(request: NextRequest) {
  try {
    // PayTR'dan gelen POST verilerini al
    const formData = await request.formData();

    const payload = {
      merchant_oid: formData.get('merchant_oid') as string,
      status: formData.get('status') as string,
      total_amount: formData.get('total_amount') as string,
      hash: formData.get('hash') as string,
      payment_type: formData.get('payment_type') as string | undefined,
      failed_reason_code: formData.get('failed_reason_code') as string | undefined,
      failed_reason_msg: formData.get('failed_reason_msg') as string | undefined,
    };

    console.log('PayTR callback received:', {
      merchant_oid: payload.merchant_oid,
      status: payload.status,
    });

    // Callback'i doğrula ve siparişi güncelle
    const result = await validatePayTRCallback(payload);

    if (!result.success) {
      console.error('PayTR callback validation failed:', result.error);
      // Hata durumunda bile OK dönmemek gerekebilir,
      // ancak PayTR tekrar deneme yapar
      return new NextResponse('ERROR', { status: 400 });
    }

    // PayTR'a başarılı yanıt dön
    // ÖNEMLİ: Sadece "OK" yazısı, başka hiçbir şey olmamalı
    return new NextResponse('OK', {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  } catch (error) {
    console.error('PayTR callback error:', error);
    return new NextResponse('ERROR', { status: 500 });
  }
}

// GET isteğini reddet (PayTR sadece POST kullanır)
export async function GET() {
  return new NextResponse('Method not allowed', { status: 405 });
}
