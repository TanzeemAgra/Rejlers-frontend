/**
 * Authentication Debug Component
 * Allows admins to test authentication and troubleshoot token issues
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, RefreshCw, AlertTriangle, CheckCircle, Bug, Key } from 'lucide-react';
import { enhancedAuthService } from '@/lib/enhancedAuthService';
import { authConfig } from '@/config/authConfig';

interface AuthDebugProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthDebugModal: React.FC<AuthDebugProps> = ({ isOpen, onClose }) => {
  const [debugResults, setDebugResults] = useState<any>(null);
  const [isRunning, setIsRunning] = useState(false);

  const runDebugTests = async () => {
    setIsRunning(true);
    setDebugResults(null);

    try {
      const results: any = {
        timestamp: new Date().toISOString(),
        tests: []
      };

      // Test 1: Check stored tokens
      const accessToken = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');
      const userData = localStorage.getItem('user_data');

      results.tests.push({
        name: 'Token Storage Check',
        status: accessToken ? 'success' : 'warning',
        details: {
          accessToken: accessToken ? `Present (${accessToken.length} chars)` : 'Missing',
          refreshToken: refreshToken ? `Present (${refreshToken.length} chars)` : 'Missing',
          userData: userData ? 'Present' : 'Missing'
        }
      });

      // Test 2: Check if authenticated
      const isAuthenticated = enhancedAuthService.isAuthenticated();
      results.tests.push({
        name: 'Authentication Status',
        status: isAuthenticated ? 'success' : 'error',
        details: { isAuthenticated }
      });

      // Test 3: Try to get auth header
      try {
        const authHeader = await enhancedAuthService.getAuthHeader();
        results.tests.push({
          name: 'Auth Header Generation',
          status: authHeader.Authorization ? 'success' : 'error',
          details: {
            hasAuthHeader: !!authHeader.Authorization,
            header: authHeader.Authorization ? `${authHeader.Authorization.substring(0, 20)}...` : 'None'
          }
        });
      } catch (error) {
        results.tests.push({
          name: 'Auth Header Generation',
          status: 'error',
          details: { error: error instanceof Error ? error.message : 'Unknown error' }
        });
      }

      // Test 4: Try to get current user
      try {
        const currentUser = await enhancedAuthService.getCurrentUser();
        results.tests.push({
          name: 'Current User Fetch',
          status: currentUser ? 'success' : 'warning',
          details: currentUser ? {
            id: currentUser.id,
            email: currentUser.email,
            role: currentUser.role,
            is_superuser: currentUser.is_superuser
          } : { message: 'No user data' }
        });
      } catch (error) {
        results.tests.push({
          name: 'Current User Fetch',
          status: 'error',
          details: { error: error instanceof Error ? error.message : 'Unknown error' }
        });
      }

      // Test 5: Check permissions
      try {
        const hasPermission = await enhancedAuthService.checkPermission('user_management', 'create');
        results.tests.push({
          name: 'Permission Check (user_management.create)',
          status: hasPermission ? 'success' : 'warning',
          details: { hasPermission }
        });
      } catch (error) {
        results.tests.push({
          name: 'Permission Check',
          status: 'error',
          details: { error: error instanceof Error ? error.message : 'Unknown error' }
        });
      }

      // Test 6: Configuration check
      results.tests.push({
        name: 'Configuration Check',
        status: 'info',
        details: {
          debugMode: authConfig.debugMode,
          automaticRefresh: authConfig.automaticRefresh,
          tokenRefreshThreshold: authConfig.tokenRefreshThreshold,
          maxRetryAttempts: authConfig.maxRetryAttempts
        }
      });

      setDebugResults(results);
    } catch (error) {
      setDebugResults({
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    } finally {
      setIsRunning(false);
    }
  };

  const refreshTokens = async () => {
    setIsRunning(true);
    try {
      const success = await enhancedAuthService.refreshAccessToken();
      alert(success ? 'Token refreshed successfully!' : 'Token refresh failed!');
      
      if (success) {
        // Re-run debug tests to show updated state
        await runDebugTests();
      }
    } catch (error) {
      alert(`Token refresh error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsRunning(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Shield className="h-5 w-5 text-blue-500" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Bug className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Authentication Debug</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-4">
            <div className="flex space-x-4">
              <button
                onClick={runDebugTests}
                disabled={isRunning}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <Bug className="h-4 w-4" />
                <span>{isRunning ? 'Running Tests...' : 'Run Debug Tests'}</span>
              </button>

              <button
                onClick={refreshTokens}
                disabled={isRunning}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                <RefreshCw className={`h-4 w-4 ${isRunning ? 'animate-spin' : ''}`} />
                <span>Refresh Tokens</span>
              </button>
            </div>

            {debugResults && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Debug Results</h3>
                  <p className="text-sm text-gray-600">
                    Timestamp: {new Date(debugResults.timestamp).toLocaleString()}
                  </p>
                </div>

                {debugResults.error ? (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      <span className="font-semibold text-red-900">Error</span>
                    </div>
                    <p className="text-red-700 mt-2">{debugResults.error}</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {debugResults.tests?.map((test: any, index: number) => (
                      <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center space-x-3 mb-2">
                          {getStatusIcon(test.status)}
                          <h4 className="font-semibold text-gray-900">{test.name}</h4>
                        </div>
                        <div className="ml-8">
                          <pre className="text-sm text-gray-600 whitespace-pre-wrap">
                            {JSON.stringify(test.details, null, 2)}
                          </pre>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <div className="flex items-center space-x-2 mb-2">
                <Key className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-blue-900">Troubleshooting Tips</span>
              </div>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• If tokens are missing, try logging out and logging back in</li>
                <li>• If permission check fails, ensure your role has user_management.create permission</li>
                <li>• If auth header generation fails, your token may be expired</li>
                <li>• Use the "Refresh Tokens" button to renew expired access tokens</li>
                <li>• Check the browser console for additional error details</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};