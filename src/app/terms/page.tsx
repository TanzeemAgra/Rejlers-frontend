"use client"

import { useState, useEffect } from "react";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import finixpaTheme from "../../config/finixpaTheme";

interface ToSSection {
  id: string;
  title: string;
  icon: string;
  priority: "high" | "medium" | "low";
  readTime: string;
  keyPoints: string[];
}

export default function TermsOfServicePage() {
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [readProgress, setReadProgress] = useState<{ [key: string]: boolean }>({});
  const [showKeyHighlights, setShowKeyHighlights] = useState(false);
  const [acceptanceStatus, setAcceptanceStatus] = useState<"not-accepted" | "accepted" | "reviewing">("reviewing");
  const site = finixpaTheme.site;

  const sections: ToSSection[] = [
    { 
      id: "overview", 
      title: "Terms Overview", 
      icon: "📋", 
      priority: "high", 
      readTime: "2 min",
      keyPoints: ["Service agreement scope", "Legal framework", "Professional standards"]
    },
    { 
      id: "services", 
      title: "Engineering Services", 
      icon: "🔧", 
      priority: "high", 
      readTime: "3 min",
      keyPoints: ["Service deliverables", "Quality standards", "Project timelines"]
    },
    { 
      id: "client-obligations", 
      title: "Client Responsibilities", 
      icon: "🤝", 
      priority: "high", 
      readTime: "2 min",
      keyPoints: ["Information provision", "Site access", "Payment terms"]
    },
    { 
      id: "intellectual-property", 
      title: "Intellectual Property", 
      icon: "💡", 
      priority: "medium", 
      readTime: "3 min",
      keyPoints: ["IP ownership", "License rights", "Confidentiality"]
    },
    { 
      id: "liability-limitations", 
      title: "Liability & Insurance", 
      icon: "🛡️", 
      priority: "high", 
      readTime: "4 min",
      keyPoints: ["Professional liability", "Insurance coverage", "Limitation clauses"]
    },
    { 
      id: "payment-terms", 
      title: "Payment & Billing", 
      icon: "💰", 
      priority: "medium", 
      readTime: "2 min",
      keyPoints: ["Payment schedules", "Currency terms", "Late payment fees"]
    },
    { 
      id: "termination", 
      title: "Contract Termination", 
      icon: "⏹️", 
      priority: "medium", 
      readTime: "2 min",
      keyPoints: ["Termination conditions", "Notice periods", "Final deliverables"]
    },
    { 
      id: "compliance", 
      title: "Legal Compliance", 
      icon: "⚖️", 
      priority: "high", 
      readTime: "3 min",
      keyPoints: ["Regulatory compliance", "International laws", "Dispute resolution"]
    },
    { 
      id: "contact", 
      title: "Legal Contact", 
      icon: "📞", 
      priority: "low", 
      readTime: "1 min",
      keyPoints: ["Legal department", "Contract queries", "Dispute procedures"]
    }
  ];

  const lastUpdated = "October 2025";
  const effectiveDate = "November 1, 2025";

  // Track reading progress
  const markSectionAsRead = (sectionId: string) => {
    setReadProgress(prev => ({
      ...prev,
      [sectionId]: true
    }));
  };

  // Calculate reading completion
  const completionPercentage = Math.round((Object.keys(readProgress).length / sections.length) * 100);

  // Auto-scroll to active section
  useEffect(() => {
    if (activeSection) {
      markSectionAsRead(activeSection);
    }
  }, [activeSection]);

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        
        {/* Advanced Terms Header with Intelligence Features */}
      <div className="bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-400 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-purple-400 rounded-full animate-ping"></div>
        </div>
        
        <div className="container mx-auto px-4 py-16 relative">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 bg-blue-600/20 rounded-full text-blue-200 text-sm font-medium backdrop-blur-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></span>
                Legal Framework • Updated {lastUpdated}
              </span>
            </div>
            
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              Terms of Service
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Professional engineering consultancy agreement governing our services, responsibilities, and legal framework
            </p>
            
            {/* Smart Reading Progress */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-blue-200">Reading Progress</span>
                <span className="text-sm text-blue-200">{completionPercentage}% Complete</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between mt-3 text-xs text-blue-200">
                <span>📖 Estimated read time: 20 minutes</span>
                <span>⚖️ Legal compliance required</span>
              </div>
            </div>

            {/* Key Highlights Toggle */}
            <div className="mt-6">
              <button
                onClick={() => setShowKeyHighlights(!showKeyHighlights)}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-xl text-white font-medium transition-all duration-300 transform hover:scale-105"
              >
                {showKeyHighlights ? "Hide" : "Show"} Key Highlights
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Key Highlights Panel */}
      {showKeyHighlights && (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h3 className="text-2xl font-bold text-center mb-6">🎯 Key Contract Points</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <h4 className="font-semibold mb-3 flex items-center">
                    <span className="mr-2">🔧</span>Professional Engineering Services
                  </h4>
                  <ul className="text-sm space-y-1 text-blue-100">
                    <li>• ISO 9001:2015 certified quality</li>
                    <li>• 24/7 emergency support available</li>
                    <li>• International project compliance</li>
                  </ul>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <h4 className="font-semibold mb-3 flex items-center">
                    <span className="mr-2">🛡️</span>Professional Liability
                  </h4>
                  <ul className="text-sm space-y-1 text-blue-100">
                    <li>• €10M professional indemnity</li>
                    <li>• Comprehensive insurance coverage</li>
                    <li>• Risk management protocols</li>
                  </ul>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <h4 className="font-semibold mb-3 flex items-center">
                    <span className="mr-2">⚖️</span>Legal Framework
                  </h4>
                  <ul className="text-sm space-y-1 text-blue-100">
                    <li>• Swedish law jurisdiction</li>
                    <li>• International arbitration</li>
                    <li>• FIDIC contract compatibility</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content with Advanced Navigation */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Intelligent Navigation Sidebar */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-3xl shadow-2xl p-8 sticky top-8">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Smart Navigation</h3>
                  <div className="text-sm text-gray-600">
                    {Object.keys(readProgress).length} of {sections.length} sections completed
                  </div>
                </div>
                
                <nav className="space-y-3">
                  {sections.map((section) => (
                    <div key={section.id}>
                      <button
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                          activeSection === section.id
                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105"
                            : "text-gray-700 hover:bg-gray-100 border border-gray-200"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <span className="text-xl">{section.icon}</span>
                            <span className="font-medium text-sm">{section.title}</span>
                          </div>
                          {readProgress[section.id] && (
                            <span className={`text-xs ${activeSection === section.id ? 'text-green-200' : 'text-green-600'}`}>
                              ✓
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between text-xs">
                          <span className={`px-2 py-1 rounded-full border ${
                            activeSection === section.id 
                              ? 'bg-white/20 text-white border-white/30' 
                              : getPriorityColor(section.priority)
                          }`}>
                            {section.priority.toUpperCase()}
                          </span>
                          <span className={activeSection === section.id ? 'text-blue-200' : 'text-gray-500'}>
                            📖 {section.readTime}
                          </span>
                        </div>
                      </button>
                    </div>
                  ))}
                </nav>
                
                {/* Legal Contact Quick Access */}
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                  <h4 className="font-bold text-blue-900 mb-3 flex items-center">
                    <span className="mr-2">⚖️</span>Legal Questions?
                  </h4>
                  <p className="text-sm text-blue-700 mb-4">
                    For contract clarifications and legal inquiries
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-blue-600">
                      <span className="mr-2">📧</span>
                      <a href="mailto:legal@rejlers.com" className="hover:underline">legal@rejlers.com</a>
                    </div>
                    <div className="flex items-center text-blue-600">
                      <span className="mr-2">📞</span>
                      <span>+46 771 78 00 00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                
                {/* Overview Section */}
                {activeSection === "overview" && (
                  <div className="p-8">
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                          <span className="mr-3">📋</span>
                          Terms of Service Overview
                        </h2>
                        <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium border border-red-200">
                          HIGH PRIORITY
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mb-6">
                        Last Updated: {lastUpdated} • Effective: {effectiveDate} • Reading time: 2 minutes
                      </div>
                    </div>
                    
                    <div className="prose prose-lg max-w-none">
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6 mb-8">
                        <h3 className="text-xl font-semibold text-blue-900 mb-3">Professional Engineering Services Agreement</h3>
                        <p className="text-blue-800 mb-4">
                          These Terms of Service ("Agreement") govern the provision of engineering consultancy services by REJLERS AB and its subsidiaries ("REJLERS", "we", "us") to clients ("Client", "you") for professional engineering projects and consultancy services.
                        </p>
                        <div className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                          ⚡ This is a legally binding agreement. Please read carefully before engaging our services.
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                          <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                            <span className="mr-2">🏢</span>Service Provider
                          </h4>
                          <div className="text-sm text-gray-600 space-y-2">
                            <div><strong>Company:</strong> REJLERS AB</div>
                            <div><strong>Registration:</strong> 556349-8426</div>
                            <div><strong>Address:</strong> Box 30233, SE-104 25 Stockholm, Sweden</div>
                            <div><strong>Phone:</strong> +46 771 78 00 00</div>
                            <div><strong>Email:</strong> info@rejlers.com</div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                          <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                            <span className="mr-2">🌍</span>Global Operations
                          </h4>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div>• Sweden (Headquarters)</div>
                            <div>• UAE (Abu Dhabi Regional Office)</div>
                            <div>• Norway & Finland (Nordic Operations)</div>
                            <div>• India (Navi Mumbai Technical Center)</div>
                          </div>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-800 mb-4">Agreement Scope</h3>
                      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                              <span className="text-white text-2xl">🔧</span>
                            </div>
                            <h5 className="font-medium text-gray-800 mb-2">Engineering Services</h5>
                            <p className="text-sm text-gray-600">Professional consulting, design, and technical services</p>
                          </div>
                          <div className="text-center">
                            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                              <span className="text-white text-2xl">📊</span>
                            </div>
                            <h5 className="font-medium text-gray-800 mb-2">Project Management</h5>
                            <p className="text-sm text-gray-600">End-to-end project delivery and management services</p>
                          </div>
                          <div className="text-center">
                            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                              <span className="text-white text-2xl">🛡️</span>
                            </div>
                            <h5 className="font-medium text-gray-800 mb-2">Quality Assurance</h5>
                            <p className="text-sm text-gray-600">ISO 9001:2015 certified quality management</p>
                          </div>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Legal Principles</h3>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-green-600 mr-3 mt-1">✓</span>
                          <div>
                            <strong>Professional Standards:</strong> All services comply with applicable engineering codes, standards, and best practices including API, ASME, DNV, and local regulations.
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 mr-3 mt-1">✓</span>
                          <div>
                            <strong>Quality Assurance:</strong> ISO 9001:2015 certified processes ensure consistent service quality and client satisfaction.
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 mr-3 mt-1">✓</span>
                          <div>
                            <strong>Professional Liability:</strong> Comprehensive professional indemnity insurance covering €10M for client protection.
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 mr-3 mt-1">✓</span>
                          <div>
                            <strong>Intellectual Property:</strong> Clear ownership and licensing terms for all project deliverables and technical documentation.
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Engineering Services Section */}
                {activeSection === "services" && (
                  <div className="p-8">
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                          <span className="mr-3">🔧</span>
                          Engineering Services
                        </h2>
                        <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium border border-red-200">
                          HIGH PRIORITY
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-8">
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6">
                        <h3 className="text-xl font-semibold text-blue-900 mb-3">Service Categories</h3>
                        <p className="text-blue-800">
                          REJLERS provides comprehensive engineering consultancy services across six core sectors with international expertise and local knowledge.
                        </p>
                      </div>

                      <div className="grid gap-6">
                        {[
                          {
                            category: "Energy & Power Systems",
                            icon: "⚡",
                            color: "from-orange-500 to-red-600",
                            services: [
                              "Oil & Gas Engineering (Upstream, Midstream, Downstream)",
                              "Renewable Energy Systems (Solar, Wind, Hydroelectric)",
                              "Power Plant Design and Optimization",
                              "Energy Storage and Grid Integration",
                              "Pipeline and Infrastructure Engineering"
                            ]
                          },
                          {
                            category: "Industrial Engineering",
                            icon: "🏭",
                            color: "from-blue-500 to-indigo-600",
                            services: [
                              "Process Engineering and Optimization",
                              "Industrial Automation and Control Systems",
                              "Manufacturing and Production Engineering",
                              "Quality Management Systems",
                              "Environmental and Safety Engineering"
                            ]
                          },
                          {
                            category: "Infrastructure & Environment",
                            icon: "🌍",
                            color: "from-green-500 to-emerald-600",
                            services: [
                              "Civil and Structural Engineering",
                              "Water and Wastewater Treatment",
                              "Environmental Impact Assessment",
                              "Sustainability and Climate Solutions",
                              "Transportation Infrastructure"
                            ]
                          }
                        ].map((sector, index) => (
                          <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                            <div className="flex items-center mb-4">
                              <div className={`w-12 h-12 bg-gradient-to-r ${sector.color} rounded-xl flex items-center justify-center mr-4`}>
                                <span className="text-white text-xl">{sector.icon}</span>
                              </div>
                              <h4 className="text-lg font-semibold text-gray-800">{sector.category}</h4>
                            </div>
                            <ul className="space-y-2">
                              {sector.services.map((service, serviceIndex) => (
                                <li key={serviceIndex} className="flex items-start text-sm text-gray-600">
                                  <span className="text-green-500 mr-2 mt-1">•</span>
                                  {service}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                        <h4 className="font-semibold text-yellow-900 mb-3 flex items-center">
                          <span className="mr-2">⚠️</span>Service Standards & Compliance
                        </h4>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-yellow-800">
                          <div>
                            <h5 className="font-medium mb-2">Quality Standards</h5>
                            <ul className="space-y-1">
                              <li>• ISO 9001:2015 Quality Management</li>
                              <li>• ISO 14001:2015 Environmental Management</li>
                              <li>• OHSAS 18001 Safety Standards</li>
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium mb-2">Technical Codes</h5>
                            <ul className="space-y-1">
                              <li>• API Standards (Oil & Gas)</li>
                              <li>• ASME Codes (Pressure Vessels)</li>
                              <li>• DNV Standards (Offshore)</li>
                              <li>• IEC Standards (Electrical)</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Continue with other sections... */}
                {activeSection === "liability-limitations" && (
                  <div className="p-8">
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                          <span className="mr-3">🛡️</span>
                          Liability & Insurance
                        </h2>
                        <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium border border-red-200">
                          HIGH PRIORITY
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-8">
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6">
                        <h3 className="text-xl font-semibold text-green-900 mb-3">Professional Protection</h3>
                        <p className="text-green-800">
                          REJLERS maintains comprehensive professional indemnity insurance and follows industry-standard liability frameworks to protect both our clients and our professional interests.
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="border border-gray-200 rounded-xl p-6">
                          <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                            <span className="mr-2">🛡️</span>Insurance Coverage
                          </h4>
                          <div className="space-y-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                              <h5 className="font-medium text-blue-900 mb-2">Professional Indemnity</h5>
                              <p className="text-blue-800 text-sm">€10,000,000 per claim coverage for professional negligence and errors & omissions</p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                              <h5 className="font-medium text-green-900 mb-2">General Liability</h5>
                              <p className="text-green-800 text-sm">€5,000,000 coverage for third-party injury and property damage</p>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-lg">
                              <h5 className="font-medium text-purple-900 mb-2">Cyber Liability</h5>
                              <p className="text-purple-800 text-sm">€2,000,000 coverage for data breaches and cyber incidents</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border border-gray-200 rounded-xl p-6">
                          <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                            <span className="mr-2">⚖️</span>Liability Limitations
                          </h4>
                          <div className="space-y-4 text-sm text-gray-600">
                            <div>
                              <h5 className="font-medium text-gray-800 mb-1">Standard of Care</h5>
                              <p>Services performed with reasonable skill and care expected of competent engineering professionals</p>
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-800 mb-1">Consequential Damages</h5>
                              <p>Liability limited to direct damages; excludes indirect, consequential, or punitive damages</p>
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-800 mb-1">Total Liability Cap</h5>
                              <p>Maximum liability limited to project fees paid or insurance coverage, whichever is greater</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                        <h4 className="font-semibold text-red-900 mb-3 flex items-center">
                          <span className="mr-2">⚠️</span>Important Liability Exclusions
                        </h4>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-red-800">
                          <div>
                            <h5 className="font-medium mb-2">Client Responsibilities</h5>
                            <ul className="space-y-1">
                              <li>• Accuracy of provided information</li>
                              <li>• Site conditions and access</li>
                              <li>• Regulatory approvals and permits</li>
                              <li>• Third-party contractor performance</li>
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium mb-2">Force Majeure Events</h5>
                            <ul className="space-y-1">
                              <li>• Natural disasters and extreme weather</li>
                              <li>• Government actions and regulations</li>
                              <li>• Labor strikes and material shortages</li>
                              <li>• Pandemic and health emergencies</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Legal Contact Section */}
                {activeSection === "contact" && (
                  <div className="p-8">
                    <div className="mb-6">
                      <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                        <span className="mr-3">📞</span>
                        Legal Contact Information
                      </h2>
                    </div>
                    
                    <div className="space-y-8">
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6">
                        <h3 className="text-xl font-semibold text-blue-900 mb-3">Legal Department</h3>
                        <p className="text-blue-800">
                          For all contract-related questions, legal clarifications, and dispute resolution matters, please contact our legal department.
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                          <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                            <span className="mr-2">⚖️</span>Legal Department
                          </h4>
                          <div className="space-y-3 text-sm">
                            <div className="flex items-center">
                              <span className="text-blue-600 mr-3">📧</span>
                              <div>
                                <strong>Email:</strong>
                                <a href="mailto:legal@rejlers.com" className="text-blue-600 hover:underline ml-2">
                                  legal@rejlers.com
                                </a>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <span className="text-blue-600 mr-3">📞</span>
                              <div><strong>Phone:</strong> +46 771 78 00 00</div>
                            </div>
                            <div className="flex items-center">
                              <span className="text-blue-600 mr-3">🕒</span>
                              <div><strong>Hours:</strong> Mon-Fri 08:00-17:00 CET</div>
                            </div>
                            <div className="flex items-start">
                              <span className="text-blue-600 mr-3 mt-1">📍</span>
                              <div>
                                <strong>Address:</strong><br/>
                                REJLERS AB Legal Department<br/>
                                Box 30233<br/>
                                SE-104 25 Stockholm, Sweden
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                          <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                            <span className="mr-2">🏛️</span>Dispute Resolution
                          </h4>
                          <div className="space-y-4 text-sm text-gray-600">
                            <div>
                              <h5 className="font-medium text-gray-800 mb-1">Primary Jurisdiction</h5>
                              <p>Stockholm District Court, Sweden</p>
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-800 mb-1">International Arbitration</h5>
                              <p>Arbitration Institute of the Stockholm Chamber of Commerce (SCC)</p>
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-800 mb-1">Applicable Law</h5>
                              <p>Swedish law, unless otherwise specified in project agreements</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-6">
                        <h4 className="font-semibold text-gray-800 mb-4">Contract Modifications & Updates</h4>
                        <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
                          <div>
                            <h5 className="font-medium text-gray-800 mb-2">Amendment Process</h5>
                            <ul className="space-y-1">
                              <li>• Written agreement required for all changes</li>
                              <li>• Authorized signatory approval mandatory</li>
                              <li>• Legal review for significant modifications</li>
                              <li>• Client notification within 30 days</li>
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-800 mb-2">Update Notifications</h5>
                            <ul className="space-y-1">
                              <li>• Email notifications to registered contacts</li>
                              <li>• Website publication with effective dates</li>
                              <li>• Grace period for existing contracts</li>
                              <li>• Legal consultation available upon request</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Smart Acceptance Footer */}
      <div className="bg-gradient-to-r from-slate-800 to-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Terms Acceptance Status</h3>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="flex items-center justify-center space-x-8 mb-4">
                <div className="text-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2 ${
                    completionPercentage === 100 ? 'bg-green-600' : 'bg-gray-600'
                  }`}>
                    <span className="text-2xl">{completionPercentage === 100 ? '✓' : '📖'}</span>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">Reading Complete</div>
                    <div className="text-gray-300">{completionPercentage}%</div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2 ${
                    acceptanceStatus === 'accepted' ? 'bg-green-600' : 'bg-gray-600'
                  }`}>
                    <span className="text-2xl">{acceptanceStatus === 'accepted' ? '✓' : '⚖️'}</span>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">Legal Acceptance</div>
                    <div className="text-gray-300">{acceptanceStatus === 'accepted' ? 'Accepted' : 'Pending'}</div>
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-gray-300 mb-6">
                By engaging REJLERS services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </div>
              
              <div className="text-xs text-gray-400">
                Last updated: {lastUpdated} • Effective: {effectiveDate} • Version 2025.1
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    {/* Footer with Working Links */}
    <Footer />
    </>
  );
}