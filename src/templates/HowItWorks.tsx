import { useTranslations } from 'next-intl';
import { Package, Sparkles, ShoppingCart } from 'lucide-react';

const HowItWorks = () => {
  const t = useTranslations('HowItWorks');

  const steps = [
    {
      number: '01',
      icon: Package,
      titleKey: 'step1_title',
      descriptionKey: 'step1_description',
      color: 'from-purple-500 to-pink-500',
    },
    {
      number: '02',
      icon: Sparkles,
      titleKey: 'step2_title',
      descriptionKey: 'step2_description',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      number: '03',
      icon: ShoppingCart,
      titleKey: 'step3_title',
      descriptionKey: 'step3_description',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <div id="nasil-calisir" className="bg-gradient-to-b from-background to-muted/20">
      <div className="mx-auto max-w-screen-xl px-3 py-16 md:py-24">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            {t('section_title')}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {t('section_subtitle')}
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="group relative"
              >
                {/* Connecting Line (hidden on mobile, shown on desktop between cards) */}
                {index < steps.length - 1 && (
                  <div className="absolute left-full top-1/3 hidden h-0.5 w-full -translate-y-1/2 md:block">
                    <div className="h-full w-full bg-gradient-to-r from-primary/50 to-transparent" />
                  </div>
                )}

                {/* Card */}
                <div className="relative h-full rounded-2xl border bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-lg">
                  {/* Step Number */}
                  <div className="mb-6">
                    <span className={`bg-gradient-to-r ${step.color} bg-clip-text text-5xl font-bold text-transparent`}>
                      {step.number}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="mb-6">
                    <div className={`inline-flex rounded-xl bg-gradient-to-r ${step.color} p-3`}>
                      <Icon className="size-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="mb-3 text-xl font-semibold">
                    {t(step.titleKey)}
                  </h3>
                  <p className="text-muted-foreground">
                    {t(step.descriptionKey)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { HowItWorks };
