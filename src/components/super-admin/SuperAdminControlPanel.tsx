'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Shield, 
  Settings, 
  FileText, 
  Database, 
  Monitor, 
  Archive, 
  Lock,
  ArrowLeft,
  Crown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
  Server,
  HardDrive,
  Cpu,
  Wifi,
  AlertCircle
} from 'lucide-react';

// Import management components
import UserManagement from './UserManagement';
import RolePermissionManagement from './RolePermissionManagement';

// Types
interface SystemStats {
  totalUsers: number;
  activeUsers: number;
  systemHealth: 'excellent' | 'good' | 'warning' | 'critical';
  serverUptime: string;
  lastBackup: string;
  pendingUpdates: number;
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  action: () => void;
}

interface ActivityItem {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
}

const SuperAdminControlPanel: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('dashboard');
  const [systemStats] = useState<SystemStats>({
    totalUsers: 82,
    activeUsers: 67,
    systemHealth: 'excellent',
    serverUptime: '15d 7h 23m',
    lastBackup: '2h ago',
    pendingUpdates: 3
  });

  const [recentActivity] = useState<ActivityItem[]>([
    {
      id: '1',
      user: 'John Smith',
      action: 'Created new user account for Sarah Wilson',
      timestamp: '2 minutes ago',
      severity: 'low'
    },
    {
      id: '2',
      user: 'System',
      action: 'Automatic backup completed successfully',
      timestamp: '1 hour ago',
      severity: 'low'
    },
    {
      id: '3',
      user: 'Admin',
      action: 'Security policy updated - Password requirements',
      timestamp: '3 hours ago',
      severity: 'medium'
    },
    {
      id: '4',
      user: 'Mike Johnson',
      action: 'Failed login attempt detected',
      timestamp: '4 hours ago',
      severity: 'high'
    },
    {
      id: '5',
      user: 'System',
      action: 'Database optimization completed',
      timestamp: '6 hours ago',
      severity: 'low'
    }
  ]);

  const quickActions: QuickAction[] = [
    {
      id: 'create-user',
      title: 'Create User',
      description: 'Add a new user to the system',
      icon: <Users className="w-5 h-5" />,
      color: 'bg-blue-500',
      action: () => setActiveSection('user-management')
    },
    {
      id: 'manage-roles',
      title: 'Manage Roles',
      description: 'Configure user roles and permissions',
      icon: <Shield className="w-5 h-5" />,
      color: 'bg-purple-500',
      action: () => setActiveSection('role-permissions')
    },
    {
      id: 'system-backup',
      title: 'System Backup',
      description: 'Create system backup now',
      icon: <Archive className="w-5 h-5" />,
      color: 'bg-green-500',
      action: () => setActiveSection('backup-restore')
    },
    {
      id: 'security-audit',
      title: 'Security Audit',
      description: 'Run security compliance check',
      icon: <Lock className="w-5 h-5" />,
      color: 'bg-red-500',
      action: () => setActiveSection('security-center')
    }
  ];

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getActivityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'medium': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default: return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
          <Crown className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Super Admin Control Panel</h1>
          <p className="text-gray-600">Complete system administration and management</p>
        </div>
      </div>

      {/* System Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{systemStats.totalUsers}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
          <div className="mt-4 text-sm text-gray-600">
            {systemStats.activeUsers} active users
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">System Health</p>
              <p className={`text-2xl font-bold capitalize ${getHealthColor(systemStats.systemHealth).split(' ')[0]}`}>
                {systemStats.systemHealth}
              </p>
            </div>
            <Activity className="w-8 h-8 text-green-600" />
          </div>
          <div className="mt-4">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getHealthColor(systemStats.systemHealth)}`}>
              All systems operational
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Server Uptime</p>
              <p className="text-2xl font-bold text-gray-900">{systemStats.serverUptime}</p>
            </div>
            <Server className="w-8 h-8 text-purple-600" />
          </div>
          <div className="mt-4 text-sm text-green-600">
            99.9% availability
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Last Backup</p>
              <p className="text-2xl font-bold text-gray-900">{systemStats.lastBackup}</p>
            </div>
            <Archive className="w-8 h-8 text-blue-600" />
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Auto-backup enabled
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <motion.button
              key={action.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={action.action}
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 text-left transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-8 h-8 rounded-lg ${action.color} flex items-center justify-center text-white`}>
                  {action.icon}
                </div>
                <span className="font-medium text-gray-900">{action.title}</span>
              </div>
              <p className="text-sm text-gray-600">{action.description}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* System Resources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Resources</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  CPU Usage
                </span>
                <span className="text-sm text-gray-600">23%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '23%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <HardDrive className="w-4 h-4" />
                  Memory Usage
                </span>
                <span className="text-sm text-gray-600">67%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '67%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  Disk Usage
                </span>
                <span className="text-sm text-gray-600">45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Wifi className="w-4 h-4" />
                  Network Load
                </span>
                <span className="text-sm text-gray-600">12%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '12%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 mt-0.5">
                  {getActivityIcon(activity.severity)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900">{activity.user}</div>
                  <div className="text-sm text-gray-600 mt-1">{activity.action}</div>
                  <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {activity.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pending Tasks */}
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending System Tasks</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <div>
                <div className="font-medium text-yellow-900">System Updates Available</div>
                <div className="text-sm text-yellow-700">{systemStats.pendingUpdates} security updates pending</div>
              </div>
            </div>
            <button className="px-3 py-1 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700">
              Update Now
            </button>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-blue-600" />
              <div>
                <div className="font-medium text-blue-900">Database Maintenance</div>
                <div className="text-sm text-blue-700">Scheduled for tonight at 2:00 AM</div>
              </div>
            </div>
            <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
              Reschedule
            </button>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <div className="font-medium text-green-900">Security Scan Complete</div>
                <div className="text-sm text-green-700">No vulnerabilities detected</div>
              </div>
            </div>
            <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
              View Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'user-management':
        return <UserManagement />;
      case 'role-permissions':
        return <RolePermissionManagement />;
      case 'system-settings':
        return (
          <div className="text-center py-16">
            <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">System Settings</h3>
            <p className="text-gray-600">This section is under development.</p>
          </div>
        );
      case 'audit-logs':
        return (
          <div className="text-center py-16">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Audit Logs</h3>
            <p className="text-gray-600">This section is under development.</p>
          </div>
        );
      case 'database-management':
        return (
          <div className="text-center py-16">
            <Database className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Database Management</h3>
            <p className="text-gray-600">This section is under development.</p>
          </div>
        );
      case 'system-monitoring':
        return (
          <div className="text-center py-16">
            <Monitor className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">System Monitoring</h3>
            <p className="text-gray-600">This section is under development.</p>
          </div>
        );
      case 'backup-restore':
        return (
          <div className="text-center py-16">
            <Archive className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Backup & Restore</h3>
            <p className="text-gray-600">This section is under development.</p>
          </div>
        );
      case 'security-center':
        return (
          <div className="text-center py-16">
            <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Security Center</h3>
            <p className="text-gray-600">This section is under development.</p>
          </div>
        );
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <AnimatePresence mode="wait">
          {activeSection !== 'dashboard' && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={() => setActiveSection('dashboard')}
              className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </motion.button>
          )}
        </AnimatePresence>

        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default SuperAdminControlPanel;
