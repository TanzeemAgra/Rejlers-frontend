/**
 * HR AI Dashboard - Advanced Dynamic Dashboard System
 * =================================================
 * 
 * Features:
 * - Dynamic widget rendering based on configuration
 * - Real-time data updates with WebSocket support
 * - Drag-and-drop dashboard customization
 * - AI-powered insights and recommendations
 * - Role-based dashboard layouts
 * - Responsive design with mobile optimization
 */

'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  DashboardLayout, 
  WidgetConfig, 
  MetricCardConfig,
  ChartConfig,
  TableConfig,
  HR_DASHBOARD_LAYOUTS, 
  DashboardConfigManager,
  WidgetType 
} from '@/config/hrDashboardConfig';
// Mock auth context for now - will be implemented later
const useAuth = () => ({
  user: { id: '1', role: 'HR_Manager', token: 'mock-token' },
  hasPermission: (permission: string) => true
});
import { 
  Settings, 
  RefreshCw, 
  Download, 
  Plus, 
  Layout, 
  Maximize2, 
  Minimize2,
  Grid,
  Filter,
  Search,
  Bell,
  Brain,
  Zap,
  Palette,
  Moon,
  Sun
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

// Widget Components
import MetricCardWidget from './widgets/MetricCardWidget';
import ChartWidget from './widgets/ChartWidget';
import TableWidget from './widgets/TableWidget';
import AIInsightWidget from './widgets/AIInsightWidget';
import ProgressWidget from './widgets/ProgressWidget';
import CalendarWidget from './widgets/CalendarWidget';
import NotificationWidget from './widgets/NotificationWidget';
import InteractiveWidget from './widgets/InteractiveWidget';

interface HRAIDashboardProps {
  className?: string;
}

interface DashboardState {
  layout: DashboardLayout | null;
  widgets: WidgetConfig[];
  isLoading: boolean;
  isCustomizing: boolean;
  selectedWidget: string | null;
  filters: Record<string, any>;
  autoRefresh: boolean;
  lastRefresh: Date | null;
}

const HRAIDashboard: React.FC<HRAIDashboardProps> = ({ className = '' }) => {
  // Authentication and user context
  const { user, hasPermission } = useAuth();
  
  // Dashboard state management
  const [state, setState] = useState<DashboardState>({
    layout: null,
    widgets: [],
    isLoading: true,
    isCustomizing: false,
    selectedWidget: null,
    filters: {},
    autoRefresh: true,
    lastRefresh: null
  });

  // Theme and display preferences
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [density, setDensity] = useState<'compact' | 'comfortable' | 'spacious'>('comfortable');
  const [showGridLines, setShowGridLines] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Real-time data management
  const [wsConnection, setWsConnection] = useState<WebSocket | null>(null);
  const [realTimeData, setRealTimeData] = useState<Record<string, any>>({});

  // Initialize dashboard based on user role
  useEffect(() => {
    initializeDashboard();
    setupWebSocketConnection();
    
    return () => {
      if (wsConnection) {
        wsConnection.close();
      }
    };
  }, [user]);

  // Auto-refresh mechanism
  useEffect(() => {
    if (!state.autoRefresh) return;

    const interval = setInterval(() => {
      refreshDashboardData();
    }, (state.layout?.settings.refreshInterval || 300) * 1000);

    return () => clearInterval(interval);
  }, [state.autoRefresh, state.layout]);

  const initializeDashboard = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));

      // Get user's role and determine default layout
      const userRole = user?.role || 'HR_Manager';
      let layout = DashboardConfigManager.getLayoutByRole(userRole);
      
      if (!layout) {
        // Fallback to manager layout
        layout = HR_DASHBOARD_LAYOUTS.manager;
      }

      // Load personalized layout if exists
      const personalizedLayout = await loadPersonalizedLayout(userRole);
      if (personalizedLayout) {
        layout = personalizedLayout;
      }

      // Apply layout settings
      setTheme(layout.settings.theme === 'auto' ? 'light' : layout.settings.theme);
      setDensity(layout.settings.density);
      setShowGridLines(layout.settings.showGridLines);

      setState(prev => ({
        ...prev,
        layout,
        widgets: layout.widgets,
        autoRefresh: layout.settings.autoRefresh,
        isLoading: false
      }));

      // Initial data load
      await refreshDashboardData();
      
    } catch (error) {
      console.error('Failed to initialize dashboard:', error);
      toast.error('Failed to load dashboard');
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [user]);

  const setupWebSocketConnection = useCallback(() => {
    if (!user) return;

    try {
      const wsUrl = `${process.env.NEXT_PUBLIC_WS_URL}/ws/hr-dashboard/${user.id}/`;
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log('WebSocket connected for HR Dashboard');
        setWsConnection(ws);
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        handleRealTimeUpdate(data);
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected');
        setWsConnection(null);
        // Attempt to reconnect after 5 seconds
        setTimeout(setupWebSocketConnection, 5000);
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

    } catch (error) {
      console.error('Failed to setup WebSocket:', error);
    }
  }, [user]);

  const handleRealTimeUpdate = useCallback((data: any) => {
    const { widget_id, type, payload } = data;
    
    setRealTimeData(prev => ({
      ...prev,
      [widget_id]: {
        ...prev[widget_id],
        ...payload,
        lastUpdated: new Date()
      }
    }));

    // Show notification for critical updates
    if (type === 'alert' || type === 'critical_update') {
      toast.error(`Alert: ${payload.message}`, {
        duration: 5000,
        icon: '🚨'
      });
    }
  }, []);

  const refreshDashboardData = useCallback(async () => {
    if (!state.layout) return;

    try {
      const refreshPromises = state.widgets.map(async (widget) => {
        const response = await fetch(`/api/hr/dashboard/widget/${widget.id}/data`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user?.token}`
          },
          body: JSON.stringify({
            filters: state.filters,
            timeRange: (widget as any).chart?.timeRange,
            refreshInterval: widget.refreshInterval
          })
        });

        if (response.ok) {
          const data = await response.json();
          return { [widget.id]: data };
        }
        return {};
      });

      const results = await Promise.all(refreshPromises);
      const newData = results.reduce((acc, curr) => ({ ...acc, ...curr }), {});
      
      setRealTimeData(prev => ({ ...prev, ...newData }));
      setState(prev => ({ ...prev, lastRefresh: new Date() }));

    } catch (error) {
      console.error('Failed to refresh dashboard data:', error);
      toast.error('Failed to refresh data');
    }
  }, [state.layout, state.widgets, state.filters, user]);

  const loadPersonalizedLayout = async (userRole: string): Promise<DashboardLayout | null> => {
    try {
      const response = await fetch(`/api/hr/dashboard/layout/${userRole}`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`
        }
      });
      
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Failed to load personalized layout:', error);
    }
    return null;
  };

  const saveLayoutConfiguration = async (layout: DashboardLayout) => {
    try {
      const response = await fetch('/api/hr/dashboard/layout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`
        },
        body: JSON.stringify(layout)
      });

      if (response.ok) {
        toast.success('Dashboard layout saved successfully');
        return true;
      } else {
        throw new Error('Failed to save layout');
      }
    } catch (error) {
      console.error('Failed to save layout:', error);
      toast.error('Failed to save dashboard layout');
      return false;
    }
  };

  const toggleCustomizeMode = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      isCustomizing: !prev.isCustomizing,
      selectedWidget: null 
    }));
  }, []);

  const addWidget = useCallback((widgetConfig: WidgetConfig) => {
    if (!DashboardConfigManager.validateWidgetConfig(widgetConfig)) {
      toast.error('Invalid widget configuration');
      return;
    }

    setState(prev => ({
      ...prev,
      widgets: [...prev.widgets, widgetConfig],
      layout: prev.layout ? {
        ...prev.layout,
        widgets: [...prev.layout.widgets, widgetConfig]
      } : null
    }));

    toast.success('Widget added successfully');
  }, []);

  const updateWidget = useCallback((widgetId: string, updates: Partial<WidgetConfig>) => {
    setState(prev => ({
      ...prev,
      widgets: prev.widgets.map(w => w.id === widgetId ? { ...w, ...updates } : w),
      layout: prev.layout ? {
        ...prev.layout,
        widgets: prev.layout.widgets.map(w => w.id === widgetId ? { ...w, ...updates } : w)
      } : null
    }));
  }, []);

  const removeWidget = useCallback((widgetId: string) => {
    setState(prev => ({
      ...prev,
      widgets: prev.widgets.filter(w => w.id !== widgetId),
      layout: prev.layout ? {
        ...prev.layout,
        widgets: prev.layout.widgets.filter(w => w.id !== widgetId)
      } : null,
      selectedWidget: prev.selectedWidget === widgetId ? null : prev.selectedWidget
    }));

    toast.success('Widget removed successfully');
  }, []);

  const exportDashboard = useCallback(async () => {
    try {
      const exportData = {
        layout: state.layout,
        data: realTimeData,
        exportedAt: new Date().toISOString(),
        user: user?.id
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: 'application/json'
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `hr-dashboard-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success('Dashboard exported successfully');
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('Failed to export dashboard');
    }
  }, [state.layout, realTimeData, user]);

  const renderWidget = useCallback((widget: WidgetConfig) => {
    const widgetData = realTimeData[widget.id] || {};
    const isSelected = state.selectedWidget === widget.id;
    
    // Soft coding approach: Create type-safe props with proper type guards
    const getComponentWithTypedProps = () => {
      const baseProps = {
        data: widgetData,
        isCustomizing: state.isCustomizing,
        isSelected,
        onSelect: () => setState(prev => ({ ...prev, selectedWidget: widget.id })),
        onUpdate: (updates: Partial<WidgetConfig>) => updateWidget(widget.id, updates),
        onRemove: () => removeWidget(widget.id),
        theme,
        density
      };

      // Use type-safe configuration based on widget type
      switch (widget.type) {
        case WidgetType.METRIC_CARD:
          return (
            <MetricCardWidget 
              {...baseProps} 
              config={widget as MetricCardConfig} 
            />
          );
        case WidgetType.CHART:
          return (
            <ChartWidget 
              {...baseProps} 
              config={widget as ChartConfig} 
            />
          );
        case WidgetType.TABLE:
          return (
            <TableWidget 
              {...baseProps} 
              config={widget as TableConfig} 
            />
          );
        case WidgetType.AI_INSIGHT:
          return (
            <AIInsightWidget 
              {...baseProps} 
              config={widget as WidgetConfig} 
            />
          );
        case WidgetType.PROGRESS:
          return (
            <ProgressWidget 
              {...baseProps} 
              config={widget as WidgetConfig} 
            />
          );
        case WidgetType.CALENDAR:
          return (
            <CalendarWidget 
              {...baseProps} 
              config={widget as WidgetConfig} 
            />
          );
        case WidgetType.NOTIFICATION:
          return (
            <NotificationWidget 
              {...baseProps} 
              config={widget as WidgetConfig} 
            />
          );
        case WidgetType.INTERACTIVE:
          return (
            <InteractiveWidget 
              {...baseProps} 
              config={widget as WidgetConfig} 
            />
          );
        default:
          return null;
      }
    };

    const WidgetComponent = getComponentWithTypedProps();
    if (!WidgetComponent) return null;

    return (
      <motion.div
        key={widget.id}
        layout
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className={`
          ${getWidgetSizeClass(widget.size)}
          ${state.isCustomizing ? 'cursor-move hover:shadow-lg' : ''}
          ${isSelected ? 'ring-2 ring-blue-500' : ''}
        `}
        style={{
          gridColumn: `span ${widget.position.width}`,
          gridRow: `span ${widget.position.height}`
        }}
      >
        {WidgetComponent}
      </motion.div>
    );
  }, [realTimeData, state.isCustomizing, state.selectedWidget, theme, density, updateWidget, removeWidget]);

  const getWidgetSizeClass = (size: string): string => {
    switch (size) {
      case 'small':
        return 'col-span-3 row-span-2';
      case 'medium':
        return 'col-span-4 row-span-3';
      case 'large':
        return 'col-span-6 row-span-4';
      case 'extra-large':
        return 'col-span-12 row-span-6';
      default:
        return 'col-span-4 row-span-3';
    }
  };

  const getDensityClasses = () => {
    switch (density) {
      case 'compact':
        return 'gap-2 p-2';
      case 'spacious':
        return 'gap-8 p-8';
      default:
        return 'gap-4 p-4';
    }
  };

  if (state.isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-lg font-medium">Loading HR Dashboard...</span>
      </div>
    );
  }

  if (!state.layout) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Dashboard Layout Found</h3>
        <p className="text-gray-600">Unable to load dashboard layout for your role.</p>
      </div>
    );
  }

  return (
    <div className={`hr-ai-dashboard ${theme === 'dark' ? 'dark' : ''} ${className}`}>
      {/* Dashboard Header */}
      <div className="flex items-center justify-between mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Brain className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {state.layout.name}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {state.layout.description}
              </p>
            </div>
          </div>
          
          {state.lastRefresh && (
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <RefreshCw className="w-4 h-4" />
              <span>Last updated: {state.lastRefresh.toLocaleTimeString()}</span>
            </div>
          )}
        </div>

        {/* Dashboard Controls */}
        <div className="flex items-center space-x-2">
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            title="Toggle Theme"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          {/* Grid Toggle */}
          <button
            onClick={() => setShowGridLines(!showGridLines)}
            className={`p-2 rounded-lg transition-colors ${
              showGridLines 
                ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' 
                : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            title="Toggle Grid Lines"
          >
            <Grid className="w-4 h-4" />
          </button>

          {/* Auto Refresh Toggle */}
          <button
            onClick={() => setState(prev => ({ ...prev, autoRefresh: !prev.autoRefresh }))}
            className={`p-2 rounded-lg transition-colors ${
              state.autoRefresh 
                ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300' 
                : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            title="Toggle Auto Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${state.autoRefresh ? 'animate-spin' : ''}`} />
          </button>

          {/* Manual Refresh */}
          <button
            onClick={refreshDashboardData}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            title="Refresh Now"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {/* Customize Toggle */}
          <button
            onClick={toggleCustomizeMode}
            className={`px-3 py-2 rounded-lg transition-colors ${
              state.isCustomizing 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <Layout className="w-4 h-4 mr-1" />
            {state.isCustomizing ? 'Done' : 'Customize'}
          </button>

          {/* Export */}
          <button
            onClick={exportDashboard}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            title="Export Dashboard"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div 
        className={`
          grid grid-cols-12 auto-rows-min
          ${getDensityClasses()}
          ${showGridLines ? 'bg-grid-pattern' : ''}
          ${isFullscreen ? 'fixed inset-0 z-50 bg-white dark:bg-gray-900' : ''}
        `}
      >
        <AnimatePresence>
          {state.widgets.map(renderWidget)}
        </AnimatePresence>
      </div>

      {/* Customization Panel */}
      <AnimatePresence>
        {state.isCustomizing && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed right-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl z-40 overflow-y-auto"
          >
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Customize Dashboard</h3>
              
              {/* Add Widget Button */}
              <button
                onClick={() => {/* Open widget selector */}}
                className="w-full flex items-center justify-center space-x-2 p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Add Widget</span>
              </button>

              {/* Widget List */}
              <div className="mt-6 space-y-2">
                {state.widgets.map((widget) => (
                  <div
                    key={widget.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      state.selectedWidget === widget.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setState(prev => ({ ...prev, selectedWidget: widget.id }))}
                  >
                    <div className="font-medium">{widget.title}</div>
                    <div className="text-sm text-gray-500">{widget.type}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background overlay for customization */}
      {state.isCustomizing && (
        <div 
          className="fixed inset-0 bg-black/20 z-30"
          onClick={toggleCustomizeMode}
        />
      )}
    </div>
  );
};

export default HRAIDashboard;