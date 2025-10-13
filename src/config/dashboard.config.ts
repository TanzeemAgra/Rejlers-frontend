/**
 * AI-Powered Dashboard Configuration
 * Soft-coded configuration for REJLERS AI Dashboard with advanced AI features
 */

// Dashboard Configuration
export const DASHBOARD_CONFIG = {
  // Company Information
  COMPANY: {
    NAME: process.env.NEXT_PUBLIC_COMPANY_NAME || 'REJLERS',
    FULL_NAME: process.env.NEXT_PUBLIC_COMPANY_FULL_NAME || 'REJLERS AB',
    TAGLINE: process.env.NEXT_PUBLIC_COMPANY_TAGLINE || 'Engineering Excellence Since 1942',
    LOGO_URL: process.env.NEXT_PUBLIC_COMPANY_LOGO || '/images/rejlers-logo.svg',
    PRIMARY_COLOR: process.env.NEXT_PUBLIC_PRIMARY_COLOR || '#0066CC',
    ACCENT_COLOR: process.env.NEXT_PUBLIC_ACCENT_COLOR || '#FF6B35'
  },

  // API Configuration with Railway backend support
  API: {
    BASE_URL: (() => {
      if (process.env.NEXT_PUBLIC_API_BASE_URL) {
        return process.env.NEXT_PUBLIC_API_BASE_URL;
      }
      return process.env.NODE_ENV === 'production' 
        ? 'https://rejlers-backend-production.up.railway.app/api/v1'
        : 'http://localhost:8000/api/v1';
    })(),
    WS_URL: (() => {
      if (process.env.NEXT_PUBLIC_WS_URL) {
        return process.env.NEXT_PUBLIC_WS_URL;
      }
      return process.env.NODE_ENV === 'production'
        ? 'wss://rejlers-backend-production.up.railway.app/ws'
        : 'ws://localhost:8000/ws';
    })(),
    TIMEOUT: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000'),
    RETRY_ATTEMPTS: parseInt(process.env.NEXT_PUBLIC_API_RETRY || '3')
  },

  // AI Services Configuration
  AI_SERVICES: {
    OPENAI: {
      API_KEY: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      MODEL: process.env.NEXT_PUBLIC_OPENAI_MODEL || 'gpt-4',
      MAX_TOKENS: parseInt(process.env.NEXT_PUBLIC_OPENAI_MAX_TOKENS || '2000'),
      TEMPERATURE: parseFloat(process.env.NEXT_PUBLIC_OPENAI_TEMPERATURE || '0.7'),
      ENABLED: !!process.env.NEXT_PUBLIC_OPENAI_API_KEY
    },
    
    // RAG Configuration
    RAG: {
      ENABLED: process.env.NEXT_PUBLIC_RAG_ENABLED === 'true',
      CHUNK_SIZE: parseInt(process.env.NEXT_PUBLIC_RAG_CHUNK_SIZE || '1000'),
      OVERLAP: parseInt(process.env.NEXT_PUBLIC_RAG_OVERLAP || '200'),
      SIMILARITY_THRESHOLD: parseFloat(process.env.NEXT_PUBLIC_RAG_THRESHOLD || '0.8')
    },

    // Agentic AI Configuration
    AGENTIC_AI: {
      ENABLED: process.env.NEXT_PUBLIC_AGENTIC_AI_ENABLED === 'true',
      MAX_ITERATIONS: parseInt(process.env.NEXT_PUBLIC_AGENTIC_MAX_ITERATIONS || '5'),
      TIMEOUT_MS: parseInt(process.env.NEXT_PUBLIC_AGENTIC_TIMEOUT || '60000'),
      AUTO_EXECUTE: process.env.NEXT_PUBLIC_AGENTIC_AUTO_EXECUTE === 'true'
    }
  },

  // Dashboard Layout Configuration
  LAYOUT: {
    SIDEBAR_WIDTH: process.env.NEXT_PUBLIC_SIDEBAR_WIDTH || '280px',
    HEADER_HEIGHT: process.env.NEXT_PUBLIC_HEADER_HEIGHT || '64px',
    FOOTER_HEIGHT: process.env.NEXT_PUBLIC_FOOTER_HEIGHT || '48px',
    CONTENT_MAX_WIDTH: process.env.NEXT_PUBLIC_CONTENT_MAX_WIDTH || '1920px',
    MOBILE_BREAKPOINT: process.env.NEXT_PUBLIC_MOBILE_BREAKPOINT || '768px'
  },

  // Business Modules Configuration
  MODULES: {
    HR_MANAGEMENT: {
      ID: 'hr_management',
      NAME: 'HR Management',
      ICON: 'Users',
      COLOR: '#8B5CF6',
      AI_FEATURES: ['smart_scheduling', 'performance_analysis', 'recruitment_ai'],
      ENABLED: process.env.NEXT_PUBLIC_MODULE_HR === 'true'
    },
    
    PROJECTS_ENGINEERING: {
      ID: 'projects_engineering',
      NAME: 'Projects & Engineering',
      ICON: 'Cog',
      COLOR: '#059669',
      AI_FEATURES: ['project_optimization', 'risk_analysis', 'resource_planning'],
      ENABLED: process.env.NEXT_PUBLIC_MODULE_PROJECTS === 'true'
    },
    
    CONTRACTS_LEGAL: {
      ID: 'contracts_legal',
      NAME: 'Contracts & Legal',
      ICON: 'Scale',
      COLOR: '#DC2626',
      AI_FEATURES: ['contract_analysis', 'compliance_check', 'legal_research'],
      ENABLED: process.env.NEXT_PUBLIC_MODULE_CONTRACTS === 'true'
    },
    
    FINANCE_ESTIMATION: {
      ID: 'finance_estimation',
      NAME: 'Finance & Estimation',
      ICON: 'Calculator',
      COLOR: '#7C3AED',
      AI_FEATURES: ['cost_prediction', 'budget_optimization', 'financial_analysis'],
      ENABLED: process.env.NEXT_PUBLIC_MODULE_FINANCE === 'true'
    },
    
    REPORTING_DASHBOARDS: {
      ID: 'reporting_dashboards',
      NAME: 'Reporting & Dashboards',
      ICON: 'BarChart',
      COLOR: '#EA580C',
      AI_FEATURES: ['auto_reporting', 'insight_generation', 'predictive_analytics'],
      ENABLED: process.env.NEXT_PUBLIC_MODULE_REPORTING === 'true'
    },
    
    HSE_COMPLIANCE: {
      ID: 'hse_compliance',
      NAME: 'HSE & Compliance',
      ICON: 'Shield',
      COLOR: '#059669',
      AI_FEATURES: ['safety_monitoring', 'risk_assessment', 'compliance_tracking'],
      ENABLED: process.env.NEXT_PUBLIC_MODULE_HSE === 'true'
    },
    
    SUPPLY_CHAIN: {
      ID: 'supply_chain',
      NAME: 'Supply Chain & Inventory',
      ICON: 'Truck',
      COLOR: '#0891B2',
      AI_FEATURES: ['demand_forecasting', 'inventory_optimization', 'supplier_analysis'],
      ENABLED: process.env.NEXT_PUBLIC_MODULE_SUPPLY === 'true'
    },
    
    SALES_ENGAGEMENT: {
      ID: 'sales_engagement',
      NAME: 'Sales & Customer Engagement',
      ICON: 'TrendingUp',
      COLOR: '#DC2626',
      AI_FEATURES: ['lead_scoring', 'customer_insights', 'sales_forecasting'],
      ENABLED: process.env.NEXT_PUBLIC_MODULE_SALES === 'true'
    },
    
    RTO_APC_CONSULTING: {
      ID: 'rto_apc_consulting',
      NAME: 'RTO & APC Consulting',
      ICON: 'Zap',
      COLOR: '#7C2D12',
      AI_FEATURES: ['process_optimization', 'performance_tuning', 'predictive_maintenance'],
      ENABLED: process.env.NEXT_PUBLIC_MODULE_RTO === 'true'
    }
  },

  // Dashboard Features Configuration
  FEATURES: {
    // Real-time Features
    REAL_TIME: {
      ENABLED: process.env.NEXT_PUBLIC_REALTIME_ENABLED === 'true',
      UPDATE_INTERVAL: parseInt(process.env.NEXT_PUBLIC_REALTIME_INTERVAL || '5000'),
      WEBSOCKET_RECONNECT: process.env.NEXT_PUBLIC_WS_RECONNECT === 'true'
    },

    // AI Chat Assistant
    AI_CHAT: {
      ENABLED: process.env.NEXT_PUBLIC_AI_CHAT_ENABLED === 'true',
      MAX_HISTORY: parseInt(process.env.NEXT_PUBLIC_AI_CHAT_HISTORY || '50'),
      TYPING_DELAY: parseInt(process.env.NEXT_PUBLIC_AI_CHAT_TYPING || '1500'),
      AUTO_SUGGESTIONS: process.env.NEXT_PUBLIC_AI_SUGGESTIONS === 'true'
    },

    // Voice Commands
    VOICE_COMMANDS: {
      ENABLED: process.env.NEXT_PUBLIC_VOICE_COMMANDS === 'true',
      LANGUAGE: process.env.NEXT_PUBLIC_VOICE_LANGUAGE || 'en-US',
      AUTO_LISTEN: process.env.NEXT_PUBLIC_VOICE_AUTO_LISTEN === 'true'
    },

    // Smart Notifications
    NOTIFICATIONS: {
      ENABLED: process.env.NEXT_PUBLIC_NOTIFICATIONS === 'true',
      AI_PRIORITIZATION: process.env.NEXT_PUBLIC_AI_NOTIFICATIONS === 'true',
      PUSH_ENABLED: process.env.NEXT_PUBLIC_PUSH_NOTIFICATIONS === 'true',
      EMAIL_DIGEST: process.env.NEXT_PUBLIC_EMAIL_DIGEST === 'true'
    },

    // Advanced Analytics
    ANALYTICS: {
      ENABLED: process.env.NEXT_PUBLIC_ANALYTICS === 'true',
      PREDICTIVE_MODELS: process.env.NEXT_PUBLIC_PREDICTIVE_ANALYTICS === 'true',
      ANOMALY_DETECTION: process.env.NEXT_PUBLIC_ANOMALY_DETECTION === 'true',
      TREND_ANALYSIS: process.env.NEXT_PUBLIC_TREND_ANALYSIS === 'true'
    }
  },

  // Performance Configuration
  PERFORMANCE: {
    LAZY_LOADING: process.env.NEXT_PUBLIC_LAZY_LOADING === 'true',
    CACHE_DURATION: parseInt(process.env.NEXT_PUBLIC_CACHE_DURATION || '300000'), // 5 minutes
    COMPRESSION: process.env.NEXT_PUBLIC_COMPRESSION === 'true',
    PWA_ENABLED: process.env.NEXT_PUBLIC_PWA === 'true'
  },

  // Security Configuration
  SECURITY: {
    SESSION_TIMEOUT: parseInt(process.env.NEXT_PUBLIC_SESSION_TIMEOUT || '3600000'), // 1 hour
    AUTO_LOGOUT: process.env.NEXT_PUBLIC_AUTO_LOGOUT === 'true',
    ENCRYPTION_ENABLED: process.env.NEXT_PUBLIC_ENCRYPTION === 'true',
    AUDIT_LOGGING: process.env.NEXT_PUBLIC_AUDIT_LOG === 'true'
  },

  // Theme Configuration
  THEME: {
    DEFAULT_THEME: process.env.NEXT_PUBLIC_DEFAULT_THEME || 'light',
    THEMES_AVAILABLE: (process.env.NEXT_PUBLIC_THEMES || 'light,dark,auto').split(','),
    CUSTOM_THEME_ENABLED: process.env.NEXT_PUBLIC_CUSTOM_THEME === 'true',
    THEME_PERSISTENCE: process.env.NEXT_PUBLIC_THEME_PERSIST === 'true'
  }
};

