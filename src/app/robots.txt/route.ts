import { NextResponse } from 'next/server';

export async function GET() {
  const siteUrl = 'https://rejlers.com'; // Use actual domain in production
  
  const robotsTxt = `# Robots.txt for REJLERS - Industrial & Factorial Business Solutions
# https://rejlers.com

User-agent: *
Allow: /

# XML Sitemap Location
Sitemap: ${siteUrl}/sitemap.xml

# Crawl Delay for Good Behavior
Crawl-delay: 1

# Specific Rules for Major Search Engines
User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: Slurp
Allow: /
Crawl-delay: 2

# Disallow certain paths (if any)
# Disallow: /admin/
# Disallow: /private/
# Disallow: /temp/

# Allow important directories
Allow: /about/
Allow: /services/
Allow: /projects/
Allow: /blog/
Allow: /contact/
Allow: /help/
Allow: /support/

# SEO and Social Media Bots
User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

# Company Information
# Contact: info@rejlers.com
# Website: https://rejlers.com
# Last Updated: ${new Date().toISOString().split('T')[0]}`;

  return new NextResponse(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400', // Cache for 1 day
    },
  });
}
