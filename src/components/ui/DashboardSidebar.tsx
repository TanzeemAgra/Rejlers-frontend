'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Search, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getSidebarConfiguration, SidebarModule, SidebarItem, searchModules } from '@/config/sidebar';
import Logo from '@/components/ui/Logo';

interface DashboardSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ 
  isOpen = true, 
  onClose,
  className = '' 
}) => {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set(['dashboard']));
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ module: SidebarModule; item?: SidebarItem }[]>([]);
  const [modules, setModules] = useState<SidebarModule[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const pathname = usePathname();

  useEffect(() => {
    // Use soft coding to get sidebar configuration
    const sidebarModules = getSidebarConfiguration();
    setModules(sidebarModules);
    
    // Auto-expand module based on current path
    const activeModule = sidebarModules.find(module => 
      pathname?.startsWith(`/${module.id}`) || 
      module.children?.some(item => pathname === item.path)
    );
    
    if (activeModule) {
      setExpandedModules(prev => {
        const newSet = new Set(prev);
        newSet.add(activeModule.id);
        return newSet;
      });
    }
  }, [pathname]);

  useEffect(() => {
    // Search functionality using soft coding
    if (searchQuery.trim()) {
      const results = searchModules(searchQuery);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };

  const isItemActive = (path: string) => {
    return pathname === path;
  };

  const getBadgeColor = (color?: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-500 text-white';
      case 'green': return 'bg-green-500 text-white';
      case 'red': return 'bg-red-500 text-white';
      case 'yellow': return 'bg-yellow-500 text-black';
      case 'purple': return 'bg-purple-500 text-white';
      case 'indigo': return 'bg-indigo-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const renderModule = (module: SidebarModule) => {
    const isExpanded = expandedModules.has(module.id);
    const hasChildren = module.children && module.children.length > 0;
    const ModuleIcon = module.icon;

    return (
      <div key={module.id} className="mb-2">
        {/* Module Header */}
        <div
          className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors ${
            module.path && isItemActive(module.path)
              ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
          onClick={() => {
            if (hasChildren) {
              toggleModule(module.id);
            }
          }}
        >
          <div className="flex items-center flex-1">
            {module.path ? (
              <Link href={module.path} className="flex items-center flex-1">
                <ModuleIcon className="w-5 h-5 mr-3" />
                <span className="font-medium">{module.title}</span>
                {module.badge && (
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getBadgeColor(module.badgeColor)}`}>
                    {module.badge}
                  </span>
                )}
              </Link>
            ) : (
              <div className="flex items-center flex-1">
                <ModuleIcon className="w-5 h-5 mr-3" />
                <span className="font-medium">{module.title}</span>
                {module.badge && (
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getBadgeColor(module.badgeColor)}`}>
                    {module.badge}
                  </span>
                )}
              </div>
            )}
          </div>
          
          {hasChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleModule(module.id);
              }}
              className="p-1 hover:bg-slate-200 rounded"
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          )}
        </div>

        {/* Module Children */}
        {hasChildren && isExpanded && (
          <div className="ml-4 mt-1 space-y-1">
            {module.children?.map((item) => {
              const ItemIcon = item.icon;
              return (
                <Link
                  key={item.id}
                  href={item.path}
                  className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
                    isItemActive(item.path)
                      ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-500'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-700'
                  }`}
                >
                  {ItemIcon && <ItemIcon className="w-4 h-4 mr-3" />}
                  <span className="flex-1">{item.title}</span>
                  {item.badge && (
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getBadgeColor(item.badgeColor)}`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const sidebarContent = (
    <div className="h-full flex flex-col bg-white border-r border-slate-200">
      {/* Header */}
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Logo context="sidebar" />
          </div>
          
          {/* Mobile close button */}
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search modules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {searchQuery.trim() && searchResults.length > 0 ? (
          /* Search Results */
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-slate-500 mb-3">Search Results</h3>
            {searchResults.map((result, index) => (
              <div key={index} className="border-b border-slate-100 pb-2 mb-2 last:border-0">
                <div className="text-xs text-slate-400 mb-1">{result.module.title}</div>
                {result.item ? (
                  <Link
                    href={result.item.path}
                    className="flex items-center px-2 py-1 rounded text-sm text-slate-700 hover:bg-slate-100"
                    onClick={() => setSearchQuery('')}
                  >
                    {result.item.icon && <result.item.icon className="w-4 h-4 mr-2" />}
                    <div>
                      <div className="font-medium">{result.item.title}</div>
                      {result.item.description && (
                        <div className="text-xs text-slate-500">{result.item.description}</div>
                      )}
                    </div>
                  </Link>
                ) : (
                  <Link
                    href={result.module.path || '#'}
                    className="flex items-center px-2 py-1 rounded text-sm text-slate-700 hover:bg-slate-100"
                    onClick={() => setSearchQuery('')}
                  >
                    <result.module.icon className="w-4 h-4 mr-2" />
                    <span className="font-medium">{result.module.title}</span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        ) : searchQuery.trim() && searchResults.length === 0 ? (
          /* No Results */
          <div className="text-center text-slate-500 text-sm mt-8">
            No results found for "{searchQuery}"
          </div>
        ) : (
          /* Normal Module List */
          <div className="space-y-1">
            {modules.map(renderModule)}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200">
        <div className="text-xs text-slate-500 text-center">
          REJLERS Engineering Excellence
        </div>
        <div className="text-xs text-slate-400 text-center mt-1">
          Version 1.0.0
        </div>
      </div>
    </div>
  );

  // Desktop sidebar
  if (!onClose) {
    return (
      <div className={`${isOpen ? 'w-80' : 'w-0'} transition-all duration-300 ${className}`}>
        {isOpen && sidebarContent}
      </div>
    );
  }

  // Mobile sidebar (with overlay)
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Mobile Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-80 z-50 transform transition-transform duration-300 lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </div>
    </>
  );
};

export default DashboardSidebar;