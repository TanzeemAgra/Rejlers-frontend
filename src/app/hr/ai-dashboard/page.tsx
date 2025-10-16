/**
 * HR AI Dashboard Page
 * ===================
 * 
 * Advanced Human Resource Management Dashboard with AI-powered insights
 * and dynamic soft-coded architecture for maximum flexibility.
 */

'use client';

import React from 'react';
import ComprehensiveHRAIDashboard from '@/components/hr/ComprehensiveHRAIDashboard';
import DashboardLayout from '@/components/layout/DashboardLayout';

const HRDashboardPage: React.FC = () => {
  return (
    <DashboardLayout currentModule="hr">
      <ComprehensiveHRAIDashboard />
    </DashboardLayout>
  );
};

export default HRDashboardPage;