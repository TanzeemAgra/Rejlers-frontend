'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Users, 
  Lock,
  Unlock,
  Settings,
  CheckCircle,
  XCircle,
  Globe,
  Database,
  FileText,
  UserCheck,
  BarChart3,
  Cog,
  Archive,
  AlertTriangle,
  Copy,
  RefreshCw
} from 'lucide-react';

// Types
interface Permission {
  id: string;
  name: string;
  codename: string;
  description: string;
  category: string;
  is_system: boolean;
}

interface Role {
  id: number;
  name: string;
  description: string;
  permissions: string[];
  user_count: number;
  is_active: boolean;
  is_system: boolean;
  created_at: string;
  updated_at: string;
  color?: string;
}

interface CreateRoleData {
  name: string;
  description: string;
  permissions: string[];
  is_active: boolean;
  color: string;
}

const RolePermissionManagement: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [currentRole, setCurrentRole] = useState<Role | null>(null);
  const [selectedTab, setSelectedTab] = useState<'roles' | 'permissions'>('roles');

  // Create role form state
  const [createRoleData, setCreateRoleData] = useState<CreateRoleData>({
    name: '',
    description: '',
    permissions: [],
    is_active: true,
    color: '#3B82F6'
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Permission categories
  const permissionCategories = [
    'User Management',
    'Content Management', 
    'System Administration',
    'Finance & Accounting',
    'HR & Payroll',
    'Project Management',
    'Reporting & Analytics',
    'Security & Compliance'
  ];

  const roleColors = [
    '#3B82F6', // Blue
    '#8B5CF6', // Purple  
    '#10B981', // Green
    '#F59E0B', // Orange
    '#EF4444', // Red
    '#6B7280', // Gray
    '#EC4899', // Pink
    '#14B8A6'  // Teal
  ];

  useEffect(() => {
    loadRoles();
    loadPermissions();
  }, []);

  const loadRoles = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockRoles: Role[] = [
        {
          id: 1,
          name: 'Super Administrator',
          description: 'Full system access with all permissions',
          permissions: ['*'],
          user_count: 2,
          is_active: true,
          is_system: true,
          created_at: '2025-01-01T00:00:00Z',
          updated_at: '2025-01-01T00:00:00Z',
          color: '#8B5CF6'
        },
        {
          id: 2,
          name: 'Department Manager',
          description: 'Manage department operations and team members',
          permissions: ['view_dashboard', 'manage_team', 'view_reports', 'edit_projects', 'manage_attendance'],
          user_count: 8,
          is_active: true,
          is_system: false,
          created_at: '2025-02-01T00:00:00Z',
          updated_at: '2025-03-15T00:00:00Z',
          color: '#3B82F6'
        },
        {
          id: 3,
          name: 'Project Coordinator',
          description: 'Coordinate projects and manage resources',
          permissions: ['view_dashboard', 'edit_projects', 'manage_resources', 'view_reports'],
          user_count: 12,
          is_active: true,
          is_system: false,
          created_at: '2025-02-15T00:00:00Z',
          updated_at: '2025-03-20T00:00:00Z',
          color: '#10B981'
        },
        {
          id: 4,
          name: 'Employee',
          description: 'Standard employee access to basic features',
          permissions: ['view_dashboard', 'edit_profile', 'submit_reports', 'view_attendance'],
          user_count: 45,
          is_active: true,
          is_system: false,
          created_at: '2025-01-15T00:00:00Z',
          updated_at: '2025-02-10T00:00:00Z',
          color: '#6B7280'
        },
        {
          id: 5,
          name: 'Contractor',
          description: 'Limited access for external contractors',
          permissions: ['view_dashboard', 'edit_profile', 'submit_timesheets'],
          user_count: 15,
          is_active: true,
          is_system: false,
          created_at: '2025-03-01T00:00:00Z',
          updated_at: '2025-03-01T00:00:00Z',
          color: '#F59E0B'
        }
      ];

      setRoles(mockRoles);
    } catch (error) {
      console.error('Error loading roles:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadPermissions = async () => {
    try {
      // Mock permissions data - replace with actual API call
      const mockPermissions: Permission[] = [
        // User Management
        { id: 'view_users', name: 'View Users', codename: 'view_user', description: 'Can view user list and details', category: 'User Management', is_system: false },
        { id: 'add_users', name: 'Create Users', codename: 'add_user', description: 'Can create new user accounts', category: 'User Management', is_system: false },
        { id: 'change_users', name: 'Edit Users', codename: 'change_user', description: 'Can modify user information', category: 'User Management', is_system: false },
        { id: 'delete_users', name: 'Delete Users', codename: 'delete_user', description: 'Can delete user accounts', category: 'User Management', is_system: false },
        
        // System Administration
        { id: 'view_dashboard', name: 'View Dashboard', codename: 'view_dashboard', description: 'Access to main dashboard', category: 'System Administration', is_system: true },
        { id: 'manage_system', name: 'System Management', codename: 'manage_system', description: 'Full system administration access', category: 'System Administration', is_system: true },
        { id: 'view_logs', name: 'View Audit Logs', codename: 'view_logs', description: 'Access to system audit logs', category: 'System Administration', is_system: false },
        { id: 'manage_settings', name: 'System Settings', codename: 'manage_settings', description: 'Configure system settings', category: 'System Administration', is_system: false },
        
        // Project Management  
        { id: 'view_projects', name: 'View Projects', codename: 'view_project', description: 'Can view project information', category: 'Project Management', is_system: false },
        { id: 'edit_projects', name: 'Edit Projects', codename: 'change_project', description: 'Can modify project details', category: 'Project Management', is_system: false },
        { id: 'manage_resources', name: 'Manage Resources', codename: 'manage_resources', description: 'Allocate and manage project resources', category: 'Project Management', is_system: false },
        
        // HR & Payroll
        { id: 'manage_team', name: 'Team Management', codename: 'manage_team', description: 'Manage team members and assignments', category: 'HR & Payroll', is_system: false },
        { id: 'manage_attendance', name: 'Attendance Management', codename: 'manage_attendance', description: 'Track and manage employee attendance', category: 'HR & Payroll', is_system: false },
        { id: 'view_attendance', name: 'View Attendance', codename: 'view_attendance', description: 'View attendance records', category: 'HR & Payroll', is_system: false },
        
        // Reporting & Analytics
        { id: 'view_reports', name: 'View Reports', codename: 'view_reports', description: 'Access to system reports', category: 'Reporting & Analytics', is_system: false },
        { id: 'create_reports', name: 'Create Reports', codename: 'create_reports', description: 'Generate custom reports', category: 'Reporting & Analytics', is_system: false },
        
        // Content Management
        { id: 'edit_profile', name: 'Edit Profile', codename: 'change_profile', description: 'Edit own profile information', category: 'Content Management', is_system: true },
        { id: 'submit_reports', name: 'Submit Reports', codename: 'submit_reports', description: 'Submit work reports and updates', category: 'Content Management', is_system: true },
        { id: 'submit_timesheets', name: 'Submit Timesheets', codename: 'submit_timesheets', description: 'Submit time tracking information', category: 'Content Management', is_system: true }
      ];

      setPermissions(mockPermissions);
    } catch (error) {
      console.error('Error loading permissions:', error);
    }
  };

  // Filter roles based on search
  const filteredRoles = roles.filter(role => 
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter permissions based on search and category
  const filteredPermissions = permissions.filter(permission => {
    const matchesSearch = 
      permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permission.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || permission.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleCreateRole = async () => {
    try {
      // Validate form
      const newErrors: {[key: string]: string} = {};
      
      if (!createRoleData.name) newErrors.name = 'Role name is required';
      if (!createRoleData.description) newErrors.description = 'Description is required';
      if (createRoleData.permissions.length === 0) newErrors.permissions = 'At least one permission is required';

      setErrors(newErrors);

      if (Object.keys(newErrors).length > 0) {
        return;
      }

      // Mock API call - replace with actual implementation
      const newRole: Role = {
        id: roles.length + 1,
        name: createRoleData.name,
        description: createRoleData.description,
        permissions: createRoleData.permissions,
        user_count: 0,
        is_active: createRoleData.is_active,
        is_system: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        color: createRoleData.color
      };

      setRoles(prev => [...prev, newRole]);
      setShowCreateModal(false);
      
      // Reset form
      setCreateRoleData({
        name: '',
        description: '',
        permissions: [],
        is_active: true,
        color: '#3B82F6'
      });
      
      setErrors({});
    } catch (error) {
      console.error('Error creating role:', error);
    }
  };

  const handleDeleteRole = async (roleId: number) => {
    const role = roles.find(r => r.id === roleId);
    if (role?.is_system) {
      alert('System roles cannot be deleted');
      return;
    }
    
    if (window.confirm('Are you sure you want to delete this role? This action cannot be undone.')) {
      try {
        // Mock API call - replace with actual implementation
        setRoles(prev => prev.filter(role => role.id !== roleId));
      } catch (error) {
        console.error('Error deleting role:', error);
      }
    }
  };

  const handleToggleRoleStatus = async (roleId: number) => {
    try {
      // Mock API call - replace with actual implementation
      setRoles(prev => prev.map(role => 
        role.id === roleId ? { ...role, is_active: !role.is_active } : role
      ));
    } catch (error) {
      console.error('Error updating role status:', error);
    }
  };

  const handleDuplicateRole = async (roleId: number) => {
    const originalRole = roles.find(r => r.id === roleId);
    if (!originalRole) return;

    const duplicatedRole: Role = {
      ...originalRole,
      id: roles.length + 1,
      name: `${originalRole.name} (Copy)`,
      user_count: 0,
      is_system: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    setRoles(prev => [...prev, duplicatedRole]);
  };

  const getPermissionIcon = (category: string) => {
    switch (category) {
      case 'User Management': return <Users className="w-4 h-4" />;
      case 'System Administration': return <Settings className="w-4 h-4" />;
      case 'Project Management': return <BarChart3 className="w-4 h-4" />;
      case 'HR & Payroll': return <UserCheck className="w-4 h-4" />;
      case 'Reporting & Analytics': return <FileText className="w-4 h-4" />;
      case 'Content Management': return <Globe className="w-4 h-4" />;
      case 'Finance & Accounting': return <Database className="w-4 h-4" />;
      case 'Security & Compliance': return <Shield className="w-4 h-4" />;
      default: return <Cog className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: {[key: string]: string} = {
      'User Management': 'bg-blue-100 text-blue-700',
      'System Administration': 'bg-purple-100 text-purple-700',
      'Project Management': 'bg-green-100 text-green-700',
      'HR & Payroll': 'bg-orange-100 text-orange-700',
      'Reporting & Analytics': 'bg-indigo-100 text-indigo-700',
      'Content Management': 'bg-pink-100 text-pink-700',
      'Finance & Accounting': 'bg-yellow-100 text-yellow-700',
      'Security & Compliance': 'bg-red-100 text-red-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Role & Permission Management</h1>
          <p className="text-gray-600">Configure roles and manage system permissions</p>
        </div>
        <div className="flex items-center gap-3">
          {selectedTab === 'roles' && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              Create Role
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              loadRoles();
              loadPermissions();
            }}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-200"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </motion.button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setSelectedTab('roles')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'roles'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Roles ({roles.length})
          </button>
          <button
            onClick={() => setSelectedTab('permissions')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'permissions'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Permissions ({permissions.length})
          </button>
        </nav>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={`Search ${selectedTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>
            {selectedTab === 'permissions' && (
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                {permissionCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            )}
          </div>
          <div className="text-sm text-gray-600">
            {selectedTab === 'roles' 
              ? `${filteredRoles.length} roles found`
              : `${filteredPermissions.length} permissions found`
            }
          </div>
        </div>
      </div>

      {/* Roles Tab */}
      {selectedTab === 'roles' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredRoles.map((role) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: role.color }}
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        {role.name}
                        {role.is_system && (
                          <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                            System
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {role.is_active ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Users Assigned:</span>
                    <span className="font-medium text-gray-900">{role.user_count}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Permissions:</span>
                    <span className="font-medium text-gray-900">
                      {role.permissions.includes('*') ? 'All' : role.permissions.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Last Updated:</span>
                    <span className="text-gray-600">
                      {new Date(role.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCurrentRole(role);
                      setShowPermissionsModal(true);
                    }}
                    className="flex-1 bg-blue-50 text-blue-700 py-2 px-3 rounded text-sm font-medium hover:bg-blue-100"
                  >
                    <Eye className="w-4 h-4 inline mr-1" />
                    View Details
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDuplicateRole(role.id)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                    title="Duplicate Role"
                  >
                    <Copy className="w-4 h-4" />
                  </motion.button>
                  {!role.is_system && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setCurrentRole(role);
                          setShowEditModal(true);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                        title="Edit Role"
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleToggleRoleStatus(role.id)}
                        className={`p-2 rounded ${
                          role.is_active 
                            ? 'text-red-600 hover:bg-red-50' 
                            : 'text-green-600 hover:bg-green-50'
                        }`}
                        title={role.is_active ? 'Deactivate Role' : 'Activate Role'}
                      >
                        {role.is_active ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDeleteRole(role.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                        title="Delete Role"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Permissions Tab */}
      {selectedTab === 'permissions' && (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-6 font-semibold text-gray-900">Permission</th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-900">Category</th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-900">Description</th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-900">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPermissions.map((permission) => (
                  <tr key={permission.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        {getPermissionIcon(permission.category)}
                        <div>
                          <div className="font-medium text-gray-900">{permission.name}</div>
                          <div className="text-sm text-gray-600">{permission.codename}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(permission.category)}`}>
                        {permission.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      {permission.description}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        permission.is_system 
                          ? 'bg-purple-100 text-purple-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {permission.is_system ? 'System' : 'Custom'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Role Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b">
                <h3 className="text-xl font-semibold text-gray-900">Create New Role</h3>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role Name *
                    </label>
                    <input
                      type="text"
                      value={createRoleData.name}
                      onChange={(e) => setCreateRoleData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. Project Manager"
                    />
                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Color
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={createRoleData.color}
                        onChange={(e) => setCreateRoleData(prev => ({ ...prev, color: e.target.value }))}
                        className="w-12 h-10 border rounded-lg cursor-pointer"
                      />
                      <div className="flex gap-1">
                        {roleColors.map(color => (
                          <button
                            key={color}
                            onClick={() => setCreateRoleData(prev => ({ ...prev, color }))}
                            className="w-6 h-6 rounded border-2 border-gray-300 hover:border-gray-400"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={createRoleData.description}
                    onChange={(e) => setCreateRoleData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe the role's responsibilities and scope"
                  />
                  {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-gray-700">
                      Permissions *
                    </label>
                    <div className="text-sm text-gray-600">
                      {createRoleData.permissions.length} selected
                    </div>
                  </div>
                  
                  {errors.permissions && <p className="text-red-600 text-sm mb-2">{errors.permissions}</p>}
                  
                  <div className="border rounded-lg max-h-64 overflow-y-auto">
                    {permissionCategories.map(category => {
                      const categoryPermissions = permissions.filter(p => p.category === category);
                      if (categoryPermissions.length === 0) return null;
                      
                      return (
                        <div key={category} className="border-b last:border-b-0">
                          <div className="bg-gray-50 px-4 py-2 font-medium text-gray-700 flex items-center gap-2">
                            {getPermissionIcon(category)}
                            {category}
                          </div>
                          <div className="p-3 space-y-2">
                            {categoryPermissions.map(permission => (
                              <label key={permission.id} className="flex items-start gap-3 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={createRoleData.permissions.includes(permission.id)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setCreateRoleData(prev => ({
                                        ...prev,
                                        permissions: [...prev.permissions, permission.id]
                                      }));
                                    } else {
                                      setCreateRoleData(prev => ({
                                        ...prev,
                                        permissions: prev.permissions.filter(p => p !== permission.id)
                                      }));
                                    }
                                  }}
                                  className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <div className="flex-1">
                                  <div className="font-medium text-gray-900">{permission.name}</div>
                                  <div className="text-sm text-gray-600">{permission.description}</div>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={createRoleData.is_active}
                      onChange={(e) => setCreateRoleData(prev => ({ ...prev, is_active: e.target.checked }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Active Role</span>
                  </label>
                </div>
              </div>

              <div className="p-6 border-t bg-gray-50 flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateRole}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create Role
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Role Details Modal */}
      <AnimatePresence>
        {showPermissionsModal && currentRole && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowPermissionsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b">
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: currentRole.color }}
                  />
                  <h3 className="text-xl font-semibold text-gray-900">{currentRole.name}</h3>
                  {currentRole.is_system && (
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                      System Role
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mt-2">{currentRole.description}</p>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{currentRole.user_count}</div>
                    <div className="text-sm text-gray-600">Users Assigned</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {currentRole.permissions.includes('*') ? 'All' : currentRole.permissions.length}
                    </div>
                    <div className="text-sm text-gray-600">Permissions</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${currentRole.is_active ? 'text-green-600' : 'text-red-600'}`}>
                      {currentRole.is_active ? 'Active' : 'Inactive'}
                    </div>
                    <div className="text-sm text-gray-600">Status</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Permissions</h4>
                  {currentRole.permissions.includes('*') ? (
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                      <Shield className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <div className="font-medium text-purple-900">Full System Access</div>
                      <div className="text-sm text-purple-700">This role has all system permissions</div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {permissionCategories.map(category => {
                        const categoryPermissions = permissions.filter(p => 
                          p.category === category && currentRole.permissions.includes(p.id)
                        );
                        
                        if (categoryPermissions.length === 0) return null;
                        
                        return (
                          <div key={category} className="border rounded-lg">
                            <div className="bg-gray-50 px-4 py-2 font-medium text-gray-700 flex items-center gap-2">
                              {getPermissionIcon(category)}
                              {category}
                              <span className="ml-auto text-sm text-gray-600">
                                ({categoryPermissions.length})
                              </span>
                            </div>
                            <div className="p-3">
                              <div className="grid grid-cols-1 gap-2">
                                {categoryPermissions.map(permission => (
                                  <div key={permission.id} className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                    <span className="text-sm text-gray-900">{permission.name}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 border-t bg-gray-50 flex items-center justify-end">
                <button
                  onClick={() => setShowPermissionsModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RolePermissionManagement;