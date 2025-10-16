'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Users,
  Clock,
  Award,
  Target,
  BookOpen,
  Heart,
  Brain,
  UserCheck,
  FileText,
  UserPlus,
  ClipboardCheck,
  DollarSign,
  BarChart3,
  Settings,
  TrendingUp,
  AlertTriangle,
  Bell,
  Sun,
  Moon,
  Calendar,
  Building2,
  MapPin,
  Phone,
  Mail,
  Edit,
  Eye,
  MoreVertical,
  ChevronDown,
  ChevronRight,
  Activity,
  Shield,
  Zap,
  Layout,
  Calculator,
  ArrowLeft,
  Home,
  ShieldCheck,
  Lock,
  Key,
  Database,
  Globe,
  Server,
  Crown,
  AlertOctagon,
  CheckCircle2,
  FileCheck,
  Layers,
  Network
} from 'lucide-react';
import { Line, Doughnut, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

// Type definitions - Soft coded structure
interface HRWidget {
  id: string;
  title: string;
  type: 'metric' | 'chart' | 'table' | 'ai-insight';
  size: 'small' | 'medium' | 'large';
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  data?: any;
  config?: any;
}

interface HRSubModule {
  id: string;
  name: string;
  icon: string;
  description: string;
  widgets: HRWidget[];
}

interface HRModule {
  id: string;
  name: string;
  icon: string;
  description: string;
  subModules?: HRSubModule[];
  widgets: HRWidget[];
}

// SMART SOFT CODING PATTERN: Complete HR Module Configuration
// This configuration defines all HR modules, sub-modules, and their properties
// Pattern: Always maintain complete feature set, persistent sidebar, expandable sub-options
const HR_MODULES: HRModule[] = [
  {
    id: 'overview',
    name: 'HR Dashboard',
    icon: 'BarChart3',
    description: 'Complete HR analytics and insights',
    widgets: [
      {
        id: 'total-employees',
        title: 'Total Employees',
        type: 'metric',
        size: 'small',
        position: { x: 0, y: 0, width: 1, height: 1 },
        data: { value: 1234, change: '+5.2%', trend: 'up' }
      },
      {
        id: 'active-employees',
        title: 'Active Employees',
        type: 'metric',
        size: 'small',
        position: { x: 1, y: 0, width: 1, height: 1 },
        data: { value: 1189, change: '+3.1%', trend: 'up' }
      },
      {
        id: 'attendance-rate',
        title: 'Attendance Rate',
        type: 'metric',
        size: 'small',
        position: { x: 2, y: 0, width: 1, height: 1 },
        data: { value: '94.8%', change: '+1.2%', trend: 'up' }
      },
      {
        id: 'satisfaction-score',
        title: 'Employee Satisfaction',
        type: 'metric',
        size: 'small',
        position: { x: 3, y: 0, width: 1, height: 1 },
        data: { value: '8.6/10', change: '+0.3', trend: 'up' }
      }
    ]
  },
  {
    id: 'employees',
    name: 'Employee Management',
    icon: 'Users',
    description: 'Manage employee profiles, records, and information',
    subModules: [
      {
        id: 'employee-directory',
        name: 'Employee Directory',
        icon: 'Users',
        description: 'Browse and search all employees',
        widgets: []
      },
      {
        id: 'employee-profiles',
        name: 'Employee Profiles',
        icon: 'UserCheck',
        description: 'Manage individual employee profiles',
        widgets: []
      },
      {
        id: 'onboarding',
        name: 'Employee Onboarding',
        icon: 'UserPlus',
        description: 'New employee onboarding process',
        widgets: []
      },
      {
        id: 'offboarding',
        name: 'Employee Offboarding',
        icon: 'Users',
        description: 'Employee exit process management',
        widgets: []
      }
    ],
    widgets: []
  },
  {
    id: 'recruitment',
    name: 'Recruitment',
    icon: 'Target',
    description: 'Recruitment pipeline and candidate management',
    subModules: [
      {
        id: 'job-postings',
        name: 'Job Postings',
        icon: 'FileText',
        description: 'Create and manage job openings',
        widgets: []
      },
      {
        id: 'candidate-pipeline',
        name: 'Candidate Pipeline',
        icon: 'Users',
        description: 'Track recruitment progress',
        widgets: []
      },
      {
        id: 'interviews',
        name: 'Interview Management',
        icon: 'Calendar',
        description: 'Schedule and manage interviews',
        widgets: []
      },
      {
        id: 'offers',
        name: 'Offer Management',
        icon: 'Mail',
        description: 'Create and track job offers',
        widgets: []
      }
    ],
    widgets: [
      {
        id: 'active-positions',
        title: 'Active Positions',
        type: 'metric',
        size: 'small',
        position: { x: 0, y: 0, width: 1, height: 1 },
        data: { value: 23, change: '+5 this week', trend: 'up' }
      }
    ]
  },
  {
    id: 'performance',
    name: 'Performance Management',
    icon: 'Award',
    description: 'Employee performance tracking and reviews',
    subModules: [
      {
        id: 'reviews',
        name: 'Performance Reviews',
        icon: 'ClipboardCheck',
        description: 'Conduct performance evaluations',
        widgets: []
      },
      {
        id: 'goals',
        name: 'Goals & OKRs',
        icon: 'Target',
        description: 'Set and track objectives',
        widgets: []
      },
      {
        id: '360-feedback',
        name: '360° Feedback',
        icon: 'Users',
        description: 'Multi-source feedback collection',
        widgets: []
      },
      {
        id: 'career-development',
        name: 'Career Development',
        icon: 'TrendingUp',
        description: 'Career planning and progression',
        widgets: []
      }
    ],
    widgets: [
      {
        id: 'avg-performance',
        title: 'Average Performance Score',
        type: 'metric',
        size: 'small',
        position: { x: 0, y: 0, width: 1, height: 1 },
        data: { value: '87.5%', change: '+3.1%', trend: 'up' }
      }
    ]
  },
  {
    id: 'attendance',
    name: 'Attendance & Time',
    icon: 'Clock',
    description: 'Time tracking and attendance management',
    subModules: [
      {
        id: 'time-tracking',
        name: 'Time Tracking',
        icon: 'Clock',
        description: 'Track work hours and time',
        widgets: []
      },
      {
        id: 'leave-management',
        name: 'Leave Management',
        icon: 'Calendar',
        description: 'Manage vacation and leave requests',
        widgets: []
      },
      {
        id: 'shift-scheduling',
        name: 'Shift Scheduling',
        icon: 'Calendar',
        description: 'Schedule work shifts',
        widgets: []
      },
      {
        id: 'overtime-management',
        name: 'Overtime Management',
        icon: 'Clock',
        description: 'Track and approve overtime',
        widgets: []
      }
    ],
    widgets: []
  },
  {
    id: 'learning',
    name: 'Training & Development',
    icon: 'BookOpen',
    description: 'Learning programs and skill development',
    subModules: [
      {
        id: 'training-programs',
        name: 'Training Programs',
        icon: 'BookOpen',
        description: 'Create and manage training courses',
        widgets: []
      },
      {
        id: 'certifications',
        name: 'Certifications',
        icon: 'Award',
        description: 'Track professional certifications',
        widgets: []
      },
      {
        id: 'skill-assessments',
        name: 'Skill Assessments',
        icon: 'ClipboardCheck',
        description: 'Evaluate employee skills',
        widgets: []
      },
      {
        id: 'learning-paths',
        name: 'Learning Paths',
        icon: 'Target',
        description: 'Structured learning journeys',
        widgets: []
      }
    ],
    widgets: [
      {
        id: 'training-completion',
        title: 'Training Completion Rate',
        type: 'metric',
        size: 'small',
        position: { x: 0, y: 0, width: 1, height: 1 },
        data: { value: '78.3%', change: '+5.7%', trend: 'up' }
      }
    ]
  },
  {
    id: 'wellness',
    name: 'Employee Wellness',
    icon: 'Heart',
    description: 'Health and wellness programs',
    subModules: [
      {
        id: 'wellness-programs',
        name: 'Wellness Programs',
        icon: 'Heart',
        description: 'Health and wellness initiatives',
        widgets: []
      },
      {
        id: 'mental-health',
        name: 'Mental Health Support',
        icon: 'Brain',
        description: 'Mental health resources',
        widgets: []
      },
      {
        id: 'fitness-tracking',
        name: 'Fitness Tracking',
        icon: 'Activity',
        description: 'Employee fitness programs',
        widgets: []
      },
      {
        id: 'health-benefits',
        name: 'Health Benefits',
        icon: 'Shield',
        description: 'Manage health insurance and benefits',
        widgets: []
      }
    ],
    widgets: [
      {
        id: 'wellness-participation',
        title: 'Wellness Program Participation',
        type: 'metric',
        size: 'small',
        position: { x: 0, y: 0, width: 1, height: 1 },
        data: { value: '65.4%', change: '+8.2%', trend: 'up' }
      }
    ]
  },
  {
    id: 'payroll',
    name: 'Payroll & Compensation',
    icon: 'DollarSign',
    description: 'Salary and compensation management',
    subModules: [
      {
        id: 'salary-management',
        name: 'Salary Management',
        icon: 'DollarSign',
        description: 'Manage employee salaries',
        widgets: []
      },
      {
        id: 'benefits-administration',
        name: 'Benefits Administration',
        icon: 'Shield',
        description: 'Manage employee benefits',
        widgets: []
      },
      {
        id: 'payroll-processing',
        name: 'Payroll Processing',
        icon: 'Calculator',
        description: 'Process monthly payroll',
        widgets: []
      },
      {
        id: 'tax-management',
        name: 'Tax Management',
        icon: 'FileText',
        description: 'Handle tax calculations',
        widgets: []
      }
    ],
    widgets: []
  },
  {
    id: 'analytics',
    name: 'HR Analytics',
    icon: 'BarChart3',
    description: 'Advanced HR analytics and reports',
    subModules: [
      {
        id: 'workforce-analytics',
        name: 'Workforce Analytics',
        icon: 'BarChart3',
        description: 'Analyze workforce data',
        widgets: []
      },
      {
        id: 'predictive-analytics',
        name: 'Predictive Analytics',
        icon: 'TrendingUp',
        description: 'AI-powered predictions',
        widgets: []
      },
      {
        id: 'custom-reports',
        name: 'Custom Reports',
        icon: 'FileText',
        description: 'Create custom HR reports',
        widgets: []
      },
      {
        id: 'dashboard-builder',
        name: 'Dashboard Builder',
        icon: 'Layout',
        description: 'Build custom dashboards',
        widgets: []
      }
    ],
    widgets: []
  },
  {
    id: 'settings',
    name: 'HR Settings',
    icon: 'Settings',
    description: 'Configure HR system settings',
    subModules: [
      {
        id: 'system-configuration',
        name: 'System Configuration',
        icon: 'Settings',
        description: 'Configure system settings',
        widgets: []
      },
      {
        id: 'user-management',
        name: 'User Management',
        icon: 'Users',
        description: 'Manage system users',
        widgets: []
      },
      {
        id: 'permissions',
        name: 'Permissions & Roles',
        icon: 'Shield',
        description: 'Configure access permissions',
        widgets: []
      },
      {
        id: 'integrations',
        name: 'Integrations',
        icon: 'Zap',
        description: 'Manage third-party integrations',
        widgets: []
      }
    ],
    widgets: []
  },
  {
    id: 'super-admin-ai-hub',
    name: 'Super Admin AI Hub',
    icon: 'Crown',
    description: 'Advanced administrative controls with AI-powered compliance management',
    subModules: [
      {
        id: 'system-administration',
        name: 'System Administration',
        icon: 'Settings',
        description: 'Core system administrative functions',
        widgets: []
      },
      {
        id: 'ai-governance',
        name: 'AI Governance',
        icon: 'Brain',
        description: 'AI system oversight and governance controls',
        widgets: []
      },
      {
        id: 'compliance-integration',
        name: 'Compliance Integration',
        icon: 'ShieldCheck',
        description: 'Multi-regulatory compliance management with RBAC integration',
        widgets: [
          {
            id: 'compliance-overview',
            title: 'Compliance Status Overview',
            type: 'metric',
            size: 'large',
            position: { x: 0, y: 0, width: 2, height: 1 },
            data: { 
              value: '98.7%',
              change: '+2.1%',
              trend: 'up',
              description: 'Overall compliance score across all regulations'
            }
          },
          {
            id: 'iso-27001-status',
            title: 'ISO 27001 Information Security',
            type: 'metric',
            size: 'medium',
            position: { x: 0, y: 1, width: 1, height: 1 },
            data: { 
              value: '97.3%',
              change: '+1.8%',
              trend: 'up',
              controls: 114,
              compliant: 111,
              pending: 3
            }
          },
          {
            id: 'api-q1-q2-status',
            title: 'API Q1/Q2 Oil & Gas Quality',
            type: 'metric',
            size: 'medium',
            position: { x: 1, y: 1, width: 1, height: 1 },
            data: { 
              value: '99.1%',
              change: '+0.5%',
              trend: 'up',
              audits: 45,
              passed: 44,
              pending: 1
            }
          },
          {
            id: 'iec-62443-status',
            title: 'IEC 62443 Industrial Security',
            type: 'metric',
            size: 'medium',
            position: { x: 0, y: 2, width: 1, height: 1 },
            data: { 
              value: '95.8%',
              change: '+3.2%',
              trend: 'up',
              zones: 12,
              secure: 11,
              upgrading: 1
            }
          },
          {
            id: 'nist-sp800-53-status',
            title: 'NIST SP 800-53 Access Controls',
            type: 'metric',
            size: 'medium',
            position: { x: 1, y: 2, width: 1, height: 1 },
            data: { 
              value: '99.5%',
              change: '+1.1%',
              trend: 'up',
              controls: 325,
              implemented: 323,
              reviewing: 2
            }
          },
          {
            id: 'gdpr-uae-status',
            title: 'GDPR / UAE Data Protection',
            type: 'metric',
            size: 'medium',
            position: { x: 0, y: 3, width: 1, height: 1 },
            data: { 
              value: '98.9%',
              change: '+2.7%',
              trend: 'up',
              requests: 156,
              processed: 154,
              pending: 2
            }
          }
        ]
      },
      {
        id: 'rbac-management',
        name: 'Advanced RBAC Management',
        icon: 'Key',
        description: 'Role-based access control with compliance mapping',
        widgets: []
      },
      {
        id: 'audit-intelligence',
        name: 'AI Audit Intelligence',
        icon: 'FileCheck',
        description: 'Intelligent audit management and compliance tracking',
        widgets: []
      },
      {
        id: 'regulatory-monitoring',
        name: 'Regulatory Monitoring',
        icon: 'AlertOctagon',
        description: 'Real-time regulatory change monitoring and impact analysis',
        widgets: []
      },
      {
        id: 'security-orchestration',
        name: 'Security Orchestration',
        icon: 'Network',
        description: 'Automated security policy orchestration across systems',
        widgets: []
      }
    ],
    widgets: [
      {
        id: 'admin-overview',
        title: 'Admin Operations Status',
        type: 'metric',
        size: 'small',
        position: { x: 0, y: 0, width: 1, height: 1 },
        data: { value: '24/7', change: 'Active', trend: 'up' }
      }
    ]
  }
];

// AI Insights Configuration - Soft coded insights
const AI_INSIGHTS = [
  {
    id: 'turnover-prediction',
    title: 'Turnover Risk Alert',
    message: 'High turnover risk detected in Sales department',
    recommendation: 'Consider conducting exit interviews and improving retention strategies',
    type: 'warning',
    confidence: 87,
    priority: 'High'
  },
  {
    id: 'performance-trend',
    title: 'Performance Improvement',
    message: 'Overall performance scores increased by 12% this quarter',
    recommendation: 'Maintain current training programs and recognition initiatives',
    type: 'success',
    confidence: 94,
    priority: 'Medium'
  },
  {
    id: 'compliance-auto-remediation',
    title: 'AI Compliance Optimization',
    message: 'Automated remediation applied to 15 NIST SP 800-53 controls, improving compliance from 97.2% to 99.5%',
    recommendation: 'Review AI-suggested policy updates for ISO 27001 Annex A.18 controls for enhanced incident management',
    type: 'success',
    confidence: 96,
    priority: 'High',
    regulations: ['NIST SP 800-53', 'ISO 27001']
  },
  {
    id: 'gdpr-risk-detection',
    title: 'Data Privacy Risk Detected',
    message: 'Potential GDPR/UAE Data Protection compliance gap identified in employee data retention policies',
    recommendation: 'Update data retention schedules and implement automated data lifecycle management for Articles 17 & 25 compliance',
    type: 'warning',
    confidence: 89,
    priority: 'High',
    regulations: ['GDPR', 'UAE Data Protection Law']
  },
  {
    id: 'iec-62443-enhancement',
    title: 'Industrial Security Upgrade',
    message: 'IEC 62443 zone segmentation analysis complete - 3 critical improvement areas identified',
    recommendation: 'Implement enhanced network segmentation for industrial control systems to achieve Security Level 3 compliance',
    type: 'info',
    confidence: 92,
    priority: 'Medium',
    regulations: ['IEC 62443']
  },
  {
    id: 'api-q1-audit-alert',
    title: 'Oil & Gas Quality Audit Due',
    message: 'API Q1/Q2 quarterly compliance audit scheduled in 7 days - pre-audit AI analysis shows 99.1% readiness',
    recommendation: 'Complete final documentation review for quality management system procedures and corrective action logs',
    type: 'info',
    confidence: 91,
    priority: 'Medium',
    regulations: ['API Q1', 'API Q2']
  }
];

// Icon mapping for soft coded icon system
const iconMap = {
  Users, Clock, Award, Target, BookOpen, Heart, Brain, UserCheck, FileText, UserPlus,
  ClipboardCheck, DollarSign, BarChart3, Settings, TrendingUp, AlertTriangle, Bell,
  Building2, MapPin, Phone, Mail, Edit, Eye, MoreVertical, Activity, Shield, Zap,
  Layout, Calculator, ArrowLeft, Home, ShieldCheck, Lock, Key, Database, Globe,
  Server, Crown, AlertOctagon, CheckCircle2, FileCheck, Layers, Network
};

// SMART PATTERN: Navigation Configuration for Soft Coding
const NAVIGATION_CONFIG = {
  mainDashboard: {
    url: '/dashboard',
    label: 'Main Dashboard',
    icon: 'Home',
    description: 'Return to the main dashboard'
  },
  backButton: {
    icon: 'ArrowLeft',
    label: 'Back',
    showIcon: true,
    showLabel: true,
    position: 'header-left',
    styling: {
      base: 'flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200',
      colors: 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300',
      activeColors: 'hover:shadow-md'
    }
  }
};

// Soft coded widget configurations
const WIDGET_CONFIGS = {
  chartOptions: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  },
  defaultRefreshInterval: 30000,
  sidebarWidth: 'w-64'
};

