/**
 * AI Hub Main Dashboard
 * =====================
 * 
 * Comprehensive super admin AI hub featuring:
 * - Unified dashboard with all RBAC activities
 * - AI Security Center integration
 * - Predictive analytics overview
 * - Real-time monitoring and alerts
 * - System health and performance metrics
 */

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Brain,
  Shield,
  BarChart3,
  Activity,
  Users,
  Lock,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  ExternalLink,
  Zap,
  Eye,
  Clock,
  Target,
  Settings
} from 'lucide-react';

interface SystemStatus {
  overallHealth: number;
  securityStatus: string;
  performanceStatus: string;
  userEngagement: string;
  riskLevel: string;
}

interface RealTimeMetrics {
  totalRequests: number;
  successRate: number;
  failedAttempts: number;
  activeUsers: number;
  avgResponseTime: number;
  anomalyCount: number;
  highRiskEvents: number;
  criticalAlerts: number;
}

interface AIPrediction {
  metric: string;
  predictedValue: number;
  confidence: number;
  trend: string;
  riskLevel: string;
  forecastPeriod: string;
  recommendations: string[];
}

interface ActiveAlert {
  id: string;
  severity: string;
  category: string;
  message: string;
  timestamp: string;
  resolved: boolean;
}

interface AIInsights {
  trendingMetrics: Record<string, string>;
  recommendations: string[];
  confidenceScore: number;
  nextReview: string;
}

interface AIHubData {
  timestamp: string;
  systemStatus: SystemStatus;
  realTimeMetrics: RealTimeMetrics;
  aiPredictions: AIPrediction[];
  activeAlerts: ActiveAlert[];
  aiInsights: AIInsights;
  dataFreshness: string;
}

