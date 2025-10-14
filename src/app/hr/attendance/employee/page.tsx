// Individual Employee Attendance Dashboard Page
'use client';

import React from 'react';
import DashboardSidebar from '@/components/ui/DashboardSidebar';
import EmployeeDashboard from '@/components/attendance/EmployeeDashboard';

const EmployeeAttendancePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <DashboardSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <EmployeeDashboard employeeId="current" />
      </div>
    </div>
  );
};

export default EmployeeAttendancePage;