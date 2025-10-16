'use client';

import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Shield, 
  Package, 
  FileText,
  AlertTriangle,
  Activity,
  BarChart3,
  Settings
} from 'lucide-react';
import { authService } from '@/lib/auth';
import { businessModuleService, DashboardStats, RecentActivity } from '@/lib/businessModules';
import MockAuthSetup from '@/components/dev/MockAuthSetup';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        if (!authService.isAuthenticated()) {
          window.location.href = '/login';
          return;
        }

        const userInfo = authService.getUserData();
        if (!userInfo) {
          const fetchedUser = await authService.getCurrentUser();
          if (!fetchedUser) {
            throw new Error('Unable to fetch user data');
          }
          setUser(fetchedUser);
        } else {
          setUser(userInfo);
        }

        const [dashboardStats, recentActivities] = await Promise.all([
          businessModuleService.getDashboardStats(),
          businessModuleService.getRecentActivities(),
        ]);

        setStats(dashboardStats);
        setActivities(recentActivities);
      } catch (err) {
        console.error('Error initializing dashboard:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    initializeDashboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
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
    <div className="p-4 lg:p-6 bg-slate-50 min-h-full">
      <div className="mb-6 lg:mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-xl lg:text-2xl font-bold text-slate-900 mb-2">
              Welcome back, {user?.first_name || user?.username || 'User'}!
            </h2>
            <p className="text-sm lg:text-base text-slate-600">
              {user?.is_superuser 
                ? "System Administrator - You have full access to all system features and controls."
                : user?.is_staff
                ? "Administrator - You have elevated access to manage the organization."
                : "Here's what's happening in your organization today."
              }
            </p>
          </div>
          {(user?.is_superuser || user?.is_staff) && (
            <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg border border-purple-200">
              <Shield className="w-4 lg:w-5 h-4 lg:h-5 text-purple-600" />
              <span className="text-xs lg:text-sm font-medium text-purple-700">
                {user?.is_superuser ? 'Super Admin' : 'Administrator'}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-slate-600">Projects</span>
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-slate-900">{stats?.projects?.total || '47'}</p>
            <p className="text-sm text-slate-500">Active projects</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm font-medium text-slate-600">Revenue</span>
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-slate-900">€{stats?.sales?.totalRevenue ? (stats.sales.totalRevenue / 1000000).toFixed(1) + 'M' : '2.4M'}</p>
            <p className="text-sm text-green-600">+12.5% from last month</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-slate-600">Team</span>
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-slate-900">{stats?.hr?.totalEmployees || '156'}</p>
            <p className="text-sm text-slate-500">Active employees</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-slate-600">Growth</span>
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-slate-900">18.2%</p>
            <p className="text-sm text-green-600">Year over year</p>
          </div>
        </div>
      </div>

      {user?.is_superuser && (
        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-purple-600" />
              <h3 className="text-lg font-semibold text-purple-900">Super Administrator Controls</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between mb-2">
                  <Activity className="w-5 h-5 text-green-600" />
                  <span className="text-xs font-medium text-slate-600">SYSTEM</span>
                </div>
                <div className="text-xl font-bold text-slate-900">98.5%</div>
                <div className="text-xs text-slate-600">System Health</div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between mb-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="text-xs font-medium text-slate-600">USERS</span>
                </div>
                <div className="text-xl font-bold text-slate-900">247</div>
                <div className="text-xs text-slate-600">Total Users</div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <span className="text-xs font-medium text-slate-600">SECURITY</span>
                </div>
                <div className="text-xl font-bold text-slate-900">3</div>
                <div className="text-xs text-slate-600">Alerts</div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between mb-2">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  <span className="text-xs font-medium text-slate-600">UPTIME</span>
                </div>
                <div className="text-xl font-bold text-slate-900">99.9%</div>
                <div className="text-xs text-slate-600">Server Uptime</div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-purple-900 mb-3">Quick Actions</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button className="flex items-center gap-2 px-3 py-2 bg-white hover:bg-purple-50 border border-purple-200 rounded-lg text-sm font-medium text-purple-700 transition-colors">
                  <Users className="w-4 h-4" />
                  Manage Users
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-white hover:bg-purple-50 border border-purple-200 rounded-lg text-sm font-medium text-purple-700 transition-colors">
                  <Settings className="w-4 h-4" />
                  System Config
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-white hover:bg-purple-50 border border-purple-200 rounded-lg text-sm font-medium text-purple-700 transition-colors">
                  <FileText className="w-4 h-4" />
                  View Logs
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-white hover:bg-purple-50 border border-purple-200 rounded-lg text-sm font-medium text-purple-700 transition-colors">
                  <BarChart3 className="w-4 h-4" />
                  Analytics
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {process.env.NODE_ENV === 'development' && <MockAuthSetup />}
    </div>
  );
};

export default Dashboard;
