'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  UserIcon,
  EyeIcon,
  CurrencyDollarIcon,
  ClockIcon,
  SparklesIcon,
  SignalIcon,
} from '@heroicons/react/24/outline';
import { DASHBOARD_CONFIG } from '../../config/dashboard.config';

interface MetricData {
  id: string;
  name: string;
  value: number;
  previousValue: number;
  unit: string;
  format: 'number' | 'currency' | 'percentage' | 'time';
  icon: React.ComponentType<any>;
  color: string;
  target?: number;
  description: string;
}

interface RealTimeMetricsProps {
  className?: string;
  updateInterval?: number;
}

const RealTimeMetrics: React.FC<RealTimeMetricsProps> = ({
  className = '',
  updateInterval = 5000,
}) => {
  const [metrics, setMetrics] = useState<MetricData[]>([]);
  const [isOnline, setIsOnline] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout>();

  // Initialize metrics
  useEffect(() => {
    const initializeMetrics = () => {
      const initialMetrics: MetricData[] = [
        {
          id: 'active_users',
          name: 'Active Users',
          value: 234,
          previousValue: 198,
          unit: 'users',
          format: 'number',
          icon: UserIcon,
          color: 'text-blue-600',
          target: 300,
          description: 'Currently online users',
        },
        {
          id: 'page_views',
          name: 'Page Views',
          value: 1247,
          previousValue: 1198,
          unit: 'views',
          format: 'number',
          icon: EyeIcon,
          color: 'text-green-600',
          target: 1500,
          description: 'Total page views today',
        },
        {
          id: 'revenue_today',
          name: 'Revenue Today',
          value: 8945,
          previousValue: 7823,
          unit: 'USD',
          format: 'currency',
          icon: CurrencyDollarIcon,
          color: 'text-purple-600',
          target: 10000,
          description: 'Revenue generated today',
        },
        {
          id: 'conversion_rate',
          name: 'Conversion Rate',
          value: 3.24,
          previousValue: 2.98,
          unit: '%',
          format: 'percentage',
          icon: ChartBarIcon,
          color: 'text-orange-600',
          target: 4.0,
          description: 'Visitor to customer conversion',
        },
        {
          id: 'avg_session',
          name: 'Avg Session',
          value: 294,
          previousValue: 267,
          unit: 'seconds',
          format: 'time',
          icon: ClockIcon,
          color: 'text-indigo-600',
          target: 300,
          description: 'Average session duration',
        },
      ];

      setMetrics(initialMetrics);
      setIsLoading(false);
    };

    initializeMetrics();
  }, []);

  // Real-time updates
  useEffect(() => {
    if (DASHBOARD_CONFIG.FEATURES.REAL_TIME.ENABLED) {
      intervalRef.current = setInterval(() => {
        updateMetrics();
      }, updateInterval);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [updateInterval]);

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Update metrics with simulated real-time data
  const updateMetrics = () => {
    setMetrics(prevMetrics => 
      prevMetrics.map(metric => {
        // Simulate realistic data changes
        const changePercent = (Math.random() - 0.5) * 0.1; // ±5% change
        const newValue = Math.max(0, metric.value * (1 + changePercent));
        
        return {
          ...metric,
          previousValue: metric.value,
          value: Math.round(newValue * 100) / 100, // Round to 2 decimal places
        };
      })
    );
    
    setLastUpdate(new Date());
  };

  // Format value based on type
  const formatValue = (value: number, format: MetricData['format'], unit: string) => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(value);
      
      case 'percentage':
        return `${value.toFixed(2)}%`;
      
      case 'time':
        const minutes = Math.floor(value / 60);
        const seconds = Math.floor(value % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
      
      case 'number':
      default:
        if (value >= 1000000) {
          return `${(value / 1000000).toFixed(1)}M`;
        }
        if (value >= 1000) {
          return `${(value / 1000).toFixed(1)}K`;
        }
        return value.toString();
    }
  };

  // Calculate change percentage
  const calculateChange = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  // Get progress towards target
  const getTargetProgress = (current: number, target?: number) => {
    if (!target) return 0;
    return Math.min(100, (current / target) * 100);
  };

  // Format time ago
  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  if (isLoading) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 ${className}`}>
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="bg-gray-200 dark:bg-gray-700 rounded-lg h-32 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <SignalIcon className={`w-6 h-6 mr-3 ${isOnline ? 'text-green-500' : 'text-red-500'}`} />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Real-Time Metrics
          </h3>
          <div className={`ml-3 w-2 h-2 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
        </div>
        
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Last update: {formatTimeAgo(lastUpdate)}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {metrics.map((metric, index) => {
          const change = calculateChange(metric.value, metric.previousValue);
          const isPositiveChange = change > 0;
          const targetProgress = getTargetProgress(metric.value, metric.target);

          return (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-16 h-16 opacity-5">
                <metric.icon className="w-full h-full" />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg bg-gray-50 dark:bg-gray-700 ${metric.color}`}>
                  <metric.icon className="w-5 h-5" />
                </div>
                
                {/* Live Indicator */}
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">LIVE</span>
                </div>
              </div>

              {/* Value */}
              <div className="mb-2">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatValue(metric.value, metric.format, metric.unit)}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {metric.name}
                </p>
              </div>

              {/* Change Indicator */}
              <div className="flex items-center justify-between mb-3">
                <div className={`flex items-center ${
                  isPositiveChange ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-500'
                }`}>
                  {change !== 0 && (
                    <>
                      {isPositiveChange ? (
                        <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
                      ) : (
                        <ArrowTrendingDownIcon className="w-4 h-4 mr-1" />
                      )}
                      <span className="text-sm font-medium">
                        {Math.abs(change).toFixed(1)}%
                      </span>
                    </>
                  )}
                </div>
                
                {DASHBOARD_CONFIG.AI_SERVICES.OPENAI.ENABLED && (
                  <SparklesIcon className="w-4 h-4 text-blue-500 opacity-60" />
                )}
              </div>

              {/* Target Progress */}
              {metric.target && (
                <div className="mb-2">
                  <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                    <span>Target Progress</span>
                    <span>{targetProgress.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${targetProgress}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className={`h-2 rounded-full ${
                        targetProgress >= 100 ? 'bg-green-500' :
                        targetProgress >= 75 ? 'bg-blue-500' :
                        targetProgress >= 50 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                    />
                  </div>
                </div>
              )}

              {/* Description */}
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {metric.description}
              </p>

              {/* Pulse Animation for Updates */}
              <motion.div
                key={metric.value}
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 pointer-events-none"
              />
            </motion.div>
          );
        })}
      </div>

      {/* Status Footer */}
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center">
          <div className={`w-2 h-2 rounded-full mr-2 ${
            isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'
          }`} />
          <span>
            {isOnline ? 'Connected' : 'Disconnected'} • 
            Updates every {updateInterval / 1000}s
          </span>
        </div>
        
        {DASHBOARD_CONFIG.AI_SERVICES.OPENAI.ENABLED && (
          <div className="flex items-center">
            <SparklesIcon className="w-4 h-4 mr-1 text-blue-500" />
            <span>AI-Enhanced Monitoring</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RealTimeMetrics;