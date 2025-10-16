/**
 * Clean HR AI Dashboard Configuration
 * ==================================
 * 
 * Simplified soft coding configuration for HR dashboard with:
 * - Clean widget definitions
 * - Proper icon handling
 * - Responsive layouts
 * - AI-powered insights
 */

export interface HRMetric {
  id: string;
  title: string;
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
  color: string;
  description?: string;
}

export interface HRWidget {
  id: string;
  title: string;
  type: 'metric' | 'chart' | 'list' | 'ai-insight' | 'table';
  size: 'small' | 'medium' | 'large' | 'full';
  data: any;
  config?: any;
}

export interface HRSidebarItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  description: string;
  badge?: string;
  subItems?: HRSidebarItem[];
}

// HR Dashboard Metrics Configuration
export const HR_METRICS: HRMetric[] = [
  {
    id: 'total-employees',
    title: 'Total Employees',
    value: 1234,
    change: '+5.2% from last month',
    changeType: 'positive',
    icon: 'Users',
    color: 'bg-blue-500',
    description: 'Active employees in organization'
  },
  {
    id: 'attendance-rate',
    title: 'Attendance Rate',
    value: '94.8%',
    change: '+1.2% this week',
    changeType: 'positive',
    icon: 'Clock',
    color: 'bg-green-500',
    description: 'Average attendance this month'
  },
  {
    id: 'performance-score',
    title: 'Performance Score',
    value: '87.5%',
    change: '+3.1% improvement',
    changeType: 'positive',
    icon: 'Award',
    color: 'bg-purple-500',
    description: 'Overall team performance'
  },
  {
    id: 'recruitment-pipeline',
    title: 'Active Candidates',
    value: 47,
    change: '+12 new applications',
    changeType: 'positive',
    icon: 'Target',
    color: 'bg-orange-500',
    description: 'Candidates in recruitment pipeline'
  },
  {
    id: 'training-completion',
    title: 'Training Completion',
    value: '78.3%',
    change: '+5.7% this quarter',
    changeType: 'positive',
    icon: 'BookOpen',
    color: 'bg-indigo-500',
    description: 'Training programs completed'
  },
  {
    id: 'employee-satisfaction',
    title: 'Satisfaction Score',
    value: '8.6/10',
    change: '+0.3 points',
    changeType: 'positive',
    icon: 'Heart',
    color: 'bg-pink-500',
    description: 'Employee satisfaction rating'
  }
];

// HR Sidebar Navigation Configuration
export const HR_SIDEBAR_ITEMS: HRSidebarItem[] = [
  {
    id: 'hr-dashboard',
    label: 'HR Dashboard',
    icon: 'Brain',
    href: '/hr/ai-dashboard',
    description: 'AI-powered HR analytics and insights'
  },
  {
    id: 'employees',
    label: 'Employee Management',
    icon: 'UserCheck',
    href: '/hr/employees',
    description: 'Manage employee profiles and records',
    subItems: [
      {
        id: 'employee-directory',
        label: 'Employee Directory',
        icon: 'Users',
        href: '/hr/employees/directory',
        description: 'Browse all employees'
      },
      {
        id: 'employee-onboarding',
        label: 'Onboarding',
        icon: 'UserPlus',
        href: '/hr/employees/onboarding',
        description: 'New employee onboarding'
      }
    ]
  },
  {
    id: 'recruitment',
    label: 'Recruitment',
    icon: 'Target',
    href: '/hr/recruitment',
    description: 'Job postings and candidate management',
    badge: '3',
    subItems: [
      {
        id: 'job-postings',
        label: 'Job Postings',
        icon: 'FileText',
        href: '/hr/recruitment/jobs',
        description: 'Manage job postings'
      },
      {
        id: 'candidates',
        label: 'Candidates',
        icon: 'Users',
        href: '/hr/recruitment/candidates',
        description: 'Candidate pipeline'
      }
    ]
  },
  {
    id: 'performance',
    label: 'Performance',
    icon: 'Award',
    href: '/hr/performance',
    description: 'Performance reviews and tracking',
    subItems: [
      {
        id: 'reviews',
        label: 'Reviews',
        icon: 'ClipboardCheck',
        href: '/hr/performance/reviews',
        description: 'Performance reviews'
      },
      {
        id: 'goals',
        label: 'Goals & OKRs',
        icon: 'Target',
        href: '/hr/performance/goals',
        description: 'Employee goals and objectives'
      }
    ]
  },
  {
    id: 'attendance',
    label: 'Attendance',
    icon: 'Clock',
    href: '/hr/attendance',
    description: 'Time tracking and attendance management'
  },
  {
    id: 'training',
    label: 'Training & Development',
    icon: 'BookOpen',
    href: '/hr/training',
    description: 'Learning programs and skill development'
  },
  {
    id: 'wellness',
    label: 'Employee Wellness',
    icon: 'Heart',
    href: '/hr/wellness',
    description: 'Health and wellness programs'
  },
  {
    id: 'payroll',
    label: 'Payroll',
    icon: 'DollarSign',
    href: '/hr/payroll',
    description: 'Salary and compensation management'
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: 'BarChart3',
    href: '/hr/analytics',
    description: 'Advanced HR analytics and reports'
  },
  {
    id: 'settings',
    label: 'HR Settings',
    icon: 'Settings',
    href: '/hr/settings',
    description: 'Configure HR system settings'
  }
];

export interface AIInsight {
  id: string;
  title: string;
  type: 'warning' | 'info' | 'success';
  message: string;
  recommendation: string;
  confidence: number;
  icon: string;
}

// AI Insights Configuration
export const AI_INSIGHTS: AIInsight[] = [
  {
    id: 'retention-risk',
    title: 'Employee Retention Risk',
    type: 'warning' as const,
    message: '12 employees identified as high flight risk based on performance and engagement patterns.',
    recommendation: 'Schedule 1:1 meetings and consider retention strategies.',
    confidence: 87,
    icon: 'AlertTriangle'
  },
  {
    id: 'hiring-prediction',
    title: 'Hiring Forecast',
    type: 'info' as const,
    message: 'Based on current growth trends, you may need to hire 15-20 new employees in Q1 2024.',
    recommendation: 'Start recruitment planning for Engineering and Sales roles.',
    confidence: 92,
    icon: 'TrendingUp'
  },
  {
    id: 'training-opportunity',
    title: 'Training Opportunity',
    type: 'success' as const,
    message: 'JavaScript and React skills gap identified in 23% of development team.',
    recommendation: 'Implement upskilling program to bridge technical gaps.',
    confidence: 78,
    icon: 'BookOpen'
  }
];

// Chart Data Configuration
export const CHART_DATA = {
  employeeGrowth: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Employees',
        data: [1150, 1180, 1205, 1220, 1234, 1245],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      }
    ]
  },
  departmentDistribution: {
    labels: ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations'],
    datasets: [
      {
        data: [450, 280, 120, 45, 85, 254],
        backgroundColor: [
          '#3B82F6',
          '#10B981',
          '#F59E0B',
          '#EF4444',
          '#8B5CF6',
          '#06B6D4'
        ]
      }
    ]
  },
  performanceMetrics: {
    labels: ['Exceeds', 'Meets', 'Below', 'Needs Improvement'],
    datasets: [
      {
        data: [320, 680, 180, 54],
        backgroundColor: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444']
      }
    ]
  }
};

export default {
  HR_METRICS,
  HR_SIDEBAR_ITEMS,
  AI_INSIGHTS,
  CHART_DATA
};