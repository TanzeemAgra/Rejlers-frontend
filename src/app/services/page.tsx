"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/ui";
import { Footer } from "@/components/ui";
import finixpaThemeConfig from "@/config/finixpaTheme";

const ServicesPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [filteredSectors, setFilteredSectors] = useState<any[]>([]);
  const { servicesPage } = finixpaThemeConfig;

  useEffect(() => {
    setIsVisible(true);
    setFilteredSectors(servicesPage.sectors.items);
  }, []);

  // Icon mapping for SVG icons
  const getIcon = (iconName: string, className: string = "w-8 h-8") => {
    const iconMap: { [key: string]: JSX.Element } = {
      'icofont-industries-4': (
        <svg className={`${className} text-current`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      'icofont-award': (
        <svg className={`${className} text-current`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      'icofont-chart-growth': (
        <svg className={`${className} text-current`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
        </svg>
      ),
      'icofont-globe': (
        <svg className={`${className} text-current`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
      ),
      'icofont-lightning-ray': (
        <svg className={`${className} text-current`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66L11.5 3H13v8h3.5c.49 0 .56.33.47.51L11 21z"/>
        </svg>
      ),
      'icofont-industries-2': (
        <svg className={`${className} text-current`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      'icofont-building': (
        <svg className={`${className} text-current`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
        </svg>
      ),
      'icofont-home': (
        <svg className={`${className} text-current`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
      ),
      'icofont-network-tower': (
        <svg className={`${className} text-current`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M7.4 14.3c-.5-.8-1.4-1.3-2.4-1.3s-1.9.5-2.4 1.3L1 16h2c0-1.1.9-2 2-2s2 .9 2 2h2l-1.6-1.7zm9.2 0c.5-.8 1.4-1.3 2.4-1.3s1.9.5 2.4 1.3L23 16h-2c0-1.1-.9-2-2-2s-2 .9-2 2h-2l1.6-1.7zM12 1L7 3v4.5l3-1.5v-2l2-.4 2 .4v2l3 1.5V3l-5-2zm0 8c-2.8 0-5 2.2-5 5h2c0-1.7 1.3-3 3-3s3 1.3 3 3h2c0-2.8-2.2-5-5-5z"/>
        </svg>
      ),
      'icofont-chart-line': (
        <svg className={`${className} text-current`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
        </svg>
      ),
      'icofont-architecture': (
        <svg className={`${className} text-current`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6z"/>
        </svg>
      ),
      'icofont-tasks': (
        <svg className={`${className} text-current`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
        </svg>
      ),
      'icofont-computer': (
        <svg className={`${className} text-current`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/>
        </svg>
      ),
      'icofont-eco-energy': (
        <svg className={`${className} text-current`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66C7.82 17.33 9.8 12.79 18 11c3-7 12-11 12-11s-4 9-13 8z"/>
        </svg>
      ),
      'icofont-phone': (
        <svg className={`${className} text-current`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
      ),
      'icofont-download': (
        <svg className={`${className} text-current`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
        </svg>
      )
    };
    return iconMap[iconName] || (
      <svg className={`${className} text-current`} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    );
  };

  const StatCard = ({ stat, index }: { stat: any; index: number }) => (
    <div className={`bg-white/10 backdrop-blur-md rounded-xl p-6 text-center transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: `${index * 100}ms` }}>
      <div className="flex justify-center mb-4">
        {getIcon(stat.icon, "w-8 h-8 text-white")}
      </div>
      <div className="text-2xl font-bold text-white mb-2">{stat.number}</div>
      <div className="text-blue-100 text-sm">{stat.label}</div>
    </div>
  );

  const SectorCard = ({ sector, index }: { sector: any; index: number }) => (
    <div 
      className={`group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-2 cursor-pointer ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'} ${selectedSector === sector.id ? 'ring-4 ring-blue-500' : ''}`} 
      style={{ transitionDelay: `${index * 150}ms` }}
      onClick={() => setSelectedSector(selectedSector === sector.id ? null : sector.id)}
    >
      <div className={`h-48 bg-gradient-to-br ${sector.color} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-6 left-6">
          {getIcon(sector.icon, "w-10 h-10 text-white")}
        </div>
        <div className="absolute bottom-6 left-6 right-6">
          <h3 className="text-xl font-bold text-white mb-2">{sector.title}</h3>
          <p className="text-white/90 text-sm line-clamp-2">{sector.subtitle}</p>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-600 mb-4 leading-relaxed">{sector.description}</p>
        
        {selectedSector === sector.id && (
          <div className="space-y-4 mt-6 border-t pt-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
              <div className="space-y-2">
                {sector.features.slice(0, 3).map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-start text-sm text-gray-700">
                    <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
            
            {sector.services && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Core Services:</h4>
                <div className="grid gap-2">
                  {sector.services.map((service: any, idx: number) => (
                    <div key={idx} className="bg-blue-50 rounded-lg p-3">
                      <h5 className="font-medium text-blue-900 text-sm">{service.name}</h5>
                      <p className="text-blue-700 text-xs mt-1">{service.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {sector.contact && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Contact Specialist:</h4>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">{sector.contact.name}</p>
                  <p className="text-gray-600 mb-2">{sector.contact.position}</p>
                  <div className="space-y-1">
                    <a href={`mailto:${sector.contact.email}`} className="flex items-center text-blue-600 hover:text-blue-700">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                      </svg>
                      {sector.contact.email}
                    </a>
                    <a href={`tel:${sector.contact.phone}`} className="flex items-center text-blue-600 hover:text-blue-700">
                      {getIcon('icofont-phone', 'w-4 h-4 mr-2')}
                      {sector.contact.phone}
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group-hover:translate-x-1 transition-transform duration-300">
            {selectedSector === sector.id ? 'Show Less' : 'Learn More'}
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={selectedSector === sector.id ? "M5 15l7-7 7 7" : "M9 5l7 7-7 7"} />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

  const CapabilityCard = ({ capability, index }: { capability: any; index: number }) => (
    <div className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transform transition-all duration-500 hover:-translate-y-1 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: `${index * 100}ms` }}>
      <div className="flex items-center mb-4">
        {getIcon(capability.icon, "w-8 h-8 text-blue-600")}
        <h3 className="text-lg font-semibold text-gray-900 ml-3">{capability.title}</h3>
      </div>
      <p className="text-gray-600 mb-4">{capability.description}</p>
      <div className="space-y-2">
        {capability.capabilities.map((cap: string, idx: number) => (
          <div key={idx} className="flex items-center text-sm text-gray-700">
            <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {cap}
          </div>
        ))}
      </div>
    </div>
  );

  const ProjectCard = ({ project, index }: { project: any; index: number }) => (
    <div className={`bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform transition-all duration-500 hover:-translate-y-1 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: `${index * 150}ms` }}>
      <div className="aspect-w-16 aspect-h-9">
        <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{project.category}</span>
          <span className="text-gray-500 text-sm">{project.date}</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">{project.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>
        <div className="flex flex-wrap gap-1 mb-4">
          {project.tags.map((tag: string, idx: number) => (
            <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">{tag}</span>
          ))}
        </div>
        <a href={project.link} className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
          Read More
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
          <div className="absolute top-32 right-16 w-24 h-24 border border-white/20 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 border border-white/20 rounded-full"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className={`text-3xl md:text-5xl font-bold mb-6 leading-tight transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              {servicesPage.hero.title}
            </h1>
            <p className={`text-xl text-blue-100 mb-8 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              {servicesPage.hero.subtitle}
            </p>
            <p className={`text-lg text-blue-200 mb-12 leading-relaxed transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              {servicesPage.hero.description}
            </p>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {servicesPage.hero.stats.map((stat: any, index: number) => (
                <StatCard key={index} stat={stat} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              {servicesPage.overview.title}
            </h2>
            <p className={`text-xl text-gray-600 mb-8 max-w-3xl mx-auto transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              {servicesPage.overview.subtitle}
            </p>
            <p className={`text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              {servicesPage.overview.description}
            </p>
            <div className={`mt-8 inline-block bg-blue-50 px-6 py-3 rounded-full transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <p className="text-blue-800 font-semibold">{servicesPage.overview.highlightText}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              {servicesPage.sectors.title}
            </h2>
            <p className={`text-xl text-gray-600 max-w-3xl mx-auto transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              {servicesPage.sectors.subtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {servicesPage.sectors.items.map((sector: any, index: number) => (
              <SectorCard key={sector.id} sector={sector} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              {servicesPage.capabilities.title}
            </h2>
            <p className={`text-xl text-gray-600 max-w-3xl mx-auto transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              {servicesPage.capabilities.subtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {servicesPage.capabilities.areas.map((capability: any, index: number) => (
              <CapabilityCard key={index} capability={capability} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Projects */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              {servicesPage.recentProjects.title}
            </h2>
            <p className={`text-xl text-gray-600 mb-8 max-w-3xl mx-auto transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              {servicesPage.recentProjects.subtitle}
            </p>
            <p className={`text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              {servicesPage.recentProjects.description}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {servicesPage.recentProjects.items.map((project: any, index: number) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              {servicesPage.clientTestimonials.title}
            </h2>
            <p className={`text-xl text-gray-600 max-w-3xl mx-auto transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              {servicesPage.clientTestimonials.subtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {servicesPage.clientTestimonials.items.map((testimonial: any, index: number) => (
              <div key={index} className={`bg-gray-50 rounded-xl p-8 transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: `${index * 200}ms` }}>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed italic">"{testimonial.testimonial}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.client}</p>
                  <p className="text-gray-600 text-sm">{testimonial.project}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              {servicesPage.callToAction.title}
            </h2>
            <p className={`text-xl text-blue-100 mb-8 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              {servicesPage.callToAction.subtitle}
            </p>
            <p className={`text-lg text-blue-200 mb-12 leading-relaxed transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              {servicesPage.callToAction.description}
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <a
                href={servicesPage.callToAction.primaryButton.href}
                className="inline-flex items-center px-8 py-4 bg-white text-blue-900 rounded-full font-semibold hover:bg-blue-50 shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                {getIcon(servicesPage.callToAction.primaryButton.icon, "w-5 h-5 mr-2")}
                {servicesPage.callToAction.primaryButton.text}
              </a>
              <a
                href={servicesPage.callToAction.secondaryButton.href}
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-blue-900 transition-all duration-300 transform hover:scale-105"
              >
                {getIcon(servicesPage.callToAction.secondaryButton.icon, "w-5 h-5 mr-2")}
                {servicesPage.callToAction.secondaryButton.text}
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer with Working Links */}
      <Footer />
    </div>
  );
};

export default ServicesPage;
