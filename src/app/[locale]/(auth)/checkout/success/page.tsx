import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { CheckCircle, Package, Truck, Home } from 'lucide-react';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'CheckoutSuccess',
  });

  return {
    title: t('page_title'),
  };
}

export default async function CheckoutSuccessPage(props: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ merchant_oid?: string }>;
}) {
  const { locale } = await props.params;
  const searchParams = await props.searchParams;
  const t = await getTranslations({
    locale,
    namespace: 'CheckoutSuccess',
  });
  const merchantOid = searchParams.merchant_oid;

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <div className="text-center">
        <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <CheckCircle className="size-12 text-green-600 dark:text-green-400" />
        </div>

        <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
          {t('success_message')}
        </h1>

        <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
          {t('success_description')}
        </p>

        {merchantOid && (
          <div className="mb-8 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('order_number')}</p>
            <p className="mt-1 font-mono text-lg font-semibold text-gray-900 dark:text-white">
              {merchantOid}
            </p>
          </div>
        )}

        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            {t('what_next')}
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3 text-left">
              <Package className="mt-1 size-6 text-purple-600" />
              <p className="text-gray-700 dark:text-gray-300">{t('step1')}</p>
            </div>
            <div className="flex items-start gap-3 text-left">
              <Truck className="mt-1 size-6 text-purple-600" />
              <p className="text-gray-700 dark:text-gray-300">{t('step2')}</p>
            </div>
            <div className="flex items-start gap-3 text-left">
              <Home className="mt-1 size-6 text-purple-600" />
              <p className="text-gray-700 dark:text-gray-300">{t('step3')}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Link
            href="/dashboard"
            className="flex-1 rounded-lg border border-purple-600 bg-white px-6 py-3 font-semibold text-purple-600 transition-colors hover:bg-purple-50 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            {t('view_orders')}
          </Link>
          <Link
            href="/design"
            className="flex-1 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-semibold text-white transition-all hover:from-purple-700 hover:to-pink-700"
          >
            {t('continue_designing')}
          </Link>
        </div>
      </div>
    </div>
  );
}
