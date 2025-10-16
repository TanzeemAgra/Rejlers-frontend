import { 
  Building2, 
  Users, 
  DollarSign, 
  FileText, 
  Package, 
  TrendingUp, 
  Shield, 
  BarChart3,
  Settings,
  UserCheck,
  Phone,
  Home,
  Database,
  Bell,
  Search,
  Calendar,
  Mail,
  Download,
  Upload,
  Plus,
  Edit,
  Trash2,
  Eye,
  Filter,
  Lock,
  RefreshCw,
  LogOut,
  HelpCircle,
  Crown,
  Bot,
  Brain,
  Zap,
  Activity,
  MonitorSpeaker,
  Cpu,
  AlertTriangle,
  CheckCircle,
  FileCheck,
  Target,
  Briefcase,
  Globe,
  Layers,
  Network,
  PieChart,
  Smartphone,
  Tablet,
  Wifi,
  Award,
  BookOpen,
  Compass,
  GitBranch
} from 'lucide-react';

// Module Configuration with soft coding approach
export interface SidebarModule {
  id: string;
  title: string;
  icon: any;
  badge?: string;
  badgeColor?: string;
  children?: SidebarItem[];
  items?: SidebarItem[];
  hasSubmenu?: boolean;
  path?: string;
  permissions?: string[];
  isActive: boolean;
}

export interface SidebarItem {
  id: string;
  title: string;
  icon: any;
  path: string;
  badge?: string;
  badgeColor?: string;
  permissions?: string[];
  description?: string;
}

