// Attendance Analytics Dashboard - Comprehensive attendance insights and statistics
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  TrendingUp,
  TrendingDown,
  Users,
  Award,
  AlertCircle,
  BarChart3,
  PieChart,
  Activity,
  MapPin,
  Home,
  Building2,
  Coffee,
  ChevronDown,
  ChevronUp,
  Filter,
  Download,
  RefreshCw,
  Target
} from 'lucide-react';
import AttendanceAPI, { 
  DashboardStats, 
  EmployeeSummary,
  formatTime,
  formatDuration 
} from '@/lib/attendanceApi';

interface AnalyticsProps {
  className?: string;
  employeeId?: string; // If provided, shows individual analytics
  period?: 'week' | 'month' | 'quarter' | 'year';
}

interface ChartData {
  labels: string[];
  values: number[];
  colors: string[];
}

interface TrendMetric {
  label: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  color: string;
  icon: React.ElementType;
}

const AttendanceAnalytics: React.FC<AnalyticsProps> = ({
  className = '',
  employeeId,
  period = 'month'
}) => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [summary, setSummary] = useState<EmployeeSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState(period);
  const [expandedSections, setExpandedSections] = useState<string[]>(['overview']);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAnalytics = async () => {
    try {
      const [dashStats, empSummary] = await Promise.all([
        AttendanceAPI.getDashboardStats(),
        employeeId ? AttendanceAPI.getEmployeeSummary() : null
      ]);

      setStats(dashStats);
      setSummary(empSummary);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [employeeId, selectedPeriod]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchAnalytics();
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  // Calculate trend metrics
  const getTrendMetrics = (): TrendMetric[] => {
    if (!stats) return [];

    return [
      {
        label: 'Total Employees',
        value: stats.total_employees,
        change: 5.2,
        trend: 'up',
        color: 'blue',
        icon: Users
      },
      {
        label: 'Present Today',
        value: stats.present_today,
        change: 2.1,
        trend: 'up',
        color: 'green',
        icon: Award
      },
      {
        label: 'Late Arrivals',
        value: Math.floor(stats.total_employees * 0.1), // Mock data
        change: -1.3,
        trend: 'down',
        color: 'orange',
        icon: Clock
      },
      {
        label: 'Absentees',
        value: stats.total_employees - stats.present_today,
        change: -0.8,
        trend: 'down',
        color: 'red',
        icon: AlertCircle
      }
    ];
  };

  // Work mode distribution data
  const getWorkModeData = (): ChartData => {
    if (!stats) return { labels: [], values: [], colors: [] };

    return {
      labels: ['Office', 'Remote', 'Hybrid', 'Field'],
      values: [
        Math.floor(stats.present_today * 0.6), // Mock distribution
        Math.floor(stats.present_today * 0.3),
        Math.floor(stats.present_today * 0.08),
        Math.floor(stats.present_today * 0.02)
      ],
      colors: ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b']
    };
  };

  // Attendance pattern data
  const getAttendancePattern = (): ChartData => {
    // Mock weekly pattern data - replace with real data
    return {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      values: [95, 92, 89, 94, 88, 45, 20],
      colors: ['#10b981', '#10b981', '#f59e0b', '#10b981', '#f59e0b', '#6b7280', '#6b7280']
    };
  };

  const renderMetricCard = (metric: TrendMetric, index: number) => (
    <motion.div
      key={metric.label}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`bg-gradient-to-br from-${metric.color}-50 to-white p-6 rounded-xl border border-${metric.color}-200 shadow-sm hover:shadow-md transition-shadow`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
          <p className={`text-3xl font-bold text-${metric.color}-700`}>
            {metric.value.toLocaleString()}
          </p>
          <div className="flex items-center mt-2">
            {metric.trend === 'up' ? (
              <TrendingUp className="w-4 h-4 text-green-600" />
            ) : metric.trend === 'down' ? (
              <TrendingDown className="w-4 h-4 text-red-600" />
            ) : (
              <Activity className="w-4 h-4 text-gray-600" />
            )}
            <span className={`text-sm ml-1 ${
              metric.trend === 'up' ? 'text-green-600' :
              metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
            }`}>
              {metric.change > 0 ? '+' : ''}{metric.change}%
            </span>
          </div>
        </div>
        <div className={`p-3 bg-${metric.color}-100 rounded-lg`}>
          <metric.icon className={`w-6 h-6 text-${metric.color}-700`} />
        </div>
      </div>
    </motion.div>
  );

  const renderBarChart = (data: ChartData, title: string) => {
    const maxValue = Math.max(...data.values);
    
    return (
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <div className="space-y-3">
          {data.labels.map((label, index) => (
            <div key={label} className="flex items-center space-x-3">
              <span className="w-12 text-sm text-gray-600 font-medium">
                {label}
              </span>
              <div className="flex-1 bg-gray-200 rounded-full h-2 relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(data.values[index] / maxValue) * 100}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className="h-2 rounded-full"
                  style={{ backgroundColor: data.colors[index] }}
                />
              </div>
              <span className="w-12 text-sm font-semibold text-gray-900 text-right">
                {data.values[index]}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSection = (
    id: string,
    title: string,
    icon: React.ElementType,
    content: React.ReactNode
  ) => {
    const isExpanded = expandedSections.includes(id);
    const IconComponent = icon;
    
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-xl shadow-sm border overflow-hidden"
      >
        <button
          onClick={() => toggleSection(id)}
          className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <IconComponent className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 border-t border-gray-100">
                {content}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className={`bg-white rounded-xl shadow-lg border p-8 ${className}`}>
        <div className="flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" />
          <span className="ml-3 text-gray-600">Loading analytics...</span>
        </div>
      </div>
    );
  }

  const trendMetrics = getTrendMetrics();
  const workModeData = getWorkModeData();
  const attendancePattern = getAttendancePattern();

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          {employeeId ? 'Personal Analytics' : 'Team Analytics'}
        </h1>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Overview Metrics */}
      {renderSection('overview', 'Overview', BarChart3, (
        <div className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendMetrics.map(renderMetricCard)}
          </div>
        </div>
      ))}

      {/* Charts Section */}
      {renderSection('charts', 'Detailed Analytics', PieChart, (
        <div className="pt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {renderBarChart(workModeData, 'Work Mode Distribution')}
          {renderBarChart(attendancePattern, 'Weekly Attendance Pattern')}
        </div>
      ))}

      {/* Individual Summary (if employee specific) */}
      {summary && renderSection('personal', 'Personal Summary', Target, (
        <div className="pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
            <div className="flex items-center space-x-3 mb-4">
              <Calendar className="w-6 h-6 text-green-600" />
              <h3 className="font-semibold text-green-800">Attendance Rate</h3>
            </div>
            <div className="text-3xl font-bold text-green-700 mb-2">
              {summary.monthly_stats.attendance_rate.toFixed(1)}%
            </div>
            <p className="text-sm text-green-600">
              {summary.monthly_stats.present_days} of {summary.monthly_stats.total_days} days
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-sky-50 p-6 rounded-xl border border-blue-200">
            <div className="flex items-center space-x-3 mb-4">
              <Clock className="w-6 h-6 text-blue-600" />
              <h3 className="font-semibold text-blue-800">Avg. Hours</h3>
            </div>
            <div className="text-3xl font-bold text-blue-700 mb-2">
              {(summary.monthly_stats.total_hours / summary.monthly_stats.present_days).toFixed(1)}h
            </div>
            <p className="text-sm text-blue-600">
              {summary.monthly_stats.total_hours.toFixed(1)} total hours
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-xl border border-purple-200">
            <div className="flex items-center space-x-3 mb-4">
              <Award className="w-6 h-6 text-purple-600" />
              <h3 className="font-semibold text-purple-800">AI Score</h3>
            </div>
            <div className="text-3xl font-bold text-purple-700 mb-2">
              {summary.ai_scores.average_confidence.toFixed(1)}
            </div>
            <p className="text-sm text-purple-600">
              Performance rating
            </p>
          </div>
        </div>
      ))}

      {/* Recent Activities */}
      {renderSection('activities', 'Recent Activities', Activity, (
        <div className="pt-6">
          <div className="space-y-3">
            {/* Mock recent activities - replace with real data */}
            {[
              { id: 1, type: 'clock_in', employee_name: 'John Doe', action: 'Clocked in', time: '9:15 AM', location: 'Office' },
              { id: 2, type: 'clock_out', employee_name: 'Jane Smith', action: 'Clocked out', time: '5:30 PM', location: 'Remote' },
              { id: 3, type: 'break_start', employee_name: 'Mike Johnson', action: 'Started break', time: '12:00 PM', location: null },
            ].map((activity, index: number) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
              >
                <div className={`p-2 rounded-full ${
                  activity.type === 'clock_in' ? 'bg-green-100 text-green-600' :
                  activity.type === 'clock_out' ? 'bg-red-100 text-red-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {activity.type === 'clock_in' ? <MapPin className="w-4 h-4" /> :
                   activity.type === 'clock_out' ? <Home className="w-4 h-4" /> :
                   <Building2 className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.employee_name}</p>
                  <p className="text-sm text-gray-600">
                    {activity.action} • {activity.time}
                  </p>
                </div>
                {activity.location && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    {activity.location}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttendanceAnalytics;