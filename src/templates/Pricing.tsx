import { Gift, Heart, MessageCircle, Palette, Sparkles, Users } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { buttonVariants } from '@/components/ui/buttonVariants';
import { Section } from '@/features/landing/Section';

export const Pricing = () => {
  const t = useTranslations('Pricing');

  return (
    <Section
      id="fiyatlandirma"
      subtitle={t('section_subtitle')}
      title={t('section_title')}
      description={t('section_description')}
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Sınırsız Ücretsiz İlham */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 p-8 dark:from-blue-950/20 dark:via-cyan-950/20 dark:to-teal-950/20">
            <div className="relative z-10">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900/30">
                  <Palette className="size-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {t('free_plan_title')}
                  </h3>
                  <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                    {t('free_plan_price')}
                  </p>
                </div>
              </div>

              <p className="mb-6 text-gray-700 dark:text-gray-300">
                {t('free_plan_description')}
              </p>

              <ul className="mb-8 space-y-3">
                <li className="flex items-center gap-3">
                  <Heart className="size-5 text-blue-500" />
                  <span className="text-gray-700 dark:text-gray-300">{t('free_feature_1')}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Sparkles className="size-5 text-blue-500" />
                  <span className="text-gray-700 dark:text-gray-300">{t('free_feature_2')}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Palette className="size-5 text-blue-500" />
                  <span className="text-gray-700 dark:text-gray-300">{t('free_feature_3')}</span>
                </li>
              </ul>

              <Link
                className={buttonVariants({
                  variant: 'outline',
                  className: 'w-full border-blue-200 bg-white/50 text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-300 dark:hover:bg-blue-900/50',
                })}
                href="/sign-up"
              >
                {t('free_plan_button')}
              </Link>
            </div>

            {/* Decorative elements */}
            <div className="absolute -right-4 -top-4 size-24 rounded-full bg-blue-200/20"></div>
            <div className="absolute -bottom-6 -left-6 size-32 rounded-full bg-cyan-200/20"></div>
          </div>

          {/* Yeni Üyelere Hediye */}
          <div className="relative scale-105 overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 p-8 shadow-xl ring-2 ring-purple-200 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-rose-950/20 dark:ring-purple-800">
            {/* Decorative ribbon effect */}
            <div className="absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-purple-500 to-pink-500"></div>

            <div className="relative z-10">
              <div className="mb-6 flex items-center gap-3">
                <div className="relative">
                  <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900/30">
                    <Gift className="size-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="absolute -right-1 -top-1 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-2 py-1 text-xs font-bold text-white">
                    +1
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {t('gift_plan_title')}
                    {' '}
                    <span className="text-purple-600">✨</span>
                  </h3>
                  <p className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                    {t('gift_plan_price')}
                  </p>
                </div>
              </div>

              <p className="mb-6 text-gray-700 dark:text-gray-300">
                {t('gift_plan_description')}
              </p>

              <ul className="mb-8 space-y-3">
                <li className="flex items-center gap-3">
                  <Gift className="size-5 text-purple-500" />
                  <span className="text-gray-700 dark:text-gray-300">{t('gift_feature_1')}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Sparkles className="size-5 text-purple-500" />
                  <span className="text-gray-700 dark:text-gray-300">{t('gift_feature_2')}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Heart className="size-5 text-purple-500" />
                  <span className="text-gray-700 dark:text-gray-300">{t('gift_feature_3')}</span>
                </li>
              </ul>

              <Link
                className={buttonVariants({
                  className: 'w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700',
                })}
                href="/sign-up"
              >
                {t('gift_plan_button')}
              </Link>
            </div>

            {/* Decorative elements */}
            <div className="absolute -right-6 -top-6 size-32 rounded-full bg-purple-200/20"></div>
            <div className="absolute -bottom-4 -left-4 size-24 rounded-full bg-pink-200/20"></div>
          </div>

          {/* Kurumsal İç Mimarlık */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-50 p-8 dark:from-gray-950/20 dark:via-slate-950/20 dark:to-zinc-950/20">
            <div className="relative z-10">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-full bg-gray-100 p-3 dark:bg-gray-900/30">
                  <Users className="size-8 text-gray-700 dark:text-gray-300" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {t('enterprise_plan_title')}
                  </h3>
                  <p className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                    {t('enterprise_plan_price')}
                  </p>
                </div>
              </div>

              <p className="mb-6 text-gray-700 dark:text-gray-300">
                {t('enterprise_plan_description')}
              </p>

              <ul className="mb-8 space-y-3">
                <li className="flex items-center gap-3">
                  <Users className="size-5 text-gray-600" />
                  <span className="text-gray-700 dark:text-gray-300">{t('enterprise_feature_1')}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Sparkles className="size-5 text-gray-600" />
                  <span className="text-gray-700 dark:text-gray-300">{t('enterprise_feature_2')}</span>
                </li>
                <li className="flex items-center gap-3">
                  <MessageCircle className="size-5 text-gray-600" />
                  <span className="text-gray-700 dark:text-gray-300">{t('enterprise_feature_3')}</span>
                </li>
              </ul>

              <Link
                className={buttonVariants({
                  variant: 'outline',
                  className: 'w-full border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800',
                })}
                href="/contact"
              >
                <MessageCircle className="mr-2 size-4" />
                {t('enterprise_plan_button')}
              </Link>
            </div>

            {/* Decorative elements */}
            <div className="absolute -right-4 -top-4 size-24 rounded-full bg-gray-200/20"></div>
            <div className="absolute -bottom-6 -left-6 size-32 rounded-full bg-slate-200/20"></div>
          </div>
        </div>
      </div>
    </Section>
  );
};
