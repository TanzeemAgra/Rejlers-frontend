/**
 * RBAC-Enhanced Layout Component
 * =============================
 * 
 * Intelligent layout system with comprehensive RBAC integration:
 * - Role-based layout adaptation
 * - AI-powered user interface
 * - Security monitoring dashboard
 * - Real-time permission updates
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRBAC } from '../../contexts/RBACContext';
import AdaptiveNavigation from '../navigation/AdaptiveNavigation';
import PermissionGuard from '../auth/PermissionGuard';

// Layout Props
interface RBACLayoutProps {
  children: React.ReactNode;
  title?: string;
  showNavigation?: boolean;
  showUserInfo?: boolean;
  showAIInsights?: boolean;
  enableSecurityMonitoring?: boolean;
  className?: string;
}

// Security Alert Interface
interface SecurityAlert {
  id: string;
  type: 'warning' | 'error' | 'info';
  message: string;
  timestamp: Date;
  action?: string;
}

// RBAC-Enhanced Layout
const RBACLayout: React.FC<RBACLayoutProps> = ({
  children,
  title = 'Dashboard',
  showNavigation = true,
  showUserInfo = true,
  showAIInsights = false,
  enableSecurityMonitoring = true,
  className = '',
}) => {
  const router = useRouter();
  const { 
    state, 
    logout, 
    refreshPermissions,
    getAccessPattern,
    getPredictedRisk,
  } = useRBAC();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [securityAlerts, setSecurityAlerts] = useState<SecurityAlert[]>([]);
  const [showSecurityPanel, setShowSecurityPanel] = useState(false);

  // Real-time Security Monitoring
  useEffect(() => {
    if (!enableSecurityMonitoring || !state.isAuthenticated) return;

    const checkSecurityStatus = () => {
      const alerts: SecurityAlert[] = [];
      
      // Check user risk profile
      if (state.user?.riskProfile?.aiRiskScore && state.user.riskProfile.aiRiskScore > 0.7) {
        alerts.push({
          id: 'high-risk-user',
          type: 'warning',
          message: `High risk score detected: ${(state.user.riskProfile.aiRiskScore * 100).toFixed(1)}%`,
          timestamp: new Date(),
          action: 'Review recent activities',
        });
      }

      // Check access patterns for anomalies
      const patterns = getAccessPattern();
      const recentPatterns = patterns.filter(p => {
        const patternTime = new Date(p.timestamp);
        return (Date.now() - patternTime.getTime()) < 30 * 60 * 1000; // Last 30 minutes
      });

      const failedAttempts = recentPatterns.filter(p => !p.success);
      if (failedAttempts.length > 3) {
        alerts.push({
          id: 'multiple-failures',
          type: 'error',
          message: `${failedAttempts.length} failed access attempts in the last 30 minutes`,
          timestamp: new Date(),
          action: 'Security review required',
        });
      }

      // Check token expiration
      if (state.securityContext?.tokenMetadata) {
        const expiresAt = state.securityContext.tokenMetadata.expiresAt * 1000;
        const timeUntilExpiration = expiresAt - Date.now();
        const minutesLeft = Math.floor(timeUntilExpiration / (60 * 1000));

        if (minutesLeft <= 10 && minutesLeft > 0) {
          alerts.push({
            id: 'token-expiring',
            type: 'info',
            message: `Session expires in ${minutesLeft} minutes`,
            timestamp: new Date(),
            action: 'Session will auto-refresh',
          });
        }
      }

      // Check for unusual access patterns
      const currentHour = new Date().getHours();
      const isOffHours = currentHour < 6 || currentHour > 22;
      const hasHighPermissions = state.user?.permissionLevel === 'executive_max' || 
                                state.user?.permissionLevel === 'executive_high';

      if (isOffHours && hasHighPermissions && recentPatterns.length > 0) {
        alerts.push({
          id: 'off-hours-access',
          type: 'warning',
          message: 'High-privilege access detected during off-hours',
          timestamp: new Date(),
          action: 'Additional monitoring active',
        });
      }

      setSecurityAlerts(alerts);
    };

    // Check immediately and then every minute
    checkSecurityStatus();
    const interval = setInterval(checkSecurityStatus, 60 * 1000);

    return () => clearInterval(interval);
  }, [
    enableSecurityMonitoring,
    state.isAuthenticated,
    state.user,
    state.securityContext,
    getAccessPattern,
  ]);

  // Handle Logout
  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  // Refresh Permissions
  const handleRefreshPermissions = async () => {
    await refreshPermissions();
  };

  // Get User Display Name
  const getUserDisplayName = () => {
    if (!state.user) return 'User';
    
    const fullName = `${state.user.firstName} ${state.user.lastName}`.trim();
    return fullName || state.user.username || state.user.email;
  };

  // Get User Role Display
  const getUserRoles = () => {
    if (!state.user?.roles) return [];
    return state.user.roles
      .filter(role => role.isActive)
      .map(role => role.roleName)
      .slice(0, 2); // Show max 2 roles in header
  };

  // Security Alert Component
  const SecurityAlert: React.FC<{ alert: SecurityAlert }> = ({ alert }) => {
    const bgColor = alert.type === 'error' ? 'bg-red-50 border-red-200' :
                   alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                   'bg-blue-50 border-blue-200';
    
    const textColor = alert.type === 'error' ? 'text-red-800' :
                     alert.type === 'warning' ? 'text-yellow-800' :
                     'text-blue-800';

    return (
      <div className={`p-3 border rounded-lg ${bgColor}`}>
        <div className={`text-sm font-medium ${textColor}`}>
          {alert.message}
        </div>
        {alert.action && (
          <div className="text-xs text-gray-600 mt-1">
            {alert.action}
          </div>
        )}
        <div className="text-xs text-gray-500 mt-1">
          {alert.timestamp.toLocaleTimeString()}
        </div>
      </div>
    );
  };

  if (!state.isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <div className="ml-4 text-gray-600">Authenticating...</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {/* Security Alerts Bar */}
      {securityAlerts.length > 0 && (
        <div className="bg-red-600 text-white px-4 py-2 text-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{securityAlerts.length} security alert{securityAlerts.length !== 1 ? 's' : ''}</span>
            </div>
            <button
              onClick={() => setShowSecurityPanel(!showSecurityPanel)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              {showSecurityPanel ? 'Hide' : 'Show'} Details
            </button>
          </div>
        </div>
      )}

      {/* Security Panel */}
      {showSecurityPanel && securityAlerts.length > 0 && (
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Security Alerts</h3>
            <div className="space-y-2">
              {securityAlerts.map(alert => (
                <SecurityAlert key={alert.id} alert={alert} />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Sidebar */}
        {showNavigation && (
          <div className={`
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:translate-x-0 lg:static fixed inset-y-0 left-0 z-50
            w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out
          `}>
            <div className="flex flex-col h-full">
              {/* Logo/Brand */}
              <div className="flex items-center justify-between h-16 px-4 bg-blue-600">
                <div className="text-white font-bold text-xl">Rejlers AI</div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden text-white hover:text-gray-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Navigation */}
              <div className="flex-1 px-4 py-6 overflow-y-auto">
                <AdaptiveNavigation
                  showAIInsights={showAIInsights}
                  enablePersonalization={true}
                />
              </div>

              {/* User Info */}
              {showUserInfo && state.user && (
                <div className="border-t border-gray-200 p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium text-sm">
                          {getUserDisplayName().charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="ml-3 flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {getUserDisplayName()}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {getUserRoles().map(role => (
                          <span
                            key={role}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {role.replace('_', ' ')}
                          </span>
                        ))}
                      </div>
                      {state.user.riskProfile && (
                        <div className="text-xs text-gray-500 mt-1">
                          Risk: {(state.user.riskProfile.aiRiskScore * 100).toFixed(0)}%
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-3 space-y-1">
                    <button
                      onClick={handleRefreshPermissions}
                      className="w-full text-left px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 rounded transition-colors"
                    >
                      🔄 Refresh Permissions
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      🚪 Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  {showNavigation && (
                    <button
                      onClick={() => setSidebarOpen(true)}
                      className="lg:hidden -ml-2 mr-2 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                    >
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                  )}
                  <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
                </div>

                {/* Header Actions */}
                <div className="flex items-center space-x-4">
                  {/* AI Insights Toggle */}
                  <PermissionGuard
                    role="AI_Specialist"
                    hideOnDeny={true}
                  >
                    <button
                      onClick={() => setShowSecurityPanel(!showSecurityPanel)}
                      className={`
                        p-2 rounded-lg transition-colors
                        ${showAIInsights ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:text-gray-700'}
                      `}
                      title="AI Insights"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </button>
                  </PermissionGuard>

                  {/* Notifications */}
                  <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19c-5 0-8-3-8-8V7a8 8 0 0116 0v4c0 5-3 8-8 8z" />
                    </svg>
                  </button>

                  {/* User Menu */}
                  <div className="flex items-center space-x-3">
                    <div className="text-sm text-right">
                      <div className="font-medium text-gray-900">{getUserDisplayName()}</div>
                      <div className="text-gray-500">{state.user?.permissionLevel}</div>
                    </div>
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium text-sm">
                        {getUserDisplayName().charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto">
            <div className="px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default RBACLayout;