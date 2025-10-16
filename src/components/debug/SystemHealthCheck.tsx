'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain,
  Users,
  Shield,
  AlertTriangle,
  CheckCircle,
  Settings,
  RefreshCw,
  Cpu,
  Activity,
  Crown
} from 'lucide-react';

interface SystemStatus {
  apiConnection: 'connected' | 'disconnected' | 'checking';
  authentication: 'authenticated' | 'unauthenticated' | 'checking';
  rbacService: 'loaded' | 'error' | 'checking';
  userPermissions: 'loaded' | 'error' | 'checking';
  error?: string;
}

const SystemHealthCheck: React.FC = () => {
  const [status, setStatus] = useState<SystemStatus>({
    apiConnection: 'checking',
    authentication: 'checking',
    rbacService: 'checking',
    userPermissions: 'checking'
  });

  const checkSystemHealth = async () => {
    setStatus({
      apiConnection: 'checking',
      authentication: 'checking',
      rbacService: 'checking',
      userPermissions: 'checking'
    });

    try {
      // Check API connection
      const apiResponse = await fetch('/api/health', { method: 'GET' }).catch(() => null);
      const apiStatus = apiResponse?.ok ? 'connected' : 'disconnected';
      
      setStatus(prev => ({ ...prev, apiConnection: apiStatus }));

      // Check authentication
      let authStatus: 'authenticated' | 'unauthenticated' = 'unauthenticated';
      let rbacStatus: 'loaded' | 'error' = 'error';
      let permsStatus: 'loaded' | 'error' = 'error';

      try {
        const { authService } = await import('@/lib/auth');
        const isAuth = authService.isAuthenticated();
        authStatus = isAuth ? 'authenticated' : 'unauthenticated';
        setStatus(prev => ({ ...prev, authentication: authStatus }));

        if (isAuth) {
          // Check RBAC service
          const { rbacService } = await import('@/lib/rbac');
          
          try {
            const roles = await rbacService.getAllRoles();
            rbacStatus = roles ? 'loaded' : 'error';
          } catch (rbacError) {
            console.error('RBAC Service Error:', rbacError);
            rbacStatus = 'error';
          }
          
          setStatus(prev => ({ ...prev, rbacService: rbacStatus }));

          // Check user permissions
          try {
            const permissions = await rbacService.getUserPermissions();
            permsStatus = permissions ? 'loaded' : 'error';
          } catch (permsError) {
            console.error('Permissions Error:', permsError);
            permsStatus = 'error';
          }
          
          setStatus(prev => ({ ...prev, userPermissions: permsStatus }));
        }
      } catch (importError) {
        console.error('Import Error:', importError);
        setStatus(prev => ({ 
          ...prev, 
          authentication: 'unauthenticated',
          rbacService: 'error',
          userPermissions: 'error',
          error: `Import error: ${importError}`
        }));
      }
    } catch (error) {
      console.error('System Health Check Error:', error);
      setStatus(prev => ({ 
        ...prev,
        apiConnection: 'disconnected',
        authentication: 'unauthenticated',
        rbacService: 'error',
        userPermissions: 'error',
        error: `Health check failed: ${error}`
      }));
    }
  };

  useEffect(() => {
    checkSystemHealth();
  }, []);

  const getStatusIcon = (state: string) => {
    switch (state) {
      case 'connected':
      case 'authenticated':
      case 'loaded':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'disconnected':
      case 'unauthenticated':
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'checking':
        return <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (state: string) => {
    switch (state) {
      case 'connected':
      case 'authenticated':
      case 'loaded':
        return 'text-green-800 bg-green-100 border-green-200';
      case 'disconnected':
      case 'unauthenticated':
      case 'error':
        return 'text-red-800 bg-red-100 border-red-200';
      case 'checking':
        return 'text-blue-800 bg-blue-100 border-blue-200';
      default:
        return 'text-gray-800 bg-gray-100 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 mb-4">
              <Brain className="h-8 w-8 text-purple-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">RBAC System Health Check</h1>
            <p className="text-gray-600 mt-2">Diagnosing AI-Powered RBAC system connectivity and functionality</p>
          </div>

          {/* Status Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className={`p-4 rounded-lg border-2 ${getStatusColor(status.apiConnection)}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Activity className="w-6 h-6" />
                  <div>
                    <h3 className="font-semibold">API Connection</h3>
                    <p className="text-sm opacity-80">Backend connectivity</p>
                  </div>
                </div>
                {getStatusIcon(status.apiConnection)}
              </div>
            </div>

            <div className={`p-4 rounded-lg border-2 ${getStatusColor(status.authentication)}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Shield className="w-6 h-6" />
                  <div>
                    <h3 className="font-semibold">Authentication</h3>
                    <p className="text-sm opacity-80">User login status</p>
                  </div>
                </div>
                {getStatusIcon(status.authentication)}
              </div>
            </div>

            <div className={`p-4 rounded-lg border-2 ${getStatusColor(status.rbacService)}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Settings className="w-6 h-6" />
                  <div>
                    <h3 className="font-semibold">RBAC Service</h3>
                    <p className="text-sm opacity-80">Role management system</p>
                  </div>
                </div>
                {getStatusIcon(status.rbacService)}
              </div>
            </div>

            <div className={`p-4 rounded-lg border-2 ${getStatusColor(status.userPermissions)}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Crown className="w-6 h-6" />
                  <div>
                    <h3 className="font-semibold">User Permissions</h3>
                    <p className="text-sm opacity-80">Access control data</p>
                  </div>
                </div>
                {getStatusIcon(status.userPermissions)}
              </div>
            </div>
          </div>

          {/* Error Details */}
          {status.error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="font-semibold text-red-800 mb-2">Error Details:</h3>
              <pre className="text-sm text-red-700 whitespace-pre-wrap">{status.error}</pre>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={checkSystemHealth}
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Recheck System
            </button>
            
            <button
              onClick={() => window.location.href = '/login'}
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Go to Login
            </button>
            
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Go to Dashboard
            </button>
          </div>

          {/* System Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center text-sm text-gray-500">
              <p>Current URL: {typeof window !== 'undefined' ? window.location.href : 'Unknown'}</p>
              <p>Environment: {process.env.NODE_ENV || 'production'}</p>
              <p>Timestamp: {new Date().toLocaleString()}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SystemHealthCheck;