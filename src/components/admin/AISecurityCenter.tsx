/**
 * AI Security Center Dashboard
 * ============================
 * 
 * Comprehensive security monitoring dashboard for super admin with:
 * - Real-time threat detection and analysis
 * - RBAC activity visualization
 * - AI-powered anomaly detection
 * - Security alerts and incident management
 * - Predictive security analytics
 */

import React, { useState, useEffect } from 'react';
import {
  Shield,
  AlertTriangle,
  Activity,
  Users,
  Lock,
  Eye,
  TrendingUp,
  TrendingDown,
  Minus,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  Zap,
  Brain,
  RefreshCw,
  Filter,
  Download
} from 'lucide-react';

interface SecurityMetrics {
  threatLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  securityScore: number;
  incidents24h: number;
  authenticationHealth: number;
  anomalyDetectionActive: boolean;
  aiMonitoringStatus: 'active' | 'inactive' | 'maintenance';
}

interface ThreatDetection {
  activeThreats: number;
  threatCategories: Record<string, number>;
  riskTrends: Array<{
    metric: string;
    trend: string;
    riskLevel: string;
    confidence: number;
  }>;
  behavioralAnomalies: number;
  failedAuthenticationRate: number;
}

interface SecurityAlert {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  message: string;
  details: Record<string, any>;
  timestamp: string;
  resolved: boolean;
  userAffected: boolean;
}

interface RealTimeMonitoring {
  monitoredEndpoints: number;
  activeSessions: number;
  suspiciousActivities: number;
  blockedAttempts: number;
  aiInterventions: number;
}

interface SecurityCenterData {
  timestamp: string;
  timeRange: string;
  securityOverview: SecurityMetrics;
  threatDetection: ThreatDetection;
  realTimeMonitoring: RealTimeMonitoring;
  securityAlerts: SecurityAlert[];
  complianceStatus: Record<string, string>;
  aiSecurityInsights: Record<string, string>;
}

