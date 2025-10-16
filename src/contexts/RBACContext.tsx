/**
 * Frontend RBAC Context and Provider
 * =================================
 * 
 * Comprehensive role-based access control system for the frontend with:
 * - JWT token management with role claims
 * - AI-powered access predictions
 * - Real-time permission validation
 * - Security monitoring and anomaly detection
 */

'use client';

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';

// JWT Decode Utility (avoiding external dependency)
const base64UrlDecode = (str: string): string => {
  let output = str.replace(/-/g, '+').replace(/_/g, '/');
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += '==';
      break;
    case 3:
      output += '=';
      break;
    default:
      throw new Error('Invalid base64url string');
  }
  return atob(output);
};

const jwtDecode = (token: string): any => {
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid JWT token');
  }
  
  try {
    const payload = base64UrlDecode(parts[1]);
    return JSON.parse(payload);
  } catch (error) {
    throw new Error('Invalid JWT payload');
  }
};

// Types and Interfaces
interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  isStaff: boolean;
  isSuperuser: boolean;
  roles: Role[];
  permissionLevel: string;
  riskProfile: RiskProfile;
}

interface Role {
  roleName: string;
  roleCategory: string;
  isActive: boolean;
  assignedAt: string;
}

interface RiskProfile {
  baseRisk: {
    totalRequests: number;
    failedRequests: number;
    successRate: number;
    averageRiskScore: number;
    highRiskRequests: number;
  };
  aiRiskScore: number;
  calculatedAt: string;
}

interface Permission {
  resource: string;
  action: string;
  allowed: boolean;
  aiAnalysis?: {
    riskScore: number;
    anomalies: string[];
    recommendations: string[];
  };
}

interface SecurityContext {
  userRiskProfile: RiskProfile;
  tokenMetadata: {
    userId: string;
    issuedAt: number;
    expiresAt: number;
    roles: Role[];
    permissionLevel: string;
    riskScore: number;
  };
  authenticationTimestamp: Date;
  accessPattern: AccessPattern[];
}

interface AccessPattern {
  timestamp: string;
  resource: string;
  action: string;
  success: boolean;
  riskScore: number;
}

interface RBACState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  permissions: Map<string, Permission>;
  securityContext: SecurityContext | null;
  accessPatterns: AccessPattern[];
  aiPredictions: Map<string, number>; // resource -> risk score
  error: string | null;
}

interface RBACAction {
  type: 'SET_USER' | 'SET_LOADING' | 'SET_ERROR' | 'UPDATE_PERMISSIONS' | 
        'ADD_ACCESS_PATTERN' | 'UPDATE_AI_PREDICTIONS' | 'LOGOUT' | 'REFRESH_TOKEN';
  payload?: any;
}

// Initial State
const initialState: RBACState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  permissions: new Map(),
  securityContext: null,
  accessPatterns: [],
  aiPredictions: new Map(),
  error: null,
};

// Reducer
function rbacReducer(state: RBACState, action: RBACAction): RBACState {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: !!action.payload.user,
        securityContext: action.payload.securityContext,
        isLoading: false,
        error: null,
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    
    case 'UPDATE_PERMISSIONS':
      const newPermissions = new Map(state.permissions);
      action.payload.forEach((perm: Permission) => {
        const key = `${perm.resource}:${perm.action}`;
        newPermissions.set(key, perm);
      });
      return {
        ...state,
        permissions: newPermissions,
      };
    
    case 'ADD_ACCESS_PATTERN':
      return {
        ...state,
        accessPatterns: [action.payload, ...state.accessPatterns.slice(0, 99)], // Keep last 100
      };
    
    case 'UPDATE_AI_PREDICTIONS':
      const updatedPredictions = new Map(state.aiPredictions);
      if (action.payload instanceof Map) {
        action.payload.forEach((value, key) => updatedPredictions.set(key, value));
      } else if (Array.isArray(action.payload)) {
        action.payload.forEach(([key, value]) => updatedPredictions.set(key, value));
      }
      return {
        ...state,
        aiPredictions: updatedPredictions,
      };
    
    case 'LOGOUT':
      return {
        ...initialState,
        isLoading: false,
      };
    
    case 'REFRESH_TOKEN':
      return {
        ...state,
        user: action.payload.user,
        securityContext: action.payload.securityContext,
      };
    
    default:
      return state;
  }
}

