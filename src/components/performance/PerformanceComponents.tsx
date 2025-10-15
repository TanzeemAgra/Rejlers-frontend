/**
 * Performance-optimized components for REJLERS frontend
 * Includes lazy loading, intersection observer, and image optimization
 */

import React, { ComponentType, lazy, Suspense, useEffect, useRef, useState } from 'react';

// Loading component with responsive design
const LoadingSpinner = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className={`animate-spin rounded-full border-2 border-primary-200 border-t-primary-600 ${sizeClasses[size]}`} />
    </div>
  );
};

/**
 * Lazy loading wrapper with error boundary
 */
interface LazyComponentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  errorFallback?: React.ReactNode;
}

export const LazyWrapper: React.FC<LazyComponentProps> = ({
  children,
  fallback = <LoadingSpinner />,
  errorFallback = <div className="p-4 text-center text-red-600">Failed to load component</div>,
}) => {
  return (
    <Suspense fallback={fallback}>
      <ErrorBoundary fallback={errorFallback}>
        {children}
      </ErrorBoundary>
    </Suspense>
  );
};

/**
 * Error boundary for lazy loaded components
 */
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Lazy component error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

/**
 * Optimized image component with lazy loading and responsive behavior
 */
interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  // Use intersection observer for lazy loading
  const [inView, setInView] = useState(false);
  
  useEffect(() => {
    if (!imgRef.current || priority) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Only load image when in view (unless priority is true)
  const shouldLoad = priority || inView;

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {shouldLoad && (
        <>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
              <LoadingSpinner size="sm" />
            </div>
          )}
          
          {hasError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500">
              <span className="text-sm">Image not available</span>
            </div>
          ) : (
            <img
              src={src}
              alt={alt}
              width={width}
              height={height}
              loading={priority ? 'eager' : 'lazy'}
              onLoad={handleLoad}
              onError={handleError}
              className={`transition-opacity duration-300 ${
                isLoading ? 'opacity-0' : 'opacity-100'
              } w-full h-full object-cover`}
              sizes={sizes}
            />
          )}
        </>
      )}
    </div>
  );
};

/**
 * Lazy loading section wrapper
 */
interface LazySectionProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  fallback?: React.ReactNode;
}

export const LazySection: React.FC<LazySectionProps> = ({
  children,
  className = '',
  threshold = 0.1,
  rootMargin = '50px',
  fallback = <div className="h-32 bg-gray-100 animate-pulse rounded" />,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  
  useEffect(() => {
    if (!sectionRef.current) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <div ref={sectionRef} className={className}>
      {inView ? children : fallback}
    </div>
  );
};

/**
 * Performance monitoring component
 */
export const PerformanceMonitor: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Monitor performance in production
    if (process.env.NODE_ENV === 'production') {
      // Simple performance monitoring
      const navigationStart = performance.timing?.navigationStart;
      const loadEventEnd = performance.timing?.loadEventEnd;
      
      if (navigationStart && loadEventEnd) {
        const loadTime = loadEventEnd - navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
      }
    }
  }, []);

  return <>{children}</>;
};

/**
 * Utility function to create lazy loaded components
 */
export function createLazyComponent<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: React.ReactNode
) {
  const LazyComponent = lazy(importFunc);
  
  return (props: React.ComponentProps<T>) => (
    <LazyWrapper fallback={fallback}>
      <LazyComponent {...props} />
    </LazyWrapper>
  );
}

/**
 * Hook for managing component visibility and performance
 */
export function useComponentPerformance(componentName: string) {
  const mountTime = useRef<number>(Date.now());
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    setRenderCount(prev => prev + 1);
  });

  useEffect(() => {
    const loadTime = Date.now() - mountTime.current;
    
    // Log performance in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`${componentName} loaded in ${loadTime}ms (renders: ${renderCount})`);
    }
  }, [componentName, renderCount]);

  return { renderCount };
}
