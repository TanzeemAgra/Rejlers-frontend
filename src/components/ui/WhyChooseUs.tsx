'use client';

import React from 'react';
import finixpaThemeConfig from '@/config/finixpaTheme';

const WhyChooseUs: React.FC = () => {
  const { whyChooseUs } = finixpaThemeConfig;

  if (!whyChooseUs) {
    return null;
  }

  // Enhanced SVG icon renderer
  const renderIcon = (iconName: string, className: string = "w-8 h-8") => {
    const iconClass = `${className} text-current`;
    
    switch (iconName) {
      case 'rocket':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            <path d="M12 8.5c1.38 0 2.5-1.12 2.5-2.5S13.38 3.5 12 3.5 9.5 4.62 9.5 6s1.12 2.5 2.5 2.5z" opacity="0.6"/>
          </svg>
        );
      case 'trophy':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M7 4V2C7 1.45 7.45 1 8 1h8c.55 0 1 .45 1 1v2h4v5c0 2.76-2.24 5-5 5h-1.81c-.45 1.12-1.4 2.01-2.6 2.35V18h2c.55 0 1 .45 1 1s-.45 1-1 1H8c-.55 0-1-.45-1-1s.45-1 1-1h2v-2.65c-1.2-.34-2.15-1.23-2.6-2.35H6c-2.76 0-5-2.24-5-5V4h6z"/>
          </svg>
        );
      case 'support':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            <circle cx="12" cy="12" r="3" opacity="0.6"/>
          </svg>
        );
      case 'certificate':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
            <circle cx="12" cy="12" r="2" opacity="0.4"/>
          </svg>
        );
      default:
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        );
    }
  };

  // Get animation classes based on feature animation type
  const getAnimationClass = (animation: string) => {
    switch (animation) {
      case 'bounce':
        return 'animate-bounce';
      case 'pulse':
        return 'animate-pulse';
      case 'spin':
        return 'animate-spin-slow';
      case 'ping':
        return 'animate-ping';
      default:
        return '';
    }
  };

  // Get gradient classes
  const getGradientClass = (gradient: { from: string; to: string }) => {
    return `bg-gradient-to-br from-${gradient.from} to-${gradient.to}`;
  };

  return (
    <section className={`py-20 relative overflow-hidden ${
      whyChooseUs.layout?.backgroundType === 'gradient' 
        ? 'bg-gradient-to-br from-slate-50 via-white to-orange-50'
        : whyChooseUs.layout?.backgroundType === 'image'
        ? 'bg-cover bg-center bg-no-repeat'
        : 'bg-gray-50'
    }`} id="why-choose-us">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-orange-500/10 to-pink-500/10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-full animate-ping"></div>
      </div>

      {/* Background Image Overlay if using image background */}
      {whyChooseUs.layout?.backgroundType === 'image' && (
        <div className="absolute inset-0 bg-white/90 z-0"></div>
      )}

      {/* Custom CSS Styles */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content - Image or Statistics */}
          <div className="order-2 lg:order-1">
            {whyChooseUs.layout?.leftContent === 'image' ? (
              <div className="relative">
                <img 
                  src={whyChooseUs.image}
                  alt="Why Choose Us"
                  className="w-full h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                />
                {/* Decorative Elements */}
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-orange-500 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-500 rounded-full opacity-15 animate-bounce"></div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Our Achievements</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-500 mb-2">500+</div>
                    <div className="text-sm text-slate-600">Projects Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-500 mb-2">50+</div>
                    <div className="text-sm text-slate-600">Expert Team</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-500 mb-2">25+</div>
                    <div className="text-sm text-slate-600">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-500 mb-2">100%</div>
                    <div className="text-sm text-slate-600">Client Satisfaction</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Content - Features & Content */}
          <div className="order-1 lg:order-2">
            {/* Section Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-12 h-px bg-orange-500"></div>
                <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">
                  {whyChooseUs.sectionTitle}
                </span>
                <div className="w-12 h-px bg-orange-500"></div>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                {whyChooseUs.title}
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                {whyChooseUs.subtitle}
              </p>
              <p className="text-slate-600 leading-relaxed">
                {whyChooseUs.description}
              </p>
            </div>

            {/* Enhanced Features Grid */}
            <div className={`grid gap-8 ${whyChooseUs.design?.spacing === 'compact' ? 'gap-4' : whyChooseUs.design?.spacing === 'spacious' ? 'gap-12' : 'gap-8'}`}>
              {whyChooseUs.features?.map((feature, index) => (
                <div 
                  key={feature.id}
                  className={`relative group ${whyChooseUs.design?.cardStyle === 'floating' ? 'transform hover:-translate-y-2' : ''} transition-all duration-500`}
                  style={{
                    animationDelay: `${index * 150}ms`
                  }}
                >
                  {/* Highlight Badge */}
                  {feature.highlight && (
                    <div className="absolute -top-3 -right-3 z-10">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                        ⭐ FEATURED
                      </div>
                    </div>
                  )}

                  {/* Card Container */}
                  <div className={`
                    relative overflow-hidden rounded-2xl p-6 transition-all duration-300
                    ${whyChooseUs.design?.cardStyle === 'glass' ? 'backdrop-blur-md bg-white/10 border border-white/20' : ''}
                    ${whyChooseUs.design?.cardStyle === 'bordered' ? 'border-2 border-gray-200 bg-white' : ''}
                    ${whyChooseUs.design?.cardStyle === 'minimal' ? 'bg-transparent' : ''}
                    ${whyChooseUs.design?.cardStyle === 'floating' ? 'bg-white shadow-lg hover:shadow-2xl' : ''}
                    ${whyChooseUs.design?.hoverEffect === 'glow' ? 'hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]' : ''}
                    group-hover:scale-105
                  `}>
                    
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='0.1'%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
                      }} />
                    </div>

                    <div className="relative z-10 flex items-start space-x-6">
                      {/* Enhanced Icon */}
                      <div className="flex-shrink-0">
                        <div className={`
                          relative w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-300
                          ${getGradientClass(feature.gradient)}
                          ${whyChooseUs.design?.hoverEffect === 'rotate' ? 'group-hover:rotate-12' : ''}
                          group-hover:shadow-2xl group-hover:scale-110
                        `}>
                          {/* Icon Glow Effect */}
                          <div className={`absolute inset-0 rounded-2xl blur-xl opacity-30 ${getGradientClass(feature.gradient)}`}></div>
                          
                          {/* Animated Icon */}
                          <div className={`relative z-10 text-white ${feature.animation ? getAnimationClass(feature.animation) : ''}`}>
                            {renderIcon(feature.icon, "w-10 h-10")}
                          </div>

                          {/* Floating Particles */}
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full opacity-80 animate-ping"></div>
                          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white rounded-full opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
                        </div>
                      </div>
                      
                      {/* Enhanced Content */}
                      <div className="flex-1 pt-2">
                        <h3 className={`
                          text-xl font-bold mb-3 transition-all duration-300 leading-tight
                          ${feature.highlight ? 'text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-pink-600' : 'text-slate-900 group-hover:text-orange-600'}
                        `}>
                          {feature.title}
                        </h3>
                        
                        <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                          {feature.description}
                        </p>

                        {/* Progress Indicator for Highlighted Features */}
                        {feature.highlight && (
                          <div className="mt-4">
                            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                              <div 
                                className={`h-2 rounded-full ${getGradientClass(feature.gradient)} animate-pulse`}
                                style={{ width: '85%' }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Industry Leading Performance</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Hover Overlay Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action Button */}
            <div className="mt-10">
              <a
                href="/about"
                className="inline-flex items-center px-8 py-4 bg-orange-500 text-white font-semibold rounded-lg shadow-lg hover:bg-orange-600 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Learn More About Us →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
