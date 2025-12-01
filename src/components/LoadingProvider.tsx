'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';

import { LoadingContext } from '@/hooks/useLoading';

function LoadingProviderContent({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true); // Start with loading for initial page load
  const [isHiding, setIsHiding] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const showLoading = useCallback(() => {
    setIsHiding(false);
    setIsLoading(true);
  }, []);

  const hideLoading = useCallback(() => {
    setIsHiding(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsHiding(false);
    }, 500);
  }, []);

  // Initial page load - hide after content is ready
  useEffect(() => {
    const timer = setTimeout(() => {
      hideLoading();
    }, 1500); // Delay to show the beautiful animation
    return () => clearTimeout(timer);
  }, [hideLoading]);

  // Route change detection
  useEffect(() => {
    hideLoading();
  }, [pathname, searchParams, hideLoading]);

  const contextValue = useMemo(() => ({
    isLoading,
    showLoading,
    hideLoading,
  }), [isLoading, showLoading, hideLoading]);

  return (
    <LoadingContext.Provider value={contextValue}>
      {isLoading && (
        <div className={`loader-container ${isHiding ? 'loader-hiding' : ''}`}>
          {/* Background Glows */}
          <div className="bg-glow bg-glow-1" />
          <div className="bg-glow bg-glow-2" />

          {/* Particles */}
          <div className="particles">
            <div className="particle" />
            <div className="particle" />
            <div className="particle" />
            <div className="particle" />
            <div className="particle" />
            <div className="particle" />
            <div className="particle" />
            <div className="particle" />
          </div>

          {/* Art Circle */}
          <div className="art-circle">
            {/* Rings */}
            <div className="ring" />
            <div className="ring" />
            <div className="ring" />

            {/* AI Core */}
            <div className="ai-core">
              <div className="morph-shape" />
              <div className="inner-glow" />
            </div>

            {/* Orbits */}
            <div className="orbit">
              <div className="orbit-dot" />
            </div>
            <div className="orbit">
              <div className="orbit-dot" />
            </div>
            <div className="orbit">
              <div className="orbit-dot" />
            </div>
          </div>
        </div>
      )}
      {children}
    </LoadingContext.Provider>
  );
}

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <LoadingProviderContent>{children}</LoadingProviderContent>
    </Suspense>
  );
}
