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
                  <i className="icofont-phone mr-2"></i>
                  {callToAction.phone.text}
                </a>
              )}
            </div>
          </div>
        )}

        {/* Stats Section (if available) */}
        {callToAction.stats && callToAction.stats.length > 0 && (
          <div className="mt-16 pt-12 border-t border-white/20">
            <div className="grid md:grid-cols-3 gap-8">
              {callToAction.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className={`${stat.icon} text-white text-2xl`}></i>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {stat.title}
                  </h3>
                  <p className="text-white/80">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CallToAction;