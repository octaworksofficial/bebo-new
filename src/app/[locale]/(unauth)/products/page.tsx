import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { ProductSelection } from '@/features/products/ProductSelection';
import { getProducts } from '@/features/products/productActions';
import { Navbar } from '@/templates/Navbar';
import { Footer } from '@/templates/Footer';

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

const ProductsPage = async (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);

  const products = await getProducts(props.params.locale);

  return (
    <>
      <Navbar />
      <ProductSelection products={products} locale={props.params.locale} />
      <Footer />
    </>
  );
};

export default ProductsPage;
