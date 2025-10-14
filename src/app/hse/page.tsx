'use client';

import React from 'react';
import DashboardSidebar from '@/components/ui/DashboardSidebar';
import { Shield, Plus, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const HSEPage = () => {
  const incidents = [
    { 
      id: 1, 
      title: 'Minor Equipment Malfunction',
      location: 'Stockholm Site A', 
      severity: 'Low',
      status: 'Resolved', 
      reportedBy: 'Erik Johansson',
      date: '2024-01-15',
      category: 'Equipment'
    },
    { 
      id: 2, 
      title: 'Safety Protocol Violation',
      location: 'Gothenburg Facility', 
      severity: 'Medium',
      status: 'Investigating', 
      reportedBy: 'Maria Andersson',
      date: '2024-01-14',
      category: 'Safety'
    },
    { 
      id: 3, 
      title: 'Near Miss - Falling Object',
      location: 'Malmö Construction Site', 
      severity: 'High',
      status: 'Under Review', 
      reportedBy: 'Lars Nilsson',
      date: '2024-01-12',
      category: 'Safety'
    },
    { 
      id: 4, 
      title: 'Environmental Spill',
      location: 'Uppsala Project', 
      severity: 'Medium',
      status: 'Action Required', 
      reportedBy: 'Anna Larsson',
      date: '2024-01-10',
      category: 'Environment'
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      case 'Critical': return 'bg-red-200 text-red-900';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Investigating': return 'bg-blue-100 text-blue-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Action Required': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Resolved': return <CheckCircle className="w-4 h-4" />;
      case 'Investigating': return <Clock className="w-4 h-4" />;
      case 'Under Review': return <Clock className="w-4 h-4" />;
      case 'Action Required': return <AlertTriangle className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
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
              <Shield className="w-8 h-8 text-emerald-600" />
              <div>
                <h1 className="text-2xl font-bold text-slate-900">HSE Compliance</h1>
                <p className="text-slate-600">Health, Safety & Environmental management</p>
              </div>
            </div>
            
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Report Incident</span>
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6">
          {/* HSE Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Safety Score</p>
                  <p className="text-2xl font-bold text-slate-900">94.5%</p>
                </div>
                <Shield className="w-8 h-8 text-emerald-600" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Open Incidents</p>
                  <p className="text-2xl font-bold text-slate-900">7</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Days Without Incident</p>
                  <p className="text-2xl font-bold text-slate-900">28</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Compliance Rate</p>
                  <p className="text-2xl font-bold text-slate-900">98.2%</p>
                </div>
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Incidents Table */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">Recent Incidents</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Incident</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Location</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Severity</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Reported By</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {incidents.map((incident) => (
                    <tr key={incident.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3" />
                          <div>
                            <div className="font-medium text-slate-900">{incident.title}</div>
                            <div className="text-sm text-slate-500">{incident.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                        {incident.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(incident.severity)}`}>
                          {incident.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(incident.status)} flex items-center`}>
                            <span className="mr-1">{getStatusIcon(incident.status)}</span>
                            {incident.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                        {incident.reportedBy}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {new Date(incident.date).toLocaleDateString()}
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

export default HSEPage;