const AIHubDashboard: React.FC = () => {
  const router = useRouter();
  const [hubData, setHubData] = useState<AIHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30000); // 30 seconds
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Fetch AI Hub dashboard data
  const fetchHubData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/v1/ai-hub/dashboard/');
      if (response.ok) {
        const data = await response.json();
        setHubData(data);
        setLastUpdated(new Date());
      } else {
        console.error('Failed to fetch AI Hub data');
      }
    } catch (error) {
      console.error('Error fetching AI Hub data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Auto-refresh effect
  useEffect(() => {
    fetchHubData();

    if (autoRefresh) {
      const interval = setInterval(fetchHubData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [refreshInterval, autoRefresh]);

  // Navigate to specific dashboards
  const navigateToSecurityCenter = () => {
    router.push('/admin/ai-hub/security-center');
  };

  const navigateToAnalytics = () => {
    router.push('/admin/ai-hub/analytics');
  };

  const navigateToMonitoring = () => {
    router.push('/admin/ai-hub/monitoring');
  };

  // Get status color
  const getStatusColor = (status: string) => {
    const colors = {
      'Excellent': 'text-green-600 bg-green-100',
      'Good': 'text-blue-600 bg-blue-100',
      'Warning': 'text-yellow-600 bg-yellow-100',
      'Critical': 'text-red-600 bg-red-100',
      'High': 'text-green-600 bg-green-100',
      'Medium': 'text-yellow-600 bg-yellow-100',
      'Low': 'text-red-600 bg-red-100'
    };
    return colors[status as keyof typeof colors] || 'text-gray-600 bg-gray-100';
  };

  // Get health score color
  const getHealthColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Get trend icon
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'decreasing':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  if (loading && !hubData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Brain className="w-12 h-12 animate-pulse mx-auto mb-4 text-purple-600" />
          <p className="text-lg text-gray-600">Initializing AI Hub...</p>
        </div>
      </div>
    );
  }

  const { systemStatus, realTimeMetrics, aiPredictions, activeAlerts, aiInsights } = hubData || {};

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Brain className="w-10 h-10 text-purple-600 mr-4" />
            <div>
              <h1 className="text-4xl font-bold text-gray-900">AI Hub</h1>
              <p className="text-gray-600">Comprehensive AI-powered administration center</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Auto Refresh Toggle */}
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
                autoRefresh 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${autoRefresh ? 'animate-spin' : ''}`} />
              Auto Refresh
            </button>
            
            {/* Settings */}
            <button className="p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Status Bar */}
        <div className="flex items-center justify-between text-sm text-gray-600 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              AI Systems Operational
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              Last Updated: {lastUpdated.toLocaleTimeString()}
            </div>
            <div className="flex items-center">
              <Target className="w-4 h-4 mr-1" />
              Confidence: {aiInsights?.confidenceScore || 0}%
            </div>
          </div>
          <div className="flex items-center">
            <Eye className="w-4 h-4 mr-1" />
            Monitoring {realTimeMetrics?.activeUsers || 0} active users
          </div>
        </div>
      </div>

      {/* System Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        {/* Overall Health */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Activity className="w-5 h-5 text-purple-500 mr-2" />
              <span className="font-medium">Overall Health</span>
            </div>
          </div>
          <div className={`text-3xl font-bold ${getHealthColor(systemStatus?.overallHealth || 0)}`}>
            {systemStatus?.overallHealth || 0}%
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${systemStatus?.overallHealth || 0}%` }}
            ></div>
          </div>
        </div>

        {/* Security Status */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-blue-500 mr-2" />
              <span className="font-medium">Security</span>
            </div>
          </div>
          <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(systemStatus?.securityStatus || 'Good')}`}>
            {systemStatus?.securityStatus || 'Good'}
          </div>
        </div>

        {/* Performance */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Zap className="w-5 h-5 text-yellow-500 mr-2" />
              <span className="font-medium">Performance</span>
            </div>
          </div>
          <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(systemStatus?.performanceStatus || 'Good')}`}>
            {systemStatus?.performanceStatus || 'Good'}
          </div>
        </div>

        {/* User Engagement */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Users className="w-5 h-5 text-green-500 mr-2" />
              <span className="font-medium">Engagement</span>
            </div>
          </div>
          <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(systemStatus?.userEngagement || 'Moderate')}`}>
            {systemStatus?.userEngagement || 'Moderate'}
          </div>
        </div>

        {/* Risk Level */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-orange-500 mr-2" />
              <span className="font-medium">Risk Level</span>
            </div>
          </div>
          <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(systemStatus?.riskLevel || 'Low')}`}>
            {systemStatus?.riskLevel || 'Low'}
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Real-time Metrics */}
        <div className="lg:col-span-2 space-y-6">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border text-center">
              <div className="text-2xl font-bold text-blue-600">{realTimeMetrics?.totalRequests || 0}</div>
              <div className="text-sm text-gray-600">Total Requests</div>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm border text-center">
              <div className="text-2xl font-bold text-green-600">{realTimeMetrics?.successRate || 0}%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm border text-center">
              <div className="text-2xl font-bold text-purple-600">{realTimeMetrics?.activeUsers || 0}</div>
              <div className="text-sm text-gray-600">Active Users</div>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm border text-center">
              <div className="text-2xl font-bold text-orange-600">{realTimeMetrics?.criticalAlerts || 0}</div>
              <div className="text-sm text-gray-600">Critical Alerts</div>
            </div>
          </div>

          {/* AI Predictions Preview */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Brain className="w-5 h-5 text-purple-500 mr-2" />
                AI Predictions
              </h3>
              <button 
                onClick={navigateToAnalytics}
                className="text-purple-600 hover:text-purple-700 flex items-center text-sm"
              >
                View Details <ExternalLink className="w-4 h-4 ml-1" />
              </button>
            </div>

            <div className="space-y-4">
              {aiPredictions?.slice(0, 3).map((prediction, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{prediction.metric}</div>
                    <div className="text-sm text-gray-600">
                      Predicted: {prediction.predictedValue.toFixed(1)} ({prediction.forecastPeriod})
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getTrendIcon(prediction.trend)}
                    <div className={`px-2 py-1 text-xs rounded-full ${
                      prediction.riskLevel === 'high' ? 'bg-red-100 text-red-600' :
                      prediction.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {prediction.riskLevel}
                    </div>
                    <span className="text-sm text-gray-500">{prediction.confidence}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Security Center */}
            <button 
              onClick={navigateToSecurityCenter}
              className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-all text-left group"
            >
              <div className="flex items-center justify-between mb-4">
                <Shield className="w-8 h-8 text-blue-500" />
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Security Center</h3>
              <p className="text-sm text-gray-600">Real-time threat detection and security monitoring</p>
              <div className="mt-3 text-sm text-blue-600">
                {activeAlerts?.filter(alert => !alert.resolved).length || 0} active alerts
              </div>
            </button>

            {/* Predictive Analytics */}
            <button 
              onClick={navigateToAnalytics}
              className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-all text-left group"
            >
              <div className="flex items-center justify-between mb-4">
                <BarChart3 className="w-8 h-8 text-purple-500" />
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Predictive Analytics</h3>
              <p className="text-sm text-gray-600">AI-powered forecasting and trend analysis</p>
              <div className="mt-3 text-sm text-purple-600">
                {aiInsights?.confidenceScore || 0}% prediction confidence
              </div>
            </button>

            {/* Real-time Monitoring */}
            <button 
              onClick={navigateToMonitoring}
              className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-all text-left group"
            >
              <div className="flex items-center justify-between mb-4">
                <Activity className="w-8 h-8 text-green-500" />
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-green-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Live Monitoring</h3>
              <p className="text-sm text-gray-600">Real-time system performance and activity</p>
              <div className="mt-3 text-sm text-green-600">
                {realTimeMetrics?.avgResponseTime || 0}ms avg response
              </div>
            </button>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Recent Alerts */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Recent Alerts</h3>
              <button 
                onClick={navigateToSecurityCenter}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                View All
              </button>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {activeAlerts?.slice(0, 5).map((alert) => (
                <div key={alert.id} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`px-2 py-1 text-xs rounded-full ${
                      alert.severity === 'critical' ? 'bg-red-100 text-red-600' :
                      alert.severity === 'high' ? 'bg-orange-100 text-orange-600' :
                      alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {alert.severity.toUpperCase()}
                    </div>
                    {alert.resolved ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-orange-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              ))}
              
              {(!activeAlerts || activeAlerts.length === 0) && (
                <div className="text-center py-8 text-gray-500">
                  <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                  <p>No recent alerts</p>
                </div>
              )}
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Brain className="w-4 h-4 text-purple-500 mr-2" />
              AI Insights
            </h3>

            <div className="space-y-4">
              {/* Trending Metrics */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Trending Metrics</h4>
                <div className="space-y-2">
                  {Object.entries(aiInsights?.trendingMetrics || {}).map(([metric, trend]) => (
                    <div key={metric} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 capitalize">{metric.replace(/_/g, ' ')}</span>
                      <div className="flex items-center">
                        {getTrendIcon(trend)}
                        <span className={`ml-1 ${
                          trend === 'increasing' ? 'text-green-600' :
                          trend === 'decreasing' ? 'text-red-600' :
                          'text-gray-600'
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
                <h4 className="text-sm font-medium text-gray-700 mb-2">Recommendations</h4>
                <ul className="space-y-2">
                  {aiInsights?.recommendations?.slice(0, 3).map((recommendation, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                      {recommendation}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Next Review */}
              <div className="pt-3 border-t border-gray-200 text-center">
                <div className="text-sm text-gray-600">
                  Next AI Review: {aiInsights?.nextReview ? new Date(aiInsights.nextReview).toLocaleTimeString() : 'N/A'}
                </div>
              </div>
            </div>
          </div>

          {/* System Health */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-4">System Health</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Database</span>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Cache System</span>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">AI Services</span>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">RBAC Engine</span>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Monitoring</span>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIHubDashboard;