'use client';

import React, { useState, useEffect, useRef } from 'react';
import finixpaThemeConfig from '@/config/finixpaTheme';

interface CounterProps {
  end: number;
  duration: number;
  suffix?: string;
}

const Counter: React.FC<CounterProps> = ({ end, duration, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime: number;
          
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            
            setCount(Math.floor(progress * end));
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <div ref={counterRef}>
      <span>{count}</span>
      {suffix}
    </div>
  );
};

const AboutUs: React.FC = () => {
  const { about } = finixpaThemeConfig;

  return (
    <section className="py-20 bg-gray-50" id="about">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Section Header */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-px bg-orange-500"></div>
                <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">
                  {about.subtitle}
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                {about.heading}
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {about.description}
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4">
              {about.features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mt-1 group-hover:bg-orange-600 transition-colors">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold text-slate-900 group-hover:text-orange-500 transition-colors">
                      {feature}
                    </h4>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <a
                href="/about"
                className="inline-flex items-center bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Learn More About Us →
              </a>
            </div>
          </div>

          {/* Right Content - Image & Stats */}
          <div className="relative">
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={about.image}
                alt="About Rejlers"
                className="w-full h-[600px] object-cover"
              />
              
              {/* Overlay Stats */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
              
              {/* Statistics Cards */}
              <div className="absolute bottom-8 left-8 right-8">
                <div className="grid grid-cols-2 gap-4">
                  {about.stats.map((stat, index) => (
                    <div 
                      key={index}
                      className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center border border-white/20"
                    >
                      <div className="text-3xl font-bold text-white mb-2">
                        {stat.number}
                      </div>
                      <div className="text-sm text-white/80 font-medium">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -top-6 -right-6 bg-orange-500 text-white rounded-full w-32 h-32 flex flex-col items-center justify-center shadow-xl">
              <div className="text-2xl font-bold">
                25+
              </div>
              <div className="text-xs text-center leading-tight">
                Years of<br/>Experience
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-blue-500/20 rounded-full animate-pulse"></div>
            <div className="absolute -top-4 left-1/3 w-16 h-16 bg-purple-500/20 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-orange-500/5 to-transparent rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-blue-500/5 to-transparent rounded-full"></div>
      </div>
    </section>
  );
};

export default AboutUs;