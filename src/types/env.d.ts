/// <reference types="next" />
/// <reference types="next/image-types/global" />

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    NEXT_PUBLIC_API_BASE_URL: string;
    NEXT_PUBLIC_WS_URL: string;
    NEXT_PUBLIC_AUTH_PROVIDER: string;
    NEXT_PUBLIC_AUTH_CLIENT_ID: string;
    NEXT_PUBLIC_AUTH_REDIRECT_URI: string;
    NEXT_PUBLIC_DEBUG: string;
    NEXT_PUBLIC_FEATURE_REALTIME: string;
    NEXT_PUBLIC_FEATURE_AI: string;
    NEXT_PUBLIC_FEATURE_MOBILE: string;
    NEXT_PUBLIC_FEATURE_REPORTING: string;
    NEXT_PUBLIC_MAPS_API_KEY: string;
    NEXT_PUBLIC_ANALYTICS_ID: string;
    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL: string;
    DATABASE_URL: string;
    REDIS_URL: string;
  }
}
