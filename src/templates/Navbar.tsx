'use client';

import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { buttonVariants } from '@/components/ui/buttonVariants';
import { CenteredMenu } from '@/features/landing/CenteredMenu';
import { Section } from '@/features/landing/Section';

import { Logo } from './Logo';

export const Navbar = () => {
  const t = useTranslations('Navbar');
  const pathname = usePathname();
  const router = useRouter();

  const scrollToSection = (sectionId: string) => {
    // Eğer ana sayfada değilsek, önce ana sayfaya git
    if (pathname !== '/' && !pathname.endsWith('/')) {
      router.push(`/#${sectionId}`);
      // Sayfa yüklendikten sonra scroll yap
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }, 500);
    } else {
      // Ana sayfadaysak direkt scroll yap
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
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
                      avatarBox: 'size-9',
                    },
                  }}
                >
                  <UserButton.MenuItems>
                    <UserButton.Link
                      label="Geçmiş Siparişlerim"
                      labelIcon={(
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      )}
                      href="/dashboard/orders"
                    />
                  </UserButton.MenuItems>
                </UserButton>
              </li>
            </SignedIn>
          </>
        )}
      >
        <li>
          <Link
            href="/products"
            className="cursor-pointer transition-colors hover:text-foreground/80"
          >
            {t('products')}
          </Link>
        </li>

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
          <Link href="/about" className="transition-colors hover:text-foreground/80">
            Hakkımızda
          </Link>
        </li>

        <li>
          <Link href="/contact">{t('company')}</Link>
        </li>
      </CenteredMenu>
    </Section>
  );
};
