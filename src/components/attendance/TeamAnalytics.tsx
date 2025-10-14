'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3,
  PieChart,
  Calendar,
  Users,
  Clock,
  Target,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

// Types
interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
    borderWidth?: number;
  }[];
}

interface TeamAnalytics {
  attendanceTrend: ChartData;
  departmentBreakdown: ChartData;
  productivityMetrics: ChartData;
  weeklyPattern: ChartData;
  monthlyComparison: {
    current: number;
    previous: number;
    change: number;
  };
  topPerformers: {
    id: string;
    name: string;
    score: number;
    improvement: number;
  }[];
  alerts: {
    id: string;
    type: 'attendance' | 'productivity' | 'overtime';
    message: string;
    severity: 'low' | 'medium' | 'high';
  }[];
}

const TeamAnalytics: React.FC = () => {
  const [analytics, setAnalytics] = useState<TeamAnalytics | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<'attendance' | 'productivity' | 'overtime'>('attendance');
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter'>('month');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock analytics data
    const mockAnalytics: TeamAnalytics = {
      attendanceTrend: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
          label: 'Attendance Rate',
          data: [92, 89, 94, 91],
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          borderColor: 'rgb(59, 130, 246)',
          borderWidth: 2
        }]
      },
      departmentBreakdown: {
        labels: ['Engineering', 'HR', 'Finance', 'Sales', 'Marketing'],
        datasets: [{
          label: 'Attendance Rate',
          data: [95, 88, 92, 87, 90],
          backgroundColor: [
            '#3B82F6',
            '#10B981',
            '#F59E0B',
            '#EF4444',
            '#8B5CF6'
          ]
        }]
      },
      productivityMetrics: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: [{
          label: 'Productivity Score',
          data: [85, 88, 92, 89, 86],
          backgroundColor: 'rgba(16, 185, 129, 0.5)',
          borderColor: 'rgb(16, 185, 129)',
          borderWidth: 2
        }]
      },
      weeklyPattern: {
        labels: ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'],
        datasets: [{
          label: 'Check-ins',
          data: [15, 8, 3, 2, 12, 4, 2, 1, 18],
          backgroundColor: 'rgba(139, 92, 246, 0.5)',
          borderColor: 'rgb(139, 92, 246)',
          borderWidth: 2
        }]
      },
      monthlyComparison: {
        current: 91.5,
        previous: 88.2,
        change: 3.3
      },
      topPerformers: [
        { id: '1', name: 'Sarah Johnson', score: 96.5, improvement: 2.3 },
        { id: '2', name: 'John Smith', score: 94.8, improvement: 1.8 },
        { id: '3', name: 'Lisa Wilson', score: 93.2, improvement: 4.1 },
        { id: '4', name: 'Mike Chen', score: 91.7, improvement: -1.2 }
      ],
      alerts: [
        {
          id: '1',
          type: 'attendance',
          message: 'Engineering department shows declining attendance trend',
          severity: 'medium'
        },
        {
          id: '2',
          type: 'overtime',
          message: 'Excessive overtime detected in Finance team',
          severity: 'high'
        },
        {
          id: '3',
          type: 'productivity',
          message: 'Sales team productivity improved by 12%',
          severity: 'low'
        }
      ]
    };

    setAnalytics(mockAnalytics);
    setIsLoading(false);
  }, [timeRange]);

  // Simple chart component (placeholder for actual chart library)
  const SimpleBarChart: React.FC<{ data: ChartData; title: string }> = ({ data, title }) => {
    const maxValue = Math.max(...data.datasets[0].data);
    
    return (
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">{title}</h3>
        <div className="space-y-3">
          {data.labels.map((label, index) => {
            const value = data.datasets[0].data[index];
            const percentage = (value / maxValue) * 100;
            
            return (
              <div key={label} className="flex items-center gap-3">
                <div className="w-20 text-sm text-gray-600">{label}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="bg-blue-600 h-6 rounded-full flex items-center justify-end pr-2"
                  >
                    <span className="text-white text-xs font-medium">{value}%</span>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const SimplePieChart: React.FC<{ data: ChartData; title: string }> = ({ data, title }) => {
    const total = data.datasets[0].data.reduce((sum, value) => sum + value, 0);
    
    return (
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">{title}</h3>
        <div className="space-y-2">
          {data.labels.map((label, index) => {
            const value = data.datasets[0].data[index];
            const percentage = ((value / total) * 100).toFixed(1);
            const colors = data.datasets[0].backgroundColor as string[];
            
            return (
              <div key={label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: colors[index] }}
                  ></div>
                  <span className="text-sm text-gray-700">{label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{value}%</span>
                  <span className="text-xs text-gray-500">({percentage}%)</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!analytics) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Team Analytics</h2>
          <p className="text-gray-600">Advanced insights and performance metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as 'week' | 'month' | 'quarter')}
            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value as 'attendance' | 'productivity' | 'overtime')}
            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="attendance">Attendance</option>
            <option value="productivity">Productivity</option>
            <option value="overtime">Overtime</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-6 border"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Monthly Comparison</h3>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Current Month:</span>
              <span className="font-semibold">{analytics.monthlyComparison.current}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Previous Month:</span>
              <span className="font-semibold">{analytics.monthlyComparison.previous}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Change:</span>
              <span className={`font-semibold flex items-center gap-1 ${
                analytics.monthlyComparison.change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {analytics.monthlyComparison.change >= 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                {Math.abs(analytics.monthlyComparison.change)}%
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm p-6 border"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Top Performers</h3>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <div className="space-y-3">
            {analytics.topPerformers.slice(0, 3).map((performer, index) => (
              <div key={performer.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium">{performer.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">{performer.score}%</div>
                  <div className={`text-xs ${performer.improvement >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {performer.improvement >= 0 ? '+' : ''}{performer.improvement}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-6 border"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Alerts</h3>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
          </div>
          <div className="space-y-3">
            {analytics.alerts.map((alert) => {
              const severityColors = {
                low: 'text-blue-600 bg-blue-50 border-blue-200',
                medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
                high: 'text-red-600 bg-red-50 border-red-200'
              };

              return (
                <div key={alert.id} className={`p-3 rounded-lg border ${severityColors[alert.severity]}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-xs font-semibold uppercase tracking-wide">
                      {alert.type}
                    </span>
                  </div>
                  <p className="text-sm">{alert.message}</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border"
        >
          <SimpleBarChart 
            data={analytics.attendanceTrend} 
            title="Attendance Trend" 
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border"
        >
          <SimplePieChart 
            data={analytics.departmentBreakdown} 
            title="Department Breakdown" 
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-sm border"
        >
          <SimpleBarChart 
            data={analytics.productivityMetrics} 
            title="Weekly Productivity" 
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-sm border"
        >
          <SimpleBarChart 
            data={analytics.weeklyPattern} 
            title="Check-in Pattern" 
          />
        </motion.div>
      </div>
    </div>
  );
};

export default TeamAnalytics;