// Metric Widget Component - Soft coded design system
const MetricWidget: React.FC<{ widget: HRWidget }> = ({ widget }) => {
  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || BarChart3;
    return IconComponent;
  };

  const IconComponent = getIcon(widget.config?.icon || 'BarChart3');
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-gray-600">{widget.title}</p>
          <p className="text-2xl font-bold text-gray-900">{widget.data?.value}</p>
        </div>
        <div className="p-3 bg-blue-50 rounded-lg">
          <IconComponent className="w-6 h-6 text-blue-600" />
        </div>
      </div>
      {widget.data?.change && (
        <div className="flex items-center text-sm">
          <TrendingUp className={`w-4 h-4 mr-1 ${
            widget.data.trend === 'up' ? 'text-green-500' : 'text-red-500'
          }`} />
          <span className={widget.data.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
            {widget.data.change}
          </span>
        </div>
      )}
    </div>
  );
};

// AI Insight Widget Component - Soft coded styling system
const AIInsightWidget: React.FC<{ insight: any }> = ({ insight }) => {
  const getTypeStyles = () => {
    switch (insight.type) {
      case 'warning': return 'border-orange-200 bg-orange-50';
      case 'success': return 'border-green-200 bg-green-50';
      default: return 'border-blue-200 bg-blue-50';
    }
  };

  const getIconColor = () => {
    switch (insight.type) {
      case 'warning': return 'text-orange-600';
      case 'success': return 'text-green-600';
      default: return 'text-blue-600';
    }
  };

  return (
    <div className={`p-4 rounded-lg border ${getTypeStyles()}`}>
      <div className="flex items-start space-x-3">
        <div className={`p-2 rounded-full bg-white`}>
          <Brain className={`w-4 h-4 ${getIconColor()}`} />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-gray-900 mb-1">{insight.title}</h4>
          <p className="text-sm text-gray-700 mb-2">{insight.message}</p>
          <p className="text-xs text-gray-600 mb-2">{insight.recommendation}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              Confidence: {insight.confidence}% | Priority: {insight.priority}
            </span>
            <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
              Take Action
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Compliance Integration Widget Component - Advanced AI-powered compliance management
const ComplianceIntegrationWidget: React.FC<{ widget: HRWidget }> = ({ widget }) => {
  const getComplianceIcon = (regulation: string) => {
    const icons = {
      'ISO 27001': ShieldCheck,
      'API Q1/Q2': Database,
      'IEC 62443': Network,
      'NIST SP 800-53': Key,
      'GDPR/UAE': Globe
    };
    return icons[regulation as keyof typeof icons] || Shield;
  };

  const getComplianceColor = (score: string) => {
    const numScore = parseFloat(score);
    if (numScore >= 98) return 'text-green-600 bg-green-50 border-green-200';
    if (numScore >= 95) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (numScore >= 90) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const regulations = [
    { 
      name: 'ISO 27001', 
      fullName: 'Information Security Management',
      score: '97.3%', 
      status: 'Compliant', 
      lastAudit: '2024-09-15',
      controls: '111/114',
      risk: 'Low'
    },
    { 
      name: 'API Q1/Q2', 
      fullName: 'Oil & Gas Quality Standards',
      score: '99.1%', 
      status: 'Excellent', 
      lastAudit: '2024-10-01',
      controls: '44/45',
      risk: 'Minimal'
    },
    { 
      name: 'IEC 62443', 
      fullName: 'Industrial Network Security',
      score: '95.8%', 
      status: 'Compliant', 
      lastAudit: '2024-09-22',
      controls: '11/12',
      risk: 'Low'
    },
    { 
      name: 'NIST SP 800-53', 
      fullName: 'Access & Role Controls',
      score: '99.5%', 
      status: 'Excellent', 
      lastAudit: '2024-10-10',
      controls: '323/325',
      risk: 'Minimal'
    },
    { 
      name: 'GDPR/UAE', 
      fullName: 'Data Protection & Privacy',
      score: '98.9%', 
      status: 'Compliant', 
      lastAudit: '2024-09-30',
      controls: '154/156',
      risk: 'Low'
    }
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{widget.title}</h3>
            <p className="text-sm text-gray-600">Multi-Regulatory Compliance Dashboard</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">{widget.data?.value}</div>
          <div className="text-sm text-gray-500">Overall Score</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {regulations.map((reg, index) => {
          const IconComponent = getComplianceIcon(reg.name);
          return (
            <div 
              key={index} 
              className={`p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${getComplianceColor(reg.score)}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <IconComponent className="w-5 h-5" />
                  <span className="font-semibold text-sm">{reg.name}</span>
                </div>
                <div className="text-lg font-bold">{reg.score}</div>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium">{reg.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Controls:</span>
                  <span className="font-medium">{reg.controls}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Risk Level:</span>
                  <span className="font-medium">{reg.risk}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Audit:</span>
                  <span className="font-medium">{reg.lastAudit}</span>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-700 mb-2">{reg.fullName}</p>
                <div className="flex space-x-2">
                  <button className="flex-1 px-2 py-1 bg-white border border-gray-300 rounded text-xs hover:bg-gray-50 transition-colors">
                    View Details
                  </button>
                  <button className="flex-1 px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors">
                    AI Analysis
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-700">AI Monitoring Active</span>
            </div>
            <div className="flex items-center space-x-2">
              <Brain className="w-4 h-4 text-purple-600" />
              <span className="text-sm text-gray-700">Predictive Compliance</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg text-sm font-medium hover:from-green-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2">
              <FileCheck className="w-4 h-4" />
              <span>Generate Compliance Report</span>
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Configure</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// SMART PATTERN: Enhanced Main Dashboard Component with Persistent Sidebar
const ComprehensiveHRAIDashboard: React.FC = () => {
  // SMART PATTERN: Router for navigation using soft coding
  const router = useRouter();
  
  // State Management - Smart Pattern: Persistent sidebar with enhanced navigation
  const [selectedModule, setSelectedModule] = useState<string>('overview');
  const [selectedSubModule, setSelectedSubModule] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showAIInsights, setShowAIInsights] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(WIDGET_CONFIGS.defaultRefreshInterval);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  
  // SMART PATTERN: Initialize with some modules expanded by default for better UX
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    new Set(['employees', 'recruitment', 'performance']) // Pre-expand popular modules
  );

  // SMART PATTERN: Navigation handler using soft coding configuration
  const handleNavigateToMainDashboard = () => {
    router.push(NAVIGATION_CONFIG.mainDashboard.url);
  };

  // Enhanced module selection logic - finds current module or sub-module
  const getCurrentModule = () => {
    // First check if selected is a main module
    const mainModule = HR_MODULES.find(m => m.id === selectedModule);
    if (mainModule) return mainModule;
    
    // Then check if it's a sub-module
    for (const module of HR_MODULES) {
      if (module.subModules) {
        const subModule = module.subModules.find(sub => sub.id === selectedModule);
        if (subModule) {
          return {
            ...module,
            name: `${module.name} - ${subModule.name}`,
            description: subModule.description,
            widgets: subModule.widgets
          };
        }
      }
    }
    return HR_MODULES[0]; // Fallback to overview
  };

  const currentModule = getCurrentModule();

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || BarChart3;
    return IconComponent;
  };

  // SMART PATTERN: Enhanced toggle that maintains sidebar persistence
  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  // SMART PATTERN: Enhanced selection handler for main modules
  const handleModuleSelect = (moduleId: string) => {
    setSelectedModule(moduleId);
    setSelectedSubModule('');
    
    // Auto-expand module if it has sub-modules
    const module = HR_MODULES.find(m => m.id === moduleId);
    if (module?.subModules && module.subModules.length > 0) {
      const newExpanded = new Set(expandedModules);
      newExpanded.add(moduleId);
      setExpandedModules(newExpanded);
    }
  };

  // SMART PATTERN: Enhanced selection handler for sub-modules
  const handleSubModuleSelect = (subModuleId: string, parentModuleId: string) => {
    setSelectedModule(subModuleId);
    setSelectedSubModule(subModuleId);
    
    // Keep parent module expanded
    const newExpanded = new Set(expandedModules);
    newExpanded.add(parentModuleId);
    setExpandedModules(newExpanded);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">HR AI</h1>
              <p className="text-xs text-gray-500">Dashboard</p>
            </div>
          </div>
        </div>

        {/* SMART PATTERN: Enhanced Navigation with Persistent Sidebar */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {HR_MODULES.map((module) => {
            const ModuleIcon = getIcon(module.icon);
            const isExpanded = expandedModules.has(module.id);
            const hasSubModules = module.subModules && module.subModules.length > 0;
            
            // Enhanced selection logic - check if current selection is this module or any of its sub-modules
            const isModuleActive = selectedModule === module.id || 
              (module.subModules?.some(sub => sub.id === selectedModule) ?? false);

            return (
              <div key={module.id} className="mb-1">
                <button
                  onClick={() => {
                    // SMART PATTERN: Separate click handlers for module selection and expansion
                    handleModuleSelect(module.id);
                    if (hasSubModules) {
                      toggleModule(module.id);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-left rounded-lg transition-all duration-200 group ${
                    isModuleActive
                      ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200 shadow-sm'
                      : 'text-gray-700 hover:bg-gray-50 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <ModuleIcon className={`w-5 h-5 transition-colors duration-200 ${
                      isModuleActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'
                    }`} />
                    <span className="font-medium text-sm">{module.name}</span>
                  </div>
                  {hasSubModules && (
                    <div className="flex-shrink-0">
                      {isExpanded ? (
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                          isModuleActive ? 'text-blue-500' : 'text-gray-400'
                        }`} />
                      ) : (
                        <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${
                          isModuleActive ? 'text-blue-500' : 'text-gray-400'
                        }`} />
                      )}
                    </div>
                  )}
                </button>

                {/* SMART PATTERN: Enhanced Sub-modules with Better Styling */}
                {hasSubModules && isExpanded && (
                  <div className="ml-6 mt-2 space-y-1 border-l-2 border-gray-100 pl-4">
                    {module.subModules?.map((subModule) => {
                      const SubIcon = getIcon(subModule.icon);
                      const isSubActive = selectedModule === subModule.id;
                      
                      return (
                        <button
                          key={subModule.id}
                          onClick={() => handleSubModuleSelect(subModule.id, module.id)}
                          className={`w-full flex items-center space-x-3 px-3 py-2 text-left text-sm rounded-md transition-all duration-200 group ${
                            isSubActive
                              ? 'bg-blue-100 text-blue-800 border border-blue-200 shadow-sm'
                              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                          }`}
                        >
                          <SubIcon className={`w-4 h-4 transition-colors duration-200 ${
                            isSubActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                          }`} />
                          <span className="truncate">{subModule.name}</span>
                          {isSubActive && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full ml-auto flex-shrink-0"></div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">JD</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">John Doe</p>
              <p className="text-xs text-gray-500">HR Manager</p>
            </div>
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            {/* SMART PATTERN: Left section with back button and module info */}
            <div className="flex items-center space-x-4">
              {/* SMART PATTERN: Back to Main Dashboard Button - Soft Coded */}
              <button
                onClick={handleNavigateToMainDashboard}
                className={`${NAVIGATION_CONFIG.backButton.styling.base} ${NAVIGATION_CONFIG.backButton.styling.colors} ${NAVIGATION_CONFIG.backButton.styling.activeColors}`}
                title={NAVIGATION_CONFIG.mainDashboard.description}
              >
                {NAVIGATION_CONFIG.backButton.showIcon && (
                  <>
                    {(() => {
                      const BackIcon = getIcon(NAVIGATION_CONFIG.backButton.icon);
                      return <BackIcon className="w-4 h-4" />;
                    })()}
                  </>
                )}
                {NAVIGATION_CONFIG.backButton.showLabel && (
                  <span className="text-sm font-medium">{NAVIGATION_CONFIG.mainDashboard.label}</span>
                )}
              </button>
              
              {/* Module Information */}
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{currentModule.name}</h1>
                <p className="text-gray-600 mt-1">{currentModule.description}</p>
              </div>
            </div>
            
            {/* Right section with existing controls */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowAIInsights(!showAIInsights)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors duration-200 ${
                  showAIInsights
                    ? 'bg-blue-50 border-blue-200 text-blue-700'
                    : 'bg-gray-50 border-gray-200 text-gray-700'
                }`}
              >
                <Brain className="w-4 h-4" />
                <span className="text-sm font-medium">AI Insights</span>
              </button>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className={`grid gap-6 ${showAIInsights ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
            {/* Main Content Area */}
            <div className={`${showAIInsights ? 'lg:col-span-3' : 'lg:col-span-3'}`}>
              {/* Widgets Grid - Smart rendering based on widget type */}
              {currentModule.widgets.length > 0 && (
                <div className="space-y-6 mb-6">
                  {currentModule.widgets.map((widget) => {
                    // Special handling for compliance integration widgets
                    if (widget.id === 'compliance-overview' || widget.title.includes('Compliance')) {
                      return <ComplianceIntegrationWidget key={widget.id} widget={widget} />;
                    }
                    
                    // Regular metric widgets
                    if (widget.type === 'metric') {
                      return (
                        <div key={widget.id} className={`
                          ${widget.size === 'large' ? 'col-span-full' : 
                            widget.size === 'medium' ? 'md:col-span-2' : 'md:col-span-1'}
                        `}>
                          <MetricWidget widget={widget} />
                        </div>
                      );
                    }
                    
                    // Default fallback
                    return <MetricWidget key={widget.id} widget={widget} />;
                  })}
                </div>
              )}
              
              {/* Additional Metrics for Non-Compliance Modules */}
              {currentModule.widgets.length > 0 && 
               !currentModule.widgets.some(w => w.id === 'compliance-overview') && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  {currentModule.widgets.filter(w => w.id !== 'compliance-overview' && !w.title.includes('Compliance')).map((widget) => (
                    <MetricWidget key={widget.id} widget={widget} />
                  ))}
                </div>
              )}

              {/* Additional Content Based on Module */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {currentModule.name} Analytics
                  </h3>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <p className="text-sm">Analytics and charts will be displayed here</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Soft coded visualization system ready for data integration
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Insights Panel */}
            {showAIInsights && (
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">AI Insights</h3>
                    <Brain className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="space-y-4">
                    {AI_INSIGHTS
                      .filter((insight) => {
                        // Show compliance insights when in Super Admin AI Hub or Compliance Integration
                        if (selectedModule === 'super-admin-ai-hub' || selectedModule === 'compliance-integration') {
                          return insight.regulations || insight.id.includes('compliance') || insight.id.includes('gdpr') || insight.id.includes('iec') || insight.id.includes('api');
                        }
                        // Show general insights for other modules
                        return !insight.regulations;
                      })
                      .map((insight) => (
                        <AIInsightWidget key={insight.id} insight={insight} />
                      ))}
                    
                    {/* Additional Compliance-Specific AI Insights */}
                    {(selectedModule === 'super-admin-ai-hub' || selectedModule === 'compliance-integration') && (
                      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                        <div className="flex items-center space-x-2 mb-3">
                          <Crown className="w-5 h-5 text-purple-600" />
                          <h4 className="font-semibold text-purple-900">Super Admin AI Intelligence</h4>
                        </div>
                        <div className="space-y-2 text-sm text-purple-800">
                          <p>• Real-time RBAC policy validation across all compliance frameworks</p>
                          <p>• Automated ISO 27001 Annex A control monitoring and remediation</p>
                          <p>• Predictive API Q1/Q2 audit preparation with 99.2% accuracy</p>
                          <p>• IEC 62443 industrial security zone integrity verification</p>
                          <p>• GDPR/UAE Data Protection automated consent management</p>
                        </div>
                        <div className="mt-3 flex space-x-2">
                          <button className="px-3 py-1 bg-purple-600 text-white rounded text-xs hover:bg-purple-700 transition-colors">
                            View AI Dashboard
                          </button>
                          <button className="px-3 py-1 border border-purple-300 text-purple-700 rounded text-xs hover:bg-purple-50 transition-colors">
                            Configure AI Rules
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ComprehensiveHRAIDashboard;