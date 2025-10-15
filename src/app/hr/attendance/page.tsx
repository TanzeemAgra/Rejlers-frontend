'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Calendar, 
  BarChart3,
  Users,
  ChevronRight,
  User,
  Target,
  Award,
  Timer,
  Bell,
  Settings,
  CheckCircle,
  ChevronLeft
} from 'lucide-react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import ClockActions from '@/components/attendance/ClockActions';
import AIInsightsCard from '@/components/attendance/AIInsightsCard';
import AttendanceAnalytics from '@/components/attendance/AttendanceAnalytics';
import AttendanceCalendar from '@/components/attendance/AttendanceCalendar';
import { AttendanceRecord } from '@/lib/attendanceApi';

interface AttendanceFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  href?: string;
  color: string;
  bgColor: string;
  component?: React.ComponentType<any>;
}

const AttendanceTrackingPage = () => {
  const [selectedView, setSelectedView] = useState<string>('overview');
  const [todayRecord, setTodayRecord] = useState<AttendanceRecord | null>(null);
  
  const mockTodayRecord: AttendanceRecord = {
    id: 1,
    date: new Date().toISOString().split('T')[0],
    clock_in: '09:15:00',
    status: 'PRESENT',
    work_mode: 'OFFICE',
    actual_hours: 7.5,
    overtime_hours: 0,
    location_verified: true,
    ai_confidence_score: 92.5,
    pattern_deviation_score: 88.3,
    productivity_score: 94.1,
    is_anomaly: false,
    anomaly_reasons: []
  };

  const handleRecordUpdate = (record: AttendanceRecord) => {
    setTodayRecord(record);
  };

  const attendanceFeatures: AttendanceFeature[] = [
    {
      id: 'quick-actions',
      title: 'Quick Clock Actions',
      description: 'Clock in/out, manage breaks, and track work modes with AI-powered insights',
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 border-blue-200',
      component: ClockActions
    },
    {
      id: 'employee-dashboard',
      title: 'Employee Dashboard',
      description: 'Individual employee calendar view with monthly attendance tracking like ADP SecurTime',
      icon: User,
      href: '/hr/attendance/employee',
      color: 'text-green-600',
      bgColor: 'bg-green-50 border-green-200'
    },
    {
      id: 'calendar',
      title: 'Attendance Calendar',
      description: 'Interactive monthly calendar with attendance visualization and detailed day views',
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 border-purple-200',
      component: AttendanceCalendar
    },
    {
      id: 'analytics',
      title: 'Analytics Dashboard',
      description: 'Comprehensive attendance analytics with charts, trends, and AI-powered insights',
      icon: BarChart3,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50 border-indigo-200',
      component: AttendanceAnalytics
    },
    {
      id: 'team-management',
      title: 'Team Management',
      description: 'HR manager dashboard for monitoring team attendance with AI insights and anomaly detection',
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 border-orange-200'
    },
    {
      id: 'ai-insights',
      title: 'AI Insights',
      description: 'Advanced AI-powered attendance pattern analysis and personalized recommendations',
      icon: Target,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50 border-pink-200',
      component: AIInsightsCard
    }
  ];

  const formatCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour12: true, 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const renderSelectedComponent = () => {
    const feature = attendanceFeatures.find(f => f.id === selectedView);
    if (!feature || !feature.component) return null;

    const Component = feature.component;
    
    if (selectedView === 'quick-actions') {
      return (
        <Component 
          todayRecord={todayRecord || mockTodayRecord}
          onRecordUpdate={handleRecordUpdate}
        />
      );
    } else if (selectedView === 'ai-insights') {
      return (
        <Component 
          insights={{
            overall_score: 91.2,
            confidence_level: 'High' as const,
            pattern_status: 'Normal' as const,
            productivity_level: 'Excellent' as const,
            recommendations: [
              'Great consistency this month!',
              'Consider setting earlier alarm for better punctuality',
              'Your remote work productivity is excellent'
            ],
            trends: {
              attendance: 'improving' as const,
              punctuality: 'improving' as const,
              productivity: 'improving' as const
            }
          }}
        />
      );
    } else {
      return <Component />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <DashboardSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Clock className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-slate-900">AI-Powered Attendance System</h1>
                <p className="text-slate-600 mt-1">
                  Complete attendance management with enterprise-grade features and AI insights
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="text-3xl font-bold text-slate-900">{formatCurrentTime()}</div>
                <div className="text-sm text-slate-600">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Bell className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Settings className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 p-6">
          {selectedView === 'overview' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Current Status</p>
                      <p className="text-2xl font-bold text-green-700">Present</p>
                      <p className="text-sm text-gray-500 mt-1">Clocked in at 9:15 AM</p>
                    </div>
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Hours Today</p>
                      <p className="text-2xl font-bold text-blue-700">7.5h</p>
                      <p className="text-sm text-gray-500 mt-1">Standard shift</p>
                    </div>
                    <Timer className="w-10 h-10 text-blue-600" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">This Month</p>
                      <p className="text-2xl font-bold text-purple-700">92.5%</p>
                      <p className="text-sm text-gray-500 mt-1">Attendance rate</p>
                    </div>
                    <Target className="w-10 h-10 text-purple-600" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">AI Score</p>
                      <p className="text-2xl font-bold text-indigo-700">91.2</p>
                      <p className="text-sm text-gray-500 mt-1">High confidence</p>
                    </div>
                    <Award className="w-10 h-10 text-indigo-600" />
                  </div>
                </div>
              </div>

              {/* Feature Grid */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Attendance Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {attendanceFeatures.map((feature, index) => {
                    const IconComponent = feature.icon;
                    return (
                      <motion.div
                        key={feature.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`${feature.bgColor} p-6 rounded-xl border-2 hover:shadow-lg transition-all duration-300 cursor-pointer group`}
                        onClick={() => {
                          if (feature.href) {
                            window.open(feature.href, '_blank');
                          } else if (feature.component) {
                            setSelectedView(feature.id);
                          }
                        }}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className={`p-3 rounded-lg bg-white shadow-sm ${feature.color}`}>
                            <IconComponent className="w-8 h-8" />
                          </div>
                          {feature.href ? (
                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                          ) : (
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          )}
                        </div>
                        
                        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {feature.description}
                        </p>

                        {feature.href && (
                          <div className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors">
                            Open Dashboard
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={selectedView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Back Button */}
              <button
                onClick={() => setSelectedView('overview')}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors mb-6"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back to Overview</span>
              </button>

              {/* Component Render */}
              {renderSelectedComponent()}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceTrackingPage;