// Centralized sidebar configuration using soft coding
export const getSidebarConfiguration = (): SidebarModule[] => {
  return [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: Home,
      path: '/dashboard',
      isActive: true,
      permissions: ['view_dashboard']
    },
    {
      id: 'projects',
      title: 'Projects & Engineering',
      icon: Building2,
      badge: '12',
      badgeColor: 'blue',
      isActive: true,
      hasSubmenu: true,
      permissions: ['view_projects'],
      items: [
        {
          id: 'ai-project-dashboard',
          title: 'AI Project Dashboard',
          icon: Brain,
          path: '/projects/ai-dashboard',
          badge: 'LIVE',
          badgeColor: 'green',
          description: 'AI-powered project insights and predictive analytics'
        },
        {
          id: 'smart-project-planning',
          title: 'Smart Project Planning',
          icon: Zap,
          path: '/projects/smart-planning',
          badge: 'AI',
          badgeColor: 'purple',
          description: 'AI-assisted project planning with resource optimization'
        },
        {
          id: 'projects-list',
          title: 'All Projects',
          icon: Building2,
          path: '/projects',
          badge: '12',
          badgeColor: 'blue',
          description: 'Comprehensive project portfolio management'
        },
        {
          id: 'intelligent-scheduling',
          title: 'Intelligent Scheduling',
          icon: Calendar,
          path: '/projects/ai-scheduling',
          badge: 'ML',
          badgeColor: 'indigo',
          description: 'Machine learning-powered project scheduling'
        },
        {
          id: 'risk-prediction',
          title: 'Risk Prediction Engine',
          icon: AlertTriangle,
          path: '/projects/risk-ai',
          badge: '3',
          badgeColor: 'red',
          description: 'AI-driven project risk assessment and mitigation'
        },
        {
          id: 'resource-optimization',
          title: 'Resource Optimization',
          icon: Activity,
          path: '/projects/resources-ai',
          description: 'AI-optimized resource allocation and management'
        },
        {
          id: 'project-templates-ai',
          title: 'Smart Templates',
          icon: FileCheck,
          path: '/projects/templates-ai',
          badge: '25',
          badgeColor: 'green',
          description: 'AI-generated project templates and standards'
        },
        {
          id: 'performance-analytics',
          title: 'Performance Analytics',
          icon: TrendingUp,
          path: '/projects/performance',
          description: 'Real-time project performance monitoring'
        },
        {
          id: 'team-collaboration-ai',
          title: 'AI Team Collaboration',
          icon: Users,
          path: '/projects/collaboration',
          badge: '89',
          badgeColor: 'blue',
          description: 'Intelligent team coordination and communication'
        },
        {
          id: 'quality-assurance-ai',
          title: 'AI Quality Assurance',
          icon: CheckCircle,
          path: '/projects/qa-ai',
          badge: '98%',
          badgeColor: 'green',
          description: 'Automated quality control and compliance checking'
        }
      ]
    },
    {
      id: 'hr',
      title: 'Human Resources',
      icon: Users,
      badge: '89',
      badgeColor: 'green',
      isActive: true,
      hasSubmenu: true,
      permissions: ['view_hr'],
      items: [
        {
          id: 'hr-ai-dashboard',
          title: 'HR AI Dashboard',
          icon: Brain,
          path: '/hr/ai-dashboard',
          badge: 'LIVE',
          badgeColor: 'green',
          description: 'AI-powered HR analytics and workforce insights'
        },
        {
          id: 'talent-acquisition-ai',
          title: 'AI Talent Acquisition',
          icon: Target,
          path: '/hr/talent-ai',
          badge: 'ML',
          badgeColor: 'purple',
          description: 'Intelligent recruitment and candidate matching'
        },
        {
          id: 'employees-360',
          title: 'Employee 360° View',
          icon: Users,
          path: '/hr/employees',
          badge: '89',
          badgeColor: 'blue',
          description: 'Comprehensive employee lifecycle management'
        },
        {
          id: 'performance-ai',
          title: 'Performance AI Engine',
          icon: TrendingUp,
          path: '/hr/performance-ai',
          badge: 'NEW',
          badgeColor: 'green',
          description: 'AI-driven performance evaluation and improvement'
        },
        {
          id: 'smart-scheduling',
          title: 'Smart Scheduling',
          icon: Calendar,
          path: '/hr/smart-schedule',
          badge: '3',
          badgeColor: 'yellow',
          description: 'Intelligent workforce scheduling and optimization'
        },
        {
          id: 'predictive-analytics',
          title: 'Predictive Analytics',
          icon: BarChart3,
          path: '/hr/predictive',
          description: 'Employee turnover prediction and retention insights'
        },
        {
          id: 'learning-development',
          title: 'AI Learning & Development',
          icon: BookOpen,
          path: '/hr/learning-ai',
          badge: '47',
          badgeColor: 'indigo',
          description: 'Personalized learning paths and skill development'
        },
        {
          id: 'payroll-intelligence',
          title: 'Payroll Intelligence',
          icon: DollarSign,
          path: '/hr/payroll-ai',
          description: 'Automated payroll processing with anomaly detection'
        },
        {
          id: 'wellness-monitoring',
          title: 'Employee Wellness AI',
          icon: Activity,
          path: '/hr/wellness',
          badge: '92%',
          badgeColor: 'green',
          description: 'AI-powered employee wellness and engagement tracking'
        },
        {
          id: 'compliance-automation',
          title: 'HR Compliance Automation',
          icon: Shield,
          path: '/hr/compliance-ai',
          description: 'Automated HR compliance monitoring and reporting'
        }
      ]
    },
    {
      id: 'finance',
      title: 'Finance Management',
      icon: DollarSign,
      badge: 'AI',
      badgeColor: 'purple',
      isActive: true,
      hasSubmenu: true,
      permissions: ['view_finance'],
      items: [
        {
          id: 'finance-ai-cockpit',
          title: 'Finance AI Cockpit',
          icon: Brain,
          path: '/finance/ai-cockpit',
          badge: 'LIVE',
          badgeColor: 'green',
          description: 'Real-time financial intelligence and AI insights'
        },
        {
          id: 'predictive-budgeting',
          title: 'Predictive Budgeting',
          icon: Target,
          path: '/finance/predictive-budget',
          badge: 'ML',
          badgeColor: 'indigo',
          description: 'AI-powered budget forecasting and optimization'
        },
        {
          id: 'smart-invoicing',
          title: 'Smart Invoicing',
          icon: Zap,
          path: '/finance/smart-invoices',
          badge: '7',
          badgeColor: 'blue',
          description: 'Automated invoice generation with AI validation'
        },
        {
          id: 'expense-intelligence',
          title: 'Expense Intelligence',
          icon: Eye,
          path: '/finance/expense-ai',
          badge: 'AUTO',
          badgeColor: 'green',
          description: 'Intelligent expense categorization and fraud detection'
        },
        {
          id: 'cash-flow-prediction',
          title: 'Cash Flow Prediction',
          icon: TrendingUp,
          path: '/finance/cashflow-ai',
          description: 'AI-driven cash flow forecasting and optimization'
        },
        {
          id: 'risk-assessment-ai',
          title: 'Financial Risk AI',
          icon: AlertTriangle,
          path: '/finance/risk-ai',
          badge: '2',
          badgeColor: 'red',
          description: 'Automated financial risk assessment and mitigation'
        },
        {
          id: 'payment-optimization',
          title: 'Payment Optimization',
          icon: Activity,
          path: '/finance/payment-ai',
          description: 'AI-optimized payment processing and reconciliation'
        },
        {
          id: 'profitability-analysis',
          title: 'Profitability Analysis AI',
          icon: PieChart,
          path: '/finance/profitability-ai',
          description: 'Deep learning profitability insights by project/client'
        },
        {
          id: 'compliance-monitoring',
          title: 'Financial Compliance AI',
          icon: Shield,
          path: '/finance/compliance-ai',
          badge: '99%',
          badgeColor: 'green',
          description: 'Automated financial compliance and regulatory monitoring'
        },
        {
          id: 'investment-ai',
          title: 'Investment Intelligence',
          icon: Briefcase,
          path: '/finance/investment-ai',
          description: 'AI-powered investment analysis and portfolio optimization'
        }
      ]
    },
    {
      id: 'contracts',
      title: 'Contracts',
      icon: FileText,
      badge: '23',
      badgeColor: 'indigo',
      isActive: true,
      hasSubmenu: true,
      permissions: ['view_contracts'],
      items: [
        {
          id: 'contract-ai-hub',
          title: 'Contract AI Hub',
          icon: Brain,
          path: '/contracts/ai-hub',
          badge: 'AI',
          badgeColor: 'purple',
          description: 'AI-powered contract intelligence and automation'
        },
        {
          id: 'smart-contract-analysis',
          title: 'Smart Contract Analysis',
          icon: Eye,
          path: '/contracts/ai-analysis',
          badge: 'ML',
          badgeColor: 'indigo',
          description: 'AI-driven contract risk analysis and clause extraction'
        },
        {
          id: 'contracts-portfolio',
          title: 'Contract Portfolio',
          icon: FileText,
          path: '/contracts',
          badge: '23',
          badgeColor: 'blue',
          description: 'Comprehensive contract lifecycle management'
        },
        {
          id: 'automated-drafting',
          title: 'AI Contract Drafting',
          icon: Zap,
          path: '/contracts/ai-drafting',
          badge: 'NEW',
          badgeColor: 'green',
          description: 'Automated contract generation with AI assistance'
        },
        {
          id: 'compliance-checker',
          title: 'Compliance Checker AI',
          icon: Shield,
          path: '/contracts/compliance-ai',
          badge: '98%',
          badgeColor: 'green',
          description: 'Real-time contract compliance validation'
        },
        {
          id: 'negotiation-assistant',
          title: 'Negotiation Assistant',
          icon: Users,
          path: '/contracts/negotiation-ai',
          description: 'AI-powered negotiation insights and recommendations'
        },
        {
          id: 'renewal-prediction',
          title: 'Renewal Prediction Engine',
          icon: RefreshCw,
          path: '/contracts/renewal-ai',
          badge: '8',
          badgeColor: 'yellow',
          description: 'Predictive contract renewal and risk assessment'
        },
        {
          id: 'approval-workflow-ai',
          title: 'AI Approval Workflow',
          icon: CheckCircle,
          path: '/contracts/approval-ai',
          badge: '2',
          badgeColor: 'red',
          description: 'Intelligent approval routing and decision support'
        },
        {
          id: 'performance-monitoring',
          title: 'Performance Monitoring',
          icon: Activity,
          path: '/contracts/performance-ai',
          description: 'AI-powered contract performance tracking and alerts'
        },
        {
          id: 'legal-research-ai',
          title: 'Legal Research AI',
          icon: Search,
          path: '/contracts/legal-ai',
          description: 'Intelligent legal precedent and clause research'
        }
      ]
    },
    {
      id: 'supply-chain',
      title: 'Supply Chain',
      icon: Package,
      badge: '156',
      badgeColor: 'blue',
      isActive: true,
      hasSubmenu: true,
      permissions: ['view_supply_chain'],
      items: [
        {
          id: 'supply-chain-ai-command',
          title: 'Supply Chain AI Command',
          icon: Brain,
          path: '/supply-chain/ai-command',
          badge: 'LIVE',
          badgeColor: 'green',
          description: 'AI-powered supply chain orchestration and optimization'
        },
        {
          id: 'demand-forecasting',
          title: 'Demand Forecasting AI',
          icon: TrendingUp,
          path: '/supply-chain/demand-ai',
          badge: 'ML',
          badgeColor: 'purple',
          description: 'Machine learning demand prediction and planning'
        },
        {
          id: 'intelligent-sourcing',
          title: 'Intelligent Sourcing',
          icon: Search,
          path: '/supply-chain/sourcing-ai',
          badge: 'AUTO',
          badgeColor: 'indigo',
          description: 'AI-powered supplier discovery and evaluation'
        },
        {
          id: 'vendor-intelligence',
          title: 'Vendor Intelligence',
          icon: Building2,
          path: '/supply-chain/vendors-ai',
          badge: '78',
          badgeColor: 'blue',
          description: 'AI-enhanced vendor relationship and risk management'
        },
        {
          id: 'smart-procurement',
          title: 'Smart Procurement',
          icon: Zap,
          path: '/supply-chain/procurement-ai',
          badge: '8',
          badgeColor: 'green',
          description: 'Automated procurement with intelligent decision making'
        },
        {
          id: 'inventory-optimization',
          title: 'Inventory Optimization AI',
          icon: Package,
          path: '/supply-chain/inventory-ai',
          badge: '156',
          badgeColor: 'yellow',
          description: 'AI-optimized inventory management and stock prediction'
        },
        {
          id: 'logistics-intelligence',
          title: 'Logistics Intelligence',
          icon: Network,
          path: '/supply-chain/logistics-ai',
          description: 'Real-time logistics optimization and route planning'
        },
        {
          id: 'risk-mitigation-ai',
          title: 'Risk Mitigation AI',
          icon: AlertTriangle,
          path: '/supply-chain/risk-ai',
          badge: '3',
          badgeColor: 'red',
          description: 'Predictive supply chain risk assessment and mitigation'
        },
        {
          id: 'sustainability-tracker',
          title: 'Sustainability Tracker',
          icon: Globe,
          path: '/supply-chain/sustainability',
          badge: '85%',
          badgeColor: 'green',
          description: 'AI-powered sustainability and carbon footprint tracking'
        },
        {
          id: 'cost-optimization',
          title: 'Cost Optimization Engine',
          icon: DollarSign,
          path: '/supply-chain/cost-ai',
          description: 'Intelligent cost reduction and spend optimization'
        }
      ]
    },
    {
      id: 'sales',
      title: 'Sales & Marketing',
      icon: TrendingUp,
      badge: '45',
      badgeColor: 'green',
      isActive: true,
      hasSubmenu: true,
      permissions: ['view_sales'],
      items: [
        {
          id: 'sales-ai-engine',
          title: 'Sales AI Engine',
          icon: Brain,
          path: '/sales/ai-engine',
          badge: 'AI',
          badgeColor: 'purple',
          description: 'AI-powered sales intelligence and revenue optimization'
        },
        {
          id: 'predictive-lead-scoring',
          title: 'Predictive Lead Scoring',
          icon: Target,
          path: '/sales/lead-scoring-ai',
          badge: 'ML',
          badgeColor: 'indigo',
          description: 'Machine learning lead qualification and prioritization'
        },
        {
          id: 'smart-crm',
          title: 'Smart CRM',
          icon: Users,
          path: '/sales/smart-crm',
          badge: '45',
          badgeColor: 'blue',
          description: 'AI-enhanced customer relationship management'
        },
        {
          id: 'opportunity-intelligence',
          title: 'Opportunity Intelligence',
          icon: Zap,
          path: '/sales/opportunities-ai',
          badge: '12',
          badgeColor: 'yellow',
          description: 'AI-driven opportunity analysis and win probability'
        },
        {
          id: 'conversation-ai',
          title: 'Conversation AI',
          icon: Bot,
          path: '/sales/conversation-ai',
          badge: 'LIVE',
          badgeColor: 'green',
          description: 'Intelligent conversation analysis and coaching'
        },
        {
          id: 'proposal-generator',
          title: 'AI Proposal Generator',
          icon: FileCheck,
          path: '/sales/proposal-ai',
          badge: '3',
          badgeColor: 'purple',
          description: 'Automated proposal creation with AI optimization'
        },
        {
          id: 'market-intelligence',
          title: 'Market Intelligence',
          icon: Globe,
          path: '/sales/market-ai',
          description: 'AI-powered market analysis and competitive insights'
        },
        {
          id: 'churn-prediction',
          title: 'Churn Prediction Engine',
          icon: AlertTriangle,
          path: '/sales/churn-ai',
          badge: '2',
          badgeColor: 'red',
          description: 'Predictive customer churn analysis and retention'
        },
        {
          id: 'price-optimization',
          title: 'Price Optimization AI',
          icon: DollarSign,
          path: '/sales/pricing-ai',
          description: 'Dynamic pricing optimization with market intelligence'
        },
        {
          id: 'sales-forecasting',
          title: 'Sales Forecasting AI',
          icon: BarChart3,
          path: '/sales/forecasting-ai',
          badge: '94%',
          badgeColor: 'green',
          description: 'Advanced revenue forecasting and pipeline analytics'
        }
      ]
    },
    {
      id: 'hse',
      title: 'HSE Compliance',
      icon: Shield,
      badge: 'AI',
      badgeColor: 'red',
      isActive: true,
      hasSubmenu: true,
      permissions: ['view_hse'],
      items: [
        {
          id: 'hse-ai-guardian',
          title: 'HSE AI Guardian',
          icon: Brain,
          path: '/hse/ai-guardian',
          badge: 'LIVE',
          badgeColor: 'green',
          description: 'AI-powered safety monitoring and risk prevention'
        },
        {
          id: 'predictive-safety',
          title: 'Predictive Safety AI',
          icon: AlertTriangle,
          path: '/hse/predictive-safety',
          badge: 'ML',
          badgeColor: 'purple',
          description: 'Machine learning accident prediction and prevention'
        },
        {
          id: 'incident-intelligence',
          title: 'Incident Intelligence',
          icon: Eye,
          path: '/hse/incident-ai',
          badge: '2',
          badgeColor: 'red',
          description: 'AI-enhanced incident analysis and root cause detection'
        },
        {
          id: 'smart-risk-assessment',
          title: 'Smart Risk Assessment',
          icon: Search,
          path: '/hse/risk-ai',
          badge: 'AUTO',
          badgeColor: 'indigo',
          description: 'Automated risk assessment with AI recommendations'
        },
        {
          id: 'compliance-automation',
          title: 'Compliance Automation',
          icon: CheckCircle,
          path: '/hse/compliance-ai',
          badge: '98%',
          badgeColor: 'green',
          description: 'Automated compliance monitoring and reporting'
        },
        {
          id: 'safety-training-ai',
          title: 'Safety Training AI',
          icon: BookOpen,
          path: '/hse/training-ai',
          badge: '156',
          badgeColor: 'blue',
          description: 'Personalized safety training with VR/AR integration'
        },
        {
          id: 'environmental-monitoring',
          title: 'Environmental AI Monitor',
          icon: Globe,
          path: '/hse/environmental-ai',
          description: 'Real-time environmental impact tracking and optimization'
        },
        {
          id: 'safety-culture-ai',
          title: 'Safety Culture AI',
          icon: Users,
          path: '/hse/culture-ai',
          badge: '87%',
          badgeColor: 'green',
          description: 'AI-powered safety culture assessment and improvement'
        },
        {
          id: 'emergency-response-ai',
          title: 'Emergency Response AI',
          icon: Bell,
          path: '/hse/emergency-ai',
          description: 'Intelligent emergency response coordination and optimization'
        },
        {
          id: 'audit-intelligence',
          title: 'Audit Intelligence',
          icon: Activity,
          path: '/hse/audit-ai',
          description: 'AI-driven audit planning, execution, and follow-up'
        }
      ]
    },
    {
      id: 'reporting',
      title: 'Reporting & Analytics',
      icon: BarChart3,
      badge: 'AI',
      badgeColor: 'purple',
      isActive: true,
      hasSubmenu: true,
      permissions: ['view_reports'],
      items: [
        {
          id: 'analytics-ai-lab',
          title: 'Analytics AI Lab',
          icon: Brain,
          path: '/reports/ai-lab',
          badge: 'LIVE',
          badgeColor: 'green',
          description: 'Advanced AI analytics and business intelligence hub'
        },
        {
          id: 'predictive-analytics',
          title: 'Predictive Analytics Suite',
          icon: TrendingUp,
          path: '/reports/predictive',
          badge: 'ML',
          badgeColor: 'purple',
          description: 'Machine learning-powered business forecasting'
        },
        {
          id: 'executive-ai-dashboard',
          title: 'Executive AI Dashboard',
          icon: Crown,
          path: '/reports/executive-ai',
          badge: 'C-SUITE',
          badgeColor: 'indigo',
          description: 'AI-powered executive insights and strategic analytics'
        },
        {
          id: 'real-time-intelligence',
          title: 'Real-Time Intelligence',
          icon: Activity,
          path: '/reports/real-time',
          badge: 'LIVE',
          badgeColor: 'green',
          description: 'Live business intelligence with streaming analytics'
        },
        {
          id: 'automated-reporting',
          title: 'Automated Reporting AI',
          icon: Bot,
          path: '/reports/automated',
          badge: 'AUTO',
          badgeColor: 'blue',
          description: 'Self-generating reports with natural language insights'
        },
        {
          id: 'data-storytelling',
          title: 'AI Data Storytelling',
          icon: FileText,
          path: '/reports/storytelling',
          description: 'Automated narrative generation from data insights'
        },
        {
          id: 'anomaly-detection',
          title: 'Anomaly Detection Engine',
          icon: AlertTriangle,
          path: '/reports/anomaly-ai',
          badge: '3',
          badgeColor: 'red',
          description: 'AI-powered anomaly detection across all business metrics'
        },
        {
          id: 'competitive-intelligence',
          title: 'Competitive Intelligence',
          icon: Search,
          path: '/reports/competitive-ai',
          description: 'AI-driven market and competitor analysis'
        },
        {
          id: 'custom-ai-reports',
          title: 'Custom AI Reports',
          icon: Layers,
          path: '/reports/custom-ai',
          badge: '47',
          badgeColor: 'yellow',
          description: 'Build intelligent custom reports with AI assistance'
        },
        {
          id: 'performance-optimization',
          title: 'Performance Optimization AI',
          icon: Zap,
          path: '/reports/performance-ai',
          description: 'AI recommendations for business process optimization'
        }
      ]
    },
    {
      id: 'rto-apc',
      title: 'RTO & APC',
      icon: UserCheck,
      badge: '67',
      badgeColor: 'indigo',
      isActive: true,
      hasSubmenu: true,
      permissions: ['view_rto'],
      items: [
        {
          id: 'rto-ai-academy',
          title: 'RTO AI Academy',
          icon: Brain,
          path: '/rto/ai-academy',
          badge: 'AI',
          badgeColor: 'purple',
          description: 'AI-powered learning and development ecosystem'
        },
        {
          id: 'adaptive-learning',
          title: 'Adaptive Learning AI',
          icon: BookOpen,
          path: '/rto/adaptive-learning',
          badge: 'ML',
          badgeColor: 'indigo',
          description: 'Personalized learning paths with AI optimization'
        },
        {
          id: 'smart-certifications',
          title: 'Smart Certifications',
          icon: Award,
          path: '/rto/certifications-ai',
          badge: '67',
          badgeColor: 'blue',
          description: 'AI-enhanced certification tracking and validation'
        },
        {
          id: 'competency-prediction',
          title: 'Competency Prediction AI',
          icon: Target,
          path: '/rto/competency-ai',
          badge: 'PRED',
          badgeColor: 'green',
          description: 'Predictive competency gap analysis and planning'
        },
        {
          id: 'intelligent-assessments',
          title: 'Intelligent Assessments',
          icon: Zap,
          path: '/rto/assessments-ai',
          badge: '8',
          badgeColor: 'yellow',
          description: 'AI-powered adaptive assessment and evaluation'
        },
        {
          id: 'skill-mapping-ai',
          title: 'Skill Mapping AI',
          icon: Network,
          path: '/rto/skill-mapping',
          description: 'Dynamic skill mapping and career pathway optimization'
        },
        {
          id: 'compliance-automation-rto',
          title: 'Compliance Automation',
          icon: CheckCircle,
          path: '/rto/compliance-ai',
          badge: '99%',
          badgeColor: 'green',
          description: 'Automated RTO compliance monitoring and reporting'
        },
        {
          id: 'virtual-training-ai',
          title: 'Virtual Training AI',
          icon: Smartphone,
          path: '/rto/virtual-training',
          badge: 'VR/AR',
          badgeColor: 'purple',
          description: 'Immersive AI-powered virtual training experiences'
        },
        {
          id: 'learning-analytics',
          title: 'Learning Analytics AI',
          icon: BarChart3,
          path: '/rto/analytics-ai',
          description: 'Advanced learning analytics and performance insights'
        },
        {
          id: 'quality-assurance-rto',
          title: 'Quality Assurance AI',
          icon: Shield,
          path: '/rto/quality-ai',
          badge: '96%',
          badgeColor: 'green',
          description: 'AI-driven training quality assurance and improvement'
        }
      ]
    },
    {
      id: 'super-admin-ai',
      title: 'Super Admin AI Hub',
      icon: Crown,
      badge: 'AI',
      badgeColor: 'purple',
      isActive: true,
      permissions: ['super_admin_access'],
      hasSubmenu: true,
      items: [
        {
          id: 'ai-dashboard',
          title: 'AI Control Center',
          icon: Brain,
          path: '/dashboard/super-admin/ai-dashboard',
          badge: 'LIVE',
          badgeColor: 'green',
          description: 'AI-powered system monitoring and intelligent insights'
        },
        {
          id: 'user-management-ai',
          title: 'Smart User Management',
          icon: Users,
          path: '/dashboard/super-admin/user-management',
          badge: '247',
          badgeColor: 'blue',
          description: 'AI-enhanced user lifecycle management and behavior analytics'
        },
        {
          id: 'role-permissions-ai',
          title: 'Intelligent Role Engine',
          icon: Shield,
          path: '/dashboard/super-admin/role-permissions',
          description: 'Dynamic role assignment with AI-driven permission optimization'
        },
        {
          id: 'system-analytics-ai',
          title: 'Predictive Analytics',
          icon: BarChart3,
          path: '/dashboard/super-admin/analytics',
          badge: 'ML',
          badgeColor: 'purple',
          description: 'Machine learning-powered system performance predictions'
        },
        {
          id: 'ai-automation',
          title: 'AI Automation Hub',
          icon: Bot,
          path: '/dashboard/super-admin/automation',
          badge: '12',
          badgeColor: 'green',
          description: 'Generative AI workflows and intelligent process automation'
        },
        {
          id: 'security-ai',
          title: 'AI Security Center',
          icon: Lock,
          path: '/dashboard/super-admin/security',
          badge: '!',
          badgeColor: 'red',
          description: 'Advanced threat detection with AI-powered security monitoring'
        },
        {
          id: 'system-optimization',
          title: 'Smart System Optimizer',
          icon: Zap,
          path: '/dashboard/super-admin/optimization',
          description: 'AI-driven system performance optimization and resource allocation'
        },
        {
          id: 'ai-insights',
          title: 'Enterprise AI Insights',
          icon: Brain,
          path: '/dashboard/super-admin/insights',
          badge: 'GPT',
          badgeColor: 'purple',
          description: 'Advanced generative AI insights and business intelligence'
        },
        {
          id: 'real-time-monitoring',
          title: 'Real-Time AI Monitor',
          icon: Activity,
          path: '/dashboard/super-admin/monitoring',
          badge: 'LIVE',
          badgeColor: 'green',
          description: 'Intelligent real-time system monitoring with predictive alerts'
        },
        {
          id: 'ai-configuration',
          title: 'AI Model Configuration',
          icon: Cpu,
          path: '/dashboard/super-admin/ai-config',
          description: 'Configure and fine-tune AI models and generative algorithms'
        }
      ]
    },
    {
      id: 'contacts',
      title: 'Contacts',
      icon: Phone,
      badge: '234',
      badgeColor: 'blue',
      isActive: true,
      hasSubmenu: true,
      permissions: ['view_contacts'],
      items: [
        {
          id: 'contacts-list',
          title: 'All Contacts',
          icon: Phone,
          path: '/contacts',
          description: 'Manage business contacts and relationships'
        },
        {
          id: 'companies',
          title: 'Companies',
          icon: Building2,
          path: '/contacts/companies',
          description: 'Organize contacts by company'
        },
        {
          id: 'communications',
          title: 'Communications',
          icon: Mail,
          path: '/contacts/communications',
          badge: '15',
          badgeColor: 'green',
          description: 'Track communications and interactions'
        }
      ]
    }
  ];
};

// Get active modules based on user permissions
export const getActiveModules = (userPermissions: string[] = []): SidebarModule[] => {
  const allModules = getSidebarConfiguration();
  
  return allModules.filter(module => {
    if (!module.permissions || module.permissions.length === 0) {
      return module.isActive;
    }
    
    return module.isActive && module.permissions.some(permission => 
      userPermissions.includes(permission)
    );
  });
};

// Get module by ID
export const getModuleById = (moduleId: string): SidebarModule | undefined => {
  const modules = getSidebarConfiguration();
  return modules.find(module => module.id === moduleId);
};

// Search modules and items
export const searchModules = (query: string): { module: SidebarModule; item?: SidebarItem }[] => {
  const modules = getSidebarConfiguration();
  const results: { module: SidebarModule; item?: SidebarItem }[] = [];
  
  modules.forEach(module => {
    // Search in module title
    if (module.title.toLowerCase().includes(query.toLowerCase())) {
      results.push({ module });
    }
    
    // Search in module items
    module.items?.forEach(item => {
      if (
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description?.toLowerCase().includes(query.toLowerCase())
      ) {
        results.push({ module, item });
      }
    });
  });
  
  return results;
};
