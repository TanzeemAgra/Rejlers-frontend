'use client';

import React, { useState, useEffect } from 'react';
import { useResponsive } from '@/lib/responsive';
import finixpaThemeConfig from '@/config/finixpaTheme';
// Direct SVG implementation - No external icon dependencies

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
  const { isMobile, isTablet, isDesktop } = useResponsive();

  // Get responsive configuration
  const getResponsiveConfig = () => {
    if (isMobile) return banner.responsive?.breakpoints?.mobile;
    if (isTablet) return banner.responsive?.breakpoints?.tablet;
    return banner.responsive?.breakpoints?.desktop;
  };

  const responsiveConfig = getResponsiveConfig();

  // Get responsive height
  const getResponsiveHeight = () => {
    if (isMobile) return banner.responsive?.heights?.mobile || '100vh';
    if (isTablet) return banner.responsive?.heights?.tablet || '90vh';
    return banner.responsive?.heights?.desktop || '100vh';
  };

  // Get responsive content positioning
  const getContentPosition = () => {
    if (isMobile) return banner.responsive?.contentPosition?.mobile || 'items-center justify-center min-h-screen pt-20 pb-10';
    if (isTablet) return banner.responsive?.contentPosition?.tablet || 'items-center justify-center min-h-screen pt-24 pb-12';
    return banner.responsive?.contentPosition?.desktop || 'items-center justify-center min-h-screen pt-0 pb-0';
  };

  // Auto-slide functionality
  useEffect(() => {
    if (!banner.autoPlay) return;
    
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, banner.autoPlayDelay || 6000);

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
    <section className="relative overflow-hidden w-full mobile-viewport-fix">
      {/* Mobile-Optimized Responsive Slider Container */}
      <div 
        className="all-slide banner-slide relative w-full mobile-performance"
        style={{ height: getResponsiveHeight() }}
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
              height: getResponsiveHeight()
            }}
          >
            {/* Background Image with Enhanced Overlay */}
            {slide.backgroundType === 'image' && slide.backgroundGradient && (
              <div 
                className="absolute inset-0 w-full h-full z-5"
                style={{ background: slide.backgroundGradient }}
              />
            )}

            {/* Background Pattern Overlay */}
            {slide.backgroundPattern && (
              <div className={`absolute inset-0 w-full h-full pattern-overlay pattern-${slide.backgroundPattern} opacity-10 z-6`} />
            )}

            {/* Enhanced Mobile-First Gradient Overlay */}
            <div className="slider-overlay absolute inset-0 w-full h-full z-10 bg-gradient-to-b from-black/40 via-black/20 to-black/40 sm:bg-gradient-to-r sm:from-black/20 sm:via-transparent sm:to-black/20" />

            {/* Mobile-First Responsive Content Container */}
            <div className={`slider-wrapper relative z-20 flex w-full h-full mobile-container safe-area-padding ${getContentPosition()}`}>
              <div className={`slider-text w-full max-w-4xl mx-auto mobile-text-optimize ${responsiveConfig?.textAlign || 'text-center'}`} style={{ padding: responsiveConfig?.padding || '20px 16px' }}>
                <div className="slider-caption space-y-4 sm:space-y-6 lg:space-y-8 mobile-animate-fadeIn">
                  {/* Mobile-First Subtitle */}
                  {slide.subtitle && (
                    <span className={`subtitle font-semibold uppercase tracking-wider block text-blue-200 ${
                      responsiveConfig?.subtitleSize || 'text-sm sm:text-lg md:text-xl lg:text-2xl'
                    }`}>
                      {slide.subtitle}
                    </span>
                  )}

                  {/* Fully Responsive Main Title */}
                  <h1 className={`text-white font-black uppercase leading-tight drop-shadow-2xl ${
                    responsiveConfig?.titleSize || 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl'
                  }`}>
                    {slide.title}
                  </h1>

                  {/* Mobile-Optimized Description */}
                  <p className={`text-gray-100 leading-relaxed mx-auto drop-shadow-lg max-w-full sm:max-w-3xl lg:max-w-4xl ${
                    responsiveConfig?.descriptionSize || 'text-sm sm:text-base md:text-lg lg:text-xl'
                  }`}>
                    {slide.description}
                  </p>

                  {/* Touch-Friendly Mobile-First Action Buttons */}
                  <div className={`mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 ${
                    responsiveConfig?.buttonLayout || ''
                  }`}>
                    {slide.buttons.map((button) => (
                      <a
                        key={button.id}
                        href={button.href}
                        className="inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 font-bold rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-sm sm:text-base bg-blue-600 hover:bg-blue-700 text-white border-2 border-blue-600 hover:border-blue-700"
                        style={{
                          backgroundColor: button.variant === 'filled' ? '#2563eb' : 'rgba(255, 255, 255, 0.1)',
                          color: button.variant === 'filled' ? 'white' : 'white',
                          borderColor: button.variant === 'filled' ? '#2563eb' : 'rgba(255, 255, 255, 0.8)'
                        }}
                      >
                        <i className={`${button.icon} mr-2 text-base sm:text-lg`}></i>
                        <span className="font-semibold">{button.text}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Professional SVG Navigation Arrows */}
      {banner.showArrows && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-orange-500 transition-all duration-300 group touch-manipulation p-3 sm:p-4 flex items-center justify-center shadow-lg hover:shadow-xl"
            aria-label="Previous slide"
            title="Previous Slide - SVG Arrow"
          >
            {/* DIRECT SVG - No Import Dependencies - Updated Oct 10, 2025 */}
            <svg 
              className="w-5 h-5 sm:w-6 sm:h-6 group-hover:text-white transition-colors" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-orange-500 transition-all duration-300 group touch-manipulation p-3 sm:p-4 flex items-center justify-center shadow-lg hover:shadow-xl"
            aria-label="Next slide"
            title="Next Slide - SVG Arrow"
          >
            {/* DIRECT SVG - No Import Dependencies - Updated Oct 10, 2025 */}
            <svg 
              className="w-5 h-5 sm:w-6 sm:h-6 group-hover:text-white transition-colors" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
            </svg>
          </button>
        </>
      )}

      {/* Mobile-Responsive Slide Indicators */}
      {banner.showDots && (
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2 sm:space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all duration-300 touch-manipulation ${
                index === currentSlide
                  ? 'bg-orange-500 w-6 sm:w-8 h-3 sm:h-3'
                  : 'bg-white/50 hover:bg-white/75 w-3 sm:w-3 h-3 sm:h-3'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Mobile-Optimized Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Responsive Floating Shapes */}
        <div className="absolute top-16 sm:top-20 left-4 sm:left-10 w-12 sm:w-16 lg:w-20 h-12 sm:h-16 lg:h-20 bg-orange-500/10 rounded-full animate-pulse" />
        <div 
          className="absolute top-32 sm:top-40 right-8 sm:right-20 w-10 sm:w-12 lg:w-16 h-10 sm:h-12 lg:h-16 bg-blue-500/10 rounded-full animate-bounce" 
          style={{animationDelay: '1s'}}
        />
        <div 
          className="absolute bottom-32 sm:bottom-40 left-1/4 w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 bg-purple-500/10 rounded-full animate-pulse" 
          style={{animationDelay: '2s'}}
        />
        
        {/* Responsive Geometric Lines - Hidden on small screens for cleaner mobile look */}
        <div className="hidden sm:block absolute top-1/3 right-4 lg:right-10 w-px h-24 lg:h-32 bg-gradient-to-b from-transparent via-orange-500/30 to-transparent" />
        <div className="hidden sm:block absolute bottom-1/3 left-4 lg:left-10 w-24 lg:w-32 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      </div>

      {/* Mobile-Responsive Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 z-20 text-white animate-bounce">
        <div className="flex flex-col items-center">
          <span className="text-xs sm:text-sm mb-1 sm:mb-2 opacity-75 hidden sm:block">Scroll</span>
          <span className="text-base sm:text-xl">⬇️</span>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;