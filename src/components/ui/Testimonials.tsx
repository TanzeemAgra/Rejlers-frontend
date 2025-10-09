'use client';

import React, { useState, useEffect } from 'react';
import finixpaThemeConfig from '@/config/finixpaTheme';

interface TestimonialItem {
  id: number;
  name: string;
  position: string;
  company: string;
  image: string;
  rating: number;
  content: string;
}

const Testimonials: React.FC = () => {
  const { testimonials } = finixpaThemeConfig;
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    if (!testimonials?.layout?.autoPlay || !testimonials.items) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const maxSlides = Math.ceil(testimonials.items.length / (testimonials.layout?.slidesToShow?.desktop || 3));
        return (prev + 1) % maxSlides;
      });
    }, testimonials.layout.autoPlayDelay || 5000);

    return () => clearInterval(interval);
  }, [testimonials]);

  if (!testimonials) {
    return null;
  }

  const slidesToShow = testimonials.layout?.slidesToShow?.desktop || 3;
  const maxSlides = Math.ceil(testimonials.items.length / slidesToShow);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % maxSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + maxSlides) % maxSlides);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <i
        key={index}
        className={`icofont-star ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      ></i>
    ));
  };

  const getCurrentTestimonials = () => {
    const startIndex = currentSlide * slidesToShow;
    return testimonials.items.slice(startIndex, startIndex + slidesToShow);
  };

  return (
    <section 
      className={`py-20 relative overflow-hidden ${
        testimonials.backgroundType === 'gradient'
          ? 'bg-gradient-to-br from-slate-50 to-gray-100'
          : testimonials.backgroundType === 'image'
          ? 'bg-cover bg-center bg-no-repeat'
          : 'bg-gray-50'
      }`}
      style={testimonials.backgroundType === 'image' ? {
        backgroundImage: `url('${testimonials.backgroundImage}')`
      } : {}}
      id="testimonials"
    >
      {/* Background Overlay for Image */}
      {testimonials.backgroundType === 'image' && (
        <div className="absolute inset-0 bg-white/90"></div>
      )}

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-8 -left-8 w-32 h-32 bg-orange-500/10 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 -right-12 w-24 h-24 bg-blue-500/10 rounded-full animate-bounce"></div>
        <div className="absolute bottom-8 left-1/4 w-16 h-16 bg-orange-500/10 rounded-full animate-ping"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            {testimonials.title}
          </h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-lg text-slate-600 max-w-4xl mx-auto leading-relaxed">
            {testimonials.description}
          </p>
        </div>

        {testimonials.layout?.type === 'carousel' ? (
          // Carousel Layout
          <div className="relative">
            {/* Testimonials Container */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(-${currentSlide * 100}%)`
                }}
              >
                {Array.from({ length: maxSlides }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 px-4">
                      {testimonials.items
                        .slice(slideIndex * slidesToShow, (slideIndex + 1) * slidesToShow)
                        .map((testimonial, index) => (
                          <div
                            key={testimonial.id}
                            className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
                            style={{
                              animationDelay: `${index * 200}ms`
                            }}
                          >
                            {/* Client Image and Info */}
                            <div className="flex items-center mb-6">
                              <div className="relative">
                                <img
                                  src={testimonial.image}
                                  alt={testimonial.name}
                                  className="w-16 h-16 rounded-full object-cover ring-4 ring-orange-100 group-hover:ring-orange-200 transition-all duration-300"
                                />
                                {/* Quote Icon */}
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                                  <i className="icofont-quote-left text-white text-sm"></i>
                                </div>
                              </div>
                              <div className="ml-4">
                                <h3 className="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors duration-300">
                                  <a href="#" className="hover:underline">
                                    {testimonial.name}
                                  </a>
                                </h3>
                                <p className="text-orange-500 font-semibold capitalize">
                                  {testimonial.position}
                                </p>
                                {testimonial.company && (
                                  <p className="text-sm text-slate-500">
                                    {testimonial.company}
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Testimonial Content */}
                            <div className="mb-6">
                              <p className="text-slate-600 leading-relaxed italic">
                                "{testimonial.content}"
                              </p>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center space-x-1">
                              {renderStars(testimonial.rating)}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            {testimonials.layout?.showArrows && maxSlides > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-slate-600 hover:text-orange-500 hover:shadow-xl transition-all duration-300 z-10"
                >
                  <i className="icofont-simple-left text-xl"></i>
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-slate-600 hover:text-orange-500 hover:shadow-xl transition-all duration-300 z-10"
                >
                  <i className="icofont-simple-right text-xl"></i>
                </button>
              </>
            )}

            {/* Dots Indicator */}
            {testimonials.layout?.showDots && maxSlides > 1 && (
              <div className="flex justify-center space-x-2 mt-12">
                {Array.from({ length: maxSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentSlide === index
                        ? 'bg-orange-500 w-8'
                        : 'bg-gray-300 hover:bg-orange-300'
                    }`}
                  ></button>
                ))}
              </div>
            )}
          </div>
        ) : (
          // Grid Layout
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {testimonials.items.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
                style={{
                  animationDelay: `${index * 200}ms`
                }}
              >
                {/* Client Image and Info */}
                <div className="flex items-center mb-6">
                  <div className="relative">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover ring-4 ring-orange-100 group-hover:ring-orange-200 transition-all duration-300"
                    />
                    {/* Quote Icon */}
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                      <i className="icofont-quote-left text-white text-sm"></i>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors duration-300">
                      <a href="#" className="hover:underline">
                        {testimonial.name}
                      </a>
                    </h3>
                    <p className="text-orange-500 font-semibold capitalize">
                      {testimonial.position}
                    </p>
                    {testimonial.company && (
                      <p className="text-sm text-slate-500">
                        {testimonial.company}
                      </p>
                    )}
                  </div>
                </div>

                {/* Testimonial Content */}
                <div className="mb-6">
                  <p className="text-slate-600 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1">
                  {renderStars(testimonial.rating)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;