// AI Model Configurations
export const AI_MODELS = {
  GPT4: {
    name: 'gpt-4',
    description: 'Most capable model for complex reasoning',
    maxTokens: 8192,
    cost: 'high',
    useCase: ['complex_analysis', 'strategic_planning', 'detailed_reports']
  },
  
  GPT4_TURBO: {
    name: 'gpt-4-turbo-preview',
    description: 'Faster GPT-4 with 128k context',
    maxTokens: 128000,
    cost: 'medium',
    useCase: ['document_analysis', 'long_context', 'code_review']
  },
  
  GPT35_TURBO: {
    name: 'gpt-3.5-turbo',
    description: 'Fast and efficient for most tasks',
    maxTokens: 4096,
    cost: 'low',
    useCase: ['quick_responses', 'simple_tasks', 'chat']
  }
};

// RAG Configuration Templates
export const RAG_TEMPLATES = {
  DOCUMENT_ANALYSIS: {
    system_prompt: "You are an expert document analyst. Analyze the provided context and answer questions accurately based only on the information given.",
    chunk_strategy: "semantic",
    similarity_threshold: 0.8
  },
  
  PROJECT_INSIGHTS: {
    system_prompt: "You are a project management expert. Use the project data to provide insights and recommendations.",
    chunk_strategy: "hierarchical",
    similarity_threshold: 0.75
  },
  
  FINANCIAL_ANALYSIS: {
    system_prompt: "You are a financial analyst. Analyze the financial data and provide accurate insights and predictions.",
    chunk_strategy: "temporal",
    similarity_threshold: 0.85
  }
};

// Agentic AI Workflow Templates
export const AGENTIC_WORKFLOWS = {
  PROJECT_OPTIMIZATION: {
    steps: ['analyze_requirements', 'identify_constraints', 'generate_solutions', 'evaluate_options', 'recommend_action'],
    max_iterations: 5,
    decision_threshold: 0.8
  },
  
  RISK_ASSESSMENT: {
    steps: ['identify_risks', 'assess_probability', 'calculate_impact', 'develop_mitigation', 'prioritize_actions'],
    max_iterations: 3,
    decision_threshold: 0.75
  },
  
  RESOURCE_PLANNING: {
    steps: ['analyze_capacity', 'forecast_demand', 'optimize_allocation', 'validate_feasibility', 'generate_plan'],
    max_iterations: 4,
    decision_threshold: 0.85
  }
};

export default DASHBOARD_CONFIG;