/**
 * Clean HR AI Dashboard
 * ====================
 * 
 * Reconstructed HR dashboard with proper alignment and clean architecture:
 * - Clean, responsive layout
 * - Working sidebar navigation
 * - AI-powered insights
 * - Real-time metrics
 * - Proper soft coding implementation
 */

'use client';

import React, { useState } from 'react';
import {
  Users,
  Clock,
  Award,
  Target,
  BookOpen,
  Heart,
  Brain,
  UserCheck,
  FileText,
  UserPlus,
  ClipboardCheck,
  DollarSign,
  BarChart3,
  Settings,
  TrendingUp,
  AlertTriangle,
  Bell,
  Search,
  Filter,
  Download,
  RefreshCw,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';
import { HR_METRICS, HR_SIDEBAR_ITEMS, AI_INSIGHTS, CHART_DATA } from '@/config/hrConfig';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

// Icon mapping for dynamic icon rendering
const IconMap: { [key: string]: React.ComponentType<any> } = {
  Users,
  Clock,
  Award,
  Target,
  BookOpen,
  Heart,
  Brain,
  UserCheck,
  FileText,
  UserPlus,
  ClipboardCheck,
  DollarSign,
  BarChart3,
  Settings,
  TrendingUp,
  AlertTriangle,
  Bell
};

interface MetricCardProps {
  title: string;
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
  color: string;
  description?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon, 
  color, 
  description 
}) => {
  const IconComponent = IconMap[icon] || Users;
  
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <IconComponent className="w-6 h-6 text-white" />
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
        <p className={`text-sm ${getChangeColor()}`}>{change}</p>
        {description && (
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        )}
      </div>
    </div>
  );
};

interface AIInsightProps {
  title: string;
  type: 'warning' | 'info' | 'success';
  message: string;
  recommendation: string;
  confidence: number;
  icon: string;
}

const AIInsight: React.FC<AIInsightProps> = ({ 
  title, 
  type, 
  message, 
  recommendation, 
  confidence, 
  icon 
}) => {
  const IconComponent = IconMap[icon] || Brain;
  
  const getTypeColor = () => {
    switch (type) {
      case 'warning': return 'border-orange-200 bg-orange-50';
      case 'success': return 'border-green-200 bg-green-50';
      default: return 'border-blue-200 bg-blue-50';
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'warning': return 'text-orange-600';
      case 'success': return 'text-green-600';
      default: return 'text-blue-600';
    }
  };

  return (
    <div className={`p-4 rounded-lg border ${getTypeColor()}`}>
      <div className="flex items-start space-x-3">
        <div className={`p-2 rounded-full bg-white ${getIconColor()}`}>
          <IconComponent className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-gray-900 mb-1">{title}</h4>
          <p className="text-sm text-gray-700 mb-2">{message}</p>
          <p className="text-xs text-gray-600 mb-2">{recommendation}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Confidence: {confidence}%</span>
            <button className="text-xs text-blue-600 hover:text-blue-800">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CleanHRAIDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      tooltip: {
        backgroundColor: '#1f2937',
        titleColor: '#f9fafb',
        bodyColor: '#f9fafb',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#f3f4f6',
        },
      },
      x: {
        grid: {
          color: '#f3f4f6',
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-900">HR AI</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-4 px-3">
          {HR_SIDEBAR_ITEMS.map((item) => {
            const IconComponent = IconMap[item.icon] || Users;
            return (
              <a
                key={item.id}
                href={item.href}
                className="flex items-center px-3 py-2 mt-1 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150"
              >
                <IconComponent className="w-5 h-5 mr-3" />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    {item.badge}
                  </span>
                )}
                {item.subItems && (
                  <ChevronRight className="w-4 h-4 ml-2" />
                )}
              </a>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-gray-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">HR Manager</p>
              <p className="text-xs text-gray-500">john.doe@company.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="ml-4 lg:ml-0">
                <h1 className="text-xl font-semibold text-gray-900">HR AI Dashboard</h1>
                <p className="text-sm text-gray-500">AI-powered human resource analytics</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden sm:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search employees..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 3 months</option>
                <option value="1y">Last year</option>
              </select>

              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <Bell className="w-5 h-5" />
              </button>

              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
            {HR_METRICS.map((metric) => (
              <MetricCard key={metric.id} {...metric} />
            ))}
          </div>

          {/* Charts and Insights Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Employee Growth Chart */}
            <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Employee Growth</h3>
                <button className="text-sm text-blue-600 hover:text-blue-800">View Details</button>
              </div>
              <div className="h-64">
                <Line data={CHART_DATA.employeeGrowth} options={chartOptions} />
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">AI Insights</h3>
                <Brain className="w-5 h-5 text-blue-600" />
              </div>
              <div className="space-y-4">
                {AI_INSIGHTS.map((insight) => (
                  <AIInsight key={insight.id} {...insight} />
                ))}
              </div>
            </div>
          </div>

          {/* Additional Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Department Distribution */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Distribution</h3>
              <div className="h-64">
                <Doughnut data={CHART_DATA.departmentDistribution} options={doughnutOptions} />
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Distribution</h3>
              <div className="h-64">
                <Doughnut data={CHART_DATA.performanceMetrics} options={doughnutOptions} />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-25 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default CleanHRAIDashboard;