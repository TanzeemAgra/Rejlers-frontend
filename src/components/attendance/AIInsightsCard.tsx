// AI Insights Component - Advanced AI scoring and recommendations display
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  TrendingUp,
  TrendingDown,
  Minus,
  Zap,
  Target,
  Award,
  AlertTriangle,
  CheckCircle,
  Activity,
  BarChart3
} from 'lucide-react';
import { getScoreColor, getScoreBgColor } from '@/lib/attendanceApi';

interface AIInsights {
  overall_score: number;
  confidence_level: 'High' | 'Medium' | 'Low';
  pattern_status: 'Normal' | 'Concerning' | 'Critical';
  productivity_level: 'Excellent' | 'Good' | 'Needs Improvement';
  recommendations: string[];
  trends: {
    attendance: 'improving' | 'declining' | 'stable';
    punctuality: 'improving' | 'declining' | 'stable';
    productivity: 'improving' | 'declining' | 'stable';
  };
}

interface AIInsightsCardProps {
  insights: AIInsights;
  isLoading?: boolean;
  className?: string;
}

const AIInsightsCard: React.FC<AIInsightsCardProps> = ({ 
  insights, 
  isLoading = false,
  className = '' 
}) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(insights.overall_score);
    }, 500);
    return () => clearTimeout(timer);
  }, [insights.overall_score]);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="w-3 h-3 text-green-500" />;
      case 'declining': return <TrendingDown className="w-3 h-3 text-red-500" />;
      default: return <Minus className="w-3 h-3 text-gray-500" />;
    }
  };

  const getConfidenceIcon = () => {
    switch (insights.confidence_level) {
      case 'High': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Medium': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      default: return <AlertTriangle className="w-4 h-4 text-red-600" />;
    }
  };

  const getPatternStatusColor = () => {
    switch (insights.pattern_status) {
      case 'Normal': return 'text-green-600 bg-green-100';
      case 'Concerning': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-red-600 bg-red-100';
    }
  };

  if (isLoading) {
    return (
      <div className={`bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow-lg border p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-6 h-6 bg-gray-300 rounded"></div>
            <div className="w-24 h-4 bg-gray-300 rounded"></div>
          </div>
          <div className="space-y-3">
            <div className="w-full h-2 bg-gray-300 rounded"></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="w-full h-8 bg-gray-300 rounded"></div>
              <div className="w-full h-8 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow-lg border p-6 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Brain className="w-6 h-6 text-purple-600" />
          <h3 className="text-lg font-bold text-gray-900">AI Insights</h3>
        </div>
        <div className="flex items-center space-x-2">
          {getConfidenceIcon()}
          <span className="text-xs font-medium text-gray-600">
            {insights.confidence_level} Confidence
          </span>
        </div>
      </div>

      {/* Overall Score */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">Overall AI Score</span>
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`text-2xl font-bold ${getScoreColor(insights.overall_score)}`}
          >
            {animatedScore.toFixed(1)}%
          </motion.span>
        </div>
        
        <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${animatedScore}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 rounded-full" />
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className={`p-3 rounded-lg border ${getScoreBgColor(insights.overall_score)}`}>
          <div className="text-xs text-gray-600 mb-1 flex items-center space-x-1">
            <Activity className="w-3 h-3" />
            <span>Pattern Status</span>
          </div>
          <div className={`text-sm font-semibold px-2 py-1 rounded ${getPatternStatusColor()}`}>
            {insights.pattern_status}
          </div>
        </div>
        
        <div className={`p-3 rounded-lg border ${getScoreBgColor(insights.overall_score)}`}>
          <div className="text-xs text-gray-600 mb-1 flex items-center space-x-1">
            <Target className="w-3 h-3" />
            <span>Productivity</span>
          </div>
          <div className="text-sm font-semibold text-gray-900">
            {insights.productivity_level}
          </div>
        </div>
      </div>

      {/* Trends */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center space-x-1">
          <BarChart3 className="w-4 h-4" />
          <span>Performance Trends</span>
        </h4>
        
        <div className="space-y-2">
          {Object.entries(insights.trends).map(([key, trend]) => (
            <div key={key} className="flex items-center justify-between text-sm">
              <span className="capitalize text-gray-600">{key}:</span>
              <div className="flex items-center space-x-2">
                {getTrendIcon(trend)}
                <span className={`font-medium capitalize ${
                  trend === 'improving' ? 'text-green-600' :
                  trend === 'declining' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {trend}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center space-x-1">
          <Award className="w-4 h-4" />
          <span>AI Recommendations</span>
        </h4>
        
        <div className="space-y-2">
          {insights.recommendations.slice(0, 3).map((recommendation, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-2 text-xs text-gray-600 bg-white/70 p-2 rounded-lg border"
            >
              <Zap className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />
              <span className="leading-relaxed">{recommendation}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Performance Badge */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-4 pt-4 border-t border-purple-200"
      >
        <div className="flex items-center justify-center space-x-2 text-xs">
          <div className={`w-2 h-2 rounded-full ${
            insights.overall_score >= 90 ? 'bg-green-500' :
            insights.overall_score >= 75 ? 'bg-yellow-500' : 'bg-red-500'
          }`} />
          <span className="text-gray-600">
            AI Analysis • Updated {new Date().toLocaleTimeString()}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AIInsightsCard;
