import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import finixpaThemeConfig from '@/config/finixpaTheme';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

// Generate metadata from theme configuration (soft coding)
const { site } = finixpaThemeConfig;

export const metadata: Metadata = {
  title: site.name,
  description: site.description,
  keywords: site.keywords,
  authors: [{ name: site.author }],
  robots: 'index, follow',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link 
          rel="stylesheet" 
          href="/css/icofont.min.css"
        />
      </head>
      <body className={inter.className}>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}