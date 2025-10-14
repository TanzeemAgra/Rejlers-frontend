import { 
  Building2, 
  Users, 
  DollarSign, 
  FileText, 
  Package, 
  TrendingUp, 
  Shield, 
  BarChart3,
  Settings,
  UserCheck,
  Phone,
  Home,
  Database,
  Bell,
  Search,
  Calendar,
  Mail,
  Download,
  Upload,
  Plus,
  Edit,
  Trash2,
  Eye,
  Filter,
  RefreshCw,
  LogOut,
  HelpCircle
} from 'lucide-react';

// Module Configuration with soft coding approach
export interface SidebarModule {
  id: string;
  title: string;
  icon: any;
  badge?: string;
  badgeColor?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'indigo';
  children?: SidebarItem[];
  path?: string;
  permissions?: string[];
  isActive: boolean;
}

export interface SidebarItem {
  id: string;
  title: string;
  icon?: any;
  path: string;
  badge?: string;
  badgeColor?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'indigo';
  permissions?: string[];
  description?: string;
}

// Centralized sidebar configuration using soft coding
export const getSidebarConfiguration = (): SidebarModule[] => {
  return [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: Home,
      path: '/dashboard',
      isActive: true,
      permissions: ['view_dashboard']
    },
    {
      id: 'projects',
      title: 'Projects & Engineering',
      icon: Building2,
      badge: '12',
      badgeColor: 'blue',
      isActive: true,
      permissions: ['view_projects'],
      children: [
        {
          id: 'projects-list',
          title: 'All Projects',
          icon: Building2,
          path: '/projects',
          description: 'View and manage all engineering projects'
        },
        {
          id: 'projects-create',
          title: 'New Project',
          icon: Plus,
          path: '/projects/create',
          description: 'Create a new engineering project'
        },
        {
          id: 'project-templates',
          title: 'Project Templates',
          icon: FileText,
          path: '/projects/templates',
          description: 'Manage project templates and standards'
        },
        {
          id: 'project-reports',
          title: 'Project Reports',
          icon: BarChart3,
          path: '/projects/reports',
          description: 'Generate project performance reports'
        },
        {
          id: 'milestones',
          title: 'Milestones',
          icon: Calendar,
          path: '/projects/milestones',
          badge: '5',
          badgeColor: 'yellow',
          description: 'Track project milestones and deadlines'
        }
      ]
    },
    {
      id: 'hr',
      title: 'Human Resources',
      icon: Users,
      badge: '89',
      badgeColor: 'green',
      isActive: true,
      permissions: ['view_hr'],
      children: [
        {
          id: 'employees',
          title: 'Employees',
          icon: Users,
          path: '/hr/employees',
          description: 'Manage employee records and profiles'
        },
        {
          id: 'departments',
          title: 'Departments',
          icon: Building2,
          path: '/hr/departments',
          description: 'Organize departments and teams'
        },
        {
          id: 'positions',
          title: 'Positions',
          icon: UserCheck,
          path: '/hr/positions',
          description: 'Define job positions and roles'
        },
        {
          id: 'attendance',
          title: 'Attendance',
          icon: Calendar,
          path: '/hr/attendance',
          badge: '3',
          badgeColor: 'red',
          description: 'Track employee attendance and time-off'
        },
        {
          id: 'payroll',
          title: 'Payroll',
          icon: DollarSign,
          path: '/hr/payroll',
          description: 'Manage employee compensation and benefits'
        }
      ]
    },
    {
      id: 'finance',
      title: 'Finance Management',
      icon: DollarSign,
      badge: 'New',
      badgeColor: 'purple',
      isActive: true,
      permissions: ['view_finance'],
      children: [
        {
          id: 'budgets',
          title: 'Budgets',
          icon: BarChart3,
          path: '/finance/budgets',
          description: 'Plan and track project budgets'
        },
        {
          id: 'invoices',
          title: 'Invoices',
          icon: FileText,
          path: '/finance/invoices',
          badge: '7',
          badgeColor: 'blue',
          description: 'Generate and manage client invoices'
        },
        {
          id: 'expenses',
          title: 'Expenses',
          icon: Download,
          path: '/finance/expenses',
          description: 'Track project and operational expenses'
        },
        {
          id: 'payments',
          title: 'Payments',
          icon: DollarSign,
          path: '/finance/payments',
          description: 'Process and track payments'
        },
        {
          id: 'financial-reports',
          title: 'Financial Reports',
          icon: BarChart3,
          path: '/finance/reports',
          description: 'Generate comprehensive financial reports'
        }
      ]
    },
    {
      id: 'contracts',
      title: 'Contracts',
      icon: FileText,
      badge: '23',
      badgeColor: 'indigo',
      isActive: true,
      permissions: ['view_contracts'],
      children: [
        {
          id: 'contracts-list',
          title: 'All Contracts',
          icon: FileText,
          path: '/contracts',
          description: 'View and manage all contracts'
        },
        {
          id: 'contract-templates',
          title: 'Templates',
          icon: Database,
          path: '/contracts/templates',
          description: 'Manage contract templates'
        },
        {
          id: 'amendments',
          title: 'Amendments',
          icon: Edit,
          path: '/contracts/amendments',
          badge: '4',
          badgeColor: 'yellow',
          description: 'Track contract amendments and changes'
        },
        {
          id: 'approvals',
          title: 'Approvals',
          icon: UserCheck,
          path: '/contracts/approvals',
          badge: '2',
          badgeColor: 'red',
          description: 'Manage contract approval workflow'
        }
      ]
    },
    {
      id: 'supply-chain',
      title: 'Supply Chain',
      icon: Package,
      badge: '156',
      badgeColor: 'blue',
      isActive: true,
      permissions: ['view_supply_chain'],
      children: [
        {
          id: 'vendors',
          title: 'Vendors',
          icon: Building2,
          path: '/supply-chain/vendors',
          description: 'Manage supplier and vendor relationships'
        },
        {
          id: 'purchase-orders',
          title: 'Purchase Orders',
          icon: Upload,
          path: '/supply-chain/orders',
          badge: '8',
          badgeColor: 'green',
          description: 'Create and track purchase orders'
        },
        {
          id: 'inventory',
          title: 'Inventory',
          icon: Package,
          path: '/supply-chain/inventory',
          description: 'Monitor stock levels and inventory'
        },
        {
          id: 'procurement',
          title: 'Procurement',
          icon: Search,
          path: '/supply-chain/procurement',
          description: 'Manage procurement processes'
        },
        {
          id: 'logistics',
          title: 'Logistics',
          icon: TrendingUp,
          path: '/supply-chain/logistics',
          description: 'Track deliveries and logistics'
        }
      ]
    },
    {
      id: 'sales',
      title: 'Sales & Marketing',
      icon: TrendingUp,
      badge: '45',
      badgeColor: 'green',
      isActive: true,
      permissions: ['view_sales'],
      children: [
        {
          id: 'leads',
          title: 'Leads',
          icon: Users,
          path: '/sales/leads',
          badge: '12',
          badgeColor: 'blue',
          description: 'Manage sales leads and prospects'
        },
        {
          id: 'opportunities',
          title: 'Opportunities',
          icon: TrendingUp,
          path: '/sales/opportunities',
          badge: '7',
          badgeColor: 'yellow',
          description: 'Track sales opportunities and pipeline'
        },
        {
          id: 'clients',
          title: 'Clients',
          icon: Building2,
          path: '/sales/clients',
          description: 'Manage client relationships and accounts'
        },
        {
          id: 'proposals',
          title: 'Proposals',
          icon: FileText,
          path: '/sales/proposals',
          badge: '3',
          badgeColor: 'purple',
          description: 'Create and manage project proposals'
        },
        {
          id: 'sales-reports',
          title: 'Sales Reports',
          icon: BarChart3,
          path: '/sales/reports',
          description: 'Analyze sales performance and metrics'
        }
      ]
    },
    {
      id: 'hse',
      title: 'HSE Compliance',
      icon: Shield,
      badge: '!',
      badgeColor: 'red',
      isActive: true,
      permissions: ['view_hse'],
      children: [
        {
          id: 'incidents',
          title: 'Incidents',
          icon: Shield,
          path: '/hse/incidents',
          badge: '2',
          badgeColor: 'red',
          description: 'Report and track safety incidents'
        },
        {
          id: 'assessments',
          title: 'Risk Assessments',
          icon: Search,
          path: '/hse/assessments',
          description: 'Conduct safety and environmental assessments'
        },
        {
          id: 'compliance',
          title: 'Compliance',
          icon: UserCheck,
          path: '/hse/compliance',
          badge: '95%',
          badgeColor: 'green',
          description: 'Monitor regulatory compliance status'
        },
        {
          id: 'training',
          title: 'Safety Training',
          icon: Users,
          path: '/hse/training',
          description: 'Manage safety training programs'
        },
        {
          id: 'audits',
          title: 'Audits',
          icon: Eye,
          path: '/hse/audits',
          description: 'Schedule and conduct safety audits'
        }
      ]
    },
    {
      id: 'reporting',
      title: 'Reporting & Analytics',
      icon: BarChart3,
      isActive: true,
      permissions: ['view_reports'],
      children: [
        {
          id: 'dashboards',
          title: 'Executive Dashboard',
          icon: Home,
          path: '/reports/executive',
          description: 'High-level business metrics and KPIs'
        },
        {
          id: 'project-reports',
          title: 'Project Reports',
          icon: Building2,
          path: '/reports/projects',
          description: 'Detailed project performance analysis'
        },
        {
          id: 'financial-reports',
          title: 'Financial Reports',
          icon: DollarSign,
          path: '/reports/financial',
          description: 'Comprehensive financial analysis'
        },
        {
          id: 'custom-reports',
          title: 'Custom Reports',
          icon: Settings,
          path: '/reports/custom',
          description: 'Build custom reports and analytics'
        }
      ]
    },
    {
      id: 'rto-apc',
      title: 'RTO & APC',
      icon: UserCheck,
      badge: '67',
      badgeColor: 'indigo',
      isActive: true,
      permissions: ['view_rto'],
      children: [
        {
          id: 'certifications',
          title: 'Certifications',
          icon: UserCheck,
          path: '/rto/certifications',
          description: 'Manage professional certifications'
        },
        {
          id: 'training-programs',
          title: 'Training Programs',
          icon: Users,
          path: '/rto/programs',
          badge: '8',
          badgeColor: 'blue',
          description: 'Organize training and development programs'
        },
        {
          id: 'assessments',
          title: 'Assessments',
          icon: FileText,
          path: '/rto/assessments',
          description: 'Conduct competency assessments'
        },
        {
          id: 'compliance-tracking',
          title: 'Compliance Tracking',
          icon: Shield,
          path: '/rto/compliance',
          badge: '98%',
          badgeColor: 'green',
          description: 'Track regulatory compliance and standards'
        }
      ]
    },
    {
      id: 'contacts',
      title: 'Contacts',
      icon: Phone,
      badge: '234',
      badgeColor: 'blue',
      isActive: true,
      permissions: ['view_contacts'],
      children: [
        {
          id: 'contacts-list',
          title: 'All Contacts',
          icon: Phone,
          path: '/contacts',
          description: 'Manage business contacts and relationships'
        },
        {
          id: 'companies',
          title: 'Companies',
          icon: Building2,
          path: '/contacts/companies',
          description: 'Organize contacts by company'
        },
        {
          id: 'communications',
          title: 'Communications',
          icon: Mail,
          path: '/contacts/communications',
          badge: '15',
          badgeColor: 'green',
          description: 'Track communications and interactions'
        }
      ]
    }
  ];
};

// Get active modules based on user permissions
export const getActiveModules = (userPermissions: string[] = []): SidebarModule[] => {
  const allModules = getSidebarConfiguration();
  
  return allModules.filter(module => {
    if (!module.permissions || module.permissions.length === 0) {
      return module.isActive;
    }
    
    return module.isActive && module.permissions.some(permission => 
      userPermissions.includes(permission)
    );
  });
};

// Get module by ID
export const getModuleById = (moduleId: string): SidebarModule | undefined => {
  const modules = getSidebarConfiguration();
  return modules.find(module => module.id === moduleId);
};

// Search modules and items
export const searchModules = (query: string): { module: SidebarModule; item?: SidebarItem }[] => {
  const modules = getSidebarConfiguration();
  const results: { module: SidebarModule; item?: SidebarItem }[] = [];
  
  modules.forEach(module => {
    // Search in module title
    if (module.title.toLowerCase().includes(query.toLowerCase())) {
      results.push({ module });
    }
    
    // Search in module items
    module.children?.forEach(item => {
      if (
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description?.toLowerCase().includes(query.toLowerCase())
      ) {
        results.push({ module, item });
      }
    });
  });
  
  return results;
};