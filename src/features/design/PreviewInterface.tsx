'use client';

import { ArrowLeft, Check, Frame as FrameIcon, Package, Ruler, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { useRouter } from '@/libs/i18nNavigation';

import { type GeneratedImageResponse, getGeneratedImage, getUserGeneratedImages } from './chatActions';
import { getProductPricing, type ProductPriceData } from './productPriceActions';

type PreviewInterfaceProps = {
  locale: string;
  generationId?: string;
  imageUrl?: string;
  productSlug: string;
  sizeSlug: string;
  frameSlug: string;
};

export function PreviewInterface({
  generationId,
  imageUrl,
  productSlug,
  sizeSlug,
  frameSlug,
}: PreviewInterfaceProps) {
  const t = useTranslations('Design');
  const tProducts = useTranslations('Products');
  const router = useRouter();
  const [imageData, setImageData] = useState<GeneratedImageResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [priceData, setPriceData] = useState<ProductPriceData | null>(null);
  const [isPriceLoading, setIsPriceLoading] = useState(true);

  useEffect(() => {
    async function loadImageData() {
      setIsLoading(true);
      try {
        // If we have a direct imageUrl (user uploaded image), create mock data
        if (imageUrl) {
          const mockImageData: GeneratedImageResponse = {
            id: Date.now(),
            user_id: '',
            chat_session_id: '',
            generation_id: `user-upload-${Date.now()}`,
            product_id: 0,
            product_size_id: 0,
            product_frame_id: 0,
            text_prompt: 'Kullanıcı tarafından yüklenen görsel',
            improved_prompt: '',
            image_url: imageUrl,
            uploaded_image_url: imageUrl,
            user_generation_intent: '',
            is_generate_mode: false,
            credit_used: 0,
            is_selected: false,
            updated_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
          };
          setImageData(mockImageData);
          setIsLoading(false);
          return;
        }

        // If we have generationId, load from database
        if (generationId) {
          // Try getUserGeneratedImages first to get all user's images
          const userImagesResult = await getUserGeneratedImages();

          if (userImagesResult.success && userImagesResult.data) {
            // Find the image with matching generation_id
            const matchedImage = userImagesResult.data.find(
              img => img.generation_id === generationId,
            );

            if (matchedImage) {
              setImageData(matchedImage);
              setIsLoading(false);
              return;
            }
          }

          // Fallback: try getGeneratedImage API
          const result = await getGeneratedImage(generationId);

          if (result.success && result.data) {
            const data = Array.isArray(result.data) ? result.data[0] : result.data;
            setImageData(data!);
          }
        }
      } catch (error) {
        console.error('Failed to load image:', error);
      }
      setIsLoading(false);
    }

    loadImageData();
  }, [generationId, imageUrl]);

  // Load pricing data from database
  useEffect(() => {
    async function loadPricingData() {
      setIsPriceLoading(true);
      try {
        const result = await getProductPricing(productSlug, sizeSlug, frameSlug);

        if (result.success && result.data) {
          setPriceData(result.data);
        } else {
          console.error('Failed to load pricing:', result.error);
        }
      } catch (error) {
        console.error('Error loading pricing:', error);
      }
      setIsPriceLoading(false);
    }

    loadPricingData();
  }, [productSlug, sizeSlug, frameSlug]);

  const totalPrice = priceData?.totalPrice || 0;
  const formattedPrice = (totalPrice / 100).toFixed(2);

  const handleContinueToCheckout = () => {
    // Checkout sayfasına yönlendir
    router.push(
      `/checkout?generationId=${generationId}&product=${productSlug}&size=${sizeSlug}&frame=${frameSlug}`,
    );
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto size-16 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">{t('wait_for_generation')}</p>
        </div>
      </div>
    );
  }

  if (!imageData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Görsel bulunamadı</h1>
          <p className="mt-2 text-gray-600">Lütfen tekrar deneyin</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Header with Back Button */}
      <div className="mb-8">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <ArrowLeft className="size-5" />
          <span>{t('back_to_design')}</span>
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left Side - Image Preview */}
        <div className="space-y-6">
          <div className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-xl dark:border-gray-700 dark:bg-gray-800">
            <img
              src={imageData.image_url}
              alt={imageData.text_prompt}
              className="w-full rounded-xl"
            />
          </div>

          {/* User's Prompt */}
          <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-purple-50 to-pink-50 p-6 dark:border-gray-700 dark:from-purple-900/20 dark:to-pink-900/20">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-1 size-6 shrink-0 text-purple-600 dark:text-purple-400" />
              <div>
                <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {t('your_feelings')}
                </h3>
                <p className="text-base leading-relaxed text-gray-800 dark:text-gray-200">
                  "
                  {imageData.text_prompt}
                  "
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Product Details & Pricing */}
        <div className="space-y-6">
          {/* Product Summary Card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
              {t('preview_title')}
            </h2>

            {/* Product Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
                <Package className="size-6 text-purple-600 dark:text-purple-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Ürün</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {priceData?.productName || tProducts(`product_${productSlug.replace(/-/g, '_')}`)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
                <Ruler className="size-6 text-blue-600 dark:text-blue-400" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Boyut</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {priceData?.sizeName || tProducts(`size_${sizeSlug}`)}
                  </p>
                </div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {isPriceLoading ? '...' : `₺${((priceData?.sizePrice || 0) / 100).toFixed(2)}`}
                </p>
              </div>

              <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
                <FrameIcon className="size-6 text-green-600 dark:text-green-400" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Çerçeve</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {priceData?.frameName || tProducts(`frame_${frameSlug.replace('-', '_')}`)}
                  </p>
                </div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {isPriceLoading
                    ? '...'
                    : (priceData?.framePrice === 0
                        ? tProducts('free')
                        : `₺${((priceData?.framePrice || 0) / 100).toFixed(2)}`
                      )}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="my-6 border-t border-gray-200 dark:border-gray-700" />

            {/* Total Price */}
            <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-purple-100 to-pink-100 p-6 dark:from-purple-900/30 dark:to-pink-900/30">
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {tProducts('total')}
              </span>
              <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                ₺
                {formattedPrice}
              </span>
            </div>

            {/* Continue Button */}
            <button
              type="button"
              onClick={handleContinueToCheckout}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:from-purple-700 hover:to-pink-700 hover:shadow-xl"
            >
              <Check className="size-6" />
              {t('continue_to_checkout')}
            </button>

            {/* Info Text */}
            <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
              {t('preview_info')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
