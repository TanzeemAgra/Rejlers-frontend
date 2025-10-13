/**
 * Agentic AI Hook
 * Provides autonomous AI agent capabilities for complex business workflows
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { DASHBOARD_CONFIG, AGENTIC_WORKFLOWS } from '@/config/dashboard.config';
import { useAI } from './useAI';

// Types
interface AgentStep {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'skipped';
  input?: any;
  output?: any;
  error?: string;
  timestamp: Date;
  processingTime?: number;
}

interface WorkflowExecution {
  id: string;
  type: string;
  status: 'initialized' | 'running' | 'completed' | 'failed' | 'cancelled';
  steps: AgentStep[];
  result?: any;
  confidence: number;
  totalProcessingTime: number;
  metadata: {
    startTime: Date;
    endTime?: Date;
    iterations: number;
    context?: any;
  };
}

interface AgentWorkflow {
  type: keyof typeof AGENTIC_WORKFLOWS;
  steps: string[];
  maxIterations: number;
  decisionThreshold: number;
}

interface ExecuteWorkflowRequest {
  type: keyof typeof AGENTIC_WORKFLOWS;
  input: any;
  context?: any;
  customSteps?: string[];
  maxIterations?: number;
}

interface WorkflowResult {
  workflowType: string;
  result: string;
  confidence: number;
  steps: AgentStep[];
  metadata: any;
}

// Agent Executor Class
class AgentExecutor {
  private aiGenerator: (request: any) => Promise<string>;

  constructor(aiGenerator: (request: any) => Promise<string>) {
    this.aiGenerator = aiGenerator;
  }

  async executeWorkflow(request: ExecuteWorkflowRequest): Promise<WorkflowExecution> {
    const workflowConfig = AGENTIC_WORKFLOWS[request.type];
    const executionId = `execution-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const execution: WorkflowExecution = {
      id: executionId,
      type: request.type,
      status: 'initialized',
      steps: [],
      confidence: 0,
      totalProcessingTime: 0,
      metadata: {
        startTime: new Date(),
        iterations: 0,
        context: request.context
      }
    };

    try {
      execution.status = 'running';
      
      // Initialize steps
      const stepNames = request.customSteps || workflowConfig.steps;
      execution.steps = stepNames.map((stepName, index) => ({
        id: `step-${index}`,
        name: stepName,
        description: this.getStepDescription(stepName),
        status: 'pending',
        timestamp: new Date()
      }));

      // Execute each step
      let currentContext = { ...request.context, input: request.input };
      let overallConfidence = 0;
      const maxIterations = request.maxIterations || workflowConfig.max_iterations;

      for (let iteration = 0; iteration < maxIterations; iteration++) {
        execution.metadata.iterations = iteration + 1;
        let stepConfidences: number[] = [];

        for (const step of execution.steps) {
          if (step.status !== 'pending') continue;

          const stepStartTime = Date.now();
          step.status = 'running';

          try {
            const stepResult = await this.executeStep(step, currentContext);
            
            step.output = stepResult.output;
            step.status = 'completed';
            step.processingTime = Date.now() - stepStartTime;
            
            // Update context for next step
            currentContext = {
              ...currentContext,
              [`${step.name}_result`]: stepResult.output,
              previousStep: step.name
            };

            stepConfidences.push(stepResult.confidence || 0.8);

          } catch (error) {
            step.error = error instanceof Error ? error.message : 'Unknown error';
            step.status = 'failed';
            step.processingTime = Date.now() - stepStartTime;
            
            console.error(`Step ${step.name} failed:`, error);
            
            // Decide whether to continue or fail the workflow
            if (this.isCriticalStep(step.name)) {
              throw error;
            } else {
              step.status = 'skipped';
              stepConfidences.push(0.3); // Low confidence for failed non-critical steps
            }
          }
        }

        // Calculate iteration confidence
        const iterationConfidence = stepConfidences.length > 0 
          ? stepConfidences.reduce((sum, conf) => sum + conf, 0) / stepConfidences.length 
          : 0;

        overallConfidence = Math.max(overallConfidence, iterationConfidence);

        // Check if we've reached the decision threshold
        if (iterationConfidence >= workflowConfig.decision_threshold) {
          break;
        }

        // Reset pending steps for next iteration if needed
        if (iteration < maxIterations - 1 && iterationConfidence < workflowConfig.decision_threshold) {
          execution.steps.forEach(step => {
            if (step.status === 'failed') {
              step.status = 'pending';
              step.error = undefined;
            }
          });
        }
      }

      // Generate final result
      execution.result = await this.generateFinalResult(execution, currentContext);
      execution.confidence = overallConfidence;
      execution.status = 'completed';
      execution.metadata.endTime = new Date();
      execution.totalProcessingTime = execution.metadata.endTime.getTime() - execution.metadata.startTime.getTime();

    } catch (error) {
      execution.status = 'failed';
      execution.result = {
        error: error instanceof Error ? error.message : 'Workflow execution failed',
        partialResults: execution.steps.filter(step => step.output).map(step => ({
          step: step.name,
          result: step.output
        }))
      };
      execution.metadata.endTime = new Date();
      execution.totalProcessingTime = execution.metadata.endTime.getTime() - execution.metadata.startTime.getTime();
    }

    return execution;
  }

  private async executeStep(step: AgentStep, context: any): Promise<{ output: any; confidence: number }> {
    const systemPrompt = `You are an AI agent executing the "${step.name}" step in a business workflow. 
    Focus on providing actionable and specific results based on the given context.
    Be analytical and provide concrete recommendations or findings.`;

    const prompt = `Execute step: ${step.name}
    
    Description: ${step.description}
    
    Context: ${JSON.stringify(context, null, 2)}
    
    Please provide a detailed analysis and specific recommendations for this step.
    Focus on actionable insights and clear next steps.`;

    try {
      const response = await this.aiGenerator({
        prompt,
        systemPrompt,
        mode: 'analysis',
        context
      });

      // Parse response and extract confidence
      const confidence = this.extractConfidence(response);
      
      return {
        output: response,
        confidence
      };

    } catch (error) {
      throw new Error(`Failed to execute step ${step.name}: ${error}`);
    }
  }

  private getStepDescription(stepName: string): string {
    const descriptions: { [key: string]: string } = {
      'analyze_requirements': 'Analyze and understand the requirements and constraints',
      'identify_constraints': 'Identify technical, business, and resource constraints',
      'generate_solutions': 'Generate multiple solution alternatives',
      'evaluate_options': 'Evaluate and compare different solution options',
      'recommend_action': 'Recommend the best course of action',
      'identify_risks': 'Identify potential risks and threats',
      'assess_probability': 'Assess the probability of identified risks',
      'calculate_impact': 'Calculate the potential impact of risks',
      'develop_mitigation': 'Develop risk mitigation strategies',
      'prioritize_actions': 'Prioritize actions based on risk assessment',
      'analyze_capacity': 'Analyze current capacity and capabilities',
      'forecast_demand': 'Forecast future demand and requirements',
      'optimize_allocation': 'Optimize resource allocation strategies',
      'validate_feasibility': 'Validate the feasibility of proposed solutions',
      'generate_plan': 'Generate detailed implementation plan'
    };

    return descriptions[stepName] || `Execute ${stepName.replace(/_/g, ' ')}`;
  }

  private isCriticalStep(stepName: string): boolean {
    const criticalSteps = ['analyze_requirements', 'validate_feasibility', 'generate_plan'];
    return criticalSteps.includes(stepName);
  }

  private extractConfidence(response: string): number {
    // Simple confidence extraction based on response characteristics
    const confidenceKeywords = {
      high: ['confident', 'certain', 'strong evidence', 'clearly', 'definitely'],
      medium: ['likely', 'probable', 'suggests', 'indicates', 'appears'],
      low: ['uncertain', 'unclear', 'possibly', 'might', 'could be']
    };

    const lowercaseResponse = response.toLowerCase();
    
    let highCount = 0;
    let mediumCount = 0;
    let lowCount = 0;

    confidenceKeywords.high.forEach(keyword => {
      if (lowercaseResponse.includes(keyword)) highCount++;
    });
    
    confidenceKeywords.medium.forEach(keyword => {
      if (lowercaseResponse.includes(keyword)) mediumCount++;
    });
    
    confidenceKeywords.low.forEach(keyword => {
      if (lowercaseResponse.includes(keyword)) lowCount++;
    });

    if (highCount > lowCount && highCount > mediumCount) return 0.9;
    if (lowCount > highCount && lowCount > mediumCount) return 0.4;
    return 0.7; // Default medium confidence
  }

  private async generateFinalResult(execution: WorkflowExecution, context: any): Promise<string> {
    const completedSteps = execution.steps.filter(step => step.status === 'completed');
    const stepResults = completedSteps.map(step => `${step.name}: ${step.output}`).join('\n\n');

    const systemPrompt = `You are an AI agent summarizing the results of a ${execution.type} workflow. 
    Provide a clear, actionable summary of findings and recommendations based on all completed steps.`;

    const prompt = `Summarize the workflow execution results:

    Workflow Type: ${execution.type}
    Completed Steps: ${completedSteps.length}/${execution.steps.length}
    
    Step Results:
    ${stepResults}
    
    Provide a comprehensive summary with:
    1. Key findings
    2. Recommendations
    3. Next steps
    4. Risk considerations (if applicable)`;

    return await this.aiGenerator({
      prompt,
      systemPrompt,
      mode: 'analysis',
      context
    });
  }
}

// Agentic AI Hook
export const useAgenticAI = () => {
  const [isExecuting, setIsExecuting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [workflows, setWorkflows] = useState<WorkflowExecution[]>([]);
  const [activeWorkflow, setActiveWorkflow] = useState<WorkflowExecution | null>(null);

  const { generateResponse } = useAI();
  const executorRef = useRef<AgentExecutor | null>(null);

  // Initialize agent executor
  useEffect(() => {
    if (DASHBOARD_CONFIG.AI_SERVICES.AGENTIC_AI.ENABLED) {
      executorRef.current = new AgentExecutor(generateResponse);
    }
  }, [generateResponse]);

  // Execute workflow
  const executeWorkflow = useCallback(async (request: ExecuteWorkflowRequest): Promise<WorkflowResult> => {
    if (!executorRef.current) {
      throw new Error('Agentic AI is not enabled or initialized');
    }

    setIsExecuting(true);
    setError(null);

    try {
      const execution = await executorRef.current.executeWorkflow(request);
      
      setActiveWorkflow(execution);
      setWorkflows(prev => [execution, ...prev].slice(0, 10)); // Keep last 10 workflows

      return {
        workflowType: execution.type,
        result: typeof execution.result === 'string' ? execution.result : JSON.stringify(execution.result),
        confidence: execution.confidence,
        steps: execution.steps,
        metadata: execution.metadata
      };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Agentic AI execution error';
      setError(errorMessage);
      throw error;
    } finally {
      setIsExecuting(false);
    }
  }, []);

  // Get workflow by ID
  const getWorkflow = useCallback((workflowId: string): WorkflowExecution | null => {
    return workflows.find(workflow => workflow.id === workflowId) || null;
  }, [workflows]);

  // Cancel active workflow
  const cancelWorkflow = useCallback(() => {
    if (activeWorkflow && activeWorkflow.status === 'running') {
      setActiveWorkflow(prev => prev ? { ...prev, status: 'cancelled' } : null);
    }
  }, [activeWorkflow]);

  // Clear workflow history
  const clearWorkflows = useCallback(() => {
    setWorkflows([]);
    setActiveWorkflow(null);
    setError(null);
  }, []);

  // Get available workflow templates
  const getAvailableWorkflows = useCallback(() => {
    return Object.keys(AGENTIC_WORKFLOWS).map(key => ({
      type: key as keyof typeof AGENTIC_WORKFLOWS,
      config: AGENTIC_WORKFLOWS[key as keyof typeof AGENTIC_WORKFLOWS],
      description: getWorkflowDescription(key)
    }));
  }, []);

  return {
    // State
    isExecuting,
    error,
    workflows,
    activeWorkflow,

    // Methods
    executeWorkflow,
    getWorkflow,
    cancelWorkflow,
    clearWorkflows,
    getAvailableWorkflows,

    // Configuration
    isEnabled: DASHBOARD_CONFIG.AI_SERVICES.AGENTIC_AI.ENABLED,
    maxIterations: DASHBOARD_CONFIG.AI_SERVICES.AGENTIC_AI.MAX_ITERATIONS,
    autoExecute: DASHBOARD_CONFIG.AI_SERVICES.AGENTIC_AI.AUTO_EXECUTE
  };
};

// Helper function to get workflow descriptions
function getWorkflowDescription(workflowType: string): string {
  const descriptions: { [key: string]: string } = {
    'PROJECT_OPTIMIZATION': 'Optimizes project parameters for better performance and efficiency',
    'RISK_ASSESSMENT': 'Conducts comprehensive risk analysis and mitigation planning',
    'RESOURCE_PLANNING': 'Plans and optimizes resource allocation across projects'
  };

  return descriptions[workflowType] || `Execute ${workflowType.replace(/_/g, ' ').toLowerCase()} workflow`;
}