/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ignore ESLint errors during build for deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Ignore TypeScript errors during build for deployment
  typescript: {
    ignoreBuildErrors: false, // Keep false to catch real TypeScript errors
  },
  
  // Enhanced Image Optimization for Better Performance
  images: {
    domains: ['localhost', 'api.oilgas.company.com', 'rejlers-frontend.vercel.app'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Performance Optimizations
  experimental: {
    optimizeServerReact: true,
    turbotrace: {
      logLevel: 'error'
    },
  },

  // Bundle Analyzer & Optimization
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle size in production
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization.splitChunks,
          cacheGroups: {
            ...config.optimization.splitChunks.cacheGroups,
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
          },
        },
      };
    }

    // Font optimization
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/fonts/[name][ext]',
      },
    });

    return config;
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ];
  },
  // Performance optimizations
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    styledComponents: true,
  },
  
  // Enable gzip compression
  compress: true,
  
  // Optimize builds
  poweredByHeader: false,
  reactStrictMode: true,
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
