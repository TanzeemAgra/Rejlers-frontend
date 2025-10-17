/**
 * RBAC Service for Role-Based Access Control operations
 * Handles Enterprise, Functional, and AI-Powered roles management
 */

import { config } from '@/config';
import { authService } from './auth';

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Record<string, string[]>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: Role | null;
  employee_id: string;
  company_name: string;
  job_title: string;
  department: string;
  position: string;
  phone_number?: string;
  phone?: string;
  is_staff: boolean;
  is_superuser: boolean;
  is_approved: boolean;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
  date_joined?: string;
  last_login?: string;
}

export interface ModulePermission {
  module_key: string;
  available_permissions: string[];
  user_permissions: string[];
  access_level: {
    can_view: boolean;
    can_create: boolean;
    can_edit: boolean;
    can_delete: boolean;
    full_access: boolean;
  };
}

export interface UserPermissions {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    is_superuser: boolean;
    is_staff: boolean;
  };
  role_details: Role | null;
  module_permissions: Record<string, ModulePermission>;
  accessible_modules: string[];
  can_manage_users: boolean;
  can_access_ai_services: boolean;
}

export interface RoleDistribution {
  role_name: string;
  user_count: number;
  percentage: number;
}

export interface SystemInfo {
  system_statistics: {
    total_users: number;
    total_roles: number;
    active_sessions: number;
    super_admins: number;
  };
  role_categories: {
    enterprise_roles: number;
    functional_roles: number;
    ai_powered_roles: number;
  };
  role_distribution: RoleDistribution[];
  recent_role_changes: any[];
  module_permissions: {
    available_modules: string[];
    permission_levels: string[];
  };
}

export interface RolesResponse {
  enterprise_roles: Role[];
  functional_roles: Role[];
  ai_powered_roles: Role[];
  total_count: number;
}

class RBACService {
  private getBaseUrl(): string {
    return config.api.baseUrl;
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `${this.getBaseUrl()}${endpoint}`;
    const token = authService.getAccessToken();
    
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Network error' }));
      throw new Error(error.detail || error.message || 'Request failed');
    }

