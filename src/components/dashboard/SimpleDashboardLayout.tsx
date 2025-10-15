/**
 * Simplified Dashboard Layout - Temporary Fix for Build Issues
 * This is a minimal version to resolve the useAuth compilation error
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bars3Icon, 
  XMarkIcon,
  UserCircleIcon,
  BellIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

import { useAuth } from '../../hooks/useAuth';
import { useAI } from '../../hooks/useAI';
import { useRealTime } from '../../hooks/useRealTime';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const SimpleDashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentModule, setCurrentModule] = useState('dashboard');

  // Custom Hooks - Now properly imported
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const { generateInsight, isProcessing } = useAI();
  const { metrics, isConnected, connectionStatus } = useRealTime();

  // Handle user loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading dashboard...</span>
      </div>
    );
  }

  // Handle unauthenticated state
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">Please log in to access the dashboard.</p>
          <a 
            href="/login" 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <h1 className="ml-4 text-xl font-semibold text-gray-900">
              Rejlers Dashboard
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Notifications */}
            <button className="p-2 rounded-md text-gray-600 hover:bg-gray-100 relative">
              <BellIcon className="h-6 w-6" />
              {isConnected && (
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full"></span>
              )}
            </button>

            {/* User Menu */}
            <div className="flex items-center space-x-2">
              <UserCircleIcon className="h-8 w-8 text-gray-600" />
              <div className="text-sm">
                <p className="font-medium text-gray-900">
                  {user?.first_name} {user?.last_name}
                </p>
                <p className="text-gray-500">{user?.role || 'User'}</p>
              </div>
              <button
                onClick={logout}
                className="ml-2 text-sm text-red-600 hover:text-red-800"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        className="fixed inset-y-0 left-0 z-50 w-70 bg-white shadow-xl border-r border-gray-200"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Navigation</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 rounded-md text-gray-600 hover:bg-gray-100"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-4">
          <div className="px-2 space-y-1">
            {['Dashboard', 'Projects', 'Contacts', 'Reports', 'Settings'].map((item) => (
              <button
                key={item}
                onClick={() => {
                  setCurrentModule(item.toLowerCase());
                  setSidebarOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                  currentModule === item.toLowerCase()
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </nav>
      </motion.div>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${sidebarOpen ? 'ml-70' : 'ml-0'}`}>
        <div className="p-6">
          {/* Status Bar */}
          <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <span className={`h-2 w-2 rounded-full mr-2 ${
                    isConnected ? 'bg-green-500' : 'bg-red-500'
                  }`}></span>
                  <span className="text-sm text-gray-600">
                    Status: {connectionStatus}
                  </span>
                </div>
                {metrics && (
                  <div className="text-sm text-gray-600">
                    Active Users: {metrics.activeUsers} | 
                    Load: {metrics.systemLoad.toFixed(1)}%
                  </div>
                )}
              </div>
              {isProcessing && (
                <div className="text-sm text-blue-600">
                  AI Processing...
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {children}
          </div>
        </div>
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default SimpleDashboardLayout;
