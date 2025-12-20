'use client';

type LogoProps = {
  variant?: 'light' | 'dark' | 'auto';
  size?: 'sm' | 'md' | 'lg';
  scrollProgress?: number; // 0 to 100
  className?: string;
};

export const Logo = ({ variant = 'auto', size = 'md', className = '' }: LogoProps) => {
  const sizeClasses = {
    sm: 'text-xl md:text-2xl',
    md: 'text-2xl md:text-3xl',
    lg: 'text-3xl md:text-4xl',
  };

  return (
    <div className={`group relative flex items-center ${className}`}>
      {/* Main Logo Text */}
      <span
        className={`font-anton tracking-wide transition-all duration-300 ${sizeClasses[size]} ${variant === 'light'
          ? 'text-white'
          : variant === 'dark'
            ? 'text-black'
            : 'text-white'
        }`}
      >
        birebiro
      </span>
    </div>
  );
};
