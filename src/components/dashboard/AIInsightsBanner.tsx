'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SparklesIcon,
  XMarkIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  LightBulbIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { DASHBOARD_CONFIG } from '../../config/dashboard.config';

interface AIInsight {
  id: string;
  type: 'recommendation' | 'alert' | 'trend' | 'optimization' | 'prediction';
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  module?: string;
  confidence: number;
  timestamp: Date;
  actions?: Array<{
    label: string;
    action: string;
    type: 'primary' | 'secondary';
  }>;
  data?: {
    value?: number;
    change?: number;
    period?: string;
    metrics?: Record<string, any>;
  };
}

interface AIInsightsBannerProps {
  className?: string;
  maxVisible?: number;
  autoRotate?: boolean;
  rotationInterval?: number;
}

const AIInsightsBanner: React.FC<AIInsightsBannerProps> = ({
  className = '',
  maxVisible = 3,
  autoRotate = true,
  rotationInterval = 8000,
}) => {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [dismissedInsights, setDismissedInsights] = useState<Set<string>>(new Set());

  // Load AI insights
  useEffect(() => {
    const loadInsights = async () => {
      setIsLoading(true);
      try {
        // Simulate AI-generated insights
        const mockInsights: AIInsight[] = [
          {
            id: '1',
            type: 'trend',
            title: 'Sales Performance Trending Up',
            content: 'Your sales have increased by 23% compared to last month. The upward trend is driven primarily by enterprise clients and Q4 seasonal patterns.',
            priority: 'high',
            module: 'analytics',
            confidence: 0.92,
            timestamp: new Date(Date.now() - 10 * 60000),
            actions: [
              { label: 'View Analytics', action: 'view-analytics', type: 'primary' },
              { label: 'Set Target', action: 'set-target', type: 'secondary' },
            ],
            data: {
              value: 125400,
              change: 23,
              period: 'last month',
              metrics: { enterprise: 45, retail: 55 },
            },
          },
          {
            id: '2',
            type: 'recommendation',
            title: 'Optimize Client Follow-up Strategy',
            content: 'I noticed 15 high-value prospects haven\'t been contacted in over 7 days. Based on historical data, following up now could increase conversion by 34%.',
            priority: 'medium',
            module: 'contacts',
            confidence: 0.87,
            timestamp: new Date(Date.now() - 30 * 60000),
            actions: [
              { label: 'Review Contacts', action: 'review-contacts', type: 'primary' },
              { label: 'Schedule Follow-ups', action: 'schedule-followups', type: 'secondary' },
            ],
            data: {
              value: 15,
              change: 34,
              period: 'potential increase',
            },
          },
          {
            id: '3',
            type: 'alert',
            title: 'Cash Flow Attention Required',
            content: 'Outstanding invoices totaling $47,200 are overdue by more than 30 days. Immediate action recommended to maintain healthy cash flow.',
            priority: 'critical',
            module: 'finance',
            confidence: 0.98,
            timestamp: new Date(Date.now() - 60 * 60000),
            actions: [
              { label: 'Review Invoices', action: 'review-invoices', type: 'primary' },
              { label: 'Send Reminders', action: 'send-reminders', type: 'secondary' },
            ],
            data: {
              value: 47200,
              period: 'overdue 30+ days',
            },
          },
          {
            id: '4',
            type: 'optimization',
            title: 'Meeting Schedule Optimization',
            content: 'Your calendar analysis shows 40% of meetings could be more efficient. I can suggest optimal time slots and meeting consolidation opportunities.',
            priority: 'medium',
            module: 'calendar',
            confidence: 0.79,
            timestamp: new Date(Date.now() - 2 * 60 * 60000),
            actions: [
              { label: 'Optimize Schedule', action: 'optimize-schedule', type: 'primary' },
              { label: 'View Analysis', action: 'view-analysis', type: 'secondary' },
            ],
            data: {
              value: 40,
              change: -25,
              period: 'efficiency improvement',
            },
          },
          {
            id: '5',
            type: 'prediction',
            title: 'Q4 Revenue Forecast',
            content: 'Based on current trends and historical data, I predict Q4 revenue will reach $389K (±5%). Key growth drivers: enterprise deals and recurring subscriptions.',
            priority: 'high',
            module: 'analytics',
            confidence: 0.94,
            timestamp: new Date(Date.now() - 4 * 60 * 60000),
            actions: [
              { label: 'View Forecast', action: 'view-forecast', type: 'primary' },
              { label: 'Adjust Strategy', action: 'adjust-strategy', type: 'secondary' },
            ],
            data: {
              value: 389000,
              change: 12,
              period: 'Q4 prediction',
              metrics: { confidence: 95, variance: 5 },
            },
          },
        ];

        setInsights(mockInsights);
      } catch (error) {
        console.error('Error loading AI insights:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (DASHBOARD_CONFIG.AI_SERVICES.OPENAI.ENABLED) {
      loadInsights();
    } else {
      setIsLoading(false);
    }
  }, []);

  // Auto-rotate insights
  useEffect(() => {
    if (autoRotate && insights.length > maxVisible) {
      const interval = setInterval(() => {
        setCurrentIndex(prev => 
          prev + maxVisible >= insights.length ? 0 : prev + 1
        );
      }, rotationInterval);

      return () => clearInterval(interval);
    }
  }, [autoRotate, insights.length, maxVisible, rotationInterval]);

  // Get filtered insights (not dismissed)
  const activeInsights = insights.filter(insight => !dismissedInsights.has(insight.id));
  
  // Get visible insights
  const visibleInsights = activeInsights.slice(currentIndex, currentIndex + maxVisible);

  // Dismiss insight
  const dismissInsight = (insightId: string) => {
    setDismissedInsights(prev => {
      const newSet = new Set(prev);
      newSet.add(insightId);
      return newSet;
    });
  };

  // Handle action
  const handleAction = (action: string, insight: AIInsight) => {
    console.log(`Executing action: ${action} for insight: ${insight.id}`);
    // Implement specific actions based on the action type
  };

  // Navigate insights
  const navigateInsights = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentIndex(prev => prev > 0 ? prev - 1 : Math.max(0, activeInsights.length - maxVisible));
    } else {
      setCurrentIndex(prev => prev + maxVisible < activeInsights.length ? prev + 1 : 0);
    }
  };

  // Get insight icon
  const getInsightIcon = (type: AIInsight['type']) => {
    switch (type) {
      case 'recommendation':
        return LightBulbIcon;
      case 'alert':
        return ExclamationTriangleIcon;
      case 'trend':
        return ArrowTrendingUpIcon;
      case 'optimization':
        return SparklesIcon;
      case 'prediction':
        return InformationCircleIcon;
      default:
        return SparklesIcon;
    }
  };

  // Get insight colors
  const getInsightColors = (priority: AIInsight['priority'], type: AIInsight['type']) => {
    if (priority === 'critical') {
      return {
        bg: 'bg-red-50 dark:bg-red-900/20',
        border: 'border-red-200 dark:border-red-800',
        text: 'text-red-800 dark:text-red-200',
        accent: 'text-red-600',
      };
    }
    
    if (priority === 'high') {
      return {
        bg: 'bg-orange-50 dark:bg-orange-900/20',
        border: 'border-orange-200 dark:border-orange-800',
        text: 'text-orange-800 dark:text-orange-200',
        accent: 'text-orange-600',
      };
    }

    if (type === 'trend') {
      return {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        border: 'border-blue-200 dark:border-blue-800',
        text: 'text-blue-800 dark:text-blue-200',
        accent: 'text-blue-600',
      };
    }

    return {
      bg: 'bg-gray-50 dark:bg-gray-800/50',
      border: 'border-gray-200 dark:border-gray-700',
      text: 'text-gray-800 dark:text-gray-200',
      accent: 'text-gray-600',
    };
  };

  // Format confidence
  const formatConfidence = (confidence: number) => {
    return `${Math.round(confidence * 100)}%`;
  };

  if (!DASHBOARD_CONFIG.AI_SERVICES.OPENAI.ENABLED) {
    return null;
  }

  if (isLoading) {
    return (
      <div className={`space-y-4 ${className}`}>
        {Array.from({ length: maxVisible }).map((_, index) => (
          <div
            key={index}
            className="bg-gray-200 dark:bg-gray-700 rounded-lg h-24 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (activeInsights.length === 0) {
    return (
      <div className={`bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center ${className}`}>
        <SparklesIcon className="w-8 h-8 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-600 dark:text-gray-400">
          No AI insights available at the moment. Check back later for personalized recommendations.
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <SparklesIcon className="w-6 h-6 text-blue-600 mr-3" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            AI Insights
          </h3>
          <span className="ml-2 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">
            {activeInsights.length}
          </span>
        </div>

        {/* Navigation */}
        {activeInsights.length > maxVisible && (
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigateInsights('prev')}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </motion.button>
            
            <div className="flex space-x-1">
              {Array.from({ length: Math.ceil(activeInsights.length / maxVisible) }).map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    Math.floor(currentIndex / maxVisible) === index
                      ? 'bg-blue-600'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigateInsights('next')}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </motion.button>
          </div>
        )}
      </div>

      {/* Insights */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-3"
        >
          {visibleInsights.map((insight, index) => {
            const Icon = getInsightIcon(insight.type);
            const colors = getInsightColors(insight.priority, insight.type);

            return (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  relative p-4 rounded-lg border ${colors.bg} ${colors.border}
                  hover:shadow-md transition-all duration-300
                `}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start flex-1">
                    <div className={`p-2 rounded-lg bg-white dark:bg-gray-800 ${colors.accent} mr-3 mt-1`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className={`font-semibold ${colors.text}`}>
                          {insight.title}
                        </h4>
                        
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatConfidence(insight.confidence)} confident
                          </span>
                          
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => dismissInsight(insight.id)}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          >
                            <XMarkIcon className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                      
                      <p className={`text-sm ${colors.text} opacity-90 mb-3`}>
                        {insight.content}
                      </p>

                      {/* Data Visualization */}
                      {insight.data && (
                        <div className="mb-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              {insight.data.value && (
                                <div className="text-lg font-bold text-gray-900 dark:text-white">
                                  {typeof insight.data.value === 'number' && insight.data.value > 1000
                                    ? `$${(insight.data.value / 1000).toFixed(1)}K`
                                    : insight.data.value
                                  }
                                </div>
                              )}
                              {insight.data.period && (
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  {insight.data.period}
                                </div>
                              )}
                            </div>
                            
                            {insight.data.change && (
                              <div className={`flex items-center ${
                                insight.data.change > 0 ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {insight.data.change > 0 ? (
                                  <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
                                ) : (
                                  <ArrowTrendingDownIcon className="w-4 h-4 mr-1" />
                                )}
                                <span className="text-sm font-medium">
                                  {insight.data.change > 0 ? '+' : ''}{insight.data.change}%
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      {insight.actions && insight.actions.length > 0 && (
                        <div className="flex space-x-2">
                          {insight.actions.map((action) => (
                            <motion.button
                              key={action.action}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleAction(action.action, insight)}
                              className={`
                                px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                                ${action.type === 'primary'
                                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                                }
                              `}
                            >
                              {action.label}
                            </motion.button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Priority Indicator */}
                <div className={`absolute top-2 left-2 w-3 h-3 rounded-full ${
                  insight.priority === 'critical' ? 'bg-red-500' :
                  insight.priority === 'high' ? 'bg-orange-500' :
                  insight.priority === 'medium' ? 'bg-yellow-500' :
                  'bg-blue-500'
                } animate-pulse`} />
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AIInsightsBanner;