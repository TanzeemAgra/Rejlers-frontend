'use client';

import React from 'react';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import AIDashboard from '@/components/super-admin/AIDashboard';

const AIDashboardPage: React.FC = () => {
  return (
    <ErrorBoundary>
      <div className="p-6 bg-gray-50 min-h-full">
        <AIDashboard />
      </div>
    </ErrorBoundary>
  );
};

export default AIDashboardPage;