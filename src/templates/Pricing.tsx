import { ArrowRight, Heart, Palette, Sparkles, Star, Truck, Wand2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const Pricing = () => {
  return (
    <section id="fiyatlandirma" className="relative overflow-hidden bg-[#0a0a0f] py-24 md:py-32">
      {/* Artistic background */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-1/4 size-[500px] rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 size-[400px] rounded-full bg-pink-600/15 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Main message */}
        <div className="mb-16 text-center md:mb-24">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2">
            <Heart className="size-4 text-pink-400" />
            <span className="text-sm text-purple-300">Sanat için eşitlik</span>
          </div>

          <h2 className="mx-auto max-w-4xl text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            birebiro'da
            <span className="relative mx-2 inline-block">
              <span className="relative z-10 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                herkesin
              </span>
              <svg className="absolute -bottom-2 left-0 h-3 w-full" viewBox="0 0 100 12" preserveAspectRatio="none">
                <path d="M0,8 Q25,0 50,8 T100,8" stroke="url(#underline-gradient)" strokeWidth="3" fill="none" strokeLinecap="round" />
                <defs>
                  <linearGradient id="underline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="50%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#f97316" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            sanat hakkı var
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg text-gray-400 md:text-xl">
            Bütçen ne olursa olsun, hayalindeki tabloyu gerçeğe dönüştür.
            <br className="hidden md:block" />
            Sanat, herkes için ulaşılabilir olmalı.
          </p>
        </div>

        {/* Two column layout */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left side - Image showcase */}
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image
                src="/assets/images/landing/2.jpg"
                alt="Sanat eseri"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Floating price tag */}
              <div className="absolute inset-x-6 bottom-6">
                <div className="rounded-2xl border border-white/20 bg-black/60 p-4 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Başlangıç fiyatı</p>
                      <p className="text-2xl font-bold text-white">
                        ₺499
                        <span className="ml-1 text-sm font-normal text-gray-400">/ tablo</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-green-500/20 px-3 py-1">
                      <Sparkles className="size-4 text-green-400" />
                      <span className="text-sm font-medium text-green-400">Uygun fiyat</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -right-4 -top-4 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
              <Star className="size-6 text-yellow-400" fill="currentColor" />
            </div>
          </div>

          {/* Right side - Value props */}
          <div className="space-y-8">
            {/* Value 1 */}
            <div className="group">
              <div className="flex gap-5">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-500/5">
                  <Wand2 className="size-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-white">
                    Yapay zeka ile tasarım
                  </h3>
                  <p className="text-gray-400">
                    En gelişmiş yapay zeka teknolojisi ile fotoğraflarınız sanata dönüşüyor. Saniyeler içinde, profesyonel kalitede.
                  </p>
                </div>
              </div>
            </div>

            {/* Value 2 */}
            <div className="group">
              <div className="flex gap-5">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500/20 to-pink-500/5">
                  <Palette className="size-6 text-pink-400" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-white">
                    Sınırsız stil seçeneği
                  </h3>
                  <p className="text-gray-400">
                    Yağlı boya, suluboya, karakalem, pop art ve daha fazlası. Hayalinizdeki stili seçin, gerisini bize bırakın.
                  </p>
                </div>
              </div>
            </div>

            {/* Value 3 */}
            <div className="group">
              <div className="flex gap-5">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-500/5">
                  <Truck className="size-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-white">
                    Ücretsiz kargo
                  </h3>
                  <p className="text-gray-400">
                    Türkiye'nin her yerine ücretsiz ve güvenli teslimat. Tablonuz özel paketlemeyle kapınıza kadar gelsin.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Link
                href="/products"
                className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 font-semibold text-white transition-all hover:gap-4 hover:shadow-lg hover:shadow-purple-500/25"
              >
                Tabloları keşfet
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </Link>

              <p className="mt-4 text-sm text-gray-500">
                ✓ Memnuniyet garantisi &nbsp; ✓ Güvenli ödeme &nbsp; ✓ 14 gün iade
              </p>
            </div>
          </div>
        </div>

        {/* Bottom quote */}
        <div className="mt-20 text-center md:mt-28">
          <blockquote className="mx-auto max-w-3xl">
            <p className="text-xl italic text-gray-400 md:text-2xl">
              "Sanat, sadece duvarlara değil, kalplere dokunmalı.
              <br />
              <span className="text-white">birebiro bunu herkes için mümkün kılıyor.</span>
              "
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
};
