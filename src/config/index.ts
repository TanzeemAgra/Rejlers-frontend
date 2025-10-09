import type { AppConfig } from '@/types';

// Environment Configuration with Type Safety
export const config: AppConfig = {
  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1',
    timeout: 30000,
    retries: 3,
  },
  
  // Authentication
  auth: {
    provider: process.env.NEXT_PUBLIC_AUTH_PROVIDER || 'oauth2',
    clientId: process.env.NEXT_PUBLIC_AUTH_CLIENT_ID,
    redirectUri: process.env.NEXT_PUBLIC_AUTH_REDIRECT_URI,
    scopes: ['read:dashboard', 'write:operations', 'admin:system'],
  },
  
  // Application Settings
  app: {
    name: 'Oil & Gas Operations Dashboard',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    debug: process.env.NEXT_PUBLIC_DEBUG === 'true',
    analytics: process.env.NEXT_PUBLIC_ANALYTICS_ID,
  },
  
  // Feature Flags
  features: {
    realTimeMonitoring: process.env.NEXT_PUBLIC_FEATURE_REALTIME === 'true',
    aiPredictiveAnalytics: process.env.NEXT_PUBLIC_FEATURE_AI === 'true',
    mobileApp: process.env.NEXT_PUBLIC_FEATURE_MOBILE === 'true',
    advancedReporting: process.env.NEXT_PUBLIC_FEATURE_REPORTING === 'true',
  },
  
  // Monitoring & Alerts
  monitoring: {
    websocketUrl: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8000/ws',
    alertThresholds: {
      pressure: { critical: 1000, warning: 800 },
      temperature: { critical: 150, warning: 120 },
      flowRate: { critical: 500, warning: 400 },
    },
  },
  
  // Maps & Geolocation
  maps: {
    provider: 'mapbox', // 'google' | 'mapbox' | 'openstreet'
    apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
    defaultCenter: { lat: 29.7604, lng: -95.3698 }, // Houston, TX
    defaultZoom: 10,
  },
  
  // Charts & Visualization
  charts: {
    theme: 'industrial',
    animations: true,
    refreshInterval: 5000, // 5 seconds
  },
  
  // Security
  security: {
    sessionTimeout: 3600000, // 1 hour
    csrfProtection: true,
    encryptLocalStorage: true,
  },
};

export default config;