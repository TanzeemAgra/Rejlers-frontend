'use client';

import React, { useState } from 'react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import finixpaThemeConfig from '@/config/finixpaTheme';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    projectType: '',
    department: '',
    message: '',
    urgency: 'medium',
    consent: false
  });

  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const { contact, site, offices, emergencySupport } = finixpaThemeConfig;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Sync department selection
    if (name === 'department') {
      setSelectedDepartment(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        service: '',
        projectType: '',
        department: '',
        message: '',
        urgency: 'medium',
        consent: false
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Use soft-coded office locations from theme configuration
  const officeLocations = offices || [];

  const serviceAreas = [
    "Process Engineering",
    "Pipeline Design",
    "Offshore Engineering",
    "Safety & Risk Assessment",
    "Environmental Compliance",
    "Project Management",
    "Digital Twin Solutions",
    "Asset Integrity Management"
  ];

  const projectTypes = [
    "Upstream (Exploration & Production)",
    "Midstream (Transportation & Storage)",
    "Downstream (Refining & Petrochemicals)",
    "LNG & Gas Processing",
    "Renewable Energy Integration",
    "Decommissioning",
    "Other"
  ];

  const departments = [
    {
      id: "business-development",
      name: "Sales & Business Development",
      description: "New projects, partnerships, and business opportunities",
      head: "Anam Abbas",
      title: "Vice President, Head of Sales & Business Development",
      email: "sales@rejlers.com",
      phone: "+46 771 78 00 00",
      specialties: ["New Client Acquisition", "Strategic Partnerships", "Market Development", "Proposal Management"]
    },
    {
      id: "project-delivery",
      name: "Operations & Project Delivery",
      description: "Ongoing projects, technical queries, and delivery management",
      head: "Mohamad El-Ghawanmeh", 
      title: "Vice President, Head of Operations & Project Delivery",
      email: "projects@rejlers.com",
      phone: "+46 771 78 00 00",
      specialties: ["Project Management", "Technical Delivery", "Quality Assurance", "Client Relations"]
    },
    {
      id: "engineering",
      name: "Engineering & Technical Services",
      description: "Technical consultations, engineering solutions, and design services",
      head: "Dr. Lars Eriksson",
      title: "Chief Technology Officer & VP Engineering",
      email: "engineering@rejlers.com", 
      phone: "+46 771 78 00 00",
      specialties: ["Process Engineering", "Pipeline Design", "Safety Systems", "Digital Solutions"]
    },
    {
      id: "hr-administration",
      name: "Human Resources & Administration",
      description: "Career opportunities, HR policies, and administrative matters",
      head: "Helen Joseph",
      title: "Vice President, Head of Human Resources & Admin",
      email: "hr@rejlers.com",
      phone: "+46 771 78 00 00", 
      specialties: ["Career Opportunities", "Employee Relations", "Training & Development", "Administrative Support"]
    },
    {
      id: "finance-legal",
      name: "Finance & Legal Affairs",
      description: "Contracts, invoicing, legal matters, and financial discussions",
      head: "Aleksi Murtomaki",
      title: "CFO & Vice President Finance",
      email: "finance@rejlers.com",
      phone: "+46 771 78 00 00",
      specialties: ["Contract Management", "Financial Planning", "Legal Compliance", "Risk Management"]
    },
    {
      id: "executive",
      name: "Executive Leadership",
      description: "Strategic discussions, executive partnerships, and high-level inquiries",
      head: "Jarmo Suominen",
      title: "CEO & Senior VP Middle East Region",
      email: "executive@rejlers.com", 
      phone: "+46 771 78 00 00",
      specialties: ["Strategic Planning", "Executive Partnerships", "Corporate Development", "Regional Expansion"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contact Our Experts
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Ready to discuss your oil & gas engineering project? Our experienced consultants 
              are here to provide innovative solutions tailored to your specific needs.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                ISO 9001:2015 Certified
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                API & DNV Compliant
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                24/7 Emergency Support
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Department Selection */}
      <section className="bg-white py-12 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Department</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select the most appropriate department for your inquiry to ensure you reach the right specialist who can assist you effectively.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {departments.map((dept) => (
              <div
                key={dept.id}
                onClick={() => {
                  setSelectedDepartment(dept.id);
                  setFormData(prev => ({ ...prev, department: dept.id }));
                  // Smooth scroll to form
                  document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
                  selectedDepartment === dept.id
                    ? 'border-blue-500 bg-blue-50 shadow-lg'
                    : 'border-gray-200 hover:border-blue-300 bg-white'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    selectedDepartment === dept.id ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {dept.id === 'business-development' ? (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                      </svg>
                    ) : dept.id === 'project-delivery' ? (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    ) : dept.id === 'engineering' ? (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ) : dept.id === 'hr-administration' ? (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    ) : dept.id === 'finance-legal' ? (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                      </svg>
                    ) : (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-bold text-lg mb-2 ${
                      selectedDepartment === dept.id ? 'text-blue-900' : 'text-gray-900'
                    }`}>
                      {dept.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">{dept.description}</p>
                    <div className="text-xs space-y-1">
                      <p className="font-semibold text-gray-800">{dept.head}</p>
                      <p className="text-gray-500">{dept.title}</p>
                    </div>
                  </div>
                </div>
                
                {selectedDepartment === dept.id && (
                  <div className="mt-4 pt-4 border-t border-blue-200">
                    <div className="flex flex-wrap gap-2">
                      {dept.specialties.map((specialty, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                          {specialty}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 space-y-1 text-xs text-blue-700">
                      <p className="flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                        </svg>
                        {dept.email}
                      </p>
                      <p className="flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                        </svg>
                        {dept.phone}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div id="contact-form" className="bg-white rounded-xl shadow-xl p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Start Your Project Discussion
                </h2>
                <p className="text-gray-600">
                  Please provide detailed information about your project requirements. 
                  Our engineering consultants will respond within 24 hours.
                </p>
              </div>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span className="text-green-800 font-medium">
                      Thank you! Your inquiry has been submitted successfully. We'll contact you within 24 hours.
                    </span>
                  </div>
                </div>
              )}

              {selectedDepartment && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-blue-900">Selected Department:</h3>
                      <p className="text-blue-700">{departments.find(d => d.id === selectedDepartment)?.name}</p>
                      <p className="text-sm text-blue-600">Contact: {departments.find(d => d.id === selectedDepartment)?.head}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedDepartment('');
                        setFormData(prev => ({ ...prev, department: '' }));
                      }}
                      className="text-blue-600 hover:text-blue-800 text-sm underline"
                    >
                      Change Department
                    </button>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="John Smith"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="john.smith@company.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
                      Company/Organization *
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="ABC Energy Corp"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-2">
                      Service Area *
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    >
                      <option value="">Select Service Area</option>
                      {serviceAreas.map((service, index) => (
                        <option key={index} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="projectType" className="block text-sm font-semibold text-gray-700 mb-2">
                      Project Type *
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      required
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    >
                      <option value="">Select Project Type</option>
                      {projectTypes.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="department" className="block text-sm font-semibold text-gray-700 mb-2">
                      Department *
                    </label>
                    <select
                      id="department"
                      name="department"
                      required
                      value={formData.department}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    >
                      <option value="">Select Department</option>
                      {departments.map((dept) => (
                        <option key={dept.id} value={dept.id}>{dept.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="urgency" className="block text-sm font-semibold text-gray-700 mb-2">
                      Project Priority
                    </label>
                    <select
                      id="urgency"
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    >
                      <option value="low">Standard (Response within 48 hours)</option>
                      <option value="medium">Medium (Response within 24 hours)</option>
                      <option value="high">High (Response within 12 hours)</option>
                      <option value="urgent">Urgent (Response within 4 hours)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Project Details & Requirements *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Please describe your project scope, timeline, budget range, specific technical requirements, compliance standards, and any other relevant details..."
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Minimum 50 characters. Include project scope, timeline, and compliance requirements.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      name="consent"
                      required
                      checked={formData.consent}
                      onChange={handleInputChange}
                      className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      <strong>Data Protection & Privacy Consent *</strong><br/>
                      I consent to Rejlers processing my personal data for the purpose of responding to my inquiry. 
                      I understand that my data will be handled in accordance with GDPR regulations and Rejlers' 
                      Privacy Policy. I can withdraw this consent at any time by contacting privacy@rejlers.com.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !formData.consent}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting Inquiry...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                      </svg>
                      Submit Project Inquiry
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            
            {/* Emergency Contact - Conditionally Rendered Based on Soft Coding */}
            {emergencySupport?.enabled && (
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-red-800 mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                  </svg>
                  {emergencySupport.title}
                </h3>
                <p className="text-red-700 text-sm mb-3">
                  {emergencySupport.description}
                </p>
                <div className="space-y-3">
                  {emergencySupport.regions?.map((region, index) => (
                    <div key={index}>
                      <p className="text-red-800 font-semibold text-xs mb-1">{region.name}</p>
                      <a href={`tel:${region.phone.replace(/\s+/g, '')}`} className="block text-red-800 font-semibold hover:text-red-900">
                        📞 {region.phone}
                      </a>
                    </div>
                  ))}
                  {emergencySupport.email && (
                    <a href={`mailto:${emergencySupport.email}`} className="block text-red-800 font-semibold hover:text-red-900">
                      ✉️ {emergencySupport.email}
                    </a>
                  )}
                  <p className="text-xs text-red-600">{emergencySupport.availability}</p>
                </div>
              </div>
            )}

            {/* Office Locations */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                Global Offices
              </h3>
              
              <div className="space-y-6">
                {officeLocations.map((office, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900 flex items-center">
                        {office.name}
                        {office.isHeadquarters && (
                          <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                            HQ
                          </span>
                        )}
                      </h4>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {office.region}
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <p className="flex items-start">
                        <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                        </svg>
                        {office.address}
                      </p>
                      <p className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                        </svg>
                        <a href={`tel:${office.phone.replace(/\s+/g, '')}`} className="hover:text-blue-600">
                          {office.phone}
                        </a>
                      </p>
                      <p className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                        </svg>
                        <a href={`mailto:${office.email}`} className="hover:text-blue-600">
                          {office.email}
                        </a>
                      </p>
                      <p className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                          <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                        </svg>
                        {office.hours} ({office.timezone})
                      </p>
                      {office.mapLink && (
                        <p className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                          </svg>
                          <a href={office.mapLink} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                            View on Map
                          </a>
                        </p>
                      )}
                    </div>

                    {/* Services */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-700 mb-2">Key Services:</p>
                      <div className="flex flex-wrap gap-2">
                        {office.services.map((service, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-200">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key Personnel for Abu Dhabi Office */}
                    {office.keyPersonnel && office.keyPersonnel.length > 0 && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h5 className="font-semibold text-gray-800 mb-3 text-sm">Key Personnel:</h5>
                        <div className="space-y-3">
                          {office.keyPersonnel.map((person, pIdx) => (
                            <div key={pIdx} className="flex justify-between items-start">
                              <div>
                                <p className="font-semibold text-sm text-gray-900">{person.name}</p>
                                <p className="text-xs text-gray-600">{person.title}</p>
                              </div>
                              <div className="text-right">
                                <a href={`mailto:${person.email}`} className="text-xs text-blue-600 hover:text-blue-800 block">
                                  {person.email}
                                </a>
                                <a href={`tel:${person.phone.replace(/\s+/g, '')}`} className="text-xs text-gray-500 hover:text-gray-700">
                                  {person.phone}
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                Certifications & Standards
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  ISO 9001:2015 Quality Management
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  ISO 14001:2015 Environmental Management
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  ISO 45001:2018 Health & Safety
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  API Standards Compliance
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  DNV GL Certified
                </div>
              </div>
            </div>

            {/* Response Times */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-4">Response Commitments</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-700">Initial Response:</span>
                  <span className="font-semibold text-blue-900">Within 4 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Detailed Proposal:</span>
                  <span className="font-semibold text-blue-900">Within 48 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Project Kick-off:</span>
                  <span className="font-semibold text-blue-900">Within 5 business days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer with Working Links */}
      <Footer />
    </div>
  );
};

export default ContactPage;