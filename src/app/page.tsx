'use client';

import React from 'react';
import { landingPageConfig } from '@/data/landingPageConfig';
import { Header } from '@/components/ui';
import HeroBanner from '@/components/ui/HeroBanner';
import AboutUs from '@/components/ui/AboutUs';
import Services from '@/components/ui/Services';
import WhyChooseUs from '@/components/ui/WhyChooseUs';
import CallToAction from '@/components/ui/CallToAction';
import ProjectGallery from '@/components/ui/ProjectGallery';
import Team from '@/components/ui/Team';
import Testimonials from '@/components/ui/Testimonials';
import Blog from '@/components/ui/Blog';
import { Footer } from '@/components/ui';

// Hero Section Component (Slider)
const HeroSection: React.FC = () => {
  const { hero } = landingPageConfig;
  
  return (
    <section className="slider relative min-h-screen">
      <div className="all-slide owl-item">
        {/* Slider Single Item */}
        <div 
          className="single-slide relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${hero.backgroundImage})` }}
        >
          {/* Slider Overlay */}
          <div className="slider-overlay absolute inset-0 bg-black bg-opacity-60"></div>
          
          {/* Slider Wrapper */}
          <div className="slider-wrapper relative z-10 w-full">
            <div className="slider-text text-center text-white px-6 max-w-4xl mx-auto">
              <div className="slider-caption">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-white">
                  We provide all Industrial & Factorial solutions
                </h1>
                <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
                  {hero.tagline}
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/about"
                    className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold transition-all duration-300 rounded"
                  >
                    Learn More →
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center px-8 py-4 bg-blue-600 border-2 border-blue-600 text-white hover:bg-blue-700 hover:border-blue-700 font-semibold transition-all duration-300 rounded"
                  >
                    Contact Us →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Services Section Component
const ServicesSection: React.FC = () => {
  const { services } = landingPageConfig;
  
  return (
    <section className="service-sec pt-20 pb-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Service Title Section */}
        <div className="row latest-project-title-sec mb-16">
          <div className="grid md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-4">
              <div className="latest-project-title">
                <span className="text-blue-600 font-semibold text-lg">Get Service</span>
                <h1 className="text-4xl font-bold text-gray-900 mt-2">{services.title}</h1>
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="latest-project-subtitle">
                <p className="text-gray-600 text-lg leading-relaxed">{services.subtitle}</p>
              </div>
            </div>
            <div className="md:col-span-3">
              <div className="latest-project-button text-right">
                <a 
                  href="/services" 
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                >
                  View All Services →
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Services Grid */}
        <div className="service-item">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.items.slice(0, 4).map((service) => (
              <div key={service.id} className="inner">
                <div className="media bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                  {/* Service Thumbnail */}
                  <div className="service-thumb relative h-48 overflow-hidden">
                    <a href={`/service/${service.id}`}>
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </a>
                    <div className="service-icon absolute inset-0 bg-black bg-opacity-40"></div>
                  </div>
                  
                  {/* Service Content */}
                  <div className="service-inner-text p-6">
                    <div className="media-left mb-4">
                      <div className="service_icon w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl">
                        {service.icon === 'oil-rig' && <span>🛢️</span>}
                        {service.icon === 'industry' && <span>🏭</span>}
                        {service.icon === 'pipeline' && <span>🔧</span>}
                        {service.icon === 'refinery' && <span>⚙️</span>}
                        {service.icon === 'maintenance' && <span>🔧</span>}
                        {service.icon === 'safety' && <span>🛡️</span>}
                      </div>
                    </div>
                    
                    <div className="media-body">
                      <h2 className="text-xl font-bold text-gray-900 mb-3">
                        <a href={`/service/${service.id}`} className="hover:text-blue-600 transition-colors">
                          {service.title}
                        </a>
                      </h2>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                        {service.description}
                      </p>
                      <a 
                        href={`/service/${service.id}`} 
                        className="service-readmore inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors"
                      >
                        Read More →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// About Section Component
const AboutSection: React.FC = () => {
  const { about } = landingPageConfig;
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">{about.title}</h2>
            <h3 className="text-xl text-blue-600 mb-4">{about.subtitle}</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">{about.description}</p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              {about.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                  <div className="text-gray-700">{stat.label}</div>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {about.features.map((feature, index) => (
                <div key={index} className="flex items-center text-gray-700">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {feature}
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <img 
              src={about.image as string} 
              alt="REJLERS professional team collaborating on industrial engineering projects" 
              className="w-full h-96 object-cover rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg">
              <div className="text-2xl font-bold">25+</div>
              <div className="text-sm">Years of Excellence</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Projects Section Component  
const ProjectsSection: React.FC = () => {
  const { projects } = landingPageConfig;
  
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{projects.title}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{projects.subtitle}</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.items.map((project) => (
            <div 
              key={project.id}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="h-64 bg-gray-300 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center">
                <div className="text-white text-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-blue-300 mb-2">{project.category}</p>
                  <p className="text-sm">{project.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Main Landing Page Component
export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main> {/* No padding needed as HeroBanner fills full height */}
        <HeroBanner />
        <AboutUs />
        <Services />
        <WhyChooseUs />
        <CallToAction />
        <ProjectGallery />
        <Team />
        <Testimonials />
        <Blog />
      </main>
      <Footer />
    </div>
  );
}
