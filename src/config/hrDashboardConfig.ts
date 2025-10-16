/**
 * HR Dashboard Configuration System
 * =================================
 * 
 * Advanced soft coding framework for dynamic HR dashboard creation featuring:
 * - Configurable widget system with drag-and-drop capabilities
 * - Dynamic layout management and responsive design
 * - AI-powered insights and predictive analytics
 * - Real-time data binding and live updates
 * - Personalized dashboard experiences for different HR roles
 */

// HR Dashboard Configuration - Using string icon references instead of JSX
// Icons will be resolved in the components that consume this configuration
// All icon imports removed - using string references instead

// Widget Types and Configurations
export enum WidgetType {
  METRIC_CARD = 'metric_card',
  CHART = 'chart',
  TABLE = 'table',
  LIST = 'list',
  PROGRESS = 'progress',
  CALENDAR = 'calendar',
  AI_INSIGHT = 'ai_insight',
  NOTIFICATION = 'notification',
  INTERACTIVE = 'interactive'
}

export enum ChartType {
  LINE = 'line',
  BAR = 'bar',
  PIE = 'pie',
  DOUGHNUT = 'doughnut',
  AREA = 'area',
  SCATTER = 'scatter',
  RADAR = 'radar',
  HEATMAP = 'heatmap'
}

export enum DataSource {
  EMPLOYEES = 'employees',
  ATTENDANCE = 'attendance',
  PERFORMANCE = 'performance',
  PAYROLL = 'payroll',
  RECRUITMENT = 'recruitment',
  TRAINING = 'training',
  ANALYTICS = 'analytics',
  AI_PREDICTIONS = 'ai_predictions'
}

// Base Widget Configuration Interface
export interface WidgetConfig {
  id: string;
  type: WidgetType;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  size: 'small' | 'medium' | 'large' | 'extra-large';
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  dataSource: DataSource;
  refreshInterval?: number; // in seconds
  filters?: WidgetFilter[];
  permissions?: string[];
  aiEnabled?: boolean;
  customizable?: boolean;
  exportable?: boolean;
  realTime?: boolean;
}

// Metric Card Configuration
export interface MetricCardConfig extends WidgetConfig {
  type: WidgetType.METRIC_CARD;
  metric: {
    value: number | string;
    label: string;
    format: 'number' | 'currency' | 'percentage' | 'duration' | 'custom';
    trend?: {
      value: number;
      direction: 'up' | 'down' | 'stable';
      period: string;
    };
    target?: number;
    status?: 'good' | 'warning' | 'critical' | 'neutral';
    comparison?: {
      value: number;
      label: string;
      period: string;
    };
  };
  visualization?: {
    showSparkline?: boolean;
    colorTheme?: string;
    animation?: boolean;
  };
}

// Chart Widget Configuration
export interface ChartConfig extends WidgetConfig {
  type: WidgetType.CHART;
  chart: {
    type: ChartType;
    data: any[];
    xAxis: string;
    yAxis: string | string[];
    groupBy?: string;
    aggregation?: 'sum' | 'average' | 'count' | 'max' | 'min';
    timeRange?: string;
    colors?: string[];
    animations?: boolean;
    interactive?: boolean;
    legend?: boolean;
    tooltip?: boolean;
  };
  aiInsights?: {
    enabled: boolean;
    predictions?: boolean;
    anomalyDetection?: boolean;
    trendAnalysis?: boolean;
  };
}

// Table Widget Configuration
export interface TableConfig extends WidgetConfig {
  type: WidgetType.TABLE;
  table: {
    columns: TableColumn[];
    sortable: boolean;
    filterable: boolean;
    pagination: boolean;
    pageSize: number;
    searchable: boolean;
    selectable: boolean;
    exportable: boolean;
    rowActions?: RowAction[];
  };
}

// Filter Configuration
export interface WidgetFilter {
  field: string;
  operator: 'equals' | 'contains' | 'greater_than' | 'less_than' | 'between' | 'in';
  value: any;
  label?: string;
  type: 'text' | 'number' | 'date' | 'select' | 'multi-select';
}

// Table Column Configuration
export interface TableColumn {
  key: string;
  title: string;
  type: 'text' | 'number' | 'date' | 'boolean' | 'status' | 'action' | 'avatar';
  sortable?: boolean;
  filterable?: boolean;
  width?: number;
  format?: string;
  render?: (value: any, row: any) => React.ReactNode;
}

// Row Action Configuration
export interface RowAction {
  key: string;
  label: string;
  icon?: React.ReactNode;
  type: 'primary' | 'secondary' | 'danger';
  permission?: string;
  handler: (row: any) => void;
}

// Dashboard Layout Configuration
export interface DashboardLayout {
  id: string;
  name: string;
  description?: string;
  role?: string;
  isDefault?: boolean;
  isPersonalized?: boolean;
  widgets: WidgetConfig[];
  settings: {
    theme: 'light' | 'dark' | 'auto';
    density: 'compact' | 'comfortable' | 'spacious';
    autoRefresh: boolean;
    refreshInterval: number;
    showGridLines: boolean;
    enableAnimations: boolean;
    aiAssistant: boolean;
  };
  metadata: {
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    version: string;
    tags?: string[];
  };
}

