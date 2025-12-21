'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

import { cn } from '@/utils/Helpers';

type Props = {
  images: string[];
  productName: string;
  className?: string;
  variant?: 'square' | 'wide';
};

export const ProductCarousel = ({ images, productName, className, variant = 'square' }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play on hover
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovered && images.length > 1) {
      interval = setInterval(() => {
        setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
      }, 800); // Change image every 800ms
    }
    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  // If only one image, show it simply
  if (images.length <= 1) {
    return (
      <div className={cn(
        'relative overflow-hidden bg-gray-100 dark:bg-gray-800',
        variant === 'square' ? 'aspect-square' : 'aspect-video',
        className,
      )}
      >
        <img
          src={images[0]}
          alt={productName}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
    );
  }

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering parent click
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering parent click
    setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(index);
  };

  return (
    <div
      className={cn(
        'group/carousel relative overflow-hidden bg-gray-100 dark:bg-gray-800',
        variant === 'square' ? 'aspect-square' : 'aspect-video',
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentIndex(0); // Reset to first image on leave (optional, but cleaner)
      }}
    >
      {/* Images */}
      <div
        className="flex size-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, index) => (
          <div key={index} className="size-full shrink-0">
            <img
              src={img}
              alt={`${productName} - Image ${index + 1}`}
              className="size-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons - Visible on hover/group hover */}
      <button
        onClick={handlePrevious}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-1.5 text-white opacity-0 backdrop-blur-sm transition-opacity hover:bg-black/50 group-hover/carousel:opacity-100"
        aria-label="Previous image"
      >
        <ChevronLeft className="size-5" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-1.5 text-white opacity-0 backdrop-blur-sm transition-opacity hover:bg-black/50 group-hover/carousel:opacity-100"
        aria-label="Next image"
      >
        <ChevronRight className="size-5" />
      </button>

      {/* Bottom Gradient for Controls Visibility */}
      <div className="absolute bottom-0 left-0 z-10 h-16 w-full bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover/carousel:opacity-100" />

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={e => goToSlide(index, e)}
            className={cn(
              'rounded-full transition-all duration-300 shadow-md border border-white/20',
              currentIndex === index
                ? 'bg-white w-8 h-2.5'
                : 'bg-white/50 hover:bg-white w-2.5 h-2.5 backdrop-blur-sm',
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
