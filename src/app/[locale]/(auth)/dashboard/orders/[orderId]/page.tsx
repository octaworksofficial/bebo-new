import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';

import OrderDetailClient from '@/features/orders/OrderDetailClient';
import { getOrderDetail } from '@/features/orders/ordersActions';

type OrderDetailPageProps = {
  params: Promise<{ locale: string; orderId: string }>;
};

export async function generateMetadata(props: OrderDetailPageProps): Promise<Metadata> {
  const { orderId } = await props.params;

  return {
    title: `Sipariş Detayı #${orderId} - Birebiro`,
    description: 'Sipariş detaylarını görüntüleyin',
  };
}

export default async function OrderDetailPage(props: OrderDetailPageProps) {
  const { locale, orderId } = await props.params;

  unstable_setRequestLocale(locale);

  try {
    const orderDetail = await getOrderDetail(orderId);

    if (!orderDetail) {
      notFound();
    }

    return <OrderDetailClient orderDetail={orderDetail} />;
  } catch (error) {
    console.error('Error loading order detail:', error);
    notFound();
  }
}
