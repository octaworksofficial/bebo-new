'use client';

type LogoProps = {
  variant?: 'light' | 'dark' | 'auto';
  size?: 'sm' | 'md' | 'lg';
  scrollProgress?: number; // 0 to 100
  className?: string;
};

export const Logo = ({ variant = 'auto', size = 'md', scrollProgress = 0, className = '' }: LogoProps) => {
  const sizeClasses = {
    sm: 'text-xl md:text-2xl',
    md: 'text-2xl md:text-3xl',
    lg: 'text-3xl md:text-4xl',
  };

  const dotSizes = {
    sm: 'size-1.5',
    md: 'size-2',
    lg: 'size-2.5',
  };

  return (
    <div className={`group relative flex items-center ${className}`}>
      {/* Main Logo Text */}
      <span
        className={`relative tracking-wide transition-all duration-300 ${sizeClasses[size]} ${
          variant === 'light'
            ? 'text-white'
            : variant === 'dark'
              ? 'text-black'
              : 'text-white'
        }`}
        style={{ fontFamily: 'Anton, sans-serif' }}
      >
        {/* First part - solid color */}
        <span className="inline-block">
          bire
        </span>
        {/* Second part - gradient */}
        <span className="inline-block bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
          biro
        </span>
        {/* Scroll Progress Bar */}
        <span
          className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </span>

      {/* Artistic animated dot */}
      <span className={`relative ml-1 ${dotSizes[size]}`}>
        <span className="absolute inset-0 animate-ping rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-75" />
        <span className="relative block size-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500" />
      </span>
    </div>
  );
};
