/**
 * HR Dashboard Layout
 * ===================
 * 
 * Layout wrapper for HR modules with:
 * - Navigation between different HR sections
 * - Role-based access control
 * - Consistent styling and branding
 * - Real-time status indicators
 */

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Users,
  Brain,
  BarChart3,
  Calendar,
  Clock,
  DollarSign,
  FileText,
  Settings,
  User,
  LogOut,
  Menu,
  X,
  Home,
  Bell,
  RefreshCw,
  Target,
  Award,
  BookOpen,
  Heart,
  Shield
} from 'lucide-react';

interface HRLayoutProps {
  children: React.ReactNode;
  currentPage?: string;
}

interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  description: string;
  badge?: string;
}

const HRLayout: React.FC<HRLayoutProps> = ({ children, currentPage = 'dashboard' }) => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(5); // Mock notification count

  // Navigation items for HR modules
  const navigationItems: NavigationItem[] = [
    {
      id: 'dashboard',
      label: 'HR Dashboard',
      href: '/hr/ai-dashboard',
      icon: <Brain className="w-5 h-5" />,
      description: 'AI-powered HR analytics and insights dashboard'
    },
    {
      id: 'employees',
      label: 'Employee Management',
      href: '/hr/employees',
      icon: <Users className="w-5 h-5" />,
      description: 'Manage employee profiles and information'
    },
    {
      id: 'recruitment',
      label: 'Recruitment',
      href: '/hr/recruitment',
      icon: <Target className="w-5 h-5" />,
      description: 'Manage job postings and candidate pipeline',
      badge: '3'
    },
    {
      id: 'performance',
      label: 'Performance',
      href: '/hr/performance',
      icon: <Award className="w-5 h-5" />,
      description: 'Employee performance tracking and reviews'
    },
    {
      id: 'attendance',
      label: 'Attendance',
      href: '/hr/attendance',
      icon: <Clock className="w-5 h-5" />,
      description: 'Time tracking and attendance management'
    },
    {
      id: 'payroll',
      label: 'Payroll',
      href: '/hr/payroll',
      icon: <DollarSign className="w-5 h-5" />,
      description: 'Salary processing and compensation management'
    },
    {
      id: 'training',
      label: 'Training & Development',
      href: '/hr/training',
      icon: <BookOpen className="w-5 h-5" />,
      description: 'Employee learning and development programs'
    },
    {
      id: 'wellness',
      label: 'Employee Wellness',
      href: '/hr/wellness',
      icon: <Heart className="w-5 h-5" />,
      description: 'Health and wellness programs'
    },
    {
      id: 'reports',
      label: 'Reports & Analytics',
      href: '/hr/reports',
      icon: <BarChart3 className="w-5 h-5" />,
      description: 'HR metrics and detailed reporting'
    },
    {
      id: 'settings',
      label: 'HR Settings',
      href: '/hr/settings',
      icon: <Settings className="w-5 h-5" />,
      description: 'Configure HR module settings'
    }
  ];

  // Mock user data - in real app this would come from auth context
  const user = {
    name: 'HR Manager',
    role: 'HR_Manager',
    email: 'hr.manager@rejlers.se',
    avatar: null
  };

  // Handle logout
  const handleLogout = () => {
    // In real app, this would call logout from auth context
    router.push('/login');
  };

  // Get current navigation item
  const currentItem = navigationItems.find(item => item.id === currentPage);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex flex-col h-full">
          {/* Logo and Title */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">HR Suite</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Human Resources</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigationItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-r-2 border-blue-500'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  <span className="ml-3 flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="flex-shrink-0 p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </div>
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user.email}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="ml-2 p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="ml-4 lg:ml-0">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {currentItem?.label || 'HR Dashboard'}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {currentItem?.description || 'Human Resources Management System'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="relative p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                    {notifications}
                  </span>
                )}
              </button>
              <button className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                <RefreshCw className="w-5 h-5" />
              </button>
              <Link
                href="/"
                className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                title="Back to Home"
              >
                <Home className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          {children}
        </main>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default HRLayout;