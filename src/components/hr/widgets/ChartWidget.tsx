/**
 * Chart Widget Component
 * =====================
 * 
 * Advanced chart widget with multiple visualization types,
 * AI insights, and interactive features.
 */

'use client';

import React, { useMemo } from 'react';
import { ChartConfig, WidgetConfig, ChartType } from '@/config/hrDashboardConfig';
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  Activity,
  Brain,
  Download,
  Maximize2,
  Edit,
  Trash2,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import {
  Line,
  Bar,
  Doughnut,
  Pie,
  Radar,
  Scatter
} from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ChartWidgetProps {
  config: ChartConfig;
  data: any;
  isCustomizing: boolean;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<WidgetConfig>) => void;
  onRemove: () => void;
  theme: 'light' | 'dark';
  density: 'compact' | 'comfortable' | 'spacious';
}

const ChartWidget: React.FC<ChartWidgetProps> = ({
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
  const chartConfig = config.chart;
  const chartData = data.chartData || [];
  const aiInsights = data.aiInsights || [];

  // Prepare chart data
  const processedChartData = useMemo(() => {
    if (!chartData.length) {
      return {
        labels: [],
        datasets: []
      };
    }

    const labels = chartData.map((item: any) => item[chartConfig.xAxis]);
    const colors = chartConfig.colors || ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

    let datasets;
    
    if (Array.isArray(chartConfig.yAxis)) {
      // Multiple y-axes
      datasets = chartConfig.yAxis.map((yAxis, index) => ({
        label: yAxis.replace('_', ' ').toUpperCase(),
        data: chartData.map((item: any) => item[yAxis]),
        backgroundColor: colors[index % colors.length],
        borderColor: colors[index % colors.length],
        borderWidth: 2,
        fill: chartConfig.type === ChartType.AREA,
        tension: 0.4
      }));
    } else {
      // Single y-axis
      if (chartConfig.groupBy) {
        // Grouped data - Soft coding approach for Set iteration compatibility
        const uniqueGroups = new Set(chartData.map((item: any) => item[chartConfig.groupBy!]));
        const groups = Array.from(uniqueGroups);
        datasets = groups.map((group, index) => ({
          label: String(group), // Ensure label is always a string
          data: labels.map((label: any) => {
            const item = chartData.find((d: any) => 
              d[chartConfig.xAxis] === label && d[chartConfig.groupBy!] === group
            );
            return item ? item[chartConfig.yAxis as string] : 0;
          }),
          backgroundColor: colors[index % colors.length],
          borderColor: colors[index % colors.length],
          borderWidth: 2,
          fill: chartConfig.type === ChartType.AREA,
          tension: 0.4
        }));
      } else {
        // Simple data
        datasets = [{
          label: (chartConfig.yAxis as string).replace('_', ' ').toUpperCase(),
          data: chartData.map((item: any) => item[chartConfig.yAxis as string]),
          backgroundColor: chartConfig.type === ChartType.PIE || chartConfig.type === ChartType.DOUGHNUT
            ? colors
            : colors[0],
          borderColor: colors[0],
          borderWidth: 2,
          fill: chartConfig.type === ChartType.AREA,
          tension: 0.4
        }];
      }
    }

    return { labels, datasets };
  }, [chartData, chartConfig]);

  // Chart options
  const chartOptions = useMemo(() => {
    const isDark = theme === 'dark';
    
    return {
      responsive: true,
      maintainAspectRatio: false,
      // Soft coding approach: Properly handle animation configuration
      animation: chartConfig.animations !== false ? {
        duration: 750,
        easing: 'easeInOutQuart' as const
      } : false,
      interaction: {
        intersect: false,
        mode: 'index' as const
      },
      plugins: {
        legend: {
          display: chartConfig.legend,
          position: 'top' as const,
          labels: {
            color: isDark ? '#E5E7EB' : '#374151',
            usePointStyle: true,
            padding: 20
          }
        },
        tooltip: {
          enabled: chartConfig.tooltip,
          backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
          titleColor: isDark ? '#E5E7EB' : '#374151',
          bodyColor: isDark ? '#E5E7EB' : '#374151',
          borderColor: isDark ? '#374151' : '#E5E7EB',
          borderWidth: 1,
          cornerRadius: 8,
          displayColors: true
        }
      },
      scales: chartConfig.type === ChartType.RADAR ? {
        r: {
          angleLines: {
            color: isDark ? '#374151' : '#E5E7EB'
          },
          grid: {
            color: isDark ? '#374151' : '#E5E7EB'
          },
          pointLabels: {
            color: isDark ? '#E5E7EB' : '#374151'
          },
          ticks: {
            color: isDark ? '#E5E7EB' : '#374151',
            backdropColor: 'transparent'
          }
        }
      } : {
        x: {
          grid: {
            color: isDark ? '#374151' : '#F3F4F6',
            display: true
          },
          ticks: {
            color: isDark ? '#E5E7EB' : '#6B7280',
            maxRotation: 45
          }
        },
        y: {
          grid: {
            color: isDark ? '#374151' : '#F3F4F6',
            display: true
          },
          ticks: {
            color: isDark ? '#E5E7EB' : '#6B7280'
          }
        }
      }
    };
  }, [chartConfig, theme]);

  const getChartComponent = () => {
    // Soft coding approach: Use type assertion to handle strict Chart.js typing
    const chartOptions_any = chartOptions as any;
    
    switch (chartConfig.type) {
      case ChartType.LINE:
      case ChartType.AREA:
        return <Line data={processedChartData} options={chartOptions_any} />;
      case ChartType.BAR:
        return <Bar data={processedChartData} options={chartOptions_any} />;
      case ChartType.PIE:
        return <Pie data={processedChartData} options={chartOptions_any} />;
      case ChartType.DOUGHNUT:
        return <Doughnut data={processedChartData} options={chartOptions_any} />;
      case ChartType.RADAR:
        return <Radar data={processedChartData} options={chartOptions_any} />;
      case ChartType.SCATTER:
        return <Scatter data={processedChartData} options={chartOptions_any} />;
      default:
        return <Bar data={processedChartData} options={chartOptions_any} />;
    }
  };

  const getChartIcon = () => {
    switch (chartConfig.type) {
      case ChartType.LINE:
      case ChartType.AREA:
        return <LineChart className="w-5 h-5" />;
      case ChartType.BAR:
        return <BarChart3 className="w-5 h-5" />;
      case ChartType.PIE:
      case ChartType.DOUGHNUT:
        return <PieChart className="w-5 h-5" />;
      default:
        return <Activity className="w-5 h-5" />;
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
  `;

  return (
    <motion.div
      className={cardClasses}
      onClick={isCustomizing ? onSelect : undefined}
      whileHover={isCustomizing ? { scale: 1.01 } : {}}
      layout
    >
      {/* Customization Controls */}
      {isCustomizing && isSelected && (
        <div className="absolute top-2 right-2 flex space-x-1 z-10">
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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="text-blue-600 dark:text-blue-400">
            {getChartIcon()}
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

        {/* Chart Controls */}
        <div className="flex items-center space-x-2">
          {config.aiInsights?.enabled && (
            <div className="flex items-center space-x-1 text-sm text-purple-600 dark:text-purple-400">
              <Brain className="w-4 h-4" />
              <span>AI</span>
            </div>
          )}
          
          <button
            className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            title="Download Chart"
          >
            <Download className="w-4 h-4" />
          </button>
          
          <button
            className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            title="Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative" style={{ height: '300px' }}>
        {chartData.length > 0 ? (
          getChartComponent()
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
            <div className="text-center">
              <Activity className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No data available</p>
            </div>
          </div>
        )}
      </div>

      {/* AI Insights */}
      {config.aiInsights?.enabled && aiInsights.length > 0 && (
        <div className="mt-6 space-y-3">
          <div className="flex items-center space-x-2 text-sm font-medium text-purple-600 dark:text-purple-400">
            <Brain className="w-4 h-4" />
            <span>AI Insights</span>
          </div>
          
          {aiInsights.slice(0, 3).map((insight: any, index: number) => (
            <div key={index} className="flex items-start space-x-2 text-sm">
              <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                insight.type === 'warning' ? 'bg-yellow-500' :
                insight.type === 'positive' ? 'bg-green-500' :
                insight.type === 'negative' ? 'bg-red-500' : 'bg-blue-500'
              }`} />
              <p className="text-gray-700 dark:text-gray-300">{insight.message}</p>
            </div>
          ))}
        </div>
      )}

      {/* Chart Statistics */}
      {data.statistics && (
        <div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          {Object.entries(data.statistics).map(([key, value]: [string, any]) => (
            <div key={key} className="text-center">
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {typeof value === 'number' ? value.toLocaleString() : value}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                {key.replace('_', ' ')}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Anomaly Detection */}
      {config.aiInsights?.anomalyDetection && data.anomalies && data.anomalies.length > 0 && (
        <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <div className="flex items-center space-x-2 text-yellow-800 dark:text-yellow-200">
            <AlertCircle className="w-4 h-4" />
            <span className="font-medium text-sm">Anomalies Detected</span>
          </div>
          <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
            {data.anomalies.length} anomalies detected in the data pattern.
          </p>
        </div>
      )}

      {/* Trend Analysis */}
      {config.aiInsights?.trendAnalysis && data.trend && (
        <div className="mt-4 flex items-center space-x-2 text-sm">
          <TrendingUp className={`w-4 h-4 ${
            data.trend.direction === 'up' ? 'text-green-500' :
            data.trend.direction === 'down' ? 'text-red-500' : 'text-gray-500'
          }`} />
          <span className="text-gray-700 dark:text-gray-300">
            Trend: {data.trend.direction} {data.trend.confidence}% confidence
          </span>
        </div>
      )}

      {/* Last Updated */}
      {data.lastUpdated && (
        <div className="text-xs text-gray-400 dark:text-gray-500 mt-4">
          Updated: {new Date(data.lastUpdated).toLocaleString()}
        </div>
      )}
    </motion.div>
  );
};

export default ChartWidget;