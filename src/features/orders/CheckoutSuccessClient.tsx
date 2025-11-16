'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { sendPostOrderEmail } from '@/features/orders/emailActions';

export function CheckoutSuccessClient() {
  const searchParams = useSearchParams();
  const merchantOid = searchParams.get('merchant_oid');

  useEffect(() => {
    const sendEmail = async () => {
      if (merchantOid) {
        // merchant_oid'den order ID'yi çıkar
        // Örneğin: "BB-2025-000123" formatından 123'ü çıkar
        const orderIdMatch = merchantOid.match(/(\d+)$/);
        if (orderIdMatch?.[1]) {
          const orderId = Number.parseInt(orderIdMatch[1], 10);

          try {
            const result = await sendPostOrderEmail(orderId);
            if (!result.success) {
              console.error('E-posta gönderimi hatası:', result.error);
            }
          } catch (error) {
            console.error('E-posta gönderimi hatası:', error);
          }
        }
      }
    };

    // Sadece bir kez gönder
    sendEmail();
  }, [merchantOid]);

  // Bu component sadece e-posta gönderimi için, render etmiyor
  return null;
}
