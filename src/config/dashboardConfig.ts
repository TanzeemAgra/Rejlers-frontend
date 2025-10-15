/**
 * Comprehensive Dashboard Configuration using Soft Coding Principles
 * This file manages all dashboard behavior, layout, and content dynamically
 */

import { 
  Building2, 
  Users, 
  DollarSign, 
  FileText, 
  Package, 
  TrendingUp, 
  Shield, 
  BarChart3,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Database,
  Globe,
  Settings,
  Bell,
  User,
  Calendar,
  Phone
} from 'lucide-react';

// Environment Detection
export const getEnvironmentType = () => {
  if (typeof window === 'undefined') return 'server';
  
  const hostname = window.location.hostname;
  const isProduction = hostname.includes('vercel.app') || hostname.includes('railway.app');
  const isDevelopment = hostname.includes('localhost') || hostname.includes('127.0.0.1');
  
  return {
    isProduction,
    isDevelopment,
    isLocalDocker: isDevelopment && window.location.port === '3000',
    hostname,
    environment: process.env.NODE_ENV || 'development'
  };
};

// Dashboard Layout Configuration
export interface DashboardConfig {
  layout: {
    sidebarWidth: string;
    headerHeight: string;
    contentPadding: string;
    showSidebar: boolean;
    sidebarCollapsible: boolean;
  };
  branding: {
    companyName: string;
    tagline: string;
    logoPath: string;
  };
  features: {
    enableDebugMode: boolean;
    showEnvironmentInfo: boolean;
    enableRealTimeUpdates: boolean;
    enableNotifications: boolean;
  };
  modules: DashboardModule[];
  widgets: DashboardWidget[];
}

export interface DashboardModule {
  id: string;
  name: string;
  icon: any;
  path: string;
  badge?: string | number;
  badgeColor?: string;
  description?: string;
  permissions: string[];
  isActive: boolean;
  hasSubmenu?: boolean;
  children?: DashboardModule[];
  order: number;
}

export interface DashboardWidget {
  id: string;
  title: string;
  type: 'stat' | 'chart' | 'list' | 'custom';
  icon: any;
  value?: string | number;
  change?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
    period: string;
  };
  description?: string;
  color: {
    primary: string;
    background: string;
    text: string;
  };
  size: 'small' | 'medium' | 'large' | 'full';
  permissions: string[];
  isActive: boolean;
  order: number;
  apiEndpoint?: string;
  fallbackValue?: string | number;
}

// Get Dashboard Configuration based on environment and user
export const getDashboardConfig = (user?: any): DashboardConfig => {
  const env = getEnvironmentType();
  const userPermissions = getUserPermissions(user);
  
  // Safe environment property access
  const isEnvObject = typeof env === 'object';
  const isDevelopment = isEnvObject ? env.isDevelopment : false;
  const isProduction = isEnvObject ? env.isProduction : true;
  const hostname = isEnvObject ? env.hostname : 'server';
  
  return {
    layout: {
      sidebarWidth: '320px',
      headerHeight: '80px',
      contentPadding: '24px',
      showSidebar: true,
      sidebarCollapsible: isDevelopment
    },
    
    branding: {
      companyName: 'REJLERS',
      tagline: 'Engineering Excellence Since 1942',
      logoPath: '/icons/rejlers-logo.svg'
    },
    
    features: {
      enableDebugMode: isDevelopment || hostname.includes('vercel.app'),
      showEnvironmentInfo: true,
      enableRealTimeUpdates: isProduction,
      enableNotifications: userPermissions.includes('admin')
    },
    
    modules: getModulesConfig(userPermissions),
    widgets: getWidgetsConfig(userPermissions, isEnvObject ? env : { environment: 'production', hostname: 'server' })
  };
};

// Get user permissions based on role
const getUserPermissions = (user?: any): string[] => {
  const permissions = ['dashboard_view'];
  
  if (!user) return permissions;
  
  // Basic authenticated user permissions
  if (user.is_authenticated || user.id) {
    permissions.push('user_access');
  }
  
  // Staff permissions
  if (user.is_staff) {
    permissions.push(
      'admin',
      'projects_view', 'projects_manage',
      'hr_view', 'hr_manage',
      'finance_view', 'finance_manage',
      'contracts_view', 'contracts_manage',
      'supply_chain_view', 'supply_chain_manage',
      'sales_view', 'sales_manage',
      'hse_view', 'hse_manage',
      'reporting_view', 'reporting_manage',
      'rto_view', 'rto_manage',
      'contacts_view', 'contacts_manage'
    );
  }
  
  // Super admin permissions
  if (user.is_superuser) {
    permissions.push(
      'super_admin',
      'system_admin',
      'user_management',
      'role_management',
      'system_settings',
      'security_manage',
      'audit_logs'
    );
  }
  
  return permissions;
};

