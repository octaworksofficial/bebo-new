'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { ArrowLeft, Package, CreditCard, Shield, Loader2 } from 'lucide-react';
import { getProductPricing, type ProductPriceData } from '@/features/design/productPriceActions';
import { getGeneratedImage, getUserGeneratedImages, type GeneratedImageResponse } from '@/features/design/chatActions';
import { getPayTRToken } from '@/features/checkout/paytrActions';

type CheckoutInterfaceProps = {
  locale: string;
};

export function CheckoutInterface({ }: CheckoutInterfaceProps) {
  const t = useTranslations('Checkout');
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useUser();

  // URL parametreleri
  const generationId = searchParams.get('generationId') || '';
  const productSlug = searchParams.get('product') || '';
  const sizeSlug = searchParams.get('size') || '';
  const frameSlug = searchParams.get('frame') || '';

  // State
  const [imageData, setImageData] = useState<GeneratedImageResponse | null>(null);
  const [priceData, setPriceData] = useState<ProductPriceData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paytrToken, setPaytrToken] = useState<string | null>(null);

  // Form state
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState(user?.primaryEmailAddress?.emailAddress || '');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');

  // Görsel ve fiyat verilerini yükle
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        // Görseli yükle
        const userImagesResult = await getUserGeneratedImages();
        if (userImagesResult.success && userImagesResult.data) {
          const matchedImage = userImagesResult.data.find(
            (img) => img.generation_id === generationId
          );
          if (matchedImage) {
            setImageData(matchedImage);
          } else {
            const result = await getGeneratedImage(generationId);
            if (result.success && result.data) {
              setImageData(Array.isArray(result.data) ? result.data[0]! : result.data);
            }
          }
        }

        // Fiyatları yükle
        const pricingResult = await getProductPricing(productSlug, sizeSlug, frameSlug);
        if (pricingResult.success && pricingResult.data) {
          setPriceData(pricingResult.data);
          console.log('Price Data Loaded:', pricingResult.data);
        } else {
          console.error('Failed to load pricing:', pricingResult.error);
        }
      } catch (error) {
        console.error('Error loading checkout data:', error);
      }
      setIsLoading(false);
    }

    loadData();
  }, [generationId, productSlug, sizeSlug, frameSlug]);

  // Kullanıcı email'ini otomatik doldur
  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      setCustomerEmail(user.primaryEmailAddress.emailAddress);
    }
    if (user?.fullName) {
      setCustomerName(user.fullName);
    }
  }, [user]);

  // PayTR iframe'den gelen mesajları dinle
  useEffect(() => {
    const handlePayTRMessage = (event: MessageEvent) => {
      // Tüm mesajları logla
      console.log('📨 Message received:', {
        origin: event.origin,
        data: event.data,
        dataType: typeof event.data,
      });

      // PayTR'den gelen mesajları kontrol et
      if (event.origin === 'https://www.paytr.com') {
        console.log('✅ PayTR confirmed message:', event.data);
        
        // Ödeme başarılı
        if (event.data === 'success' || event.data?.status === 'success') {
          console.log('🎉 Payment SUCCESS - Redirecting...');
          router.push('/checkout/success');
        }
        // Ödeme başarısız
        else if (event.data === 'failed' || event.data?.status === 'failed') {
          console.log('❌ Payment FAILED - Redirecting...');
          router.push('/checkout/failed');
        }
        else {
          console.log('⚠️ Unknown PayTR message format:', event.data);
        }
      }
    };

    window.addEventListener('message', handlePayTRMessage);

    return () => {
      window.removeEventListener('message', handlePayTRMessage);
    };
  }, [router]);

  // Ödeme işlemini başlat
  const handleCompletePayment = async () => {
    if (!customerName || !customerEmail || !customerPhone || !customerAddress) {
      alert(t('fill_all_fields'));
      return;
    }

    if (!priceData || !imageData) {
      console.error('Missing data:', { priceData, imageData });
      alert('Ürün bilgileri yüklenemedi');
      return;
    }

    // ID'leri kontrol et
    if (!priceData.productId || !priceData.sizeId || !priceData.frameId) {
      console.error('Missing product IDs:', {
        productId: priceData.productId,
        sizeId: priceData.sizeId,
        frameId: priceData.frameId,
      });
      alert('Ürün bilgileri eksik. Lütfen sayfayı yenileyin.');
      return;
    }

    setIsProcessing(true);

    try {
      // Kullanıcı IP'sini al
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      const userIp = ipData.ip;

      // Sepet içeriğini hazırla (base64 encoded JSON)
      const basketItems = [
        [
          `${priceData.productName} - ${priceData.sizeName} - ${priceData.frameName}`,
          (priceData.totalPrice / 100).toFixed(2),
          1
        ]
      ];
      const userBasket = btoa(JSON.stringify(basketItems));

      console.log('Sending to PayTR:', {
        productId: priceData.productId,
        sizeId: priceData.sizeId,
        frameId: priceData.frameId,
        paymentAmount: priceData.totalPrice,
        imageUrl: imageData.image_url,
      });

      // PayTR token al
      const result = await getPayTRToken({
        generationId,
        imageUrl: imageData.image_url,
        productId: priceData.productId,
        productSizeId: priceData.sizeId,
        productFrameId: priceData.frameId,
        paymentAmount: priceData.totalPrice,
        customerName,
        customerEmail,
        customerPhone,
        customerAddress,
        userBasket,
        userIp,
      });

      if (result.success && result.token) {
        setPaytrToken(result.token);
      } else {
        alert(result.error || 'Ödeme işlemi başlatılamadı');
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Bir hata oluştu');
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto size-16 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">{t('processing_payment')}</p>
        </div>
      </div>
    );
  }

  if (!imageData || !priceData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Ürün bulunamadı</h1>
          <button
            onClick={() => router.back()}
            className="mt-4 text-purple-600 hover:underline"
          >
            Geri Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="mb-4 flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <ArrowLeft className="size-5" />
          {t('back_to_preview')}
        </button>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t('page_title')}
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {t('page_description')}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Sol: Form ve Ödeme */}
        <div className="space-y-6">
          {/* Müşteri Bilgileri */}
          {!paytrToken && (
            <>
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white">
                  <Package className="size-6 text-purple-600" />
                  {t('customer_information')}
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t('full_name')}
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder={t('full_name_placeholder')}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t('email')}
                    </label>
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder={t('email_placeholder')}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t('phone')}
                    </label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder={t('phone_placeholder')}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t('address')}
                    </label>
                    <textarea
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      placeholder={t('address_placeholder')}
                      rows={3}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Güvenli Ödeme Bildirimi */}
              <div className="flex items-center gap-3 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                <Shield className="size-6 text-green-600 dark:text-green-400" />
                <div>
                  <p className="font-semibold text-green-900 dark:text-green-100">
                    {t('secure_payment')}
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    {t('secure_payment_info')}
                  </p>
                </div>
              </div>
            </>
          )}

          {/* PayTR Ödeme Formu - Müşteri bilgileri gönderildikten sonra burada göster */}
          {paytrToken && (
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
              <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white">
                <CreditCard className="size-6 text-purple-600" />
                {t('payment_form')}
              </h2>
              <script src="https://www.paytr.com/js/iframeResizer.min.js"></script>
              <iframe
                src={`https://www.paytr.com/odeme/guvenli/${paytrToken}`}
                id="paytriframe"
                frameBorder="0"
                scrolling="no"
                style={{ width: '100%', minHeight: '1200px' }}
                className="rounded-lg"
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `iFrameResize({},'#paytriframe');`,
                }}
              />
            </div>
          )}
        </div>

        {/* Sağ: Sipariş Özeti */}
        <div>
          <div className="sticky top-8 rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              {t('order_summary')}
            </h2>

            {/* Görsel */}
            <div className="mb-6">
              <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('your_design')}
              </p>
              <img
                src={imageData.image_url}
                alt={imageData.text_prompt}
                className="w-full rounded-lg"
              />
            </div>

            {/* Ürün Detayları */}
            <div className="space-y-3 border-t border-gray-200 pt-4 dark:border-gray-700">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">{t('product')}</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {priceData.productName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">{t('size')}</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {priceData.sizeName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">{t('frame')}</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {priceData.frameName}
                </span>
              </div>
            </div>

            {/* Fiyat Hesaplama */}
            <div className="mt-4 space-y-2 border-t border-gray-200 pt-4 dark:border-gray-700">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">{t('subtotal')}</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  ₺{(priceData.totalPrice / 100).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">{t('shipping')}</span>
                <span className="font-medium text-green-600 dark:text-green-400">
                  {t('shipping_free')}
                </span>
              </div>
            </div>

            {/* Toplam */}
            <div className="mt-4 flex items-center justify-between rounded-lg bg-gradient-to-r from-purple-100 to-pink-100 p-4 dark:from-purple-900/30 dark:to-pink-900/30">
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {t('total')}
              </span>
              <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                ₺{(priceData.totalPrice / 100).toFixed(2)}
              </span>
            </div>

            {/* Ödeme Butonu - Sadece token yokken göster */}
            {!paytrToken && (
              <button
                onClick={handleCompletePayment}
                disabled={isProcessing}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4 text-lg font-semibold text-white transition-all hover:from-purple-700 hover:to-pink-700 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    {t('processing_payment')}
                  </>
                ) : (
                  <>
                    <CreditCard className="size-5" />
                    {t('complete_payment')}
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
