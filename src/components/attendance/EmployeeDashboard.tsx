// Individual Employee Attendance Dashboard - Enterprise-style employee view
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Calendar,
  Clock,
  TrendingUp,
  TrendingDown,
  Award,
  Target,
  Activity,
  BarChart3,
  PieChart,
  Download,
  Share,
  Settings,
  Bell,
  RefreshCw,
  Filter,
  Search,
  Eye,
  ChevronDown,
  Building2,
  Home,
  MapPin,
  Monitor,
  Coffee,
  Timer,
  Zap,
  AlertTriangle,
  CheckCircle,
  X
} from 'lucide-react';
import EmployeeAttendanceCalendar from '@/components/attendance/EmployeeAttendanceCalendar';
import AIInsightsCard from '@/components/attendance/AIInsightsCard';

interface EmployeeProfile {
  id: string;
  name: string;
  employee_id: string;
  department: string;
  position: string;
  email: string;
  phone: string;
  hire_date: string;
  manager: string;
  shift_schedule: string;
  profile_image?: string;
}

interface AttendanceSummary {
  current_month: {
    total_days: number;
    present_days: number;
    absent_days: number;
    late_days: number;
    total_hours: number;
    overtime_hours: number;
    attendance_rate: number;
    punctuality_rate: number;
  };
  last_month: {
    attendance_rate: number;
    total_hours: number;
    punctuality_rate: number;
  };
  yearly_stats: {
    total_hours: number;
    vacation_days_used: number;
    sick_days_used: number;
    overtime_hours: number;
  };
  trends: {
    attendance: 'improving' | 'declining' | 'stable';
    punctuality: 'improving' | 'declining' | 'stable';
    hours: 'increasing' | 'decreasing' | 'stable';
  };
}

interface RecentActivity {
  id: number;
  date: string;
  time: string;
  action: string;
  type: 'clock_in' | 'clock_out' | 'break_start' | 'break_end';
  location?: string;
  notes?: string;
}

interface EmployeeDashboardProps {
  employeeId?: string;
  className?: string;
}

