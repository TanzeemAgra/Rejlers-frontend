'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  DocumentTextIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  BellIcon,
  SparklesIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  EyeIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { DASHBOARD_CONFIG } from '../../config/dashboard.config';

interface ModuleData {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  value: string | number;
  change?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
    period: string;
  };
  description: string;
  color: string;
  bgGradient: string;
  path: string;
  aiInsights?: string[];
  quickActions?: Array<{
    label: string;
    action: string;
    icon: React.ComponentType<any>;
  }>;
}

interface ModuleGridProps {
  onModuleClick: (moduleId: string) => void;
  className?: string;
}

const ModuleGrid: React.FC<ModuleGridProps> = ({ onModuleClick, className = '' }) => {
  const [modules, setModules] = useState<ModuleData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize modules with real-time data
  useEffect(() => {
    const initializeModules = async () => {
      try {
        // Simulate fetching real-time data
        const moduleData: ModuleData[] = [
          {
            id: 'analytics',
            name: 'Analytics',
            icon: ChartBarIcon,
            value: '$125.4K',
            change: {
              value: 12.5,
              direction: 'up',
              period: 'vs last month',
            },
            description: 'Revenue Analytics',
            color: 'text-blue-600',
            bgGradient: 'from-blue-500 to-blue-600',
            path: '/dashboard/analytics',
            aiInsights: [
              'Sales increased 12% this month',
              'Best performing: Enterprise clients',
              'Recommended: Focus on Q4 targets',
            ],
            quickActions: [
              { label: 'View Report', action: 'view-report', icon: EyeIcon },
              { label: 'Add Goal', action: 'add-goal', icon: PlusIcon },
            ],
          },
          {
            id: 'contacts',
            name: 'Contacts',
            icon: UserGroupIcon,
            value: 1247,
            change: {
              value: 8.3,
              direction: 'up',
              period: 'new this week',
            },
            description: 'Total Contacts',
            color: 'text-green-600',
            bgGradient: 'from-green-500 to-green-600',
            path: '/dashboard/contacts',
            aiInsights: [
              '23 contacts need follow-up',
              'High-value prospects: 5 active',
              'Conversion rate: 24% (↑3%)',
            ],
            quickActions: [
              { label: 'Add Contact', action: 'add-contact', icon: PlusIcon },
              { label: 'View All', action: 'view-contacts', icon: EyeIcon },
            ],
          },
          {
            id: 'finance',
            name: 'Finance',
            icon: CurrencyDollarIcon,
            value: '$89.2K',
            change: {
              value: -2.1,
              direction: 'down',
              period: 'vs last quarter',
            },
            description: 'Monthly Revenue',
            color: 'text-purple-600',
            bgGradient: 'from-purple-500 to-purple-600',
            path: '/dashboard/finance',
            aiInsights: [
              'Outstanding invoices: $12.3K',
              'Payment delays detected',
              'Cash flow projection: Stable',
            ],
            quickActions: [
              { label: 'Create Invoice', action: 'create-invoice', icon: PlusIcon },
              { label: 'View Reports', action: 'view-reports', icon: EyeIcon },
            ],
          },
          {
            id: 'calendar',
            name: 'Calendar',
            icon: CalendarIcon,
            value: 18,
            change: {
              value: 6,
              direction: 'up',
              period: 'meetings today',
            },
            description: 'Upcoming Events',
            color: 'text-orange-600',
            bgGradient: 'from-orange-500 to-orange-600',
            path: '/dashboard/calendar',
            aiInsights: [
              'Next: Client meeting at 2:30 PM',
              'Busy day ahead (8 meetings)',
              'Suggested: 30min buffer time',
            ],
            quickActions: [
              { label: 'Schedule Meeting', action: 'schedule', icon: PlusIcon },
              { label: 'View Calendar', action: 'view-calendar', icon: EyeIcon },
            ],
          },
          {
            id: 'projects',
            name: 'Projects',
            icon: DocumentTextIcon,
            value: 12,
            change: {
              value: 4,
              direction: 'up',
              period: 'active projects',
            },
            description: 'Active Projects',
            color: 'text-indigo-600',
            bgGradient: 'from-indigo-500 to-indigo-600',
            path: '/dashboard/projects',
            aiInsights: [
              '3 projects behind schedule',
              'Team productivity: 94%',
              'Milestone due: Project Alpha',
            ],
            quickActions: [
              { label: 'New Project', action: 'new-project', icon: PlusIcon },
              { label: 'View All', action: 'view-projects', icon: EyeIcon },
            ],
          },
          {
            id: 'clients',
            name: 'Clients',
            icon: BuildingOfficeIcon,
            value: 89,
            change: {
              value: 15.7,
              direction: 'up',
              period: 'satisfaction score',
            },
            description: 'Active Clients',
            color: 'text-cyan-600',
            bgGradient: 'from-cyan-500 to-cyan-600',
            path: '/dashboard/clients',
            aiInsights: [
              'Client satisfaction: 94.2%',
              '2 contracts up for renewal',
              'Upsell opportunities: 3',
            ],
            quickActions: [
              { label: 'Add Client', action: 'add-client', icon: PlusIcon },
              { label: 'Client Portal', action: 'client-portal', icon: EyeIcon },
            ],
          },
          {
            id: 'leads',
            name: 'Leads',
            icon: PhoneIcon,
            value: 156,
            change: {
              value: 22.4,
              direction: 'up',
              period: 'conversion rate',
            },
            description: 'Hot Leads',
            color: 'text-red-600',
            bgGradient: 'from-red-500 to-red-600',
            path: '/dashboard/leads',
            aiInsights: [
              '12 leads ready for contact',
              'Best source: LinkedIn (38%)',
              'Follow-up recommendation: Today',
            ],
            quickActions: [
              { label: 'Add Lead', action: 'add-lead', icon: PlusIcon },
              { label: 'Lead Pipeline', action: 'lead-pipeline', icon: EyeIcon },
            ],
          },
          {
            id: 'notifications',
            name: 'Notifications',
            icon: BellIcon,
            value: 23,
            change: {
              value: 5,
              direction: 'up',
              period: 'unread messages',
            },
            description: 'Recent Alerts',
            color: 'text-pink-600',
            bgGradient: 'from-pink-500 to-pink-600',
            path: '/dashboard/notifications',
            aiInsights: [
              '3 urgent notifications',
              'System updates available',
              'AI suggestions pending review',
            ],
            quickActions: [
              { label: 'View All', action: 'view-notifications', icon: EyeIcon },
              { label: 'Settings', action: 'notification-settings', icon: PlusIcon },
            ],
          },
        ];

        setModules(moduleData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading module data:', error);
        setIsLoading(false);
      }
    };

    initializeModules();
  }, []);

  // Get change indicator
  const getChangeIndicator = (change: ModuleData['change']) => {
    if (!change) return null;

    const IconComponent = change.direction === 'up' ? ArrowTrendingUpIcon : ArrowTrendingDownIcon;
    const colorClass = change.direction === 'up' ? 'text-green-600' : 'text-red-600';

    return (
      <div className={`flex items-center ${colorClass}`}>
        <IconComponent className="w-4 h-4 mr-1" />
        <span className="text-sm font-medium">
          {change.value > 0 ? '+' : ''}{change.value}%
        </span>
        <span className="text-xs text-gray-500 ml-1">{change.period}</span>
      </div>
    );
  };

  // Handle module click
  const handleModuleClick = (moduleId: string) => {
    onModuleClick(moduleId);
  };

  // Handle quick action
  const handleQuickAction = (moduleId: string, action: string) => {
    console.log(`Executing action: ${action} for module: ${moduleId}`);
    // Implement specific actions based on the action type
  };

  if (isLoading) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="bg-gray-200 dark:bg-gray-700 rounded-xl h-40 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {modules.map((module, index) => (
        <motion.div
          key={module.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ 
            y: -5,
            transition: { type: 'spring', stiffness: 300 }
          }}
          className="relative group"
        >
          {/* Main Card */}
          <div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden"
            onClick={() => handleModuleClick(module.id)}
          >
            {/* Background Gradient */}
            <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${module.bgGradient} opacity-10 rounded-bl-full transform translate-x-6 -translate-y-6`} />

            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gray-50 dark:bg-gray-700 ${module.color}`}>
                <module.icon className="w-6 h-6" />
              </div>
              
              {DASHBOARD_CONFIG.AI_SERVICES.OPENAI.ENABLED && (
                <SparklesIcon className="w-5 h-5 text-blue-500 opacity-60" />
              )}
            </div>

            {/* Content */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {module.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {module.description}
              </p>
            </div>

            {/* Value */}
            <div className="mb-3">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {module.value}
              </div>
              {module.change && (
                <div className="mt-1">
                  {getChangeIndicator(module.change)}
                </div>
              )}
            </div>

            {/* AI Insights */}
            {module.aiInsights && module.aiInsights.length > 0 && (
              <div className="mb-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                  <div className="flex items-center mb-2">
                    <SparklesIcon className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
                      AI Insights
                    </span>
                  </div>
                  <div className="space-y-1">
                    {module.aiInsights.slice(0, 2).map((insight, idx) => (
                      <p key={idx} className="text-xs text-blue-600 dark:text-blue-400">
                        • {insight}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            {module.quickActions && (
              <div className="flex space-x-2">
                {module.quickActions.map((action) => (
                  <motion.button
                    key={action.action}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuickAction(module.id, action.action);
                    }}
                    className="flex items-center px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <action.icon className="w-3 h-3 mr-1" />
                    {action.label}
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Hover Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 dark:to-white/5 rounded-xl pointer-events-none"
          />

          {/* AI Enhancement Indicator */}
          {DASHBOARD_CONFIG.AI_SERVICES.OPENAI.ENABLED && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <SparklesIcon className="w-3 h-3 text-white" />
            </motion.div>
          )}
        </motion.div>
      ))}

      {/* Add New Module Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: modules.length * 0.1 }}
        whileHover={{ 
          y: -5,
          transition: { type: 'spring', stiffness: 300 }
        }}
        className="bg-gray-50 dark:bg-gray-800/50 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-300"
        onClick={() => console.log('Add new module')}
      >
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-4">
            <PlusIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
            Add Module
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Customize your dashboard with additional modules
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ModuleGrid;