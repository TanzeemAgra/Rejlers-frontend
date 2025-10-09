"use client"

import { useState, useEffect } from "react";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import finixpaTheme from "../../config/finixpaTheme";

interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
  clientType?: string;
}

interface AssistanceOption {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  action: string;
}

export default function HelpPage() {
  const [currentStep, setCurrentStep] = useState<"welcome" | "clientType" | "assistance" | "chat">("welcome");
  const [selectedClientType, setSelectedClientType] = useState<string>("");
  const [assistanceType, setAssistanceType] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const helpSystem = finixpaTheme.helpSystem;

  // Define assistance options based on client needs
  const assistanceOptions: AssistanceOption[] = [
    {
      id: "instant-chat",
      title: "AI Assistant",
      description: "Get immediate answers from our intelligent assistant",
      icon: "💬",
      color: "from-blue-500 to-blue-600",
      action: "chat"
    },
    {
      id: "expert-consultation",
      title: "Expert Consultation", 
      description: "Schedule a call with our specialists",
      icon: "👨‍💼",
      color: "from-green-500 to-green-600",
      action: "consultation"
    },
    {
      id: "project-quote",
      title: "Project Quote",
      description: "Get a detailed project estimate",
      icon: "💰",
      color: "from-purple-500 to-purple-600", 
      action: "quote"
    },
    {
      id: "emergency-support",
      title: "Emergency Support",
      description: "24/7 urgent technical assistance",
      icon: "🚨",
      color: "from-red-500 to-red-600",
      action: "emergency"
    }
  ];

  // Handle step navigation
  const handleClientTypeSelection = (clientTypeId: string) => {
    setSelectedClientType(clientTypeId);
    setCurrentStep("assistance");
  };

  const handleAssistanceSelection = (assistanceId: string) => {
    setAssistanceType(assistanceId);
    if (assistanceId === "instant-chat") {
      setCurrentStep("chat");
      initializeChat();
    } else {
      // Handle other assistance types (consultation, quote, emergency)
      handleOtherAssistance(assistanceId);
    }
  };

  const initializeChat = () => {
    const clientConfig = helpSystem.clientTypes.types.find((type: any) => type.id === selectedClientType);
    const welcomeMessage: ChatMessage = {
      id: Date.now().toString(),
      text: `Hello! I'm REJLERS AI Assistant specialized in ${clientConfig?.title}. I understand you need help with ${clientConfig?.services?.[0]}. How can I assist you today?`,
      sender: "ai",
      timestamp: new Date(),
      clientType: selectedClientType
    };
    setChatMessages([welcomeMessage]);
  };

  const handleOtherAssistance = (assistanceId: string) => {
    // Redirect to appropriate pages or show contact forms
    switch(assistanceId) {
      case "expert-consultation":
        window.location.href = "/contact?type=consultation";
        break;
      case "project-quote":
        window.location.href = "/contact?type=quote";
        break;
      case "emergency-support":
        window.location.href = "tel:+971263974490";
        break;
    }
  };

  const sendMessage = () => {
    if (!currentMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: currentMessage,
      sender: "user",
      timestamp: new Date(),
      clientType: selectedClientType
    };

    setChatMessages(prev => [...prev, userMessage]);
    setCurrentMessage("");
    setIsTyping(true);

    // AI Response simulation with intelligent context
    setTimeout(() => {
      const clientConfig = helpSystem.clientTypes.types.find((type: any) => type.id === selectedClientType);
      let aiResponse = "";

      // Context-aware AI responses
      if (currentMessage.toLowerCase().includes("project")) {
        aiResponse = `For ${clientConfig?.title} projects, I recommend starting with a consultation. Our specialists have completed over 200+ similar projects. Would you like me to connect you with our project team?`;
      } else if (currentMessage.toLowerCase().includes("cost") || currentMessage.toLowerCase().includes("price")) {
        aiResponse = "Project costs vary based on scope and complexity. I can arrange a free consultation to provide an accurate estimate. Shall I schedule that for you?";
      } else if (currentMessage.toLowerCase().includes("emergency")) {
        aiResponse = `This sounds urgent! I'm connecting you directly to our 24/7 emergency team for ${clientConfig?.title}. You can also call +971 2 639 7449 immediately.`;
      } else {
        aiResponse = `I understand you're asking about "${currentMessage}". Based on your industry (${clientConfig?.title}), I can help with technical guidance, project planning, or connect you with our specialists. What specific area would you like to explore?`;
      }

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: "ai",
        timestamp: new Date(),
        clientType: selectedClientType
      };

      setChatMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const resetFlow = () => {
    setCurrentStep("welcome");
    setSelectedClientType("");
    setAssistanceType("");
    setChatMessages([]);
    setCurrentMessage("");
    setIsTyping(false);
  };

  return (
    <>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
      <Header />
      
      {/* Innovative Help System with Professional Layout */}
      <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative">
        {/* Innovative Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-blue-300 to-blue-400 rounded-full opacity-20 animate-float"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-gradient-to-r from-indigo-300 to-purple-400 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-r from-slate-300 to-blue-300 rounded-full opacity-25 animate-bounce"></div>
          <div className="absolute top-1/2 right-10 w-8 h-8 bg-gradient-to-r from-orange-300 to-pink-400 rounded-full opacity-20 animate-float" style={{animationDelay: '1s'}}></div>
        </div>
        
        {/* Progress Indicator with Enhanced Design */}
        <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-blue-100 relative z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep === "welcome" ? "bg-blue-600 text-white" : "bg-green-600 text-white"
            }`}>
              {currentStep === "welcome" ? "1" : "✓"}
            </div>
            <div className="flex-1 h-1 bg-gray-200 rounded">
              <div className={`h-full bg-blue-600 rounded transition-all duration-500 ${
                currentStep === "welcome" ? "w-0" : currentStep === "clientType" ? "w-1/3" : 
                currentStep === "assistance" ? "w-2/3" : "w-full"
              }`}></div>
            </div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep === "welcome" || currentStep === "clientType" ? "bg-gray-300 text-gray-600" : 
              currentStep === "assistance" ? "bg-blue-600 text-white" : "bg-green-600 text-white"
            }`}>
              {currentStep === "chat" ? "✓" : currentStep === "assistance" ? "2" : "2"}
            </div>
            <div className="flex-1 h-1 bg-gray-200 rounded">
              <div className={`h-full bg-blue-600 rounded transition-all duration-500 ${
                currentStep === "chat" ? "w-full" : "w-0"
              }`}></div>
            </div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep === "chat" ? "bg-green-600 text-white" : "bg-gray-300 text-gray-600"
            }`}>
              {currentStep === "chat" ? "✓" : "3"}
            </div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-600">
            <span>Welcome</span>
            <span>Choose Help Type</span>
            <span>Get Assistance</span>
          </div>
        </div>
      </div>

      {/* Innovative Main Content with Enhanced Spacing */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        
        {/* Welcome Step - Enhanced Design */}
        {currentStep === "welcome" && (
          <div className="max-w-4xl mx-auto text-center animate-fadeIn">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-blue-100 p-12 mb-8 hover:shadow-3xl transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-5xl font-bold text-gray-800 mb-4">{helpSystem.hero.title}</h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">{helpSystem.hero.subtitle}</p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <p className="text-sm text-gray-600">AI-Powered Assistance</p>
                </div>
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  </div>
                  <p className="text-sm text-gray-600">Expert Specialists</p>
                </div>
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  </div>
                  <p className="text-sm text-gray-600">24/7 Support</p>
                </div>
              </div>

              <button
                onClick={() => setCurrentStep("clientType")}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Get Started →
              </button>
            </div>
          </div>
        )}

        {/* Client Type Selection Step */}
        {currentStep === "clientType" && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">{helpSystem.clientTypes.title}</h2>
              <p className="text-xl text-gray-600">{helpSystem.clientTypes.subtitle}</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {helpSystem.clientTypes.types.map((clientType: any) => (
                <div
                  key={clientType.id}
                  onClick={() => handleClientTypeSelection(clientType.id)}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-blue-500 p-8"
                >
                  <div className="text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${clientType.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                      <span className="text-2xl text-white">{clientType.icon}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{clientType.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm">{clientType.subtitle}</p>
                    <div className="text-xs text-blue-600 font-medium">
                      Specialist: {clientType.specialists[0]?.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <button
                onClick={resetFlow}
                className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                ← Back to Welcome
              </button>
            </div>
          </div>
        )}

        {/* Assistance Type Selection Step */}
        {currentStep === "assistance" && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">How can we help you today?</h2>
              <p className="text-xl text-gray-600">Choose the type of assistance you need</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {assistanceOptions.map((option) => (
                <div
                  key={option.id}
                  onClick={() => handleAssistanceSelection(option.id)}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer p-8 border-2 border-transparent hover:border-blue-500"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${option.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <span className="text-2xl">{option.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{option.title}</h3>
                  <p className="text-gray-600">{option.description}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <button
                onClick={() => setCurrentStep("clientType")}
                className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                ← Change Client Type
              </button>
            </div>
          </div>
        )}

        {/* Chat Interface Step */}
        {currentStep === "chat" && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-xl">🤖</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">REJLERS AI Assistant</h3>
                      <p className="text-blue-100 text-sm">
                        Specialized for {helpSystem.clientTypes.types.find((t: any) => t.id === selectedClientType)?.title}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setCurrentStep("assistance")}
                      className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors text-sm"
                    >
                      Change Help Type
                    </button>
                    <button
                      onClick={resetFlow}
                      className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors text-sm"
                    >
                      Start Over
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Chat Messages */}
              <div className="h-96 overflow-y-auto p-6 bg-gray-50">
                <div className="space-y-4">
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className="flex items-start space-x-3 max-w-3xl">
                        {message.sender === "ai" && (
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-sm">🤖</span>
                          </div>
                        )}
                        <div
                          className={`px-4 py-3 rounded-2xl ${
                            message.sender === "user"
                              ? "bg-blue-600 text-white ml-auto"
                              : "bg-white shadow-md text-gray-800"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{message.text}</p>
                          <span className="text-xs opacity-75 mt-2 block">
                            {message.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        {message.sender === "user" && (
                          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-sm">👤</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm">🤖</span>
                        </div>
                        <div className="bg-white shadow-md rounded-2xl px-4 py-3">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: "0.1s"}}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: "0.2s"}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Chat Input */}
              <div className="p-6 border-t bg-white">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    disabled={isTyping}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!currentMessage.trim() || isTyping}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-6 py-3 rounded-xl transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    
    {/* Footer with Working Links */}
    <Footer />
    </>
  );
}