/**
 * AI-Powered Main Dashboard Layout
 * Advanced dashboard with generative AI, agentic AI, and RAG capabilities
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '@/components/ui/Logo';
import { 
  Bars3Icon, 
  XMarkIcon,
  BellIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  CogIcon,
  ChatBubbleLeftRightIcon,
  MicrophoneIcon,
  SpeakerWaveIcon,
  SparklesIcon,
  LightBulbIcon,
  BoltIcon
} from '@heroicons/react/24/outline';

import { DASHBOARD_CONFIG } from '@/config/dashboard.config';
import { useAI } from '../../hooks/useAI';
import { useRealTime } from '../../hooks/useRealTime';
import { useAuth } from '../../hooks/useAuth';
import { cn } from '@/lib/utils';

// Components
import DashboardSidebar from './DashboardSidebar';
import AIAssistant from './AIAssistant';
import SmartNotifications from './SmartNotifications';
import VoiceCommands from './VoiceCommands';
import ModuleGrid from './ModuleGrid';
import AIInsightsBanner from './AIInsightsBanner';
import RealTimeMetrics from './RealTimeMetrics';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  // State Management
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [currentModule, setCurrentModule] = useState('dashboard');

  // Custom Hooks
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const { aiInsights, generateInsight, isProcessing } = useAI();
  const { metrics, isConnected, connectionStatus } = useRealTime();

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading...</span>
      </div>
    );
  }

  // Handle unauthenticated state
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h1>
          <p className="text-gray-600 mb-6">Please log in to access the dashboard.</p>
          <a 
            href="/login" 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  // AI-Powered Smart Search
  const handleSmartSearch = useCallback(async (query: string) => {
    if (!query.trim()) return;
    
    try {
      const insights = await generateInsight({
        type: 'search',
        query: query,
        context: {
          currentModule,
          userRole: user?.role,
          timestamp: new Date().toISOString()
        }
      });
      
      // Process search results with AI enhancement
      console.log('AI-Enhanced Search Results:', insights);
    } catch (error) {
      console.error('Smart search error:', error);
    }
  }, [currentModule, user?.role, generateInsight]);

  // Voice Command Handler
  const handleVoiceCommand = useCallback((command: string) => {
    console.log('Voice command received:', command);
    
    // Process voice command through AI
    generateInsight({
      type: 'voice_command',
      query: command,
      context: { userInterface: true }
    });
  }, [generateInsight]);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K for search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('smart-search')?.focus();
      }
      
      // Ctrl/Cmd + J for AI Assistant
      if ((e.ctrlKey || e.metaKey) && e.key === 'j') {
        e.preventDefault();
        setAiAssistantOpen(prev => !prev);
      }
      
      // Ctrl/Cmd + B for Sidebar
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        setSidebarOpen(prev => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      {/* <DashboardSidebar
        onClose={() => setSidebarOpen(false)}
        currentModule={currentModule}
        onModuleChange={setCurrentModule}
      /> */}
      <div className="w-64 bg-white shadow-lg">
        <p className="p-4 text-sm text-gray-600">Sidebar placeholder</p>
      </div>

      {/* Main Content */}
      <div className={cn(
        "flex flex-col min-h-screen transition-all duration-300",
        sidebarOpen ? "lg:ml-80" : "lg:ml-20"
      )}>
        
        {/* AI Insights Banner */}
        {aiInsights && aiInsights.length > 0 && (
          <>
            {/* <AIInsightsBanner insights={aiInsights} /> */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
              <p className="text-sm text-blue-800">AI Insights Banner placeholder</p>
            </div>
          </>
        )}

        {/* Header */}
        <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700 sticky top-0 z-30">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              
              {/* Left Section */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800 transition-colors lg:hidden"
                >
                  {sidebarOpen ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}
                </button>

                {/* Company Branding */}
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm border p-1">
                    <Logo context="sidebar" />
                  </div>
                  <div className="hidden sm:block">
                    <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                      {DASHBOARD_CONFIG.COMPANY.NAME}
                    </h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400 -mt-1">
                      AI-Powered Dashboard
                    </p>
                  </div>
                </div>
              </div>

              {/* Center Section - Smart Search */}
              <div className="flex-1 max-w-2xl mx-8 hidden md:block">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="smart-search"
                    type="text"
                    placeholder="Ask AI anything about your business... (Ctrl+K)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSmartSearch(searchQuery);
                      }
                    }}
                    className="block w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <SparklesIcon className="h-5 w-5 text-blue-500" />
                  </div>
                </div>
              </div>

              {/* Right Section */}
              <div className="flex items-center space-x-3">
                
                {/* Real-time Connection Status */}
                <div className={cn(
                  "hidden sm:flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium",
                  isConnected 
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                )}>
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    isConnected ? "bg-green-500" : "bg-red-500"
                  )} />
                  <span>{connectionStatus}</span>
                </div>

                {/* Voice Commands */}
                {DASHBOARD_CONFIG.FEATURES.VOICE_COMMANDS.ENABLED && (
                  <VoiceCommands
                    isActive={voiceActive}
                    onToggle={() => setVoiceActive(!voiceActive)}
                    onCommandExecuted={handleVoiceCommand}
                  />
                )}

                {/* AI Assistant Toggle */}
                <button
                  onClick={() => setAiAssistantOpen(!aiAssistantOpen)}
                  className={cn(
                    "p-2 rounded-lg transition-colors",
                    aiAssistantOpen
                      ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800"
                  )}
                  title="AI Assistant (Ctrl+J)"
                >
                  <ChatBubbleLeftRightIcon className="h-6 w-6" />
                </button>

                {/* Smart Notifications */}
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800 relative"
                  title="Notifications"
                >
                  <BellIcon className="h-6 w-6" />
                  {/* Notification Badge */}
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                </button>
                
                <SmartNotifications
                  isOpen={notificationsOpen}
                  onClose={() => setNotificationsOpen(false)}
                />

                {/* Settings */}
                <button
                  className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Settings"
                >
                  <CogIcon className="h-6 w-6" />
                </button>

                {/* User Profile */}
                <div className="flex items-center space-x-3">
                  <div className="hidden sm:block text-right">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {user?.first_name} {user?.last_name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {user?.job_title} • {user?.company_name}
                    </p>
                  </div>
                  <button className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <UserCircleIcon className="h-8 w-8" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Real-time Metrics Bar */}
        {DASHBOARD_CONFIG.FEATURES.REAL_TIME.ENABLED && (
          <RealTimeMetrics />
        )}

        {/* Main Content Area */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
          {children || (
            <div className="space-y-8">
              {/* Welcome Section */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">
                      Welcome back, {user?.first_name}! 👋
                    </h2>
                    <p className="text-blue-100 text-lg">
                      Your AI-powered dashboard is ready with smart insights and automation
                    </p>
                  </div>
                  <div className="hidden lg:block">
                    <div className="flex items-center space-x-4">
                      <div className="bg-white/20 rounded-lg p-3">
                        <BoltIcon className="h-8 w-8" />
                      </div>
                      <div className="bg-white/20 rounded-lg p-3">
                        <LightBulbIcon className="h-8 w-8" />
                      </div>
                      <div className="bg-white/20 rounded-lg p-3">
                        <SparklesIcon className="h-8 w-8" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Modules Grid */}
              <ModuleGrid 
                onModuleClick={setCurrentModule}
              />
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-t border-slate-200 dark:border-slate-700 px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center space-x-4">
              <span>© 2025 {DASHBOARD_CONFIG.COMPANY.NAME}</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">{DASHBOARD_CONFIG.COMPANY.TAGLINE}</span>
            </div>
            <div className="flex items-center space-x-2">
              <SparklesIcon className="h-4 w-4 text-blue-500" />
              <span>Powered by AI</span>
            </div>
          </div>
        </footer>
      </div>

      {/* AI Assistant Panel */}
      <AIAssistant
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
        currentModule={currentModule}
      />
    </div>
  );
};

export default DashboardLayout;
