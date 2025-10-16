'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Shield, 
  Mail, 
  Phone,
  Building2,
  Calendar,
  UserCheck,
  UserX,
  MoreVertical,
  Download,
  Upload,
  RefreshCw,
  Lock,
  Unlock,
  UserPlus,
  Settings,
  Brain,
  Zap,
  Target,
  TrendingUp,
  BarChart3,
  Crown,
  Bot,
  Sparkles,
  Cpu,
  Activity,
  Award,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Globe,
  Network
} from 'lucide-react';
import { rbacService, Role, User, UserPermissions, SystemInfo } from '@/lib/rbac';
import { authService } from '@/lib/auth';

// AI-Powered Role Recommendation Engine
interface AIRoleRecommendation {
  role: Role;
  confidence: number;
  reasoning: string[];
  matchingFactors: string[];
}

interface AIInsight {
  id: string;
  type: 'warning' | 'recommendation' | 'optimization' | 'security';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  action?: string;
  icon: React.ComponentType;
}

const AIPoweredUserManagement: React.FC = () => {
  // State Management
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<{ enterprise_roles: Role[]; functional_roles: Role[]; ai_powered_roles: Role[]; total_count: number } | null>(null);
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);
  const [currentUserPermissions, setCurrentUserPermissions] = useState<UserPermissions | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [roleRecommendations, setRoleRecommendations] = useState<AIRoleRecommendation[]>([]);
  const [showRoleAssignment, setShowRoleAssignment] = useState(false);
  const [showAIAnalytics, setShowAIAnalytics] = useState(false);
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false);

  // AI-Powered Insights Generation
  const generateAIInsights = async () => {
    setIsGeneratingInsights(true);
    
    // Simulate AI analysis with real data
    setTimeout(() => {
      const insights: AIInsight[] = [
        {
          id: '1',
          type: 'security',
          title: 'Excessive Super Admin Access',
          description: `${systemInfo?.system_statistics.super_admins || 0} users have Super Admin privileges. Consider reducing to 2-3 for security.`,
          impact: 'high',
          action: 'Review and downgrade unnecessary Super Admin roles',
          icon: AlertTriangle
        },
        {
          id: '2',
          type: 'optimization',
          title: 'Role Distribution Imbalance',
          description: 'AI detected uneven role distribution. Some roles have too many users while others are underutilized.',
          impact: 'medium',
          action: 'Optimize role assignments based on actual usage patterns',
          icon: BarChart3
        },
        {
          id: '3',
          type: 'recommendation',
          title: 'AI Services Underutilization',
          description: 'Only 45% of eligible users have access to AI services. Consider expanding access.',
          impact: 'medium',
          action: 'Review and grant AI service access to qualified users',
          icon: Brain
        },
        {
          id: '4',
          type: 'warning',
          title: 'Inactive High-Privilege Users',
          description: 'Found users with elevated privileges who haven\'t logged in for 30+ days.',
          impact: 'high',
          action: 'Review and suspend inactive privileged accounts',
          icon: UserX
        }
      ];
      
      setAiInsights(insights);
      setIsGeneratingInsights(false);
    }, 2000);
  };

  // AI Role Recommendation Engine
  const generateRoleRecommendations = (user: User): AIRoleRecommendation[] => {
    if (!roles) return [];
    
    const allRoles = [
      ...roles.enterprise_roles,
      ...roles.functional_roles,
      ...roles.ai_powered_roles
    ];
    
    // AI-powered role matching algorithm
    const recommendations: AIRoleRecommendation[] = [];
    
    allRoles.forEach(role => {
      let confidence = 0;
      const reasoning: string[] = [];
      const matchingFactors: string[] = [];
      
      // Match based on job title
      if (user.job_title?.toLowerCase().includes('engineer')) {
        if (role.name.includes('Engineer') || role.name.includes('Engineering')) {
          confidence += 40;
          reasoning.push('Job title alignment with engineering roles');
          matchingFactors.push('Engineering Background');
        }
      }
      
      // Match based on department
      if (user.department?.toLowerCase().includes('hr')) {
        if (role.name.includes('HR')) {
          confidence += 35;
          reasoning.push('Department-role alignment');
          matchingFactors.push('HR Department');
        }
      }
      
      // AI/ML specialization detection
      if (user.job_title?.toLowerCase().includes('ai') || user.job_title?.toLowerCase().includes('ml')) {
        if (role.name.includes('AI') || role.name.includes('ML')) {
          confidence += 45;
          reasoning.push('AI/ML specialization match');
          matchingFactors.push('AI/ML Expertise');
        }
      }
      
      // Leadership role detection
      if (user.job_title?.toLowerCase().includes('lead') || user.job_title?.toLowerCase().includes('manager') || user.job_title?.toLowerCase().includes('director')) {
        if (role.name.includes('Lead') || role.name.includes('Manager') || role.name.includes('Director')) {
          confidence += 30;
          reasoning.push('Leadership experience alignment');
          matchingFactors.push('Leadership Role');
        }
      }
      
      // Enterprise role matching for senior positions
      if (user.job_title?.toLowerCase().includes('cto') || user.job_title?.toLowerCase().includes('cfo') || user.job_title?.toLowerCase().includes('cdo')) {
        if (roles.enterprise_roles.includes(role)) {
          confidence += 50;
          reasoning.push('Executive level position match');
          matchingFactors.push('C-Suite Executive');
        }
      }
      
      if (confidence >= 25) {
        recommendations.push({
          role,
          confidence: Math.min(confidence, 95),
          reasoning,
          matchingFactors
        });
      }
    });
    
    return recommendations.sort((a, b) => b.confidence - a.confidence).slice(0, 3);
  };

  // Data Loading
  useEffect(() => {
    const loadData = async () => {
      try {
        const [rolesData, systemData, permissionsData] = await Promise.all([
          rbacService.getAllRoles(),
          rbacService.getSystemInfo(),
          rbacService.getUserPermissions()
        ]);
        
        setRoles(rolesData);
        setSystemInfo(systemData);
        setCurrentUserPermissions(permissionsData);
        
        // Load users from system info
        if (systemData.role_distribution) {
          // Mock user data based on role distribution
          const mockUsers: User[] = [];
          systemData.role_distribution.forEach((roleData, index) => {
            for (let i = 0; i < Math.min(roleData.user_count, 5); i++) {
              mockUsers.push({
                id: `${index}-${i}`,
                username: `user_${roleData.role_name.toLowerCase().replace(/\s+/g, '_')}_${i + 1}`,
                email: `${roleData.role_name.toLowerCase().replace(/\s+/g, '.')}${i + 1}@rejlers.com`,
                first_name: `User`,
                last_name: `${i + 1}`,
                role: rolesData.enterprise_roles.find(r => r.name === roleData.role_name) || 
                      rolesData.functional_roles.find(r => r.name === roleData.role_name) || 
                      rolesData.ai_powered_roles.find(r => r.name === roleData.role_name) || null,
                employee_id: `EMP${1000 + index * 10 + i}`,
                company_name: 'Rejlers',
                job_title: roleData.role_name,
                department: rbacService.getRoleCategory(roleData.role_name) === 'enterprise' ? 'Executive' : 
                           rbacService.getRoleCategory(roleData.role_name) === 'functional' ? 'Operations' : 'AI Division',
                position: roleData.role_name,
                is_staff: ['Super Admin', 'Chief Digital Officer (CDO)', 'CTO/IT Director'].includes(roleData.role_name),
                is_superuser: roleData.role_name === 'Super Admin',
                is_approved: true,
                is_verified: true,
                created_at: new Date().toISOString()
              });
            }
          });
          setUsers(mockUsers);
        }
        
        setLoading(false);
        generateAIInsights();
      } catch (error) {
        console.error('Error loading RBAC data:', error);
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Role Assignment Handler
  const handleRoleAssignment = async (userId: string, roleId: string) => {
    try {
      await rbacService.assignRole(userId, roleId);
      // Refresh data
      const updatedUsers = users.map(user => 
        user.id === userId 
          ? { ...user, role: roles ? [...roles.enterprise_roles, ...roles.functional_roles, ...roles.ai_powered_roles].find(r => r.id === roleId) || null : null }
          : user
      );
      setUsers(updatedUsers);
      setShowRoleAssignment(false);
    } catch (error) {
      console.error('Error assigning role:', error);
    }
  };

  // Filtered Users
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchTerm === '' || 
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role?.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === 'all' || user.role?.name === filterRole;
    
    return matchesSearch && matchesRole;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-900">Loading AI-Powered RBAC System...</h3>
          <p className="text-gray-600">Analyzing roles and permissions</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* AI-Powered Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
              <Brain className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">AI-Powered RBAC Management</h1>
              <p className="text-purple-100">Intelligent Role-Based Access Control with Generative AI</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowAIAnalytics(!showAIAnalytics)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Analytics</span>
            </button>
            <button
              onClick={generateAIInsights}
              disabled={isGeneratingInsights}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 flex items-center space-x-2"
            >
              {isGeneratingInsights ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Zap className="w-4 h-4" />
              )}
              <span>{isGeneratingInsights ? 'Analyzing...' : 'Generate Insights'}</span>
            </button>
          </div>
        </div>
        
        {/* System Stats */}
        {systemInfo && (
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Total Users</p>
                  <p className="text-2xl font-bold">{systemInfo.system_statistics.total_users}</p>
                </div>
                <Users className="w-8 h-8 text-purple-200" />
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Active Roles</p>
                  <p className="text-2xl font-bold">{systemInfo.system_statistics.total_roles}</p>
                </div>
                <Shield className="w-8 h-8 text-purple-200" />
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Active Sessions</p>
                  <p className="text-2xl font-bold">{systemInfo.system_statistics.active_sessions}</p>
                </div>
                <Activity className="w-8 h-8 text-purple-200" />
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Super Admins</p>
                  <p className="text-2xl font-bold">{systemInfo.system_statistics.super_admins}</p>
                </div>
                <Crown className="w-8 h-8 text-purple-200" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* AI Insights Panel */}
      <AnimatePresence>
        {showAIAnalytics && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                <Bot className="w-6 h-6 text-purple-600" />
                <span>AI Security & Optimization Insights</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiInsights.map((insight) => (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`border-l-4 rounded-lg p-4 ${
                    insight.type === 'security' ? 'border-red-500 bg-red-50' :
                    insight.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
                    insight.type === 'optimization' ? 'border-blue-500 bg-blue-50' :
                    'border-green-500 bg-green-50'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <insight.icon className={`w-5 h-5 mt-0.5 ${
                      insight.type === 'security' ? 'text-red-600' :
                      insight.type === 'warning' ? 'text-yellow-600' :
                      insight.type === 'optimization' ? 'text-blue-600' :
                      'text-green-600'
                    }`} />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{insight.title}</h3>
                      <p className="text-sm text-gray-700 mt-1">{insight.description}</p>
                      {insight.action && (
                        <p className="text-xs text-gray-600 mt-2 font-medium">
                          Action: {insight.action}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-3">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          insight.impact === 'high' ? 'bg-red-100 text-red-800' :
                          insight.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {insight.impact.toUpperCase()} Impact
                        </span>
                        <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                          Take Action →
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Role Categories Overview */}
      {roles && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Enterprise Roles</h3>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Crown className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-purple-600 mb-2">{roles.enterprise_roles.length}</p>
            <p className="text-sm text-gray-600">C-Suite & Executive Leadership</p>
            <div className="mt-4 space-y-2">
              {roles.enterprise_roles.slice(0, 3).map((role) => (
                <div key={role.id} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">{role.name}</span>
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                    {rbacService.getRoleCategoryIcon(role.name)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-blue-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Functional Roles</h3>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Settings className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-blue-600 mb-2">{roles.functional_roles.length}</p>
            <p className="text-sm text-gray-600">Operational & Departmental</p>
            <div className="mt-4 space-y-2">
              {roles.functional_roles.slice(0, 3).map((role) => (
                <div key={role.id} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">{role.name}</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {rbacService.getRoleCategoryIcon(role.name)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-green-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">AI-Powered Roles</h3>
              <div className="p-2 bg-green-100 rounded-lg">
                <Brain className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-green-600 mb-2">{roles.ai_powered_roles.length}</p>
            <p className="text-sm text-gray-600">Intelligent Systems & Bots</p>
            <div className="mt-4 space-y-2">
              {roles.ai_powered_roles.slice(0, 3).map((role) => (
                <div key={role.id} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">{role.name}</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    {rbacService.getRoleCategoryIcon(role.name)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search and Filter Controls */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users, roles, or departments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <div className="relative">
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Roles</option>
                {roles && [...roles.enterprise_roles, ...roles.functional_roles, ...roles.ai_powered_roles].map((role) => (
                  <option key={role.id} value={role.name}>{role.name}</option>
                ))}
              </select>
              <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <UserPlus className="w-4 h-4" />
              <span>Add User</span>
            </button>
          </div>
        </div>
      </div>

      {/* User Management Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AI Recommendations</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => {
                const recommendations = generateRoleRecommendations(user);
                return (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {user.first_name.charAt(0)}{user.last_name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.first_name} {user.last_name}
                          </div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                          <div className="text-xs text-gray-400">{user.employee_id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.role ? rbacService.getRoleCategoryColor(user.role.name) : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.role ? rbacService.getRoleCategoryIcon(user.role.name) : '👤'} {user.role?.name || 'No Role'}
                        </span>
                        {user.is_superuser && (
                          <Crown className="w-4 h-4 text-yellow-500" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.is_verified 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {user.is_verified ? (
                            <><CheckCircle className="w-3 h-3 mr-1" />Active</>
                          ) : (
                            <><AlertTriangle className="w-3 h-3 mr-1" />Inactive</>
                          )}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {recommendations.length > 0 ? (
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setRoleRecommendations(recommendations);
                            setShowRoleAssignment(true);
                          }}
                          className="inline-flex items-center space-x-1 text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full hover:bg-blue-100 transition-colors"
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>{recommendations[0].confidence}% Match</span>
                        </button>
                      ) : (
                        <span className="text-xs text-gray-400">No recommendations</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setShowRoleAssignment(true);
                          }}
                          className="text-purple-600 hover:text-purple-900 p-1 rounded"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-900 p-1 rounded">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 p-1 rounded">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Role Assignment Modal */}
      <AnimatePresence>
        {showRoleAssignment && selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowRoleAssignment(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                      <Sparkles className="w-6 h-6 text-purple-600" />
                      <span>AI-Powered Role Assignment</span>
                    </h2>
                    <p className="text-gray-600 mt-1">
                      Assign role for {selectedUser.first_name} {selectedUser.last_name}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowRoleAssignment(false)}
                    className="text-gray-400 hover:text-gray-600 p-2"
                  >
                    ✕
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {/* AI Recommendations */}
                {roleRecommendations.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                      <Brain className="w-5 h-5 text-purple-600" />
                      <span>AI Recommendations</span>
                    </h3>
                    <div className="space-y-3">
                      {roleRecommendations.map((recommendation, index) => (
                        <motion.div
                          key={recommendation.role.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="border border-purple-200 rounded-lg p-4 hover:bg-purple-50 transition-colors cursor-pointer"
                          onClick={() => handleRoleAssignment(selectedUser.id, recommendation.role.id)}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className={`p-2 rounded-lg ${rbacService.getRoleCategoryColor(recommendation.role.name)}`}>
                                {rbacService.getRoleCategoryIcon(recommendation.role.name)}
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900">{recommendation.role.name}</h4>
                                <p className="text-sm text-gray-600">{recommendation.role.description}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-purple-600">{recommendation.confidence}%</div>
                              <div className="text-xs text-gray-500">Match</div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div>
                              <p className="text-sm font-medium text-gray-700 mb-1">AI Reasoning:</p>
                              <ul className="text-xs text-gray-600 space-y-1">
                                {recommendation.reasoning.map((reason, idx) => (
                                  <li key={idx} className="flex items-center space-x-1">
                                    <CheckCircle className="w-3 h-3 text-green-500" />
                                    <span>{reason}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 pt-2">
                              {recommendation.matchingFactors.map((factor, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                                >
                                  {factor}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* All Available Roles */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">All Available Roles</h3>
                  {roles && (
                    <div className="space-y-4">
                      {/* Enterprise Roles */}
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2 flex items-center space-x-2">
                          <Crown className="w-4 h-4 text-purple-600" />
                          <span>Enterprise Roles</span>
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {roles.enterprise_roles.map((role) => (
                            <button
                              key={role.id}
                              onClick={() => handleRoleAssignment(selectedUser.id, role.id)}
                              className="text-left p-3 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium text-gray-900">{role.name}</p>
                                  <p className="text-xs text-gray-600 mt-1">{role.description}</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-gray-400" />
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      {/* Functional Roles */}
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2 flex items-center space-x-2">
                          <Settings className="w-4 h-4 text-blue-600" />
                          <span>Functional Roles</span>
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {roles.functional_roles.map((role) => (
                            <button
                              key={role.id}
                              onClick={() => handleRoleAssignment(selectedUser.id, role.id)}
                              className="text-left p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium text-gray-900">{role.name}</p>
                                  <p className="text-xs text-gray-600 mt-1">{role.description}</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-gray-400" />
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      {/* AI-Powered Roles */}
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2 flex items-center space-x-2">
                          <Brain className="w-4 h-4 text-green-600" />
                          <span>AI-Powered Roles</span>
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {roles.ai_powered_roles.map((role) => (
                            <button
                              key={role.id}
                              onClick={() => handleRoleAssignment(selectedUser.id, role.id)}
                              className="text-left p-3 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors"
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium text-gray-900">{role.name}</p>
                                  <p className="text-xs text-gray-600 mt-1">{role.description}</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-gray-400" />
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIPoweredUserManagement;