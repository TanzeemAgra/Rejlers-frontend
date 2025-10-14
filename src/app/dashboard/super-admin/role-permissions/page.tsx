'use client';

import React from 'react';
import RolePermissionManagement from '@/components/super-admin/RolePermissionManagement';

const RolePermissionPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <RolePermissionManagement />
      </div>
    </div>
  );
};

export default RolePermissionPage;