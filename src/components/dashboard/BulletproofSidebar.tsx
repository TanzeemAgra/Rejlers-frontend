'use client';

import React, { useState } from 'react';
import { 
  Home,
  Building2,
  Users,
  DollarSign,
  FileText,
  Package,
  TrendingUp,
  Shield,
  BarChart3,
  UserCheck,
  Crown,
  Phone,
  ChevronDown,
  ChevronRight,
  Brain,
  Target,
  Zap,
  Calendar,
  AlertTriangle,
  Activity,
  Eye,
  CheckCircle,
  RefreshCw,
  Search,
  Globe,
  Bot,
  BookOpen,
  Award,
  Network,
  Smartphone,
  Lock,
  Cpu,
  Bell,
  Layers,
  PieChart,
  Briefcase,
  Mail
} from 'lucide-react';

interface DashboardSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const BulletproofSidebar: React.FC<DashboardSidebarProps> = ({ isOpen, onClose }) => {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

  // Toggle module expansion
  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  // Hardcoded modules to ensure they always show
  const modules = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: Home,
      path: '/dashboard',
      badge: null
    },
    {
      id: 'projects',
      title: 'Projects & Engineering',
      icon: Building2,
      badge: '12',
      badgeColor: 'bg-blue-100 text-blue-800',
      hasSubmenu: true,
      items: [
        { title: 'AI Project Dashboard', icon: Brain, path: '/projects/ai-dashboard', badge: 'LIVE', badgeColor: 'bg-green-100 text-green-800' },
        { title: 'Smart Project Planning', icon: Zap, path: '/projects/smart-planning', badge: 'AI', badgeColor: 'bg-purple-100 text-purple-800' },
        { title: 'All Projects', icon: Building2, path: '/projects', badge: '12', badgeColor: 'bg-blue-100 text-blue-800' },
        { title: 'Intelligent Scheduling', icon: Calendar, path: '/projects/ai-scheduling', badge: 'ML', badgeColor: 'bg-indigo-100 text-indigo-800' },
        { title: 'Risk Prediction Engine', icon: AlertTriangle, path: '/projects/risk-ai', badge: '3', badgeColor: 'bg-red-100 text-red-800' }
      ]
    },
    {
      id: 'hr',
      title: 'Human Resources',
      icon: Users,
      badge: '89',
      badgeColor: 'bg-green-100 text-green-800',
      hasSubmenu: true,
      items: [
        { title: 'HR AI Dashboard', icon: Brain, path: '/hr/ai-dashboard', badge: 'LIVE', badgeColor: 'bg-green-100 text-green-800' },
        { title: 'AI Talent Acquisition', icon: Target, path: '/hr/talent-ai', badge: 'ML', badgeColor: 'bg-purple-100 text-purple-800' },
        { title: 'Employee 360° View', icon: Users, path: '/hr/employees', badge: '89', badgeColor: 'bg-blue-100 text-blue-800' },
        { title: 'Performance AI Engine', icon: TrendingUp, path: '/hr/performance-ai', badge: 'NEW', badgeColor: 'bg-green-100 text-green-800' }
      ]
    },
    {
      id: 'finance',
      title: 'Finance Management',
      icon: DollarSign,
      badge: 'AI',
      badgeColor: 'bg-purple-100 text-purple-800',
      hasSubmenu: true,
      items: [
        { title: 'Finance AI Cockpit', icon: Brain, path: '/finance/ai-cockpit', badge: 'LIVE', badgeColor: 'bg-green-100 text-green-800' },
        { title: 'Predictive Budgeting', icon: Target, path: '/finance/predictive-budget', badge: 'ML', badgeColor: 'bg-indigo-100 text-indigo-800' },
        { title: 'Smart Invoicing', icon: Zap, path: '/finance/smart-invoices', badge: '7', badgeColor: 'bg-blue-100 text-blue-800' },
        { title: 'Financial Risk AI', icon: AlertTriangle, path: '/finance/risk-ai', badge: '2', badgeColor: 'bg-red-100 text-red-800' }
      ]
    },
    {
      id: 'contracts',
      title: 'Contracts',
      icon: FileText,
      badge: '23',
      badgeColor: 'bg-indigo-100 text-indigo-800',
      hasSubmenu: true,
      items: [
        { title: 'Contract AI Hub', icon: Brain, path: '/contracts/ai-hub', badge: 'AI', badgeColor: 'bg-purple-100 text-purple-800' },
        { title: 'Smart Contract Analysis', icon: Eye, path: '/contracts/ai-analysis', badge: 'ML', badgeColor: 'bg-indigo-100 text-indigo-800' },
        { title: 'Contract Portfolio', icon: FileText, path: '/contracts', badge: '23', badgeColor: 'bg-blue-100 text-blue-800' },
        { title: 'AI Contract Drafting', icon: Zap, path: '/contracts/ai-drafting', badge: 'NEW', badgeColor: 'bg-green-100 text-green-800' }
      ]
    },
    {
      id: 'supply-chain',
      title: 'Supply Chain',
      icon: Package,
      badge: '156',
      badgeColor: 'bg-blue-100 text-blue-800',
      hasSubmenu: true,
      items: [
        { title: 'Supply Chain AI Command', icon: Brain, path: '/supply-chain/ai-command', badge: 'LIVE', badgeColor: 'bg-green-100 text-green-800' },
        { title: 'Demand Forecasting AI', icon: TrendingUp, path: '/supply-chain/demand-ai', badge: 'ML', badgeColor: 'bg-purple-100 text-purple-800' },
        { title: 'Vendor Intelligence', icon: Building2, path: '/supply-chain/vendors-ai', badge: '78', badgeColor: 'bg-blue-100 text-blue-800' },
        { title: 'Inventory Optimization AI', icon: Package, path: '/supply-chain/inventory-ai', badge: '156', badgeColor: 'bg-yellow-100 text-yellow-800' }
      ]
    },
    {
      id: 'sales',
      title: 'Sales & Marketing',
      icon: TrendingUp,
      badge: '45',
      badgeColor: 'bg-green-100 text-green-800',
      hasSubmenu: true,
      items: [
        { title: 'Sales AI Engine', icon: Brain, path: '/sales/ai-engine', badge: 'AI', badgeColor: 'bg-purple-100 text-purple-800' },
        { title: 'Predictive Lead Scoring', icon: Target, path: '/sales/lead-scoring-ai', badge: 'ML', badgeColor: 'bg-indigo-100 text-indigo-800' },
        { title: 'Smart CRM', icon: Users, path: '/sales/smart-crm', badge: '45', badgeColor: 'bg-blue-100 text-blue-800' },
        { title: 'Sales Forecasting AI', icon: BarChart3, path: '/sales/forecasting-ai', badge: '94%', badgeColor: 'bg-green-100 text-green-800' }
      ]
    },
    {
      id: 'hse',
      title: 'HSE Compliance',
      icon: Shield,
      badge: 'AI',
      badgeColor: 'bg-red-100 text-red-800',
      hasSubmenu: true,
      items: [
        { title: 'HSE AI Guardian', icon: Brain, path: '/hse/ai-guardian', badge: 'LIVE', badgeColor: 'bg-green-100 text-green-800' },
        { title: 'Predictive Safety AI', icon: AlertTriangle, path: '/hse/predictive-safety', badge: 'ML', badgeColor: 'bg-purple-100 text-purple-800' },
        { title: 'Incident Intelligence', icon: Eye, path: '/hse/incident-ai', badge: '2', badgeColor: 'bg-red-100 text-red-800' },
        { title: 'Compliance Automation', icon: CheckCircle, path: '/hse/compliance-ai', badge: '98%', badgeColor: 'bg-green-100 text-green-800' }
      ]
    },
    {
      id: 'reporting',
      title: 'Reporting & Analytics',
      icon: BarChart3,
      badge: 'AI',
      badgeColor: 'bg-purple-100 text-purple-800',
      hasSubmenu: true,
      items: [
        { title: 'Analytics AI Lab', icon: Brain, path: '/reports/ai-lab', badge: 'LIVE', badgeColor: 'bg-green-100 text-green-800' },
        { title: 'Predictive Analytics Suite', icon: TrendingUp, path: '/reports/predictive', badge: 'ML', badgeColor: 'bg-purple-100 text-purple-800' },
        { title: 'Executive AI Dashboard', icon: Crown, path: '/reports/executive-ai', badge: 'C-SUITE', badgeColor: 'bg-indigo-100 text-indigo-800' },
        { title: 'Real-Time Intelligence', icon: Activity, path: '/reports/real-time', badge: 'LIVE', badgeColor: 'bg-green-100 text-green-800' }
      ]
    },
    {
      id: 'rto-apc',
      title: 'RTO & APC',
      icon: UserCheck,
      badge: '67',
      badgeColor: 'bg-indigo-100 text-indigo-800',
      hasSubmenu: true,
      items: [
        { title: 'RTO AI Academy', icon: Brain, path: '/rto/ai-academy', badge: 'AI', badgeColor: 'bg-purple-100 text-purple-800' },
        { title: 'Adaptive Learning AI', icon: BookOpen, path: '/rto/adaptive-learning', badge: 'ML', badgeColor: 'bg-indigo-100 text-indigo-800' },
        { title: 'Smart Certifications', icon: Award, path: '/rto/certifications-ai', badge: '67', badgeColor: 'bg-blue-100 text-blue-800' },
        { title: 'Virtual Training AI', icon: Smartphone, path: '/rto/virtual-training', badge: 'VR/AR', badgeColor: 'bg-purple-100 text-purple-800' }
      ]
    },
    {
      id: 'super-admin-ai',
      title: 'Super Admin AI Hub',
      icon: Crown,
      badge: 'AI',
      badgeColor: 'bg-purple-100 text-purple-800',
      hasSubmenu: true,
      items: [
        { title: 'AI Control Center', icon: Brain, path: '/super-admin/ai-dashboard', badge: 'LIVE', badgeColor: 'bg-green-100 text-green-800' },
        { title: 'Smart User Management', icon: Users, path: '/super-admin/user-management', badge: '247', badgeColor: 'bg-blue-100 text-blue-800' },
        { title: 'AI Security Center', icon: Lock, path: '/super-admin/security', badge: '!', badgeColor: 'bg-red-100 text-red-800' },
        { title: 'AI Model Configuration', icon: Cpu, path: '/super-admin/ai-config' }
      ]
    },
    {
      id: 'contacts',
      title: 'Contacts',
      icon: Phone,
      badge: '234',
      badgeColor: 'bg-blue-100 text-blue-800',
      hasSubmenu: true,
      items: [
        { title: 'All Contacts', icon: Phone, path: '/contacts' },
        { title: 'Companies', icon: Building2, path: '/contacts/companies' },
        { title: 'Communications', icon: Mail, path: '/contacts/communications', badge: '15', badgeColor: 'bg-green-100 text-green-800' }
      ]
    }
  ];

  const sidebarContent = (
    <div className="w-80 bg-white border-r border-gray-200 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-900">REJLERS</h1>
        <p className="text-sm text-gray-500">Dashboard</p>
      </div>
      <nav className="p-4 space-y-2">
        {modules.map((module) => (
          <div key={module.id} className="mb-2">
            {module.hasSubmenu ? (
              <>
                <button
                  onClick={() => toggleModule(module.id)}
                  className="flex items-center w-full px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 ease-in-out rounded-lg"
                >
                  <module.icon className="w-5 h-5 mr-3" />
                  <span className="flex-1 font-medium text-left">{module.title}</span>
                  {module.badge && (
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full mr-2 ${module.badgeColor}`}>
                      {module.badge}
                    </span>
                  )}
                  {expandedModules.has(module.id) ? (
                    <ChevronDown size={16} className="text-gray-400" />
                  ) : (
                    <ChevronRight size={16} className="text-gray-400" />
                  )}
                </button>
                
                {/* Submenu Items */}
                {expandedModules.has(module.id) && module.items && (
                  <div className="ml-6 mt-2 space-y-1">
                    {module.items.map((item, index) => (
                      <a
                        key={index}
                        href={item.path}
                        className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-all duration-200 ease-in-out rounded-md group"
                      >
                        <item.icon className="w-4 h-4 mr-3 text-gray-500 group-hover:text-gray-700" />
                        <span className="flex-1">{item.title}</span>
                        {item.badge && (
                          <span className={`px-1.5 py-0.5 text-xs font-medium rounded-full ${item.badgeColor}`}>
                            {item.badge}
                          </span>
                        )}
                      </a>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <a
                href={module.path}
                className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 ease-in-out rounded-lg group"
              >
                <module.icon className="w-5 h-5 mr-3 text-gray-600 group-hover:text-gray-800" />
                <span className="flex-1 font-medium">{module.title}</span>
                {module.badge && (
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${module.badgeColor}`}>
                    {module.badge}
                  </span>
                )}
              </a>
            )}
          </div>
        ))}
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile overlay when open */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={onClose}>
          <div className="w-80 h-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {sidebarContent}
          </div>
        </div>
      )}
      
      {/* Desktop sidebar - always visible with fixed positioning */}
      <div className="hidden lg:block lg:fixed lg:inset-y-0 lg:left-0 lg:z-40">
        {sidebarContent}
      </div>
    </>
  );
};

export default BulletproofSidebar;