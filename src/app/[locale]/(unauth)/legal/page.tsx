import Link from 'next/link';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import type { LegalDocumentListItem } from '@/features/legal/legalActions';
import { getActiveLegalDocuments } from '@/features/legal/legalActions';
import { Footer } from '@/templates/Footer';
import { Navbar, NavbarSpacer } from '@/templates/Navbar';

// Force dynamic rendering to prevent build-time database queries
export const dynamic = 'force-dynamic';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Legal',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const LegalDocumentsPage = async (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);

  const documents = await getActiveLegalDocuments(props.params.locale);
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Legal',
  });

  return (
    <>
      <Navbar />
      <NavbarSpacer />
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100">
            {t('page_title')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t('page_description')}
          </p>
        </div>

        <div className="grid gap-6">
          {documents.length === 0
            ? (
                <div className="rounded-lg border border-gray-200 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-800">
                  <p className="text-gray-600 dark:text-gray-400">
                    {t('no_documents')}
                  </p>
                </div>
              )
            : (
                documents.map((doc: LegalDocumentListItem) => (
                  <Link
                    key={doc.id}
                    href={`/${props.params.locale}/legal/${doc.slug}`}
                    className="group rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-gray-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
                        {doc.title}
                      </h2>
                      <svg
                        className="size-5 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </Link>
                ))
              )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LegalDocumentsPage;
