'use client';

import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { authService } from '@/lib/auth';
import BulletproofSidebar from '@/components/dashboard/BulletproofSidebar';
import Logo from '@/components/ui/Logo';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        if (!authService.isAuthenticated()) {
          window.location.href = '/login';
          return;
        }

        const userInfo = authService.getUserData() || await authService.getCurrentUser();
        setUser(userInfo);
      } catch (error) {
        console.error('Error loading user:', error);
        // Continue anyway - user info not critical for layout
      }
    };

    loadUser();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <BulletproofSidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-80">
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-30">
          <div className="px-4 lg:px-6 py-4 flex items-center justify-between">
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
                  <h1 className="text-xl font-bold text-slate-900">Rejlers Dashboard</h1>
                  {user && (
                    <p className="text-sm text-slate-600">
                      Welcome back, {user.first_name || user.username}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* User Info */}
            {user && (
              <div className="flex items-center space-x-4">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-slate-900">
                    {user.first_name} {user.last_name}
                  </p>
                  <p className="text-xs text-slate-600">
                    {user.role || user.job_title || 'User'}
                  </p>
                </div>
                <div className="w-9 h-9 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {user.first_name?.charAt(0)}{user.last_name?.charAt(0) || user.username?.charAt(0)}
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-slate-900 bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;