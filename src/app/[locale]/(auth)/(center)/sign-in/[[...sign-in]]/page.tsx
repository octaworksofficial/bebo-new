import { SignIn } from '@clerk/nextjs';
import { Gift } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { getI18nPath } from '@/utils/Helpers';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'SignIn',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const SignInPage = (props: { params: { locale: string } }) => (
  <div className="flex flex-col items-center px-4 sm:px-6">
    {/* Welcome Offer Banner */}
    <div className="mb-6 w-full max-w-[400px] overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-px shadow-lg">
      <div className="rounded-2xl bg-white px-5 py-4 dark:bg-gray-900">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600">
            <Gift className="size-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">
              Hoş geldin hediyesi
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Üye ol,
              {' '}
              <span className="font-medium text-purple-600 dark:text-purple-400">1 ücretsiz kredi</span>
              {' '}
              kazan
            </p>
          </div>
        </div>
      </div>
    </div>

    <SignIn path={getI18nPath('/sign-in', props.params.locale)} />
  </div>
);

export default SignInPage;
