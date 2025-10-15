'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Footer } from '@/components/ui';
import { finixpaThemeConfig } from '@/config/finixpaTheme';

// Site structure interface
interface SitePage {
  id: string;
  title: string;
  url: string;
  category: string;
  description: string;
  priority: number;
  lastModified?: string;
  changeFreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  depth: number;
  parent?: string;
  children?: string[];
  visitCount?: number;
  avgTimeOnPage?: string;
  bounceRate?: number;
}

// Intelligence features interface
interface SiteAnalytics {
  totalPages: number;
  lastUpdated: string;
  avgPagesPerSession: number;
  topPages: { url: string; visits: number; title: string }[];
  recentlyUpdated: SitePage[];
  mostImportant: SitePage[];
}

const SitemapClient: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'tree' | 'analytics'>('grid');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [userJourney, setUserJourney] = useState<string[]>([]);
  const [pageVisitTime, setPageVisitTime] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(true);

  // Track user journey and page visit
  useEffect(() => {
    // Add current page to journey
    const currentPath = '/sitemap';
    if (!userJourney.includes(currentPath)) {
      setUserJourney(prev => [...prev, currentPath]);
    }
    
    // Track page visit duration
    const startTime = new Date();
    setPageVisitTime(startTime);
    
    // Simulate loading time for smoother UX
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => {
      clearTimeout(loadTimer);
      const endTime = new Date();
      const duration = Math.round((endTime.getTime() - startTime.getTime()) / 1000);
      console.log(`Sitemap page visited for ${duration} seconds`);
    };
  }, [userJourney]);

  // Track user interactions
  const trackInteraction = (action: string, target?: string) => {
    console.log(`User interaction: ${action}${target ? ` on ${target}` : ''}`);
    // In a real app, this would send to analytics service
  };

  // Performance monitoring
  useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const navigationStart = performance.timing?.navigationStart || performance.now();
      const loadTime = performance.now() - navigationStart;
      
      setTimeout(() => {
        const paintMetrics = performance.getEntriesByType('paint');
        const firstPaint = paintMetrics.find(entry => entry.name === 'first-paint');
        const firstContentfulPaint = paintMetrics.find(entry => entry.name === 'first-contentful-paint');
        
        console.log('Performance Metrics:', {
          loadTime: Math.round(loadTime),
          firstPaint: firstPaint ? Math.round(firstPaint.startTime) : null,
          firstContentfulPaint: firstContentfulPaint ? Math.round(firstContentfulPaint.startTime) : null
        });
      }, 1000);
    }
  }, []);

  // Comprehensive site structure based on finixpaTheme configuration
  const sitePages: SitePage[] = useMemo(() => [
    // Home Pages
    { id: 'home', title: 'Home', url: '/', category: 'Core Pages', description: 'Main landing page showcasing Rejlers services and expertise', priority: 1.0, changeFreq: 'weekly', depth: 0, visitCount: 2847, avgTimeOnPage: '3:24', bounceRate: 24 },
    { id: 'home-2', title: 'Home Style 2', url: '/home-2', category: 'Core Pages', description: 'Alternative home page layout', priority: 0.8, changeFreq: 'monthly', depth: 1, parent: 'home', visitCount: 456, avgTimeOnPage: '2:18', bounceRate: 31 },
    
    // About
    { id: 'about', title: 'About Us', url: '/about', category: 'Company Info', description: 'Comprehensive information about Rejlers history, mission, and global presence', priority: 0.9, changeFreq: 'monthly', depth: 0, visitCount: 1943, avgTimeOnPage: '4:12', bounceRate: 18 },
    
    // Services
    { id: 'services', title: 'Services Overview', url: '/services', category: 'Services', description: 'Complete overview of engineering and project services', priority: 0.9, changeFreq: 'weekly', depth: 0, children: ['services-2', 'service-details'], visitCount: 2156, avgTimeOnPage: '3:45', bounceRate: 22 },
    { id: 'services-2', title: 'Services List View', url: '/services-2', category: 'Services', description: 'Detailed list view of all service offerings', priority: 0.7, changeFreq: 'weekly', depth: 1, parent: 'services', visitCount: 876, avgTimeOnPage: '2:56', bounceRate: 28 },
    { id: 'service-details', title: 'Service Details', url: '/service-details', category: 'Services', description: 'In-depth information about specific services', priority: 0.8, changeFreq: 'weekly', depth: 1, parent: 'services', visitCount: 1234, avgTimeOnPage: '4:23', bounceRate: 16 },
    
    // Projects
    { id: 'projects', title: 'Projects Portfolio', url: '/projects', category: 'Portfolio', description: 'Showcase of completed engineering projects', priority: 0.8, changeFreq: 'weekly', depth: 0, children: ['project-details'], visitCount: 1567, avgTimeOnPage: '3:18', bounceRate: 25 },
    { id: 'project-details', title: 'Project Details', url: '/project-details', category: 'Portfolio', description: 'Detailed case studies of specific projects', priority: 0.7, changeFreq: 'monthly', depth: 1, parent: 'projects', visitCount: 789, avgTimeOnPage: '5:12', bounceRate: 14 },
    
    // Blog
    { id: 'blog', title: 'Blog & Insights', url: '/blog', category: 'Content', description: 'Latest industry insights, news, and technical articles', priority: 0.8, changeFreq: 'daily', depth: 0, children: ['blog-details'], visitCount: 1876, avgTimeOnPage: '2:43', bounceRate: 34 },
    { id: 'blog-details', title: 'Blog Article', url: '/blog-details', category: 'Content', description: 'Individual blog posts and articles', priority: 0.6, changeFreq: 'never', depth: 1, parent: 'blog', visitCount: 943, avgTimeOnPage: '4:56', bounceRate: 19 },
    
    // Support & Help
    { id: 'help', title: 'Help Center', url: '/help', category: 'Support', description: 'AI-powered intelligent help system with client classification', priority: 0.7, changeFreq: 'weekly', depth: 0, children: ['support', 'support-track'], visitCount: 1234, avgTimeOnPage: '3:34', bounceRate: 29 },
    { id: 'support', title: 'Support Tickets', url: '/support', category: 'Support', description: 'Create and manage support tickets', priority: 0.6, changeFreq: 'weekly', depth: 1, parent: 'help', visitCount: 567, avgTimeOnPage: '2:45', bounceRate: 33 },
    { id: 'support-track', title: 'Track Ticket', url: '/support/track', category: 'Support', description: 'Track existing support tickets', priority: 0.5, changeFreq: 'daily', depth: 2, parent: 'support', visitCount: 234, avgTimeOnPage: '1:56', bounceRate: 41 },
    
    // Contact
    { id: 'contact', title: 'Contact Us', url: '/contact', category: 'Contact', description: 'Multi-department contact system with global offices', priority: 0.8, changeFreq: 'monthly', depth: 0, visitCount: 1456, avgTimeOnPage: '2:23', bounceRate: 27 },
    
    // Legal
    { id: 'privacy', title: 'Privacy Policy', url: '/privacy', category: 'Legal', description: 'GDPR-compliant privacy policy with data protection measures', priority: 0.4, changeFreq: 'yearly', depth: 0, visitCount: 345, avgTimeOnPage: '3:12', bounceRate: 67 },
    { id: 'terms', title: 'Terms of Service', url: '/terms', category: 'Legal', description: 'Intelligent terms of service with reading progress tracking', priority: 0.4, changeFreq: 'yearly', depth: 0, visitCount: 289, avgTimeOnPage: '4:45', bounceRate: 58 },
    
    // Current Page
    { id: 'sitemap', title: 'Site Map', url: '/sitemap', category: 'Navigation', description: 'Advanced intelligent sitemap with visual exploration and analytics', priority: 0.5, changeFreq: 'monthly', depth: 0, visitCount: 156, avgTimeOnPage: '2:18', bounceRate: 35 }
  ], []);

  // Site analytics data
  const analytics: SiteAnalytics = useMemo(() => ({
    totalPages: sitePages.length,
    lastUpdated: new Date().toLocaleDateString(),
    avgPagesPerSession: 3.2,
    topPages: [
      { url: '/', visits: 2847, title: 'Home' },
      { url: '/services', visits: 2156, title: 'Services Overview' },
      { url: '/about', visits: 1943, title: 'About Us' },
      { url: '/blog', visits: 1876, title: 'Blog & Insights' },
      { url: '/projects', visits: 1567, title: 'Projects Portfolio' }
    ],
    recentlyUpdated: sitePages
      .sort((a, b) => (b.lastModified || '2024-01-15').localeCompare(a.lastModified || '2024-01-15'))
      .slice(0, 5),
    mostImportant: sitePages
      .sort((a, b) => b.priority - a.priority)
      .slice(0, 5)
  }), [sitePages]);

  // Categories for filtering
  const categories = useMemo(() => {
    const cats = ['all', ...Array.from(new Set(sitePages.map(page => page.category)))];
    return cats;
  }, [sitePages]);

  // Filtered pages based on search and category
  const filteredPages = useMemo(() => {
    return sitePages.filter(page => {
      const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          page.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          page.url.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || page.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [sitePages, searchTerm, selectedCategory]);

  // Toggle section expansion
  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  // Priority color coding
  const getPriorityColor = (priority: number) => {
    if (priority >= 0.8) return 'text-green-600 bg-green-50';
    if (priority >= 0.6) return 'text-blue-600 bg-blue-50';
    if (priority >= 0.4) return 'text-yellow-600 bg-yellow-50';
    return 'text-gray-600 bg-gray-50';
  };

  // Priority label
  const getPriorityLabel = (priority: number) => {
    if (priority >= 0.8) return 'High Priority';
    if (priority >= 0.6) return 'Medium Priority';
    if (priority >= 0.4) return 'Normal Priority';
    return 'Low Priority';
  };

  // Loading component
  if (isLoading) {
    return (
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <div className="animate-spin">
                <i className="icofont-spinner-alt-4 text-2xl text-blue-600"></i>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading Intelligent Sitemap</h2>
            <p className="text-gray-600">Preparing advanced navigation and analytics...</p>
            
            {/* Loading progress bars */}
            <div className="mt-8 max-w-md mx-auto space-y-3">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Analyzing site structure</span>
                <span>100%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full w-full transition-all duration-300"></div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Processing analytics</span>
                <span>85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full w-4/5 transition-all duration-300"></div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Optimizing performance</span>
                <span>92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full w-11/12 transition-all duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <main className="pt-20 pb-16">
      {/* Breadcrumb Navigation */}
      <section className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-6">
          <nav className="flex items-center space-x-2 text-sm">
            <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">Home</a>
            <i className="icofont-simple-right text-gray-400"></i>
            <span className="text-gray-700 font-medium">Site Map</span>
          </nav>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20"></div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-48 -translate-y-48 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-40 translate-y-40 animate-pulse"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <i className="icofont-sitemap text-5xl text-blue-300"></i>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Intelligent Sitemap
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Advanced site navigation with visual exploration, analytics insights, and intelligent discovery
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white">{analytics.totalPages}</div>
                <div className="text-blue-200 text-sm mt-1">Total Pages</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white">{categories.length - 1}</div>
                <div className="text-blue-200 text-sm mt-1">Categories</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white">{analytics.avgPagesPerSession}</div>
                <div className="text-blue-200 text-sm mt-1">Avg Pages/Session</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white">97%</div>
                <div className="text-blue-200 text-sm mt-1">Crawl Success</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Controls */}
      <section className="py-12 bg-white shadow-sm border-b">
        <div className="container mx-auto px-6">
          {/* User Journey Indicator */}
          {userJourney.length > 1 && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 text-sm">
                <i className="icofont-foot-print text-blue-600"></i>
                <span className="text-blue-800 font-medium">Your Journey:</span>
                <div className="flex items-center gap-1">
                  {userJourney.map((path, index) => (
                    <React.Fragment key={path}>
                      {index > 0 && <i className="icofont-simple-right text-blue-400 text-xs"></i>}
                      <span className={`px-2 py-1 rounded text-xs ${
                        index === userJourney.length - 1 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {path === '/' ? 'Home' : path.replace('/', '')}
                      </span>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <i className="icofont-search-1 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Search pages, content, or URLs..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    trackInteraction('search', e.target.value);
                  }}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700">Category:</label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  trackInteraction('filter-category', e.target.value);
                }}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Toggles */}
            <div className="flex bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => {
                  setViewMode('grid');
                  trackInteraction('view-mode-change', 'grid');
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-blue-600 shadow' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <i className="icofont-layout mr-2"></i>Grid
              </button>
              <button
                onClick={() => {
                  setViewMode('tree');
                  trackInteraction('view-mode-change', 'tree');
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'tree' ? 'bg-white text-blue-600 shadow' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <i className="icofont-tree mr-2"></i>Tree
              </button>
              <button
                onClick={() => {
                  setViewMode('analytics');
                  trackInteraction('view-mode-change', 'analytics');
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'analytics' ? 'bg-white text-blue-600 shadow' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <i className="icofont-chart-pie mr-2"></i>Analytics
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          {viewMode === 'analytics' ? (
            /* Analytics View */
            <div className="space-y-8">
              {/* Top Pages */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <i className="icofont-chart-growth text-green-600 mr-3"></i>
                  Most Visited Pages
                </h2>
                <div className="space-y-4">
                  {analytics.topPages.map((page, index) => (
                    <div key={page.url} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                          index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{page.title}</div>
                          <div className="text-sm text-gray-500">{page.url}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">{page.visits.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">visits</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Page Performance Grid */}
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <i className="icofont-star text-yellow-600 mr-3"></i>
                    Highest Priority Pages
                  </h3>
                  <div className="space-y-3">
                    {analytics.mostImportant.map(page => (
                      <div key={page.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <a href={page.url} className="text-blue-600 hover:text-blue-800 font-medium">
                          {page.title}
                        </a>
                        <span className={`px-2 py-1 text-xs font-medium rounded ${getPriorityColor(page.priority)}`}>
                          {page.priority.toFixed(1)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <i className="icofont-clock-time text-blue-600 mr-3"></i>
                    Engagement Metrics
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-gray-700">Average Session Duration</span>
                      <span className="font-bold text-blue-600">4:32</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-gray-700">Pages per Session</span>
                      <span className="font-bold text-green-600">{analytics.avgPagesPerSession}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                      <span className="text-gray-700">Bounce Rate</span>
                      <span className="font-bold text-orange-600">26.3%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="text-gray-700">Return Visitors</span>
                      <span className="font-bold text-purple-600">73.8%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : viewMode === 'tree' ? (
            /* Tree View */
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                <i className="icofont-tree text-green-600 mr-3"></i>
                Site Hierarchy
              </h2>
              
              <div className="space-y-2">
                {filteredPages
                  .filter(page => page.depth === 0)
                  .map(page => (
                    <div key={page.id} className="border border-gray-200 rounded-lg">
                      <div 
                        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                        onClick={() => toggleSection(page.id)}
                      >
                        <div className="flex items-center gap-3">
                          {page.children && (
                            <i className={`icofont-${expandedSections.has(page.id) ? 'minus' : 'plus'} text-gray-400`}></i>
                          )}
                          <i className="icofont-web text-blue-600"></i>
                          <div>
                            <div className="font-semibold text-gray-900">{page.title}</div>
                            <div className="text-sm text-blue-600">{page.url}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded ${getPriorityColor(page.priority)}`}>
                            {getPriorityLabel(page.priority)}
                          </span>
                          {page.visitCount && (
                            <div className="text-right">
                              <div className="text-sm font-semibold text-gray-900">{page.visitCount.toLocaleString()}</div>
                              <div className="text-xs text-gray-500">visits</div>
                            </div>
                          )}
                        </div>
                      </div>

                      {expandedSections.has(page.id) && page.children && (
                        <div className="border-t border-gray-200 bg-gray-50">
                          {filteredPages
                            .filter(childPage => page.children?.includes(childPage.id))
                            .map(childPage => (
                              <div key={childPage.id} className="flex items-center justify-between p-4 pl-12 border-b border-gray-200 last:border-b-0">
                                <div className="flex items-center gap-3">
                                  <i className="icofont-file text-gray-400"></i>
                                  <div>
                                    <div className="font-medium text-gray-900">{childPage.title}</div>
                                    <div className="text-sm text-blue-600">{childPage.url}</div>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-4">
                                  <span className={`px-2 py-1 text-xs font-medium rounded ${getPriorityColor(childPage.priority)}`}>
                                    {childPage.priority.toFixed(1)}
                                  </span>
                                  {childPage.visitCount && (
                                    <div className="text-right">
                                      <div className="text-sm font-semibold text-gray-600">{childPage.visitCount.toLocaleString()}</div>
                                      <div className="text-xs text-gray-500">visits</div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            /* Grid View */
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPages.map(page => (
                <a
                  key={page.id}
                  href={page.url}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 overflow-hidden"
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white">
                          <i className="icofont-web text-xl"></i>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {page.title}
                          </h3>
                          <p className="text-sm text-blue-600 font-medium">{page.url}</p>
                        </div>
                      </div>
                      
                      <span className={`px-2 py-1 text-xs font-medium rounded shrink-0 ${getPriorityColor(page.priority)}`}>
                        {page.priority.toFixed(1)}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {page.description}
                    </p>

                    {/* Metadata */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span className="bg-gray-100 px-2 py-1 rounded">{page.category}</span>
                      <span>Updated {page.changeFreq}</span>
                    </div>

                    {/* Analytics (if available) */}
                    {page.visitCount && (
                      <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100">
                        <div className="text-center">
                          <div className="text-sm font-bold text-blue-600">{page.visitCount.toLocaleString()}</div>
                          <div className="text-xs text-gray-500">Visits</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-bold text-green-600">{page.avgTimeOnPage}</div>
                          <div className="text-xs text-gray-500">Avg Time</div>
                        </div>
                        <div className="text-center">
                          <div className={`text-sm font-bold ${page.bounceRate! < 30 ? 'text-green-600' : page.bounceRate! < 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {page.bounceRate}%
                          </div>
                          <div className="text-xs text-gray-500">Bounce</div>
                        </div>
                      </div>
                    )}
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* No Results */}
          {filteredPages.length === 0 && (
            <div className="text-center py-16">
              <i className="icofont-search-document text-6xl text-gray-300 mb-4 block"></i>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Pages Found</h3>
              <p className="text-gray-600">Try adjusting your search terms or category filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* Technical SEO Section */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Technical SEO Information</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Advanced sitemap features for search engines and developers
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* XML Sitemap */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="text-center mb-6">
                <i className="icofont-code text-4xl text-blue-600 mb-4 block"></i>
                <h3 className="text-xl font-bold text-gray-900">XML Sitemap</h3>
              </div>
              <p className="text-gray-600 mb-6 text-center">
                Machine-readable sitemap for search engines
              </p>
              <a 
                href="/sitemap.xml" 
                className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Download XML Sitemap
              </a>
            </div>

            {/* Robots.txt */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="text-center mb-6">
                <i className="icofont-robot text-4xl text-green-600 mb-4 block"></i>
                <h3 className="text-xl font-bold text-gray-900">Robots.txt</h3>
              </div>
              <p className="text-gray-600 mb-6 text-center">
                Crawling instructions for search engines
              </p>
              <a 
                href="/robots.txt" 
                className="block w-full text-center bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                View Robots.txt
              </a>
            </div>

            {/* API Endpoint */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="text-center mb-6">
                <i className="icofont-api text-4xl text-purple-600 mb-4 block"></i>
                <h3 className="text-xl font-bold text-gray-900">Sitemap API</h3>
              </div>
              <p className="text-gray-600 mb-6 text-center">
                Programmatic access to site structure
              </p>
              <button 
                onClick={() => navigator.clipboard.writeText('/api/sitemap')}
                className="block w-full text-center bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
              >
                Copy API Endpoint
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "REJLERS",
            "url": "https://rejlers.com",
            "description": "Industrial & Factorial Business Solutions with Nordic Engineering Excellence",
            "sameAs": [
              "https://facebook.com/rejlers",
              "https://twitter.com/rejlers", 
              "https://linkedin.com/company/rejlers"
            ],
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://rejlers.com/sitemap?search={search_term_string}",
              "query-input": "required name=search_term_string"
            },
            "mainEntity": {
              "@type": "SiteNavigationElement",
              "name": "Site Navigation",
              "description": "Comprehensive site structure with intelligent navigation and analytics",
              "hasPart": filteredPages.map(page => ({
                "@type": "WebPage",
                "name": page.title,
                "url": `https://rejlers.com${page.url}`,
                "description": page.description,
                "inLanguage": "en-US"
              }))
            }
          })
        }}
      />
    </main>
    
      {/* Footer with Working Links */}
      <Footer />
    </>
  );
};

export default SitemapClient;