// Context
const RBACContext = createContext<{
  state: RBACState;
  checkPermission: (resource: string, action: string) => Promise<boolean>;
  hasRole: (roleName: string) => boolean;
  hasAnyRole: (roleNames: string[]) => boolean;
  hasPermissionLevel: (level: string) => boolean;
  getPredictedRisk: (resource: string) => number;
  refreshPermissions: () => Promise<void>;
  logout: () => Promise<void>;
  getAccessPattern: () => AccessPattern[];
}>({
  state: initialState,
  checkPermission: async () => false,
  hasRole: () => false,
  hasAnyRole: () => false,
  hasPermissionLevel: () => false,
  getPredictedRisk: () => 0,
  refreshPermissions: async () => {},
  logout: async () => {},
  getAccessPattern: () => [],
});

// RBAC Provider Component
export const RBACProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(rbacReducer, initialState);

  // AI-Powered Permission Checker
  const checkPermission = useCallback(async (resource: string, action: string): Promise<boolean> => {
    const permissionKey = `${resource}:${action}`;
    
    // Check cache first
    const cachedPermission = state.permissions.get(permissionKey);
    if (cachedPermission) {
      recordAccessPattern(resource, action, cachedPermission.allowed, cachedPermission.aiAnalysis?.riskScore || 0);
      return cachedPermission.allowed;
    }

    try {
      // Make API call to backend for permission check
      const token = localStorage.getItem('accessToken');
      if (!token) {
        return false;
      }

      const response = await fetch('/api/rbac/check-permission/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resource,
          action,
          context: {
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            location: window.location.pathname,
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Permission check failed');
      }

      const result = await response.json();
      
      // Update permissions cache
      dispatch({
        type: 'UPDATE_PERMISSIONS',
        payload: [{
          resource,
          action,
          allowed: result.allowed,
          aiAnalysis: result.aiAnalysis,
        }],
      });

      // Record access pattern
      recordAccessPattern(resource, action, result.allowed, result.aiAnalysis?.riskScore || 0);

      return result.allowed;

    } catch (error) {
      console.error('Permission check error:', error);
      recordAccessPattern(resource, action, false, 1.0);
      return false;
    }
  }, [state.permissions]);

  // Record Access Pattern for AI Analysis
  const recordAccessPattern = useCallback((resource: string, action: string, success: boolean, riskScore: number) => {
    const pattern: AccessPattern = {
      timestamp: new Date().toISOString(),
      resource,
      action,
      success,
      riskScore,
    };

    dispatch({
      type: 'ADD_ACCESS_PATTERN',
      payload: pattern,
    });

    // Send pattern to backend for AI analysis (async)
    sendAccessPatternToBackend(pattern);
  }, []);

  // Send Access Pattern to Backend
  const sendAccessPatternToBackend = async (pattern: AccessPattern) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      await fetch('/api/rbac/log-access-pattern/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pattern),
      });
    } catch (error) {
      console.error('Failed to send access pattern:', error);
    }
  };

  // Role Checking Functions
  const hasRole = useCallback((roleName: string): boolean => {
    if (!state.user) return false;
    return state.user.roles.some(role => role.roleName === roleName && role.isActive);
  }, [state.user]);

  const hasAnyRole = useCallback((roleNames: string[]): boolean => {
    if (!state.user) return false;
    return state.user.roles.some(role => 
      roleNames.includes(role.roleName) && role.isActive
    );
  }, [state.user]);

  const hasPermissionLevel = useCallback((level: string): boolean => {
    if (!state.user) return false;
    
    const levels = {
      'standard': 1,
      'management': 2,
      'ai_specialist': 3,
      'executive_high': 4,
      'executive_max': 5,
      'superuser': 6,
    };

    const userLevel = levels[state.user.permissionLevel as keyof typeof levels] || 0;
    const requiredLevel = levels[level as keyof typeof levels] || 0;

    return userLevel >= requiredLevel;
  }, [state.user]);

  // Get AI Predicted Risk for Resource
  const getPredictedRisk = useCallback((resource: string): number => {
    return state.aiPredictions.get(resource) || 0;
  }, [state.aiPredictions]);

  // Refresh Permissions
  const refreshPermissions = useCallback(async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      const response = await fetch('/api/rbac/refresh-permissions/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        dispatch({
          type: 'UPDATE_PERMISSIONS',
          payload: data.permissions,
        });
        dispatch({
          type: 'UPDATE_AI_PREDICTIONS',
          payload: new Map(Object.entries(data.aiPredictions || {})),
        });
      }
    } catch (error) {
      console.error('Failed to refresh permissions:', error);
    }
  }, []);

  // Logout Function
  const logout = useCallback(async () => {
    try {
      const token = localStorage.getItem('refreshToken');
      if (token) {
        await fetch('/api/auth/logout/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refresh: token }),
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      dispatch({ type: 'LOGOUT' });
    }
  }, []);

  // Get Access Patterns
  const getAccessPattern = useCallback(() => {
    return state.accessPatterns;
  }, [state.accessPatterns]);

  // Initialize Authentication
  useEffect(() => {
    const initializeAuth = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });

      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          dispatch({ type: 'SET_LOADING', payload: false });
          return;
        }

        // Decode JWT token
        const decodedToken = jwtDecode(token) as any;
        
        // Check if token is expired
        if (decodedToken.exp * 1000 < Date.now()) {
          // Try to refresh token
          await refreshToken();
          return;
        }

        // Extract user data from token
        const userData: User = {
          id: decodedToken.user_id,
          username: decodedToken.username,
          email: decodedToken.email,
          firstName: decodedToken.first_name,
          lastName: decodedToken.last_name,
          isStaff: decodedToken.is_staff,
          isSuperuser: decodedToken.is_superuser,
          roles: decodedToken.roles || [],
          permissionLevel: decodedToken.permissions?.permission_level || 'standard',
          riskProfile: decodedToken.risk_profile,
        };

        const securityContext: SecurityContext = {
          userRiskProfile: decodedToken.risk_profile,
          tokenMetadata: {
            userId: decodedToken.user_id,
            issuedAt: decodedToken.iat,
            expiresAt: decodedToken.exp,
            roles: decodedToken.roles,
            permissionLevel: decodedToken.permissions?.permission_level,
            riskScore: decodedToken.risk_profile?.aiRiskScore || 0,
          },
          authenticationTimestamp: new Date(),
          accessPattern: [],
        };

        dispatch({
          type: 'SET_USER',
          payload: { user: userData, securityContext },
        });

        // Initialize AI predictions
        if (decodedToken.ai_predictions) {
          dispatch({
            type: 'UPDATE_AI_PREDICTIONS',
            payload: new Map(Object.entries(decodedToken.ai_predictions)),
          });
        }

      } catch (error) {
        console.error('Authentication initialization error:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Authentication failed' });
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
    };

    initializeAuth();
  }, []);

  // Token Refresh Function
  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        dispatch({ type: 'LOGOUT' });
        return;
      }

      const response = await fetch('/api/auth/token/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('accessToken', data.access);
        
        if (data.refresh) {
          localStorage.setItem('refreshToken', data.refresh);
        }

        // Reinitialize with new token
        const decodedToken = jwtDecode(data.access) as any;
        
        const userData: User = {
          id: decodedToken.user_id,
          username: decodedToken.username,
          email: decodedToken.email,
          firstName: decodedToken.first_name,
          lastName: decodedToken.last_name,
          isStaff: decodedToken.is_staff,
          isSuperuser: decodedToken.is_superuser,
          roles: decodedToken.roles || [],
          permissionLevel: decodedToken.permissions?.permission_level || 'standard',
          riskProfile: decodedToken.risk_profile,
        };

        dispatch({
          type: 'REFRESH_TOKEN',
          payload: { user: userData, securityContext: null },
        });

      } else {
        dispatch({ type: 'LOGOUT' });
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      dispatch({ type: 'LOGOUT' });
    }
  };

  // Auto refresh token before expiration
  useEffect(() => {
    if (state.isAuthenticated && state.securityContext?.tokenMetadata) {
      const expiresAt = state.securityContext.tokenMetadata.expiresAt * 1000;
      const now = Date.now();
      const timeUntilExpiration = expiresAt - now;
      const refreshTime = timeUntilExpiration - (5 * 60 * 1000); // Refresh 5 minutes before expiration

      if (refreshTime > 0) {
        const timeoutId = setTimeout(refreshToken, refreshTime);
        return () => clearTimeout(timeoutId);
      }
    }
  }, [state.isAuthenticated, state.securityContext]);

  // Periodic AI predictions update
  useEffect(() => {
    if (state.isAuthenticated) {
      const interval = setInterval(refreshPermissions, 5 * 60 * 1000); // Every 5 minutes
      return () => clearInterval(interval);
    }
  }, [state.isAuthenticated, refreshPermissions]);

  const contextValue = {
    state,
    checkPermission,
    hasRole,
    hasAnyRole,
    hasPermissionLevel,
    getPredictedRisk,
    refreshPermissions,
    logout,
    getAccessPattern,
  };

  return (
    <RBACContext.Provider value={contextValue}>
      {children}
    </RBACContext.Provider>
  );
};

// Custom Hook to use RBAC Context
export const useRBAC = () => {
  const context = useContext(RBACContext);
  if (!context) {
    throw new Error('useRBAC must be used within an RBACProvider');
  }
  return context;
};

// Export types for use in other components
export type { User, Role, Permission, SecurityContext, AccessPattern, RiskProfile };