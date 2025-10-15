/**
 * RAG (Retrieval-Augmented Generation) Hook
 * Provides document search and context-aware AI responses
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { DASHBOARD_CONFIG, RAG_TEMPLATES } from '@/config/dashboard.config';

// Types
interface Document {
  id: string;
  title: string;
  content: string;
  metadata: {
    source: string;
    module: string;
    type: string;
    timestamp: Date;
    tags: string[];
  };
  embedding?: number[];
}

interface SearchResult {
  documents: Document[];
  sources: string[];
  confidence: number;
  searchTime: number;
}

interface RAGRequest {
  query: string;
  module?: string;
  template?: typeof RAG_TEMPLATES[keyof typeof RAG_TEMPLATES];
  maxResults?: number;
  similarityThreshold?: number;
}

interface EmbeddingCache {
  [key: string]: number[];
}

// Document Store (In production, this would be a vector database)
class DocumentStore {
  private documents: Document[] = [];
  private embeddingCache: EmbeddingCache = {};

  constructor() {
    this.initializeSampleDocuments();
  }

  private initializeSampleDocuments() {
    // Sample documents for demonstration
    this.documents = [
      {
        id: 'doc-1',
        title: 'Project Management Best Practices',
        content: 'Effective project management requires clear communication, defined milestones, risk assessment, and stakeholder engagement. Key metrics include schedule adherence, budget compliance, and quality standards.',
        metadata: {
          source: 'internal_kb',
          module: 'projects_engineering',
          type: 'guideline',
          timestamp: new Date(),
          tags: ['project-management', 'best-practices', 'methodology']
        }
      },
      {
        id: 'doc-2',
        title: 'Financial Planning Guidelines',
        content: 'Financial planning involves budget forecasting, cost analysis, ROI calculations, and risk management. Regular monitoring of financial KPIs ensures project profitability and resource optimization.',
        metadata: {
          source: 'policy_docs',
          module: 'finance_estimation',
          type: 'policy',
          timestamp: new Date(),
          tags: ['finance', 'planning', 'budgeting', 'roi']
        }
      },
      {
        id: 'doc-3',
        title: 'HSE Compliance Requirements',
        content: 'Health, Safety, and Environmental compliance requires regular audits, incident reporting, training programs, and adherence to regulatory standards. Key focus areas include risk assessment, emergency procedures, and environmental impact.',
        metadata: {
          source: 'regulatory_docs',
          module: 'hse_compliance',
          type: 'regulation',
          timestamp: new Date(),
          tags: ['hse', 'compliance', 'safety', 'regulations']
        }
      },
      {
        id: 'doc-4',
        title: 'Supply Chain Optimization',
        content: 'Optimizing supply chain involves vendor management, inventory control, demand forecasting, and logistics planning. Key metrics include delivery times, cost efficiency, and supplier performance.',
        metadata: {
          source: 'operational_docs',
          module: 'supply_chain',
          type: 'process',
          timestamp: new Date(),
          tags: ['supply-chain', 'optimization', 'logistics', 'vendors']
        }
      },
      {
        id: 'doc-5',
        title: 'HR Performance Management',
        content: 'Performance management includes goal setting, regular reviews, skill development, and career planning. Focus on employee engagement, productivity metrics, and retention strategies.',
        metadata: {
          source: 'hr_policies',
          module: 'hr_management',
          type: 'policy',
          timestamp: new Date(),
          tags: ['hr', 'performance', 'management', 'development']
        }
      }
    ];
  }

  // Simple text similarity (in production, use proper embeddings)
  private calculateSimilarity(text1: string, text2: string): number {
    const words1 = text1.toLowerCase().split(/\s+/);
    const words2 = text2.toLowerCase().split(/\s+/);
    
    const intersection = words1.filter(word => words2.includes(word));
    const uniqueWords = new Set([...words1, ...words2]);
    const union = Array.from(uniqueWords);
    
    return intersection.length / union.length;
  }

  search(query: string, options: {
    module?: string;
    maxResults?: number;
    threshold?: number;
  } = {}): SearchResult {
    const startTime = Date.now();
    const maxResults = options.maxResults || 5;
    const threshold = options.threshold || 0.1;

    let filteredDocs = this.documents;

    // Filter by module if specified
    if (options.module) {
      filteredDocs = filteredDocs.filter(doc => 
        doc.metadata.module === options.module || 
        doc.metadata.tags.some(tag => tag.includes(options.module || ''))
      );
    }

    // Calculate similarity scores
    const scoredDocs = filteredDocs.map(doc => ({
      ...doc,
      similarity: Math.max(
        this.calculateSimilarity(query, doc.title),
        this.calculateSimilarity(query, doc.content),
        Math.max(...doc.metadata.tags.map(tag => 
          this.calculateSimilarity(query, tag)
        ))
      )
    }))
    .filter(doc => doc.similarity >= threshold)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, maxResults);

    const searchTime = Date.now() - startTime;
    const avgConfidence = scoredDocs.length > 0 
      ? scoredDocs.reduce((sum, doc) => sum + doc.similarity, 0) / scoredDocs.length 
      : 0;

    return {
      documents: scoredDocs,
      sources: scoredDocs.map(doc => doc.metadata.source),
      confidence: avgConfidence,
      searchTime
    };
  }

  addDocument(document: Omit<Document, 'id'>): string {
    const id = `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    this.documents.push({ ...document, id });
    return id;
  }

  updateDocument(id: string, updates: Partial<Document>): boolean {
    const index = this.documents.findIndex(doc => doc.id === id);
    if (index === -1) return false;
    
    this.documents[index] = { ...this.documents[index], ...updates };
    return true;
  }

  removeDocument(id: string): boolean {
    const initialLength = this.documents.length;
    this.documents = this.documents.filter(doc => doc.id !== id);
    return this.documents.length < initialLength;
  }

  getDocumentsByModule(module: string): Document[] {
    return this.documents.filter(doc => doc.metadata.module === module);
  }
}

// RAG Hook
export const useRAG = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSearchResults, setLastSearchResults] = useState<SearchResult | null>(null);
  
  const documentStoreRef = useRef<DocumentStore | null>(null);

  // Initialize document store
  useEffect(() => {
    if (DASHBOARD_CONFIG.AI_SERVICES.RAG.ENABLED) {
      documentStoreRef.current = new DocumentStore();
    }
  }, []);

  // Search documents
  const searchDocuments = useCallback(async (request: RAGRequest): Promise<SearchResult> => {
    if (!documentStoreRef.current) {
      throw new Error('RAG is not enabled or initialized');
    }

    setIsSearching(true);
    setError(null);

    try {
      const results = documentStoreRef.current.search(request.query, {
        module: request.module,
        maxResults: request.maxResults || 5,
        threshold: request.similarityThreshold || DASHBOARD_CONFIG.AI_SERVICES.RAG.SIMILARITY_THRESHOLD
      });

      setLastSearchResults(results);
      return results;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'RAG search error';
      setError(errorMessage);
      throw error;
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Add document to knowledge base
  const addDocument = useCallback(async (document: {
    title: string;
    content: string;
    module: string;
    type: string;
    tags?: string[];
    source?: string;
  }): Promise<string> => {
    if (!documentStoreRef.current) {
      throw new Error('RAG is not enabled or initialized');
    }

    try {
      const id = documentStoreRef.current.addDocument({
        title: document.title,
        content: document.content,
        metadata: {
          source: document.source || 'user_upload',
          module: document.module,
          type: document.type,
          timestamp: new Date(),
          tags: document.tags || []
        }
      });

      return id;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add document';
      setError(errorMessage);
      throw error;
    }
  }, []);

  // Get documents by module
  const getDocumentsByModule = useCallback((module: string): Document[] => {
    if (!documentStoreRef.current) return [];
    return documentStoreRef.current.getDocumentsByModule(module);
  }, []);

  // Update document
  const updateDocument = useCallback(async (id: string, updates: Partial<Document>): Promise<boolean> => {
    if (!documentStoreRef.current) {
      throw new Error('RAG is not enabled or initialized');
    }

    try {
      return documentStoreRef.current.updateDocument(id, updates);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update document';
      setError(errorMessage);
      throw error;
    }
  }, []);

  // Remove document
  const removeDocument = useCallback(async (id: string): Promise<boolean> => {
    if (!documentStoreRef.current) {
      throw new Error('RAG is not enabled or initialized');
    }

    try {
      return documentStoreRef.current.removeDocument(id);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to remove document';
      setError(errorMessage);
      throw error;
    }
  }, []);

  // Enhanced search with AI integration
  const searchWithAI = useCallback(async (query: string, options: {
    module?: string;
    template?: typeof RAG_TEMPLATES[keyof typeof RAG_TEMPLATES];
  } = {}): Promise<{
    searchResults: SearchResult;
    aiResponse: string;
  }> => {
    // First, search documents
    const searchResults = await searchDocuments({
      query,
      module: options.module,
      template: options.template
    });

    // Then, use AI to generate response based on found documents
    const context = searchResults.documents.map(doc => 
      `Title: ${doc.title}\nContent: ${doc.content}\nSource: ${doc.metadata.source}`
    ).join('\n\n');

    const aiResponse = `Based on the search results, here are the relevant documents found:

${searchResults.documents.map((doc, index) => 
  `${index + 1}. **${doc.title}** (${doc.metadata.source})
   ${doc.content.substring(0, 200)}...`
).join('\n\n')}

Confidence: ${(searchResults.confidence * 100).toFixed(1)}%
Search Time: ${searchResults.searchTime}ms`;

    return {
      searchResults,
      aiResponse
    };
  }, [searchDocuments]);

  // Clear search results
  const clearResults = useCallback(() => {
    setLastSearchResults(null);
    setError(null);
  }, []);

  return {
    // State
    isSearching,
    error,
    lastSearchResults,

    // Methods
    searchDocuments,
    searchWithAI,
    addDocument,
    updateDocument,
    removeDocument,
    getDocumentsByModule,
    clearResults,

    // Configuration
    isEnabled: DASHBOARD_CONFIG.AI_SERVICES.RAG.ENABLED,
    chunkSize: DASHBOARD_CONFIG.AI_SERVICES.RAG.CHUNK_SIZE,
    similarityThreshold: DASHBOARD_CONFIG.AI_SERVICES.RAG.SIMILARITY_THRESHOLD
  };
};
