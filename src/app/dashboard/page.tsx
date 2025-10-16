/**
 * Main Dashboard Page
 * ==================
 * 
 * Central dashboard with overview metrics and quick access to all modules
 */

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Users,
  Building2,
  DollarSign,
  TrendingUp,
  Calendar,
  Clock,
  Award,
  AlertTriangle,
  Activity,
  FileText,
  Package,
  Shield,
  Crown,
  ShieldCheck,
  Brain,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, changeType, icon, color }) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
          <p className={`text-sm mt-1 ${getChangeColor()}`}>
            {change}
          </p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  // Mock data for metrics
  const metrics = [
    {
      title: 'Total Employees',
      value: 1234,
      change: '+5.2% from last month',
      changeType: 'positive' as const,
      icon: <Users className="w-6 h-6 text-white" />,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Projects',
      value: 47,
      change: '+3 this week',
      changeType: 'positive' as const,
      icon: <Building2 className="w-6 h-6 text-white" />,
      color: 'bg-green-500'
    },
    {
      title: 'Monthly Revenue',
      value: '€2.4M',
      change: '+12.5% from last month',
      changeType: 'positive' as const,
      icon: <DollarSign className="w-6 h-6 text-white" />,
      color: 'bg-purple-500'
    },
    {
      title: 'Performance Score',
      value: '94.2%',
      change: '+2.1% improvement',
      changeType: 'positive' as const,
      icon: <TrendingUp className="w-6 h-6 text-white" />,
      color: 'bg-orange-500'
    }
  ];

  // SMART SOFT CODING: Advanced quick actions configuration with expandable features
  const quickActions = [
    {
      title: 'HR AI Dashboard',
      description: 'Advanced HR analytics and insights',
      icon: <Users className="w-5 h-5 text-white" />,
      href: '/hr/ai-dashboard',
      color: 'bg-blue-500',
      type: 'standard'
    },
    {
      title: 'Super Admin AI Hub',
      description: 'Enterprise-grade admin controls with AI-powered compliance management',
      icon: <Crown className="w-5 h-5 text-white" />,
      href: '/hr/ai-dashboard',
      color: 'bg-gradient-to-r from-purple-600 to-blue-600',
      type: 'expandable',
      badge: 'NEW',
      subFeatures: [
        {
          id: 'system-administration',
          name: 'System Administration',
          description: 'Core system administrative functions',
          icon: <Shield className="w-4 h-4" />,
          action: () => window.location.href = '/hr/ai-dashboard?module=super-admin-ai-hub&feature=system-administration'
        },
        {
          id: 'ai-governance',
          name: 'AI Governance',
          description: 'AI system oversight and governance controls',
          icon: <Brain className="w-4 h-4" />,
          action: () => window.location.href = '/hr/ai-dashboard?module=super-admin-ai-hub&feature=ai-governance'
        },
        {
          id: 'compliance-integration',
          name: 'Compliance Integration',
          description: 'Multi-regulatory compliance management (ISO 27001, GDPR, NIST, etc.)',
          icon: <ShieldCheck className="w-4 h-4" />,
          action: () => window.location.href = '/hr/ai-dashboard?module=super-admin-ai-hub&feature=compliance-integration',
          highlight: true
        },
        {
          id: 'rbac-management',
          name: 'Advanced RBAC',
          description: 'Role-based access control with compliance mapping',
          icon: <Users className="w-4 h-4" />,
          action: () => window.location.href = '/hr/ai-dashboard?module=super-admin-ai-hub&feature=rbac-management'
        },
        {
          id: 'audit-intelligence',
          name: 'AI Audit Intelligence',
          description: 'Intelligent audit management and compliance tracking',
          icon: <FileText className="w-4 h-4" />,
          action: () => window.location.href = '/hr/ai-dashboard?module=super-admin-ai-hub&feature=audit-intelligence'
        }
      ]
    },
    {
      title: 'New Project',
      description: 'Start a new project',
      icon: <Building2 className="w-5 h-5 text-white" />,
      href: '/projects/new',
      color: 'bg-green-500',
      type: 'standard'
    },
    {
      title: 'Generate Invoice',
      description: 'Create new client invoice',
      icon: <FileText className="w-5 h-5 text-white" />,
      href: '/finance/invoicing',
      color: 'bg-purple-500',
      type: 'standard'
    },
    {
      title: 'View Reports',
      description: 'Access detailed reports',
      icon: <Activity className="w-5 h-5 text-white" />,
      href: '/reports',
      color: 'bg-orange-500',
      type: 'standard'
    },
    {
      title: 'Employee Management',
      description: 'Manage employee profiles',
      icon: <Users className="w-5 h-5 text-white" />,
      href: '/hr/employees',
      color: 'bg-indigo-500',
      type: 'standard'
    },
    {
      title: 'System Settings',
      description: 'Configure system preferences',
      icon: <Shield className="w-5 h-5 text-white" />,
      href: '/settings',
      color: 'bg-gray-500',
      type: 'standard'
    }
  ];

  // SMART STATE MANAGEMENT: Expandable features state
  const [expandedAction, setExpandedAction] = useState<string | null>(null);
  const router = useRouter();

  // SMART SOFT CODING: Enhanced Quick Action Component with expandable features
  const EnhancedQuickActionCard = ({ action, index }: { action: any; index: number }) => {
    const isExpanded = expandedAction === action.title;
    const isExpandable = action.type === 'expandable';
    
    const handleMainAction = () => {
      if (isExpandable) {
        setExpandedAction(isExpanded ? null : action.title);
      } else {
        router.push(action.href);
      }
    };

    return (
      <div className="relative">
        {/* Main Action Card */}
        <div
          onClick={handleMainAction}
          className={`
            ${action.color} rounded-lg p-6 text-white cursor-pointer
            transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1
            ${isExpanded ? 'shadow-xl scale-105' : 'shadow-sm'}
            ${isExpandable ? 'border-2 border-white/20' : ''}
          `}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3 flex-1">
              <div className={`
                p-2 rounded-lg 
                ${isExpandable ? 'bg-white/20 backdrop-blur-sm' : 'bg-black/20'}
              `}>
                {action.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-white">{action.title}</h3>
                  {action.badge && (
                    <span className="px-2 py-1 text-xs font-bold bg-yellow-400 text-yellow-900 rounded-full">
                      {action.badge}
                    </span>
                  )}
                  {isExpandable && (
                    <div className="ml-auto">
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-white transition-transform" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-white transition-transform" />
                      )}
                    </div>
                  )}
                </div>
                <p className="text-white/90 text-sm mt-1 leading-relaxed">
                  {action.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Expandable Sub-Features */}
        {isExpandable && isExpanded && action.subFeatures && (
          <div className="mt-3 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-b border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                <Crown className="w-4 h-4 text-purple-600" />
                <span>Super Admin Features</span>
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Advanced administrative and compliance management tools
              </p>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {action.subFeatures.map((subFeature: any, subIndex: number) => (
                <div
                  key={subFeature.id}
                  onClick={subFeature.action}
                  className={`
                    p-4 cursor-pointer transition-all duration-200
                    hover:bg-gray-50 dark:hover:bg-gray-700/50
                    ${subFeature.highlight ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500' : ''}
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`
                      p-2 rounded-lg
                      ${subFeature.highlight 
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }
                    `}>
                      {subFeature.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h5 className="font-medium text-gray-900 dark:text-white">
                          {subFeature.name}
                        </h5>
                        {subFeature.highlight && (
                          <span className="px-2 py-1 text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                        {subFeature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                Click any feature above to access advanced administrative controls
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  const recentActivities = [
    {
      id: 1,
      title: 'New employee onboarded',
      description: 'Sarah Johnson joined the Engineering team',
      time: '2 hours ago',
      icon: <Users className="w-4 h-4" />,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 2,
      title: 'Project milestone completed',
      description: 'Industrial Automation Project Phase 2',
      time: '4 hours ago',
      icon: <Award className="w-4 h-4" />,
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 3,
      title: 'Invoice generated',
      description: 'Invoice #INV-2024-0156 for Client ABC',
      time: '6 hours ago',
      icon: <FileText className="w-4 h-4" />,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      id: 4,
      title: 'Performance review due',
      description: '5 employees have pending reviews',
      time: '8 hours ago',
      icon: <Clock className="w-4 h-4" />,
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Here's what's happening at Rejlers today.
        </p>
      </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {quickActions.map((action, index) => (
                  <EnhancedQuickActionCard key={index} action={action} index={index} />
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${activity.color}`}>
                      {activity.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.title}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mt-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">System Status</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">API Status</span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Operational
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Database</span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Connected
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">AI Services</span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Dashboard;
