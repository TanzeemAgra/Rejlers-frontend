'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const RegistrationRedirect: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the main registration page
    router.replace('/register');
  }, [router]);

  // Show a loading state while redirecting
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-orange-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-slate-600">Redirecting to registration...</p>
      </div>
    </div>
  );
};

export default RegistrationRedirect;