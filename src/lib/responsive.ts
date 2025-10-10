/**
 * Responsive utilities for REJLERS frontend
 * Provides consistent responsive behavior across all devices
 */

import { useEffect, useState } from 'react';

// Breakpoint definitions (matching Tailwind config)
export const BREAKPOINTS = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '3xl': 1920,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

/**
 * Hook to detect current screen size
 */
export function useResponsive() {
  const [screenSize, setScreenSize] = useState<{
    width: number;
    height: number;
    breakpoint: Breakpoint;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
  }>({
    width: 0,
    height: 0,
    breakpoint: 'xs',
    isMobile: true,
    isTablet: false,
    isDesktop: false,
  });

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      let breakpoint: Breakpoint = 'xs';
      if (width >= BREAKPOINTS['3xl']) breakpoint = '3xl';
      else if (width >= BREAKPOINTS['2xl']) breakpoint = '2xl';
      else if (width >= BREAKPOINTS.xl) breakpoint = 'xl';
      else if (width >= BREAKPOINTS.lg) breakpoint = 'lg';
      else if (width >= BREAKPOINTS.md) breakpoint = 'md';
      else if (width >= BREAKPOINTS.sm) breakpoint = 'sm';
      else if (width >= BREAKPOINTS.xs) breakpoint = 'xs';
      
      const isMobile = width < BREAKPOINTS.md;
      const isTablet = width >= BREAKPOINTS.md && width < BREAKPOINTS.lg;
      const isDesktop = width >= BREAKPOINTS.lg;
      
      setScreenSize({
        width,
        height,
        breakpoint,
        isMobile,
        isTablet,
        isDesktop,
      });
    };

    // Set initial size
    updateScreenSize();

    // Add event listener with throttling for better performance
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateScreenSize, 100);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return screenSize;
}

/**
 * Hook to detect if user is on a touch device
 */
export function useTouch() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouch(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        // @ts-ignore
        navigator.msMaxTouchPoints > 0
      );
    };

    checkTouch();
    window.addEventListener('touchstart', checkTouch, { once: true, passive: true });
    
    return () => {
      window.removeEventListener('touchstart', checkTouch);
    };
  }, []);

  return isTouch;
}

/**
 * Utility function to get responsive classes based on screen size
 */
export function getResponsiveClasses(classes: {
  mobile?: string;
  tablet?: string;
  desktop?: string;
  base?: string;
}) {
  return [
    classes.base || '',
    classes.mobile ? `mobile:${classes.mobile}` : '',
    classes.tablet ? `tablet:${classes.tablet}` : '',
    classes.desktop ? `desktop:${classes.desktop}` : '',
  ].filter(Boolean).join(' ');
}

/**
 * Responsive text sizing utility
 */
export function getResponsiveTextSize(size: 'sm' | 'base' | 'lg' | 'xl' | '2xl') {
  const sizes = {
    sm: 'text-fluid-sm',
    base: 'text-fluid-base',
    lg: 'text-fluid-lg',
    xl: 'text-fluid-xl',
    '2xl': 'text-fluid-2xl',
  };
  
  return sizes[size] || sizes.base;
}

/**
 * Responsive spacing utility
 */
export function getResponsiveSpacing(config: {
  mobile: string;
  tablet?: string;
  desktop?: string;
}) {
  return [
    config.mobile,
    config.tablet ? `md:${config.tablet}` : '',
    config.desktop ? `lg:${config.desktop}` : '',
  ].filter(Boolean).join(' ');
}

/**
 * Responsive grid columns utility
 */
export function getResponsiveGrid(config: {
  mobile: number;
  tablet?: number;
  desktop?: number;
}) {
  return [
    `grid-cols-${config.mobile}`,
    config.tablet ? `md:grid-cols-${config.tablet}` : '',
    config.desktop ? `lg:grid-cols-${config.desktop}` : '',
  ].filter(Boolean).join(' ');
}

/**
 * Device detection utilities
 */
export const deviceDetection = {
  isMobile: () => window.innerWidth < BREAKPOINTS.md,
  isTablet: () => window.innerWidth >= BREAKPOINTS.md && window.innerWidth < BREAKPOINTS.lg,
  isDesktop: () => window.innerWidth >= BREAKPOINTS.lg,
  isLargeScreen: () => window.innerWidth >= BREAKPOINTS.xl,
  
  // Orientation detection
  isLandscape: () => window.innerWidth > window.innerHeight,
  isPortrait: () => window.innerWidth <= window.innerHeight,
  
  // Performance-related checks
  isLowEndDevice: () => {
    // Check for low-end device indicators
    const connection = (navigator as any).connection;
    const hardwareConcurrency = navigator.hardwareConcurrency || 1;
    
    return (
      hardwareConcurrency <= 2 ||
      (connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g'))
    );
  },
};

/**
 * Performance optimization utilities
 */
export const performanceUtils = {
  // Debounce function for resize events
  debounce: <T extends (...args: any[]) => any>(func: T, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(null, args), wait);
    };
  },
  
  // Throttle function for scroll events
  throttle: <T extends (...args: any[]) => any>(func: T, limit: number) => {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func.apply(null, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },
  
  // Check if user prefers reduced motion
  prefersReducedMotion: () => {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },
};