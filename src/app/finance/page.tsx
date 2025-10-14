'use client';

import React from 'react';
import DashboardSidebar from '@/components/ui/DashboardSidebar';
import { DollarSign, Plus, TrendingUp, CreditCard, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const FinancePage = () => {
  const transactions = [
    { 
      id: 1, 
      type: 'Income', 
      description: 'Project Payment - Nordics Infrastructure',
      amount: 125000, 
      date: '2024-01-15',
      status: 'Completed',
      category: 'Project Revenue'
    },
    { 
      id: 2, 
      type: 'Expense', 
      description: 'Equipment Purchase - Safety Gear',
      amount: -15000, 
      date: '2024-01-14',
      status: 'Completed',
      category: 'Equipment'
    },
    { 
      id: 3, 
      type: 'Income', 
      description: 'Consulting Revenue - Energy Sector',
      amount: 75000, 
      date: '2024-01-12',
      status: 'Pending',
      category: 'Consulting'
    },
    { 
      id: 4, 
      type: 'Expense', 
      description: 'Office Rent - Stockholm HQ',
      amount: -18000, 
      date: '2024-01-10',
      status: 'Completed',
      category: 'Operations'
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
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'Income' ? 'text-green-600' : 'text-red-600';
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
              <DollarSign className="w-8 h-8 text-green-600" />
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Financial Management</h1>
                <p className="text-slate-600">Monitor financial performance and transactions</p>
              </div>
            </div>
            
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>New Transaction</span>
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6">
          {/* Financial Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-slate-900">$2.45M</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    +12.5% from last month
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Expenses</p>
                  <p className="text-2xl font-bold text-slate-900">$1.82M</p>
                  <p className="text-sm text-red-600 flex items-center mt-1">
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    +8.3% from last month
                  </p>
                </div>
                <CreditCard className="w-8 h-8 text-red-600" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Net Profit</p>
                  <p className="text-2xl font-bold text-slate-900">$630K</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    +18.2% from last month
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Cash Flow</p>
                  <p className="text-2xl font-bold text-slate-900">$1.15M</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    Positive trend
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">Recent Transactions</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Description</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Category</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Amount</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {transaction.type === 'Income' ? (
                            <ArrowUpRight className="w-4 h-4 text-green-600 mr-2" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4 text-red-600 mr-2" />
                          )}
                          <span className={`font-medium ${getTypeColor(transaction.type)}`}>
                            {transaction.type}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                        {transaction.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                        {transaction.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`font-medium ${getTypeColor(transaction.type)}`}>
                          {formatCurrency(Math.abs(transaction.amount))}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}>
                          {transaction.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {new Date(transaction.date).toLocaleDateString()}
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

export default FinancePage;