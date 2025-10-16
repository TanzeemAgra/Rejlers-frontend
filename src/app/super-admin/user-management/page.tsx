'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const UserManagementRedirect: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the dashboard route
    router.push('/dashboard/super-admin/user-management');
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <h3 className="text-lg font-semibold text-gray-900">Redirecting to Dashboard...</h3>
        <p className="text-gray-600">Taking you to the RBAC management system</p>
      </div>
    </div>
  );
};

export default UserManagementRedirect;