'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  BarChart3, 
  Eye, 
  Calendar,
  TrendingUp,
  Settings
} from 'lucide-react';
import TeamDashboard from '@/components/attendance/TeamDashboard';
import TeamAnalytics from '@/components/attendance/TeamAnalytics';
import ManagerOverview from '@/components/attendance/ManagerOverview';

type DashboardView = 'overview' | 'analytics' | 'manager';

const TeamDashboardPage: React.FC = () => {
  const [activeView, setActiveView] = useState<DashboardView>('overview');

  const views = [
    { 
      id: 'overview' as DashboardView, 
      name: 'Team Overview', 
      icon: Users,
      description: 'Comprehensive team attendance dashboard'
    },
    { 
      id: 'analytics' as DashboardView, 
      name: 'Analytics', 
      icon: BarChart3,
      description: 'Advanced insights and performance metrics'
    },
    { 
      id: 'manager' as DashboardView, 
      name: 'Manager View', 
      icon: Eye,
      description: 'Real-time team status and management'
    }
  ];

  const renderActiveView = () => {
    switch (activeView) {
      case 'overview':
        return <TeamDashboard />;
      case 'analytics':
        return <TeamAnalytics />;
      case 'manager':
        return <ManagerOverview />;
      default:
        return <TeamDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {views.map((view) => {
                const Icon = view.icon;
                return (
                  <motion.button
                    key={view.id}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveView(view.id)}
                    className={`group relative py-4 px-1 border-b-2 font-medium text-sm focus:outline-none ${
                      activeView === view.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-5 h-5" />
                      <span>{view.name}</span>
                    </div>
                    {activeView === view.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-x-0 -bottom-px h-0.5 bg-blue-500"
                      />
                    )}
                  </motion.button>
                );
              })}
            </nav>
          </div>
          
          {/* View Description */}
          <div className="mt-4">
            <p className="text-gray-600">
              {views.find(v => v.id === activeView)?.description}
            </p>
          </div>
        </div>

        {/* Active View Content */}
        <motion.div
          key={activeView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderActiveView()}
        </motion.div>
      </div>
    </div>
  );
};

export default TeamDashboardPage;