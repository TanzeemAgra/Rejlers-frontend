/**
 * Authentication Hook with RBAC Integration
 * ========================================
 * 
 * Enhanced authentication hook with AI-powered features:
 * - JWT token management with role claims
 * - AI risk assessment during login
 * - Multi-factor authentication support
 * - Session security monitoring
 */

'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useRBAC } from '../contexts/RBACContext';

// Authentication interfaces
interface LoginCredentials {
  username: string;
  password: string;
  mfaCode?: string;
}

interface LoginResponse {
  success: boolean;
  access: string;
  refresh: string;
  user: any;
  requiresMFA?: boolean;
  mfaMethod?: 'totp' | 'sms' | 'email';
  aiRiskAssessment?: {
    riskScore: number;
    factors: string[];
    recommendations: string[];
  };
}

interface AuthError {
  code: string;
  message: string;
  details?: any;
}

// Authentication Hook
export const useAuthRBAC = () => {
  const router = useRouter();
  const { state, logout: rbacLogout } = useRBAC();
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);
  const [requiresMFA, setRequiresMFA] = useState(false);
  const [mfaSession, setMfaSession] = useState<string | null>(null);

  // Login Function with AI Risk Assessment
  const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // Prepare login request with device fingerprinting
      const deviceInfo = {
        userAgent: navigator.userAgent,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        screen: {
          width: screen.width,
          height: screen.height,
          colorDepth: screen.colorDepth,
        },
        timestamp: new Date().toISOString(),
      };

      const loginData = {
        username: credentials.username,
        password: credentials.password,
        mfa_code: credentials.mfaCode,
        mfa_session: mfaSession,
        device_info: deviceInfo,
        ai_context: {
          login_attempt_time: new Date().toISOString(),
          browser_fingerprint: await generateBrowserFingerprint(),
        },
      };

      const response = await fetch('/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data: LoginResponse = await response.json();

      if (!response.ok) {
        throw new Error('Login failed');
      }

      if (data.requiresMFA) {
        setRequiresMFA(true);
        setMfaSession(data.mfaMethod || '');
        setIsLoading(false);
        return false; // MFA required, don't complete login yet
      }

      // Successful login
      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);

      // Log successful login for AI analysis
      await logAuthenticationEvent('login_success', {
        user_id: data.user?.id,
        risk_score: data.aiRiskAssessment?.riskScore || 0,
        device_info: deviceInfo,
      });

      // Redirect based on user role and AI recommendations
      const redirectPath = determineRedirectPath(data.user, data.aiRiskAssessment);
      router.push(redirectPath);

      setIsLoading(false);
      return true;

    } catch (err) {
      const authError: AuthError = {
        code: 'LOGIN_FAILED',
        message: err instanceof Error ? err.message : 'Login failed',
        details: err,
      };

      setError(authError);
      setIsLoading(false);

      // Log failed login attempt
      await logAuthenticationEvent('login_failed', {
        username: credentials.username,
        error: authError.message,
        device_info: {
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
        },
      });

      return false;
    }
  }, [router, mfaSession]);

  // Generate Browser Fingerprint for AI Analysis
  const generateBrowserFingerprint = async (): Promise<string> => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.textBaseline = 'top';
      ctx.font = '14px Arial';
      ctx.fillText('Browser fingerprint', 2, 2);
    }

    const fingerprint = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      colorDepth: screen.colorDepth,
      pixelRatio: window.devicePixelRatio,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      canvas: canvas.toDataURL(),
      webgl: getWebGLFingerprint(),
    };

    // Simple hash function
    const str = JSON.stringify(fingerprint);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }

    return Math.abs(hash).toString(16);
  };

  // Get WebGL Fingerprint
  const getWebGLFingerprint = (): string => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') as WebGLRenderingContext;
      
      if (!gl) return 'no-webgl';

      const vendor = gl.getParameter(gl.VENDOR);
      const renderer = gl.getParameter(gl.RENDERER);
      return `${vendor}~${renderer}`;
    } catch {
      return 'webgl-error';
    }
  };

  // Determine Redirect Path Based on AI Analysis
  const determineRedirectPath = (user: any, aiAssessment: any): string => {
    // High-risk users go to security dashboard first
    if (aiAssessment?.riskScore > 0.7) {
      return '/security/verification';
    }

    // Role-based default pages
    const roleRoutes: Record<string, string> = {
      'SuperAdmin': '/admin/dashboard',
      'Executive': '/executive/dashboard',
      'AI_Specialist': '/ai-dashboard',
      'Project_Manager': '/projects/dashboard',
      'Finance_Manager': '/finance/dashboard',
      'HR_Manager': '/hr/dashboard',
    };

    const primaryRole = user?.roles?.find((r: any) => r.isActive)?.roleName;
    return roleRoutes[primaryRole] || '/dashboard';
  };

  // Log Authentication Events for AI Analysis
  const logAuthenticationEvent = async (eventType: string, data: any) => {
    try {
      await fetch('/api/auth/log-event/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_type: eventType,
          data,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error('Failed to log auth event:', error);
    }
  };

  return {
    // State
    isLoading,
    error,
    requiresMFA,
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    
    // Actions
    login,
    logout: rbacLogout,
    
    // Utilities
    clearError: () => setError(null),
    clearMFA: () => {
      setRequiresMFA(false);
      setMfaSession(null);
    },
  };
};

export default useAuthRBAC;