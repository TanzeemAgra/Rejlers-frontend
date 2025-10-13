/**
 * Environment Configuration Utility
 * Helper functions for managing Railway backend URL configuration
 */

// Environment detection
export const isProduction = process.env.NODE_ENV === 'production';
export const isDevelopment = process.env.NODE_ENV === 'development';

// Railway backend configuration
export const RAILWAY_BACKEND = {
  DOMAIN: 'rejlers-backend-production.up.railway.app',
  API_URL: 'https://rejlers-backend-production.up.railway.app/api/v1',
  WS_URL: 'wss://rejlers-backend-production.up.railway.app/ws',
  HEALTH_URL: 'https://rejlers-backend-production.up.railway.app/health/',
};

// Local development configuration
export const LOCAL_BACKEND = {
  API_URL: 'http://localhost:8000/api/v1',
  WS_URL: 'ws://localhost:8000/ws',
  HEALTH_URL: 'http://localhost:8000/health/',
};

// Dynamic configuration getters
export const getBackendConfig = () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const wsUrl = process.env.NEXT_PUBLIC_WS_URL;
  
  if (apiBaseUrl && wsUrl) {
    return {
      API_URL: apiBaseUrl,
      WS_URL: wsUrl,
      HEALTH_URL: apiBaseUrl.replace('/api/v1', '/health/'),
    };
  }
  
  return isProduction ? RAILWAY_BACKEND : LOCAL_BACKEND;
};

// Validate backend connectivity
export const validateBackendConfig = async (): Promise<boolean> => {
  try {
    const config = getBackendConfig();
    const response = await fetch(config.HEALTH_URL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    
    return response.ok;
  } catch (error) {
    console.warn('Backend health check failed:', error);
    return false;
  }
};

// Environment info for debugging
export const getEnvironmentInfo = () => ({
  environment: process.env.NODE_ENV,
  isProduction,
  isDevelopment,
  config: getBackendConfig(),
  timestamp: new Date().toISOString(),
});

// Export configuration for easy access
export const config = getBackendConfig();