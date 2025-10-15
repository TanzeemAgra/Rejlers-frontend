import { Metadata } from 'next';
import { Header } from '@/components/ui';
import SitemapClient from './SitemapClient';

export const metadata: Metadata = {
  title: 'Sitemap - REJLERS',
  description: 'Complete site navigation map for REJLERS industrial, oil & gas, and renewable energy services. Advanced intelligent sitemap with grid, tree, and analytics views for enhanced user experience.',
  keywords: 'REJLERS sitemap, site navigation, website map, industrial services sitemap, oil gas services map, renewable energy navigation',
  openGraph: {
    title: 'Sitemap - REJLERS',
    description: 'Navigate REJLERS comprehensive industrial, oil & gas, and renewable energy services through our advanced intelligent sitemap.',
    type: 'website',
  },
};

export default function SitemapPage() {
  return (
    <>
      <Header />
      <SitemapClient />
    </>
  );
}
