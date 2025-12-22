import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { StepProgressBar } from '@/components/StepProgressBar';
import { getProducts } from '@/features/products/productActions';
import { ProductSelection } from '@/features/products/ProductSelection';
import { Footer } from '@/templates/Footer';
import { Navbar, NavbarSpacer } from '@/templates/Navbar';

// Force dynamic rendering to prevent build-time database queries
export const dynamic = 'force-dynamic';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Products',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const ProductsPage = async (props: {
  params: { locale: string };
  searchParams: { imageUrl?: string };
}) => {
  unstable_setRequestLocale(props.params.locale);

  const products = await getProducts(props.params.locale);

  return (
    <>
      <Navbar />
      <NavbarSpacer />
      <StepProgressBar currentStep={1} />
      <ProductSelection
        products={products}
        locale={props.params.locale}
        imageUrl={props.searchParams.imageUrl}
      />
      <Footer />
    </>
  );
};

export default ProductsPage;
