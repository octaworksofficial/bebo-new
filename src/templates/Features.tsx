import { useTranslations } from 'next-intl';

import { Background } from '@/components/Background';
import { FeatureCard } from '@/features/landing/FeatureCard';
import { Section } from '@/features/landing/Section';

export const Features = () => {
  const t = useTranslations('Features');

  return (
    <Background>
      <Section
        id="ozellikler"
        subtitle={t('section_subtitle')}
        title={t('section_title')}
        description={t('section_description')}
      >
        <div className="grid grid-cols-1 gap-x-3 gap-y-8 md:grid-cols-3">
          <FeatureCard
            icon={(
              <svg
                className="stroke-primary-foreground stroke-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M0 0h24v24H0z" stroke="none" />
                <path d="M4 7V4h16v3M5 20h6M13 4v16M15 9h2a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-2v-5z" />
                <path d="M13 14h2a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-2v-5z" />
              </svg>
            )}
            title={t('feature1_title')}
          >
            {t('feature_description')}
          </FeatureCard>

          <FeatureCard
            icon={(
              <svg
                className="stroke-primary-foreground stroke-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M0 0h24v24H0z" stroke="none" />
                <path d="M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" />
              </svg>
            )}
            title={t('feature2_title')}
          >
            {t('feature_description')}
          </FeatureCard>

          <FeatureCard
            icon={(
              <svg
                className="stroke-primary-foreground stroke-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M0 0h24v24H0z" stroke="none" />
                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                <path d="M3.6 9h16.8" />
                <path d="M3.6 15h16.8" />
                <path d="M11.5 3a17 17 0 0 0 0 18" />
                <path d="M12.5 3a17 17 0 0 1 0 18" />
              </svg>
            )}
            title={t('feature3_title')}
          >
            {t('feature_description')}
          </FeatureCard>

          <FeatureCard
            icon={(
              <svg
                className="stroke-primary-foreground stroke-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M0 0h24v24H0z" stroke="none" />
                <path d="M3 17v1a2 2 0 0 0 2 2h14a2 2 0 0 0 2 -2v-1" />
                <path d="M8 3v1a2 2 0 0 0 2 2h4a2 2 0 0 0 2 -2v-1" />
                <path d="M12 4v4" />
                <path d="M8 8h8" />
                <path d="M10 12h4" />
                <path d="M12 12v4" />
              </svg>
            )}
            title={t('feature4_title')}
          >
            {t('feature_description')}
          </FeatureCard>

          <FeatureCard
            icon={(
              <svg
                className="stroke-primary-foreground stroke-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M0 0h24v24H0z" stroke="none" />
                <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
                <path d="M8 3v4" />
                <path d="M16 3v4" />
                <path d="M9 12l2 2l4 -4" />
              </svg>
            )}
            title={t('feature5_title')}
          >
            {t('feature_description')}
          </FeatureCard>

          <FeatureCard
            icon={(
              <svg
                className="stroke-primary-foreground stroke-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M0 0h24v24H0z" stroke="none" />
                <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M5 17h-2v-11a1 1 0 0 1 1 -1h9v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" />
              </svg>
            )}
            title={t('feature6_title')}
          >
            {t('feature_description')}
          </FeatureCard>
        </div>
      </Section>
    </Background>
  );
};
