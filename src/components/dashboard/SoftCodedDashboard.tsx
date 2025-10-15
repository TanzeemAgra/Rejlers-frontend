/**
 * Reconstructed Dashboard Component using Soft Coding Architecture
 * This component dynamically renders based on configuration
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell, Settings, LogOut, ChevronRight, ChevronDown } from 'lucide-react';
import { authService } from '@/lib/auth';
import { businessModuleService } from '@/lib/businessModules';
import { 
  getDashboardConfig, 
  getEnvironmentType, 
  getThemeConfig,
  type DashboardConfig,
  type DashboardModule,
  type DashboardWidget 
} from '@/config/dashboardConfig';
import Logo from '@/components/ui/Logo';

const SoftCodedDashboard: React.FC = () => {
  // State Management
  const [user, setUser] = useState<any>(null);
  const [config, setConfig] = useState<DashboardConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [widgetData, setWidgetData] = useState<Record<string, any>>({});

  // Environment and Theme
  const environment = getEnvironmentType();
  const theme = getThemeConfig();

  // Initialize Dashboard
  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        // Check authentication
        if (!authService.isAuthenticated()) {
          window.location.href = '/login';
          return;
        }

        // Get user data
        const userData = authService.getUserData();
        if (!userData) {
          const fetchedUser = await authService.getCurrentUser();
          if (!fetchedUser) {
            window.location.href = '/login';
            return;
          }
          setUser(fetchedUser);
        } else {
          setUser(userData);
        }

        // Generate dashboard configuration based on user and environment
        const dashboardConfig = getDashboardConfig(userData);
        setConfig(dashboardConfig);

        // Load widget data
        await loadWidgetData(dashboardConfig.widgets);

        console.log('🚀 Soft-Coded Dashboard Initialized:', {
          environment,
          user: userData?.username,
          role: userData?.is_superuser ? 'Super Admin' : userData?.is_staff ? 'Staff' : 'User',
          modules: dashboardConfig.modules.length,
          widgets: dashboardConfig.widgets.length,
          features: dashboardConfig.features
        });

      } catch (err) {
        console.error('Dashboard initialization error:', err);
        setError('Failed to initialize dashboard');
      } finally {
        setLoading(false);
      }
    };

    initializeDashboard();
  }, []);

  // Load Widget Data
  const loadWidgetData = async (widgets: DashboardWidget[]) => {
    const data: Record<string, any> = {};
    
    for (const widget of widgets) {
      try {
        if (widget.apiEndpoint) {
          // Use public methods to get data
          let response;
          try {
            // Try to get data from business module service
            response = await fetch(`${businessModuleService.getBaseUrl()}${widget.apiEndpoint}`, {
              headers: { ...authService.getAuthHeader() }
            }).then(res => res.json());
          } catch {
            response = null;
          }
          
          // Process different response types
          switch (widget.type) {
            case 'stat':
              data[widget.id] = {
                value: response.count || response.results?.length || widget.fallbackValue,
                change: calculateChange(response),
                lastUpdated: new Date().toISOString()
              };
              break;
            default:
              data[widget.id] = response;
          }
        } else {
          // Use fallback data
          data[widget.id] = {
            value: widget.fallbackValue || widget.value,
            lastUpdated: new Date().toISOString()
          };
        }
      } catch (error) {
        console.warn(`Failed to load data for ${widget.id}:`, error);
        data[widget.id] = {
          value: widget.fallbackValue || 'N/A',
          error: true,
          lastUpdated: new Date().toISOString()
        };
      }
    }

    setWidgetData(data);
  };

  // Calculate change percentages (mock implementation)
  const calculateChange = (response: any) => {
    return {
      value: Math.floor(Math.random() * 20) - 10, // Random change between -10 and +10
      direction: Math.random() > 0.5 ? 'up' : 'down' as 'up' | 'down',
      period: '7 days'
    };
  };

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

  // Render Module Item
  const renderModuleItem = (module: DashboardModule, isChild = false) => (
    <motion.div
      key={module.id}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      className={isChild ? 'ml-4' : ''}
    >
      {module.hasSubmenu && !isChild ? (
        <button
          onClick={() => toggleModule(module.id)}
          className="flex items-center w-full px-4 py-3 text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-all duration-200 rounded-lg group"
        >
          <module.icon className="w-5 h-5 mr-3 text-slate-500 group-hover:text-slate-700" />
          <span className="flex-1 font-medium text-left">{module.name}</span>
          {module.badge && (
            <span className={`px-2 py-1 text-xs font-semibold rounded-full mr-2 ${module.badgeColor}`}>
              {module.badge}
            </span>
          )}
          {expandedModules.has(module.id) ? (
            <ChevronDown size={16} className="text-slate-400" />
          ) : (
            <ChevronRight size={16} className="text-slate-400" />
          )}
        </button>
      ) : (
        <a
          href={module.path}
          className="flex items-center w-full px-4 py-3 text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-all duration-200 rounded-lg group"
        >
          <module.icon className="w-5 h-5 mr-3 text-slate-500 group-hover:text-slate-700" />
          <span className="flex-1 font-medium text-left">{module.name}</span>
          {module.badge && (
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${module.badgeColor}`}>
              {module.badge}
            </span>
          )}
        </a>
      )}

      {/* Render children if expanded */}
      {module.hasSubmenu && expandedModules.has(module.id) && module.children && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="ml-4 mt-1 space-y-1"
        >
          {module.children.map(child => renderModuleItem(child, true))}
        </motion.div>
      )}
    </motion.div>
  );

  // Render Widget
  const renderWidget = (widget: DashboardWidget) => {
    const data = widgetData[widget.id];
    const value = data?.value || widget.fallbackValue || 'N/A';
    const change = data?.change;

    return (
      <motion.div
        key={widget.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200"
      >
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 bg-${widget.color.background} rounded-xl flex items-center justify-center`}>
            <widget.icon className={`w-6 h-6 text-${widget.color.primary}`} />
          </div>
          <span className="text-sm font-medium text-slate-600">{widget.title}</span>
        </div>

        <div className="space-y-2">
          <div className={`text-2xl font-bold text-${widget.color.text}`}>
            {value}
            {data?.error && (
              <span className="text-xs text-red-500 ml-2">(Offline)</span>
            )}
          </div>
          
          {change && (
            <div className={`flex items-center text-sm ${
              change.direction === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              <span className="mr-1">
                {change.direction === 'up' ? '↗' : '↘'}
              </span>
              <span>{Math.abs(change.value)}% vs {change.period}</span>
            </div>
          )}
          
          {widget.description && (
            <p className="text-xs text-slate-500">{widget.description}</p>
          )}
        </div>
      </motion.div>
    );
  };

  // Loading State
  if (loading || !config) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Initializing Soft-Coded Dashboard...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">⚠️ Dashboard Error</div>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      {config.layout.showSidebar && (
        <motion.aside
          initial={{ x: -320 }}
          animate={{ x: sidebarOpen ? 0 : -320 }}
          transition={{ duration: 0.3 }}
          className={`fixed lg:relative lg:translate-x-0 z-30 bg-white border-r border-slate-200 h-full ${config.layout.sidebarWidth ? `w-[${config.layout.sidebarWidth}]` : 'w-80'}`}
        >
          {/* Sidebar Header */}
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center space-x-3">
              <Logo context="dashboard" priority={true} />
              <div>
                <h1 className="text-xl font-bold text-slate-900">{config.branding.companyName}</h1>
                <p className="text-sm text-slate-500">{config.branding.tagline}</p>
              </div>
            </div>
            
            {/* Debug Info */}
            {config.features.enableDebugMode && (
              <div className="mt-3 p-2 bg-blue-50 rounded-lg text-xs">
                <div className="text-blue-800 font-semibold">Soft-Coded Dashboard Active</div>
                <div className="text-blue-600">
                  Env: {typeof environment === 'object' ? environment.environment : environment} | Modules: {config.modules.length} | Widgets: {config.widgets.length}
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-140px)]">
            {config.modules.map(module => renderModuleItem(module))}
          </nav>
        </motion.aside>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-slate-200">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {config.layout.showSidebar && (
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
                >
                  <Menu className="w-5 h-5" />
                </button>
              )}
              
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Welcome back, {user?.first_name || user?.username || 'User'}!
                </h2>
                <p className="text-slate-600">
                  {user?.is_superuser 
                    ? "System Administrator - You have full access to all system features and controls."
                    : user?.is_staff
                    ? "Administrator - You have elevated access to manage the organization."
                    : "Here's what's happening in your organization today."
                  }
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {config.features.enableNotifications && (
                <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg">
                  <Bell className="w-5 h-5" />
                </button>
              )}
              <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg">
                <Settings className="w-5 h-5" />
              </button>
              
              <div className="flex items-center space-x-2 px-3 py-2 bg-slate-100 rounded-lg">
                <span className="text-sm font-medium text-slate-900">
                  {user?.username || user?.email || 'User'}
                </span>
                {(user?.is_superuser || user?.is_staff) && (
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    user?.is_superuser 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {user?.is_superuser ? 'Super Admin' : 'Admin'}
                  </span>
                )}
              </div>
              
              <button
                onClick={async () => {
                  await authService.logout();
                  window.location.href = '/login';
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm font-medium"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Environment Info Banner */}
          {config.features.showEnvironmentInfo && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-blue-900">
                    🚀 Soft-Coded Dashboard System
                  </h3>
                  <p className="text-blue-700 text-sm">
                    Environment: {typeof environment === 'object' ? environment.environment : environment} | 
                    Hostname: {typeof environment === 'object' ? environment.hostname : 'server'} | 
                    User: {user?.username} | Permissions: {config.modules.length} modules active
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Widgets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {config.widgets.map(widget => renderWidget(widget))}
          </div>

          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
          >
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activities</h3>
            <div className="space-y-3">
              {[
                { icon: '📊', text: 'Dashboard system initialized successfully', time: '1 min ago' },
                { icon: '🔐', text: 'User authentication completed', time: '2 min ago' },
                { icon: '⚙️', text: 'Configuration loaded dynamically', time: '3 min ago' },
                { icon: '🎯', text: 'Widgets rendered with soft coding', time: '5 min ago' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                  <span className="text-xl">{activity.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{activity.text}</p>
                  </div>
                  <span className="text-xs text-slate-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default SoftCodedDashboard;