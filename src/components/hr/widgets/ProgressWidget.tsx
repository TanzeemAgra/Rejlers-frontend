/**
 * Progress Widget Component
 * ========================
 * 
 * Displays progress indicators, goals, and achievements
 * with visual progress bars and status indicators.
 */

'use client';

import React from 'react';
import { WidgetConfig } from '@/config/hrDashboardConfig';
import { 
  Target,
  TrendingUp,
  Award,
  CheckCircle,
  Clock,
  Edit,
  Trash2
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ProgressWidgetProps {
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

const ProgressWidget: React.FC<ProgressWidgetProps> = ({
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
  const progressData = data.progress || [];

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

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 70) return 'bg-blue-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'in_progress':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'achieved':
        return <Award className="w-4 h-4 text-gold-500" />;
      default:
        return <Target className="w-4 h-4 text-gray-500" />;
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
        <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
          <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
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

      {/* Progress Items */}
      <div className="space-y-4">
        {progressData.map((item: any, index: number) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getStatusIcon(item.status)}
                <span className="font-medium text-gray-900 dark:text-white">
                  {item.label}
                </span>
              </div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {item.percentage}%
              </div>
            </div>
            
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(item.percentage)}`}
                style={{ width: `${Math.min(item.percentage, 100)}%` }}
              />
            </div>
            
            {item.description && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {item.description}
              </p>
            )}
            
            {item.deadline && (
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>Due: {new Date(item.deadline).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {data.summary.completed || 0}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Completed
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {data.summary.inProgress || 0}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                In Progress
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {progressData.length === 0 && (
        <div className="text-center py-8">
          <Target className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No Progress Data
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Progress indicators will appear here when data is available.
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default ProgressWidget;