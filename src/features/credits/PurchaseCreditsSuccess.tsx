'use client';

import { useEffect, useState } from 'react';

import { CheckCircle, Home, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';

import { Footer } from '@/templates/Footer';
import { Navbar } from '@/templates/Navbar';

export function PurchaseCreditsSuccess() {
  const t = useTranslations('PurchaseCredits');
  const router = useRouter();
  const searchParams = useSearchParams();
  const merchantOid = searchParams.get('merchant_oid');

  const [countdown, setCountdown] = useState(5);

  // 5 saniye sonra tasarım sayfasına yönlendir
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/design');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <>
      <Navbar />

      <div className="flex min-h-screen items-center justify-center px-4 py-16">
        <div className="w-full max-w-md text-center">
          {/* Success Icon */}
          <div className="mb-6 flex justify-center">
            <div className="flex size-24 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <CheckCircle className="size-16 text-green-600 dark:text-green-400" />
            </div>
          </div>

          {/* Title */}
          <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-gray-100">
            {t('success_title')}
          </h1>

          {/* Message */}
          <p className="mb-2 text-gray-600 dark:text-gray-400">
            {t('success_message')}
          </p>

          {/* Merchant OID */}
          {merchantOid && (
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-500">
              {t('order_id')}: {merchantOid}
            </p>
          )}

          {/* Credits Info */}
          <div className="mb-8 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white shadow-lg">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="size-6" />
              <p className="text-lg font-semibold">{t('credits_added')}</p>
            </div>
          </div>

          {/* Countdown */}
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            {t('redirect_message', { seconds: countdown })}
          </p>

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => router.push('/design')}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-xl"
            >
              <Sparkles className="size-5" />
              {t('start_creating')}
            </button>

            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="flex items-center justify-center gap-2 rounded-xl border-2 border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-all hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <Home className="size-5" />
              {t('go_dashboard')}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
