'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { Users, Calendar, Clock, Building2, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

const HRDashboard = () => {
  const router = useRouter();

  const navigateToEmployees = () => {
    router.push('/hr/employees');
  };

  const navigateToAttendance = () => {
    router.push('/hr/attendance');
  };

  const stats = [
    {
      title: 'Total Employees',
      value: '89',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      change: '+2 this month'
    },
    {
      title: 'Present Today',
      value: '76',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: '85.4% attendance'
    },
    {
      title: 'On Leave',
      value: '8',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      change: '3 pending requests'
    },
    {
      title: 'Late Arrivals',
      value: '5',
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      change: 'Today'
    }
  ];

  const quickActions = [
    {
      title: 'Employee Management',
      description: 'View and manage employee records, profiles, and HR operations',
      icon: Users,
      color: 'bg-purple-600 hover:bg-purple-700',
      onClick: navigateToEmployees
    },
    {
      title: 'Attendance Tracking',
      description: 'AI-powered attendance system with real-time tracking and analytics',
      icon: Clock,
      color: 'bg-blue-600 hover:bg-blue-700',
      onClick: navigateToAttendance
    }
  ];

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
              <Building2 className="w-8 h-8 text-purple-600" />
              <div>
                <h1 className="text-2xl font-bold text-slate-900">HR Management</h1>
                <p className="text-slate-600">Human Resources Dashboard and Operations</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                      <IconComponent className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</p>
                    <p className="text-sm font-medium text-slate-600 mb-2">{stat.title}</p>
                    <p className="text-xs text-slate-500">{stat.change}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {quickActions.map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center text-white`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">{action.title}</h3>
                        <p className="text-slate-600 mb-4">{action.description}</p>
                        <button
                          onClick={action.onClick}
                          className={`${action.color} text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2`}
                        >
                          <span>Open</span>
                          <IconComponent className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">Recent Activity</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">Sarah Johnson clocked in</p>
                    <p className="text-xs text-slate-500">2 minutes ago • Engineering Department</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">New leave request submitted</p>
                    <p className="text-xs text-slate-500">15 minutes ago • Michael Chen</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">Late arrival detected</p>
                    <p className="text-xs text-slate-500">1 hour ago • Emily Rodriguez</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <Users className="w-5 h-5 text-purple-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">New employee onboarded</p>
                    <p className="text-xs text-slate-500">2 hours ago • David Kim</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRDashboard;
