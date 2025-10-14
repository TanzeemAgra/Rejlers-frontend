'use client';

import React from 'react';
import DashboardSidebar from '@/components/ui/DashboardSidebar';
import { TrendingUp, Plus, Target, Users, Phone, Mail } from 'lucide-react';

const SalesPage = () => {
  const leads = [
    { 
      id: 1, 
      company: 'Green Energy Nordic',
      contact: 'Anna Andersson', 
      email: 'anna@greenenergynordic.se',
      phone: '+46 8 123 4567',
      value: 1200000, 
      status: 'Qualified',
      source: 'Website',
      lastContact: '2024-01-15'
    },
    { 
      id: 2, 
      company: 'Baltic Infrastructure Ltd',
      contact: 'Erik Johansson', 
      email: 'erik@balticinfra.com',
      phone: '+46 31 234 5678',
      value: 850000, 
      status: 'Proposal',
      source: 'Referral',
      lastContact: '2024-01-14'
    },
    { 
      id: 3, 
      company: 'Sustainable Tech Solutions',
      contact: 'Maria Larsson', 
      email: 'maria@sustaintech.se',
      phone: '+46 40 345 6789',
      value: 650000, 
      status: 'Negotiation',
      source: 'Cold Call',
      lastContact: '2024-01-12'
    },
    { 
      id: 4, 
      company: 'Industrial Manufacturing Co',
      contact: 'Lars Nilsson', 
      email: 'lars@industrialmc.com',
      phone: '+46 21 456 7890',
      value: 2100000, 
      status: 'New Lead',
      source: 'Trade Show',
      lastContact: '2024-01-10'
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New Lead': return 'bg-blue-100 text-blue-800';
      case 'Qualified': return 'bg-green-100 text-green-800';
      case 'Proposal': return 'bg-yellow-100 text-yellow-800';
      case 'Negotiation': return 'bg-purple-100 text-purple-800';
      case 'Closed Won': return 'bg-green-100 text-green-800';
      case 'Closed Lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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
              <TrendingUp className="w-8 h-8 text-indigo-600" />
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Sales Management</h1>
                <p className="text-slate-600">Track leads, opportunities and sales performance</p>
              </div>
            </div>
            
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>New Lead</span>
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6">
          {/* Sales Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Pipeline Value</p>
                  <p className="text-2xl font-bold text-slate-900">$4.8M</p>
                </div>
                <Target className="w-8 h-8 text-indigo-600" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Active Leads</p>
                  <p className="text-2xl font-bold text-slate-900">32</p>
                </div>
                <Users className="w-8 h-8 text-green-600" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Conversion Rate</p>
                  <p className="text-2xl font-bold text-slate-900">24%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Monthly Target</p>
                  <p className="text-2xl font-bold text-slate-900">$1.2M</p>
                </div>
                <Target className="w-8 h-8 text-orange-600" />
              </div>
            </div>
          </div>

          {/* Leads Table */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">Sales Pipeline</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Company</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Contact</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Value</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Source</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Last Contact</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                            <span className="text-indigo-600 font-medium text-sm">
                              {lead.company.split(' ').map(n => n[0]).join('').substring(0, 2)}
                            </span>
                          </div>
                          <div className="ml-3">
                            <div className="font-medium text-slate-900">{lead.company}</div>
                            <div className="text-sm text-slate-500">Lead #{lead.id.toString().padStart(3, '0')}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="font-medium text-slate-900">{lead.contact}</div>
                          <div className="text-sm text-slate-500 flex items-center space-x-3">
                            <div className="flex items-center space-x-1">
                              <Mail className="w-3 h-3" />
                              <span>{lead.email}</span>
                            </div>
                          </div>
                          <div className="text-sm text-slate-500 flex items-center space-x-1 mt-1">
                            <Phone className="w-3 h-3" />
                            <span>{lead.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                        {formatCurrency(lead.value)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(lead.status)}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                        {lead.source}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {new Date(lead.lastContact).toLocaleDateString()}
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

export default SalesPage;