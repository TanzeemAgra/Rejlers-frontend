/**
 * AI Insight Widget Component
 * ==========================
 * 
 * Displays AI-powered insights, recommendations, and predictions
 * with interactive visualization and real-time updates.
 */

'use client';

import React from 'react';
import { WidgetConfig } from '@/config/hrDashboardConfig';
import { 
  Brain,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Users,
  Target,
  Zap,
  Edit,
  Trash2
} from 'lucide-react';
import { motion } from 'framer-motion';

interface AIInsightWidgetProps {
  config: WidgetConfig;
  data: any;
  isCustomizing: boolean;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<WidgetConfig>) => void;
  onRemove: () => void;
  theme: 'light' | 'dark';
  density: 'compact' | 'comfortable' | 'spacious';
}

const AIInsightWidget: React.FC<AIInsightWidgetProps> = ({
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
  const insights = data.insights || [];
  const predictions = data.predictions || [];
  const recommendations = data.recommendations || [];

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
  `;

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'prediction':
        return <TrendingUp className="w-4 h-4" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4" />;
      case 'success':
        return <CheckCircle className="w-4 h-4" />;
      case 'insight':
        return <Brain className="w-4 h-4" />;
      default:
        return <Zap className="w-4 h-4" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'prediction':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'success':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'critical':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default:
        return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20';
    }
  };

  return (
    <motion.div
      className={cardClasses}
      onClick={isCustomizing ? onSelect : undefined}
      whileHover={isCustomizing ? { scale: 1.02 } : {}}
      layout
    >
      {/* Customization Controls */}
      {isCustomizing && isSelected && (
        <div className="absolute top-2 right-2 flex space-x-1 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
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
      <div className="flex items-center space-x-2 mb-6">
        <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
          <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {config.title}
          </h3>
          {config.subtitle && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {config.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* AI Insights */}
      <div className="space-y-4">
        {insights.map((insight: any, index: number) => (
          <div key={index} className="border-l-4 border-purple-500 pl-4">
            <div className="flex items-start space-x-2">
              <div className={`p-1 rounded ${getInsightColor(insight.type)}`}>
                {getInsightIcon(insight.type)}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                  {insight.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {insight.message}
                </p>
                {insight.confidence && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span>Confidence</span>
                      <span>{insight.confidence}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${insight.confidence}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {predictions.length > 0 && (
          <div className="mt-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2 text-blue-600" />
              Predictions
            </h4>
            <div className="space-y-3">
              {predictions.map((prediction: any, index: number) => (
                <div key={index} className="bg-blue-50 dark:bg-blue-900/10 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {prediction.metric}
                    </span>
                    <span className="text-sm text-blue-600 dark:text-blue-400">
                      {prediction.timeframe}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {prediction.predictedValue}
                    </span>
                    <span className={`text-sm ${
                      prediction.trend === 'up' ? 'text-green-600' :
                      prediction.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {prediction.changePercent}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {recommendations.length > 0 && (
          <div className="mt-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
              <Target className="w-4 h-4 mr-2 text-green-600" />
              Recommendations
            </h4>
            <div className="space-y-2">
              {recommendations.map((recommendation: any, index: number) => (
                <div key={index} className="flex items-start space-x-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {recommendation.action}
                    </p>
                    {recommendation.impact && (
                      <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                        Expected impact: {recommendation.impact}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Empty State */}
      {insights.length === 0 && predictions.length === 0 && recommendations.length === 0 && (
        <div className="text-center py-8">
          <Brain className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Generating Insights
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            AI insights will appear here as data becomes available.
          </p>
        </div>
      )}

      {/* Last Updated */}
      {data.lastUpdated && (
        <div className="text-xs text-gray-400 dark:text-gray-500 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          Last analysis: {new Date(data.lastUpdated).toLocaleString()}
        </div>
      )}
    </motion.div>
  );
};

export default AIInsightWidget;