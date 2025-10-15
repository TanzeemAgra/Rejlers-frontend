/**
 * Server-side OpenAI API Route for REJLERS Frontend
 * =================================================
 * 
 * Secure server-side OpenAI integration using Next.js API routes
 * Handles sensitive operations that should not expose API keys to client
 * 
 * Security Features:
 * - Server-side API key handling
 * - Request validation and sanitization
 * - Rate limiting protection
 * - Error handling and logging
 */

import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Lazy initialization function for OpenAI client
function getOpenAIClient(): OpenAI {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI API key is not configured');
  }
  
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORGANIZATION,
  });
}

/**
 * Request validation interface
 */
interface AIRequest {
  prompt: string;
  type?: 'completion' | 'analysis';
  analysisType?: 'sentiment' | 'summary' | 'keywords' | 'general';
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

/**
 * Validate and sanitize request data
 */
function validateRequest(data: any): { isValid: boolean; error?: string; validated?: AIRequest } {
  if (!data.prompt || typeof data.prompt !== 'string') {
    return { isValid: false, error: 'Prompt is required and must be a string' };
  }

  if (data.prompt.trim().length === 0) {
    return { isValid: false, error: 'Prompt cannot be empty' };
  }

  if (data.prompt.length > 8000) {
    return { isValid: false, error: 'Prompt too long. Maximum 8000 characters allowed' };
  }

  const validated: AIRequest = {
    prompt: data.prompt.trim(),
    type: data.type || 'completion',
    analysisType: data.analysisType || 'general',
    model: data.model || 'gpt-4',
    maxTokens: Math.min(data.maxTokens || 2000, 4000),
    temperature: Math.max(0, Math.min(data.temperature || 0.7, 1)),
  };

  return { isValid: true, validated };
}

/**
 * Check if OpenAI service is properly configured
 */
function isOpenAIConfigured(): boolean {
  const apiKey = process.env.OPENAI_API_KEY;
  return !!(apiKey && apiKey.startsWith('sk-'));
}

/**
 * POST handler for OpenAI requests
 */
export async function POST(request: NextRequest) {
  try {
    // Check if OpenAI is configured
    if (!isOpenAIConfigured()) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'OpenAI service is not properly configured' 
        },
        { status: 500 }
      );
    }

    // Parse request body
    const body = await request.json();
    
    // Validate request
    const validation = validateRequest(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { 
          success: false, 
          error: validation.error 
        },
        { status: 400 }
      );
    }

    const { validated } = validation;

    // Prepare prompt based on type
    let finalPrompt = validated!.prompt;
    
    if (validated!.type === 'analysis') {
      const analysisPrompts: { [key: string]: string } = {
        sentiment: `Analyze the sentiment of the following text and provide a brief assessment:\n\n${validated!.prompt}`,
        summary: `Provide a concise summary of the following text:\n\n${validated!.prompt}`,
        keywords: `Extract key terms and concepts from the following text:\n\n${validated!.prompt}`,
        general: `Analyze the following text and provide insights:\n\n${validated!.prompt}`,
      };
      
      finalPrompt = analysisPrompts[validated!.analysisType!] || analysisPrompts.general;
    }

    // Make OpenAI API request
    console.log('Processing OpenAI request:', {
      type: validated!.type,
      model: validated!.model,
      tokensRequested: validated!.maxTokens
    });

    const openai = getOpenAIClient();
    const completion = await openai.chat.completions.create({
      model: validated!.model!,
      messages: [
        {
          role: 'user',
          content: finalPrompt,
        },
      ],
      max_tokens: validated!.maxTokens!,
      temperature: validated!.temperature!,
    });

    // Format successful response
    const result = {
      success: true,
      content: completion.choices[0]?.message?.content || '',
      usage: {
        promptTokens: completion.usage?.prompt_tokens || 0,
        completionTokens: completion.usage?.completion_tokens || 0,
        totalTokens: completion.usage?.total_tokens || 0,
      },
      model: completion.model,
      type: validated!.type,
    };

    console.log('OpenAI request successful. Tokens used:', result.usage.totalTokens);

    return NextResponse.json(result);

  } catch (error: any) {
    console.error('OpenAI API error:', error);
    
    // Handle specific OpenAI errors
    let errorMessage = 'An unexpected error occurred';
    let statusCode = 500;
    
    if (error?.error?.type === 'invalid_request_error') {
      errorMessage = 'Invalid request to OpenAI API';
      statusCode = 400;
    } else if (error?.error?.code === 'rate_limit_exceeded') {
      errorMessage = 'OpenAI rate limit exceeded. Please try again later.';
      statusCode = 429;
    } else if (error?.error?.code === 'insufficient_quota') {
      errorMessage = 'OpenAI quota exceeded. Please check billing.';
      statusCode = 402;
    } else if (error?.error?.code === 'invalid_api_key') {
      errorMessage = 'Invalid OpenAI API key configuration';
      statusCode = 401;
    }

    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage 
      },
      { status: statusCode }
    );
  }
}

/**
 * GET handler for service status
 */
export async function GET() {
  try {
    const status = {
      service: 'OpenAI API',
      configured: isOpenAIConfigured(),
      model: process.env.OPENAI_MODEL || 'gpt-4',
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(status);
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Failed to get service status' 
      },
      { status: 500 }
    );
  }
}
