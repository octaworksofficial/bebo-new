export const Stats = () => {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0f] py-16">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute right-1/4 top-0 size-[400px] rounded-full bg-purple-500/10 blur-[100px]" />
        <div className="absolute bottom-0 left-1/4 size-[300px] rounded-full bg-pink-500/10 blur-[80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 border-t border-white/10 pt-12 md:gap-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-white md:text-4xl">10K+</div>
            <div className="mt-1 text-sm text-gray-500">Mutlu Müşteri</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white md:text-4xl">50K+</div>
            <div className="mt-1 text-sm text-gray-500">Tasarım Üretildi</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white md:text-4xl">4.9</div>
            <div className="mt-1 text-sm text-gray-500">Kullanıcı Puanı</div>
          </div>
        </div>
      </div>
    </section>
  );
};
