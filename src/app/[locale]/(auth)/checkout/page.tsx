import { getTranslations } from 'next-intl/server';
import { CheckoutInterface } from '@/features/checkout/CheckoutInterface';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Checkout',
  });

  return {
    title: t('page_title'),
    description: t('page_description'),
  };
}

export default async function CheckoutPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;

  return <CheckoutInterface locale={locale} />;
}
