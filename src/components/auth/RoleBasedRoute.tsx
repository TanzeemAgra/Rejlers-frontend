/**
 * Role-Based Route Protection Component
 * ===================================
 * 
 * Intelligent route protection with AI-powered access control:
 * - Role and permission-based routing
 * - AI risk assessment for route access
 * - Dynamic access pattern analysis
 * - Fallback handling for unauthorized access
 */

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useRBAC } from '../../contexts/RBACContext';
// Import components (will create these next)
// import LoadingSpinner from '../ui/LoadingSpinner';
// import AccessDenied from './AccessDenied';

// Route Protection Props
interface RoleBasedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
  requiredPermissions?: Array<{
    resource: string;
    action: string;
  }>;
  requiredPermissionLevel?: string;
  allowedUserTypes?: ('staff' | 'superuser')[];
  maxRiskThreshold?: number;
  fallbackPath?: string;
  showLoading?: boolean;
  customAccessCheck?: (user: any, context: any) => boolean;
}

// AI-Enhanced Route Guard
const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({
  children,
  requiredRoles = [],
  requiredPermissions = [],
  requiredPermissionLevel,
  allowedUserTypes = [],
  maxRiskThreshold = 0.8,
  fallbackPath = '/dashboard',
  showLoading = true,
  customAccessCheck,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { 
    state, 
    hasRole, 
    hasAnyRole, 
    hasPermissionLevel, 
    checkPermission, 
    getPredictedRisk 
  } = useRBAC();

  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [accessCheckComplete, setAccessCheckComplete] = useState(false);
  const [riskAnalysis, setRiskAnalysis] = useState({
    riskScore: 0,
    blockingFactors: [] as string[],
    recommendations: [] as string[],
  });

  // Comprehensive Access Check
  useEffect(() => {
    const performAccessCheck = async () => {
      // Wait for authentication to complete
      if (state.isLoading) {
        return;
      }

      // User must be authenticated
      if (!state.isAuthenticated || !state.user) {
        setIsAuthorized(false);
        setAccessCheckComplete(true);
        return;
      }

      try {
        let hasAccess = true;
        const blockingFactors: string[] = [];
        const recommendations: string[] = [];
        let currentRiskScore = 0;

        // Check required roles
        if (requiredRoles.length > 0) {
          const hasRequiredRole = hasAnyRole(requiredRoles);
          if (!hasRequiredRole) {
            hasAccess = false;
            blockingFactors.push(`Missing required role: ${requiredRoles.join(' or ')}`);
            recommendations.push('Contact your administrator to request the appropriate role assignment.');
          }
        }

        // Check permission level
        if (requiredPermissionLevel && !hasPermissionLevel(requiredPermissionLevel)) {
          hasAccess = false;
          blockingFactors.push(`Insufficient permission level. Required: ${requiredPermissionLevel}`);
          recommendations.push('Your current permission level is insufficient for this resource.');
        }

        // Check user types (staff/superuser)
        if (allowedUserTypes.length > 0 && state.user) {
          const userTypeAccess = allowedUserTypes.some(type => {
            if (type === 'staff') return state.user!.isStaff;
            if (type === 'superuser') return state.user!.isSuperuser;
            return false;
          });
          
          if (!userTypeAccess) {
            hasAccess = false;
            blockingFactors.push(`Access restricted to: ${allowedUserTypes.join(', ')} users`);
            recommendations.push('This resource requires elevated user privileges.');
          }
        }

        // Check specific permissions
        if (requiredPermissions.length > 0) {
          for (const perm of requiredPermissions) {
            const hasPermission = await checkPermission(perm.resource, perm.action);
            if (!hasPermission) {
              hasAccess = false;
              blockingFactors.push(`Missing permission: ${perm.action} on ${perm.resource}`);
              recommendations.push(`Request access to perform ${perm.action} operations on ${perm.resource}.`);
            }
          }
        }

        // AI Risk Assessment
        const routeRisk = getPredictedRisk(pathname);
        const userRisk = state.user.riskProfile?.aiRiskScore || 0;
        const combinedRisk = Math.max(routeRisk, userRisk);
        
        currentRiskScore = combinedRisk;

        if (combinedRisk > maxRiskThreshold) {
          hasAccess = false;
          blockingFactors.push(`High risk score detected: ${(combinedRisk * 100).toFixed(1)}%`);
          recommendations.push('Your access patterns indicate potential security risks. Please contact support for assistance.');
        }

        // Custom access check
        if (customAccessCheck && hasAccess) {
          const customResult = customAccessCheck(state.user, state.securityContext);
          if (!customResult) {
            hasAccess = false;
            blockingFactors.push('Custom access validation failed');
            recommendations.push('Additional access criteria not met.');
          }
        }

        // Business hours check for high-sensitivity routes
        if (requiredPermissionLevel === 'executive_max') {
          const now = new Date();
          const hour = now.getHours();
          const isBusinessHours = hour >= 9 && hour <= 17; // 9 AM to 5 PM
          const isWeekday = now.getDay() >= 1 && now.getDay() <= 5; // Monday to Friday
          
          if (!isBusinessHours || !isWeekday) {
            // Allow superusers, but warn others
            if (!state.user.isSuperuser) {
              blockingFactors.push('Access to executive resources is restricted outside business hours');
              recommendations.push('Executive resources are typically available during business hours (9 AM - 5 PM, weekdays).');
              hasAccess = false;
            }
          }
        }

        setRiskAnalysis({
          riskScore: currentRiskScore,
          blockingFactors,
          recommendations,
        });

        setIsAuthorized(hasAccess);
        setAccessCheckComplete(true);

        // Log access attempt for AI analysis
        if (hasAccess) {
          logSuccessfulAccess();
        } else {
          logFailedAccess(blockingFactors);
        }

      } catch (error) {
        console.error('Access check error:', error);
        setIsAuthorized(false);
        setAccessCheckComplete(true);
      }
    };

    performAccessCheck();
  }, [
    state.isLoading, 
    state.isAuthenticated, 
    state.user, 
    pathname,
    requiredRoles,
    requiredPermissions,
    requiredPermissionLevel,
    allowedUserTypes,
    maxRiskThreshold,
    customAccessCheck
  ]);

  // Log Successful Access
  const logSuccessfulAccess = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      await fetch('/api/rbac/log-route-access/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          route: pathname,
          access_granted: true,
          risk_score: riskAnalysis.riskScore,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error('Failed to log successful access:', error);
    }
  };

  // Log Failed Access
  const logFailedAccess = async (reasons: string[]) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      await fetch('/api/rbac/log-route-access/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          route: pathname,
          access_granted: false,
          risk_score: riskAnalysis.riskScore,
          blocking_factors: reasons,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error('Failed to log failed access:', error);
    }
  };

  // Redirect to fallback if unauthorized
  useEffect(() => {
    if (accessCheckComplete && isAuthorized === false && !state.isLoading) {
      // Don't redirect if we're already on the fallback path or login page
      if (pathname !== fallbackPath && pathname !== '/login' && pathname !== '/') {
        router.push(fallbackPath);
      }
    }
  }, [accessCheckComplete, isAuthorized, router, fallbackPath, pathname, state.isLoading]);

  // Show loading spinner
  if (state.isLoading || !accessCheckComplete) {
    return showLoading ? (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <div className="ml-4">
          <p className="text-gray-600">Verifying access permissions...</p>
          {riskAnalysis.riskScore > 0 && (
            <p className="text-sm text-blue-600 mt-1">
              Risk assessment: {(riskAnalysis.riskScore * 100).toFixed(1)}%
            </p>
          )}
        </div>
      </div>
    ) : null;
  }

  // Show access denied if not authorized
  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 15.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="mt-2 text-lg font-medium text-gray-900">Access Denied</h3>
            <div className="mt-2">
              {riskAnalysis.blockingFactors.map((reason, index) => (
                <p key={index} className="text-sm text-red-600 mb-1">{reason}</p>
              ))}
            </div>
            <div className="mt-4">
              <button
                onClick={() => router.push(fallbackPath)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render children if authorized
  return <>{children}</>;
};

export default RoleBasedRoute;