// Pre-configured HR Dashboard Layouts
export const HR_DASHBOARD_LAYOUTS: Record<string, DashboardLayout> = {
  // Executive HR Dashboard
  executive: {
    id: 'hr_executive',
    name: 'Executive HR Dashboard',
    description: 'High-level HR metrics and strategic insights for executives',
    role: 'HR_Executive',
    isDefault: true,
    widgets: [
      // Key Metrics Row
      {
        id: 'total_employees',
        type: WidgetType.METRIC_CARD,
        title: 'Total Employees',
        icon: 'Users',
        size: 'small',
        position: { x: 0, y: 0, width: 3, height: 2 },
        dataSource: DataSource.EMPLOYEES,
        refreshInterval: 300,
        aiEnabled: true,
        metric: {
          value: 0,
          label: 'Active Employees',
          format: 'number',
          trend: { value: 5.2, direction: 'up', period: 'vs last month' }
        }
      } as MetricCardConfig,
      {
        id: 'avg_performance',
        type: WidgetType.METRIC_CARD,
        title: 'Average Performance',
        icon: 'Target',
        size: 'small',
        position: { x: 3, y: 0, width: 3, height: 2 },
        dataSource: DataSource.PERFORMANCE,
        refreshInterval: 600,
        aiEnabled: true,
        metric: {
          value: 0,
          label: 'Performance Score',
          format: 'percentage',
          target: 85,
          status: 'good'
        }
      } as MetricCardConfig,
      {
        id: 'employee_satisfaction',
        type: WidgetType.METRIC_CARD,
        title: 'Employee Satisfaction',
        icon: 'Heart',
        size: 'small',
        position: { x: 6, y: 0, width: 3, height: 2 },
        dataSource: DataSource.ANALYTICS,
        refreshInterval: 3600,
        aiEnabled: true,
        metric: {
          value: 0,
          label: 'Satisfaction Index',
          format: 'percentage',
          trend: { value: 2.1, direction: 'up', period: 'vs last quarter' }
        }
      } as MetricCardConfig,
      {
        id: 'turnover_rate',
        type: WidgetType.METRIC_CARD,
        title: 'Turnover Rate',
        icon: 'UserX',
        size: 'small',
        position: { x: 9, y: 0, width: 3, height: 2 },
        dataSource: DataSource.ANALYTICS,
        refreshInterval: 3600,
        aiEnabled: true,
        metric: {
          value: 0,
          label: 'Annual Turnover',
          format: 'percentage',
          trend: { value: -1.8, direction: 'down', period: 'vs last year' },
          status: 'good'
        }
      } as MetricCardConfig,

      // Charts Row
      {
        id: 'employee_growth_trend',
        type: WidgetType.CHART,
        title: 'Employee Growth Trend',
        subtitle: 'Headcount evolution over time',
        size: 'large',
        position: { x: 0, y: 2, width: 6, height: 4 },
        dataSource: DataSource.EMPLOYEES,
        refreshInterval: 1800,
        aiEnabled: true,
        chart: {
          type: ChartType.LINE,
          data: [],
          xAxis: 'month',
          yAxis: 'count',
          timeRange: '12months',
          colors: ['#3B82F6', '#10B981'],
          animations: true,
          interactive: true,
          legend: true
        },
        aiInsights: {
          enabled: true,
          predictions: true,
          trendAnalysis: true
        }
      } as ChartConfig,
      {
        id: 'department_distribution',
        type: WidgetType.CHART,
        title: 'Department Distribution',
        subtitle: 'Employee distribution by department',
        size: 'large',
        position: { x: 6, y: 2, width: 6, height: 4 },
        dataSource: DataSource.EMPLOYEES,
        refreshInterval: 1800,
        chart: {
          type: ChartType.DOUGHNUT,
          data: [],
          xAxis: 'department',
          yAxis: 'count',
          colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
          animations: true,
          legend: true,
          tooltip: true
        }
      } as ChartConfig,

      // Performance and Analytics Row
      {
        id: 'performance_trends',
        type: WidgetType.CHART,
        title: 'Performance Trends',
        subtitle: 'Quarterly performance analysis',
        size: 'large',
        position: { x: 0, y: 6, width: 8, height: 4 },
        dataSource: DataSource.PERFORMANCE,
        refreshInterval: 3600,
        aiEnabled: true,
        chart: {
          type: ChartType.BAR,
          data: [],
          xAxis: 'quarter',
          yAxis: 'average_score',
          groupBy: 'department',
          animations: true,
          interactive: true,
          legend: true
        },
        aiInsights: {
          enabled: true,
          trendAnalysis: true,
          anomalyDetection: true
        }
      } as ChartConfig,
      {
        id: 'ai_hr_insights',
        type: WidgetType.AI_INSIGHT,
        title: 'AI HR Insights',
        subtitle: 'Intelligent recommendations and predictions',
        icon: 'Brain',
        size: 'medium',
        position: { x: 8, y: 6, width: 4, height: 4 },
        dataSource: DataSource.AI_PREDICTIONS,
        refreshInterval: 1800,
        aiEnabled: true,
        realTime: true
      }
    ],
    settings: {
      theme: 'light',
      density: 'comfortable',
      autoRefresh: true,
      refreshInterval: 300,
      showGridLines: false,
      enableAnimations: true,
      aiAssistant: true
    },
    metadata: {
      createdBy: 'system',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: '1.0.0',
      tags: ['executive', 'strategic', 'overview']
    }
  },

  // HR Manager Dashboard
  manager: {
    id: 'hr_manager',
    name: 'HR Manager Dashboard',
    description: 'Operational HR metrics and team management insights',
    role: 'HR_Manager',
    isDefault: true,
    widgets: [
      // Operational Metrics
      {
        id: 'active_recruitments',
        type: WidgetType.METRIC_CARD,
        title: 'Active Recruitments',
        icon: 'UserCheck',
        size: 'small',
        position: { x: 0, y: 0, width: 3, height: 2 },
        dataSource: DataSource.RECRUITMENT,
        refreshInterval: 600,
        metric: {
          value: 0,
          label: 'Open Positions',
          format: 'number',
          trend: { value: 3, direction: 'up', period: 'this week' }
        }
      } as MetricCardConfig,
      {
        id: 'attendance_rate',
        type: WidgetType.METRIC_CARD,
        title: 'Attendance Rate',
        icon: 'Clock',
        size: 'small',
        position: { x: 3, y: 0, width: 3, height: 2 },
        dataSource: DataSource.ATTENDANCE,
        refreshInterval: 3600,
        realTime: true,
        metric: {
          value: 0,
          label: 'Today\'s Attendance',
          format: 'percentage',
          target: 95,
          status: 'good'
        }
      } as MetricCardConfig,
      {
        id: 'training_completion',
        type: WidgetType.METRIC_CARD,
        title: 'Training Completion',
        icon: 'BookOpen',
        size: 'small',
        position: { x: 6, y: 0, width: 3, height: 2 },
        dataSource: DataSource.TRAINING,
        refreshInterval: 3600,
        metric: {
          value: 0,
          label: 'Completion Rate',
          format: 'percentage',
          trend: { value: 8.5, direction: 'up', period: 'this month' }
        }
      } as MetricCardConfig,
      {
        id: 'payroll_processing',
        type: WidgetType.METRIC_CARD,
        title: 'Payroll Status',
        icon: 'DollarSign',
        size: 'small',
        position: { x: 9, y: 0, width: 3, height: 2 },
        dataSource: DataSource.PAYROLL,
        refreshInterval: 1800,
        metric: {
          value: 0,
          label: 'Processed',
          format: 'percentage',
          status: 'good'
        }
      } as MetricCardConfig,

      // Employee Management Table
      {
        id: 'employee_list',
        type: WidgetType.TABLE,
        title: 'Employee Management',
        subtitle: 'Quick access to employee information and actions',
        size: 'extra-large',
        position: { x: 0, y: 2, width: 12, height: 6 },
        dataSource: DataSource.EMPLOYEES,
        refreshInterval: 600,
        table: {
          columns: [
            { key: 'avatar', title: '', type: 'avatar', width: 50 },
            { key: 'name', title: 'Name', type: 'text', sortable: true, filterable: true },
            { key: 'department', title: 'Department', type: 'text', sortable: true, filterable: true },
            { key: 'position', title: 'Position', type: 'text', sortable: true },
            { key: 'performance', title: 'Performance', type: 'number', format: 'percentage' },
            { key: 'attendance', title: 'Attendance', type: 'number', format: 'percentage' },
            { key: 'status', title: 'Status', type: 'status', sortable: true },
            { key: 'actions', title: 'Actions', type: 'action' }
          ],
          sortable: true,
          filterable: true,
          pagination: true,
          pageSize: 10,
          searchable: true,
          selectable: true,
          exportable: true,
          rowActions: [
            {
              key: 'view',
              label: 'View Profile',
              icon: 'User',
              type: 'primary',
              handler: (row) => console.log('View', row)
            },
            {
              key: 'edit',
              label: 'Edit',
              icon: 'Users',
              type: 'secondary',
              handler: (row) => console.log('Edit', row)
            }
          ]
        }
      } as TableConfig,

      // Analytics and Insights
      {
        id: 'attendance_heatmap',
        type: WidgetType.CHART,
        title: 'Attendance Heatmap',
        subtitle: 'Daily attendance patterns',
        size: 'large',
        position: { x: 0, y: 8, width: 6, height: 4 },
        dataSource: DataSource.ATTENDANCE,
        refreshInterval: 3600,
        chart: {
          type: ChartType.HEATMAP,
          data: [],
          xAxis: 'day',
          yAxis: 'hour',
          colors: ['#FEF3C7', '#FCD34D', '#F59E0B', '#D97706'],
          interactive: true,
          tooltip: true
        }
      } as ChartConfig,
      {
        id: 'recruitment_pipeline',
        type: WidgetType.CHART,
        title: 'Recruitment Pipeline',
        subtitle: 'Candidate status distribution',
        size: 'large',
        position: { x: 6, y: 8, width: 6, height: 4 },
        dataSource: DataSource.RECRUITMENT,
        refreshInterval: 1800,
        chart: {
          type: ChartType.BAR,
          data: [],
          xAxis: 'stage',
          yAxis: 'count',
          colors: ['#3B82F6'],
          animations: true,
          interactive: true
        }
      } as ChartConfig
    ],
    settings: {
      theme: 'light',
      density: 'comfortable',
      autoRefresh: true,
      refreshInterval: 600,
      showGridLines: true,
      enableAnimations: true,
      aiAssistant: true
    },
    metadata: {
      createdBy: 'system',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: '1.0.0',
      tags: ['manager', 'operational', 'team']
    }
  },

  // HR Analyst Dashboard
  analyst: {
    id: 'hr_analyst',
    name: 'HR Analytics Dashboard',
    description: 'Deep analytics and data-driven insights for HR analysts',
    role: 'HR_Analyst',
    isDefault: true,
    widgets: [
      // Advanced Analytics Metrics
      {
        id: 'predictive_turnover',
        type: WidgetType.METRIC_CARD,
        title: 'Predicted Turnover Risk',
        icon: 'AlertTriangle',
        size: 'small',
        position: { x: 0, y: 0, width: 4, height: 2 },
        dataSource: DataSource.AI_PREDICTIONS,
        refreshInterval: 3600,
        aiEnabled: true,
        metric: {
          value: 0,
          label: 'High Risk Employees',
          format: 'number',
          status: 'warning'
        }
      } as MetricCardConfig,
      {
        id: 'engagement_score',
        type: WidgetType.METRIC_CARD,
        title: 'Employee Engagement',
        icon: 'Star',
        size: 'small',
        position: { x: 4, y: 0, width: 4, height: 2 },
        dataSource: DataSource.ANALYTICS,
        refreshInterval: 3600,
        aiEnabled: true,
        metric: {
          value: 0,
          label: 'Engagement Index',
          format: 'percentage',
          trend: { value: 4.2, direction: 'up', period: 'vs last month' }
        }
      } as MetricCardConfig,
      {
        id: 'diversity_index',
        type: WidgetType.METRIC_CARD,
        title: 'Diversity Index',
        icon: 'Users',
        size: 'small',
        position: { x: 8, y: 0, width: 4, height: 2 },
        dataSource: DataSource.ANALYTICS,
        refreshInterval: 3600,
        metric: {
          value: 0,
          label: 'D&I Score',
          format: 'percentage',
          target: 80,
          status: 'good'
        }
      } as MetricCardConfig,

      // Advanced Charts
      {
        id: 'performance_correlation',
        type: WidgetType.CHART,
        title: 'Performance Correlation Matrix',
        subtitle: 'Correlation between different performance factors',
        size: 'large',
        position: { x: 0, y: 2, width: 6, height: 5 },
        dataSource: DataSource.ANALYTICS,
        refreshInterval: 3600,
        aiEnabled: true,
        chart: {
          type: ChartType.HEATMAP,
          data: [],
          xAxis: 'factor1',
          yAxis: 'factor2',
          colors: ['#EF4444', '#F97316', '#EAB308', '#22C55E', '#059669'],
          interactive: true,
          tooltip: true
        },
        aiInsights: {
          enabled: true,
          trendAnalysis: true,
          anomalyDetection: true
        }
      } as ChartConfig,
      {
        id: 'talent_pipeline',
        type: WidgetType.CHART,
        title: 'Talent Pipeline Analysis',
        subtitle: 'Skills and competency mapping',
        size: 'large',
        position: { x: 6, y: 2, width: 6, height: 5 },
        dataSource: DataSource.ANALYTICS,
        refreshInterval: 3600,
        aiEnabled: true,
        chart: {
          type: ChartType.RADAR,
          data: [],
          xAxis: 'skill',
          yAxis: 'proficiency',
          groupBy: 'department',
          colors: ['#3B82F6', '#10B981', '#F59E0B'],
          animations: true,
          legend: true
        }
      } as ChartConfig,

      // Predictive Analytics
      {
        id: 'workforce_forecasting',
        type: WidgetType.CHART,
        title: 'Workforce Forecasting',
        subtitle: 'AI-powered workforce planning predictions',
        size: 'extra-large',
        position: { x: 0, y: 7, width: 12, height: 5 },
        dataSource: DataSource.AI_PREDICTIONS,
        refreshInterval: 3600,
        aiEnabled: true,
        chart: {
          type: ChartType.LINE,
          data: [],
          xAxis: 'month',
          yAxis: ['headcount', 'predicted_headcount'],
          timeRange: '24months',
          colors: ['#3B82F6', '#F59E0B'],
          animations: true,
          interactive: true,
          legend: true
        },
        aiInsights: {
          enabled: true,
          predictions: true,
          trendAnalysis: true
        }
      } as ChartConfig
    ],
    settings: {
      theme: 'light',
      density: 'compact',
      autoRefresh: true,
      refreshInterval: 1800,
      showGridLines: true,
      enableAnimations: true,
      aiAssistant: true
    },
    metadata: {
      createdBy: 'system',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: '1.0.0',
      tags: ['analyst', 'analytics', 'predictive']
    }
  }
};

