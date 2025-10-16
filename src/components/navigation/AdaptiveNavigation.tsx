/**
 * AI-Powered Adaptive Navigation
 * =============================
 * 
 * Intelligent navigation system that adapts based on:
 * - User roles and permissions
 * - AI-predicted user preferences
 * - Real-time access patterns
 * - Risk-based navigation filtering
 */

'use client';

import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSafePathname } from '../../hooks/useSafePathname';
import { useRBAC } from '../../contexts/RBACContext';
import PermissionGuard from '../auth/PermissionGuard';

// Navigation Item Interface
interface NavItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
  description?: string;
  
  // Permission requirements
  requiredRoles?: string[];
  requiredPermissions?: Array<{
    resource: string;
    action: string;
  }>;
  requiredPermissionLevel?: string;
  userTypes?: ('staff' | 'superuser')[];
  maxRiskThreshold?: number;
  
  // AI features
  aiPriority?: number; // 0-1, higher means more important
  aiScore?: number; // Calculated AI score for sorting/display
  usagePatterns?: string[]; // contexts where this item is commonly used
  
  // Visual properties
  badge?: string | number;
  isNew?: boolean;
  isDeprecated?: boolean;
  
  // Sub-items
  children?: NavItem[];
}

// Navigation Props
interface AdaptiveNavigationProps {
  items?: NavItem[];
  className?: string;
  showAIInsights?: boolean;
  enablePersonalization?: boolean;
  maxVisibleItems?: number;
}

