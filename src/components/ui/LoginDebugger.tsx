/**
 * Advanced Login Error Handling and Debugging for Vercel Deployment
 * This component provides comprehensive error handling and debugging for production login issues
 */

import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, RefreshCw, ExternalLink, Bug } from 'lucide-react';

interface LoginDebuggerProps {
  isVisible: boolean;
  onClose: () => void;
}

interface SystemCheck {
  name: string;
  status: 'success' | 'error' | 'warning' | 'loading';
  message: string;
  details?: string;
  action?: () => void;
}

export const LoginDebugger: React.FC<LoginDebuggerProps> = ({ isVisible, onClose }) => {
  const [checks, setChecks] = useState<SystemCheck[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runSystemChecks = async () => {
    setIsRunning(true);
    setChecks([]);

    const newChecks: SystemCheck[] = [];

    // Check 1: Environment Variables
    newChecks.push({
      name: 'Environment Variables',
      status: 'loading',
      message: 'Checking environment configuration...'
    });

    await new Promise(resolve => setTimeout(resolve, 500));

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL;
    const nodeEnv = process.env.NODE_ENV;
    
    if (!apiBaseUrl) {
      newChecks[0] = {
        name: 'Environment Variables',
        status: 'error',
        message: 'API Base URL not configured',
        details: `Missing NEXT_PUBLIC_API_BASE_URL. Current ENV: ${nodeEnv}. Expected production URL: https://rejlers-backend-production.up.railway.app/api/v1`,
        action: () => window.open('https://vercel.com/docs/concepts/projects/environment-variables', '_blank')
      };
    } else if (apiBaseUrl.includes('localhost') && nodeEnv === 'production') {
      newChecks[0] = {
        name: 'Environment Variables', 
        status: 'error',
        message: 'Using localhost URL in production',
        details: `Current API URL: ${apiBaseUrl}. This will not work in production. Should be: https://rejlers-backend-production.up.railway.app/api/v1`,
        action: () => window.open('https://vercel.com/docs/concepts/projects/environment-variables', '_blank')
      };
    } else {
      newChecks[0] = {
        name: 'Environment Variables',
        status: 'success',
        message: `Environment: ${nodeEnv}`,
        details: `API URL: ${apiBaseUrl}\nWebSocket URL: ${wsUrl || 'Not set'}\nCorrect production configuration detected`
      };
    }

    setChecks([...newChecks]);

    // Check 2: Backend Connectivity
    newChecks.push({
      name: 'Backend Connectivity',
      status: 'loading',
      message: 'Testing backend connection...'
    });

    setChecks([...newChecks]);

    try {
      const baseUrl = apiBaseUrl || 'https://rejlers-backend-production.up.railway.app/api/v1';
      const response = await fetch(`${baseUrl}/health/`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        newChecks[1] = {
          name: 'Backend Connectivity',
          status: 'success',
          message: 'Backend is reachable',
          details: `Status: ${response.status} ${response.statusText}`
        };
      } else {
        newChecks[1] = {
          name: 'Backend Connectivity',
          status: 'error',
          message: 'Backend returned error',
          details: `Status: ${response.status} ${response.statusText}`,
          action: () => window.open('https://railway.app/', '_blank')
        };
      }
    } catch (error) {
      newChecks[1] = {
        name: 'Backend Connectivity',
        status: 'error',
        message: 'Cannot reach backend',
        details: error instanceof Error ? error.message : 'Network error',
        action: () => window.open('https://railway.app/', '_blank')
      };
    }

    setChecks([...newChecks]);

    // Check 3: CORS Configuration
    newChecks.push({
      name: 'CORS Configuration',
      status: 'loading',
      message: 'Checking CORS settings...'
    });

    setChecks([...newChecks]);

    try {
      const baseUrl = apiBaseUrl || 'https://rejlers-backend-production.up.railway.app/api/v1';
      const corsResponse = await fetch(`${baseUrl}/auth/test-cors/`, {
        method: 'OPTIONS',
        mode: 'cors',
        headers: {
          'Origin': window.location.origin,
          'Access-Control-Request-Method': 'POST',
          'Access-Control-Request-Headers': 'Content-Type',
        },
      });

      newChecks[2] = {
        name: 'CORS Configuration',
        status: corsResponse.ok ? 'success' : 'warning',
        message: corsResponse.ok ? 'CORS is configured' : 'CORS may need adjustment',
        details: `Preflight response: ${corsResponse.status}`
      };
    } catch (error) {
      newChecks[2] = {
        name: 'CORS Configuration',
        status: 'warning',
        message: 'CORS check inconclusive',
        details: 'This is normal for some backends'
      };
    }

    setChecks([...newChecks]);

    // Check 4: Local Storage
    newChecks.push({
      name: 'Browser Storage',
      status: 'loading',
      message: 'Checking browser storage...'
    });

    setChecks([...newChecks]);

    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      
      newChecks[3] = {
        name: 'Browser Storage',
        status: 'success',
        message: 'Local storage is available',
        details: 'Authentication tokens can be stored'
      };
    } catch (error) {
      newChecks[3] = {
        name: 'Browser Storage',
        status: 'error',
        message: 'Local storage blocked',
        details: 'Check browser privacy settings',
        action: () => alert('Please enable local storage in your browser settings')
      };
    }

    setChecks([...newChecks]);
    setIsRunning(false);
  };

  useEffect(() => {
    if (isVisible) {
      runSystemChecks();
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bug className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Login Diagnostics</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-gray-600 mt-2">
            Diagnosing login issues for production deployment
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Action Buttons */}
          <div className="flex space-x-3 mb-6">
            <button
              onClick={runSystemChecks}
              disabled={isRunning}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${isRunning ? 'animate-spin' : ''}`} />
              <span>{isRunning ? 'Running...' : 'Run Diagnostics'}</span>
            </button>
            
            <a
              href="https://vercel.com/docs/concepts/projects/environment-variables"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Vercel Docs</span>
            </a>
          </div>

          {/* Checks Results */}
          <div className="space-y-4">
            {checks.map((check, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-l-4 ${
                  check.status === 'success'
                    ? 'bg-green-50 border-green-400'
                    : check.status === 'error'
                    ? 'bg-red-50 border-red-400'
                    : check.status === 'warning'
                    ? 'bg-yellow-50 border-yellow-400'
                    : 'bg-blue-50 border-blue-400'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {check.status === 'success' && <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />}
                    {check.status === 'error' && <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />}
                    {check.status === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />}
                    {check.status === 'loading' && <RefreshCw className="w-5 h-5 text-blue-600 mt-0.5 animate-spin" />}
                    
                    <div>
                      <h3 className="font-medium text-gray-900">{check.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{check.message}</p>
                      {check.details && (
                        <p className="text-xs text-gray-500 mt-2 font-mono">{check.details}</p>
                      )}
                    </div>
                  </div>
                  
                  {check.action && (
                    <button
                      onClick={check.action}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Fix
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {checks.length > 0 && !isRunning && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Quick Fixes:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Set NEXT_PUBLIC_API_BASE_URL in Vercel environment variables</li>
                <li>• Ensure backend is deployed and running on Railway</li>
                <li>• Check CORS settings in Django backend</li>
                <li>• Verify authentication endpoints are accessible</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginDebugger;
