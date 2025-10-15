'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { getSidebarConfiguration } from '@/config/sidebar';

interface DashboardSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ isOpen, onClose }) => {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [userPermissions, setUserPermissions] = useState<string[]>([]);
  
  // Get user data and permissions
  useEffect(() => {
    try {
      // Give all permissions by default to ensure all modules show
      const allPermissions = [
        'view_dashboard',
        'view_projects', 
        'view_hr', 
        'view_finance', 
        'view_contracts',
        'view_supply_chain', 
        'view_sales', 
        'view_hse', 
        'view_reports',
        'view_rto', 
        'view_contacts',
        'super_admin_access'
      ];
      
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        console.log('🔧 User Data Found:', user);
        
        // Always give all permissions to ensure full functionality
        setUserPermissions(allPermissions);
      } else {
        console.log('🔧 No user data, giving all permissions for demo');
        // Give all permissions even without user data
        setUserPermissions(allPermissions);
      }
    } catch (error) {
      console.error('Error loading user permissions:', error);
      // Even on error, give all permissions
      const allPermissions = [
        'view_dashboard', 'view_projects', 'view_hr', 'view_finance', 'view_contracts',
        'view_supply_chain', 'view_sales', 'view_hse', 'view_reports', 'view_rto', 
        'view_contacts', 'super_admin_access'
      ];
      setUserPermissions(allPermissions);
    }
  }, []);

  // Filter modules based on permissions
  const filteredModules = getSidebarConfiguration().filter(module => {
    if (!module.permissions || module.permissions.length === 0) {
      return module.isActive;
    }
    return module.isActive && module.permissions.some(permission => 
      userPermissions.includes(permission)
    );
  });

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

  const sidebarContent = (
    <div className="w-80 bg-white border-r border-gray-200 h-full">
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-900">REJLERS</h1>
        <p className="text-sm text-gray-500">Dashboard</p>
        {/* Debug info */}
        <div className="mt-2 text-xs text-green-600">
          🔧 Sidebar: {filteredModules.length} modules | Permissions: {userPermissions.length}
        </div>
        <div className="mt-1 text-xs text-blue-600">
          📋 Modules: {filteredModules.map(m => m.title).join(', ')}
        </div>
      </div>
      <nav className="p-4 space-y-2">
        {filteredModules.map((module) => (
          <div key={module.id} className="mb-2">
            {module.hasSubmenu ? (
              <>
                <button
                  onClick={() => toggleModule(module.id)}
                  className="flex items-center w-full px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 ease-in-out rounded-lg"
                >
                  {/* Icon */}
                  {module.icon && <module.icon className="w-5 h-5 mr-3" />}
                  {/* Title */}
                  <span className="flex-1 font-medium text-left">{module.title}</span>
                  {/* Badge */}
                  {module.badge && (
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full mr-2 ${
                      module.badgeColor === 'blue' ? 'bg-blue-100 text-blue-800' :
                      module.badgeColor === 'green' ? 'bg-green-100 text-green-800' :
                      module.badgeColor === 'red' ? 'bg-red-100 text-red-800' :
                      module.badgeColor === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                      module.badgeColor === 'purple' ? 'bg-purple-100 text-purple-800' :
                      module.badgeColor === 'indigo' ? 'bg-indigo-100 text-indigo-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {module.badge}
                    </span>
                  )}
                  {/* Expand/Collapse Arrow */}
                  {expandedModules.has(module.id) ? (
                    <ChevronDown size={16} className="text-gray-400" />
                  ) : (
                    <ChevronRight size={16} className="text-gray-400" />
                  )}
                </button>
                
                {/* Submenu Items */}
                {expandedModules.has(module.id) && module.items && (
                  <div className="ml-6 mt-2 space-y-1">
                    {module.items.map((item) => (
                      <a
                        key={item.id}
                        href={item.path}
                        className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-all duration-200 ease-in-out rounded-md group"
                      >
                        <item.icon className="w-4 h-4 mr-3 text-gray-500 group-hover:text-gray-700" />
                        <span className="flex-1">{item.title}</span>
                        {item.badge && (
                          <span className={`px-1.5 py-0.5 text-xs font-medium rounded-full ${
                            item.badgeColor === 'blue' ? 'bg-blue-100 text-blue-800' :
                            item.badgeColor === 'green' ? 'bg-green-100 text-green-800' :
                            item.badgeColor === 'red' ? 'bg-red-100 text-red-800' :
                            item.badgeColor === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                            item.badgeColor === 'purple' ? 'bg-purple-100 text-purple-800' :
                            item.badgeColor === 'indigo' ? 'bg-indigo-100 text-indigo-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
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
                {/* Icon */}
                {module.icon && <module.icon className="w-5 h-5 mr-3 text-gray-600 group-hover:text-gray-800" />}
                {/* Title */}
                <span className="flex-1 font-medium">{module.title}</span>
                {/* Badge */}
                {module.badge && (
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    module.badgeColor === 'blue' ? 'bg-blue-100 text-blue-800' :
                    module.badgeColor === 'green' ? 'bg-green-100 text-green-800' :
                    module.badgeColor === 'red' ? 'bg-red-100 text-red-800' :
                    module.badgeColor === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                    module.badgeColor === 'purple' ? 'bg-purple-100 text-purple-800' :
                    module.badgeColor === 'indigo' ? 'bg-indigo-100 text-indigo-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
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

  // Always show sidebar on desktop, mobile overlay when isOpen
  return (
    <>
      {/* Mobile overlay when open */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={onClose}>
          <div className="w-80 h-full" onClick={(e) => e.stopPropagation()}>
            {sidebarContent}
          </div>
        </div>
      )}
      
      {/* Desktop sidebar - always visible */}
      <div className="hidden lg:block">
        {sidebarContent}
      </div>
    </>
  );
};

export default DashboardSidebar;
