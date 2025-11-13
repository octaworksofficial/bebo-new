import { SignIn } from '@clerk/nextjs';
import { Sparkles } from 'lucide-react';
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
    {/* Promotional Banner */}
    <div className="mb-6 w-full max-w-[400px] rounded-xl border-2 border-purple-200 bg-purple-50 p-4 text-center dark:border-purple-800 dark:bg-purple-950">
      <div className="flex items-center justify-center gap-2 text-purple-900 dark:text-purple-100">
        <Sparkles className="size-5" />
        <h2 className="text-lg font-bold">Yeni misin? 1 Ücretsiz Sanat Hakkı Kazan!</h2>
      </div>
      <p className="mt-1 text-sm text-purple-700 dark:text-purple-300">
        Üye ol ve ilk görselin bizden hediye! 🎨
      </p>
    </div>

    <SignIn path={getI18nPath('/sign-in', props.params.locale)} />
  </div>
);

export default SignInPage;
