'use client';

import React from 'react';
import finixpaThemeConfig from '@/config/finixpaTheme';

const CallToAction: React.FC = () => {
  const { callToAction } = finixpaThemeConfig;

  if (!callToAction) {
    return null;
  }

  return (
    <section 
      className={`py-16 relative overflow-hidden ${
        callToAction.backgroundType === 'gradient'
          ? 'bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600'
          : 'bg-slate-900'
      }`}
      style={callToAction.backgroundType === 'image' ? {
        backgroundImage: `url('${callToAction.backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      } : {}}
    >
      {/* Background Overlay */}
      {callToAction.backgroundType === 'image' && (
        <div className="absolute inset-0 bg-slate-900/80"></div>
      )}

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 -right-8 w-24 h-24 bg-white/5 rounded-full animate-bounce"></div>
        <div className="absolute bottom-4 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-ping"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {callToAction.layout === 'horizontal' ? (
          // Horizontal Layout
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 capitalize">
                {callToAction.title}
              </h2>
              {callToAction.subtitle && (
                <p className="text-xl text-white/90 mb-4">
                  {callToAction.subtitle}
                </p>
              )}
              {callToAction.description && (
                <p className="text-white/80 leading-relaxed max-w-2xl">
                  {callToAction.description}
                </p>
              )}
            </div>

            {/* Right Content - Button */}
            <div className="flex-shrink-0">
              <a
                href={callToAction.button?.href || '/contact'}
                className={`inline-flex items-center px-8 py-4 font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-xl hover:shadow-2xl ${
                  callToAction.button?.variant === 'secondary'
                    ? 'bg-white text-orange-600 hover:bg-gray-100'
                    : 'bg-white text-orange-600 hover:bg-gray-100'
                }`}
              >
                {callToAction.button?.text || 'Get Started'}
                {callToAction.button?.icon && (
                  <i className={`${callToAction.button.icon} ml-2 text-lg`}></i>
                )}
              </a>
            </div>
          </div>
        ) : (
          // Vertical Layout
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              {callToAction.title}
            </h2>
            {callToAction.subtitle && (
              <p className="text-xl text-white/90 mb-6">
                {callToAction.subtitle}
              </p>
            )}
            {callToAction.description && (
              <p className="text-lg text-white/80 leading-relaxed mb-10">
                {callToAction.description}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={callToAction.button?.href || '/contact'}
                className="inline-flex items-center px-8 py-4 bg-white text-orange-600 font-semibold rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:bg-gray-100"
              >
                {callToAction.button?.text || 'Get Started'}
                {callToAction.button?.icon && (
                  <i className={`${callToAction.button.icon} ml-2 text-lg`}></i>
                )}
              </a>

              {callToAction.phone?.show && (
                <a
                  href={callToAction.phone.href}
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-orange-600 transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Professional Phone Icon - Direct SVG */}
                  <svg 
                    className="w-5 h-5 mr-2" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/>
                  </svg>
                  {callToAction.phone.text}
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CallToAction;
