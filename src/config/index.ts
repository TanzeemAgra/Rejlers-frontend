import type { AppConfig } from '@/types';

// Environment-based configuration with soft coding principles
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

// Debug environment variables (only in development or when debug is enabled)
const debugEnvironment = () => {
  if (isDevelopment || process.env.NEXT_PUBLIC_DEBUG === 'true') {
    console.log('🔍 Environment Debug Info:');
    console.log('  NODE_ENV:', process.env.NODE_ENV);
    console.log('  NEXT_PUBLIC_API_BASE_URL:', process.env.NEXT_PUBLIC_API_BASE_URL);
    console.log('  NEXT_PUBLIC_WS_URL:', process.env.NEXT_PUBLIC_WS_URL);
    console.log('  NEXT_PUBLIC_BACKEND_URL:', process.env.NEXT_PUBLIC_BACKEND_URL);
    console.log('  Is Production:', isProduction);
    console.log('  Is Development:', isDevelopment);
  }
};

// Call debug function
debugEnvironment();

// API Configuration with Railway backend support and multi-environment fallbacks
const getApiBaseUrl = () => {
  // Environment detection
  const isVercelProduction = process.env.VERCEL === '1' && isProduction;
  const isDockerMode = process.env.NEXT_PUBLIC_DOCKER_MODE === 'true';
  
  // Priority order for API URL resolution
  if (process.env.NEXT_PUBLIC_API_BASE_URL) {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    console.log('📡 Using API URL from environment:', apiUrl);
    
    // Validate URL format
    try {
      new URL(apiUrl);
      if (isVercelProduction) {
        console.log('🚀 Vercel Production → Railway Backend:', apiUrl);
      } else if (isDockerMode) {
        console.log('🐳 Docker Development mode:', apiUrl);
      } else {
        console.log('💻 Local Development mode:', apiUrl);
      }
      return apiUrl;
    } catch (error) {
      console.error('❌ Invalid API URL in environment variables:', apiUrl);
    }
  }
  
  // Smart fallback URLs based on environment
  if (isVercelProduction) {
    const railwayUrl = 'https://rejlers-backend-production.up.railway.app/api/v1';
    console.log('🏭 Vercel Production (fallback) → Railway backend:', railwayUrl);
    return railwayUrl;
  }
  
  if (isProduction) {
    const productionUrl = 'https://rejlers-backend-production.up.railway.app/api/v1';
    console.log('🏭 Production environment - using Railway backend:', productionUrl);
    return productionUrl;
  }
  
  console.log('🛠️ Development environment - using localhost');
  return 'http://localhost:8000/api/v1';
};

const getWebSocketUrl = () => {
  if (process.env.NEXT_PUBLIC_WS_URL) {
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL;
    console.log('🔗 Using WebSocket URL from environment:', wsUrl);
    return wsUrl;
  }
  
  // Fallback based on environment
  if (isProduction) {
    const productionWsUrl = 'wss://rejlers-backend-production.up.railway.app/ws';
    console.log('🏭 Production WebSocket - using Railway backend:', productionWsUrl);
    return productionWsUrl;
  }
  
  console.log('🛠️ Development WebSocket - using localhost');
  return 'ws://localhost:8000/ws';
};

// Environment Configuration with Type Safety
export const config: AppConfig = {
  // API Configuration
  api: {
    baseUrl: getApiBaseUrl(),
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
    websocketUrl: getWebSocketUrl(),
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
