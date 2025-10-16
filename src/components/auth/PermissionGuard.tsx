/**
 * Permission Guard Component
 * =========================
 * 
 * Granular permission-based component rendering with AI risk assessment:
 * - Fine-grained UI element access control
 * - AI-powered visibility predictions
 * - Dynamic permission caching
 * - Fallback content for unauthorized access
 */

'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRBAC } from '../../contexts/RBACContext';

// Permission Guard Props
interface PermissionGuardProps {
  children: React.ReactNode;
  resource?: string;
  action?: string;
  role?: string;
  roles?: string[];
  permissionLevel?: string;
  userType?: 'staff' | 'superuser';
  maxRiskThreshold?: number;
  customCheck?: (user: any, context: any) => boolean;
  fallback?: React.ReactNode;
  showLoading?: boolean;
  hideOnDeny?: boolean;
  className?: string;
}

// AI-Enhanced Permission Guard
const PermissionGuard: React.FC<PermissionGuardProps> = ({
  children,
  resource,
  action,
  role,
  roles = [],
  permissionLevel,
  userType,
  maxRiskThreshold = 1.0,
  customCheck,
  fallback,
  showLoading = false,
  hideOnDeny = true,
  className = '',
}) => {
  const { 
    state, 
    checkPermission, 
    hasRole, 
    hasAnyRole, 
    hasPermissionLevel,
    getPredictedRisk 
  } = useRBAC();

  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [aiAnalysis, setAiAnalysis] = useState({
    riskScore: 0,
    confidence: 0,
    reasoning: [] as string[],
  });

  // Memoized permission check function
  const performPermissionCheck = useCallback(async () => {
    setIsLoading(true);

    // Wait for authentication
    if (state.isLoading || !state.isAuthenticated || !state.user) {
      setIsAuthorized(false);
      setIsLoading(false);
      return;
    }

    try {
      let hasAccess = true;
      const reasoning: string[] = [];
      let riskScore = 0;

      // Resource-action permission check
      if (resource && action) {
        const permissionGranted = await checkPermission(resource, action);
        if (!permissionGranted) {
          hasAccess = false;
          reasoning.push(`No permission for ${action} on ${resource}`);
        } else {
          reasoning.push(`Permission granted for ${action} on ${resource}`);
        }
      }

      // Single role check
      if (role && !hasRole(role)) {
        hasAccess = false;
        reasoning.push(`Missing required role: ${role}`);
      } else if (role && hasRole(role)) {
        reasoning.push(`Role verified: ${role}`);
      }

      // Multiple roles check (any of)
      if (roles.length > 0) {
        const combinedRoles = role ? [role, ...roles] : roles;
        if (!hasAnyRole(combinedRoles)) {
          hasAccess = false;
          reasoning.push(`Missing any of required roles: ${combinedRoles.join(', ')}`);
        } else {
          reasoning.push(`Role requirement satisfied`);
        }
      }

      // Permission level check
      if (permissionLevel && !hasPermissionLevel(permissionLevel)) {
        hasAccess = false;
        reasoning.push(`Insufficient permission level. Required: ${permissionLevel}, Current: ${state.user.permissionLevel}`);
      } else if (permissionLevel) {
        reasoning.push(`Permission level satisfied: ${permissionLevel}`);
      }

      // User type check
      if (userType) {
        const hasUserType = userType === 'staff' ? state.user.isStaff : 
                           userType === 'superuser' ? state.user.isSuperuser : false;
        if (!hasUserType) {
          hasAccess = false;
          reasoning.push(`Requires ${userType} privileges`);
        } else {
          reasoning.push(`User type verified: ${userType}`);
        }
      }

      // AI risk assessment
      if (resource) {
        const predictedRisk = getPredictedRisk(resource);
        const userRisk = state.user.riskProfile?.aiRiskScore || 0;
        riskScore = Math.max(predictedRisk, userRisk);

        if (riskScore > maxRiskThreshold) {
          hasAccess = false;
          reasoning.push(`Risk score too high: ${(riskScore * 100).toFixed(1)}% (max: ${(maxRiskThreshold * 100).toFixed(1)}%)`);
        } else {
          reasoning.push(`Risk assessment passed: ${(riskScore * 100).toFixed(1)}%`);
        }
      }

      // Custom validation
      if (customCheck && hasAccess) {
        const customResult = customCheck(state.user, state.securityContext);
        if (!customResult) {
          hasAccess = false;
          reasoning.push('Custom access validation failed');
        } else {
          reasoning.push('Custom access validation passed');
        }
      }

      // AI confidence calculation (based on number of checks passed vs total)
      const totalChecks = [resource && action, role, roles.length > 0, permissionLevel, userType, customCheck].filter(Boolean).length;
      const passedChecks = reasoning.filter(r => !r.includes('Missing') && !r.includes('failed') && !r.includes('too high')).length;
      const confidence = totalChecks > 0 ? passedChecks / totalChecks : 1;

      setAiAnalysis({
        riskScore,
        confidence,
        reasoning,
      });

      setIsAuthorized(hasAccess);

      // Log permission check for AI learning
      if (resource && action) {
        logPermissionCheck(resource, action, hasAccess, riskScore);
      }

    } catch (error) {
      console.error('Permission check error:', error);
      setIsAuthorized(false);
      setAiAnalysis({
        riskScore: 1.0,
        confidence: 0,
        reasoning: ['Permission check failed due to error'],
      });
    } finally {
      setIsLoading(false);
    }
  }, [
    state.isLoading,
    state.isAuthenticated,
    state.user,
    resource,
    action,
    role,
    roles,
    permissionLevel,
    userType,
    maxRiskThreshold,
    customCheck,
    checkPermission,
    hasRole,
    hasAnyRole,
    hasPermissionLevel,
    getPredictedRisk,
  ]);

  // Log Permission Check for AI Learning
  const logPermissionCheck = async (
    resource: string,
    action: string,
    granted: boolean,
    riskScore: number
  ) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      await fetch('/api/rbac/log-permission-check/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resource,
          action,
          granted,
          risk_score: riskScore,
          context: {
            component: 'PermissionGuard',
            timestamp: new Date().toISOString(),
            url: window.location.href,
          },
        }),
      });
    } catch (error) {
      console.error('Failed to log permission check:', error);
    }
  };

  // Perform permission check on mount and dependency changes
  useEffect(() => {
    performPermissionCheck();
  }, [performPermissionCheck]);

  // Loading state
  if (isLoading && showLoading) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    );
  }

  // Permission denied
  if (isAuthorized === false) {
    if (hideOnDeny) {
      return null;
    }

    if (fallback) {
      return <div className={className}>{fallback}</div>;
    }

    // Default access denied message (only in development)
    if (process.env.NODE_ENV === 'development') {
      return (
        <div className={`bg-red-50 border border-red-200 rounded p-2 ${className}`}>
          <div className="text-xs text-red-600">
            <div className="font-medium">Access Denied</div>
            {aiAnalysis.reasoning.map((reason, index) => (
              <div key={index} className="text-xs text-red-500 mt-1">
                • {reason}
              </div>
            ))}
            <div className="text-xs text-gray-500 mt-1">
              Risk: {(aiAnalysis.riskScore * 100).toFixed(1)}% | 
              Confidence: {(aiAnalysis.confidence * 100).toFixed(1)}%
            </div>
          </div>
        </div>
      );
    }

    return null;
  }

  // Permission granted
  return <div className={className}>{children}</div>;
};

// Higher-Order Component for Permission Wrapping
export const withPermission = (
  Component: React.ComponentType<any>,
  permissionProps: Omit<PermissionGuardProps, 'children'>
) => {
  const WrappedComponent = (props: any) => {
    return (
      <PermissionGuard {...permissionProps}>
        <Component {...props} />
      </PermissionGuard>
    );
  };

  WrappedComponent.displayName = `withPermission(${Component.displayName || Component.name})`;
  return WrappedComponent;
};

// Hook for imperative permission checking
export const usePermissionCheck = () => {
  const { checkPermission, hasRole, hasAnyRole, hasPermissionLevel, state } = useRBAC();

  const checkAccess = useCallback(async (options: {
    resource?: string;
    action?: string;
    role?: string;
    roles?: string[];
    permissionLevel?: string;
    userType?: 'staff' | 'superuser';
    customCheck?: (user: any, context: any) => boolean;
  }) => {
    if (!state.isAuthenticated || !state.user) {
      return false;
    }

    const {
      resource,
      action,
      role,
      roles = [],
      permissionLevel,
      userType,
      customCheck,
    } = options;

    try {
      // Resource-action check
      if (resource && action) {
        const hasPermission = await checkPermission(resource, action);
        if (!hasPermission) return false;
      }

      // Role checks
      if (role && !hasRole(role)) return false;
      if (roles.length > 0 && !hasAnyRole(roles)) return false;

      // Permission level check
      if (permissionLevel && !hasPermissionLevel(permissionLevel)) return false;

      // User type check
      if (userType) {
        const hasUserType = userType === 'staff' ? state.user.isStaff : 
                           userType === 'superuser' ? state.user.isSuperuser : false;
        if (!hasUserType) return false;
      }

      // Custom check
      if (customCheck && !customCheck(state.user, state.securityContext)) {
        return false;
      }

      return true;
    } catch (error) {
      console.error('Permission check error:', error);
      return false;
    }
  }, [state, checkPermission, hasRole, hasAnyRole, hasPermissionLevel]);

  return checkAccess;
};

export default PermissionGuard;