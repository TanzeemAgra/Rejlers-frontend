/**
 * AI Assistant Component
 * Advanced AI-powered assistant with RAG and Agentic AI capabilities
 */

'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XMarkIcon,
  PaperAirplaneIcon,
  MicrophoneIcon,
  DocumentTextIcon,
  ChartBarIcon,
  CogIcon,
  SparklesIcon,
  BoltIcon,
  LightBulbIcon,
  ClockIcon,
  UserIcon,
  ComputerDesktopIcon
} from '@heroicons/react/24/outline';

import { DASHBOARD_CONFIG, RAG_TEMPLATES, AGENTIC_WORKFLOWS } from '@/config/dashboard.config';
import { useAI } from '../../hooks/useAI';
import { useRAG } from '../../hooks/useRAG';
import { useAgenticAI } from '../../hooks/useAgenticAI';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    sources?: string[];
    confidence?: number;
    processingTime?: number;
    ragUsed?: boolean;
    agenticWorkflow?: string;
  };
}

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  currentModule?: string;
}

const AIAssistant: React.FC<AIAssistantProps> = ({
  isOpen,
  onClose,
  currentModule = 'dashboard'
}) => {
  // State Management
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [selectedMode, setSelectedMode] = useState<'chat' | 'rag' | 'agentic'>('chat');

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Custom Hooks
  const { generateResponse, isLoading: aiLoading } = useAI();
  const { searchDocuments, isSearching } = useRAG();
  const { executeWorkflow, isExecuting, workflows } = useAgenticAI();

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Initialize welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: 'welcome',
        type: 'assistant',
        content: `Hello! I'm your AI assistant for ${DASHBOARD_CONFIG.COMPANY.NAME}. I can help you with:\n\n• **Smart Analysis** - Ask questions about your business data\n• **Document Search** - Find information using RAG technology\n• **Automated Workflows** - Execute complex business processes\n• **Insights Generation** - Get AI-powered recommendations\n\nWhat would you like to explore today?`,
        timestamp: new Date(),
        metadata: { confidence: 1.0 }
      }]);
    }
  }, [isOpen, messages.length]);

  // Handle message sending
  const sendMessage = useCallback(async () => {
    if (!inputValue.trim() || isProcessing) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsProcessing(true);

    try {
      let response = '';
      let metadata = {};
      const startTime = Date.now();

      switch (selectedMode) {
        case 'rag':
          // RAG-powered response
          const searchResults = await searchDocuments({
            query: userMessage.content,
            module: currentModule,
            template: RAG_TEMPLATES.DOCUMENT_ANALYSIS
          });

          response = await generateResponse({
            prompt: userMessage.content,
            context: searchResults.documents,
            systemPrompt: RAG_TEMPLATES.DOCUMENT_ANALYSIS.system_prompt,
            mode: 'rag'
          });

          metadata = {
            sources: searchResults.sources,
            confidence: searchResults.confidence,
            ragUsed: true,
            processingTime: Date.now() - startTime
          };
          break;

        case 'agentic':
          // Agentic AI workflow
          const workflowResult = await executeWorkflow({
            type: 'PROJECT_OPTIMIZATION',
            input: userMessage.content,
            context: { module: currentModule }
          });

          response = workflowResult.result;
          metadata = {
            agenticWorkflow: workflowResult.workflowType,
            confidence: workflowResult.confidence,
            processingTime: Date.now() - startTime
          };
          break;

        default:
          // Standard AI chat
          response = await generateResponse({
            prompt: userMessage.content,
            context: { module: currentModule },
            mode: 'chat'
          });

          metadata = {
            processingTime: Date.now() - startTime
          };
      }

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        type: 'assistant',
        content: response,
        timestamp: new Date(),
        metadata
      };

      setMessages(prev => [...prev, assistantMessage]);

    } catch (error) {
      console.error('AI Assistant error:', error);
      
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        type: 'assistant',
        content: 'I apologize, but I encountered an error processing your request. Please try again or contact support if the issue persists.',
        timestamp: new Date(),
        metadata: { confidence: 0 }
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  }, [inputValue, isProcessing, selectedMode, currentModule, searchDocuments, executeWorkflow, generateResponse]);

  // Voice input (placeholder for future implementation)
  const startVoiceInput = useCallback(() => {
    setIsListening(true);
    // Implement speech recognition here
    setTimeout(() => {
      setIsListening(false);
      // setInputValue('Voice input recognized text...');
    }, 3000);
  }, []);

  // Suggested prompts based on current module
  const getSuggestedPrompts = useCallback(() => {
    const moduleConfig = DASHBOARD_CONFIG.MODULES[currentModule.toUpperCase() as keyof typeof DASHBOARD_CONFIG.MODULES];
    
    if (!moduleConfig) return [];

    return [
      `Analyze current ${moduleConfig.NAME} performance trends`,
      `Generate insights for ${moduleConfig.NAME} optimization`,
      `Create a report on ${moduleConfig.NAME} metrics`,
      `What are the key KPIs for ${moduleConfig.NAME}?`
    ];
  }, [currentModule]);

  // Handle key press
  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }, [sendMessage]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 400 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 400 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed inset-y-0 right-0 z-50 w-96 bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-700 flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <SparklesIcon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">AI Assistant</h3>
                <p className="text-sm text-blue-100">Powered by GPT-4 & RAG</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Mode Selector */}
          <div className="mt-4 flex space-x-2">
            <button
              onClick={() => setSelectedMode('chat')}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium transition-colors",
                selectedMode === 'chat' 
                  ? "bg-white text-blue-600" 
                  : "bg-white/20 text-white hover:bg-white/30"
              )}
            >
              <ComputerDesktopIcon className="h-3 w-3 inline mr-1" />
              Chat
            </button>
            <button
              onClick={() => setSelectedMode('rag')}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium transition-colors",
                selectedMode === 'rag' 
                  ? "bg-white text-blue-600" 
                  : "bg-white/20 text-white hover:bg-white/30"
              )}
            >
              <DocumentTextIcon className="h-3 w-3 inline mr-1" />
              RAG
            </button>
            <button
              onClick={() => setSelectedMode('agentic')}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium transition-colors",
                selectedMode === 'agentic' 
                  ? "bg-white text-blue-600" 
                  : "bg-white/20 text-white hover:bg-white/30"
              )}
            >
              <BoltIcon className="h-3 w-3 inline mr-1" />
              Agentic
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex",
                message.type === 'user' ? "justify-end" : "justify-start"
              )}
            >
              <div className={cn(
                "max-w-[80%] rounded-lg p-3 space-y-2",
                message.type === 'user'
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
              )}>
                <div className="flex items-start space-x-2">
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                    message.type === 'user'
                      ? "bg-white/20"
                      : "bg-blue-100 dark:bg-blue-900"
                  )}>
                    {message.type === 'user' ? (
                      <UserIcon className="h-4 w-4" />
                    ) : (
                      <SparklesIcon className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="prose prose-sm max-w-none">
                      {message.content.split('\n').map((line, index) => (
                        <p key={index} className={cn(
                          message.type === 'user' ? "text-white" : "text-slate-700 dark:text-slate-300"
                        )}>
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Metadata */}
                {message.metadata && (
                  <div className="mt-2 pt-2 border-t border-white/20 dark:border-slate-700">
                    <div className="flex items-center space-x-4 text-xs opacity-75">
                      {message.metadata.processingTime && (
                        <div className="flex items-center space-x-1">
                          <ClockIcon className="h-3 w-3" />
                          <span>{message.metadata.processingTime}ms</span>
                        </div>
                      )}
                      {message.metadata.confidence && (
                        <div className="flex items-center space-x-1">
                          <ChartBarIcon className="h-3 w-3" />
                          <span>{(message.metadata.confidence * 100).toFixed(0)}%</span>
                        </div>
                      )}
                      {message.metadata.ragUsed && (
                        <div className="flex items-center space-x-1">
                          <DocumentTextIcon className="h-3 w-3" />
                          <span>RAG</span>
                        </div>
                      )}
                      {message.metadata.agenticWorkflow && (
                        <div className="flex items-center space-x-1">
                          <BoltIcon className="h-3 w-3" />
                          <span>Agent</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          
          {/* Processing indicator */}
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {selectedMode === 'rag' ? 'Searching documents...' : 
                     selectedMode === 'agentic' ? 'Executing workflow...' : 
                     'Thinking...'}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts */}
        {messages.length <= 1 && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-700">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Suggested for {currentModule}:
            </h4>
            <div className="space-y-2">
              {getSuggestedPrompts().map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setInputValue(prompt)}
                  className="w-full text-left text-sm p-2 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex space-x-2">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                disabled={isProcessing}
                className="w-full px-4 py-3 pr-12 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <button
                onClick={startVoiceInput}
                disabled={isListening || isProcessing}
                className={cn(
                  "absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-lg transition-colors",
                  isListening 
                    ? "text-red-600 bg-red-50" 
                    : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                )}
              >
                <MicrophoneIcon className="h-5 w-5" />
              </button>
            </div>
            <button
              onClick={sendMessage}
              disabled={!inputValue.trim() || isProcessing}
              className="px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AIAssistant;