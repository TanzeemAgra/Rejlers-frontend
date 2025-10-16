'use client';

import React from 'react';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; reset: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  reset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      const { error } = this.state;
      
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={error!} reset={this.reset} />;
      }

      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="max-w-2xl mx-auto text-center px-4">
            <div className="mb-8">
              <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-100">
                <AlertTriangle className="h-10 w-10 text-red-600" />
              </div>
              <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
                Something went wrong
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                The AI-Powered RBAC system encountered an unexpected error.
              </p>
            </div>
            
            {process.env.NODE_ENV === 'development' && error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
                <h3 className="text-sm font-medium text-red-800 flex items-center mb-2">
                  <Bug className="w-4 h-4 mr-1" />
                  Development Error Details:
                </h3>
                <pre className="text-xs text-red-700 overflow-auto max-h-40">
                  {error.message}
                  {error.stack && `\n\nStack trace:\n${error.stack}`}
                </pre>
              </div>
            )}

            <div className="space-y-4">
              <button
                onClick={this.reset}
                className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Try Again
              </button>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => window.location.href = '/dashboard'}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Go to Dashboard
                </button>
                
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reload Page
                </button>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-sm font-medium text-blue-800 mb-2">Troubleshooting Tips:</h3>
              <ul className="text-sm text-blue-700 text-left space-y-1">
                <li>• Check your internet connection</li>
                <li>• Ensure you're logged in with proper admin privileges</li>
                <li>• Try refreshing the page or clearing browser cache</li>
                <li>• Verify the backend API is running and accessible</li>
                {process.env.NODE_ENV === 'development' && (
                  <li>• Check the browser console for additional error details</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Higher-order component for easier usage
export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ComponentType<{ error: Error; reset: () => void }>
) => {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  );
  
  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  return WrappedComponent;
};

export default ErrorBoundary;