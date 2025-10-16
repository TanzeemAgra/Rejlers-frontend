'use client';

import React, { useState, useEffect } from 'react';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import SimpleRBACDemo from '@/components/super-admin/SimpleRBACDemo';
import AIPoweredUserManagement from '@/components/super-admin/AIPoweredUserManagement';

const UserManagementPage: React.FC = () => {
  const [useDemoMode, setUseDemoMode] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkSystemAvailability = async () => {
      try {
        // Try to import auth service and check basic functionality
        const { authService } = await import('@/lib/auth');
        const isAuthenticated = authService.isAuthenticated();
        
        if (!isAuthenticated) {
          console.log('🚀 User not authenticated, showing demo mode');
          setUseDemoMode(true);
        } else {
          console.log('✅ Authentication available, proceeding with full system');
          setUseDemoMode(false);
        }
      } catch (error) {
        console.error('❌ System check failed, falling back to demo mode:', error);
        setUseDemoMode(true);
      } finally {
        setIsChecking(false);
      }
    };

    checkSystemAvailability();
  }, []);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-900">Initializing RBAC System...</h3>
          <p className="text-gray-600">Checking system availability</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      {useDemoMode ? (
        <div className="p-6">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Demo Mode:</strong> Running in demonstration mode. 
                  Full authentication and backend integration available after proper setup.
                </p>
              </div>
            </div>
          </div>
          <SimpleRBACDemo />
        </div>
      ) : (
        <div className="p-6 bg-gray-50 min-h-full">
          <AIPoweredUserManagement />
        </div>
      )}
    </ErrorBoundary>
  );
};

export default UserManagementPage;