// Configure dashboard modules
const getModulesConfig = (permissions: string[]): DashboardModule[] => {
  const allModules: DashboardModule[] = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: BarChart3,
      path: '/dashboard',
      permissions: ['dashboard_view'],
      isActive: true,
      order: 1
    },
    {
      id: 'projects',
      name: 'Projects & Engineering',
      icon: Building2,
      path: '/projects',
      badge: '12',
      badgeColor: 'bg-blue-100 text-blue-800',
      description: 'Manage engineering projects and workflows',
      permissions: ['projects_view'],
      isActive: true,
      hasSubmenu: true,
      order: 2,
      children: [
        {
          id: 'projects_overview',
          name: 'Project Overview',
          icon: BarChart3,
          path: '/projects/overview',
          permissions: ['projects_view'],
          isActive: true,
          order: 1
        },
        {
          id: 'projects_create',
          name: 'Create Project',
          icon: Building2,
          path: '/projects/create',
          permissions: ['projects_manage'],
          isActive: true,
          order: 2
        }
      ]
    },
    {
      id: 'hr',
      name: 'Human Resources',
      icon: Users,
      path: '/hr',
      badge: '89',
      badgeColor: 'bg-green-100 text-green-800',
      description: 'Employee management and HR operations',
      permissions: ['hr_view'],
      isActive: true,
      hasSubmenu: true,
      order: 3
    },
    {
      id: 'finance',
      name: 'Finance Management',
      icon: DollarSign,
      path: '/finance',
      badge: 'AI',
      badgeColor: 'bg-purple-100 text-purple-800',
      description: 'Financial planning and budget management',
      permissions: ['finance_view'],
      isActive: true,
      hasSubmenu: true,
      order: 4
    },
    {
      id: 'contracts',
      name: 'Contracts',
      icon: FileText,
      path: '/contracts',
      badge: '23',
      badgeColor: 'bg-orange-100 text-orange-800',
      description: 'Contract management and tracking',
      permissions: ['contracts_view'],
      isActive: true,
      order: 5
    },
    {
      id: 'supply_chain',
      name: 'Supply Chain',
      icon: Package,
      path: '/supply-chain',
      badge: '156',
      badgeColor: 'bg-indigo-100 text-indigo-800',
      description: 'Supply chain and inventory management',
      permissions: ['supply_chain_view'],
      isActive: true,
      order: 6
    },
    {
      id: 'sales',
      name: 'Sales & Marketing',
      icon: TrendingUp,
      path: '/sales',
      badge: '45',
      badgeColor: 'bg-pink-100 text-pink-800',
      description: 'Sales pipeline and marketing campaigns',
      permissions: ['sales_view'],
      isActive: true,
      order: 7
    },
    {
      id: 'hse',
      name: 'HSE Compliance',
      icon: Shield,
      path: '/hse',
      badge: 'AI',
      badgeColor: 'bg-red-100 text-red-800',
      description: 'Health, Safety & Environmental compliance',
      permissions: ['hse_view'],
      isActive: true,
      order: 8
    },
    {
      id: 'reporting',
      name: 'Reporting & Analytics',
      icon: BarChart3,
      path: '/reporting',
      badge: 'AI',
      badgeColor: 'bg-teal-100 text-teal-800',
      description: 'Business intelligence and reporting',
      permissions: ['reporting_view'],
      isActive: true,
      order: 9
    },
    {
      id: 'rto',
      name: 'RTO & APC',
      icon: Activity,
      path: '/rto-apc',
      badge: '67',
      badgeColor: 'bg-yellow-100 text-yellow-800',
      description: 'Regional Transport Office and APC management',
      permissions: ['rto_view'],
      isActive: true,
      order: 10
    },
    {
      id: 'contacts',
      name: 'Contacts',
      icon: Phone,
      path: '/contacts',
      description: 'Contact and client management',
      permissions: ['contacts_view'],
      isActive: true,
      order: 11
    }
  ];
  
  // Super Admin Module
  if (permissions.includes('super_admin')) {
    allModules.push({
      id: 'super_admin',
      name: 'Super Admin AI Hub',
      icon: Shield,
      path: '/super-admin',
      badge: 'AI',
      badgeColor: 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800',
      description: 'System administration and AI tools',
      permissions: ['super_admin'],
      isActive: true,
      order: 0 // Highest priority
    });
  }
  
  // Filter modules based on permissions and sort by order
  return allModules
    .filter(module => 
      module.isActive && 
      module.permissions.some(perm => permissions.includes(perm))
    )
    .sort((a, b) => a.order - b.order);
};

