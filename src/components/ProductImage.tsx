import { Frame } from 'lucide-react';
import Image from 'next/image';

import { cn } from '@/utils/Helpers';

type ProductImageProps = {
  imageUrl?: string | null;
  productName: string;
  className?: string;
  variant?: 'square' | 'wide';
  priority?: boolean;
};

export function ProductImage({
  imageUrl,
  productName,
  className,
  variant = 'square',
  priority = false,
}: ProductImageProps) {
  if (imageUrl) {
    return (
      <div className={cn('relative h-64 w-full overflow-hidden', className)}>
        <Image
          src={imageUrl}
          alt={productName}
          fill
          className="object-cover"
          priority={priority}
          sizes={variant === 'square' ? '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' : '100vw'}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    );
  }

  // Placeholder when no image
  return (
    <div
      className={cn(
        'relative h-64 w-full overflow-hidden bg-gradient-to-br from-purple-500/10 to-pink-500/10',
        className,
      )}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <Frame className="size-24 text-muted-foreground/20" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="px-4 text-center">
          <Frame className="mx-auto mb-4 size-16 text-primary" />
          <h3 className="text-xl font-bold md:text-2xl">{productName}</h3>
        </div>
      </div>
    </div>
  );
}
