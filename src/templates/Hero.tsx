'use client';

import { TwitterLogoIcon } from '@radix-ui/react-icons';
import { Loader2, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
    <Section className="py-36">
      <CenteredHero
        banner={(
          <a
            className={badgeVariants()}
            href="https://twitter.com/ixartz"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterLogoIcon className="mr-1 size-5" />
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
          <>
            <Link
              className={buttonVariants({ size: 'lg' })}
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
                : t('primary_button')}
            </Link>

            <a
              className={buttonVariants({ variant: 'outline', size: 'lg' })}
              href="https://github.com/ixartz/SaaS-Boilerplate"
            >
              <Sparkles className="mr-2 size-5" />
              {t('secondary_button')}
            </a>
          </>
        )}
      />
    </Section>
  );
};
