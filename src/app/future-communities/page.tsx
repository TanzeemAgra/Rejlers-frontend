"use client"

import React, { useState, useEffect, useRef } from "react";
import { Header } from "@/components/ui";
import { Footer } from "@/components/ui";
import finixpaTheme from "../../config/finixpaTheme";

interface AdvancedMetrics {
  energySavings: number;
  carbonReduction: number;
  efficiency: number;
  satisfaction: number;
}

export default function FutureCommunitiesPage() {
  const [activeVision, setActiveVision] = useState<string>("smart-energy");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [metrics, setMetrics] = useState<AdvancedMetrics>({
    energySavings: 0,
    carbonReduction: 0,
    efficiency: 0,
    satisfaction: 0
  });
  const [selectedDemo, setSelectedDemo] = useState<string>("energy-simulator");
  const [isSimulationActive, setIsSimulationActive] = useState<boolean>(false);

  const { futureCommunities } = finixpaTheme;
  const heroRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);

  // Advanced Animation Effects
  useEffect(() => {
    setIsVisible(true);
    
    // Animated Counter for Metrics
    const animateMetrics = () => {
      const targetMetrics = { energySavings: 85, carbonReduction: 90, efficiency: 95, satisfaction: 97 };
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        
        setMetrics({
          energySavings: Math.round(targetMetrics.energySavings * progress),
          carbonReduction: Math.round(targetMetrics.carbonReduction * progress),
          efficiency: Math.round(targetMetrics.efficiency * progress),
          satisfaction: Math.round(targetMetrics.satisfaction * progress)
        });

        if (step >= steps) {
          clearInterval(timer);
        }
      }, interval);
    };

    // Start animation after component mounts
    const timer = setTimeout(animateMetrics, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Intelligent Scroll-based Animations
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Parallax effect for hero
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${scrollY * 0.5}px)`;
      }

      // Vision area activation
      if (visionRef.current) {
        const visionTop = visionRef.current.offsetTop;
        if (scrollY + windowHeight > visionTop + 200) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Advanced Interactive Simulation
  const startSimulation = (demoId: string) => {
    setSelectedDemo(demoId);
    setIsSimulationActive(true);
    
    // Simulate real-time data updates
    const simulationTimer = setInterval(() => {
      setMetrics(prev => ({
        energySavings: Math.min(100, prev.energySavings + Math.random() * 2),
        carbonReduction: Math.min(100, prev.carbonReduction + Math.random() * 1.5),
        efficiency: Math.min(100, prev.efficiency + Math.random() * 1),
        satisfaction: Math.min(100, prev.satisfaction + Math.random() * 0.5)
      }));
    }, 1000);

    // Stop simulation after 10 seconds
    setTimeout(() => {
      setIsSimulationActive(false);
      clearInterval(simulationTimer);
    }, 10000);
  };

  return (
    <>
      <Header />
      
      {/* Advanced Hero Section with Video Background */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-950">
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        
        {/* Floating Animation Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/20 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-purple-400/30 rounded-full animate-bounce"></div>
          <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-green-400/25 rounded-full animate-ping"></div>
          <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-yellow-400/20 rounded-full animate-pulse"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              {futureCommunities.hero.title}
            </h1>
            <p className="text-2xl md:text-3xl font-light mb-6 text-blue-100">
              {futureCommunities.hero.subtitle}
            </p>
            <p className="text-lg md:text-xl max-w-4xl mx-auto mb-12 text-gray-300 leading-relaxed">
              {futureCommunities.hero.description}
            </p>
            
            {/* Advanced CTA Buttons */}
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <a 
                href={futureCommunities.hero.cta.primary.href}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                {futureCommunities.hero.cta.primary.text} →
              </a>
              <a 
                href={futureCommunities.hero.cta.secondary.href}
                className="border-2 border-white/30 hover:border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 backdrop-blur-sm"
              >
                {futureCommunities.hero.cta.secondary.text}
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Intelligent Vision Showcase */}
      <section ref={visionRef} id="vision-showcase" className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-800 mb-6">{futureCommunities.visionShowcase.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">{futureCommunities.visionShowcase.description}</p>
          </div>

          {/* Interactive Vision Areas */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Vision Selection */}
            <div className="space-y-4">
              {futureCommunities.visionShowcase.visionAreas.map((area) => (
                <div 
                  key={area.id}
                  onClick={() => setActiveVision(area.id)}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-500 transform hover:scale-105 ${
                    activeVision === area.id 
                      ? 'bg-gradient-to-r ' + area.color + ' text-white shadow-2xl' 
                      : 'bg-white hover:bg-gray-50 text-gray-800 shadow-lg hover:shadow-xl'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">{area.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{area.title}</h3>
                      <p className={`text-sm ${activeVision === area.id ? 'text-white/90' : 'text-gray-600'}`}>
                        {area.description}
                      </p>
                      {activeVision === area.id && (
                        <div className="mt-4 text-sm font-semibold bg-white/20 rounded-lg p-2">
                          Impact: {area.impact}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Active Vision Details */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              {futureCommunities.visionShowcase.visionAreas
                .filter(area => area.id === activeVision)
                .map(area => (
                  <div key={area.id} className="space-y-6">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className={`text-5xl p-4 rounded-2xl bg-gradient-to-r ${area.color}`}>
                        {area.icon}
                      </div>
                      <h3 className="text-3xl font-bold text-gray-800">{area.title}</h3>
                    </div>
                    
                    <p className="text-gray-600 text-lg leading-relaxed">{area.description}</p>
                    
                    <div className="border-t pt-6">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4">Key Technologies:</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {area.technologies.map((tech, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-gray-700">{tech}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Real-time Metrics Dashboard */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">Live Community Performance Metrics</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">{metrics.energySavings}%</div>
                <div className="text-gray-600">Energy Savings</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-green-600 h-2 rounded-full transition-all duration-500" style={{width: `${metrics.energySavings}%`}}></div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{metrics.carbonReduction}%</div>
                <div className="text-gray-600">Carbon Reduction</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-blue-600 h-2 rounded-full transition-all duration-500" style={{width: `${metrics.carbonReduction}%`}}></div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">{metrics.efficiency}%</div>
                <div className="text-gray-600">System Efficiency</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-purple-600 h-2 rounded-full transition-all duration-500" style={{width: `${metrics.efficiency}%`}}></div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">{metrics.satisfaction}%</div>
                <div className="text-gray-600">Resident Satisfaction</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-orange-600 h-2 rounded-full transition-all duration-500" style={{width: `${metrics.satisfaction}%`}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Technology Demos */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">{futureCommunities.technologyDemos.title}</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">{futureCommunities.technologyDemos.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {futureCommunities.technologyDemos.demos.map((demo) => (
              <div 
                key={demo.id}
                onClick={() => startSimulation(demo.id)}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  selectedDemo === demo.id 
                    ? 'bg-gradient-to-br from-blue-600 to-purple-600 shadow-2xl' 
                    : 'bg-gray-800 hover:bg-gray-700 shadow-lg'
                }`}
              >
                <h3 className="text-xl font-bold mb-3">{demo.title}</h3>
                <p className="text-gray-300 mb-4">{demo.description}</p>
                <div className="space-y-2">
                  {demo.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                {selectedDemo === demo.id && (
                  <div className="mt-4 p-3 bg-white/10 rounded-lg">
                    <div className="text-sm font-semibold">
                      {isSimulationActive ? '🟢 Simulation Active' : '⭕ Click to Start Demo'}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Innovation Labs Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-800 mb-6">{futureCommunities.innovationLabs.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{futureCommunities.innovationLabs.description}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {futureCommunities.innovationLabs.labs.map((lab, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{lab.name}</h3>
                  <div className="text-lg font-semibold text-blue-600 mb-4">{lab.focus}</div>
                  <p className="text-gray-600 leading-relaxed">{lab.description}</p>
                </div>
                
                <div className="border-t pt-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Key Projects:</h4>
                  <div className="space-y-2 mb-4">
                    {lab.keyProjects.map((project, pIdx) => (
                      <div key={pIdx} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-700">{project}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-gray-600 italic">{lab.leader}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-800 mb-6">{futureCommunities.caseStudies.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{futureCommunities.caseStudies.subtitle}</p>
          </div>

          <div className="space-y-16">
            {futureCommunities.caseStudies.projects.map((project, idx) => (
              <div key={idx} className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
                <div className="lg:w-1/2">
                  <div className="bg-white rounded-3xl p-8 shadow-2xl">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-3xl font-bold text-gray-800">{project.name}</h3>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {project.completionYear}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                      <div><strong>Location:</strong> {project.location}</div>
                      <div><strong>Population:</strong> {project.population}</div>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed mb-6">{project.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {Object.entries(project.results).map(([key, value]) => (
                        <div key={key} className="text-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                          <div className="text-2xl font-bold text-blue-600">{value}</div>
                          <div className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-4 italic">
                      <p className="text-gray-700">"{project.testimonial.quote}"</p>
                      <p className="text-gray-600 mt-2 font-semibold">— {project.testimonial.author}</p>
                    </div>
                  </div>
                </div>
                
                <div className="lg:w-1/2">
                  <div className="aspect-w-16 aspect-h-12 rounded-3xl overflow-hidden shadow-2xl">
                    <img 
                      src={project.image} 
                      alt={project.name}
                      className="w-full h-96 object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">{futureCommunities.callToAction.title}</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">{futureCommunities.callToAction.description}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {futureCommunities.callToAction.options.map((option, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <h3 className="text-2xl font-bold mb-4">{option.title}</h3>
                <p className="text-blue-100 mb-6">{option.description}</p>
                <a 
                  href={option.href}
                  className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition-all duration-300 inline-block"
                >
                  {option.buttonText}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
