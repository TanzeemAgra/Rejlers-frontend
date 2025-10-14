'use client';

import React from 'react';
import DashboardSidebar from '@/components/ui/DashboardSidebar';
import { Settings, Plus, FileCheck, Clock, AlertCircle } from 'lucide-react';

const RTOAPCPage = () => {
  const applications = [
    { 
      id: 1, 
      type: 'RTO Registration',
      applicant: 'Nordic Energy Solutions', 
      submittedDate: '2024-01-15',
      status: 'Under Review',
      priority: 'High',
      assignedTo: 'Erik Johansson'
    },
    { 
      id: 2, 
      type: 'APC Renewal',
      applicant: 'GreenTech Industries', 
      submittedDate: '2024-01-14',
      status: 'Approved',
      priority: 'Medium',
      assignedTo: 'Maria Andersson'
    },
    { 
      id: 3, 
      type: 'Equipment Certification',
      applicant: 'Industrial Manufacturing Co', 
      submittedDate: '2024-01-12',
      status: 'Pending Documentation',
      priority: 'Medium',
      assignedTo: 'Lars Nilsson'
    },
    { 
      id: 4, 
      type: 'Environmental Permit',
      applicant: 'Sustainable Tech Solutions', 
      submittedDate: '2024-01-10',
      status: 'In Progress',
      priority: 'Low',
      assignedTo: 'Anna Larsson'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Under Review': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Pending Documentation': return 'bg-orange-100 text-orange-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved': return <FileCheck className="w-4 h-4" />;
      case 'Under Review': return <Clock className="w-4 h-4" />;
      case 'In Progress': return <Settings className="w-4 h-4" />;
      case 'Pending Documentation': return <AlertCircle className="w-4 h-4" />;
      case 'Rejected': return <AlertCircle className="w-4 h-4" />;
      default: return <FileCheck className="w-4 h-4" />;
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
              <Settings className="w-8 h-8 text-cyan-600" />
              <div>
                <h1 className="text-2xl font-bold text-slate-900">RTO & APC Management</h1>
                <p className="text-slate-600">Regulatory compliance and permit management</p>
              </div>
            </div>
            
            <button className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>New Application</span>
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6">
          {/* RTO/APC Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Active Applications</p>
                  <p className="text-2xl font-bold text-slate-900">23</p>
                </div>
                <Settings className="w-8 h-8 text-cyan-600" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Approved This Month</p>
                  <p className="text-2xl font-bold text-slate-900">12</p>
                </div>
                <FileCheck className="w-8 h-8 text-green-600" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Pending Review</p>
                  <p className="text-2xl font-bold text-slate-900">8</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Average Processing Time</p>
                  <p className="text-2xl font-bold text-slate-900">14 days</p>
                </div>
                <AlertCircle className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Applications Table */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">Recent Applications</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Application</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Applicant</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Priority</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Assigned To</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Submitted</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {applications.map((application) => (
                    <tr key={application.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Settings className="w-5 h-5 text-cyan-600 mr-3" />
                          <div>
                            <div className="font-medium text-slate-900">APP-{application.id.toString().padStart(4, '0')}</div>
                            <div className="text-sm text-slate-500">{application.type}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                        {application.applicant}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                        {application.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(application.priority)}`}>
                          {application.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(application.status)} flex items-center`}>
                            <span className="mr-1">{getStatusIcon(application.status)}</span>
                            {application.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                        {application.assignedTo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {new Date(application.submittedDate).toLocaleDateString()}
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

export default RTOAPCPage;