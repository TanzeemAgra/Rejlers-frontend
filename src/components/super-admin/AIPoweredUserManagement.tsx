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
  Network,
  X
} from 'lucide-react';
import { rbacService, Role, User, UserPermissions, SystemInfo } from '@/lib/rbac';
import { authService } from '@/lib/auth';
import { enhancedAuthService } from '@/lib/enhancedAuthService';
import { AuthDebugModal } from '@/components/debug/AuthDebugModal';
import { 
  validateUserData, 
  type UserCreationRequest,
  ERROR_MESSAGES 
} from '@/config/userApiConfig';

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
  icon: React.ComponentType<{ className?: string }>;
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

  // Advanced User Management State
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showBulkImportModal, setShowBulkImportModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showAuthDebugModal, setShowAuthDebugModal] = useState(false);
  const [newUserForm, setNewUserForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    phone: '',
    department: '',
    position: '',
    password: '',
    confirm_password: '',
    role_id: '',
    is_active: true,
    send_welcome_email: true
  });
  const [bulkImportFile, setBulkImportFile] = useState<File | null>(null);
  const [bulkImportData, setBulkImportData] = useState<any[]>([]);
  const [bulkImportPreview, setBulkImportPreview] = useState<any[]>([]);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

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

  // SMART FORM VALIDATION ENGINE
  const validateUserForm = (formData: typeof newUserForm): Record<string, string> => {
    const errors: Record<string, string> = {};
    
    // AI-Enhanced Validation Rules
    if (!formData.first_name.trim()) errors.first_name = 'First name is required';
    if (!formData.last_name.trim()) errors.last_name = 'Last name is required';
    
    // Email validation with domain intelligence
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    } else if (users.some(user => user.email === formData.email)) {
      errors.email = 'Email already exists in the system';
    }
    
    // Username validation
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
    } else if (users.some(user => user.username === formData.username)) {
      errors.username = 'Username already exists';
    }
    
    // Password strength validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      errors.password = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (formData.password !== formData.confirm_password) {
      errors.confirm_password = 'Passwords do not match';
    }
    
    // Role validation
    if (!formData.role_id) {
      errors.role_id = 'Please select a role';
    }
    
    return errors;
  };

  // AI-POWERED ROLE RECOMMENDATION ENGINE FOR NEW USERS
  const generateRoleRecommendations = (userData: typeof newUserForm): AIRoleRecommendation[] => {
    if (!roles) return [];
    
    const allRoles = [...roles.enterprise_roles, ...roles.functional_roles, ...roles.ai_powered_roles];
    const recommendations: AIRoleRecommendation[] = [];
    
    // Department-based intelligence
    const departmentRoleMap: Record<string, string[]> = {
      'human_resources': ['HR Manager', 'HR Analyst', 'Recruitment Specialist'],
      'engineering': ['Engineer', 'Senior Engineer', 'Tech Lead'],
      'finance': ['Financial Analyst', 'Accountant', 'Finance Manager'],
      'operations': ['Operations Manager', 'Project Manager', 'Business Analyst'],
      'it': ['IT Administrator', 'System Administrator', 'DevOps Engineer'],
      'sales': ['Sales Representative', 'Sales Manager', 'Account Manager'],
      'marketing': ['Marketing Specialist', 'Content Manager', 'Digital Marketing Manager']
    };
    
    // Position-based intelligence
    const positionRoleMap: Record<string, string[]> = {
      'manager': ['Manager', 'Senior Manager', 'Department Head'],
      'analyst': ['Analyst', 'Senior Analyst', 'Lead Analyst'],
      'specialist': ['Specialist', 'Senior Specialist', 'Subject Matter Expert'],
      'administrator': ['Administrator', 'System Administrator', 'IT Administrator'],
      'coordinator': ['Coordinator', 'Project Coordinator', 'Operations Coordinator']
    };
    
    // Generate recommendations based on department
    if (userData.department) {
      const deptRoles = departmentRoleMap[userData.department.toLowerCase()] || [];
      deptRoles.forEach(roleName => {
        const role = allRoles.find(r => r.name.toLowerCase().includes(roleName.toLowerCase()));
        if (role) {
          recommendations.push({
            role,
            confidence: 85,
            reasoning: [`Matches department: ${userData.department}`, 'Common role for this department'],
            matchingFactors: ['Department Match', 'Industry Standard']
          });
        }
      });
    }
    
    // Generate recommendations based on position
    if (userData.position) {
      const positionKey = Object.keys(positionRoleMap).find(key => 
        userData.position.toLowerCase().includes(key)
      );
      if (positionKey) {
        const posRoles = positionRoleMap[positionKey];
        posRoles.forEach(roleName => {
          const role = allRoles.find(r => r.name.toLowerCase().includes(roleName.toLowerCase()));
          if (role && !recommendations.some(rec => rec.role.id === role.id)) {
            recommendations.push({
              role,
              confidence: 75,
              reasoning: [`Matches position: ${userData.position}`, 'Role hierarchy alignment'],
              matchingFactors: ['Position Match', 'Career Path']
            });
          }
        });
      }
    }
    
    // Default recommendations for new users
    if (recommendations.length === 0) {
      const defaultRoles = allRoles.filter(role => 
        role.name.toLowerCase().includes('employee') || 
        role.name.toLowerCase().includes('user') ||
        role.name.toLowerCase().includes('basic')
      );
      defaultRoles.slice(0, 3).forEach(role => {
        recommendations.push({
          role,
          confidence: 60,
          reasoning: ['Safe default role for new users', 'Can be upgraded later'],
          matchingFactors: ['Default Assignment', 'Security Best Practice']
        });
      });
    }
    
    return recommendations.sort((a, b) => b.confidence - a.confidence).slice(0, 5);
  };

  // AI-POWERED ROLE RECOMMENDATION ENGINE FOR EXISTING USERS
  const generateUserRoleRecommendations = (user: User): AIRoleRecommendation[] => {
    if (!roles) return [];
    
    const allRoles = [...roles.enterprise_roles, ...roles.functional_roles, ...roles.ai_powered_roles];
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

  // ADVANCED USER CREATION HANDLER
  const handleCreateUser = async () => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });
    
    // Prepare user data for validation using soft coding types
    const userCreationData: UserCreationRequest = {
      first_name: newUserForm.first_name,
      last_name: newUserForm.last_name,
      email: newUserForm.email,
      username: newUserForm.username,
      phone: newUserForm.phone,
      department: newUserForm.department,
      position: newUserForm.position,
      password: newUserForm.password,
      confirm_password: newUserForm.confirm_password, // Add confirm_password from form
      role_id: parseInt(newUserForm.role_id),
      is_active: newUserForm.is_active,
      send_welcome_email: newUserForm.send_welcome_email,
      created_via: 'super_admin_interface',
      ai_recommended_role: roleRecommendations.length > 0 ? Number(roleRecommendations[0].role.id) : null
    };
    
    // Validate form using soft coding configuration
    const validationErrors = validateUserData(userCreationData);
    setFormErrors(validationErrors);
    
    if (Object.keys(validationErrors).length > 0) {
      setIsSubmitting(false);
      setSubmitStatus({ 
        type: 'error', 
        message: ERROR_MESSAGES.VALIDATION_ERROR 
      });
      return;
    }
    
    try {
      console.log('🚀 Creating user with validated data:', userCreationData);
      
      // Call API to create user using enhanced authService with automatic token refresh
      const newUser = await enhancedAuthService.createUser(userCreationData);
      setUsers(prev => [...prev, newUser]);
      setSubmitStatus({ type: 'success', message: 'User created successfully!' });
      
      // Reset form
      setNewUserForm({
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        phone: '',
        department: '',
        position: '',
        password: '',
        confirm_password: '',
        role_id: '',
          is_active: true,
          send_welcome_email: true
        });
        
        // Close modal after 2 seconds
        setTimeout(() => {
          setShowAddUserModal(false);
          setSubmitStatus({ type: null, message: '' });
        }, 2000);
        
    } catch (error) {
      console.error('Error creating user:', error);
      
      // Enhanced error handling with specific messages
      let errorMessage = 'Network error. Please try again.';
      
      if (error instanceof Error) {
        if (error.message.includes('Authentication required')) {
          errorMessage = 'Your session has expired. Please refresh the page and try again.';
        } else if (error.message.includes('permission')) {
          errorMessage = 'You do not have permission to create users. Contact your administrator.';
        } else if (error.message.includes('validation')) {
          errorMessage = 'Please check your input data and try again.';
        } else if (error.message.includes('Network')) {
          errorMessage = 'Connection error. Please check your internet connection and try again.';
        } else {
          errorMessage = error.message;
        }
      }
      
      setSubmitStatus({ type: 'error', message: errorMessage });
      
      // Show debug suggestion for authentication errors
      if (error instanceof Error && error.message.includes('Authentication required')) {
        setTimeout(() => {
          if (window.confirm('Would you like to open the authentication debug tool to diagnose the issue?')) {
            setShowAuthDebugModal(true);
          }
        }, 2000);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // BULK IMPORT PROCESSING ENGINE
  const handleBulkImportFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setBulkImportFile(file);
    
    // Parse CSV/Excel file
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n').filter(line => line.trim());
      
      if (lines.length < 2) {
        setSubmitStatus({ type: 'error', message: 'File must contain at least a header row and one data row' });
        return;
      }
      
      const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
      const data = lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
        const obj: any = {};
        headers.forEach((header, index) => {
          obj[header.toLowerCase().replace(/\s+/g, '_')] = values[index] || '';
        });
        return obj;
      });
      
      setBulkImportData(data);
      setBulkImportPreview(data.slice(0, 5)); // Show first 5 rows as preview
    };
    
    reader.readAsText(file);
  };

  // BULK USER CREATION HANDLER
  const handleBulkCreateUsers = async () => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });
    
    try {
      const result = await authService.createBulkUsers(bulkImportData.map(user => ({
        ...user,
        send_welcome_emails: true,
        created_via: 'bulk_import'
      })));
      
      setSubmitStatus({ 
        type: 'success', 
        message: `Successfully created ${result.created_count || bulkImportData.length} users. ${result.failed_count > 0 ? `${result.failed_count} failed.` : ''}` 
      });
      
      // Refresh users list by reloading the component data
      window.location.reload();
      
      // Close modal after 3 seconds
      setTimeout(() => {
        setShowBulkImportModal(false);
        setBulkImportFile(null);
        setBulkImportData([]);
        setBulkImportPreview([]);
        setSubmitStatus({ type: null, message: '' });
      }, 3000);
        
    } catch (error) {
      console.error('Error with bulk import:', error);
      setSubmitStatus({ type: 'error', message: 'Network error during bulk import' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ADVANCED EXPORT HANDLER
  const handleExportUsers = () => {
    const csvHeaders = ['First Name', 'Last Name', 'Email', 'Username', 'Employee ID', 'Department', 'Position', 'Role', 'Status', 'Created Date'];
    const csvData = users.map(user => [
      user.first_name || '',
      user.last_name || '',
      user.email || '',
      user.username || '',
      user.employee_id || '',
      user.department || '',
      user.position || '',
      user.role?.name || 'No Role',
      user.is_verified ? 'Active' : 'Inactive',
      user.created_at ? new Date(user.created_at).toLocaleDateString() : ''
    ]);
    
    const csvContent = [csvHeaders, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `users_export_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
    
    setSubmitStatus({ type: 'success', message: 'Users exported successfully!' });
    setTimeout(() => setSubmitStatus({ type: null, message: '' }), 3000);
  };

  // Update role recommendations when form changes
  useEffect(() => {
    if (newUserForm.department || newUserForm.position) {
      const recommendations = generateRoleRecommendations(newUserForm);
      setRoleRecommendations(recommendations);
    }
  }, [newUserForm.department, newUserForm.position, roles]);

  // Data Loading useEffect
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
            <button 
              onClick={() => setShowExportModal(true)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            <button 
              onClick={() => setShowBulkImportModal(true)}
              className="flex items-center space-x-2 px-4 py-2 border border-purple-300 text-purple-700 rounded-lg hover:bg-purple-50 transition-colors"
            >
              <Upload className="w-4 h-4" />
              <span>Bulk Import</span>
            </button>
            <button 
              onClick={() => setShowAddUserModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add User</span>
            </button>
            <button 
              onClick={() => setShowAuthDebugModal(true)}
              className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              title="Debug Authentication Issues"
            >
              <Shield className="w-4 h-4" />
              <span>Debug</span>
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
                const recommendations = generateUserRoleRecommendations(user);
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

      {/* ADD USER MODAL */}
      <AnimatePresence>
        {showAddUserModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddUserModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <UserPlus className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Add New User</h2>
                      <p className="text-sm text-gray-600">Create a new user account with AI-powered role recommendations</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowAddUserModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <form onSubmit={(e) => { e.preventDefault(); handleCreateUser(); }} className="space-y-6">
                  {/* Status Messages */}
                  {submitStatus.type && (
                    <div className={`p-4 rounded-lg border ${
                      submitStatus.type === 'success' 
                        ? 'bg-green-50 border-green-200 text-green-800' 
                        : 'bg-red-50 border-red-200 text-red-800'
                    }`}>
                      <div className="flex items-center space-x-2">
                        {submitStatus.type === 'success' ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <AlertTriangle className="w-5 h-5" />
                        )}
                        <span className="font-medium">{submitStatus.message}</span>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Personal Information</h3>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                        <input
                          type="text"
                          value={newUserForm.first_name}
                          onChange={(e) => setNewUserForm(prev => ({ ...prev, first_name: e.target.value }))}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                            formErrors.first_name ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="e.g., John"
                        />
                        <p className="text-xs text-gray-500 mt-1">Enter the user's first name</p>
                        {formErrors.first_name && <p className="text-xs text-red-600 mt-1">{formErrors.first_name}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                        <input
                          type="text"
                          value={newUserForm.last_name}
                          onChange={(e) => setNewUserForm(prev => ({ ...prev, last_name: e.target.value }))}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                            formErrors.last_name ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="e.g., Smith"
                        />
                        <p className="text-xs text-gray-500 mt-1">Enter the user's last name</p>
                        {formErrors.last_name && <p className="text-xs text-red-600 mt-1">{formErrors.last_name}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                        <input
                          type="email"
                          value={newUserForm.email}
                          onChange={(e) => setNewUserForm(prev => ({ ...prev, email: e.target.value }))}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                            formErrors.email ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="john.smith@rejlers.com"
                        />
                        <p className="text-xs text-gray-500 mt-1">Enter a valid company email address</p>
                        {formErrors.email && <p className="text-xs text-red-600 mt-1">{formErrors.email}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username *</label>
                        <input
                          type="text"
                          value={newUserForm.username}
                          onChange={(e) => setNewUserForm(prev => ({ ...prev, username: e.target.value }))}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                            formErrors.username ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="johnsmith123"
                        />
                        <p className="text-xs text-gray-500 mt-1">Letters, numbers, underscore, and dash only (min 3 chars)</p>
                        {formErrors.username && <p className="text-xs text-red-600 mt-1">{formErrors.username}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          value={newUserForm.phone}
                          onChange={(e) => setNewUserForm(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="+46 70 123 45 67"
                        />
                        <p className="text-xs text-gray-500 mt-1">Include country code (optional)</p>
                      </div>
                    </div>

                    {/* Professional Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Professional Information</h3>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                        <select
                          value={newUserForm.department}
                          onChange={(e) => setNewUserForm(prev => ({ ...prev, department: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="">Select Department</option>
                          <option value="human_resources">Human Resources</option>
                          <option value="engineering">Engineering</option>
                          <option value="finance">Finance</option>
                          <option value="operations">Operations</option>
                          <option value="it">Information Technology</option>
                          <option value="sales">Sales</option>
                          <option value="marketing">Marketing</option>
                          <option value="legal">Legal</option>
                          <option value="executive">Executive</option>
                        </select>
                        <p className="text-xs text-gray-500 mt-1">Choose the user's primary department</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Position/Title</label>
                        <input
                          type="text"
                          value={newUserForm.position}
                          onChange={(e) => setNewUserForm(prev => ({ ...prev, position: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="e.g., Senior Engineer, HR Manager"
                        />
                        <p className="text-xs text-gray-500 mt-1">Enter the user's job title or position</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                        <input
                          type="password"
                          value={newUserForm.password}
                          onChange={(e) => setNewUserForm(prev => ({ ...prev, password: e.target.value }))}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                            formErrors.password ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="Minimum 8 characters"
                        />
                        <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters long</p>
                        {formErrors.password && <p className="text-xs text-red-600 mt-1">{formErrors.password}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password *</label>
                        <input
                          type="password"
                          value={newUserForm.confirm_password}
                          onChange={(e) => setNewUserForm(prev => ({ ...prev, confirm_password: e.target.value }))}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                            formErrors.confirm_password ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="Re-enter password"
                        />
                        <p className="text-xs text-gray-500 mt-1">Must match the password above</p>
                        {formErrors.confirm_password && <p className="text-xs text-red-600 mt-1">{formErrors.confirm_password}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role Assignment *</label>
                        <select
                          value={newUserForm.role_id}
                          onChange={(e) => setNewUserForm(prev => ({ ...prev, role_id: e.target.value }))}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                            formErrors.role_id ? 'border-red-300' : 'border-gray-300'
                          }`}
                        >
                          <option value="">Select Role</option>
                          {roles && [...roles.enterprise_roles, ...roles.functional_roles, ...roles.ai_powered_roles].map((role) => (
                            <option key={role.id} value={role.id}>{role.name}</option>
                          ))}
                        </select>
                        {formErrors.role_id && <p className="text-xs text-red-600 mt-1">{formErrors.role_id}</p>}
                      </div>
                    </div>
                  </div>

                  {/* AI Role Recommendations */}
                  {roleRecommendations.length > 0 && (
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <Brain className="w-5 h-5 text-purple-600" />
                        <h4 className="font-semibold text-purple-900">AI Role Recommendations</h4>
                      </div>
                      <div className="space-y-2">
                        {roleRecommendations.slice(0, 3).map((rec, index) => (
                          <div key={rec.role.id} className="flex items-center justify-between bg-white rounded-lg p-3 border border-purple-100">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-gray-900">{rec.role.name}</span>
                                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                                  {rec.confidence}% match
                                </span>
                              </div>
                              <p className="text-xs text-gray-600 mt-1">{rec.reasoning.join(', ')}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => setNewUserForm(prev => ({ ...prev, role_id: rec.role.id.toString() }))}
                              className="ml-3 px-3 py-1 text-xs bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                            >
                              Select
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Additional Options */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="is_active"
                        checked={newUserForm.is_active}
                        onChange={(e) => setNewUserForm(prev => ({ ...prev, is_active: e.target.checked }))}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <label htmlFor="is_active" className="text-sm text-gray-700">Account is active</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="send_welcome_email"
                        checked={newUserForm.send_welcome_email}
                        onChange={(e) => setNewUserForm(prev => ({ ...prev, send_welcome_email: e.target.checked }))}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <label htmlFor="send_welcome_email" className="text-sm text-gray-700">Send welcome email</label>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => setShowAddUserModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      {isSubmitting && <RefreshCw className="w-4 h-4 animate-spin" />}
                      <span>{isSubmitting ? 'Creating...' : 'Create User'}</span>
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BULK IMPORT MODAL */}
      <AnimatePresence>
        {showBulkImportModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowBulkImportModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Upload className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Bulk Import Users</h2>
                      <p className="text-sm text-gray-600">Upload a CSV file to create multiple users at once</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowBulkImportModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Status Messages */}
                {submitStatus.type && (
                  <div className={`p-4 rounded-lg border mb-6 ${
                    submitStatus.type === 'success' 
                      ? 'bg-green-50 border-green-200 text-green-800' 
                      : 'bg-red-50 border-red-200 text-red-800'
                  }`}>
                    <div className="flex items-center space-x-2">
                      {submitStatus.type === 'success' ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <AlertTriangle className="w-5 h-5" />
                      )}
                      <span className="font-medium">{submitStatus.message}</span>
                    </div>
                  </div>
                )}

                {/* CSV Template Download */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-blue-900">CSV Template</h3>
                      <p className="text-sm text-blue-700">Download our template to ensure proper formatting</p>
                    </div>
                    <button
                      onClick={() => {
                        const template = 'first_name,last_name,email,username,phone,department,position,role_name\n' +
                                       'John,Doe,john.doe@rejlers.com,johndoe,+1234567890,engineering,Senior Engineer,Engineer\n' +
                                       'Jane,Smith,jane.smith@rejlers.com,janesmith,+1234567891,human_resources,HR Manager,HR Manager';
                        const blob = new Blob([template], { type: 'text/csv' });
                        const url = window.URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = 'bulk_import_template.csv';
                        link.click();
                        window.URL.revokeObjectURL(url);
                      }}
                      className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Template</span>
                    </button>
                  </div>
                </div>

                {/* File Upload */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload CSV File</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                      <input
                        type="file"
                        accept=".csv"
                        onChange={handleBulkImportFile}
                        className="hidden"
                        id="bulk-import-file"
                      />
                      <label htmlFor="bulk-import-file" className="cursor-pointer">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-lg font-medium text-gray-900">Click to upload or drag and drop</p>
                        <p className="text-sm text-gray-600">CSV files only</p>
                      </label>
                    </div>
                    {bulkImportFile && (
                      <p className="text-sm text-green-600 mt-2">✓ File uploaded: {bulkImportFile.name}</p>
                    )}
                  </div>

                  {/* Preview Data */}
                  {bulkImportPreview.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Preview ({bulkImportData.length} total users)</h3>
                      <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-200">
                              {Object.keys(bulkImportPreview[0] || {}).map(key => (
                                <th key={key} className="text-left py-2 px-3 font-medium text-gray-900 capitalize">
                                  {key.replace(/_/g, ' ')}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {bulkImportPreview.map((row, index) => (
                              <tr key={index} className="border-b border-gray-100">
                                {Object.values(row).map((value: any, cellIndex) => (
                                  <td key={cellIndex} className="py-2 px-3 text-gray-700">
                                    {value || '-'}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {bulkImportData.length > 5 && (
                          <p className="text-xs text-gray-500 mt-2">
                            Showing first 5 rows. {bulkImportData.length - 5} more rows will be processed.
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => setShowBulkImportModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleBulkCreateUsers}
                      disabled={!bulkImportFile || bulkImportData.length === 0 || isSubmitting}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      {isSubmitting && <RefreshCw className="w-4 h-4 animate-spin" />}
                      <span>{isSubmitting ? 'Importing...' : `Import ${bulkImportData.length} Users`}</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* EXPORT MODAL */}
      <AnimatePresence>
        {showExportModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowExportModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Download className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Export Users</h2>
                      <p className="text-sm text-gray-600">Download user data as CSV file</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowExportModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Status Messages */}
                {submitStatus.type && (
                  <div className={`p-4 rounded-lg border mb-6 ${
                    submitStatus.type === 'success' 
                      ? 'bg-green-50 border-green-200 text-green-800' 
                      : 'bg-red-50 border-red-200 text-red-800'
                  }`}>
                    <div className="flex items-center space-x-2">
                      {submitStatus.type === 'success' ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <AlertTriangle className="w-5 h-5" />
                      )}
                      <span className="font-medium">{submitStatus.message}</span>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Export Details</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Total Users: {users.length}</li>
                      <li>• Format: CSV (Comma Separated Values)</li>
                      <li>• Includes: Personal info, roles, status, dates</li>
                      <li>• Compatible with Excel and Google Sheets</li>
                    </ul>
                  </div>

                  <div className="flex items-center justify-end space-x-3">
                    <button
                      onClick={() => setShowExportModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        handleExportUsers();
                        setShowExportModal(false);
                      }}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Export CSV</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Authentication Debug Modal */}
      <AuthDebugModal
        isOpen={showAuthDebugModal}
        onClose={() => setShowAuthDebugModal(false)}
      />
    </div>
  );
};

export default AIPoweredUserManagement;