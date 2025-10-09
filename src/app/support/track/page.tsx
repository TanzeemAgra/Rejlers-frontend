"use client"

import { useState, useEffect } from "react";
import finixpaTheme from "../../../config/finixpaTheme";

interface TicketData {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  assignedTo: string;
  slaDeadline: Date;
  customerInfo: {
    name: string;
    email: string;
    company: string;
  };
  timeline: Array<{
    id: string;
    action: string;
    description: string;
    timestamp: Date;
    actor: string;
    type: "status_change" | "comment" | "assignment" | "escalation" | "resolution";
  }>;
  attachments: Array<{
    id: string;
    name: string;
    size: string;
    type: string;
    uploadedAt: Date;
  }>;
}

export default function TrackTicketPage() {
  const [ticketId, setTicketId] = useState("");
  const [email, setEmail] = useState("");
  const [ticketData, setTicketData] = useState<TicketData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const ticketingSystem = finixpaTheme.ticketingSystem;

  // Mock ticket data for demonstration
  const mockTicketData: TicketData = {
    id: "TEC-128763-459",
    title: "Process Engineering Optimization Issue",
    description: "We are experiencing efficiency issues with our distillation column and need expert guidance on optimization parameters.",
    status: "in-progress",
    priority: "high",
    category: "technical-support",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    assignedTo: "Sarah Johnson - Senior Process Engineer",
    slaDeadline: new Date(Date.now() + 22 * 60 * 60 * 1000), // 22 hours from now
    customerInfo: {
      name: "Ahmed Al-Rashid",
      email: "ahmed.rashid@petrotech.ae",
      company: "PetroTech Industries LLC"
    },
    timeline: [
      {
        id: "1",
        action: "Ticket Created",
        description: "Support ticket submitted by customer",
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        actor: "Ahmed Al-Rashid",
        type: "status_change"
      },
      {
        id: "2", 
        action: "Auto-Assigned",
        description: "Ticket automatically assigned to Technical Engineering Team based on category",
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 5 * 60 * 1000),
        actor: "System",
        type: "assignment"
      },
      {
        id: "3",
        action: "Status Updated",
        description: "Ticket status changed from 'Open' to 'In Progress'",
        timestamp: new Date(Date.now() - 47 * 60 * 60 * 1000),
        actor: "Sarah Johnson",
        type: "status_change"
      },
      {
        id: "4",
        action: "Engineer Comment",
        description: "Initial analysis completed. Requesting additional process data and current operating parameters.",
        timestamp: new Date(Date.now() - 46 * 60 * 60 * 1000),
        actor: "Sarah Johnson",
        type: "comment"
      },
      {
        id: "5",
        action: "Customer Response",
        description: "Process data files uploaded including PFD, operating conditions, and recent performance metrics.",
        timestamp: new Date(Date.now() - 25 * 60 * 60 * 1000),
        actor: "Ahmed Al-Rashid",
        type: "comment"
      },
      {
        id: "6",
        action: "Update from Engineer",
        description: "Data analysis in progress. Preliminary recommendations will be shared within 24 hours.",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        actor: "Sarah Johnson",
        type: "comment"
      }
    ],
    attachments: [
      {
        id: "att1",
        name: "Process_Flow_Diagram.pdf", 
        size: "2.4 MB",
        type: "application/pdf",
        uploadedAt: new Date(Date.now() - 25 * 60 * 60 * 1000)
      },
      {
        id: "att2",
        name: "Operating_Conditions.xlsx",
        size: "856 KB", 
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        uploadedAt: new Date(Date.now() - 25 * 60 * 60 * 1000)
      },
      {
        id: "att3",
        name: "Performance_Metrics_Q3.xlsx",
        size: "1.2 MB",
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", 
        uploadedAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
      }
    ]
  };

  const handleTrackTicket = async () => {
    if (!ticketId.trim() || !email.trim()) {
      setError("Please enter both ticket ID and email address");
      return;
    }

    setIsLoading(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      // For demo purposes, accept any ticket ID with correct format
      if (ticketId.match(/^[A-Z]{3}-\d{6}-\d{3}$/)) {
        setTicketData(mockTicketData);
      } else {
        setError("Ticket not found or invalid format. Please check your ticket ID.");
      }
      setIsLoading(false);
    }, 1500);
  };

  const getStatusInfo = (status: string) => {
    return ticketingSystem.status[status as keyof typeof ticketingSystem.status] || {
      label: status,
      color: "bg-gray-500",
      textColor: "text-gray-600"
    };
  };

  const getPriorityInfo = (priority: string) => {
    return ticketingSystem.priorities[priority as keyof typeof ticketingSystem.priorities] || {
      label: priority,
      color: "bg-gray-500",
      textColor: "text-gray-600"
    };
  };

  const getCategoryInfo = (categoryId: string) => {
    return ticketingSystem.categories.types.find((cat: any) => cat.id === categoryId) || {
      title: categoryId,
      assignedTeam: "Support Team"
    };
  };

  const getTimelineIcon = (type: string) => {
    switch (type) {
      case "status_change":
        return "icofont-refresh";
      case "comment":
        return "icofont-comment";
      case "assignment":
        return "icofont-user-alt-4";
      case "escalation":
        return "icofont-warning-alt";
      case "resolution":
        return "icofont-check-circled";
      default:
        return "icofont-info-circle";
    }
  };

  const calculateSLAProgress = (deadline: Date) => {
    const now = new Date();
    const created = new Date(ticketData?.createdAt || now);
    const totalTime = deadline.getTime() - created.getTime();
    const elapsed = now.getTime() - created.getTime();
    const progress = Math.min((elapsed / totalTime) * 100, 100);
    return {
      progress,
      isOverdue: now > deadline,
      timeRemaining: deadline.getTime() - now.getTime()
    };
  };

  const formatTimeRemaining = (milliseconds: number) => {
    if (milliseconds < 0) return "Overdue";
    
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days}d ${hours % 24}h remaining`;
    }
    return `${hours}h ${minutes}m remaining`;
  };

  if (!ticketData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">Track Your Support Ticket</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Enter your ticket ID and email address to view the current status and progress of your support request
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Find Your Ticket</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ticket ID *
                  </label>
                  <input
                    type="text"
                    value={ticketId}
                    onChange={(e) => setTicketId(e.target.value.toUpperCase())}
                    placeholder="e.g., TEC-128763-459"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-mono"
                  />
                  <p className="text-sm text-gray-500 mt-1">Format: XXX-XXXXXX-XXX</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@company.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <p className="text-sm text-gray-500 mt-1">The email address used when creating the ticket</p>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                <button
                  onClick={handleTrackTicket}
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  {isLoading && (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  )}
                  <span>{isLoading ? 'Searching...' : 'Track Ticket'}</span>
                </button>
              </div>

              {/* Demo Ticket ID */}
              <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Demo Ticket for Testing</h4>
                <p className="text-sm text-blue-700 mb-2">
                  Use this sample ticket ID to see the tracking interface:
                </p>
                <div className="flex items-center space-x-2">
                  <code className="bg-blue-100 px-2 py-1 rounded font-mono text-blue-800">TEC-128763-459</code>
                  <button
                    onClick={() => {
                      setTicketId("TEC-128763-459");
                      setEmail("ahmed.rashid@petrotech.ae");
                    }}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Use Demo Data
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo(ticketData.status);
  const priorityInfo = getPriorityInfo(ticketData.priority);
  const categoryInfo = getCategoryInfo(ticketData.category);
  const slaInfo = calculateSLAProgress(ticketData.slaDeadline);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setTicketData(null)}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
            >
              ← Track Another Ticket
            </button>
            <div className="text-right">
              <h1 className="text-2xl font-bold">Ticket #{ticketData.id}</h1>
              <p className="text-blue-100">Last Updated: {ticketData.updatedAt.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-3xl font-bold mb-2">{ticketData.title}</h2>
            <div className="flex items-center space-x-4 text-sm">
              <span className={`px-3 py-1 rounded-full font-medium ${statusInfo.color} text-white`}>
                {statusInfo.label}
              </span>
              <span className={`px-3 py-1 rounded-full font-medium ${priorityInfo.color} text-white`}>
                {priorityInfo.label} Priority
              </span>
              <span className="text-blue-100">Category: {categoryInfo.title}</span>
              <span className="text-blue-100">Assigned to: {ticketData.assignedTo}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* SLA Progress */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Service Level Agreement (SLA)</h3>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className={`text-sm font-medium ${slaInfo.isOverdue ? 'text-red-600' : 'text-gray-700'}`}>
                    {formatTimeRemaining(slaInfo.timeRemaining)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      slaInfo.isOverdue ? 'bg-red-500' : 
                      slaInfo.progress > 75 ? 'bg-yellow-500' : 
                      'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(slaInfo.progress, 100)}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <p>SLA Deadline: {ticketData.slaDeadline.toLocaleString()}</p>
                <p>Target Resolution Time: {priorityInfo.slaHours} hours</p>
              </div>
            </div>

            {/* Ticket Timeline */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Ticket Activity Timeline</h3>
              <div className="space-y-4">
                {ticketData.timeline.map((event, index) => (
                  <div key={event.id} className="flex items-start space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      event.type === 'resolution' ? 'bg-green-100' :
                      event.type === 'escalation' ? 'bg-red-100' :
                      event.type === 'comment' ? 'bg-blue-100' :
                      'bg-gray-100'
                    }`}>
                      <i className={`${getTimelineIcon(event.type)} text-lg ${
                        event.type === 'resolution' ? 'text-green-600' :
                        event.type === 'escalation' ? 'text-red-600' :
                        event.type === 'comment' ? 'text-blue-600' :
                        'text-gray-600'
                      }`}></i>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-gray-800">{event.action}</h4>
                        <span className="text-sm text-gray-500">{event.timestamp.toLocaleString()}</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-1">{event.description}</p>
                      <span className="text-xs text-gray-500">by {event.actor}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Attachments */}
            {ticketData.attachments.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Attachments</h3>
                <div className="space-y-3">
                  {ticketData.attachments.map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <i className="icofont-file-document text-blue-600"></i>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{file.name}</p>
                          <p className="text-sm text-gray-500">{file.size} • Uploaded {file.uploadedAt.toLocaleDateString()}</p>
                        </div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Ticket Details */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Ticket Details</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-gray-600">Status:</span>
                  <span className={`ml-2 px-2 py-1 rounded font-medium ${statusInfo.textColor} bg-gray-100`}>
                    {statusInfo.label}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Priority:</span>
                  <span className={`ml-2 px-2 py-1 rounded font-medium ${priorityInfo.textColor} bg-gray-100`}>
                    {priorityInfo.label}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Category:</span>
                  <span className="ml-2 text-gray-800">{categoryInfo.title}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Created:</span>
                  <span className="ml-2 text-gray-800">{ticketData.createdAt.toLocaleString()}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Last Update:</span>
                  <span className="ml-2 text-gray-800">{ticketData.updatedAt.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Customer Information</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-gray-600">Name:</span>
                  <span className="ml-2 text-gray-800">{ticketData.customerInfo.name}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Email:</span>
                  <span className="ml-2 text-gray-800">{ticketData.customerInfo.email}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Company:</span>
                  <span className="ml-2 text-gray-800">{ticketData.customerInfo.company}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                  Add Comment
                </button>
                <button className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                  Upload File
                </button>
                <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors">
                  Request Update
                </button>
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-6">
              <h3 className="text-lg font-bold mb-2">Need Immediate Help?</h3>
              <p className="text-sm mb-4 text-blue-100">
                Contact our support team directly for urgent matters
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <i className="icofont-phone text-blue-200"></i>
                  <span>+971 2 639 7449</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="icofont-email text-blue-200"></i>
                  <span>support@rejlers.ae</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}