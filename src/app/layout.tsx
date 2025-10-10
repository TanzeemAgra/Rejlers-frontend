import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import finixpaThemeConfig from '@/config/finixpaTheme';
import './globals.css';

// Optimize font loading with display swap and preload
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

// Generate metadata from theme configuration (soft coding)
const { site } = finixpaThemeConfig;

export const metadata: Metadata = {
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: site.keywords,
  authors: [{ name: site.author }],
  robots: 'index, follow',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: site.url,
    title: site.name,
    description: site.description,
    siteName: site.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: site.name,
    description: site.description,
  },
  manifest: '/manifest.json',
};

// Enhanced viewport configuration for better mobile experience
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Critical CSS - Load icofont directly */}
        <link rel="stylesheet" href="/css/icofont.min.css" />
        
        {/* DNS prefetch for potential external resources */}
        <link rel="dns-prefetch" href="//api.oilgas.company.com" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {/* Enhanced responsive wrapper with safe area support */}
        <div 
          id="root" 
          className="min-h-screen bg-white text-gray-900 safe-area-top safe-area-bottom"
        >
          {children}
        </div>
      </body>
    </html>
  );
}