// Default Navigation Items with RBAC
const defaultNavItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
      </svg>
    ),
    aiPriority: 1.0,
    usagePatterns: ['daily-overview', 'quick-access'],
  },
  
  // Human Resources
  {
    id: 'hr',
    label: 'Human Resources',
    href: '/hr',
    requiredRoles: ['HR_Manager', 'HR_Specialist', 'SuperAdmin'],
    requiredPermissionLevel: 'management',
    aiPriority: 0.8,
    usagePatterns: ['employee-management', 'payroll'],
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    children: [
      {
        id: 'hr-employees',
        label: 'Employee Management',
        href: '/hr/employees',
        requiredPermissions: [{ resource: 'employee', action: 'view' }],
        aiPriority: 0.9,
      },
      {
        id: 'hr-payroll',
        label: 'Payroll Management',
        href: '/hr/payroll',
        requiredPermissions: [{ resource: 'payroll', action: 'view' }],
        maxRiskThreshold: 0.6,
        aiPriority: 0.7,
      },
    ],
  },
  
  // Finance
  {
    id: 'finance',
    label: 'Finance',
    href: '/finance',
    requiredRoles: ['Finance_Manager', 'Finance_Analyst', 'Executive', 'SuperAdmin'],
    requiredPermissionLevel: 'management',
    maxRiskThreshold: 0.7,
    aiPriority: 0.8,
    usagePatterns: ['financial-reporting', 'budget-planning'],
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
      </svg>
    ),
    children: [
      {
        id: 'finance-reports',
        label: 'Financial Reports',
        href: '/finance/reports',
        requiredPermissions: [{ resource: 'financial_report', action: 'view' }],
        aiPriority: 0.9,
      },
      {
        id: 'finance-budget',
        label: 'Budget Planning',
        href: '/finance/budget',
        requiredPermissions: [{ resource: 'budget', action: 'manage' }],
        requiredPermissionLevel: 'executive_high',
        maxRiskThreshold: 0.5,
        aiPriority: 0.8,
      },
    ],
  },
  
  // Projects
  {
    id: 'projects',
    label: 'Project Management',
    href: '/projects',
    requiredRoles: ['Project_Manager', 'Team_Lead', 'SuperAdmin'],
    aiPriority: 0.9,
    usagePatterns: ['project-tracking', 'team-coordination'],
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  
  // AI Dashboard (for AI specialists)
  {
    id: 'ai-dashboard',
    label: 'AI Intelligence',
    href: '/ai-dashboard',
    requiredRoles: ['AI_Specialist', 'Data_Scientist', 'SuperAdmin'],
    requiredPermissionLevel: 'ai_specialist',
    maxRiskThreshold: 0.8,
    aiPriority: 0.95,
    usagePatterns: ['ai-monitoring', 'model-management'],
    badge: 'AI',
    isNew: true,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    children: [
      {
        id: 'ai-models',
        label: 'Model Management',
        href: '/ai-dashboard/models',
        requiredPermissions: [{ resource: 'ai_model', action: 'manage' }],
        aiPriority: 0.8,
      },
      {
        id: 'ai-analytics',
        label: 'AI Analytics',
        href: '/ai-dashboard/analytics',
        requiredPermissions: [{ resource: 'ai_analytics', action: 'view' }],
        aiPriority: 0.9,
      },
    ],
  },
  
  // Administration (for admins only)
  {
    id: 'admin',
    label: 'Administration',
    href: '/admin',
    userTypes: ['staff'],
    requiredPermissionLevel: 'executive_max',
    maxRiskThreshold: 0.3,
    aiPriority: 0.6,
    usagePatterns: ['system-management', 'user-administration'],
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  
  // Settings (available to all users)
  {
    id: 'settings',
    label: 'Settings',
    href: '/settings',
    aiPriority: 0.4,
    usagePatterns: ['profile-management', 'preferences'],
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

// AI-Powered Adaptive Navigation Component
const AdaptiveNavigation: React.FC<AdaptiveNavigationProps> = ({
  items = defaultNavItems,
  className = '',
  showAIInsights = false,
  enablePersonalization = true,
  maxVisibleItems = 10,
}) => {
  // Soft coding approach: Use safe pathname handling to prevent null errors
  const safePathname = useSafePathname();
  const { state, getAccessPattern } = useRBAC();
  
  const [userPreferences, setUserPreferences] = useState<Map<string, number>>(new Map());
  const [aiRecommendations, setAiRecommendations] = useState<string[]>([]);

  // AI-Enhanced Item Filtering and Sorting
  const adaptiveItems = useMemo(() => {
    if (!state.isAuthenticated) {
      return [];
    }

    // Calculate AI scores for each item
    const scoredItems = items.map(item => {
      let score = item.aiPriority || 0.5;
      
      // Boost score based on user preferences
      const userPref = userPreferences.get(item.id) || 0;
      score += userPref * 0.3;
      
      // Boost score based on access patterns
      const accessPatterns = getAccessPattern();
      const itemUsage = accessPatterns.filter(pattern => 
        pattern.resource.includes(item.id) || 
        (item.usagePatterns && item.usagePatterns.some(pattern => 
          accessPatterns.some(ap => ap.resource.includes(pattern))
        ))
      );
      
      if (itemUsage.length > 0) {
        const avgRisk = itemUsage.reduce((sum, usage) => sum + usage.riskScore, 0) / itemUsage.length;
        score += (1 - avgRisk) * 0.2; // Lower risk = higher score
      }
      
      // Time-based relevance (recent usage gets higher priority)
      const recentUsage = itemUsage.filter(usage => {
        const usageTime = new Date(usage.timestamp);
        const daysSince = (Date.now() - usageTime.getTime()) / (1000 * 60 * 60 * 24);
        return daysSince <= 7; // Last 7 days
      });
      
      if (recentUsage.length > 0) {
        score += recentUsage.length * 0.1;
      }
      
      return { ...item, aiScore: score };
    });

    // Sort by AI score (descending)
    scoredItems.sort((a, b) => (b.aiScore || 0) - (a.aiScore || 0));
    
    // Limit visible items if specified
    return scoredItems.slice(0, maxVisibleItems);
  }, [items, state.isAuthenticated, userPreferences, getAccessPattern, maxVisibleItems]);

  // Generate AI Recommendations
  useEffect(() => {
    if (!enablePersonalization || !state.isAuthenticated) return;

    const generateRecommendations = () => {
      const accessPatterns = getAccessPattern();
      const recommendations: string[] = [];

      // Analyze patterns for recommendations
      const resourceUsage = new Map<string, number>();
      accessPatterns.forEach(pattern => {
        const count = resourceUsage.get(pattern.resource) || 0;
        resourceUsage.set(pattern.resource, count + 1);
      });

      // Find underutilized high-priority items
      adaptiveItems.forEach(item => {
        const usage = resourceUsage.get(item.id) || 0;
        const highPriority = (item.aiPriority || 0) > 0.7;
        const lowUsage = usage < 3; // Used less than 3 times

        if (highPriority && lowUsage) {
          recommendations.push(item.id);
        }
      });

      setAiRecommendations(recommendations.slice(0, 3)); // Top 3 recommendations
    };

    generateRecommendations();
    
    // Update recommendations every 5 minutes
    const interval = setInterval(generateRecommendations, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [enablePersonalization, state.isAuthenticated, adaptiveItems, getAccessPattern]);

  // Track Navigation Usage
  const trackNavigation = (itemId: string) => {
    if (enablePersonalization) {
      const currentPref = userPreferences.get(itemId) || 0;
      setUserPreferences(new Map(userPreferences.set(itemId, currentPref + 0.1)));
      
      // Persist preferences to localStorage
      const prefsArray = Array.from(userPreferences.entries());
      localStorage.setItem('nav-preferences', JSON.stringify(prefsArray));
    }
  };

  // Load Preferences from localStorage
  useEffect(() => {
    if (enablePersonalization) {
      const savedPrefs = localStorage.getItem('nav-preferences');
      if (savedPrefs) {
        try {
          const prefsArray = JSON.parse(savedPrefs);
          setUserPreferences(new Map(prefsArray));
        } catch (error) {
          console.error('Error loading navigation preferences:', error);
        }
      }
    }
  }, [enablePersonalization]);

  // Navigation Item Component
  const NavItem: React.FC<{ item: NavItem; isChild?: boolean }> = ({ 
    item, 
    isChild = false 
  }) => {
    const isActive = safePathname === item.href || safePathname.startsWith(item.href + '/');
    const isRecommended = aiRecommendations.includes(item.id);
    
    return (
      <PermissionGuard
        roles={item.requiredRoles}
        permissionLevel={item.requiredPermissionLevel}
        userType={item.userTypes?.[0]}
        maxRiskThreshold={item.maxRiskThreshold}
        resource={item.id}
        action="view"
        hideOnDeny={true}
      >
        <div className={isChild ? 'ml-6' : ''}>
          <Link
            href={item.href}
            onClick={() => trackNavigation(item.id)}
            className={`
              flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200
              ${isActive 
                ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-500' 
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }
              ${isRecommended ? 'ring-2 ring-yellow-300 ring-opacity-50' : ''}
            `}
          >
            {item.icon && (
              <span className={`mr-3 ${isActive ? 'text-blue-500' : 'text-gray-400'}`}>
                {item.icon}
              </span>
            )}
            
            <span className="flex-1">{item.label}</span>
            
            {/* Badges and Indicators */}
            <div className="flex items-center space-x-2">
              {item.badge && (
                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                  {item.badge}
                </span>
              )}
              
              {item.isNew && (
                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                  New
                </span>
              )}
              
              {isRecommended && (
                <span className="w-2 h-2 bg-yellow-400 rounded-full" title="AI Recommended" />
              )}
              
              {showAIInsights && item.aiScore !== undefined && (
                <span className="text-xs text-gray-500">
                  {Math.round((item.aiScore || 0) * 100)}%
                </span>
              )}
            </div>
          </Link>
          
          {/* Sub-items */}
          {item.children && item.children.length > 0 && (isActive || safePathname.startsWith(item.href)) && (
            <div className="mt-1 space-y-1">
              {item.children.map(child => (
                <NavItem key={child.id} item={child} isChild={true} />
              ))}
            </div>
          )}
        </div>
      </PermissionGuard>
    );
  };

  if (!state.isAuthenticated) {
    return null;
  }

  return (
    <nav className={`space-y-1 ${className}`}>
      {/* AI Recommendations Banner */}
      {showAIInsights && aiRecommendations.length > 0 && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="text-xs font-medium text-blue-800 mb-1">
            AI Recommendations
          </div>
          <div className="text-xs text-blue-600">
            Try exploring: {aiRecommendations.map(id => 
              adaptiveItems.find(item => item.id === id)?.label
            ).filter(Boolean).join(', ')}
          </div>
        </div>
      )}
      
      {/* Navigation Items */}
      {adaptiveItems.map(item => (
        <NavItem key={item.id} item={item} />
      ))}
      
      {/* AI Insights Panel */}
      {showAIInsights && state.user && (
        <div className="mt-6 p-3 bg-gray-50 rounded-lg">
          <div className="text-xs font-medium text-gray-700 mb-2">
            AI Navigation Insights
          </div>
          <div className="space-y-1 text-xs text-gray-600">
            <div>Permission Level: {state.user.permissionLevel}</div>
            <div>Active Roles: {state.user.roles.filter(r => r.isActive).length}</div>
            <div>Risk Score: {((state.user.riskProfile?.aiRiskScore || 0) * 100).toFixed(1)}%</div>
            <div>Access Patterns: {getAccessPattern().length} recorded</div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AdaptiveNavigation;