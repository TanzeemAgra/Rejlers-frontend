'use client';

import React, { useEffect } from 'react';

const MockAuthSetup: React.FC = () => {
  useEffect(() => {
    // Set up mock user data in localStorage for testing
    const mockUser = {
      id: 1,
      email: 'admin@rejlers.com',
      first_name: 'System',
      last_name: 'Administrator',
      username: 'admin',
      is_active: true,
      is_staff: true,
      is_superuser: true,
      department: 'IT',
      position: 'System Administrator'
    };

    // Store user data in localStorage
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('token', 'mock-jwt-token-for-testing');
    localStorage.setItem('isAuthenticated', 'true');

    console.log('Mock authentication setup complete');
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-blue-100 border border-blue-300 rounded-lg p-3 text-sm">
      <div className="text-blue-800 font-medium">Dev Mode Active</div>
      <div className="text-blue-600">Mock authentication enabled</div>
    </div>
  );
};

export default MockAuthSetup;
