'use client';

import React from 'react';
import UserManagement from '@/components/super-admin/UserManagement';

const UserManagementPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <UserManagement />
      </div>
    </div>
  );
};

export default UserManagementPage;
