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
      <svg
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
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
                                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3 10c0-2.761 2.686-5 6-5 1.411 0 2.685.22 3.815.635a1 1 0 01-.63 1.897C11.284 7.22 10.17 7 9 7c-2.137 0-4 1.579-4 3s1.863 3 4 3c.383 0 .755-.025 1.118-.074a1 1 0 01.764 1.848c-.647.145-1.319.226-2.118.226-3.314 0-6-2.239-6-5zm8 0c0-2.761 2.686-5 6-5 1.411 0 2.685.22 3.815.635a1 1 0 01-.63 1.897C19.284 7.22 18.17 7 17 7c-2.137 0-4 1.579-4 3s1.863 3 4 3c.383 0 .755-.025 1.118-.074a1 1 0 01.764 1.848c-.647.145-1.319.226-2.118.226-3.314 0-6-2.239-6-5z" clipRule="evenodd" />
                                  </svg>
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
                  aria-label="Previous testimonials"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-slate-600 hover:text-orange-500 hover:shadow-xl transition-all duration-300 z-10"
                  aria-label="Next testimonials"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
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
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 10c0-2.761 2.686-5 6-5 1.411 0 2.685.22 3.815.635a1 1 0 01-.63 1.897C11.284 7.22 10.17 7 9 7c-2.137 0-4 1.579-4 3s1.863 3 4 3c.383 0 .755-.025 1.118-.074a1 1 0 01.764 1.848c-.647.145-1.319.226-2.118.226-3.314 0-6-2.239-6-5zm8 0c0-2.761 2.686-5 6-5 1.411 0 2.685.22 3.815.635a1 1 0 01-.63 1.897C19.284 7.22 18.17 7 17 7c-2.137 0-4 1.579-4 3s1.863 3 4 3c.383 0 .755-.025 1.118-.074a1 1 0 01.764 1.848c-.647.145-1.319.226-2.118.226-3.314 0-6-2.239-6-5z" clipRule="evenodd" />
                      </svg>
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