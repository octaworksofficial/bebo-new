import { getTranslations } from 'next-intl/server';

import { getUserOrders } from '@/features/orders/ordersActions';
import { OrdersList } from '@/features/orders/OrdersList';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Orders',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function OrdersPage() {
  const orders = await getUserOrders();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Siparişlerim</h1>
        <p className="mt-2 text-muted-foreground">
          Geçmiş siparişlerinizi görüntüleyin ve takip edin
        </p>
      </div>

      <OrdersList initialOrders={orders} />
    </div>
  );
}

export const dynamic = 'force-dynamic';
