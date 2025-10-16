/**
 * Predictive Analytics Dashboard
 * ==============================
 * 
 * Advanced AI-powered predictive analytics for super admin featuring:
 * - Machine learning predictions for security metrics
 * - Access pattern forecasting and trend analysis
 * - Risk assessment and behavioral analytics
 * - Performance optimization recommendations
 * - Interactive visualization and insights
 */

import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Brain,
  Target,
  Zap,
  AlertTriangle,
  CheckCircle,
  Info,
  ArrowRight,
  RefreshCw,
  Download,
  Settings,
  Calendar,
  Activity,
  Users,
  Shield,
  Gauge
} from 'lucide-react';

interface PredictionData {
  metricName: string;
  currentValue: number;
  predictedValue: number;
  confidenceScore: number;
  trendDirection: 'increasing' | 'decreasing' | 'stable';
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  forecastPeriod: string;
  changePercentage: number;
  recommendations: string[];
  detailedAnalysis?: {
    factorsConsidered: string[];
    historicalAccuracy: number;
    dataQualityScore: number;
    modelVersion: string;
    lastTrained: string;
  };
}

interface TrendAnalysis {
  overallDirection: string;
  riskIndicators: string[];
  positiveTrends: string[];
  areasOfConcern: string[];
  confidenceLevel: string;
}

interface AIInsights {
  modelPerformance: string;
  predictionAccuracy: number;
  dataCoverage: number;
  anomalyDetectionRate: number;
  falsePositiveRate: number;
}

interface PredictiveAnalyticsData {
  timestamp: string;
  forecastPeriod: string;
  predictionConfidence: number;
  predictions: PredictionData[];
  trendAnalysis: TrendAnalysis;
  aiInsights: AIInsights;
}

