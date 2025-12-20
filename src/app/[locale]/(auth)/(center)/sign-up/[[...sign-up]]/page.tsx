import { SignUp } from '@clerk/nextjs';
import { getTranslations } from 'next-intl/server';

import { AuthWelcomeHeader } from '@/components/AuthWelcomeHeader';
import { getI18nPath } from '@/utils/Helpers';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'SignUp',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const SignUpPage = (props: { params: { locale: string } }) => (
  <div className="flex flex-col items-center px-4 sm:px-6">
    {/* Promotional Banner */}
    {/* Promotional Banner */}
    <AuthWelcomeHeader />

    <SignUp path={getI18nPath('/sign-up', props.params.locale)} />
  </div>
);

export default SignUpPage;
