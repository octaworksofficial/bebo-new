'use server';

import { eq } from 'drizzle-orm';

import { db } from '@/libs/DB';
import { orderSchema, siteSettingsSchema } from '@/models/Schema';

type EmailVariables = {
  customer_first_name: string;
  order_number: string;
  order_date: string;
  payment_status: string;
  shipping_method: string;
  shipping_address: string;
  subtotal_amount: string;
  shipping_amount: string;
  tax_amount: string;
  total_amount: string;
  item_product_name: string;
  item_variant_name: string;
  item_quantity: number;
  item_line_total: string;
  artwork_image_url: string;
  order_detail_url: string;
  support_url: string;
  order_qr_image_url: string;
  support_email: string;
  current_year: string;
};

type PostOrderEmailPayload = {
  to: string;
  subject: string;
  template_id: string;
  variables: EmailVariables;
};

export async function sendPostOrderEmail(merchantOid: string) {
  try {
    // Sipariş bilgilerini merchant_oid ile getir
    const order = await db
      .select()
      .from(orderSchema)
      .where(eq(orderSchema.merchantOid, merchantOid))
      .limit(1);

    if (order.length === 0) {
      throw new Error('Sipariş bulunamadı');
    }

    const orderData = order[0];
    if (!orderData) {
      throw new Error('Sipariş verileri eksik');
    }

    // Site ayarlarından destek e-postasını al
    const supportEmailSetting = await db
      .select({ value: siteSettingsSchema.value })
      .from(siteSettingsSchema)
      .where(eq(siteSettingsSchema.key, 'support_email'))
      .limit(1);
    const supportEmail = supportEmailSetting[0]?.value || 'destek@birebiro.com';

    // Müşteri adını parse et
    const fullName = orderData.customerName || '';
    const firstName = fullName.split(' ')[0] || 'Değerli Müşteri';

    // Sipariş numarasını formatla - merchant_oid zaten var, onu kullan
    const orderNumber = merchantOid;

    // Tarihi formatla
    const orderDate = new Date(orderData.createdAt).toLocaleDateString('tr-TR');

    // Fiyatları formatla
    const formatPrice = (amount: number) => `${amount.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL`;

    // Ürün bilgilerini hazırla
    const productName = orderData.productType === 'wall_art' ? 'Özel Tasarım Duvar Tablosu' : 'Özel Tasarım Ürün';
    const variantInfo = `${orderData.productSize || 'Standart Boyut'}${orderData.productFrame ? ` - ${orderData.productFrame} Çerçeve` : ' - Çerçevesiz'}`;

    // KDV hesapla (%20) - müşteri KDV dahil fiyat ödüyor
    const totalWithTax = orderData.totalAmount || 0; // KDV dahil toplam (müşterinin ödediği)
    const shipping = 0; // Varsayılan ücretsiz kargo
    const taxRate = 0.20;
    const subtotalWithoutTax = totalWithTax / (1 + taxRate); // KDV hariç tutar
    const taxAmount = totalWithTax - subtotalWithoutTax; // KDV tutarı

    // Teslimat adresini formatla
    const shippingAddress = [
      orderData.customerName,
      orderData.customerAddress,
      'Türkiye',
    ].filter(Boolean).join('\n');

    // E-posta payload'ını oluştur
    const emailPayload: PostOrderEmailPayload = {
      to: orderData.customerEmail || '',
      subject: 'birebiro • Siparişiniz alındı 🎨',
      template_id: 'order_confirmation_v1',
      variables: {
        customer_first_name: firstName,
        order_number: orderNumber,
        order_date: orderDate,
        payment_status: orderData.paymentStatus === 'SUCCESS' ? 'Ödeme alındı' : 'Ödeme beklemede',
        shipping_method: 'Standart kargo (2-4 iş günü)',
        shipping_address: shippingAddress,
        subtotal_amount: formatPrice(subtotalWithoutTax),
        shipping_amount: formatPrice(shipping),
        tax_amount: formatPrice(taxAmount),
        total_amount: formatPrice(totalWithTax),
        item_product_name: productName,
        item_variant_name: variantInfo,
        item_quantity: 1,
        item_line_total: formatPrice(subtotalWithoutTax),
        artwork_image_url: orderData.generatedImageUrl || '',
        order_detail_url: `https://birebiro.com/dashboard/orders/${orderData.id}`,
        support_url: 'https://birebiro.com/contact',
        order_qr_image_url: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`https://birebiro.com/dashboard/orders/${orderData.id}`)}`,
        support_email: supportEmail,
        current_year: new Date().getFullYear().toString(),
      },
    };

    // API'ye istek gönder
    const response = await fetch('https://n8n-production-14b9.up.railway.app/webhook/send-post-order-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailPayload),
    });

    if (!response.ok) {
      throw new Error(`E-posta gönderimi başarısız: ${response.status}`);
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error('E-posta gönderimi hatası:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Bilinmeyen hata' };
  }
}
