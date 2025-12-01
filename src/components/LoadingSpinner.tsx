'use client';

import { useCallback, useEffect, useState } from 'react';

type LoadingSpinnerProps = {
  onLoadComplete?: () => void;
  autoHide?: boolean;
  delay?: number;
};

export function LoadingSpinner({
  onLoadComplete,
  autoHide = false,
  delay = 0,
}: LoadingSpinnerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isHiding, setIsHiding] = useState(false);

  const hide = useCallback(() => {
    setIsHiding(true);
    setTimeout(() => {
      setIsVisible(false);
      onLoadComplete?.();
    }, 500);
  }, [onLoadComplete]);

  useEffect(() => {
    if (autoHide && delay > 0) {
      const timer = setTimeout(() => {
        hide();
      }, delay);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [autoHide, delay, hide]);

  if (!isVisible) {
    return null;
  }

  return (
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
  );
}
