/**
 * AI Hub Layout
 * =============
 * 
 * Layout wrapper for the AI Hub with:
 * - Navigation between different AI Hub sections
 * - Super admin access control
 * - Consistent styling and branding
 * - Real-time status indicators
 */

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Brain,
  Shield,
  BarChart3,
  Activity,
  Settings,
  User,
  LogOut,
  Menu,
  X,
  Home,
  Bell,
  RefreshCw
} from 'lucide-react';
import { useRBAC } from '../../contexts/RBACContext';

interface AIHubLayoutProps {
  children: React.ReactNode;
  currentPage?: string;
}

interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  description: string;
}

const AIHubLayout: React.FC<AIHubLayoutProps> = ({ children, currentPage = 'dashboard' }) => {
  const router = useRouter();
  const { state, logout } = useRBAC();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(3); // Mock notification count

  // Navigation items
  const navigationItems: NavigationItem[] = [
    {
      id: 'dashboard',
      label: 'AI Hub Dashboard',
      href: '/admin/ai-hub',
      icon: <Brain className="w-5 h-5" />,
      description: 'Main AI Hub overview with system status and insights'
    },
    {
      id: 'security-center',
      label: 'AI Security Center',
      href: '/admin/ai-hub/security-center',
      icon: <Shield className="w-5 h-5" />,
      description: 'Real-time security monitoring and threat detection'
    },
    {
      id: 'analytics',
      label: 'Predictive Analytics',
      href: '/admin/ai-hub/analytics',
      icon: <BarChart3 className="w-5 h-5" />,
      description: 'AI-powered forecasting and trend analysis'
    },
    {
      id: 'monitoring',
      label: 'Real-time Monitoring',
      href: '/admin/ai-hub/monitoring',
      icon: <Activity className="w-5 h-5" />,
      description: 'Live system performance and activity monitoring'
    },
    {
      id: 'settings',
      label: 'AI Hub Settings',
      href: '/admin/ai-hub/settings',
      icon: <Settings className="w-5 h-5" />,
      description: 'Configure AI Hub parameters and preferences'
    }
  ];

  // Check if user has super admin access
  const hasAIHubAccess = () => {
    return state.user?.isSuperuser || state.user?.roles?.some(role => 
      role.roleName === 'Super_Admin' || role.roleName === 'AI_Hub_Admin'
    );
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  // Access denied component
  if (!hasAIHubAccess()) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-4">You don't have permission to access the AI Hub.</p>
          <p className="text-sm text-gray-500">Super Admin access is required.</p>
          <button
            onClick={() => router.back()}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side */}
            <div className="flex items-center">
              {/* Mobile menu button */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                {sidebarOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>

              {/* Logo and Title */}
              <div className="flex items-center ml-4 lg:ml-0">
                <Brain className="h-8 w-8 text-purple-600" />
                <div className="ml-3">
                  <h1 className="text-xl font-bold text-gray-900">REJLERS AI Hub</h1>
                  <p className="text-xs text-gray-500">Super Admin Console</p>
                </div>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-gray-500">
                <Bell className="h-6 w-6" />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
                )}
              </button>

              {/* Refresh Status */}
              <div className="flex items-center text-sm text-gray-500">
                <RefreshCw className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Live</span>
              </div>

              {/* User Menu */}
              <div className="relative flex items-center">
                <div className="flex items-center space-x-3">
                  <div className="text-right hidden sm:block">
                    <div className="text-sm font-medium text-gray-900">
                      {state.user?.firstName} {state.user?.lastName}
                    </div>
                    <div className="text-xs text-gray-500">Super Admin</div>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <User className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="ml-4 p-2 text-gray-400 hover:text-gray-500"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full pt-16"> {/* pt-16 to account for top nav */}
          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {/* Back to Main Dashboard */}
            <Link
              href="/dashboard"
              className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Home className="w-5 h-5 mr-3" />
              Back to Main Dashboard
            </Link>

            <div className="border-t border-gray-200 my-4"></div>

            {/* AI Hub Navigation */}
            {navigationItems.map((item) => {
              const isActive = 
                (item.id === 'dashboard' && currentPage === 'dashboard') ||
                (item.id !== 'dashboard' && router.pathname.includes(item.id));

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex items-start px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-purple-50 text-purple-700 border-l-4 border-purple-500'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <div className="mr-3 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-gray-500 mt-1">{item.description}</div>
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Bottom Status */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="text-xs text-gray-500">
              <div className="flex items-center justify-between mb-2">
                <span>System Status</span>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                  <span>Operational</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>AI Services</span>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                  <span>Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-0' : 'lg:ml-64'} pt-16`}>
        <div className="min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AIHubLayout;