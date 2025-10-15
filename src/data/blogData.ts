export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    title: string;
    avatar: string;
    bio: string;
  };
  publishedAt: string;
  updatedAt?: string;
  readTime: string;
  category: BlogCategory;
  tags: string[];
  featuredImage: string;
  featured: boolean;
  views: number;
  likes: number;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

export interface BlogCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
}

export const blogCategories: BlogCategory[] = [
  {
    id: 'technology',
    name: 'Technology & Innovation',
    description: 'Latest technological advances in oil & gas',
    color: 'blue',
    icon: '⚡'
  },
  {
    id: 'sustainability',
    name: 'Sustainability & Environment',
    description: 'Environmental initiatives and green energy',
    color: 'green',
    icon: '🌱'
  },
  {
    id: 'safety',
    name: 'Safety & Compliance',
    description: 'Safety protocols and regulatory compliance',
    color: 'red',
    icon: '🛡️'
  },
  {
    id: 'project-management',
    name: 'Project Management',
    description: 'Best practices in project delivery',
    color: 'purple',
    icon: '📊'
  },
  {
    id: 'industry-insights',
    name: 'Industry Insights',
    description: 'Market trends and industry analysis',
    color: 'orange',
    icon: '📈'
  },
  {
    id: 'case-studies',
    name: 'Case Studies',
    description: 'Real-world project success stories',
    color: 'indigo',
    icon: '📋'
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Digital Twin Technology Revolutionizing Oil & Gas Operations',
    slug: 'digital-twin-technology-oil-gas-operations',
    excerpt: 'Explore how digital twin technology is transforming asset management and operational efficiency in the energy sector, reducing costs by up to 30%.',
    content: `
      <h2>The Future of Asset Management</h2>
      <p>Digital twin technology represents a paradigm shift in how we approach asset management in the oil and gas industry. By creating virtual replicas of physical assets, operators can predict failures, optimize performance, and reduce operational costs significantly.</p>
      
      <h3>Key Benefits of Digital Twins</h3>
      <ul>
        <li><strong>Predictive Maintenance:</strong> Reduce unplanned downtime by up to 70%</li>
        <li><strong>Operational Efficiency:</strong> Optimize production processes in real-time</li>
        <li><strong>Risk Mitigation:</strong> Simulate scenarios before implementation</li>
        <li><strong>Cost Reduction:</strong> Lower maintenance costs by 25-30%</li>
      </ul>

      <h3>Implementation Strategy</h3>
      <p>At REJLERS, we've developed a comprehensive framework for digital twin implementation that includes data integration, model development, and continuous optimization. Our approach ensures seamless integration with existing systems while maximizing ROI.</p>
      
      <blockquote>
        "Digital twins are not just about technology; they're about transforming how we think about asset lifecycle management." - Dr. Lars Eriksson, CTO, REJLERS
      </blockquote>
      
      <h3>Case Study: North Sea Platform</h3>
      <p>Our recent implementation of digital twin technology on a North Sea platform resulted in a 28% reduction in maintenance costs and 15% improvement in production efficiency within the first year.</p>
    `,
    author: {
      name: 'Dr. Lars Eriksson',
      title: 'Chief Technology Officer',
      avatar: '/images/team/lars-eriksson.jpg',
      bio: 'Leading digital transformation initiatives in oil & gas with 20+ years of experience in process engineering and technology innovation.'
    },
    publishedAt: '2025-01-05',
    readTime: '8 min read',
    category: blogCategories[0],
    tags: ['Digital Twin', 'Asset Management', 'IoT', 'Predictive Maintenance'],
    featuredImage: '/images/blog/digital-twin-oil-gas.jpg',
    featured: true,
    views: 2847,
    likes: 156,
    seo: {
      metaTitle: 'Digital Twin Technology in Oil & Gas | REJLERS Engineering',
      metaDescription: 'Learn how digital twin technology is revolutionizing oil & gas operations, improving efficiency and reducing costs. Expert insights from REJLERS.',
      keywords: ['digital twin', 'oil and gas', 'asset management', 'predictive maintenance', 'IoT']
    }
  },
  {
    id: '2',
    title: 'Sustainable Energy Transition: Balancing Renewables with Traditional Energy',
    slug: 'sustainable-energy-transition-renewables-traditional',
    excerpt: 'A comprehensive analysis of how oil & gas companies can successfully navigate the energy transition while maintaining operational excellence and profitability.',
    content: `
      <h2>Navigating the Energy Transition</h2>
      <p>The global energy landscape is undergoing unprecedented transformation. Oil and gas companies face the challenge of meeting current energy demands while preparing for a sustainable future.</p>
      
      <h3>Strategic Approaches to Energy Transition</h3>
      <p>Successful energy transition requires a balanced approach that includes:</p>
      
      <h4>1. Portfolio Diversification</h4>
      <ul>
        <li>Renewable energy investments</li>
        <li>Carbon capture and storage</li>
        <li>Hydrogen production</li>
        <li>Energy efficiency improvements</li>
      </ul>
      
      <h4>2. Technology Integration</h4>
      <p>Leveraging advanced technologies to bridge the gap between traditional and renewable energy sources.</p>
      
      <h3>REJLERS' Integrated Approach</h3>
      <p>Our multidisciplinary team helps clients develop comprehensive transition strategies that maintain financial performance while building sustainable capabilities for the future.</p>
    `,
    author: {
      name: 'Sarah Mitchell',
      title: 'Senior Sustainability Consultant',
      avatar: '/images/team/sarah-mitchell.jpg',
      bio: 'Environmental engineer specializing in sustainable energy solutions and carbon footprint reduction strategies.'
    },
    publishedAt: '2025-01-03',
    readTime: '12 min read',
    category: blogCategories[1],
    tags: ['Energy Transition', 'Sustainability', 'Renewables', 'Carbon Capture'],
    featuredImage: '/images/blog/energy-transition.jpg',
    featured: true,
    views: 1923,
    likes: 89,
    seo: {
      metaTitle: 'Sustainable Energy Transition Strategy | REJLERS',
      metaDescription: 'Expert guidance on navigating energy transition while balancing renewables with traditional energy sources.',
      keywords: ['energy transition', 'sustainability', 'renewables', 'carbon footprint']
    }
  },
  {
    id: '3',
    title: 'Advanced Safety Systems: AI-Powered Risk Assessment in Offshore Operations',
    slug: 'ai-powered-safety-systems-offshore-operations',
    excerpt: 'Discover how artificial intelligence is enhancing safety protocols in offshore operations, providing real-time risk assessment and predictive safety analytics.',
    content: `
      <h2>AI-Driven Safety Innovation</h2>
      <p>Offshore operations present unique safety challenges that require advanced technological solutions. Artificial intelligence is revolutionizing how we approach safety management and risk assessment.</p>
      
      <h3>Real-Time Risk Analytics</h3>
      <p>Our AI-powered safety systems continuously monitor operational parameters and environmental conditions to provide:</p>
      
      <ul>
        <li>Predictive hazard identification</li>
        <li>Dynamic risk assessment</li>
        <li>Automated emergency response protocols</li>
        <li>Continuous safety performance optimization</li>
      </ul>
      
      <h3>Implementation Benefits</h3>
      <p>Companies implementing AI-powered safety systems have reported significant improvements in safety metrics and operational confidence.</p>
    `,
    author: {
      name: 'Captain James Anderson',
      title: 'Offshore Safety Director',
      avatar: '/images/team/james-anderson.jpg',
      bio: '25+ years in offshore operations with expertise in safety management systems and risk assessment protocols.'
    },
    publishedAt: '2024-12-28',
    readTime: '10 min read',
    category: blogCategories[2],
    tags: ['AI Safety', 'Offshore Operations', 'Risk Assessment', 'Predictive Analytics'],
    featuredImage: '/images/blog/ai-safety-offshore.jpg',
    featured: false,
    views: 1456,
    likes: 72,
    seo: {
      metaTitle: 'AI-Powered Safety Systems for Offshore Operations | REJLERS',
      metaDescription: 'Advanced AI safety systems providing real-time risk assessment and predictive analytics for offshore operations.',
      keywords: ['AI safety', 'offshore operations', 'risk assessment', 'predictive analytics']
    }
  },
  {
    id: '4',
    title: 'Agile Project Management in Large-Scale Energy Infrastructure',
    slug: 'agile-project-management-energy-infrastructure',
    excerpt: 'Learn how agile methodologies are being adapted for complex energy infrastructure projects, improving delivery timelines and stakeholder satisfaction.',
    content: `
      <h2>Agile in Energy Infrastructure</h2>
      <p>Traditional project management approaches often struggle with the complexity and scale of modern energy infrastructure projects. Agile methodologies offer a more flexible and responsive approach.</p>
      
      <h3>Adapted Agile Framework</h3>
      <p>Our adapted agile framework for energy projects includes:</p>
      
      <ul>
        <li>Iterative design and review cycles</li>
        <li>Continuous stakeholder engagement</li>
        <li>Risk-based sprint planning</li>
        <li>Adaptive resource allocation</li>
      </ul>
      
      <h3>Success Metrics</h3>
      <p>Projects using our agile approach have shown 25% faster delivery times and 40% higher stakeholder satisfaction rates.</p>
    `,
    author: {
      name: 'Michael Chen',
      title: 'Senior Project Manager',
      avatar: '/images/team/michael-chen.jpg',
      bio: 'Certified PMP and Agile practitioner with expertise in large-scale infrastructure project delivery.'
    },
    publishedAt: '2024-12-20',
    readTime: '7 min read',
    category: blogCategories[3],
    tags: ['Agile', 'Project Management', 'Infrastructure', 'Delivery Excellence'],
    featuredImage: '/images/blog/agile-project-management.jpg',
    featured: false,
    views: 1187,
    likes: 64,
    seo: {
      metaTitle: 'Agile Project Management for Energy Infrastructure | REJLERS',
      metaDescription: 'Discover how agile methodologies improve energy infrastructure project delivery and stakeholder satisfaction.',
      keywords: ['agile project management', 'energy infrastructure', 'project delivery']
    }
  },
  {
    id: '5',
    title: 'Market Analysis: Global LNG Demand and Infrastructure Investment Trends',
    slug: 'global-lng-demand-infrastructure-investment-trends',
    excerpt: 'Comprehensive analysis of global LNG market dynamics, emerging demand patterns, and strategic infrastructure investment opportunities through 2030.',
    content: `
      <h2>Global LNG Market Outlook</h2>
      <p>The global LNG market continues to evolve rapidly, driven by energy security concerns, environmental regulations, and shifting demand patterns across key regions.</p>
      
      <h3>Key Market Drivers</h3>
      <ul>
        <li>Asia-Pacific demand growth</li>
        <li>European energy diversification</li>
        <li>US export capacity expansion</li>
        <li>Floating storage and regasification units (FSRUs)</li>
      </ul>
      
      <h3>Investment Opportunities</h3>
      <p>Strategic infrastructure investments in small-scale LNG and distribution networks present significant growth opportunities for forward-thinking operators.</p>
      
      <h3>Regional Analysis</h3>
      <p>Our detailed regional breakdown identifies key growth markets and potential infrastructure bottlenecks that could impact future supply chains.</p>
    `,
    author: {
      name: 'Dr. Elena Kowalski',
      title: 'Market Research Director',
      avatar: '/images/team/elena-kowalski.jpg',
      bio: 'Energy economist with 15+ years analyzing global gas markets and infrastructure investment trends.'
    },
    publishedAt: '2024-12-15',
    readTime: '15 min read',
    category: blogCategories[4],
    tags: ['LNG', 'Market Analysis', 'Infrastructure Investment', 'Global Trends'],
    featuredImage: '/images/blog/lng-market-analysis.jpg',
    featured: false,
    views: 2234,
    likes: 118,
    seo: {
      metaTitle: 'Global LNG Market Analysis & Investment Trends | REJLERS',
      metaDescription: 'Comprehensive analysis of global LNG demand patterns and strategic infrastructure investment opportunities.',
      keywords: ['LNG market', 'infrastructure investment', 'global trends', 'energy market analysis']
    }
  },
  {
    id: '6',
    title: 'Case Study: Successful Digital Transformation of Legacy Refinery Operations',
    slug: 'digital-transformation-legacy-refinery-case-study',
    excerpt: 'Detailed case study of how REJLERS helped modernize a 40-year-old refinery, implementing Industry 4.0 technologies while maintaining operational continuity.',
    content: `
      <h2>Modernizing Legacy Operations</h2>
      <p>This case study examines the successful digital transformation of a legacy refinery, demonstrating how modern technology can be integrated with existing infrastructure to achieve significant operational improvements.</p>
      
      <h3>Project Overview</h3>
      <ul>
        <li><strong>Client:</strong> Major European Refiner</li>
        <li><strong>Timeline:</strong> 18-month phased implementation</li>
        <li><strong>Investment:</strong> €45M technology upgrade</li>
        <li><strong>ROI:</strong> 240% within 3 years</li>
      </ul>
      
      <h3>Implementation Phases</h3>
      
      <h4>Phase 1: Infrastructure Assessment</h4>
      <p>Comprehensive evaluation of existing systems and identification of integration opportunities.</p>
      
      <h4>Phase 2: Technology Integration</h4>
      <p>Gradual implementation of IoT sensors, advanced process control, and data analytics platforms.</p>
      
      <h4>Phase 3: Optimization & Training</h4>
      <p>System optimization and comprehensive staff training programs.</p>
      
      <h3>Results Achieved</h3>
      <ul>
        <li>15% increase in overall equipment effectiveness (OEE)</li>
        <li>28% reduction in unplanned maintenance</li>
        <li>12% improvement in energy efficiency</li>
        <li>Zero safety incidents during implementation</li>
      </ul>
      
      <h3>Lessons Learned</h3>
      <p>Key success factors included early stakeholder engagement, phased implementation approach, and comprehensive change management strategy.</p>
    `,
    author: {
      name: 'Robert Thompson',
      title: 'Digital Transformation Lead',
      avatar: '/images/team/robert-thompson.jpg',
      bio: 'Industrial automation expert specializing in legacy system modernization and Industry 4.0 implementations.'
    },
    publishedAt: '2024-12-10',
    readTime: '12 min read',
    category: blogCategories[5],
    tags: ['Digital Transformation', 'Case Study', 'Legacy Systems', 'Industry 4.0'],
    featuredImage: '/images/blog/refinery-digital-transformation.jpg',
    featured: true,
    views: 1876,
    likes: 94,
    seo: {
      metaTitle: 'Refinery Digital Transformation Case Study | REJLERS',
      metaDescription: 'Success story of modernizing legacy refinery operations with Industry 4.0 technologies.',
      keywords: ['digital transformation', 'refinery modernization', 'Industry 4.0', 'case study']
    }
  }
];

export const getFeaturedPosts = () => blogPosts.filter(post => post.featured);
export const getPostsByCategory = (categoryId: string) => blogPosts.filter(post => post.category.id === categoryId);
export const getPostBySlug = (slug: string) => blogPosts.find(post => post.slug === slug);
export const getRelatedPosts = (currentPost: BlogPost, limit: number = 3) => {
  return blogPosts
    .filter(post => post.id !== currentPost.id && post.category.id === currentPost.category.id)
    .slice(0, limit);
};
