'use client';

import React from 'react';
import finixpaThemeConfig from '@/config/finixpaTheme';

const Services: React.FC = () => {
  const { services } = finixpaThemeConfig;

  // Generate responsive grid classes based on configuration
  const getGridClasses = () => {
    const { columns } = services.layout || { columns: { desktop: 4, tablet: 2, mobile: 1 } };
    const desktopCols = {
      1: 'lg:grid-cols-1',
      2: 'lg:grid-cols-2', 
      3: 'lg:grid-cols-3',
      4: 'lg:grid-cols-4',
      5: 'lg:grid-cols-5',
      6: 'lg:grid-cols-6'
    }[columns.desktop] || 'lg:grid-cols-4';

    const tabletCols = {
      1: 'md:grid-cols-1',
      2: 'md:grid-cols-2',
      3: 'md:grid-cols-3',
      4: 'md:grid-cols-4'
    }[columns.tablet] || 'md:grid-cols-2';

    const mobileCols = {
      1: 'grid-cols-1',
      2: 'grid-cols-2'
    }[columns.mobile] || 'grid-cols-1';

    return `grid ${desktopCols} ${tabletCols} ${mobileCols} ${services.layout?.gap || 'gap-6'}`;
  };

  return (
    <section className="py-20 bg-white" id="services">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-px bg-orange-500"></div>
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">
              {services.sectionTitle}
            </span>
            <div className="w-12 h-px bg-orange-500"></div>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            {services.title}
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {services.subtitle}
          </p>
        </div>

        {/* Services Grid - Responsive Layout from Configuration */}
        <div className={`${getGridClasses()} mb-12`}>
          {services.items.map((service, index) => (
            <div 
              key={service.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
            >
              {/* Service Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Icon */}
                <div className="absolute top-6 right-6 w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                  <i className={`${service.icon} text-white text-2xl`}></i>
                </div>
              </div>

              {/* Service Content */}
              <div className="p-8">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-orange-500 transition-colors duration-300">
                    {service.title}
                  </h3>
                  {service.subtitle && (
                    <span className="text-orange-500 font-semibold text-sm">
                      {service.subtitle}
                    </span>
                  )}
                </div>
                
                <p className="text-slate-600 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2 mb-6">
                  {service.features.slice(0, 3).map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-slate-600">
                      <span className="text-orange-500 mr-2 font-bold">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Learn More Button */}
                <a
                  href={service.link}
                  className="inline-flex items-center text-orange-500 font-semibold hover:text-orange-600 transition-colors duration-300 group/btn"
                >
                  Learn More →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View All Services Button */}
        <div className="text-center">
          <a
            href={services.viewAllLink}
            className="inline-flex items-center bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            {services.viewAllText} →
          </a>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-orange-500/5 to-transparent rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-tl from-blue-500/5 to-transparent rounded-full"></div>
      </div>
    </section>
  );
};

export default Services;
