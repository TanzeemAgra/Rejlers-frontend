import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  Menu,
  X,
  Home,
  Users,
  FileText,
  DollarSign,
  Shield,
  BarChart3,
  Settings,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';
import { useRBAC } from '../../contexts/RBACContext';

interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  requiredPermission?: {
    resource: string;
    action: string;
  };
  children?: NavigationItem[];
}

interface AdaptiveNavigationProps {
  className?: string;
}

/**
 * AI-Powered Adaptive Navigation Component
 * 
 * Features:
 * - Role-based menu filtering
 * - AI-powered usage predictions
 * - Contextual navigation recommendations
 * - Security-aware menu items
 */
const AdaptiveNavigation: React.FC<AdaptiveNavigationProps> = ({ className = '' }) => {
  // Soft coding approach: Only destructure methods that are actually needed
  const { state, checkPermission, hasRole } = useRBAC();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [filteredNavigation, setFilteredNavigation] = useState<NavigationItem[]>([]);
  const [aiRecommendations, setAiRecommendations] = useState<string[]>([]);
  const [securityAlerts, setSecurityAlerts] = useState<number>(0);

  const user = state.user;

  // Base navigation structure
  const baseNavigation: NavigationItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      href: '/dashboard',
      icon: <Home className="w-5 h-5" />,
    },
    {
      id: 'contacts',
      label: 'Contacts',
      href: '/contacts',
      icon: <Users className="w-5 h-5" />,
      requiredPermission: {
        resource: 'contact',
        action: 'view'
      },
    },
    {
      id: 'projects',
      label: 'Projects',
      href: '/projects',
      icon: <FileText className="w-5 h-5" />,
      requiredPermission: {
        resource: 'project',
        action: 'view'
      },
    },
    {
      id: 'finance',
      label: 'Finance',
      href: '/finance',
      icon: <DollarSign className="w-5 h-5" />,
      requiredPermission: {
        resource: 'finance_data',
        action: 'view'
      },
    },
    {
      id: 'hr',
      label: 'Human Resources',
      href: '/hr',
      icon: <Users className="w-5 h-5" />,
      requiredPermission: {
        resource: 'hr_data',
        action: 'view'
      },
    },
    {
      id: 'reporting',
      label: 'Reporting',
      href: '/reports',
      icon: <BarChart3 className="w-5 h-5" />,
      requiredPermission: {
        resource: 'report',
        action: 'view'
      },
      children: [
        {
          id: 'financial-reports',
          label: 'Financial Reports',
          href: '/reports/financial',
          icon: <DollarSign className="w-4 h-4" />,
          requiredPermission: {
            resource: 'finance_report',
            action: 'view'
          },
        },
        {
          id: 'hr-reports',
          label: 'HR Reports',
          href: '/reports/hr',
          icon: <Users className="w-4 h-4" />,
          requiredPermission: {
            resource: 'hr_report',
            action: 'view'
          },
        },
      ],
    },
    {
      id: 'security',
      label: 'Security & Compliance',
      href: '/security',
      icon: <Shield className="w-5 h-5" />,
      requiredPermission: {
        resource: 'security_management',
        action: 'view'
      },
    },
    {
      id: 'settings',
      label: 'Settings',
      href: '/settings',
      icon: <Settings className="w-5 h-5" />,
      requiredPermission: {
        resource: 'system_settings',
        action: 'view'
      },
    },
  ];

  // Filter navigation items based on user permissions
  const filterNavigationByPermissions = async (items: NavigationItem[]): Promise<NavigationItem[]> => {
    const filteredItems: NavigationItem[] = [];

    for (const item of items) {
      let hasAccess = true;

      // Check permission if required
      if (item.requiredPermission) {
        try {
          hasAccess = await checkPermission(
            item.requiredPermission.resource,
            item.requiredPermission.action
          );
        } catch (error) {
          console.error(`Permission check failed for ${item.id}:`, error);
          hasAccess = false;
        }
      }

      if (hasAccess) {
        const filteredItem = { ...item };

        // Recursively filter children
        if (item.children && item.children.length > 0) {
          filteredItem.children = await filterNavigationByPermissions(item.children);
        }

        filteredItems.push(filteredItem);
      }
    }

    return filteredItems;
  };

  // Get AI-powered navigation recommendations
  const getAiRecommendations = async () => {
    try {
      // Use current user context
      const currentTime = new Date().getHours();
      
      // Simulate AI recommendations based on context
      const recommendations: string[] = [];
      
      // Time-based recommendations
      if (currentTime >= 9 && currentTime <= 17) {
        if (hasRole('Finance_Manager')) {
          recommendations.push('finance');
        }
        if (hasRole('HR_Manager')) {
          recommendations.push('hr');
        }
      }
      
      // Role-based recommendations
      if (hasRole('Project_Manager')) {
        recommendations.push('projects');
      }
      
      // Current page context
      const currentPath = router.pathname;
      if (currentPath.includes('/projects')) {
        recommendations.push('reporting');
      }
      
      setAiRecommendations(recommendations);
    } catch (error) {
      console.error('Failed to get AI recommendations:', error);
    }
  };

  // Initialize navigation filtering and AI recommendations
  useEffect(() => {
    const initializeNavigation = async () => {
      if (user) {
        const filtered = await filterNavigationByPermissions(baseNavigation);
        setFilteredNavigation(filtered);
        await getAiRecommendations();
      }
    };

    initializeNavigation();
  }, [user, router.pathname]);

  // Mock security alerts (in real implementation, this would come from the API)
  useEffect(() => {
    if (hasRole('Security_Officer') || hasRole('Admin')) {
      // Simulate security alerts
      setSecurityAlerts(Math.floor(Math.random() * 3));
    }
  }, [user]);

  const isActiveRoute = (href: string): boolean => {
    return router.pathname === href || router.pathname.startsWith(href + '/');
  };

  const isRecommended = (itemId: string): boolean => {
    return aiRecommendations.includes(itemId);
  };

  const renderNavigationItem = (item: NavigationItem, level = 0) => {
    const isActive = isActiveRoute(item.href);
    const isRecommendedItem = isRecommended(item.id);
    
    return (
      <div key={item.id} className={`${level > 0 ? 'ml-4' : ''}`}>
        <Link
          href={item.href}
          className={`
            flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200
            ${isActive 
              ? 'bg-blue-600 text-white shadow-lg' 
              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }
            ${isRecommendedItem 
              ? 'border-l-4 border-green-500 bg-green-50' 
              : ''
            }
            ${level > 0 ? 'text-xs py-2' : ''}
          `}
          onClick={() => setIsOpen(false)}
        >
          <span className={`${level > 0 ? 'mr-2' : 'mr-3'}`}>
            {item.icon}
          </span>
          <span className="flex-1">{item.label}</span>
          
          {/* AI recommendation indicator */}
          {isRecommendedItem && (
            <div className="w-2 h-2 bg-green-500 rounded-full ml-2" 
                 title="AI Recommended" />
          )}
          
          {/* Security alerts indicator */}
          {item.id === 'security' && securityAlerts > 0 && (
            <div className="flex items-center ml-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <span className="ml-1 text-xs bg-red-500 text-white rounded-full px-1 min-w-[16px] h-4 flex items-center justify-center">
                {securityAlerts}
              </span>
            </div>
          )}
          
          {/* Children indicator */}
          {item.children && item.children.length > 0 && (
            <ChevronRight className="w-4 h-4 ml-2" />
          )}
        </Link>
        
        {/* Render children */}
        {item.children && item.children.length > 0 && (
          <div className="mt-1">
            {item.children.map((child) => renderNavigationItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  if (!user) {
    return null;
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          {isOpen ? (
            <X className="block h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="block h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Navigation sidebar */}
      <nav className={`
        ${className}
        ${isOpen ? 'block' : 'hidden'} md:block
        fixed md:relative inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 md:z-auto
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Navigation</h2>
            {aiRecommendations.length > 0 && (
              <div className="flex items-center text-xs text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1" />
                AI Suggestions
              </div>
            )}
          </div>

          {/* Navigation items */}
          <div className="flex-1 overflow-y-auto py-4 space-y-1">
            {filteredNavigation.map((item) => renderNavigationItem(item))}
          </div>

          {/* Footer with user context */}
          <div className="p-4 border-t border-gray-200">
            <div className="text-xs text-gray-500">
              <div>Role: {user?.roles?.[0]?.roleName || 'User'}</div>
              <div className="mt-1">
                Context: {state.permissions.size > 0 ? 'Authorized' : 'General'}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default AdaptiveNavigation;