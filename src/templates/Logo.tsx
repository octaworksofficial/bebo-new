import Image from 'next/image';

export const Logo = () => (
  <div className="flex items-center">
    <Image
      src="/assets/images/Birebiro-logo.svg"
      alt="Birebiro"
      width={120}
      height={40}
      priority
    />
  </div>
);