const AISecurityCenter: React.FC = () => {
  const [securityData, setSecurityData] = useState<SecurityCenterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [alertFilter, setAlertFilter] = useState('all');
  const [refreshInterval, setRefreshInterval] = useState(30000); // 30 seconds
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Fetch security center data
  const fetchSecurityData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/v1/ai-hub/security-center/?range=${selectedTimeRange}`);
      if (response.ok) {
        const data = await response.json();
        setSecurityData(data);
      } else {
        console.error('Failed to fetch security data');
      }
    } catch (error) {
      console.error('Error fetching security data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Auto-refresh effect
  useEffect(() => {
    fetchSecurityData();

    if (autoRefresh) {
      const interval = setInterval(fetchSecurityData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [selectedTimeRange, refreshInterval, autoRefresh]);

  // Resolve security alert
  const handleResolveAlert = async (alertId: string, note?: string) => {
    try {
      const response = await fetch('/api/v1/ai-hub/alerts/resolve/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ alert_id: alertId, note }),
      });

      if (response.ok) {
        // Refresh data to show updated alert status
        fetchSecurityData();
      }
    } catch (error) {
      console.error('Error resolving alert:', error);
    }
  };

  // Get threat level color
  const getThreatLevelColor = (level: string) => {
    const colors = {
      Low: 'text-green-600 bg-green-100',
      Medium: 'text-yellow-600 bg-yellow-100',
      High: 'text-orange-600 bg-orange-100',
      Critical: 'text-red-600 bg-red-100'
    };
    return colors[level as keyof typeof colors] || 'text-gray-600 bg-gray-100';
  };

  // Get alert severity color
  const getAlertSeverityColor = (severity: string) => {
    const colors = {
      low: 'text-blue-600 bg-blue-100',
      medium: 'text-yellow-600 bg-yellow-100',
      high: 'text-orange-600 bg-orange-100',
      critical: 'text-red-600 bg-red-100'
    };
    return colors[severity as keyof typeof colors] || 'text-gray-600 bg-gray-100';
  };

  // Filter alerts based on selected filter
  const getFilteredAlerts = () => {
    if (!securityData?.securityAlerts) return [];
    
    if (alertFilter === 'all') return securityData.securityAlerts;
    if (alertFilter === 'unresolved') return securityData.securityAlerts.filter(alert => !alert.resolved);
    if (alertFilter === 'critical') return securityData.securityAlerts.filter(alert => alert.severity === 'critical');
    
    return securityData.securityAlerts.filter(alert => alert.severity === alertFilter);
  };

  if (loading && !securityData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Loading AI Security Center...</p>
        </div>
      </div>
    );
  }

  const { securityOverview, threatDetection, realTimeMonitoring, securityAlerts } = securityData || {};

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AI Security Center</h1>
              <p className="text-gray-600">Real-time security monitoring and threat detection</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Time Range Selector */}
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1h">Last Hour</option>
              <option value="6h">Last 6 Hours</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
            </select>
            
            {/* Auto Refresh Toggle */}
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                autoRefresh 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
            </button>
            
            {/* Refresh Button */}
            <button
              onClick={fetchSecurityData}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>
        
        {/* Status Indicator */}
        <div className="flex items-center text-sm text-gray-600">
          <div className="flex items-center mr-6">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            AI Monitoring Active
          </div>
          <div className="flex items-center">
            <Eye className="w-4 h-4 mr-1" />
            Last updated: {securityData?.timestamp ? new Date(securityData.timestamp).toLocaleTimeString() : 'Unknown'}
          </div>
        </div>
      </div>

      {/* Security Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Threat Level */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-orange-500 mr-2" />
              <h3 className="font-semibold text-gray-900">Threat Level</h3>
            </div>
          </div>
          <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getThreatLevelColor(securityOverview?.threatLevel || 'Low')}`}>
            {securityOverview?.threatLevel || 'Low'}
          </div>
        </div>

        {/* Security Score */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-blue-500 mr-2" />
              <h3 className="font-semibold text-gray-900">Security Score</h3>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {securityOverview?.securityScore || 0}%
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${securityOverview?.securityScore || 0}%` }}
            ></div>
          </div>
        </div>

        {/* Incidents 24h */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <h3 className="font-semibold text-gray-900">Incidents (24h)</h3>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {securityOverview?.incidents24h || 0}
          </div>
        </div>

        {/* Authentication Health */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Lock className="w-5 h-5 text-green-500 mr-2" />
              <h3 className="font-semibold text-gray-900">Auth Health</h3>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {securityOverview?.authenticationHealth || 0}%
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${securityOverview?.authenticationHealth || 0}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Threat Detection Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Threats */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Brain className="w-5 h-5 text-purple-500 mr-2" />
                AI Threat Detection
              </h3>
              <div className="flex items-center text-sm text-gray-600">
                <Activity className="w-4 h-4 mr-1" />
                {threatDetection?.activeThreats || 0} Active Threats
              </div>
            </div>

            {/* Threat Categories */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {Object.entries(threatDetection?.threatCategories || {}).map(([category, count]) => (
                <div key={category} className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-xl font-bold text-gray-900">{count}</div>
                  <div className="text-sm text-gray-600 capitalize">{category}</div>
                </div>
              ))}
            </div>

            {/* Risk Trends */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Risk Trends</h4>
              <div className="space-y-2">
                {threatDetection?.riskTrends?.map((trend, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900">{trend.metric}</span>
                      <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                        trend.riskLevel === 'high' ? 'bg-red-100 text-red-600' :
                        trend.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {trend.riskLevel}
                      </span>
                    </div>
                    <div className="flex items-center">
                      {trend.trend === 'increasing' ? (
                        <TrendingUp className="w-4 h-4 text-red-500" />
                      ) : trend.trend === 'decreasing' ? (
                        <TrendingDown className="w-4 h-4 text-green-500" />
                      ) : (
                        <Minus className="w-4 h-4 text-gray-500" />
                      )}
                      <span className="ml-1 text-sm text-gray-600">{(trend.confidence * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Real-time Monitoring */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <Zap className="w-5 h-5 text-yellow-500 mr-2" />
              Real-time Monitoring
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-xl font-bold text-blue-600">{realTimeMonitoring?.monitoredEndpoints || 0}</div>
                <div className="text-sm text-gray-600">Endpoints</div>
              </div>
              
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-xl font-bold text-green-600">{realTimeMonitoring?.activeSessions || 0}</div>
                <div className="text-sm text-gray-600">Sessions</div>
              </div>
              
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="text-xl font-bold text-orange-600">{realTimeMonitoring?.suspiciousActivities || 0}</div>
                <div className="text-sm text-gray-600">Suspicious</div>
              </div>
              
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <div className="text-xl font-bold text-red-600">{realTimeMonitoring?.blockedAttempts || 0}</div>
                <div className="text-sm text-gray-600">Blocked</div>
              </div>
              
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-xl font-bold text-purple-600">{realTimeMonitoring?.aiInterventions || 0}</div>
                <div className="text-sm text-gray-600">AI Actions</div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Alerts Panel */}
        <div className="space-y-6">
          {/* Alert Filter */}
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Security Alerts</h3>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={alertFilter}
                  onChange={(e) => setAlertFilter(e.target.value)}
                  className="text-sm border border-gray-300 rounded px-2 py-1"
                >
                  <option value="all">All Alerts</option>
                  <option value="unresolved">Unresolved</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                </select>
              </div>
            </div>

            {/* Alert List */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {getFilteredAlerts().map((alert) => (
                <div key={alert.id} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center">
                      <div className={`px-2 py-1 text-xs rounded-full ${getAlertSeverityColor(alert.severity)}`}>
                        {alert.severity.toUpperCase()}
                      </div>
                      <span className="ml-2 text-sm text-gray-600 capitalize">{alert.category}</span>
                    </div>
                    <div className="flex items-center">
                      {alert.resolved ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <button
                          onClick={() => handleResolveAlert(alert.id)}
                          className="text-blue-600 hover:text-blue-700 text-sm"
                        >
                          Resolve
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-900 mb-2">{alert.message}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{new Date(alert.timestamp).toLocaleTimeString()}</span>
                    {alert.userAffected && (
                      <span className="flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        User Affected
                      </span>
                    )}
                  </div>
                </div>
              ))}
              
              {getFilteredAlerts().length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                  <p>No {alertFilter === 'all' ? '' : alertFilter} alerts found</p>
                </div>
              )}
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Brain className="w-4 h-4 text-purple-500 mr-2" />
              AI Security Insights
            </h3>
            
            <div className="space-y-3">
              {Object.entries(securityData?.aiSecurityInsights || {}).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 capitalize">{key.replace(/_/g, ' ')}</span>
                  <span className={`text-sm px-2 py-1 rounded ${
                    value === 'active' || value === 'enabled' || value === 'continuous' || value === 'real-time'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISecurityCenter;