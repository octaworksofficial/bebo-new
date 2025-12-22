import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { ForceDarkTheme } from '@/components/ForceDarkTheme';
import { CTA } from '@/templates/CTA';
import { FAQ } from '@/templates/FAQ';
import { Features } from '@/templates/Features';
import { Footer } from '@/templates/Footer';
import { Hero } from '@/templates/Hero';
import { HowItWorks } from '@/templates/HowItWorks';
import { Navbar } from '@/templates/Navbar';
import { Newsletter } from '@/templates/Newsletter';
import { Pricing } from '@/templates/Pricing';
import { ProcessSteps } from '@/templates/ProcessSteps';
import { Sponsors } from '@/templates/Sponsors';
import { VideoSection } from '@/templates/VideoSection';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Index',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const IndexPage = (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);

  return (
    <>
      <ForceDarkTheme />
      <Navbar />
      <Hero />
      <VideoSection />
      <HowItWorks />
      <Features />
      <FAQ />
      <Sponsors />
      <Newsletter />
      <ProcessSteps />
      <Pricing />
      <CTA />
      <Footer />
    </>
  );
};

export default IndexPage;
