'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/lib/auth';
import { rbacService } from '@/lib/rbac';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: string;
  requiredPermission?: string;
  fallbackPath?: string;
  loadingComponent?: React.ComponentType;
}

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  hasPermission: boolean;
  user: any;
  error: string | null;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  requiredRole,
  requiredPermission,
  fallbackPath = '/login',
  loadingComponent: LoadingComponent
}) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    hasPermission: false,
    user: null,
    error: null
  });
  
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
        
        // Check if user is authenticated
        const isAuthenticated = authService.isAuthenticated();
        if (!isAuthenticated) {
          setAuthState(prev => ({ 
            ...prev, 
            isAuthenticated: false, 
            isLoading: false,
            error: 'Not authenticated' 
          }));
          router.push(fallbackPath);
          return;
        }

        // Get current user
        const user = await authService.getCurrentUser();
        if (!user) {
          setAuthState(prev => ({ 
            ...prev, 
            isAuthenticated: false, 
            isLoading: false,
            error: 'No user data available' 
          }));
          router.push(fallbackPath);
          return;
        }

        // Check role-based access
        let hasPermission = true;
        
        if (requiredRole) {
          // For Super Admin access, check if user is superuser or has admin role
          if (requiredRole === 'super_admin') {
            hasPermission = Boolean(user.is_superuser) || Boolean(user.is_staff) || 
                          Boolean(user.role && ['Super Admin', 'Chief Digital Officer (CDO)'].includes(user.role));
          } else {
            hasPermission = user.role === requiredRole;
          }
        }

        if (requiredPermission && hasPermission) {
          try {
            // Check specific permissions via RBAC service
            const permissions = await rbacService.getUserPermissions();
            // Check if the user has the required module permission
            const modulePerms = permissions.module_permissions;
            if (modulePerms && typeof modulePerms === 'object') {
              hasPermission = Object.prototype.hasOwnProperty.call(modulePerms, requiredPermission) &&
                            modulePerms[requiredPermission]?.access_level?.can_view === true;
            }
          } catch (error) {
            console.warn('Could not fetch user permissions, defaulting to role-based access');
            // Fall back to role-based access if RBAC service fails
          }
        }

        if (!hasPermission) {
          setAuthState(prev => ({ 
            ...prev, 
            isAuthenticated: true,
            hasPermission: false, 
            isLoading: false,
            user,
            error: 'Insufficient permissions' 
          }));
          return;
        }

        setAuthState({
          isAuthenticated: true,
          hasPermission: true,
          isLoading: false,
          user,
          error: null
        });

      } catch (error) {
        console.error('Authentication check failed:', error);
        setAuthState(prev => ({ 
          ...prev, 
          isAuthenticated: false,
          isLoading: false,
          error: 'Authentication check failed' 
        }));
        router.push(fallbackPath);
      }
    };

    checkAuthentication();
  }, [requiredRole, requiredPermission, fallbackPath, router]);

  // Loading state
  if (authState.isLoading) {
    if (LoadingComponent) {
      return <LoadingComponent />;
    }
    
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-900">Verifying Access...</h3>
          <p className="text-gray-600">Checking authentication and permissions</p>
        </div>
      </div>
    );
  }

  // Permission denied state
  if (authState.isAuthenticated && !authState.hasPermission) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-8">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
              <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Access Denied</h2>
            <p className="mt-2 text-sm text-gray-600">
              {authState.error || 'You do not have permission to access this resource.'}
            </p>
            {requiredRole && (
              <p className="mt-1 text-xs text-gray-500">
                Required role: {requiredRole}
              </p>
            )}
            {authState.user && (
              <p className="mt-1 text-xs text-gray-500">
                Current user: {authState.user.email} ({authState.user.role || 'No role assigned'})
              </p>
            )}
          </div>
          <div className="space-y-3">
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Go to Dashboard
            </button>
            <button
              onClick={() => router.push('/login')}
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Sign In as Different User
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Authentication failed state  
  if (!authState.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-8">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100">
              <svg className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-4a2 2 0 00-2-2H6a2 2 0 00-2 2v4a2 2 0 002 2zM12 9V7a4 4 0 00-8 0v2" />
              </svg>
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Authentication Required</h2>
            <p className="mt-2 text-sm text-gray-600">
              Please sign in to access the Super Admin RBAC system.
            </p>
            {authState.error && (
              <p className="mt-1 text-xs text-red-600">
                Error: {authState.error}
              </p>
            )}
          </div>
          <button
            onClick={() => router.push('/login')}
            className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  // Success - render children
  return <>{children}</>;
};

export default AuthGuard;