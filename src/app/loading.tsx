export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center space-y-8">
        {/* REJLERS Logo/Brand */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-indigo-900">REJLERS</h1>
          <p className="text-indigo-600 font-medium">Engineering Excellence Since 1942</p>
        </div>

        {/* Loading Animation */}
        <div className="space-y-6">
          {/* Spinner */}
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600"></div>
          </div>

          {/* Loading Text */}
          <div className="space-y-2">
            <p className="text-lg font-medium text-gray-900">Loading...</p>
            <p className="text-sm text-gray-600">Please wait while we prepare your experience</p>
          </div>

          {/* Progress Indicator */}
          <div className="w-64 mx-auto">
            <div className="bg-gray-200 rounded-full h-2">
              <div className="bg-indigo-600 h-2 rounded-full animate-pulse w-1/2"></div>
            </div>
          </div>
        </div>

        {/* Loading States */}
        <div className="text-xs text-gray-500 space-y-1">
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}