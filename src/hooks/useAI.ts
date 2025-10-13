/**
 * AI Hooks - Core AI functionality for the dashboard
 * Provides OpenAI integration with advanced features
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { DASHBOARD_CONFIG } from '@/config/dashboard.config';

// Types
interface AIRequest {
  prompt: string;
  context?: any;
  systemPrompt?: string;
  mode?: 'chat' | 'completion' | 'analysis' | 'rag';
  maxTokens?: number;
  temperature?: number;
}

interface AIResponse {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  metadata?: {
    model: string;
    processingTime: number;
    confidence?: number;
  };
}

interface AIInsight {
  id: string;
  type: 'recommendation' | 'alert' | 'trend' | 'optimization';
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  module?: string;
  timestamp: Date;
  actions?: Array<{
    label: string;
    action: string;
    type: 'primary' | 'secondary';
  }>;
}

// OpenAI API Client
class OpenAIClient {
  private apiKey: string;
  private baseURL: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.baseURL = 'https://api.openai.com/v1';
  }

  async chat(request: AIRequest): Promise<AIResponse> {
    const startTime = Date.now();
    
    try {
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: DASHBOARD_CONFIG.AI_SERVICES.OPENAI.MODEL,
          messages: [
            ...(request.systemPrompt ? [{
              role: 'system',
              content: request.systemPrompt
            }] : []),
            {
              role: 'user',
              content: `${request.prompt}${request.context ? `\n\nContext: ${JSON.stringify(request.context)}` : ''}`
            }
          ],
          max_tokens: request.maxTokens || DASHBOARD_CONFIG.AI_SERVICES.OPENAI.MAX_TOKENS,
          temperature: request.temperature || DASHBOARD_CONFIG.AI_SERVICES.OPENAI.TEMPERATURE,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const processingTime = Date.now() - startTime;

      return {
        content: data.choices[0]?.message?.content || '',
        usage: data.usage,
        metadata: {
          model: data.model,
          processingTime,
          confidence: this.calculateConfidence(data.choices[0]?.finish_reason)
        }
      };
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw error;
    }
  }

  private calculateConfidence(finishReason?: string): number {
    switch (finishReason) {
      case 'stop': return 0.95;
      case 'length': return 0.8;
      case 'content_filter': return 0.3;
      default: return 0.7;
    }
  }
}

// Main AI Hook
export const useAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const clientRef = useRef<OpenAIClient | null>(null);

  // Initialize OpenAI client
  useEffect(() => {
    if (DASHBOARD_CONFIG.AI_SERVICES.OPENAI.ENABLED && DASHBOARD_CONFIG.AI_SERVICES.OPENAI.API_KEY) {
      clientRef.current = new OpenAIClient(DASHBOARD_CONFIG.AI_SERVICES.OPENAI.API_KEY);
    }
  }, []);

  // Generate AI response
  const generateResponse = useCallback(async (request: AIRequest): Promise<string> => {
    if (!clientRef.current) {
      throw new Error('OpenAI client not initialized. Please check your API key.');
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await clientRef.current.chat(request);
      return response.content;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown AI error';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Generate insights
  const generateInsight = useCallback(async (params: {
    type: string;
    query: string;
    context?: any;
  }): Promise<AIInsight[]> => {
    if (!clientRef.current) return [];

    try {
      const systemPrompt = `You are an AI business analyst for ${DASHBOARD_CONFIG.COMPANY.NAME}. 
      Generate actionable insights based on the user's query and context. 
      Focus on practical recommendations that can improve business performance.
      Respond in JSON format with insights array.`;

      const response = await generateResponse({
        prompt: `Analyze: ${params.query}`,
        context: params.context,
        systemPrompt,
        mode: 'analysis'
      });

      // Parse AI response to extract insights
      const newInsights: AIInsight[] = [{
        id: `insight-${Date.now()}`,
        type: 'recommendation',
        title: 'AI Recommendation',
        content: response,
        priority: 'medium',
        timestamp: new Date(),
        actions: [
          { label: 'View Details', action: 'view_details', type: 'primary' },
          { label: 'Dismiss', action: 'dismiss', type: 'secondary' }
        ]
      }];

      setInsights(prev => [...newInsights, ...prev].slice(0, 10)); // Keep last 10 insights
      return newInsights;

    } catch (error) {
      console.error('Insight generation error:', error);
      return [];
    }
  }, [generateResponse]);

  // Smart analysis based on data
  const analyzeData = useCallback(async (data: any, analysisType: string): Promise<string> => {
    const systemPrompt = `You are a data analyst for ${DASHBOARD_CONFIG.COMPANY.NAME}. 
    Analyze the provided data and give insights about ${analysisType}.
    Focus on trends, anomalies, and actionable recommendations.`;

    return generateResponse({
      prompt: `Please analyze this ${analysisType} data and provide insights:`,
      context: { data, type: analysisType },
      systemPrompt,
      mode: 'analysis'
    });
  }, [generateResponse]);

  // Clear insights
  const clearInsights = useCallback(() => {
    setInsights([]);
  }, []);

  // Remove specific insight
  const removeInsight = useCallback((insightId: string) => {
    setInsights(prev => prev.filter(insight => insight.id !== insightId));
  }, []);

  return {
    // State
    isLoading,
    error,
    insights,
    isProcessing: isLoading,
    aiInsights: insights,

    // Methods
    generateResponse,
    generateInsight,
    analyzeData,
    clearInsights,
    removeInsight,

    // Configuration
    isEnabled: DASHBOARD_CONFIG.AI_SERVICES.OPENAI.ENABLED,
    model: DASHBOARD_CONFIG.AI_SERVICES.OPENAI.MODEL
  };
};