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
import { getSidebarConfiguration, SidebarModule as ConfigSidebarModule, SidebarItem } from '@/config/sidebar';
import { DASHBOARD_CONFIG } from '../../config/dashboard.config';

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

  // Get user data from localStorage for permission checking
  const getUserData = () => {
    try {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  };

  const userData = getUserData();

  // Check if user has required permissions
  const hasPermission = (requiredPermissions?: string[]) => {
    if (!requiredPermissions || requiredPermissions.length === 0) return true;
    if (!userData) return false;

    return requiredPermissions.some(permission => {
      switch (permission) {
        case 'super_admin_access':
          return userData.is_superuser === true;
        case 'view_dashboard':
          return true; // All authenticated users can view dashboard
        case 'view_projects':
          return userData.is_staff === true || userData.is_superuser === true;
        default:
          return false;
      }
    });
  };

  // Filter modules based on user permissions
  const getFilteredModules = (): ConfigSidebarModule[] => {
    return getSidebarConfiguration().filter(module => hasPermission(module.permissions));
  };

  // Get modules from configuration with permission filtering
  const modules: ConfigSidebarModule[] = getFilteredModules();

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

  // Render sidebar item
  const renderSidebarItem = (item: SidebarItem, level: number = 0) => {
    const isActive = currentModule === item.id;
    
    return (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-1"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onModuleChange(item.id)}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
            isActive
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          } ${level > 0 ? 'ml-4' : ''}`}
        >
          <div className="flex items-center space-x-3">
            {item.icon && <item.icon className="w-5 h-5" />}
            {!isCollapsed && (
              <span className="font-medium">{item.title}</span>
            )}
          </div>
          
          {!isCollapsed && item.badge && (
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
              item.badgeColor === 'purple' ? 'bg-purple-100 text-purple-700' :
              item.badgeColor === 'green' ? 'bg-green-100 text-green-700' :
              item.badgeColor === 'red' ? 'bg-red-100 text-red-700' :
              item.badgeColor === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
              item.badgeColor === 'indigo' ? 'bg-indigo-100 text-indigo-700' :
              'bg-blue-100 text-blue-700'
            }`}>
              {item.badge}
            </span>
          )}
        </motion.button>
      </motion.div>
    );
  };

  // Render module item
  const renderModule = (module: ConfigSidebarModule, level: number = 0) => {
    const isExpanded = expandedModules.has(module.id);
    const isActive = currentModule === module.id;
    const hasSubModules = module.children && module.children.length > 0;
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
                  <span className="font-medium">{module.title}</span>
                  
                  <div className="flex items-center space-x-2">
                    {/* Insights Badge */}
                    {hasInsights && (
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    )}
                    
                    {/* Badge */}
                    {module.badge && (
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        module.badgeColor === 'purple' ? 'bg-purple-100 text-purple-700' :
                        module.badgeColor === 'green' ? 'bg-green-100 text-green-700' :
                        module.badgeColor === 'red' ? 'bg-red-100 text-red-700' :
                        module.badgeColor === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
                        module.badgeColor === 'indigo' ? 'bg-indigo-100 text-indigo-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {module.badge}
                      </span>
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
              {module.children!.map(subModule => 
                renderSidebarItem(subModule, level + 1)
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