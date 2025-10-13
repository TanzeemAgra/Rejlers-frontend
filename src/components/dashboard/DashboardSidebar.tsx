'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HomeIcon,
  ChartBarIcon,
  UserGroupIcon,
  CogIcon,
  BellIcon,
  MicrophoneIcon,
  SparklesIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';
import { DASHBOARD_CONFIG } from '../../config/dashboard.config';

interface SidebarModule {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  path: string;
  subModules?: SidebarModule[];
  aiEnabled?: boolean;
}

interface DashboardSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  currentModule: string;
  onModuleChange: (moduleId: string) => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  currentModule,
  onModuleChange,
}) => {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [aiInsights, setAiInsights] = useState<any[]>([]);

  // Get modules from configuration
  const modules: SidebarModule[] = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: HomeIcon,
      path: '/dashboard',
      aiEnabled: true,
    },
    {
      id: 'analytics',
      name: 'Analytics',
      icon: ChartBarIcon,
      path: '/dashboard/analytics',
      aiEnabled: true,
      subModules: [
        { id: 'performance', name: 'Performance', icon: ChartBarIcon, path: '/dashboard/analytics/performance' },
        { id: 'insights', name: 'AI Insights', icon: SparklesIcon, path: '/dashboard/analytics/insights' },
      ],
    },
    {
      id: 'contacts',
      name: 'Contacts',
      icon: UserGroupIcon,
      path: '/dashboard/contacts',
      aiEnabled: true,
      subModules: [
        { id: 'clients', name: 'Clients', icon: BuildingOfficeIcon, path: '/dashboard/contacts/clients' },
        { id: 'leads', name: 'Leads', icon: PhoneIcon, path: '/dashboard/contacts/leads' },
      ],
    },
    {
      id: 'finance',
      name: 'Finance',
      icon: CurrencyDollarIcon,
      path: '/dashboard/finance',
      aiEnabled: true,
      subModules: [
        { id: 'invoicing', name: 'Invoicing', icon: DocumentTextIcon, path: '/dashboard/finance/invoicing' },
        { id: 'expenses', name: 'Expenses', icon: CurrencyDollarIcon, path: '/dashboard/finance/expenses' },
      ],
    },
    {
      id: 'calendar',
      name: 'Calendar',
      icon: CalendarIcon,
      path: '/dashboard/calendar',
      aiEnabled: true,
    },
    {
      id: 'notifications',
      name: 'Notifications',
      icon: BellIcon,
      path: '/dashboard/notifications',
      aiEnabled: true,
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: CogIcon,
      path: '/dashboard/settings',
      subModules: [
        { id: 'profile', name: 'Profile', icon: UserGroupIcon, path: '/dashboard/settings/profile' },
        { id: 'ai-config', name: 'AI Configuration', icon: SparklesIcon, path: '/dashboard/settings/ai' },
      ],
    },
  ];

  // Toggle module expansion
  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  // Load AI insights for sidebar
  useEffect(() => {
    const loadAiInsights = async () => {
      try {
        // Simulate AI insights for sidebar
        const insights = [
          {
            id: 'urgent-tasks',
            type: 'urgent',
            message: '3 urgent tasks require attention',
            moduleId: 'dashboard',
          },
          {
            id: 'performance-alert',
            type: 'performance',
            message: 'Sales performance up 15% this week',
            moduleId: 'analytics',
          },
          {
            id: 'contact-follow-up',
            type: 'reminder',
            message: '5 contacts need follow-up',
            moduleId: 'contacts',
          },
        ];
        setAiInsights(insights);
      } catch (error) {
        console.error('Error loading AI insights:', error);
      }
    };

    if (DASHBOARD_CONFIG.AI_SERVICES.OPENAI.ENABLED) {
      loadAiInsights();
    }
  }, []);

  // Get insights for a specific module
  const getModuleInsights = (moduleId: string) => {
    return aiInsights.filter(insight => insight.moduleId === moduleId);
  };

  // Render module item
  const renderModule = (module: SidebarModule, level: number = 0) => {
    const isExpanded = expandedModules.has(module.id);
    const isActive = currentModule === module.id;
    const hasSubModules = module.subModules && module.subModules.length > 0;
    const moduleInsights = getModuleInsights(module.id);
    const hasInsights = moduleInsights.length > 0;

    return (
      <div key={module.id} className="mb-1">
        <motion.div
          whileHover={{ x: level === 0 ? 4 : 2 }}
          whileTap={{ scale: 0.98 }}
          className={`
            flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all duration-200
            ${level > 0 ? 'ml-6 text-sm' : ''}
            ${isActive 
              ? 'bg-blue-600 text-white shadow-lg' 
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }
          `}
          onClick={() => {
            if (hasSubModules) {
              toggleModule(module.id);
            } else {
              onModuleChange(module.id);
            }
          }}
        >
          <div className="flex items-center flex-1">
            <module.icon className={`w-5 h-5 ${isCollapsed ? 'mr-0' : 'mr-3'}`} />
            
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="flex items-center justify-between w-full"
                >
                  <span className="font-medium">{module.name}</span>
                  
                  <div className="flex items-center space-x-2">
                    {/* AI Enabled Badge */}
                    {module.aiEnabled && (
                      <SparklesIcon className="w-4 h-4 text-blue-500" />
                    )}
                    
                    {/* Insights Badge */}
                    {hasInsights && (
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    )}
                    
                    {/* Expand Icon */}
                    {hasSubModules && (
                      <motion.div
                        animate={{ rotate: isExpanded ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRightIcon className="w-4 h-4" />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Sub-modules */}
        <AnimatePresence>
          {hasSubModules && isExpanded && !isCollapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              {module.subModules!.map(subModule => 
                renderModule(subModule, level + 1)
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Module Insights (when collapsed) */}
        {isCollapsed && hasInsights && (
          <div className="absolute left-16 top-0 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 min-w-[200px]">
            {moduleInsights.map(insight => (
              <div key={insight.id} className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                {insight.message}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center"
              >
                <SparklesIcon className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    {DASHBOARD_CONFIG.COMPANY.NAME}
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    AI-Powered Dashboard
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onToggleCollapse}
            className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <motion.div
              animate={{ rotate: isCollapsed ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDownIcon className="w-5 h-5 transform rotate-90" />
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        {modules.map(module => renderModule(module))}
      </nav>

      {/* AI Voice Command Hint */}
      {!isCollapsed && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 border-t border-gray-200 dark:border-gray-700"
        >
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
            <div className="flex items-center text-blue-700 dark:text-blue-300">
              <MicrophoneIcon className="w-5 h-5 mr-2" />
              <div>
                <p className="text-sm font-medium">Voice Commands</p>
                <p className="text-xs text-blue-600 dark:text-blue-400">
                  Say "Hey AI" to start
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Powered by AI • {DASHBOARD_CONFIG.COMPANY.TAGLINE}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
};

export default DashboardSidebar;