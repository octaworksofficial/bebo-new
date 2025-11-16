import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import ContactForm from '@/features/contact/ContactForm';
import { Footer } from '@/templates/Footer';
import { Navbar } from '@/templates/Navbar';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({
    locale,
    namespace: 'Contact',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

function ContactInfo() {
  const t = useTranslations('Contact');

  return (
    <div className="bg-gray-50 rounded-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {t('info_title')}
      </h2>
      
      <div className="space-y-6">
        {/* E-posta */}
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">{t('contact_email')}</h3>
            <p className="text-gray-600">info@birebiro.com</p>
          </div>
        </div>

        {/* Telefon */}
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">{t('contact_phone')}</h3>
            <p className="text-gray-600">+90 555 123 45 67</p>
          </div>
        </div>

        {/* Adres */}
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">{t('contact_address')}</h3>
            <p className="text-gray-600">
              Maslak Mahallesi, Büyükdere Caddesi<br />
              No: 123 Kat: 5, Şişli/İstanbul
            </p>
          </div>
        </div>

        {/* Çalışma Saatleri */}
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">{t('business_hours')}</h3>
            <div className="text-gray-600">
              <p>{t('weekdays')}: 09:00 - 18:00</p>
              <p>{t('weekend')}: 10:00 - 16:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContactPage({
  searchParams,
}: {
  searchParams: { success?: string };
}) {
  const t = useTranslations('Contact');
  const isSuccess = searchParams.success === 'true';

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Başlık */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('page_title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('page_subtitle')}
            </p>
          </div>

          {/* Success Mesajı */}
          {isSuccess && (
            <div className="mb-8">
              <div className="max-w-2xl mx-auto bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-green-800">
                      {t('success_title')}
                    </h3>
                    <p className="mt-2 text-sm text-green-700">
                      {t('success_message')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* İçerik */}
          {!isSuccess ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Sol: İletişim Formu */}
              <ContactForm />
              
              {/* Sağ: İletişim Bilgileri */}
              <ContactInfo />
            </div>
          ) : (
            <div className="text-center">
              <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {t('success_title')}
                </h2>
                <p className="text-gray-600 mb-6">
                  {t('success_message')}
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  {t('send_another_message')}
                </a>
              </div>
            </div>
          )}

          {/* Alt Bilgi */}
          <div className="mt-12 text-center">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-blue-900 mb-2">
                {t('response_time_title')}
              </h3>
              <p className="text-blue-700">
                {t('response_time_description')}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}