'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { buttonVariants } from '@/components/ui/buttonVariants';
import { CenteredMenu } from '@/features/landing/CenteredMenu';
import { Section } from '@/features/landing/Section';

import { Logo } from './Logo';

export const Navbar = () => {
  const t = useTranslations('Navbar');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <Section className="px-3 py-6">
      <CenteredMenu
        logo={<Logo />}
        rightMenu={(
          <>
            {/* PRO: Dark mode toggle button */}
            <li data-fade>
              <LocaleSwitcher />
            </li>
            
            {/* Giriş yapmamış kullanıcılar için */}
            <SignedOut>
              <li className="ml-1 mr-2.5" data-fade>
                <Link href="/sign-in">{t('sign_in')}</Link>
              </li>
              <li>
                <Link className={buttonVariants()} href="/sign-up">
                  {t('sign_up')}
                </Link>
              </li>
            </SignedOut>

            {/* Giriş yapmış kullanıcılar için */}
            <SignedIn>
              <li className="ml-3" data-fade>
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: 'size-9'
                    }
                  }}
                />
              </li>
            </SignedIn>
          </>
        )}
      >
        <li>
          <button
            type="button"
            className="cursor-pointer transition-colors hover:text-foreground/80"
            onClick={() => scrollToSection('ozellikler')}
          >
            {t('product')}
          </button>
        </li>

        <li>
          <button
            type="button"
            className="cursor-pointer transition-colors hover:text-foreground/80"
            onClick={() => scrollToSection('nasil-calisir')}
          >
            {t('docs')}
          </button>
        </li>

        <li>
          <button
            type="button"
            className="cursor-pointer transition-colors hover:text-foreground/80"
            onClick={() => scrollToSection('fiyatlandirma')}
          >
            {t('blog')}
          </button>
        </li>

        <li>
          <button
            type="button"
            className="cursor-pointer transition-colors hover:text-foreground/80"
            onClick={() => scrollToSection('sss')}
          >
            {t('community')}
          </button>
        </li>

        <li>
          <Link href="/sign-up">{t('company')}</Link>
        </li>
      </CenteredMenu>
    </Section>
  );
};
