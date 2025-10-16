'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain,
  TrendingUp,
  Users,
  Shield,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  PieChart,
  Activity,
  Crown,
  Settings,
  Bot,
  Zap,
  Target,
  Award,
  Globe,
  Network,
  Cpu,
  Eye,
  RefreshCw,
  Download,
  Filter,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles
} from 'lucide-react';
import { rbacService, SystemInfo } from '@/lib/rbac';

interface AnalyticsCard {
  title: string;
  value: string | number;
  change: number;
  icon: React.ComponentType;
  color: string;
  trend: 'up' | 'down' | 'stable';
}

interface SecurityAlert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  timestamp: string;
  actionRequired: boolean;
}

const AIDashboard: React.FC = () => {
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [analyticsCards, setAnalyticsCards] = useState<AnalyticsCard[]>([]);
  const [securityAlerts, setSecurityAlerts] = useState<SecurityAlert[]>([]);
  const [isGeneratingAnalytics, setIsGeneratingAnalytics] = useState(false);

  // Generate AI-powered analytics
  const generateAIAnalytics = async () => {
    setIsGeneratingAnalytics(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      if (systemInfo) {
        const cards: AnalyticsCard[] = [
          {
            title: 'Total Users',
            value: systemInfo.system_statistics.total_users,
            change: 12.5,
            icon: Users,
            color: 'bg-blue-500',
            trend: 'up'
          },
          {
            title: 'Active Sessions',
            value: systemInfo.system_statistics.active_sessions,
            change: -3.2,
            icon: Activity,
            color: 'bg-green-500',
            trend: 'down'
          },
          {
            title: 'Security Score',
            value: '94%',
            change: 5.1,
            icon: Shield,
            color: 'bg-purple-500',
            trend: 'up'
          },
          {
            title: 'AI Efficiency',
            value: '87%',
            change: 8.3,
            icon: Brain,
            color: 'bg-indigo-500',
            trend: 'up'
          },
          {
            title: 'Role Optimization',
            value: '92%',
            change: 2.7,
            icon: Target,
            color: 'bg-pink-500',
            trend: 'up'
          },
          {
            title: 'Compliance Rate',
            value: '98.5%',
            change: 1.2,
            icon: CheckCircle,
            color: 'bg-teal-500',
            trend: 'up'
          }
        ];
        setAnalyticsCards(cards);

        // Generate security alerts
        const alerts: SecurityAlert[] = [
          {
            id: '1',
            type: 'warning',
            title: 'Unusual Access Pattern Detected',
            description: 'AI detected abnormal login attempts from new geographic locations',
            timestamp: new Date().toISOString(),
            actionRequired: true
          },
          {
            id: '2',
            type: 'info',
            title: 'Role Optimization Suggestion',
            description: 'AI recommends consolidating similar functional roles for better efficiency',
            timestamp: new Date().toISOString(),
            actionRequired: false
          },
          {
            id: '3',
            type: 'critical',
            title: 'Privilege Escalation Risk',
            description: 'Multiple users have accumulated excessive permissions over time',
            timestamp: new Date().toISOString(),
            actionRequired: true
          }
        ];
        setSecurityAlerts(alerts);
      }
      setIsGeneratingAnalytics(false);
    }, 2000);
  };

  // Load data
  useEffect(() => {
    const loadData = async () => {
      try {
        const systemData = await rbacService.getSystemInfo();
        setSystemInfo(systemData);
        setLoading(false);
        generateAIAnalytics();
      } catch (error) {
        console.error('Error loading system info:', error);
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-900">Loading AI Dashboard...</h3>
          <p className="text-gray-600">Analyzing system performance and security</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* AI Dashboard Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
              <Brain className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">AI-Powered RBAC Analytics</h1>
              <p className="text-purple-100">Real-time insights and security monitoring with generative AI</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={generateAIAnalytics}
              disabled={isGeneratingAnalytics}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 flex items-center space-x-2"
            >
              {isGeneratingAnalytics ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              <span>{isGeneratingAnalytics ? 'Analyzing...' : 'Regenerate AI Insights'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Analytics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {analyticsCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 ${card.color} rounded-lg`}>
                {React.createElement(card.icon, { className: "w-6 h-6 text-white" })}
              </div>
              <div className={`flex items-center space-x-1 ${
                card.trend === 'up' ? 'text-green-600' : card.trend === 'down' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {card.trend === 'up' ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : card.trend === 'down' ? (
                  <ArrowDownRight className="w-4 h-4" />
                ) : (
                  <div className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">{card.change > 0 ? '+' : ''}{card.change}%</span>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">{card.title}</h3>
              <p className="text-3xl font-bold text-gray-900">{card.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Role Distribution and Security Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Role Distribution Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Role Distribution Analysis</h2>
            <PieChart className="w-6 h-6 text-gray-400" />
          </div>
          
          {systemInfo && systemInfo.role_distribution && (
            <div className="space-y-4">
              {systemInfo.role_distribution.slice(0, 6).map((roleData, index) => {
                const percentage = systemInfo.system_statistics.total_users > 0 
                  ? (roleData.user_count / systemInfo.system_statistics.total_users) * 100 
                  : 0;
                
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        index === 0 ? 'bg-purple-500' :
                        index === 1 ? 'bg-blue-500' :
                        index === 2 ? 'bg-green-500' :
                        index === 3 ? 'bg-yellow-500' :
                        index === 4 ? 'bg-red-500' : 'bg-gray-500'
                      }`}></div>
                      <span className="text-sm font-medium text-gray-700">{roleData.role_name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-gray-900">{roleData.user_count}</span>
                      <span className="text-xs text-gray-500 ml-2">({percentage.toFixed(1)}%)</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Security Alerts */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">AI Security Alerts</h2>
            <AlertTriangle className="w-6 h-6 text-yellow-500" />
          </div>
          
          <div className="space-y-4">
            {securityAlerts.map((alert) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`border-l-4 rounded-lg p-4 ${
                  alert.type === 'critical' ? 'border-red-500 bg-red-50' :
                  alert.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
                  'border-blue-500 bg-blue-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                    <p className="text-sm text-gray-700 mt-1">{alert.description}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(alert.timestamp).toLocaleString()}
                    </p>
                  </div>
                  {alert.actionRequired && (
                    <button className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full hover:bg-red-200 transition-colors">
                      Action Required
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Recommendations Panel */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
            <Bot className="w-6 h-6 text-green-600" />
            <span>AI-Powered Recommendations</span>
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">AI Active</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 border border-green-200 rounded-lg hover:bg-green-50 transition-colors cursor-pointer">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Target className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Role Optimization</h3>
            </div>
            <p className="text-sm text-gray-600">
              AI suggests consolidating 3 similar roles to improve efficiency and reduce complexity.
            </p>
            <button className="text-xs text-green-600 hover:text-green-800 font-medium mt-2">
              Apply Suggestion →
            </button>
          </div>
          
          <div className="p-4 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Security Enhancement</h3>
            </div>
            <p className="text-sm text-gray-600">
              Enable two-factor authentication for all users with administrative privileges.
            </p>
            <button className="text-xs text-blue-600 hover:text-blue-800 font-medium mt-2">
              Implement Now →
            </button>
          </div>
          
          <div className="p-4 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors cursor-pointer">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Zap className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Access Optimization</h3>
            </div>
            <p className="text-sm text-gray-600">
              Review and revoke unused permissions from 12 users to minimize security risk.
            </p>
            <button className="text-xs text-purple-600 hover:text-purple-800 font-medium mt-2">
              Review Permissions →
            </button>
          </div>
        </div>
      </div>

      {/* System Performance Metrics */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">System Performance Metrics</h2>
          <BarChart3 className="w-6 h-6 text-gray-400" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Activity className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">99.9%</h3>
            <p className="text-sm text-gray-600">System Uptime</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Zap className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">156ms</h3>
            <p className="text-sm text-gray-600">Avg Response Time</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Network className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">1,247</h3>
            <p className="text-sm text-gray-600">API Calls/min</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Cpu className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">23%</h3>
            <p className="text-sm text-gray-600">CPU Usage</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIDashboard;