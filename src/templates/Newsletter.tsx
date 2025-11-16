'use client';

import { CheckCircle, Loader2, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { buttonVariants } from '@/components/ui/buttonVariants';
import { Section } from '@/features/landing/Section';
import { subscribeToNewsletter } from '@/features/newsletter/newsletterActions';

export function Newsletter() {
  const t = useTranslations('Newsletter');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError(t('error_empty_email'));
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await subscribeToNewsletter(email);
      
      if (result.success) {
        setIsSuccess(true);
        setEmail('');
      } else {
        setError(result.error || t('error_general'));
      }
    } catch {
      setError(t('error_general'));
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <Section className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center text-white">
            <div className="mb-6">
              <div className="relative mb-4 flex justify-center">
                <div className="absolute inset-0 scale-150 rounded-full bg-white/20 blur-xl" />
                <CheckCircle className="relative size-16 text-green-200" />
              </div>
              <h2 className="mb-2 text-3xl font-bold md:text-4xl">
                {t('success_title')}
              </h2>
              <p className="text-lg opacity-90 md:text-xl">
                {t('success_subtitle')}
              </p>
            </div>
            
            <p className="mb-6 text-sm opacity-75">
              {t('success_message')}
            </p>
            <button
              type="button"
              onClick={() => setIsSuccess(false)}
              className="mt-6 text-sm underline opacity-75 hover:opacity-100"
            >
              {t('subscribe_another')}
            </button>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section className="bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center text-white">
          {/* İkon ve Başlık */}
          <div className="mb-6">
            <div className="relative mb-4 flex justify-center">
              <div className="absolute inset-0 scale-150 rounded-full bg-white/10 blur-xl" />
              <Mail className="relative size-16 text-blue-300" />
            </div>
            <h2 className="mb-2 text-3xl font-bold md:text-4xl">
              {t('title')}
            </h2>
            <p className="text-lg opacity-90 md:text-xl">
              {t('subtitle')}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="flex flex-col gap-4 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={t('email_placeholder')}
                className="flex-1 rounded-lg border border-gray-600 bg-gray-800/50 px-4 py-3 text-white backdrop-blur-sm placeholder:text-gray-400 focus:border-blue-400 focus:bg-gray-800/70 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className={`${buttonVariants({
                  variant: 'outline',
                  size: 'lg',
                })} border-blue-400 bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50`}
              >
                {isLoading
                  ? (
                      <>
                        <Loader2 className="mr-2 size-5 animate-spin" />
                        {t('subscribing')}
                      </>
                    )
                  : (
                      t('subscribe_button')
                    )}
              </button>
            </div>
            
            {error && (
              <p className="mt-3 text-sm text-red-200">
                {error}
              </p>
            )}
          </form>

          {/* Alt Metin */}
          <p className="mt-4 text-sm text-gray-300">
            {t('privacy_note')}
          </p>
        </div>
      </div>
    </Section>
  );
}