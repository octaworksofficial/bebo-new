import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { getLegalDocumentBySlug } from '@/features/legal/legalActions';
import { Footer } from '@/templates/Footer';
import { Navbar, NavbarSpacer } from '@/templates/Navbar';

// Force dynamic rendering to prevent build-time database queries
export const dynamic = 'force-dynamic';

type Props = {
  params: {
    locale: string;
    slug: string;
  };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const document = await getLegalDocumentBySlug(
    props.params.slug,
    props.params.locale,
  );

  if (!document) {
    return {
      title: 'Document Not Found',
    };
  }

  return {
    title: document.title,
    description: `${document.title} - Legal Document`,
  };
}

const LegalDocumentDetailPage = async (props: Props) => {
  unstable_setRequestLocale(props.params.locale);

  const document = await getLegalDocumentBySlug(
    props.params.slug,
    props.params.locale,
  );

  if (!document || !document.isActive) {
    notFound();
  }

  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Legal',
  });

  return (
    <>
      <Navbar />
      <NavbarSpacer />
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100">
            {document.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <time dateTime={document.updatedAt.toISOString()}>
              {t('last_updated')}
              {': '}
              {document.updatedAt.toLocaleDateString(props.params.locale)}
            </time>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {/* biome-ignore lint/security/noDangerouslySetInnerHtml: Legal content is managed by admins */}
          <div
            className="whitespace-pre-wrap text-gray-700 dark:text-gray-300"
            dangerouslySetInnerHTML={{ __html: document.content }}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LegalDocumentDetailPage;
