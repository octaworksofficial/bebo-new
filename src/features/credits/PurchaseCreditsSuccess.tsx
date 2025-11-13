'use client';

import { CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Suspense, useEffect, useState } from 'react';

import { Footer } from '@/templates/Footer';
import { Navbar } from '@/templates/Navbar';

function SuccessContent() {
  const t = useTranslations('PurchaseCredits');
  const router = useRouter();

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

      <div className="flex h-[60vh] items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          {/* Success Icon - Minimalist Green Check */}
          <div className="mb-4 flex justify-center">
            <div className="flex size-28 items-center justify-center rounded-full bg-green-500">
              <CheckCircle className="size-20 text-white" strokeWidth={2.5} />
            </div>
          </div>

          {/* Countdown */}
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t('redirect_message', { seconds: countdown })}
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}

export function PurchaseCreditsSuccess() {
  return (
    <Suspense
      fallback={(
        <div className="flex min-h-screen items-center justify-center">
          <div className="flex flex-col items-center text-center">
            <div className="size-12 animate-spin rounded-full border-4 border-gray-300 border-t-purple-600" />
            <p className="mt-4 text-gray-600 dark:text-gray-400">Yükleniyor...</p>
          </div>
        </div>
      )}
    >
      <SuccessContent />
    </Suspense>
  );
}