const EmployeeDashboard: React.FC<EmployeeDashboardProps> = ({
  employeeId = 'current',
  className = ''
}) => {
  const [profile, setProfile] = useState<EmployeeProfile | null>(null);
  const [summary, setSummary] = useState<AttendanceSummary | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [activeTab, setActiveTab] = useState<'overview' | 'calendar' | 'analytics' | 'reports'>('calendar');

  useEffect(() => {
    loadEmployeeData();
  }, [employeeId]);

  const loadEmployeeData = async () => {
    setLoading(true);
    try {
      // Mock data - replace with API calls
      const mockProfile: EmployeeProfile = {
        id: employeeId,
        name: 'John Smith',
        employee_id: 'REJ2024001',
        department: 'Engineering',
        position: 'Senior Software Developer',
        email: 'john.smith@rejlers.com',
        phone: '+1-555-0123',
        hire_date: '2022-03-15',
        manager: 'Sarah Johnson',
        shift_schedule: '9:00 AM - 6:00 PM'
      };

      const mockSummary: AttendanceSummary = {
        current_month: {
          total_days: 22,
          present_days: 20,
          absent_days: 2,
          late_days: 3,
          total_hours: 165.5,
          overtime_hours: 8.5,
          attendance_rate: 90.9,
          punctuality_rate: 85.0
        },
        last_month: {
          attendance_rate: 88.2,
          total_hours: 158.0,
          punctuality_rate: 82.4
        },
        yearly_stats: {
          total_hours: 1840,
          vacation_days_used: 15,
          sick_days_used: 5,
          overtime_hours: 85
        },
        trends: {
          attendance: 'improving',
          punctuality: 'improving',
          hours: 'increasing'
        }
      };

      const mockActivity: RecentActivity[] = [
        {
          id: 1,
          date: '2024-10-14',
          time: '09:15 AM',
          action: 'Clocked in',
          type: 'clock_in',
          location: 'Main Office'
        },
        {
          id: 2,
          date: '2024-10-13',
          time: '06:30 PM',
          action: 'Clocked out',
          type: 'clock_out',
          location: 'Main Office'
        },
        {
          id: 3,
          date: '2024-10-13',
          time: '12:30 PM',
          action: 'Started break',
          type: 'break_start'
        },
        {
          id: 4,
          date: '2024-10-13',
          time: '08:45 AM',
          action: 'Clocked in',
          type: 'clock_in',
          location: 'Main Office'
        }
      ];

      setProfile(mockProfile);
      setSummary(mockSummary);
      setRecentActivity(mockActivity);
    } catch (error) {
      console.error('Failed to load employee data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'improving' || trend === 'increasing') {
      return <TrendingUp className="w-4 h-4 text-green-500" />;
    } else if (trend === 'declining' || trend === 'decreasing') {
      return <TrendingDown className="w-4 h-4 text-red-500" />;
    }
    return <Activity className="w-4 h-4 text-gray-500" />;
  };

  const getTrendColor = (trend: string) => {
    if (trend === 'improving' || trend === 'increasing') return 'text-green-600';
    if (trend === 'declining' || trend === 'decreasing') return 'text-red-600';
    return 'text-gray-600';
  };

  const getActionIcon = (type: RecentActivity['type']) => {
    const icons = {
      clock_in: <CheckCircle className="w-4 h-4 text-green-600" />,
      clock_out: <X className="w-4 h-4 text-red-600" />,
      break_start: <Coffee className="w-4 h-4 text-orange-600" />,
      break_end: <Timer className="w-4 h-4 text-blue-600" />
    };
    return icons[type] || <Activity className="w-4 h-4 text-gray-600" />;
  };

  if (loading) {
    return (
      <div className={`min-h-screen bg-gray-50 p-6 ${className}`}>
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="animate-spin w-8 h-8 text-blue-500" />
          <span className="ml-3 text-gray-600">Loading employee dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex items-start justify-between">
            {profile && (
              <div className="flex items-start space-x-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
                  <div className="text-sm text-gray-600 space-y-1 mt-2">
                    <p><span className="font-medium">Employee ID:</span> {profile.employee_id}</p>
                    <p><span className="font-medium">Department:</span> {profile.department} • <span className="font-medium">Position:</span> {profile.position}</p>
                    <p><span className="font-medium">Manager:</span> {profile.manager} • <span className="font-medium">Schedule:</span> {profile.shift_schedule}</p>
                  </div>
                </div>
              </div>
            )}

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
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                <Share className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-6 border-b border-gray-200">
            <nav className="flex space-x-8">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'calendar', label: 'Calendar View', icon: Calendar },
                { id: 'analytics', label: 'Analytics', icon: TrendingUp },
                { id: 'reports', label: 'Reports', icon: PieChart }
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Quick Stats */}
              {summary && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
                        <p className="text-3xl font-bold text-green-700">
                          {summary.current_month.attendance_rate.toFixed(1)}%
                        </p>
                        <div className="flex items-center mt-1">
                          {getTrendIcon(summary.trends.attendance)}
                          <span className={`text-sm ml-1 ${getTrendColor(summary.trends.attendance)}`}>
                            {((summary.current_month.attendance_rate - summary.last_month.attendance_rate) > 0 ? '+' : '')}
                            {(summary.current_month.attendance_rate - summary.last_month.attendance_rate).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      <Target className="w-8 h-8 text-green-600" />
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Hours This Month</p>
                        <p className="text-3xl font-bold text-blue-700">
                          {summary.current_month.total_hours.toFixed(1)}
                        </p>
                        <div className="flex items-center mt-1">
                          {getTrendIcon(summary.trends.hours)}
                          <span className={`text-sm ml-1 ${getTrendColor(summary.trends.hours)}`}>
                            {((summary.current_month.total_hours - summary.last_month.total_hours) > 0 ? '+' : '')}
                            {(summary.current_month.total_hours - summary.last_month.total_hours).toFixed(1)}h
                          </span>
                        </div>
                      </div>
                      <Clock className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Punctuality Rate</p>
                        <p className="text-3xl font-bold text-purple-700">
                          {summary.current_month.punctuality_rate.toFixed(1)}%
                        </p>
                        <div className="flex items-center mt-1">
                          {getTrendIcon(summary.trends.punctuality)}
                          <span className={`text-sm ml-1 ${getTrendColor(summary.trends.punctuality)}`}>
                            {((summary.current_month.punctuality_rate - summary.last_month.punctuality_rate) > 0 ? '+' : '')}
                            {(summary.current_month.punctuality_rate - summary.last_month.punctuality_rate).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      <Award className="w-8 h-8 text-purple-600" />
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Overtime Hours</p>
                        <p className="text-3xl font-bold text-orange-700">
                          {summary.current_month.overtime_hours.toFixed(1)}
                        </p>
                        <div className="flex items-center mt-1">
                          <Timer className="w-4 h-4 text-orange-500" />
                          <span className="text-sm ml-1 text-orange-600">
                            This month
                          </span>
                        </div>
                      </div>
                      <Activity className="w-8 h-8 text-orange-600" />
                    </div>
                  </div>
                </div>
              )}

              {/* AI Insights and Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AIInsightsCard 
                  insights={{
                    overall_score: 91.2,
                    confidence_level: 'High',
                    pattern_status: 'Normal',
                    productivity_level: 'Excellent',
                    recommendations: [
                      'Great consistency this month!',
                      'Consider setting earlier alarm for better punctuality',
                      'Your remote work productivity is excellent'
                    ],
                    trends: {
                      attendance: 'improving',
                      punctuality: 'improving',
                      productivity: 'improving'
                    }
                  }}
                  className="h-fit" 
                />
                
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="mt-1">
                          {getActionIcon(activity.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                          <p className="text-xs text-gray-600">
                            {activity.date} at {activity.time}
                            {activity.location && ` • ${activity.location}`}
                          </p>
                          {activity.notes && (
                            <p className="text-xs text-gray-500 mt-1">{activity.notes}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'calendar' && (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <EmployeeAttendanceCalendar 
                employeeId={employeeId}
                showEmployeeInfo={false}
                allowEdit={true}
              />
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics Dashboard</h3>
                <p className="text-gray-600">
                  Detailed analytics and insights will be displayed here.
                  This includes attendance patterns, productivity trends, and AI-powered recommendations.
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === 'reports' && (
            <motion.div
              key="reports"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
                <PieChart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Reports & Export</h3>
                <p className="text-gray-600">
                  Generate and export detailed attendance reports for different time periods.
                  Custom reports and data export functionality will be available here.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
