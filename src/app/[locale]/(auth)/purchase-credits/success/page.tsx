import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { PurchaseCreditsSuccess } from '@/features/credits/PurchaseCreditsSuccess';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('PurchaseCredits');

  return {
    title: t('success_title'),
  };
}

export default async function PurchaseCreditsSuccessPage() {
  return <PurchaseCreditsSuccess />;
}
