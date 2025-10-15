'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MicrophoneIcon,
  StopIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  SparklesIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { DASHBOARD_CONFIG } from '../../config/dashboard.config';
import { useAI } from '../../hooks/useAI';

// Type declarations for Web Speech API (extending existing types)

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface VoiceCommand {
  id: string;
  pattern: string;
  description: string;
  action: string;
  parameters?: string[];
  examples: string[];
}

interface VoiceCommandsProps {
  isActive: boolean;
  onToggle: () => void;
  onCommandExecuted?: (command: string, result: any) => void;
}

const VoiceCommands: React.FC<VoiceCommandsProps> = ({
  isActive,
  onToggle,
  onCommandExecuted,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [lastCommand, setLastCommand] = useState<string>('');
  const [commandResult, setCommandResult] = useState<any>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volume, setVolume] = useState(0);
  const [error, setError] = useState<string>('');

  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const animationFrameRef = useRef<number>();
  const { generateResponse, isLoading } = useAI();

  // Voice commands configuration
  const voiceCommands: VoiceCommand[] = [
    {
      id: 'navigate',
      pattern: '(go to|navigate to|open) (dashboard|analytics|contacts|calendar|settings)',
      description: 'Navigate to different sections',
      action: 'navigate',
      examples: ['Go to dashboard', 'Open analytics', 'Navigate to contacts'],
    },
    {
      id: 'search',
      pattern: 'search (for)? (.+)',
      description: 'Search for information',
      action: 'search',
      parameters: ['query'],
      examples: ['Search for John Doe', 'Search clients in New York'],
    },
    {
      id: 'create',
      pattern: 'create (new)? (contact|event|task|note) (.+)?',
      description: 'Create new items',
      action: 'create',
      parameters: ['type', 'details'],
      examples: ['Create new contact', 'Create event tomorrow at 3pm', 'Create task review proposals'],
    },
    {
      id: 'ai_assist',
      pattern: '(hey ai|ai help|ask ai) (.+)',
      description: 'Ask AI assistant for help',
      action: 'ai_assist',
      parameters: ['query'],
      examples: ['Hey AI, analyze sales data', 'Ask AI about best practices', 'AI help with scheduling'],
    },
    {
      id: 'filter',
      pattern: '(show|filter) (only)? (.+)',
      description: 'Filter data and content',
      action: 'filter',
      parameters: ['criteria'],
      examples: ['Show only urgent tasks', 'Filter contacts by company', 'Show this month\'s data'],
    },
    {
      id: 'export',
      pattern: 'export (.+) (as|to) (pdf|excel|csv)',
      description: 'Export data in various formats',
      action: 'export',
      parameters: ['data', 'format'],
      examples: ['Export contacts as PDF', 'Export sales data to Excel'],
    },
    {
      id: 'schedule',
      pattern: 'schedule (meeting|call|appointment) (.+)',
      description: 'Schedule calendar events',
      action: 'schedule',
      parameters: ['type', 'details'],
      examples: ['Schedule meeting with team tomorrow', 'Schedule call with client at 2pm'],
    },
    {
      id: 'help',
      pattern: '(help|what can you do|commands)',
      description: 'Show available commands',
      action: 'help',
      examples: ['Help', 'What can you do?', 'Show commands'],
    },
  ];

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      if (recognitionRef.current) {
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = DASHBOARD_CONFIG.FEATURES.VOICE_COMMANDS.LANGUAGE;

        recognitionRef.current.onstart = () => {
          setIsListening(true);
          setError('');
        };

        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          let finalTranscript = '';
          let interimTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript;
            } else {
              interimTranscript += transcript;
            }
          }

          setTranscript(interimTranscript || finalTranscript);

          if (finalTranscript) {
            processVoiceCommand(finalTranscript.toLowerCase().trim());
          }
        };

        recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
          setError(`Speech recognition error: ${event.error}`);
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
          setTranscript('');
        };
      }
    }

    // Initialize speech synthesis
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Process voice command
  const processVoiceCommand = useCallback(async (command: string) => {
    setIsProcessing(true);
    setLastCommand(command);

    try {
      // Find matching command
      const matchedCommand = findMatchingCommand(command);
      
      if (matchedCommand) {
        const result = await executeCommand(matchedCommand, command);
        setCommandResult(result);
        
        // Provide voice feedback
        speak(result.message || 'Command executed successfully');
        
        // Notify parent component
        onCommandExecuted?.(command, result);
      } else {
        // Use AI to interpret unknown commands
        if (DASHBOARD_CONFIG.AI_SERVICES.OPENAI.ENABLED) {
          const aiResponse = await generateResponse({
            prompt: `Interpret this voice command and suggest an action: "${command}"`
          });
          
          const result = {
            success: false,
            message: `I didn't understand that command. ${aiResponse || 'Try rephrasing or say "help" for available commands.'}`,
            suggestion: aiResponse,
          };
          
          setCommandResult(result);
          speak(result.message);
        } else {
          const result = {
            success: false,
            message: 'Command not recognized. Say "help" for available commands.',
          };
          setCommandResult(result);
          speak(result.message);
        }
      }
    } catch (error) {
      const result = {
        success: false,
        message: 'Error processing command. Please try again.',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
      setCommandResult(result);
      speak(result.message);
    } finally {
      setIsProcessing(false);
    }
  }, [generateResponse, onCommandExecuted]);

  // Find matching command pattern
  const findMatchingCommand = (input: string): VoiceCommand | null => {
    for (const command of voiceCommands) {
      const regex = new RegExp(command.pattern, 'i');
      if (regex.test(input)) {
        return command;
      }
    }
    return null;
  };

  // Execute matched command
  const executeCommand = async (command: VoiceCommand, input: string): Promise<any> => {
    const regex = new RegExp(command.pattern, 'i');
    const matches = input.match(regex);

    switch (command.action) {
      case 'navigate':
        const section = matches?.[2]?.toLowerCase();
        return {
          success: true,
          action: 'navigate',
          target: section,
          message: `Navigating to ${section}`,
        };

      case 'search':
        const query = matches?.[2];
        return {
          success: true,
          action: 'search',
          query: query,
          message: `Searching for ${query}`,
        };

      case 'create':
        const type = matches?.[2];
        const details = matches?.[3];
        return {
          success: true,
          action: 'create',
          type: type,
          details: details,
          message: `Creating new ${type}${details ? ` with details: ${details}` : ''}`,
        };

      case 'ai_assist':
        const aiQuery = matches?.[2];
        if (DASHBOARD_CONFIG.AI_SERVICES.OPENAI.ENABLED) {
          const aiResponse = await generateResponse({
            prompt: aiQuery || 'Please provide assistance'
          });
          return {
            success: true,
            action: 'ai_assist',
            query: aiQuery,
            response: aiResponse,
            message: aiResponse || 'AI assistance provided',
          };
        } else {
          return {
            success: false,
            message: 'AI services are not available',
          };
        }

      case 'filter':
        const criteria = matches?.[3];
        return {
          success: true,
          action: 'filter',
          criteria: criteria,
          message: `Filtering by ${criteria}`,
        };

      case 'export':
        const dataType = matches?.[1];
        const format = matches?.[3];
        return {
          success: true,
          action: 'export',
          dataType: dataType,
          format: format,
          message: `Exporting ${dataType} as ${format}`,
        };

      case 'schedule':
        const eventType = matches?.[1];
        const eventDetails = matches?.[2];
        return {
          success: true,
          action: 'schedule',
          eventType: eventType,
          details: eventDetails,
          message: `Scheduling ${eventType}: ${eventDetails}`,
        };

      case 'help':
        return {
          success: true,
          action: 'help',
          commands: voiceCommands.map(cmd => ({
            description: cmd.description,
            examples: cmd.examples,
          })),
          message: 'Here are the available voice commands',
        };

      default:
        return {
          success: false,
          message: 'Unknown command action',
        };
    }
  };

  // Text-to-speech
  const speak = (text: string) => {
    if (synthRef.current) {
      synthRef.current.cancel(); // Cancel any ongoing speech
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      synthRef.current.speak(utterance);
    }
  };

  // Start/stop listening
  const toggleListening = () => {
    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.stop();
      } else {
        recognitionRef.current.start();
      }
    }
  };

  // Stop speaking
  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  // Get status icon
  const getStatusIcon = () => {
    if (isProcessing) return SparklesIcon;
    if (commandResult?.success) return CheckCircleIcon;
    if (commandResult?.success === false) return ExclamationCircleIcon;
    return InformationCircleIcon;
  };

  const StatusIcon = getStatusIcon();

  return (
    <div className="relative">
      {/* Main Voice Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleListening}
        disabled={!DASHBOARD_CONFIG.FEATURES.VOICE_COMMANDS.ENABLED}
        className={`
          relative p-3 rounded-full shadow-lg transition-all duration-300
          ${isListening
            ? 'bg-red-500 text-white animate-pulse'
            : isProcessing
            ? 'bg-blue-500 text-white'
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
          }
          ${!DASHBOARD_CONFIG.FEATURES.VOICE_COMMANDS.ENABLED ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <AnimatePresence mode="wait">
          {isListening ? (
            <motion.div
              key="listening"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <StopIcon className="w-6 h-6" />
            </motion.div>
          ) : isProcessing ? (
            <motion.div
              key="processing"
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              exit={{ scale: 0 }}
              transition={{ rotate: { repeat: Infinity, duration: 1 } }}
            >
              <SparklesIcon className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <MicrophoneIcon className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Volume Indicator */}
        {isListening && (
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-white/30"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        )}
      </motion.button>

      {/* Voice Command Panel */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute bottom-full mb-4 right-0 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <MicrophoneIcon className="w-5 h-5 text-blue-500 mr-2" />
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Voice Commands
                </h3>
              </div>
              
              {isSpeaking && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={stopSpeaking}
                  className="p-1 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <SpeakerXMarkIcon className="w-5 h-5" />
                </motion.button>
              )}
            </div>

            {/* Status */}
            <div className="mb-4">
              {isListening && (
                <div className="flex items-center text-green-600 dark:text-green-400 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2" />
                  <span className="text-sm">Listening...</span>
                </div>
              )}

              {transcript && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-3">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    "{transcript}"
                  </p>
                </div>
              )}

              {isProcessing && (
                <div className="flex items-center text-blue-600 dark:text-blue-400 mb-2">
                  <SparklesIcon className="w-4 h-4 animate-spin mr-2" />
                  <span className="text-sm">Processing command...</span>
                </div>
              )}

              {commandResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`
                    flex items-start p-3 rounded-lg mb-3
                    ${commandResult.success
                      ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                      : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                    }
                  `}
                >
                  <StatusIcon className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {commandResult.message}
                    </p>
                    {lastCommand && (
                      <p className="text-xs mt-1 opacity-75">
                        Command: "{lastCommand}"
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {error && (
                <div className="flex items-start p-3 rounded-lg mb-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300">
                  <ExclamationCircleIcon className="w-5 h-5 mr-2 mt-0.5" />
                  <p className="text-sm">{error}</p>
                </div>
              )}
            </div>

            {/* Quick Commands */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Try saying:
              </h4>
              <div className="space-y-1">
                {voiceCommands.slice(0, 4).map(command => (
                  <div
                    key={command.id}
                    className="text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded px-2 py-1"
                  >
                    "{command.examples[0]}"
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>
                  {DASHBOARD_CONFIG.FEATURES.VOICE_COMMANDS.ENABLED
                    ? 'Voice commands enabled'
                    : 'Voice commands disabled'
                  }
                </span>
                {isSpeaking && (
                  <div className="flex items-center">
                    <SpeakerWaveIcon className="w-4 h-4 mr-1" />
                    <span>Speaking...</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VoiceCommands;
