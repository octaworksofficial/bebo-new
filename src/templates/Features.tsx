import { Brain, Eye, Globe, Palette, Sparkles, Truck } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export const Features = () => {
  const t = useTranslations('Features');

  const features = [
    {
      icon: Palette,
      title: t('feature1_title'),
      description: t('feature_description'),
      gradient: 'from-purple-500 to-pink-500',
      size: 'large',
      image: '/assets/images/landing/1.jpg',
    },
    {
      icon: Eye,
      title: t('feature2_title'),
      description: t('feature_description'),
      gradient: 'from-blue-500 to-cyan-500',
      size: 'small',
      image: '/assets/images/landing/2.jpg',
    },
    {
      icon: Globe,
      title: t('feature3_title'),
      description: t('feature_description'),
      gradient: 'from-green-500 to-emerald-500',
      size: 'small',
      image: '/assets/images/landing/3.jpg',
    },
    {
      icon: Brain,
      title: t('feature4_title'),
      description: t('feature_description'),
      gradient: 'from-orange-500 to-red-500',
      size: 'small',
      image: '/assets/images/landing/4.jpg',
    },
    {
      icon: Sparkles,
      title: t('feature5_title'),
      description: t('feature_description'),
      gradient: 'from-pink-500 to-rose-500',
      size: 'small',
      image: '/assets/images/landing/5.jpg',
    },
    {
      icon: Truck,
      title: t('feature6_title'),
      description: t('feature_description'),
      gradient: 'from-indigo-500 to-purple-500',
      size: 'large',
      image: '/assets/images/landing/1.jpg',
    },
  ];

  return (
    <section id="ozellikler" className="relative bg-[#0a0a0f] py-24 md:py-32">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute right-1/4 top-0 size-[500px] rounded-full bg-pink-500/10 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 size-[400px] rounded-full bg-blue-500/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-20 text-center">
          <p className="mb-4 text-sm uppercase tracking-widest text-pink-400">
            {t('section_subtitle')}
          </p>
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            {t('section_title')}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            {t('section_description')}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid auto-rows-[220px] gap-4 md:grid-cols-3">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            const isLarge = feature.size === 'large';
            return (
              <div
                key={feature.title}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 transition-all duration-500 hover:border-white/20 ${
                  isLarge ? 'md:col-span-2' : ''
                } ${idx === 0 ? 'md:row-span-2' : ''}`}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover opacity-40 grayscale transition-all duration-500 group-hover:scale-105 group-hover:opacity-60 group-hover:grayscale-0"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                </div>

                {/* Gradient glow on hover */}
                <div
                  className={`absolute -inset-px rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 blur transition-opacity duration-500 group-hover:opacity-20`}
                />

                {/* Content */}
                <div className="relative flex h-full flex-col justify-end p-6">
                  {/* Icon */}
                  <div className="mb-3">
                    <div className={`inline-flex rounded-xl bg-gradient-to-r ${feature.gradient} p-2.5 shadow-lg`}>
                      <Icon className="size-5 text-white" />
                    </div>
                  </div>

                  {/* Text */}
                  <h3 className="mb-2 text-lg font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
