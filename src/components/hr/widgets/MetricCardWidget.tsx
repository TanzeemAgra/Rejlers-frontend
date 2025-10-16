/**
 * Metric Card Widget Component
 * ===========================
 * 
 * A flexible metric card widget that displays key performance indicators
 * with trends, comparisons, and real-time updates.
 */

'use client';

import React from 'react';
import { MetricCardConfig, WidgetConfig } from '@/config/hrDashboardConfig';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Target, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Edit,
  Trash2
} from 'lucide-react';
import { motion } from 'framer-motion';

interface MetricCardWidgetProps {
  config: MetricCardConfig;
  data: any;
  isCustomizing: boolean;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<WidgetConfig>) => void;
  onRemove: () => void;
  theme: 'light' | 'dark';
  density: 'compact' | 'comfortable' | 'spacious';
}

const MetricCardWidget: React.FC<MetricCardWidgetProps> = ({
  config,
  data,
  isCustomizing,
  isSelected,
  onSelect,
  onUpdate,
  onRemove,
  theme,
  density
}) => {
  const metric = config.metric;
  const actualValue = data.value ?? metric.value;
  const actualTrend = data.trend ?? metric.trend;
  const actualStatus = data.status ?? metric.status;

  const formatValue = (value: number | string, format: string): string => {
    if (typeof value === 'string') return value;

    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(value);
      case 'percentage':
        return `${value.toFixed(1)}%`;
      case 'duration':
        if (value < 60) return `${value}s`;
        if (value < 3600) return `${(value / 60).toFixed(1)}m`;
        return `${(value / 3600).toFixed(1)}h`;
      case 'number':
        return new Intl.NumberFormat('en-US').format(value);
      default:
        return value.toString();
    }
  };

  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case 'up':
        return <TrendingUp className="w-4 h-4" />;
      case 'down':
        return <TrendingDown className="w-4 h-4" />;
      default:
        return <Minus className="w-4 h-4" />;
    }
  };

  const getTrendColor = (direction: string, isPositive: boolean = true) => {
    if (direction === 'stable') return 'text-gray-500';
    
    const isGoodTrend = (direction === 'up' && isPositive) || (direction === 'down' && !isPositive);
    return isGoodTrend ? 'text-green-600' : 'text-red-600';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'critical':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <CheckCircle className="w-4 h-4" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4" />;
      case 'critical':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getDensityPadding = () => {
    switch (density) {
      case 'compact':
        return 'p-3';
      case 'spacious':
        return 'p-8';
      default:
        return 'p-6';
    }
  };

  const cardClasses = `
    relative bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700
    ${getDensityPadding()}
    ${isCustomizing ? 'cursor-pointer hover:shadow-lg transition-all duration-200' : ''}
    ${isSelected ? 'ring-2 ring-blue-500 shadow-lg' : ''}
    ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
  `;

  return (
    <motion.div
      className={cardClasses}
      onClick={isCustomizing ? onSelect : undefined}
      whileHover={isCustomizing ? { scale: 1.02 } : {}}
      layout
    >
      {/* Customization Controls */}
      {isCustomizing && isSelected && (
        <div className="absolute top-2 right-2 flex space-x-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Open edit modal
            }}
            className="p-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            title="Edit Widget"
          >
            <Edit className="w-3 h-3" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="p-1 bg-red-600 text-white rounded hover:bg-red-700"
            title="Remove Widget"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          {config.icon && (
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <div className="text-blue-600 dark:text-blue-400">
                {config.icon}
              </div>
            </div>
          )}
          <div>
            <h3 className="font-semibold text-sm text-gray-600 dark:text-gray-400">
              {config.title}
            </h3>
            {config.subtitle && (
              <p className="text-xs text-gray-500 dark:text-gray-500">
                {config.subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Status Indicator */}
        {actualStatus && (
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getStatusColor(actualStatus)}`}>
            {getStatusIcon(actualStatus)}
            <span className="capitalize">{actualStatus}</span>
          </div>
        )}
      </div>

      {/* Main Metric */}
      <div className="mb-4">
        <div className="text-3xl font-bold mb-1">
          {formatValue(actualValue, metric.format)}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {metric.label}
        </p>
      </div>

      {/* Trend and Comparison */}
      <div className="space-y-2">
        {actualTrend && (
          <div className={`flex items-center space-x-2 text-sm ${getTrendColor(actualTrend.direction)}`}>
            {getTrendIcon(actualTrend.direction)}
            <span className="font-medium">
              {actualTrend.direction === 'up' ? '+' : actualTrend.direction === 'down' ? '-' : ''}
              {Math.abs(actualTrend.value)}%
            </span>
            <span className="text-gray-500 dark:text-gray-400">
              {actualTrend.period}
            </span>
          </div>
        )}

        {metric.target && (
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Target className="w-4 h-4" />
            <span>Target: {formatValue(metric.target, metric.format)}</span>
            <div className={`w-2 h-2 rounded-full ${
              actualValue >= metric.target ? 'bg-green-500' : 'bg-red-500'
            }`} />
          </div>
        )}

        {metric.comparison && (
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {formatValue(metric.comparison.value, metric.format)} {metric.comparison.label} ({metric.comparison.period})
          </div>
        )}
      </div>

      {/* Progress Bar for Target */}
      {metric.target && typeof actualValue === 'number' && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                actualValue >= metric.target ? 'bg-green-500' : 'bg-blue-500'
              }`}
              style={{
                width: `${Math.min((actualValue / metric.target) * 100, 100)}%`
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>0</span>
            <span>{formatValue(metric.target, metric.format)}</span>
          </div>
        </div>
      )}

      {/* Sparkline Visualization */}
      {config.visualization?.showSparkline && data.sparklineData && (
        <div className="mt-4">
          <div className="h-8 flex items-end space-x-1">
            {data.sparklineData.map((point: number, index: number) => (
              <div
                key={index}
                className="bg-blue-500 rounded-t"
                style={{
                  height: `${(point / Math.max(...data.sparklineData)) * 100}%`,
                  width: '4px'
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Real-time Indicator */}
      {config.realTime && (
        <div className="absolute top-2 left-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        </div>
      )}

      {/* Last Updated */}
      {data.lastUpdated && (
        <div className="text-xs text-gray-400 dark:text-gray-500 mt-2">
          Updated: {new Date(data.lastUpdated).toLocaleTimeString()}
        </div>
      )}
    </motion.div>
  );
};

export default MetricCardWidget;