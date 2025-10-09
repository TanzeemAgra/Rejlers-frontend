'use client';

import React, { useState, useEffect } from 'react';
import finixpaThemeConfig from '@/config/finixpaTheme';

interface BannerSlide {
  id: number;
  backgroundType?: 'image' | 'gradient';
  backgroundImage?: string;
  backgroundGradient?: string;
  backgroundPattern?: 'geometric' | 'circuit' | 'hexagon' | 'dots' | 'waves';
  title: string;
  subtitle: string;
  description: string;
  buttons: Array<{
    id: string;
    text: string;
    icon: string;
    variant: 'outline' | 'filled';
    href: string;
  }>;
}

const HeroBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { banner } = finixpaThemeConfig;
  const slides = banner.slides as BannerSlide[];

  // Auto-slide functionality
  useEffect(() => {
    if (!banner.autoPlay) return;
    
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, banner.autoPlayDelay);

    return () => clearInterval(slideInterval);
  }, [slides.length, banner.autoPlay, banner.autoPlayDelay]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative overflow-hidden">
      {/* Slider Container - Fixed 750px height matching original template */}
      <div 
        className="all-slide banner-slide relative w-full" 
        style={{ 
          height: '750px'
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`single-slide absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105'
            }`}
            style={{
              backgroundImage: slide.backgroundType === 'image' && slide.backgroundImage 
                ? `url('${slide.backgroundImage}')` 
                : 'none',
              background: slide.backgroundType === 'gradient' ? slide.backgroundGradient : undefined,
              height: '750px'
            }}
          >
            {/* Background Image with Enhanced Overlay */}
            {slide.backgroundType === 'image' && slide.backgroundGradient && (
              <div 
                className="absolute inset-0 w-full h-full z-5"
                style={{
                  background: slide.backgroundGradient
                }}
              ></div>
            )}

            {/* Background Pattern Overlay */}
            {slide.backgroundPattern && (
              <div 
                className={`absolute inset-0 w-full h-full pattern-overlay pattern-${slide.backgroundPattern} opacity-10 z-6`}
              ></div>
            )}

            {/* Enhanced Gradient Overlay for better text readability */}
            <div className="slider-overlay absolute inset-0 w-full h-full top-0 z-10 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>

            {/* Content */}
            <div className="slider-wrapper relative z-20 flex items-center h-full mx-auto" style={{ width: '1370px', padding: '15px 15px' }}>
              <div className="slider-text w-full text-center" style={{ transform: 'translateY(-50%)', top: '50%' }}>
                <div className="slider-caption mx-auto text-center relative p-5" style={{ width: '900px' }}>
                  {/* Subtitle */}
                  {slide.subtitle && (
                    <span className="subtitle text-blue-200 text-xl md:text-2xl font-semibold uppercase tracking-wider mb-4 block">
                      {slide.subtitle}
                    </span>
                  )}

                  {/* Main Title - Enhanced for REJLERS */}
                  <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-tight mb-6 drop-shadow-2xl">
                    {slide.title}
                  </h1>

                  {/* Description - Better typography */}
                  <p className="text-gray-100 text-lg md:text-xl mb-8 leading-relaxed max-w-4xl mx-auto drop-shadow-lg">
                    {slide.description}
                  </p>

                  {/* Action Buttons - REJLERS Style */}
                  <ul className="mt-8 flex flex-wrap justify-center gap-4">
                    {slide.buttons.map((button) => (
                      <li key={button.id}>
                        <a
                          href={button.href}
                          className={`inline-flex items-center px-8 py-4 font-bold text-base rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                            button.variant === 'filled'
                              ? 'bg-blue-600 hover:bg-blue-700 text-white border-2 border-blue-600 hover:border-blue-700'
                              : 'bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-blue-600'
                          }`}
                        >
                          <i className={`${button.icon} mr-2 text-lg`}></i>
                          <span className="font-semibold">{button.text}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {banner.showArrows && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-orange-500 transition-all duration-300 group"
          >
            <i className="icofont-simple-left text-xl group-hover:text-white"></i>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-orange-500 transition-all duration-300 group"
          >
            <i className="icofont-simple-right text-xl group-hover:text-white"></i>
          </button>
        </>
      )}

      {/* Slide Indicators */}
      {banner.showDots && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-orange-500 w-8'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            ></button>
          ))}
        </div>
      )}

      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating Shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-orange-500/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-500/10 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-1/4 w-12 h-12 bg-purple-500/10 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Geometric Lines */}
        <div className="absolute top-1/3 right-10 w-px h-32 bg-gradient-to-b from-transparent via-orange-500/30 to-transparent"></div>
        <div className="absolute bottom-1/3 left-10 w-32 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-20 text-white animate-bounce">
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2 opacity-75">Scroll</span>
          <span className="text-xl">⬇️</span>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;