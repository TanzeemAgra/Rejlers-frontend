'use client';

import React from 'react';
import DashboardSidebar from '@/components/ui/DashboardSidebar';
import { Truck, Plus, Package, MapPin, Clock } from 'lucide-react';

const SupplyChainPage = () => {
  const shipments = [
    { 
      id: 1, 
      reference: 'SH-2024-001',
      supplier: 'Nordic Steel AB', 
      destination: 'Stockholm Warehouse',
      items: 'Steel Beams (24 units)', 
      status: 'In Transit',
      estimatedDelivery: '2024-01-18',
      trackingNumber: 'NS-789456123'
    },
    { 
      id: 2, 
      reference: 'SH-2024-002',
      supplier: 'SafeTech Equipment', 
      destination: 'Gothenburg Site',
      items: 'Safety Equipment Bundle', 
      status: 'Delivered',
      estimatedDelivery: '2024-01-15',
      trackingNumber: 'ST-456789012'
    },
    { 
      id: 3, 
      reference: 'SH-2024-003',
      supplier: 'ElectroMax Solutions', 
      destination: 'Malmö Office',
      items: 'Electrical Components (50 items)', 
      status: 'Processing',
      estimatedDelivery: '2024-01-22',
      trackingNumber: 'EM-123456789'
    },
    { 
      id: 4, 
      reference: 'SH-2024-004',
      supplier: 'Construction Supplies Co', 
      destination: 'Uppsala Project Site',
      items: 'Construction Materials', 
      status: 'Delayed',
      estimatedDelivery: '2024-01-20',
      trackingNumber: 'CS-987654321'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Delayed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered': return <Package className="w-4 h-4" />;
      case 'In Transit': return <Truck className="w-4 h-4" />;
      case 'Processing': return <Clock className="w-4 h-4" />;
      case 'Delayed': return <Clock className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
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
              <Truck className="w-8 h-8 text-orange-600" />
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Supply Chain Management</h1>
                <p className="text-slate-600">Track shipments, manage suppliers and inventory</p>
              </div>
            </div>
            
            <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>New Shipment</span>
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6">
          {/* Supply Chain Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Active Shipments</p>
                  <p className="text-2xl font-bold text-slate-900">18</p>
                </div>
                <Truck className="w-8 h-8 text-orange-600" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Suppliers</p>
                  <p className="text-2xl font-bold text-slate-900">45</p>
                </div>
                <Package className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Warehouse Locations</p>
                  <p className="text-2xl font-bold text-slate-900">8</p>
                </div>
                <MapPin className="w-8 h-8 text-green-600" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Pending Deliveries</p>
                  <p className="text-2xl font-bold text-slate-900">12</p>
                </div>
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Shipments Table */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">Recent Shipments</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Shipment</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Supplier</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Destination</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Items</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">ETA</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {shipments.map((shipment) => (
                    <tr key={shipment.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Truck className="w-5 h-5 text-orange-600 mr-3" />
                          <div>
                            <div className="font-medium text-slate-900">{shipment.reference}</div>
                            <div className="text-sm text-slate-500">{shipment.trackingNumber}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                        {shipment.supplier}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-slate-900">
                          <MapPin className="w-4 h-4 text-slate-400 mr-1" />
                          {shipment.destination}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                        {shipment.items}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(shipment.status)} flex items-center`}>
                            <span className="mr-1">{getStatusIcon(shipment.status)}</span>
                            {shipment.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {new Date(shipment.estimatedDelivery).toLocaleDateString()}
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

export default SupplyChainPage;