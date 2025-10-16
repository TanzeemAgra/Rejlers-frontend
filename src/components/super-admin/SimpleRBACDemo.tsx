'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain,
  Users,
  Shield,
  Crown,
  Settings,
  Bot,
  Sparkles,
  CheckCircle,
  AlertTriangle,
  Loader2
} from 'lucide-react';

// Simple demo data for testing without backend
const demoRoles = {
  enterprise_roles: [
    { id: '1', name: 'Super Admin', description: 'Full system access', permissions: {}, is_active: true, created_at: '', updated_at: '' },
    { id: '2', name: 'Chief Digital Officer (CDO)', description: 'Digital transformation leader', permissions: {}, is_active: true, created_at: '', updated_at: '' },
    { id: '3', name: 'CTO/IT Director', description: 'Technology leadership', permissions: {}, is_active: true, created_at: '', updated_at: '' }
  ],
  functional_roles: [
    { id: '4', name: 'Engineering Lead', description: 'Engineering team management', permissions: {}, is_active: true, created_at: '', updated_at: '' },
    { id: '5', name: 'Project Manager', description: 'Project coordination', permissions: {}, is_active: true, created_at: '', updated_at: '' },
    { id: '6', name: 'QA/QC Engineer', description: 'Quality assurance', permissions: {}, is_active: true, created_at: '', updated_at: '' }
  ],
  ai_powered_roles: [
    { id: '7', name: 'AI Assistant', description: 'Intelligent system assistant', permissions: {}, is_active: true, created_at: '', updated_at: '' },
    { id: '8', name: 'Digital Twin Bot', description: 'Digital twin management', permissions: {}, is_active: true, created_at: '', updated_at: '' },
    { id: '9', name: 'Compliance Bot', description: 'Automated compliance monitoring', permissions: {}, is_active: true, created_at: '', updated_at: '' }
  ],
  total_count: 9
};

const demoUsers = [
  { 
    id: '1', 
    username: 'admin', 
    email: 'admin@rejlers.com', 
    first_name: 'Super', 
    last_name: 'Admin',
    role: demoRoles.enterprise_roles[0],
    employee_id: 'EMP001',
    company_name: 'Rejlers',
    job_title: 'System Administrator',
    department: 'IT',
    position: 'Super Admin',
    is_staff: true,
    is_superuser: true,
    is_approved: true,
    is_verified: true,
    created_at: new Date().toISOString()
  },
  { 
    id: '2', 
    username: 'cdo', 
    email: 'cdo@rejlers.com', 
    first_name: 'Digital', 
    last_name: 'Officer',
    role: demoRoles.enterprise_roles[1],
    employee_id: 'EMP002',
    company_name: 'Rejlers',
    job_title: 'Chief Digital Officer',
    department: 'Executive',
    position: 'CDO',
    is_staff: true,
    is_superuser: false,
    is_approved: true,
    is_verified: true,
    created_at: new Date().toISOString()
  }
];

const SimpleRBACDemo: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [roles] = useState(demoRoles);
  const [users] = useState(demoUsers);
  const [selectedView, setSelectedView] = useState<'overview' | 'users' | 'roles'>('overview');

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 2000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-purple-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900">Loading RBAC Demo...</h3>
          <p className="text-gray-600">Initializing AI-Powered System</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-2xl p-6 text-white mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <Brain className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">AI-Powered RBAC System</h1>
                <p className="text-purple-100">Demo Mode - Testing Interface Accessibility</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-green-500/20 text-green-100 rounded-full text-sm">
                ✓ Interface Loaded
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setSelectedView('overview')}
              className={`px-6 py-4 font-medium ${
                selectedView === 'overview' 
                  ? 'text-purple-600 border-b-2 border-purple-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setSelectedView('roles')}
              className={`px-6 py-4 font-medium ${
                selectedView === 'roles' 
                  ? 'text-purple-600 border-b-2 border-purple-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Role Management
            </button>
            <button
              onClick={() => setSelectedView('users')}
              className={`px-6 py-4 font-medium ${
                selectedView === 'users' 
                  ? 'text-purple-600 border-b-2 border-purple-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              User Management
            </button>
          </div>
        </div>

        {/* Content */}
        {selectedView === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Enterprise Roles</h3>
                <Crown className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-3xl font-bold text-purple-600 mb-2">{roles.enterprise_roles.length}</p>
              <p className="text-sm text-gray-600">C-Suite & Executive Leadership</p>
              <div className="mt-4 space-y-2">
                {roles.enterprise_roles.map((role) => (
                  <div key={role.id} className="text-sm text-gray-700">
                    • {role.name}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-blue-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Functional Roles</h3>
                <Settings className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-blue-600 mb-2">{roles.functional_roles.length}</p>
              <p className="text-sm text-gray-600">Operational & Departmental</p>
              <div className="mt-4 space-y-2">
                {roles.functional_roles.map((role) => (
                  <div key={role.id} className="text-sm text-gray-700">
                    • {role.name}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-green-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">AI-Powered Roles</h3>
                <Bot className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-green-600 mb-2">{roles.ai_powered_roles.length}</p>
              <p className="text-sm text-gray-600">Intelligent Systems & Bots</p>
              <div className="mt-4 space-y-2">
                {roles.ai_powered_roles.map((role) => (
                  <div key={role.id} className="text-sm text-gray-700">
                    • {role.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedView === 'users' && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">User Management</h2>
              <p className="text-gray-600">Manage system users and their roles</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
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
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          👑 {user.role?.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedView === 'roles' && (
          <div className="space-y-6">
            {/* Enterprise Roles */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Crown className="w-5 h-5 text-purple-600" />
                <span>Enterprise Roles</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {roles.enterprise_roles.map((role) => (
                  <div key={role.id} className="p-4 border border-purple-200 rounded-lg">
                    <h4 className="font-semibold text-gray-900">{role.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Functional Roles */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Settings className="w-5 h-5 text-blue-600" />
                <span>Functional Roles</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {roles.functional_roles.map((role) => (
                  <div key={role.id} className="p-4 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-gray-900">{role.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* AI-Powered Roles */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Bot className="w-5 h-5 text-green-600" />
                <span>AI-Powered Roles</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {roles.ai_powered_roles.map((role) => (
                  <div key={role.id} className="p-4 border border-green-200 rounded-lg">
                    <h4 className="font-semibold text-gray-900">{role.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Status Footer */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">System Status: Interface Accessible</span>
            </div>
            <div className="text-xs text-blue-600">
              Demo Mode • URL: {typeof window !== 'undefined' ? window.location.pathname : '/super-admin/user-management'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleRBACDemo;