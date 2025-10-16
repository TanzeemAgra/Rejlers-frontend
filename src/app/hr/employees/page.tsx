'use client';

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Users } from 'lucide-react';

const EmployeesPage: React.FC = () => {
  return (
    <DashboardLayout currentModule="hr">
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-3 mb-6">
          <Users className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Employee Management</h1>
            <p className="text-gray-600">Manage employee profiles and information</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
          <div className="text-center">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Employee Management</h2>
            <p className="text-gray-600 mb-6">
              This page will contain employee directory, profiles, and management tools.
            </p>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                Navigate to <strong>HR Dashboard</strong> to see the AI-powered HR analytics and insights.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmployeesPage;