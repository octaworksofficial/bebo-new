'use client';

import { useLayoutEffect } from 'react';

export const ForceDarkTheme = () => {
  useLayoutEffect(() => {
    // Save original styles
    const originalHtmlBg = document.documentElement.style.backgroundColor;
    const originalBodyBg = document.body.style.backgroundColor;
    const originalOverscroll = document.body.style.overscrollBehaviorY;

    // Apply dark theme
    document.documentElement.classList.add('dark');
    document.documentElement.style.backgroundColor = '#0a0a0f';
    document.body.style.backgroundColor = '#0a0a0f';
    document.body.style.overscrollBehaviorY = 'none';

    return () => {
      // Cleanup
      document.documentElement.classList.remove('dark');
      document.documentElement.style.backgroundColor = originalHtmlBg;
      document.body.style.backgroundColor = originalBodyBg;
      document.body.style.overscrollBehaviorY = originalOverscroll;
    };
  }, []);

  return null;
};
