/** @type {import('next').NextConfig} */
const nextConfig = {
  // Environment variables for build optimization
  env: {
    DISABLE_SOURCE_MAPS: process.env.DISABLE_SOURCE_MAPS || 'true',
    NEXT_TELEMETRY_DISABLED: process.env.NEXT_TELEMETRY_DISABLED || '1',
    SKIP_LINT_CHECK: process.env.SKIP_LINT_CHECK || 'false',
  },
  
  // Ignore ESLint errors during build for deployment (Vercel optimization)
  eslint: {
    ignoreDuringBuilds: process.env.SKIP_LINT_CHECK === 'true' || process.env.NODE_ENV === 'production',
  },
  // Ignore TypeScript errors during build for deployment
  typescript: {
    ignoreBuildErrors: false, // Keep false to catch real TypeScript errors
  },
  
  // Disable source maps in production to avoid Vercel deployment issues
  productionBrowserSourceMaps: false,
  
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
  webpack: (config, { dev, isServer, webpack }) => {
    // Disable source maps in production to prevent Vercel build issues
    if (!dev) {
      config.devtool = false;
    }
    
    // Fix Node.js modules for client-side builds
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        dns: false,
        child_process: false,
        tls: false,
        path: false,
        crypto: false,
        stream: false,
        util: false,
        buffer: false,
        os: false,
        url: false,
        assert: false,
        querystring: false,
        http: false,
        https: false,
        zlib: false,
        'data-uri-to-buffer': false,
      };

      // Handle problematic packages
      config.externals = config.externals || [];
      config.externals.push({
        'openai': 'commonjs openai',
        'data-uri-to-buffer': 'commonjs data-uri-to-buffer',
      });
    }
    
    // Add ignore plugin for source map warnings
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      })
    );
    
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
  
  // Combined headers function
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
