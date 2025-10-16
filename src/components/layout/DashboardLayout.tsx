/**
 * Main Dashboard Layout
 * ====================
 * 
 * Comprehensive layout for the main dashboard with:
 * - Top navigation with module dropdowns
 * - HR module dropdown integration
 * - Responsive design
 * - User profile and notifications
 * - Search functionality
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  // Main Navigation Icons
  Home,
  Users,
  Building2,
  DollarSign,
  FileText,
  Package,
  BarChart3,
  Settings,
  Shield,
  Zap,
  
  // HR Module Icons
  Brain,
  Target,
  Award,
  Clock,
  BookOpen,
  Heart,
  Calendar,
  UserCheck,
  
  // UI Icons
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  LogOut,
  User,
  Sun,
  Moon
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentModule?: string;
}

interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
  description?: string;
}

interface NavigationModule {
  id: string;
  label: string;
  icon: React.ReactNode;
  items?: NavigationItem[]; // Optional for modules without dropdowns
  href?: string; // For modules without dropdowns
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, currentModule = 'dashboard' }) => {
  const router = useRouter();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(5);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Navigation modules configuration
  const navigationModules: NavigationModule[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <Home className="w-5 h-5" />,
      href: '/dashboard'
    },
    {
      id: 'hr',
      label: 'Human Resources',
      icon: <Users className="w-5 h-5" />,
      items: [
        {
          id: 'hr-dashboard',
          label: 'HR Dashboard',
          href: '/hr/ai-dashboard',
          icon: <Brain className="w-4 h-4" />,
          description: 'AI-powered HR analytics and insights'
        },
        {
          id: 'employees',
          label: 'Employee Management',
          href: '/hr/employees',
          icon: <UserCheck className="w-4 h-4" />,
          description: 'Manage employee profiles'
        },
        {
          id: 'recruitment',
          label: 'Recruitment',
          href: '/hr/recruitment',
          icon: <Target className="w-4 h-4" />,
          description: 'Job postings and candidates',
          badge: '3'
        },
        {
          id: 'performance',
          label: 'Performance',
          href: '/hr/performance',
          icon: <Award className="w-4 h-4" />,
          description: 'Performance reviews and tracking'
        },
        {
          id: 'attendance',
          label: 'Attendance',
          href: '/hr/attendance',
          icon: <Clock className="w-4 h-4" />,
          description: 'Time tracking and attendance'
        },
        {
          id: 'training',
          label: 'Training & Development',
          href: '/hr/training',
          icon: <BookOpen className="w-4 h-4" />,
          description: 'Learning programs'
        },
        {
          id: 'wellness',
          label: 'Employee Wellness',
          href: '/hr/wellness',
          icon: <Heart className="w-4 h-4" />,
          description: 'Health and wellness'
        }
      ]
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: <Building2 className="w-5 h-5" />,
      items: [
        {
          id: 'project-overview',
          label: 'Project Overview',
          href: '/projects',
          icon: <Building2 className="w-4 h-4" />,
          description: 'All active projects'
        },
        {
          id: 'project-planning',
          label: 'Project Planning',
          href: '/projects/planning',
          icon: <Calendar className="w-4 h-4" />,
          description: 'Plan and schedule projects'
        }
      ]
    },
    {
      id: 'finance',
      label: 'Finance',
      icon: <DollarSign className="w-5 h-5" />,
      items: [
        {
          id: 'finance-dashboard',
          label: 'Finance Dashboard',
          href: '/finance',
          icon: <BarChart3 className="w-4 h-4" />,
          description: 'Financial overview and metrics'
        },
        {
          id: 'invoicing',
          label: 'Invoicing',
          href: '/finance/invoicing',
          icon: <FileText className="w-4 h-4" />,
          description: 'Create and manage invoices'
        }
      ]
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: <BarChart3 className="w-5 h-5" />,
      href: '/reports'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="w-5 h-5" />,
      href: '/settings'
    }
  ];

  // Mock user data
  const user = {
    name: 'John Anderson',
    email: 'john.anderson@rejlers.se',
    role: 'Project Manager',
    avatar: null
  };

  // Handle dropdown toggle
  const toggleDropdown = (moduleId: string) => {
    setActiveDropdown(activeDropdown === moduleId ? null : moduleId);
  };

  // Handle clicks outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle logout
  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Top Navigation Bar */}
        <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              {/* Left side - Logo and Navigation */}
              <div className="flex items-center">
                {/* Logo */}
                <div className="flex-shrink-0 flex items-center">
                  <Link href="/dashboard" className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                      <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">REJLERS</span>
                  </Link>
                </div>

                {/* Main Navigation - Desktop */}
                <div className="hidden md:ml-8 md:flex md:space-x-1" ref={dropdownRef}>
                  {navigationModules.map((module) => (
                    <div key={module.id} className="relative">
                      {module.href ? (
                        // Simple link for modules without dropdowns
                        <Link
                          href={module.href}
                          className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                            currentModule === module.id
                              ? 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20'
                              : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                        >
                          {module.icon}
                          <span className="ml-2">{module.label}</span>
                        </Link>
                      ) : (
                        // Dropdown for modules with sub-items
                        <>
                          <button
                            onClick={() => toggleDropdown(module.id)}
                            className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                              currentModule === module.id
                                ? 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20'
                                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                          >
                            {module.icon}
                            <span className="ml-2">{module.label}</span>
                            <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-150 ${
                              activeDropdown === module.id ? 'rotate-180' : ''
                            }`} />
                          </button>

                          {/* Dropdown Menu */}
                          {activeDropdown === module.id && (
                            <div className="absolute top-full left-0 mt-1 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                              <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-700">
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{module.label}</h3>
                              </div>
                              {module.items?.map((item) => (
                                <Link
                                  key={item.id}
                                  href={item.href}
                                  className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors duration-150"
                                  onClick={() => setActiveDropdown(null)}
                                >
                                  <div className="flex-shrink-0 mr-3">
                                    {item.icon}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center">
                                      <span className="font-medium">{item.label}</span>
                                      {item.badge && (
                                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                                          {item.badge}
                                        </span>
                                      )}
                                    </div>
                                    {item.description && (
                                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.description}</p>
                                    )}
                                  </div>
                                </Link>
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right side - Search, Notifications, User Menu */}
              <div className="flex items-center space-x-3">
                {/* Search */}
                <div className="hidden lg:block">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Notifications */}
                <button className="relative p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-150">
                  <Bell className="w-5 h-5" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                      {notifications}
                    </span>
                  )}
                </button>

                {/* Dark Mode Toggle */}
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-150"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                {/* User Menu */}
                <div className="relative">
                  <button className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                    <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{user.role}</p>
                    </div>
                  </button>
                </div>

                {/* Mobile menu button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigationModules.map((module) => (
                  <div key={module.id}>
                    {module.href ? (
                      <Link
                        href={module.href}
                        className="flex items-center px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {module.icon}
                        <span className="ml-3">{module.label}</span>
                      </Link>
                    ) : (
                      <>
                        <div className="px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white">
                          {module.label}
                        </div>
                        {module.items?.map((item) => (
                          <Link
                            key={item.id}
                            href={item.href}
                            className="flex items-center px-6 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {item.icon}
                            <span className="ml-3">{item.label}</span>
                            {item.badge && (
                              <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        ))}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;