/**
 * Authentication Configuration
 * Soft-coded authentication settings for the frontend
 */

export interface AuthConfig {
  tokenRefreshThreshold: number; // Minutes before expiry to refresh
  maxRetryAttempts: number;
  automaticRefresh: boolean;
  redirectOnAuthFailure: boolean;
  debugMode: boolean;
  endpoints: {
    login: string;
    logout: string;
    refresh: string;
    profile: string;
    checkPermission: string;
    userCreate: string;
  };
}

// Default configuration - can be overridden by environment variables
export const defaultAuthConfig: AuthConfig = {
  tokenRefreshThreshold: 5, // Refresh token 5 minutes before expiry
  maxRetryAttempts: 2,
  automaticRefresh: true,
  redirectOnAuthFailure: true,
  debugMode: process.env.NODE_ENV === 'development',
  endpoints: {
    login: '/auth/login/',
    logout: '/auth/logout/',
    refresh: '/auth/token/refresh/',
    profile: '/auth/profile/',
    checkPermission: '/auth/check-module-permission/',
    userCreate: '/auth/users/create/',
  }
};

// Environment-based configuration overrides
export const getAuthConfig = (): AuthConfig => {
  const config = { ...defaultAuthConfig };
  
  // Override with environment variables if available
  if (typeof window !== 'undefined') {
    // Client-side environment variables (from build time)
    const envConfig = (window as any).__AUTH_CONFIG__;
    if (envConfig) {
      Object.assign(config, envConfig);
    }
  }
  
  // Override specific settings from environment
  if (process.env.NEXT_PUBLIC_AUTH_DEBUG === 'true') {
    config.debugMode = true;
  }
  
  if (process.env.NEXT_PUBLIC_AUTH_REFRESH_THRESHOLD) {
    config.tokenRefreshThreshold = parseInt(process.env.NEXT_PUBLIC_AUTH_REFRESH_THRESHOLD, 10);
  }
  
  return config;
};

export const authConfig = getAuthConfig();