import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found | REJLERS',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Error Code */}
        <div className="space-y-4">
          <h1 className="text-9xl font-bold text-indigo-600 mb-4">404</h1>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Page Not Found
            </h2>
            <p className="text-gray-600 text-lg">
              Sorry, we couldn't find the page you're looking for.
            </p>
          </div>
        </div>

        {/* Navigation Options */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              Go Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              Contact Support
            </Link>
          </div>
          
          {/* Additional Navigation */}
          <div className="text-sm text-gray-500 space-y-2">
            <p>Or try one of these popular pages:</p>
            <div className="flex flex-wrap justify-center gap-2">
              <Link href="/services" className="text-indigo-600 hover:text-indigo-800">
                Services
              </Link>
              <span className="text-gray-300">•</span>
              <Link href="/projects" className="text-indigo-600 hover:text-indigo-800">
                Projects
              </Link>
              <span className="text-gray-300">•</span>
              <Link href="/about" className="text-indigo-600 hover:text-indigo-800">
                About
              </Link>
              <span className="text-gray-300">•</span>
              <Link href="/login" className="text-indigo-600 hover:text-indigo-800">
                Login
              </Link>
            </div>
          </div>
        </div>

        {/* REJLERS Branding */}
        <div className="pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            © 2025 REJLERS AB - Engineering Excellence Since 1942
          </p>
        </div>
      </div>
    </div>
  );
}