'use client';

import React from 'react';
import DashboardSidebar from '@/components/ui/DashboardSidebar';
import { BarChart3, Plus, FileText, TrendingUp, Calendar } from 'lucide-react';

const ReportsPage = () => {
  const reports = [
    { 
      id: 1, 
      title: 'Monthly Financial Summary',
      type: 'Financial', 
      status: 'Generated',
      lastRun: '2024-01-15',
      schedule: 'Monthly',
      size: '2.4 MB'
    },
    { 
      id: 2, 
      title: 'Project Progress Dashboard',
      type: 'Operations', 
      status: 'Scheduled',
      lastRun: '2024-01-14',
      schedule: 'Weekly',
      size: '1.8 MB'
    },
    { 
      id: 3, 
      title: 'HSE Compliance Report',
      type: 'Safety', 
      status: 'Generated',
      lastRun: '2024-01-12',
      schedule: 'Quarterly',
      size: '3.1 MB'
    },
    { 
      id: 4, 
      title: 'Supply Chain Analytics',
      type: 'Logistics', 
      status: 'In Progress',
      lastRun: '2024-01-10',
      schedule: 'Bi-weekly',
      size: '4.2 MB'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Generated': return 'bg-green-100 text-green-800';
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Financial': return 'text-green-600';
      case 'Operations': return 'text-blue-600';
      case 'Safety': return 'text-red-600';
      case 'Logistics': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Financial': return <TrendingUp className="w-5 h-5" />;
      case 'Operations': return <BarChart3 className="w-5 h-5" />;
      case 'Safety': return <FileText className="w-5 h-5" />;
      case 'Logistics': return <Calendar className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <DashboardSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <BarChart3 className="w-8 h-8 text-violet-600" />
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Reporting & Analytics</h1>
                <p className="text-slate-600">Generate insights and business intelligence reports</p>
              </div>
            </div>
            
            <button className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Create Report</span>
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6">
          {/* Reporting Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Reports</p>
                  <p className="text-2xl font-bold text-slate-900">156</p>
                </div>
                <FileText className="w-8 h-8 text-violet-600" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Scheduled Reports</p>
                  <p className="text-2xl font-bold text-slate-900">24</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Data Sources</p>
                  <p className="text-2xl font-bold text-slate-900">12</p>
                </div>
                <BarChart3 className="w-8 h-8 text-green-600" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Dashboard Views</p>
                  <p className="text-2xl font-bold text-slate-900">8</p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-600" />
              </div>
            </div>
          </div>

          {/* Reports Table */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">Recent Reports</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Report</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Schedule</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Last Run</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Size</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {reports.map((report) => (
                    <tr key={report.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`mr-3 ${getTypeColor(report.type)}`}>
                            {getTypeIcon(report.type)}
                          </div>
                          <div>
                            <div className="font-medium text-slate-900">{report.title}</div>
                            <div className="text-sm text-slate-500">Report #{report.id.toString().padStart(3, '0')}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`font-medium ${getTypeColor(report.type)}`}>
                          {report.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(report.status)}`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                        {report.schedule}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {new Date(report.lastRun).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {report.size}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;