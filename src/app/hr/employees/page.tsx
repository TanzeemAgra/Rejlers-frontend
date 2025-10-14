'use client';

import React from 'react';
import DashboardSidebar from '@/components/ui/DashboardSidebar';
import { Users, Plus, Building2, Calendar, Mail, Phone } from 'lucide-react';

const EmployeesPage = () => {
  const employees = [
    { 
      id: 1, 
      name: 'Sarah Johnson', 
      position: 'Senior Engineer', 
      department: 'Engineering', 
      email: 'sarah.johnson@rejlers.com', 
      phone: '+1 (555) 123-4567',
      status: 'Active',
      joinDate: '2023-01-15'
    },
    { 
      id: 2, 
      name: 'Michael Chen', 
      position: 'Project Manager', 
      department: 'Projects', 
      email: 'michael.chen@rejlers.com', 
      phone: '+1 (555) 234-5678',
      status: 'Active',
      joinDate: '2022-08-20'
    },
    { 
      id: 3, 
      name: 'Emily Rodriguez', 
      position: 'Safety Specialist', 
      department: 'HSE', 
      email: 'emily.rodriguez@rejlers.com', 
      phone: '+1 (555) 345-6789',
      status: 'Active',
      joinDate: '2023-03-10'
    },
    { 
      id: 4, 
      name: 'David Wilson', 
      position: 'Financial Analyst', 
      department: 'Finance', 
      email: 'david.wilson@rejlers.com', 
      phone: '+1 (555) 456-7890',
      status: 'On Leave',
      joinDate: '2021-11-05'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'On Leave': return 'bg-yellow-100 text-yellow-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
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
              <Users className="w-8 h-8 text-purple-600" />
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Employee Management</h1>
                <p className="text-slate-600">Manage employee records and HR operations</p>
              </div>
            </div>
            
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Employee</span>
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Employees</p>
                  <p className="text-2xl font-bold text-slate-900">89</p>
                </div>
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Active Employees</p>
                  <p className="text-2xl font-bold text-slate-900">84</p>
                </div>
                <Users className="w-8 h-8 text-green-600" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Departments</p>
                  <p className="text-2xl font-bold text-slate-900">12</p>
                </div>
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Pending Requests</p>
                  <p className="text-2xl font-bold text-slate-900">7</p>
                </div>
                <Calendar className="w-8 h-8 text-orange-600" />
              </div>
            </div>
          </div>

          {/* Employee Table */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">Employee Directory</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Employee</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Position</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Department</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Contact</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Join Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {employees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-purple-600 font-medium text-sm">
                              {employee.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="ml-3">
                            <div className="font-medium text-slate-900">{employee.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                        {employee.position}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                        {employee.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        <div className="flex flex-col space-y-1">
                          <div className="flex items-center space-x-1">
                            <Mail className="w-3 h-3" />
                            <span>{employee.email}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Phone className="w-3 h-3" />
                            <span>{employee.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(employee.status)}`}>
                          {employee.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {new Date(employee.joinDate).toLocaleDateString()}
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

export default EmployeesPage;