// Widget Icon Mapping - Icons are now referenced by string names
// Icons will be resolved in the components that render the widgets
export const WIDGET_ICON_NAMES = {
  users: 'Users',
  trending: 'TrendingUp',
  clock: 'Clock',
  target: 'Target',
  award: 'Award',
  calendar: 'Calendar',
  dollar: 'DollarSign',
  chart: 'BarChart3',
  pie: 'PieChart',
  activity: 'Activity',
  user: 'User',
  userCheck: 'UserCheck',
  userX: 'UserX',
  brain: 'Brain',
  zap: 'Zap',
  warning: 'AlertTriangle',
  check: 'CheckCircle',
  star: 'Star',
  book: 'BookOpen',
  shield: 'Shield',
  heart: 'Heart',
  coffee: 'Coffee',
  briefcase: 'Briefcase'
};

// Utility functions for dashboard management
export class DashboardConfigManager {
  static getLayoutByRole(role: string): DashboardLayout | null {
    const layouts = Object.values(HR_DASHBOARD_LAYOUTS);
    return layouts.find(layout => layout.role === role && layout.isDefault) || null;
  }

  static createCustomLayout(baseLayout: DashboardLayout, customizations: Partial<DashboardLayout>): DashboardLayout {
    return {
      ...baseLayout,
      ...customizations,
      id: `custom_${baseLayout.id}_${Date.now()}`,
      isDefault: false,
      isPersonalized: true,
      metadata: {
        ...baseLayout.metadata,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        version: '1.0.0'
      }
    };
  }

  static validateWidgetConfig(widget: WidgetConfig): boolean {
    // Validate required fields
    if (!widget.id || !widget.type || !widget.title || !widget.dataSource) {
      return false;
    }

    // Validate position
    if (!widget.position || widget.position.width <= 0 || widget.position.height <= 0) {
      return false;
    }

    // Type-specific validation
    switch (widget.type) {
      case WidgetType.METRIC_CARD:
        return !!(widget as MetricCardConfig).metric;
      case WidgetType.CHART:
        return !!(widget as ChartConfig).chart;
      case WidgetType.TABLE:
        return !!(widget as TableConfig).table;
      default:
        return true;
    }
  }

  static optimizeLayout(layout: DashboardLayout): DashboardLayout {
    // Sort widgets by position for better rendering
    const sortedWidgets = layout.widgets.sort((a, b) => {
      if (a.position.y !== b.position.y) {
        return a.position.y - b.position.y;
      }
      return a.position.x - b.position.x;
    });

    return {
      ...layout,
      widgets: sortedWidgets,
      metadata: {
        ...layout.metadata,
        updatedAt: new Date().toISOString()
      }
    };
  }
}

export default HR_DASHBOARD_LAYOUTS;