const PredictiveAnalyticsDashboard: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<PredictiveAnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('24h');
  const [showDetails, setShowDetails] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  // Fetch predictive analytics data
  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/v1/ai-hub/analytics/?period=${selectedPeriod}&details=${showDetails}`);
      if (response.ok) {
        const data = await response.json();
        setAnalyticsData(data);
      } else {
        console.error('Failed to fetch analytics data');
      }
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalyticsData();
  }, [selectedPeriod, showDetails]);

  // Get trend icon and color
  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case 'increasing':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'decreasing':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  // Get risk level color
  const getRiskLevelColor = (level: string) => {
    const colors = {
      low: 'text-green-600 bg-green-100',
      medium: 'text-yellow-600 bg-yellow-100',
      high: 'text-orange-600 bg-orange-100',
      critical: 'text-red-600 bg-red-100'
    };
    return colors[level as keyof typeof colors] || 'text-gray-600 bg-gray-100';
  };

  // Get change percentage color
  const getChangeColor = (change: number, isPositive: boolean) => {
    if (change === 0) return 'text-gray-600';
    return isPositive 
      ? (change > 0 ? 'text-green-600' : 'text-red-600')
      : (change > 0 ? 'text-red-600' : 'text-green-600');
  };

  // Get metric icon
  const getMetricIcon = (metricName: string) => {
    if (metricName.includes('Security')) return <Shield className="w-5 h-5" />;
    if (metricName.includes('User') || metricName.includes('Activity')) return <Users className="w-5 h-5" />;
    if (metricName.includes('Performance')) return <Gauge className="w-5 h-5" />;
    if (metricName.includes('Risk')) return <AlertTriangle className="w-5 h-5" />;
    return <BarChart3 className="w-5 h-5" />;
  };

  if (loading && !analyticsData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Loading Predictive Analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Brain className="w-8 h-8 text-purple-600 mr-3" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Predictive Analytics</h1>
              <p className="text-gray-600">AI-powered forecasting and trend analysis</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Forecast Period Selector */}
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="1h">Next Hour</option>
              <option value="6h">Next 6 Hours</option>
              <option value="24h">Next 24 Hours</option>
              <option value="7d">Next 7 Days</option>
              <option value="30d">Next 30 Days</option>
            </select>
            
            {/* Details Toggle */}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                showDetails 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <Settings className="w-4 h-4" />
            </button>
            
            {/* Export Button */}
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>
        
        {/* Analytics Summary */}
        <div className="flex items-center text-sm text-gray-600 space-x-6">
          <div className="flex items-center">
            <Target className="w-4 h-4 mr-1" />
            Confidence: {analyticsData?.predictionConfidence || 0}%
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            Forecast: {analyticsData?.forecastPeriod || selectedPeriod}
          </div>
          <div className="flex items-center">
            <Brain className="w-4 h-4 mr-1" />
            AI Model: Active
          </div>
        </div>
      </div>

      {/* AI Model Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl shadow-sm border text-center">
          <div className="text-2xl font-bold text-purple-600">{analyticsData?.aiInsights?.modelPerformance || 'Optimal'}</div>
          <div className="text-sm text-gray-600">Model Status</div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border text-center">
          <div className="text-2xl font-bold text-blue-600">{analyticsData?.aiInsights?.predictionAccuracy || 0}%</div>
          <div className="text-sm text-gray-600">Accuracy</div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border text-center">
          <div className="text-2xl font-bold text-green-600">{analyticsData?.aiInsights?.dataCoverage || 0}%</div>
          <div className="text-sm text-gray-600">Data Coverage</div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border text-center">
          <div className="text-2xl font-bold text-orange-600">{analyticsData?.aiInsights?.anomalyDetectionRate || 0}%</div>
          <div className="text-sm text-gray-600">Anomaly Rate</div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border text-center">
          <div className="text-2xl font-bold text-red-600">{analyticsData?.aiInsights?.falsePositiveRate || 0}%</div>
          <div className="text-sm text-gray-600">False Positives</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Predictions Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Predictions List */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <Target className="w-5 h-5 text-purple-500 mr-2" />
              AI Predictions ({selectedPeriod})
            </h3>

            <div className="space-y-4">
              {analyticsData?.predictions?.map((prediction, index) => (
                <div 
                  key={index} 
                  className={`p-4 border rounded-lg transition-all cursor-pointer hover:shadow-md ${
                    selectedMetric === prediction.metricName ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedMetric(
                    selectedMetric === prediction.metricName ? null : prediction.metricName
                  )}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      {getMetricIcon(prediction.metricName)}
                      <span className="ml-3 font-medium text-gray-900">{prediction.metricName}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getTrendIcon(prediction.trendDirection)}
                      <div className={`px-2 py-1 text-xs rounded-full ${getRiskLevelColor(prediction.riskLevel)}`}>
                        {prediction.riskLevel.toUpperCase()}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div>
                      <div className="text-sm text-gray-600">Current</div>
                      <div className="text-lg font-semibold text-gray-900">{prediction.currentValue.toFixed(1)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Predicted</div>
                      <div className="text-lg font-semibold text-purple-600">{prediction.predictedValue.toFixed(1)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Change</div>
                      <div className={`text-lg font-semibold ${getChangeColor(
                        prediction.changePercentage, 
                        prediction.metricName.includes('Performance')
                      )}`}>
                        {prediction.changePercentage > 0 ? '+' : ''}{prediction.changePercentage}%
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-2" style={{ width: '100px' }}>
                        <div 
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: `${prediction.confidenceScore * 100}%` }}
                        ></div>
                      </div>
                      <span>{(prediction.confidenceScore * 100).toFixed(0)}% confidence</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>

                  {/* Detailed Analysis (shown when selected) */}
                  {selectedMetric === prediction.metricName && showDetails && prediction.detailedAnalysis && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Analysis Factors</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {prediction.detailedAnalysis.factorsConsidered.map((factor, i) => (
                              <li key={i} className="flex items-center">
                                <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                                {factor}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Model Metrics</h4>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div>Historical Accuracy: {prediction.detailedAnalysis.historicalAccuracy}%</div>
                            <div>Data Quality: {prediction.detailedAnalysis.dataQualityScore}%</div>
                            <div>Model Version: {prediction.detailedAnalysis.modelVersion}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Recommendations */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-2">AI Recommendations</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {prediction.recommendations.slice(0, 3).map((recommendation, i) => (
                        <li key={i} className="flex items-start">
                          <Info className="w-3 h-3 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                          {recommendation}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Insights Panel */}
        <div className="space-y-6">
          {/* Trend Analysis */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 text-blue-500 mr-2" />
              Trend Analysis
            </h3>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Overall Direction</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    analyticsData?.trendAnalysis?.overallDirection === 'improving' ? 'bg-green-100 text-green-600' :
                    analyticsData?.trendAnalysis?.overallDirection === 'declining' ? 'bg-red-100 text-red-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {analyticsData?.trendAnalysis?.overallDirection || 'Stable'}
                  </span>
                </div>
              </div>

              {/* Risk Indicators */}
              {analyticsData?.trendAnalysis?.riskIndicators && analyticsData.trendAnalysis.riskIndicators.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Risk Indicators</h4>
                  <div className="space-y-1">
                    {analyticsData.trendAnalysis.riskIndicators.map((indicator, index) => (
                      <div key={index} className="flex items-center text-sm text-red-600">
                        <AlertTriangle className="w-3 h-3 mr-2" />
                        {indicator}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Positive Trends */}
              {analyticsData?.trendAnalysis?.positiveTrends && analyticsData.trendAnalysis.positiveTrends.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Positive Trends</h4>
                  <div className="space-y-1">
                    {analyticsData.trendAnalysis.positiveTrends.map((trend, index) => (
                      <div key={index} className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-3 h-3 mr-2" />
                        {trend}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Areas of Concern */}
              {analyticsData?.trendAnalysis?.areasOfConcern && analyticsData.trendAnalysis.areasOfConcern.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Areas of Concern</h4>
                  <div className="space-y-1">
                    {analyticsData.trendAnalysis.areasOfConcern.map((concern, index) => (
                      <div key={index} className="flex items-center text-sm text-orange-600">
                        <Info className="w-3 h-3 mr-2" />
                        {concern}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Confidence Level */}
              <div className="pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Analysis Confidence</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    analyticsData?.trendAnalysis?.confidenceLevel === 'high' ? 'bg-green-100 text-green-600' :
                    analyticsData?.trendAnalysis?.confidenceLevel === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {analyticsData?.trendAnalysis?.confidenceLevel || 'Medium'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Prediction Accuracy */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Gauge className="w-5 h-5 text-green-500 mr-2" />
              Model Performance
            </h3>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Prediction Accuracy</span>
                  <span>{analyticsData?.aiInsights?.predictionAccuracy || 0}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${analyticsData?.aiInsights?.predictionAccuracy || 0}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Data Coverage</span>
                  <span>{analyticsData?.aiInsights?.dataCoverage || 0}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${analyticsData?.aiInsights?.dataCoverage || 0}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Anomaly Detection</span>
                  <span>{analyticsData?.aiInsights?.anomalyDetectionRate || 0}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-orange-500 h-2 rounded-full"
                    style={{ width: `${analyticsData?.aiInsights?.anomalyDetectionRate || 0}%` }}
                  ></div>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200 text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {analyticsData?.predictionConfidence || 0}%
                </div>
                <div className="text-sm text-gray-600">Overall Confidence</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center">
                  <RefreshCw className="w-4 h-4 text-blue-500 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">Refresh Predictions</div>
                    <div className="text-sm text-gray-600">Update with latest data</div>
                  </div>
                </div>
              </button>
              
              <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center">
                  <Settings className="w-4 h-4 text-purple-500 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">Model Settings</div>
                    <div className="text-sm text-gray-600">Configure AI parameters</div>
                  </div>
                </div>
              </button>
              
              <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center">
                  <Download className="w-4 h-4 text-green-500 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">Export Report</div>
                    <div className="text-sm text-gray-600">Download detailed analysis</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictiveAnalyticsDashboard;