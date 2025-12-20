'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

export const CookieConsent = () => {
  const t = useTranslations('CookieConsent');
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const acceptCookie = () => {
    setShowConsent(false);
    localStorage.setItem('cookie_consent', 'true');
  };

  if (!showConsent) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex flex-col items-center justify-between gap-4 border-t border-border bg-background/95 p-4 px-6 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/60 md:flex-row md:px-8">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">{t('title')}</h3>
        <p className="max-w-4xl text-sm text-muted-foreground">
          {t('description')}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="/legal"
          className="text-sm font-medium underline-offset-4 hover:underline"
        >
          {t('read_more')}
        </Link>
        <Button onClick={acceptCookie} variant="default">
          {t('accept')}
        </Button>
      </div>
    </div>
  );
};
