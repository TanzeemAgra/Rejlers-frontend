'use client';

import React from 'react';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import SystemHealthCheck from '@/components/debug/SystemHealthCheck';

const DebugPage: React.FC = () => {
  return (
    <ErrorBoundary>
      <SystemHealthCheck />
    </ErrorBoundary>
  );
};

export default DebugPage;