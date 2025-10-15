/**
 * Logo Configuration
 * Centralized logo management for the REJLERS application
 */

export const logoConfig = {
  // Logo file paths (relative to public directory)
  paths: {
    main: '/Logo.png',
    footer: '/Logo.png',
    favicon: '/Logo.png',
    // Alternative logos for different contexts
    light: '/Logo.png', // For dark backgrounds
    dark: '/Logo.png',   // For light backgrounds
    icon: '/Logo.png',   // Icon version for small spaces
  },
  
  // Default sizes for different contexts
  sizes: {
    icon: 24,      // Small icons, mobile menu buttons
    small: 32,     // Dashboard header, sidebar
    medium: 40,    // Default size, form headers
    large: 48,     // Page headers, prominent areas  
    xlarge: 56,    // Landing page, hero sections
    hero: 80,      // Main hero sections, splash screens
  },
  
  // Context-specific configurations
  contexts: {
    dashboard: {
      size: 32,
      variant: 'main',
      showText: false,
      className: 'hover:scale-105 transition-transform duration-200',
    },
    sidebar: {
      size: 28,
      variant: 'main',
      showText: true,
      className: 'hover:opacity-90 transition-opacity duration-200',
      textClassName: 'text-lg font-semibold',
    },
    header: {
      size: 40,
      variant: 'main',
      showText: false,
      className: 'hover:scale-105 transition-all duration-300',
    },
    footer: {
      size: 36,
      variant: 'footer',
      showText: true,
      className: 'opacity-90',
      textClassName: 'text-white text-base font-medium',
    },
    login: {
      size: 64,
      variant: 'main',
      showText: true,
      className: 'mb-4',
      textClassName: 'text-2xl font-bold text-gray-800',
    },
  },
  
  // Accessibility and SEO
  accessibility: {
    defaultAlt: 'REJLERS Logo',
    ariaLabel: 'REJLERS Company Logo',
    title: 'REJLERS - Industrial & Factorial Business Solutions',
  },
  
  // Performance settings
  performance: {
    priority: true,       // Use for above-the-fold logos
    lazy: false,         // Most logos should load immediately
    placeholder: 'blur', // Use blur placeholder during load
  },
};

/**
 * Get logo configuration for a specific context
 */
export const getLogoConfig = (context: keyof typeof logoConfig.contexts) => {
  return {
    ...logoConfig.contexts[context],
    ...logoConfig.accessibility,
    ...logoConfig.performance,
  };
};

/**
 * Get logo path for a specific variant
 */
export const getLogoPath = (variant: keyof typeof logoConfig.paths = 'main') => {
  return logoConfig.paths[variant];
};

/**
 * Get logo size for a specific size key
 */
export const getLogoSize = (size: keyof typeof logoConfig.sizes | number) => {
  if (typeof size === 'number') return size;
  return logoConfig.sizes[size] || logoConfig.sizes.medium;
};
