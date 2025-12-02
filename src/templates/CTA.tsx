import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export const CTA = () => {
  const t = useTranslations('CTA');

  return (
    <section className="relative overflow-hidden bg-[#0a0a0f] py-32">
      {/* Background Gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-t from-purple-500/20 to-transparent blur-3xl" />
      </div>

      {/* Animated Glow Ring */}
      <div className="absolute left-1/2 top-1/2 size-[400px] -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-0 animate-pulse rounded-full border border-purple-500/20" />
        <div className="absolute inset-4 rounded-full border border-purple-500/10 opacity-80" />
        <div className="absolute inset-8 rounded-full border border-purple-500/5 opacity-60" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2">
          <span className="size-2 animate-pulse rounded-full bg-purple-400" />
          <span className="text-sm font-medium text-purple-300">Yapay Zeka Destekli</span>
        </div>

        {/* Title */}
        <h2 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
          {t('title')}
        </h2>

        {/* Description */}
        <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-400 md:text-xl">
          {t('description')}
        </p>

        {/* CTA Button */}
        <Link
          href="/products"
          className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-semibold text-black transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(168,85,247,0.4)]"
        >
          {t('button_text')}
          <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
        </Link>

        {/* Trust Indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <svg className="size-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Ücretsiz Deneme</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="size-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Kredi Kartı Gerekmez</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="size-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Anında Başla</span>
          </div>
        </div>
      </div>
    </section>
  );
};
