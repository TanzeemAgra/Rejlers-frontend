'use client';

import React from 'react';
import finixpaThemeConfig from '@/config/finixpaTheme';

const WhyChooseUs: React.FC = () => {
  const { whyChooseUs } = finixpaThemeConfig;

  if (!whyChooseUs) {
    return null;
  }

  return (
    <section className={`py-20 relative overflow-hidden ${
      whyChooseUs.layout?.backgroundType === 'gradient' 
        ? 'bg-gradient-to-br from-slate-50 to-gray-100'
        : whyChooseUs.layout?.backgroundType === 'image'
        ? 'bg-cover bg-center bg-no-repeat'
        : 'bg-gray-50'
    }`} id="why-choose-us">
      {/* Background Image Overlay if using image background */}
      {whyChooseUs.layout?.backgroundType === 'image' && (
        <div className="absolute inset-0 bg-white/90 z-0"></div>
      )}

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

            {/* Features List */}
            <div className="space-y-6">
              {whyChooseUs.features?.map((feature) => (
                <div 
                  key={feature.id}
                  className="flex items-start space-x-4 group"
                >
                  {/* Icon */}
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <i className={`${feature.icon} text-white text-2xl`}></i>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <h3 className="text-xl font-semibold text-slate-900 mb-2 capitalize group-hover:text-orange-600 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
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