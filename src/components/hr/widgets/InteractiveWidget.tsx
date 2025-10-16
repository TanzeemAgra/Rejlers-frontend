/**
 * Interactive Widget Component
 * ===========================
 */

'use client';

import React from 'react';
import { WidgetConfig } from '@/config/hrDashboardConfig';
import { MousePointer, Edit, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface InteractiveWidgetProps {
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

const InteractiveWidget: React.FC<InteractiveWidgetProps> = ({
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
  return (
    <motion.div
      className="relative bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
      onClick={isCustomizing ? onSelect : undefined}
      whileHover={isCustomizing ? { scale: 1.02 } : {}}
    >
      {isCustomizing && isSelected && (
        <div className="absolute top-2 right-2 flex space-x-1 z-10">
          <button onClick={(e) => { e.stopPropagation(); }} className="p-1 bg-blue-600 text-white rounded hover:bg-blue-700">
            <Edit className="w-3 h-3" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onRemove(); }} className="p-1 bg-red-600 text-white rounded hover:bg-red-700">
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      )}
      
      <div className="flex items-center space-x-2 mb-4">
        <MousePointer className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold text-gray-900 dark:text-white">{config.title}</h3>
      </div>
      
      <div className="text-center py-8">
        <MousePointer className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-600 dark:text-gray-400">Interactive content coming soon</p>
      </div>
    </motion.div>
  );
};

export default InteractiveWidget;