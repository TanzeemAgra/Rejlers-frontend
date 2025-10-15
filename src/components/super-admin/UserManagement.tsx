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
  Settings
} from 'lucide-react';

// Types
interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  date_joined: string;
  last_login?: string;
  phone?: string;
  department?: string;
  position?: string;
  role?: string;
  company?: string;
  profile_picture?: string;
}

interface Role {
  id: number;
  name: string;
  description: string;
  permissions: string[];
  is_active: boolean;
  created_at: string;
}

interface CreateUserData {
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  confirm_password: string;
  phone?: string;
  department?: string;
  position?: string;
  role?: string;
  is_staff: boolean;
  is_superuser: boolean;
  is_active: boolean;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  // Create user form state
  const [createUserData, setCreateUserData] = useState<CreateUserData>({
    email: '',
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    confirm_password: '',
    phone: '',
    department: '',
    position: '',
    role: '',
    is_staff: false,
    is_superuser: false,
    is_active: true
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  useEffect(() => {
    loadUsers();
    loadRoles();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockUsers: User[] = [
        {
          id: 1,
          email: 'admin@rejlers.com',
          first_name: 'System',
          last_name: 'Administrator',
          username: 'admin',
          is_active: true,
          is_staff: true,
          is_superuser: true,
          date_joined: '2025-01-01T00:00:00Z',
          last_login: '2025-10-14T10:30:00Z',
          phone: '+1-555-0001',
          department: 'IT',
          position: 'System Administrator',
          role: 'Super Admin'
        },
        {
          id: 2,
          email: 'john.smith@rejlers.com',
          first_name: 'John',
          last_name: 'Smith',
          username: 'jsmith',
          is_active: true,
          is_staff: true,
          is_superuser: false,
          date_joined: '2025-02-01T00:00:00Z',
          last_login: '2025-10-14T09:15:00Z',
          phone: '+1-555-0002',
          department: 'Engineering',
          position: 'Senior Engineer',
          role: 'Manager'
        },
        {
          id: 3,
          email: 'sarah.wilson@rejlers.com',
          first_name: 'Sarah',
          last_name: 'Wilson',
          username: 'swilson',
          is_active: true,
          is_staff: false,
          is_superuser: false,
          date_joined: '2025-03-01T00:00:00Z',
          last_login: '2025-10-13T16:45:00Z',
          phone: '+1-555-0003',
          department: 'HR',
          position: 'HR Manager',
          role: 'Employee'
        },
        {
          id: 4,
          email: 'mike.johnson@rejlers.com',
          first_name: 'Mike',
          last_name: 'Johnson',
          username: 'mjohnson',
          is_active: false,
          is_staff: false,
          is_superuser: false,
          date_joined: '2025-04-01T00:00:00Z',
          phone: '+1-555-0004',
          department: 'Finance',
          position: 'Accountant',
          role: 'Employee'
        }
      ];

      setUsers(mockUsers);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadRoles = async () => {
    try {
      // Mock roles data - replace with actual API call
      const mockRoles: Role[] = [
        {
          id: 1,
          name: 'Super Admin',
          description: 'Full system access with all permissions',
          permissions: ['*'],
          is_active: true,
          created_at: '2025-01-01T00:00:00Z'
        },
        {
          id: 2,
          name: 'Manager',
          description: 'Department management and team oversight',
          permissions: ['manage_team', 'view_reports', 'edit_projects'],
          is_active: true,
          created_at: '2025-01-01T00:00:00Z'
        },
        {
          id: 3,
          name: 'Employee',
          description: 'Standard employee access',
          permissions: ['view_dashboard', 'edit_profile', 'submit_reports'],
          is_active: true,
          created_at: '2025-01-01T00:00:00Z'
        }
      ];

      setRoles(mockRoles);
    } catch (error) {
      console.error('Error loading roles:', error);
    }
  };

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'active' && user.is_active) ||
      (filterStatus === 'inactive' && !user.is_active);

    const matchesRole = filterRole === 'all' || 
      (user.is_superuser && filterRole === 'superuser') ||
      (user.is_staff && !user.is_superuser && filterRole === 'staff') ||
      (!user.is_staff && !user.is_superuser && filterRole === 'employee');

    return matchesSearch && matchesStatus && matchesRole;
  });

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleCreateUser = async () => {
    try {
      // Validate form
      const newErrors: {[key: string]: string} = {};
      
      if (!createUserData.email) newErrors.email = 'Email is required';
      if (!createUserData.first_name) newErrors.first_name = 'First name is required';
      if (!createUserData.last_name) newErrors.last_name = 'Last name is required';
      if (!createUserData.username) newErrors.username = 'Username is required';
      if (!createUserData.password) newErrors.password = 'Password is required';
      if (createUserData.password !== createUserData.confirm_password) {
        newErrors.confirm_password = 'Passwords do not match';
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length > 0) {
        return;
      }

      // Mock API call - replace with actual implementation
      const newUser: User = {
        id: users.length + 1,
        email: createUserData.email,
        first_name: createUserData.first_name,
        last_name: createUserData.last_name,
        username: createUserData.username,
        is_active: createUserData.is_active,
        is_staff: createUserData.is_staff,
        is_superuser: createUserData.is_superuser,
        date_joined: new Date().toISOString(),
        phone: createUserData.phone,
        department: createUserData.department,
        position: createUserData.position,
        role: createUserData.role
      };

      setUsers(prev => [...prev, newUser]);
      setShowCreateModal(false);
      
      // Reset form
      setCreateUserData({
        email: '',
        first_name: '',
        last_name: '',
        username: '',
        password: '',
        confirm_password: '',
        phone: '',
        department: '',
        position: '',
        role: '',
        is_staff: false,
        is_superuser: false,
        is_active: true
      });
      
      setErrors({});
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        // Mock API call - replace with actual implementation
        setUsers(prev => prev.filter(user => user.id !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleToggleUserStatus = async (userId: number) => {
    try {
      // Mock API call - replace with actual implementation
      setUsers(prev => prev.map(user => 
        user.id === userId ? { ...user, is_active: !user.is_active } : user
      ));
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const getUserRoleBadge = (user: User) => {
    if (user.is_superuser) {
      return <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">Super Admin</span>;
    } else if (user.is_staff) {
      return <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">Staff</span>;
    } else {
      return <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">Employee</span>;
    }
  };

  const getStatusBadge = (isActive: boolean) => {
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
        isActive 
          ? 'bg-green-100 text-green-700' 
          : 'bg-red-100 text-red-700'
      }`}>
        {isActive ? 'Active' : 'Inactive'}
      </span>
    );
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
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Create, edit, and manage system users</p>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <UserPlus className="w-4 h-4" />
            Create User
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={loadUsers}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-200"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </motion.button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-green-600">
                {users.filter(u => u.is_active).length}
              </p>
            </div>
            <UserCheck className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Staff Members</p>
              <p className="text-2xl font-bold text-blue-600">
                {users.filter(u => u.is_staff).length}
              </p>
            </div>
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Super Admins</p>
              <p className="text-2xl font-bold text-purple-600">
                {users.filter(u => u.is_superuser).length}
              </p>
            </div>
            <Shield className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive')}
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Roles</option>
              <option value="superuser">Super Admin</option>
              <option value="staff">Staff</option>
              <option value="employee">Employee</option>
            </select>
          </div>
          <div className="text-sm text-gray-600">
            Showing {currentUsers.length} of {filteredUsers.length} users
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-3 px-6 font-semibold text-gray-900">User</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-900">Role</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-900">Department</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-900">Status</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-900">Last Login</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                          {user.first_name[0]}{user.last_name[0]}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {user.first_name} {user.last_name}
                        </div>
                        <div className="text-sm text-gray-600">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    {getUserRoleBadge(user)}
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-900">{user.department || 'N/A'}</div>
                    <div className="text-xs text-gray-600">{user.position || 'No position'}</div>
                  </td>
                  <td className="py-4 px-6">
                    {getStatusBadge(user.is_active)}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    {user.last_login ? new Date(user.last_login).toLocaleDateString() : 'Never'}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          setCurrentUser(user);
                          setShowEditModal(true);
                        }}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                        title="Edit user"
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleToggleUserStatus(user.id)}
                        className={`p-1 rounded ${
                          user.is_active 
                            ? 'text-red-600 hover:bg-red-50' 
                            : 'text-green-600 hover:bg-green-50'
                        }`}
                        title={user.is_active ? 'Deactivate user' : 'Activate user'}
                      >
                        {user.is_active ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                        title="Delete user"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-3 border-t bg-gray-50 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded text-sm disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded text-sm disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Create User Modal */}
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
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b">
                <h3 className="text-xl font-semibold text-gray-900">Create New User</h3>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={createUserData.first_name}
                      onChange={(e) => setCreateUserData(prev => ({ ...prev, first_name: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.first_name && <p className="text-red-600 text-sm mt-1">{errors.first_name}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={createUserData.last_name}
                      onChange={(e) => setCreateUserData(prev => ({ ...prev, last_name: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.last_name && <p className="text-red-600 text-sm mt-1">{errors.last_name}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={createUserData.email}
                      onChange={(e) => setCreateUserData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Username *
                    </label>
                    <input
                      type="text"
                      value={createUserData.username}
                      onChange={(e) => setCreateUserData(prev => ({ ...prev, username: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.username && <p className="text-red-600 text-sm mt-1">{errors.username}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password *
                    </label>
                    <input
                      type="password"
                      value={createUserData.password}
                      onChange={(e) => setCreateUserData(prev => ({ ...prev, password: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      value={createUserData.confirm_password}
                      onChange={(e) => setCreateUserData(prev => ({ ...prev, confirm_password: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.confirm_password && <p className="text-red-600 text-sm mt-1">{errors.confirm_password}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department
                    </label>
                    <select
                      value={createUserData.department}
                      onChange={(e) => setCreateUserData(prev => ({ ...prev, department: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Department</option>
                      <option value="Engineering">Engineering</option>
                      <option value="HR">Human Resources</option>
                      <option value="Finance">Finance</option>
                      <option value="IT">Information Technology</option>
                      <option value="Sales">Sales</option>
                      <option value="Marketing">Marketing</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Position
                    </label>
                    <input
                      type="text"
                      value={createUserData.position}
                      onChange={(e) => setCreateUserData(prev => ({ ...prev, position: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. Senior Engineer, Manager"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={createUserData.phone}
                    onChange={(e) => setCreateUserData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="+1-555-0000"
                  />
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-900">Permissions</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={createUserData.is_active}
                        onChange={(e) => setCreateUserData(prev => ({ ...prev, is_active: e.target.checked }))}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Active User</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={createUserData.is_staff}
                        onChange={(e) => setCreateUserData(prev => ({ ...prev, is_staff: e.target.checked }))}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Staff Access</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={createUserData.is_superuser}
                        onChange={(e) => setCreateUserData(prev => ({ ...prev, is_superuser: e.target.checked }))}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-700">Super Admin Access</span>
                    </label>
                  </div>
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
                  onClick={handleCreateUser}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create User
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserManagement;
