import { finixpaThemeConfig } from '@/config/finixpaTheme';
import { NextResponse } from 'next/server';

// Site pages configuration
const sitePages = [
  // Core Pages
  { url: '/', priority: 1.0, changefreq: 'weekly', lastmod: new Date().toISOString() },
  { url: '/home-2', priority: 0.8, changefreq: 'monthly', lastmod: new Date().toISOString() },
  
  // Company Info
  { url: '/about', priority: 0.9, changefreq: 'monthly', lastmod: new Date().toISOString() },
  
  // Services
  { url: '/services', priority: 0.9, changefreq: 'weekly', lastmod: new Date().toISOString() },
  { url: '/services-2', priority: 0.7, changefreq: 'weekly', lastmod: new Date().toISOString() },
  { url: '/service-details', priority: 0.8, changefreq: 'weekly', lastmod: new Date().toISOString() },
  
  // Portfolio
  { url: '/projects', priority: 0.8, changefreq: 'weekly', lastmod: new Date().toISOString() },
  { url: '/project-details', priority: 0.7, changefreq: 'monthly', lastmod: new Date().toISOString() },
  
  // Content
  { url: '/blog', priority: 0.8, changefreq: 'daily', lastmod: new Date().toISOString() },
  { url: '/blog-details', priority: 0.6, changefreq: 'never', lastmod: new Date().toISOString() },
  
  // Support
  { url: '/help', priority: 0.7, changefreq: 'weekly', lastmod: new Date().toISOString() },
  { url: '/support', priority: 0.6, changefreq: 'weekly', lastmod: new Date().toISOString() },
  { url: '/support/track', priority: 0.5, changefreq: 'daily', lastmod: new Date().toISOString() },
  
  // Contact
  { url: '/contact', priority: 0.8, changefreq: 'monthly', lastmod: new Date().toISOString() },
  
  // Legal
  { url: '/privacy', priority: 0.4, changefreq: 'yearly', lastmod: new Date().toISOString() },
  { url: '/terms', priority: 0.4, changefreq: 'yearly', lastmod: new Date().toISOString() },
  
  // Navigation
  { url: '/sitemap', priority: 0.5, changefreq: 'monthly', lastmod: new Date().toISOString() }
];

export async function GET() {
  const siteUrl = 'https://rejlers.com'; // Use actual domain in production
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${sitePages.map(page => `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <lastmod>${page.lastmod.split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
    },
  });
}