    return response.json();
  }

  // =============================================================================
  // ROLE MANAGEMENT
  // =============================================================================

  /**
   * Get all roles organized by category
   */
  async getAllRoles(): Promise<RolesResponse> {
    try {
      return await this.makeRequest('/auth/roles/');
    } catch (error) {
      console.error('Error fetching roles:', error);
      throw new Error('Failed to fetch roles');
    }
  }

  /**
   * Get detailed information about a specific role
   */
  async getRoleDetails(roleId: string): Promise<Role & { user_count: number; module_permissions_detail: any }> {
    try {
      return await this.makeRequest(`/auth/roles/${roleId}/`);
    } catch (error) {
      console.error('Error fetching role details:', error);
      throw new Error('Failed to fetch role details');
    }
  }

  /**
   * Get all users with a specific role
   */
  async getUsersByRole(roleId: string): Promise<{ role: Role; users: User[]; user_count: number }> {
    try {
      return await this.makeRequest(`/auth/roles/${roleId}/users/`);
    } catch (error) {
      console.error('Error fetching users by role:', error);
      throw new Error('Failed to fetch users by role');
    }
  }

  // =============================================================================
  // USER MANAGEMENT
  // =============================================================================

  /**
   * Assign a role to a user
   */
  async assignRole(userId: string, roleId: string): Promise<{ message: string; user: User }> {
    try {
      return await this.makeRequest('/auth/assign-role/', {
        method: 'POST',
        body: JSON.stringify({
          user_id: userId,
          role_id: roleId
        })
      });
    } catch (error) {
      console.error('Error assigning role:', error);
      throw new Error('Failed to assign role');
    }
  }

  /**
   * Get current user's permissions
   */
  async getUserPermissions(): Promise<UserPermissions> {
    try {
      return await this.makeRequest('/auth/permissions/');
    } catch (error) {
      console.error('Error fetching user permissions:', error);
      throw new Error('Failed to fetch user permissions');
    }
  }

  /**
   * Check if user has specific permission for a module
   */
  async checkModulePermission(module: string, permission: string): Promise<{
    user: string;
    module: string;
    permission: string;
    has_permission: boolean;
    user_role: string;
  }> {
    try {
      return await this.makeRequest('/auth/check-module-permission/', {
        method: 'POST',
        body: JSON.stringify({
          module,
          permission
        })
      });
    } catch (error) {
      console.error('Error checking module permission:', error);
      throw new Error('Failed to check module permission');
    }
  }

  // =============================================================================
  // SYSTEM INFORMATION
  // =============================================================================

  /**
   * Get comprehensive RBAC system information
   */
  async getSystemInfo(): Promise<SystemInfo> {
    try {
      return await this.makeRequest('/auth/rbac-info/');
    } catch (error) {
      console.error('Error fetching system info:', error);
      throw new Error('Failed to fetch system information');
    }
  }

  // =============================================================================
  // PERMISSION HELPERS
  // =============================================================================

  /**
   * Check if user can access a specific module
   */
  async canAccessModule(module: string): Promise<boolean> {
    try {
      const permissions = await this.getUserPermissions();
      return permissions.accessible_modules.includes(module);
    } catch (error) {
      return false;
    }
  }

  /**
   * Get user's role name
   */
  async getUserRole(): Promise<string> {
    try {
      const permissions = await this.getUserPermissions();
      return permissions.user.role;
    } catch (error) {
      return 'Unknown';
    }
  }

  /**
   * Check if user is admin (Super Admin, CDO, CTO/IT Director)
   */
  async isUserAdmin(): Promise<boolean> {
    try {
      const permissions = await this.getUserPermissions();
      const adminRoles = ['Super Admin', 'Chief Digital Officer (CDO)', 'CTO/IT Director'];
      return adminRoles.includes(permissions.user.role) || permissions.user.is_superuser;
    } catch (error) {
      return false;
    }
  }

  /**
   * Check if user can manage other users
   */
  async canManageUsers(): Promise<boolean> {
    try {
      const permissions = await this.getUserPermissions();
      return permissions.can_manage_users || permissions.user.is_superuser;
    } catch (error) {
      return false;
    }
  }

  /**
   * Check if user can access AI services
   */
  async canAccessAIServices(): Promise<boolean> {
    try {
      const permissions = await this.getUserPermissions();
      return permissions.can_access_ai_services;
    } catch (error) {
      return false;
    }
  }

  // =============================================================================
  // ROLE CATEGORIES HELPERS
  // =============================================================================

  /**
   * Get enterprise role names
   */
  getEnterpriseRoles(): string[] {
    return [
      'Super Admin',
      'Chief Digital Officer (CDO)',
      'CTO/IT Director',
      'CFO/Finance Head',
      'HR Director',
      'Sales Director'
    ];
  }

  /**
   * Get functional role names
   */
  getFunctionalRoles(): string[] {
    return [
      'Engineering Lead',
      'Engineer',
      'QA/QC Engineer',
      'Project Manager',
      'AI/ML Lead',
      'Operations Manager',
      'Procurement Manager',
      'Client/External'
    ];
  }

  /**
   * Get AI-powered role names
   */
  getAIPoweredRoles(): string[] {
    return [
      'AI Assistant (System Role)',
      'Digital Twin Bot',
      'Compliance Bot',
      'Insight Generator'
    ];
  }

  /**
   * Get role category for a role name
   */
  getRoleCategory(roleName: string): 'enterprise' | 'functional' | 'ai_powered' | 'unknown' {
    if (this.getEnterpriseRoles().includes(roleName)) return 'enterprise';
    if (this.getFunctionalRoles().includes(roleName)) return 'functional';
    if (this.getAIPoweredRoles().includes(roleName)) return 'ai_powered';
    return 'unknown';
  }

  /**
   * Get role category badge color
   */
  getRoleCategoryColor(roleName: string): string {
    const category = this.getRoleCategory(roleName);
    switch (category) {
      case 'enterprise': return 'bg-purple-100 text-purple-800';
      case 'functional': return 'bg-blue-100 text-blue-800';
      case 'ai_powered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  /**
   * Get role category icon
   */
  getRoleCategoryIcon(roleName: string): string {
    const category = this.getRoleCategory(roleName);
    switch (category) {
      case 'enterprise': return '🏢';
      case 'functional': return '🛠️';
      case 'ai_powered': return '🤖';
      default: return '👤';
    }
  }

  // =============================================================================
  // UTILITY METHODS
  // =============================================================================

  /**
   * Format permission name for display
   */
  formatPermissionName(permission: string): string {
    return permission.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }

  /**
   * Format module name for display
   */
  formatModuleName(module: string): string {
    return module.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }

  /**
   * Get permission level badge color
   */
  getPermissionBadgeColor(permission: string): string {
    switch (permission) {
      case 'view': return 'bg-blue-100 text-blue-800';
      case 'create': return 'bg-green-100 text-green-800';
      case 'edit': return 'bg-yellow-100 text-yellow-800';
      case 'delete': return 'bg-red-100 text-red-800';
      case 'manage_all': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  /**
   * Helper function to check if role has specific module access
   */
  hasModuleAccess(role: Role, module: string): boolean {
    return role.permissions && role.permissions[module] && role.permissions[module].length > 0;
  }

  /**
   * Helper function to get user's accessible modules
   */
  getUserAccessibleModules(userPermissions: UserPermissions): string[] {
    const modules: string[] = [];
    if (userPermissions.module_permissions) {
      Object.entries(userPermissions.module_permissions).forEach(([module, hasAccess]) => {
        if (hasAccess) {
          modules.push(module);
        }
      });
    }
    return modules;
  }

  /**
   * Helper function to calculate role distribution percentages
   */
  calculateRoleDistribution(roleDistribution: Array<{role_name: string, user_count: number}>): Array<{role_name: string, user_count: number, percentage: number}> {
    const totalUsers = roleDistribution.reduce((sum, role) => sum + role.user_count, 0);
    return roleDistribution.map(role => ({
      ...role,
      percentage: totalUsers > 0 ? Math.round((role.user_count / totalUsers) * 100) : 0
    }));
  }

  /**
   * Helper function to get high-risk users (users with excessive privileges)
   */
  getHighRiskUsers(users: User[]): User[] {
    return users.filter(user => 
      user.is_superuser || 
      (user.role && ['Super Admin', 'Chief Digital Officer (CDO)', 'CTO/IT Director'].includes(user.role.name))
    );
  }

  /**
   * Helper function to suggest role optimizations
   */
  suggestRoleOptimizations(users: User[], roleDistribution: Array<{role_name: string, user_count: number}>): Array<{type: string, message: string, users?: User[]}> {
    const suggestions = [];
    const totalUsers = users.length;
    
    // Check for too many super admins
    const superAdmins = users.filter(user => user.is_superuser);
    if (superAdmins.length > 3) {
      suggestions.push({
        type: 'security',
        message: `Consider reducing the number of Super Admins (currently ${superAdmins.length}). Recommended: 2-3 maximum.`,
        users: superAdmins
      });
    }
    
    // Check for unbalanced role distribution
    roleDistribution.forEach(role => {
      const percentage = (role.user_count / totalUsers) * 100;
      if (percentage > 30 && role.role_name !== 'Engineer') {
        suggestions.push({
          type: 'distribution',
          message: `Role "${role.role_name}" has ${percentage.toFixed(1)}% of all users. Consider redistributing roles.`
        });
      }
    });
    
    // Check for users without roles
    const usersWithoutRoles = users.filter(user => !user.role);
    if (usersWithoutRoles.length > 0) {
      suggestions.push({
        type: 'assignment',
        message: `${usersWithoutRoles.length} users don't have assigned roles. Assign appropriate roles for security.`,
        users: usersWithoutRoles
      });
    }
    
    return suggestions;
  }
}

// Export singleton instance
export const rbacService = new RBACService();
export default rbacService;