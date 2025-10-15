"use client"

import { useState, useRef } from "react";
import finixpaTheme from "../../config/finixpaTheme";

interface TicketFormData {
  title: string;
  description: string;
  category: string;
  subcategory: string;
  priority: string;
  clientType: string;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
    company: string;
  };
  attachments: File[];
}

interface TicketResponse {
  ticketId: string;
  status: string;
  assignedTeam: string;
  slaDeadline: Date;
}

export default function SupportPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<TicketFormData>({
    title: "",
    description: "",
    category: "",
    subcategory: "",
    priority: "medium",
    clientType: "",
    contactInfo: {
      name: "",
      email: "",
      phone: "",
      company: ""
    },
    attachments: []
  });
  const [submittedTicket, setSubmittedTicket] = useState<TicketResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const ticketingSystem = finixpaTheme.ticketingSystem;
  const selectedCategory = ticketingSystem.categories.types.find((cat: any) => cat.id === formData.category);
  const selectedPriority = formData.priority ? ticketingSystem.priorities[formData.priority as keyof typeof ticketingSystem.priorities] : null;

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof TicketFormData] as any,
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file => {
      const extension = '.' + file.name.split('.').pop()?.toLowerCase();
      return ticketingSystem.features.fileUpload.allowedTypes.includes(extension) && 
             file.size <= 10 * 1024 * 1024; // 10MB limit
    });
    
    if (validFiles.length + formData.attachments.length <= ticketingSystem.features.fileUpload.maxFiles) {
      setFormData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...validFiles]
      }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const generateTicketId = (): string => {
    const prefix = formData.category.toUpperCase().slice(0, 3);
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${timestamp}-${random}`;
  };

  const calculateSLADeadline = (): Date => {
    const slaHours = selectedCategory?.slaHours || selectedPriority?.slaHours || 24;
    const deadline = new Date();
    deadline.setHours(deadline.getHours() + slaHours);
    return deadline;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const ticketResponse: TicketResponse = {
        ticketId: generateTicketId(),
        status: "open",
        assignedTeam: selectedCategory?.assignedTeam || "General Support Team",
        slaDeadline: calculateSLADeadline()
      };
      
      setSubmittedTicket(ticketResponse);
      setIsSubmitting(false);
      setStep(4); // Success step
    }, 2000);
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.category && formData.subcategory && formData.priority;
      case 2:
        return formData.title.trim() && formData.description.trim();
      case 3:
        return formData.contactInfo.name && formData.contactInfo.email && formData.contactInfo.company;
      default:
        return true;
    }
  };

  if (step === 4 && submittedTicket) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
        {/* Success Hero */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold mb-4">Support Ticket Created Successfully!</h1>
            <p className="text-xl mb-2">Your ticket has been submitted and assigned to our expert team</p>
            <p className="text-lg opacity-90">Ticket ID: <span className="font-mono font-bold">{submittedTicket.ticketId}</span></p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Ticket Details */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Ticket Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Ticket ID</label>
                    <p className="font-mono text-lg font-bold text-blue-600">{submittedTicket.ticketId}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Status</label>
                    <span className="inline-block ml-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {ticketingSystem.status[submittedTicket.status as keyof typeof ticketingSystem.status].label}
                    </span>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Assigned Team</label>
                    <p className="text-gray-800">{submittedTicket.assignedTeam}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">SLA Deadline</label>
                    <p className="text-gray-800">{submittedTicket.slaDeadline.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Priority</label>
                    <span className={`inline-block ml-2 px-3 py-1 rounded-full text-sm font-medium text-white ${selectedPriority?.color}`}>
                      {selectedPriority?.label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">What Happens Next?</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Ticket Assignment</h4>
                      <p className="text-sm text-gray-600">Your ticket has been automatically assigned to {submittedTicket.assignedTeam}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Expert Review</h4>
                      <p className="text-sm text-gray-600">Our specialists will review your request within {selectedCategory?.slaHours || 24} hours</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Regular Updates</h4>
                      <p className="text-sm text-gray-600">You'll receive email updates on progress and any additional information needed</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-bold text-sm">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Resolution</h4>
                      <p className="text-sm text-gray-600">We'll work with you to resolve the issue and ensure your satisfaction</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="text-center space-x-4">
              <button 
                onClick={() => window.location.href = '/support/track'}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Track Your Ticket
              </button>
              <button 
                onClick={() => window.location.reload()}
                className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Create Another Ticket
              </button>
              <button 
                onClick={() => window.location.href = '/help'}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Back to Help Center
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">{ticketingSystem.hero.title}</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">{ticketingSystem.hero.subtitle}</p>
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-center space-x-4 max-w-md mx-auto">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= stepNumber ? 'bg-white text-blue-900' : 'bg-blue-700 text-blue-200'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-16 h-1 ${step > stepNumber ? 'bg-white' : 'bg-blue-700'}`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-8 mt-4 text-sm">
            <span className={step >= 1 ? 'text-white font-medium' : 'text-blue-200'}>Category & Priority</span>
            <span className={step >= 2 ? 'text-white font-medium' : 'text-blue-200'}>Issue Details</span>
            <span className={step >= 3 ? 'text-white font-medium' : 'text-blue-200'}>Contact Information</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          
          {/* Step 1: Category Selection */}
          {step === 1 && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Select Support Category & Priority</h2>
              
              {/* Category Selection */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Support Category</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {ticketingSystem.categories.types.map((category: any) => (
                    <div
                      key={category.id}
                      onClick={() => {
                        handleInputChange('category', category.id);
                        handleInputChange('subcategory', ''); // Reset subcategory
                      }}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                        formData.category === category.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center mb-3`}>
                        <i className={`${category.icon} text-white text-xl`}></i>
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">{category.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                      <div className="text-xs text-blue-600">
                        SLA: {category.slaHours} hours • Team: {category.assignedTeam}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subcategory Selection */}
              {formData.category && selectedCategory && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Specific Issue Type</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {selectedCategory.subcategories.map((subcategory: string, index: number) => (
                      <div
                        key={index}
                        onClick={() => handleInputChange('subcategory', subcategory)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all duration-300 ${
                          formData.subcategory === subcategory
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                        }`}
                      >
                        <span className="font-medium">{subcategory}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Priority Selection */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Priority Level</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {Object.entries(ticketingSystem.priorities).map(([key, priority]: [string, any]) => (
                    <div
                      key={key}
                      onClick={() => handleInputChange('priority', key)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                        formData.priority === key
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full ${priority.color} mb-3`}></div>
                      <h4 className="font-semibold text-gray-800 mb-1">{priority.label}</h4>
                      <p className="text-sm text-gray-600 mb-2">{priority.description}</p>
                      <div className="text-xs text-gray-500">SLA: {priority.slaHours} hours</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                >
                  Continue to Issue Details
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Issue Details */}
          {step === 2 && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Describe Your Issue</h2>
              
              <div className="space-y-6">
                {/* Issue Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Issue Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Brief description of your issue..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                {/* Issue Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Detailed Description *
                  </label>
                  <textarea
                    rows={8}
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Please provide a detailed description of your issue, including any relevant background information, steps you've already taken, and specific outcomes you're expecting..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Attachments (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      accept={ticketingSystem.features.fileUpload.allowedTypes.join(',')}
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Choose Files
                    </button>
                    <p className="text-sm text-gray-500 mt-2">
                      Max {ticketingSystem.features.fileUpload.maxFiles} files, {ticketingSystem.features.fileUpload.maxFileSize} each
                    </p>
                    <p className="text-xs text-gray-400">
                      Supported: {ticketingSystem.features.fileUpload.allowedTypes.join(', ')}
                    </p>
                  </div>

                  {/* Uploaded Files */}
                  {formData.attachments.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {formData.attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <span className="text-sm text-gray-700">{file.name}</span>
                          <button
                            onClick={() => removeFile(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={prevStep}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                >
                  Continue to Contact Info
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Contact Information */}
          {step === 3 && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Contact Information</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.contactInfo.name}
                    onChange={(e) => handleInputChange('contactInfo.name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.contactInfo.email}
                    onChange={(e) => handleInputChange('contactInfo.email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.contactInfo.phone}
                    onChange={(e) => handleInputChange('contactInfo.phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company/Organization *
                  </label>
                  <input
                    type="text"
                    value={formData.contactInfo.company}
                    onChange={(e) => handleInputChange('contactInfo.company', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              {/* Client Type Selection */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client Type (Optional - helps us assign the right specialist)
                </label>
                <select
                  value={formData.clientType}
                  onChange={(e) => handleInputChange('clientType', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="">Select your client type...</option>
                  {finixpaTheme.helpSystem.clientTypes.types.map((clientType: any) => (
                    <option key={clientType.id} value={clientType.id}>
                      {clientType.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Summary */}
              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Ticket Summary</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Category:</span>
                    <span className="ml-2 text-gray-800">{selectedCategory?.title}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Priority:</span>
                    <span className={`ml-2 px-2 py-1 rounded text-xs font-medium text-white ${selectedPriority?.color}`}>
                      {selectedPriority?.label}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Expected SLA:</span>
                    <span className="ml-2 text-gray-800">{selectedCategory?.slaHours || selectedPriority?.slaHours} hours</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Assigned Team:</span>
                    <span className="ml-2 text-gray-800">{selectedCategory?.assignedTeam}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={prevStep}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!isStepValid() || isSubmitting}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
                >
                  {isSubmitting && (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  )}
                  <span>{isSubmitting ? 'Creating Ticket...' : 'Submit Support Ticket'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
