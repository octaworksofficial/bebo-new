'use client';

import { Loader2, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { badgeVariants } from '@/components/ui/badgeVariants';
import { buttonVariants } from '@/components/ui/buttonVariants';
import { CenteredHero } from '@/features/landing/CenteredHero';
import { Section } from '@/features/landing/Section';

export const Hero = () => {
  const t = useTranslations('Hero');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleStartDesigning = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsLoading(true);
    router.push('/products');
  };

  return (
    <Section className="bg-gray-900 py-48 dark:bg-gray-950">
      <CenteredHero
        banner={(
          <a
            className={badgeVariants()}
            href="https://twitter.com/ixartz"
            target="_blank"
            rel="noopener noreferrer"
          >
            {' '}
            {t('follow_twitter')}
          </a>
        )}
        title={t.rich('title', {
          important: chunks => (
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {chunks}
            </span>
          ),
        })}
        description={t('description')}
        buttons={(
          <div className="relative p-6">
            {/* Light Box Background - Daha görünür */}
            <div className="absolute inset-0 bg-white/30 backdrop-blur-md rounded-2xl -z-10 rotate-1 scale-105 shadow-xl" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/40 via-purple-400/40 to-pink-400/40 rounded-2xl -z-10 -rotate-1 scale-110 shadow-lg" />
            <div className="absolute inset-0 bg-white/20 rounded-2xl -z-10 scale-100 animate-pulse" />
            
            <Link
              className={`${buttonVariants({ size: 'lg' })} relative group shadow-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 border-0`}
              href="/products"
              onClick={handleStartDesigning}
            >
              {isLoading
                ? (
                    <>
                      <Loader2 className="mr-2 size-5 animate-spin" />
                      Yükleniyor...
                    </>
                  )
                : (
                    <>
                      <Sparkles className="mr-2 size-5 group-hover:animate-pulse text-yellow-200" />
                      {t('primary_button')}
                    </>
                  )}
            </Link>
          </div>
        )}
      />
    </Section>
  );
};
