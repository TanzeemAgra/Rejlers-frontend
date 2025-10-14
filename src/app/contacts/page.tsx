'use client';

import React from 'react';
import DashboardSidebar from '@/components/ui/DashboardSidebar';
import { Users, Plus, Phone, Mail, MapPin, Building2 } from 'lucide-react';

const ContactsPage = () => {
  const contacts = [
    { 
      id: 1, 
      name: 'Anna Andersson',
      company: 'Green Energy Nordic', 
      position: 'Project Director',
      email: 'anna@greenenergynordic.se',
      phone: '+46 8 123 4567',
      location: 'Stockholm, Sweden',
      type: 'Client',
      lastContact: '2024-01-15'
    },
    { 
      id: 2, 
      name: 'Erik Johansson',
      company: 'Baltic Infrastructure Ltd', 
      position: 'Operations Manager',
      email: 'erik@balticinfra.com',
      phone: '+46 31 234 5678',
      location: 'Gothenburg, Sweden',
      type: 'Partner',
      lastContact: '2024-01-14'
    },
    { 
      id: 3, 
      name: 'Maria Larsson',
      company: 'SafeTech Equipment', 
      position: 'Sales Representative',
      email: 'maria@safetech.se',
      phone: '+46 40 345 6789',
      location: 'Malmö, Sweden',
      type: 'Supplier',
      lastContact: '2024-01-12'
    },
    { 
      id: 4, 
      name: 'Lars Nilsson',
      company: 'Industrial Manufacturing Co', 
      position: 'Procurement Manager',
      email: 'lars@industrialmc.com',
      phone: '+46 21 456 7890',
      location: 'Uppsala, Sweden',
      type: 'Client',
      lastContact: '2024-01-10'
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Client': return 'bg-green-100 text-green-800';
      case 'Partner': return 'bg-blue-100 text-blue-800';
      case 'Supplier': return 'bg-purple-100 text-purple-800';
      case 'Internal': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Client': return <Users className="w-4 h-4" />;
      case 'Partner': return <Building2 className="w-4 h-4" />;
      case 'Supplier': return <Building2 className="w-4 h-4" />;
      case 'Internal': return <Users className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
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
              <Users className="w-8 h-8 text-pink-600" />
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Contact Management</h1>
                <p className="text-slate-600">Manage clients, partners and supplier relationships</p>
              </div>
            </div>
            
            <button className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Contact</span>
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6">
          {/* Contacts Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Contacts</p>
                  <p className="text-2xl font-bold text-slate-900">284</p>
                </div>
                <Users className="w-8 h-8 text-pink-600" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Active Clients</p>
                  <p className="text-2xl font-bold text-slate-900">156</p>
                </div>
                <Building2 className="w-8 h-8 text-green-600" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Partners</p>
                  <p className="text-2xl font-bold text-slate-900">42</p>
                </div>
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Suppliers</p>
                  <p className="text-2xl font-bold text-slate-900">86</p>
                </div>
                <Building2 className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Contacts Table */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">Contact Directory</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Contact</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Company</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Contact Info</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Location</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Last Contact</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {contacts.map((contact) => (
                    <tr key={contact.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                            <span className="text-pink-600 font-medium text-sm">
                              {contact.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="ml-3">
                            <div className="font-medium text-slate-900">{contact.name}</div>
                            <div className="text-sm text-slate-500">{contact.position}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                        {contact.company}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        <div className="flex flex-col space-y-1">
                          <div className="flex items-center space-x-1">
                            <Mail className="w-3 h-3" />
                            <span>{contact.email}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Phone className="w-3 h-3" />
                            <span>{contact.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-slate-900">
                          <MapPin className="w-4 h-4 text-slate-400 mr-1" />
                          {contact.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(contact.type)} flex items-center`}>
                            <span className="mr-1">{getTypeIcon(contact.type)}</span>
                            {contact.type}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {new Date(contact.lastContact).toLocaleDateString()}
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

export default ContactsPage;