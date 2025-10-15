'use client';

import React, { useState, useEffect } from 'react';

interface ConnectivityTestResult {
  url: string;
  status: 'testing' | 'success' | 'failed';
  responseTime?: number;
  error?: string;
  statusCode?: number;
}

const ConnectivityTest = () => {
  const [tests, setTests] = useState<ConnectivityTestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const endpoints = [
    'https://rejlers-backend-production.up.railway.app/health/',
    'https://rejlers-backend-production.up.railway.app/api/v1/health/',
    'https://rejlers-backend-production.up.railway.app/',
    'https://rejlers-backend-production.up.railway.app/api/v1/',
  ];

  const testEndpoint = async (url: string): Promise<ConnectivityTestResult> => {
    const startTime = Date.now();
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      const responseTime = Date.now() - startTime;
      
      return {
        url,
        status: response.ok ? 'success' : 'failed',
        responseTime,
        statusCode: response.status,
        error: response.ok ? undefined : `HTTP ${response.status}`,
      };
    } catch (error) {
      const responseTime = Date.now() - startTime;
      return {
        url,
        status: 'failed',
        responseTime,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  };

  const runTests = async () => {
    setIsRunning(true);
    setTests([]);

    for (const endpoint of endpoints) {
      setTests(prev => [...prev, { url: endpoint, status: 'testing' }]);
      
      const result = await testEndpoint(endpoint);
      
      setTests(prev => 
        prev.map(test => 
          test.url === endpoint ? result : test
        )
      );
      
      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    setIsRunning(false);
  };

  useEffect(() => {
    runTests();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'testing': return 'text-yellow-600';
      case 'success': return 'text-green-600';
      case 'failed': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'testing': return '⏳';
      case 'success': return '✅';
      case 'failed': return '❌';
      default: return '❓';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Backend Connectivity Test
            </h1>
            <button
              onClick={runTests}
              disabled={isRunning}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isRunning ? 'Testing...' : 'Run Tests Again'}
            </button>
          </div>

          <div className="space-y-4">
            {tests.map((test, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{getStatusIcon(test.status)}</span>
                    <span className={`font-medium ${getStatusColor(test.status)}`}>
                      {test.status.toUpperCase()}
                    </span>
                  </div>
                  {test.responseTime && (
                    <span className="text-sm text-gray-500">
                      {test.responseTime}ms
                    </span>
                  )}
                </div>
                
                <div className="text-sm text-gray-600 mb-2">
                  <strong>URL:</strong> {test.url}
                </div>
                
                {test.statusCode && (
                  <div className="text-sm text-gray-600 mb-2">
                    <strong>Status Code:</strong> {test.statusCode}
                  </div>
                )}
                
                {test.error && (
                  <div className="text-sm text-red-600">
                    <strong>Error:</strong> {test.error}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">Environment Info:</h3>
            <div className="text-sm text-blue-700 space-y-1">
              <div><strong>Environment:</strong> {process.env.NODE_ENV}</div>
              <div><strong>API Base URL:</strong> {process.env.NEXT_PUBLIC_API_BASE_URL || 'Not set'}</div>
              <div><strong>WS URL:</strong> {process.env.NEXT_PUBLIC_WS_URL || 'Not set'}</div>
              <div><strong>Backend URL:</strong> {process.env.NEXT_PUBLIC_BACKEND_URL || 'Not set'}</div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <a
              href="/login"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              ← Back to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectivityTest;