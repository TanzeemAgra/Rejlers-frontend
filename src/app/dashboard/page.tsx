'use client';

import React, { useState, useEffect } from 'react';
import { 
  User, 
  Building2, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Shield, 
  Package, 
  FileText,
  AlertTriangle,
  Activity,
  Calendar,
  BarChart3,
  PieChart,
  Settings,
  Bell,
  Menu
} from 'lucide-react';
import { authService } from '@/lib/auth';
import { businessModuleService, DashboardStats, RecentActivity } from '@/lib/businessModules';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import Logo from '@/components/ui/Logo';
import MockAuthSetup from '@/components/dev/MockAuthSetup';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        // Check if user is authenticated and get stored user data
        if (!authService.isAuthenticated()) {
          window.location.href = '/login';
          return;
        }

        const userInfo = authService.getUserData();
        if (!userInfo) {
          // If no stored user data, try to fetch it
          const fetchedUser = await authService.getCurrentUser();
          if (!fetchedUser) {
            window.location.href = '/login';
            return;
          }
          setUser(fetchedUser);
        } else {
          setUser(userInfo);
        }

        // Fetch dashboard data
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

  const handleLogout = async () => {
    await authService.logout();
    window.location.href = '/login';
  };

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
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <DashboardSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm border p-1">
                  <Logo context="dashboard" priority={true} />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900">REJLERS Dashboard</h1>
                  <p className="text-sm text-slate-600">Enterprise Management Portal</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg">
                <Settings className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-2 px-3 py-2 bg-slate-100 rounded-lg">
                <User className="w-4 h-4 text-slate-600" />
                <span className="text-sm font-medium text-slate-900">
                  {user?.username || user?.email || 'User'}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <div className="flex-1 p-6 overflow-auto">
          {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
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
            {(user?.is_superuser || user?.is_staff) && (
              <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg border border-purple-200">
                <Shield className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-700">
                  {user?.is_superuser ? 'Super Admin' : 'Administrator'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {/* Projects Stats */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-slate-600">Projects</span>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-slate-900">{stats?.projects.total || 0}</div>
              <div className="text-sm text-slate-600">
                {stats?.projects.active || 0} active • {stats?.projects.completed || 0} completed
              </div>
            </div>
          </div>

          {/* Finance Stats */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm font-medium text-slate-600">Finance</span>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-slate-900">
                ${(stats?.finance.totalBudget || 0).toLocaleString()}
              </div>
              <div className="text-sm text-slate-600">
                ${(stats?.finance.spent || 0).toLocaleString()} spent • {stats?.finance.pendingInvoices || 0} pending
              </div>
            </div>
          </div>

          {/* HR Stats */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-slate-600">Human Resources</span>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-slate-900">{stats?.hr.totalEmployees || 0}</div>
              <div className="text-sm text-slate-600">
                {stats?.hr.activeEmployees || 0} active • {stats?.hr.pendingTimeOff || 0} requests
              </div>
            </div>
          </div>

          {/* Sales Stats */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-orange-600" />
              </div>
              <span className="text-sm font-medium text-slate-600">Sales</span>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-slate-900">
                ${(stats?.sales.totalRevenue || 0).toLocaleString()}
              </div>
              <div className="text-sm text-slate-600">
                {stats?.sales.totalLeads || 0} leads • {stats?.sales.activeOpportunities || 0} opportunities
              </div>
            </div>
          </div>

          {/* HSE Stats */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-red-600" />
              </div>
              <span className="text-sm font-medium text-slate-600">HSE Compliance</span>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-slate-900">{stats?.hse.complianceScore || 0}%</div>
              <div className="text-sm text-slate-600">
                {stats?.hse.activeIncidents || 0} incidents • {stats?.hse.assessmentsDue || 0} assessments due
              </div>
            </div>
          </div>

          {/* Supply Chain Stats */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="text-sm font-medium text-slate-600">Supply Chain</span>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-slate-900">{stats?.supply.totalVendors || 0}</div>
              <div className="text-sm text-slate-600">
                {stats?.supply.activeOrders || 0} orders • {stats?.supply.lowStockItems || 0} low stock
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Recent Activities</h3>
                <Activity className="w-5 h-5 text-slate-400" />
              </div>
            </div>
            <div className="p-6">
              {activities.length > 0 ? (
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 pb-4 border-b border-slate-100 last:border-0">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.priority === 'critical' ? 'bg-red-500' :
                        activity.priority === 'high' ? 'bg-orange-500' :
                        activity.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900">{activity.title}</p>
                        <p className="text-sm text-slate-600">{activity.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-slate-500">
                          <span>{activity.user}</span>
                          <span>{new Date(activity.timestamp).toLocaleString()}</span>
                          <span className="capitalize">{activity.type}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Activity className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">No recent activities</p>
                </div>
              )}
            </div>
          </div>

          </div>

        {/* Super Admin Section */}
        {user?.is_superuser && (
          <div className="mb-8">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-purple-900">Super Administrator Controls</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* System Health */}
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between mb-2">
                    <Activity className="w-5 h-5 text-green-600" />
                    <span className="text-xs font-medium text-slate-600">SYSTEM</span>
                  </div>
                  <div className="text-xl font-bold text-slate-900">98.5%</div>
                  <div className="text-xs text-slate-600">System Health</div>
                </div>

                {/* Total Users */}
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between mb-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span className="text-xs font-medium text-slate-600">USERS</span>
                  </div>
                  <div className="text-xl font-bold text-slate-900">247</div>
                  <div className="text-xs text-slate-600">Total Users</div>
                </div>

                {/* Security Alerts */}
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <span className="text-xs font-medium text-slate-600">SECURITY</span>
                  </div>
                  <div className="text-xl font-bold text-slate-900">3</div>
                  <div className="text-xs text-slate-600">Alerts</div>
                </div>

                {/* Server Uptime */}
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between mb-2">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                    <span className="text-xs font-medium text-slate-600">UPTIME</span>
                  </div>
                  <div className="text-xl font-bold text-slate-900">99.9%</div>
                  <div className="text-xs text-slate-600">Server Uptime</div>
                </div>
              </div>

              {/* Super Admin Quick Actions */}
              <div className="mt-6">
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

        {/* Admin Section */}
        {user?.is_staff && !user?.is_superuser && (
          <div className="mb-8">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-900">Administrator Controls</h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button className="flex items-center gap-2 px-3 py-2 bg-white hover:bg-blue-50 border border-blue-200 rounded-lg text-sm font-medium text-blue-700 transition-colors">
                  <Users className="w-4 h-4" />
                  Team Management
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-white hover:bg-blue-50 border border-blue-200 rounded-lg text-sm font-medium text-blue-700 transition-colors">
                  <FileText className="w-4 h-4" />
                  Reports
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-white hover:bg-blue-50 border border-blue-200 rounded-lg text-sm font-medium text-blue-700 transition-colors">
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-white hover:bg-blue-50 border border-blue-200 rounded-lg text-sm font-medium text-blue-700 transition-colors">
                  <BarChart3 className="w-4 h-4" />
                  Analytics
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-slate-900">Quick Actions</h3>
            </div>
            <div className="p-6 space-y-3">
              <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-slate-50 rounded-lg">
                <Building2 className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-slate-900">New Project</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-slate-50 rounded-lg">
                <Users className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-slate-900">Add Employee</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-slate-50 rounded-lg">
                <FileText className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-slate-900">Create Invoice</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-slate-50 rounded-lg">
                <Shield className="w-5 h-5 text-red-600" />
                <span className="text-sm font-medium text-slate-900">HSE Report</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-slate-50 rounded-lg">
                <Package className="w-5 h-5 text-indigo-600" />
                <span className="text-sm font-medium text-slate-900">Purchase Order</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-slate-50 rounded-lg">
                <BarChart3 className="w-5 h-5 text-orange-600" />
                <span className="text-sm font-medium text-slate-900">Generate Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-slate-900">System Status</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-slate-600">All Systems Operational</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-slate-600">Database Connected</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-slate-600">API Services Active</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-slate-600">Backup in Progress</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Development Authentication Setup */}
      {process.env.NODE_ENV === 'development' && <MockAuthSetup />}
    </div>
  );
};

export default Dashboard;