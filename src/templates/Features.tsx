import { Brain, Eye, Globe, Palette, Sparkles, Truck } from 'lucide-react';
import { useTranslations } from 'next-intl';

import MagicBento from '@/components/MagicBento';

export const Features = () => {
  const t = useTranslations('Features');

  const features = [
    {
      icon: Palette,
      title: t('feature1_title'),
      description: t('feature1_description'),
      gradient: 'from-purple-500 to-pink-500',
      image: '/assets/images/landing/1.jpg',
    },
    {
      icon: Eye,
      title: t('feature2_title'),
      description: t('feature2_description'),
      gradient: 'from-blue-500 to-cyan-500',
      image: '/assets/images/landing/2.jpg',
    },
    {
      icon: Globe,
      title: t('feature3_title'),
      description: t('feature3_description'),
      gradient: 'from-green-500 to-emerald-500',
      image: '/assets/images/landing/3.jpg',
    },
    {
      icon: Brain,
      title: t('feature4_title'),
      description: t('feature4_description'),
      gradient: 'from-orange-500 to-red-500',
      image: '/assets/images/landing/4.jpg',
    },
    {
      icon: Sparkles,
      title: t('feature5_title'),
      description: t('feature5_description'),
      gradient: 'from-pink-500 to-rose-500',
      image: '/assets/images/landing/5.jpg',
    },
    {
      icon: Truck,
      title: t('feature6_title'),
      description: t('feature6_description'),
      gradient: 'from-indigo-500 to-purple-500',
      image: '/assets/images/landing/1.jpg',
    },
  ];

  const bentoCards = features.map(feature => ({
    title: feature.title,
    description: feature.description,
    icon: <feature.icon className="size-6 text-white" />,
    color: '#1a1a2e',
    backgroundImage: feature.image,
  }));

  return (
    <section id="ozellikler" className="relative bg-[#0a0a0f] py-24 md:py-32">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute right-1/4 top-0 size-[500px] rounded-full bg-pink-500/10 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 size-[400px] rounded-full bg-blue-500/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6">
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

        {/* Magic Bento Grid */}
        <div className="flex w-full justify-center">
          <MagicBento
            cards={bentoCards}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            spotlightRadius={300}
            particleCount={20}
          />
        </div>
      </div>
    </section>
  );
};