// Configure dashboard widgets
const getWidgetsConfig = (permissions: string[], env: any): DashboardWidget[] => {
  const allWidgets: DashboardWidget[] = [
    {
      id: 'projects_stats',
      title: 'Projects',
      type: 'stat',
      icon: Building2,
      color: {
        primary: 'blue-600',
        background: 'blue-100',
        text: 'slate-900'
      },
      size: 'medium',
      permissions: ['projects_view'],
      isActive: true,
      order: 1,
      apiEndpoint: '/projects/projects/',
      fallbackValue: '12'
    },
    {
      id: 'finance_stats',
      title: 'Finance',
      type: 'stat',
      icon: DollarSign,
      color: {
        primary: 'green-600',
        background: 'green-100',
        text: 'slate-900'
      },
      size: 'medium',
      permissions: ['finance_view'],
      isActive: true,
      order: 2,
      apiEndpoint: '/finance/budgets/',
      fallbackValue: '$2.4M'
    },
    {
      id: 'hr_stats',
      title: 'Human Resources',
      type: 'stat',
      icon: Users,
      color: {
        primary: 'purple-600',
        background: 'purple-100',
        text: 'slate-900'
      },
      size: 'medium',
      permissions: ['hr_view'],
      isActive: true,
      order: 3,
      fallbackValue: '89'
    },
    {
      id: 'sales_stats',
      title: 'Sales',
      type: 'stat',
      icon: TrendingUp,
      color: {
        primary: 'orange-600',
        background: 'orange-100',
        text: 'slate-900'
      },
      size: 'medium',
      permissions: ['sales_view'],
      isActive: true,
      order: 4,
      apiEndpoint: '/sales/opportunities/',
      fallbackValue: '45'
    },
    {
      id: 'hse_stats',
      title: 'HSE Compliance',
      type: 'stat',
      icon: Shield,
      color: {
        primary: 'red-600',
        background: 'red-100',
        text: 'slate-900'
      },
      size: 'medium',
      permissions: ['hse_view'],
      isActive: true,
      order: 5,
      apiEndpoint: '/hse/assessments/',
      fallbackValue: '98%'
    },
    {
      id: 'supply_chain_stats',
      title: 'Supply Chain',
      type: 'stat',
      icon: Package,
      color: {
        primary: 'indigo-600',
        background: 'indigo-100',
        text: 'slate-900'
      },
      size: 'medium',
      permissions: ['supply_chain_view'],
      isActive: true,
      order: 6,
      apiEndpoint: '/supply-chain/vendors/',
      fallbackValue: '156'
    }
  ];
  
  // Super Admin Widgets
  if (permissions.includes('super_admin')) {
    allWidgets.push(
      {
        id: 'system_health',
        title: 'System Health',
        type: 'stat',
        icon: Activity,
        value: '98.5%',
        color: {
          primary: 'green-600',
          background: 'green-100',
          text: 'slate-900'
        },
        size: 'medium',
        permissions: ['super_admin'],
        isActive: true,
        order: 0,
        fallbackValue: '98%'
      },
      {
        id: 'total_users',
        title: 'Total Users',
        type: 'stat',
        icon: Users,
        value: '247',
        color: {
          primary: 'blue-600',
          background: 'blue-100',
          text: 'slate-900'
        },
        size: 'medium',
        permissions: ['super_admin'],
        isActive: true,
        order: 0.1,
        fallbackValue: '200+'
      }
    );
  }
  
  // Filter widgets based on permissions and sort by order
  return allWidgets
    .filter(widget => 
      widget.isActive && 
      widget.permissions.some(perm => permissions.includes(perm))
    )
    .sort((a, b) => a.order - b.order);
};

// Theme Configuration
export const getThemeConfig = () => ({
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe', 
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      900: '#1e3a8a'
    },
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      500: '#22c55e',
      600: '#16a34a'
    },
    warning: {
      50: '#fefce8',
      100: '#fef3c7',
      500: '#eab308',
      600: '#ca8a04'
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      500: '#ef4444',
      600: '#dc2626'
    }
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem'
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem'
  }
});

export default getDashboardConfig;