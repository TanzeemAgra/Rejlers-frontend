/**
 * Real-Time Data Hook
 * Manages real-time connections and metrics for the dashboard
 */

import { useState, useEffect, useCallback, useRef } from 'react';

interface RealTimeMetrics {
  activeUsers: number;
  systemLoad: number;
  responseTime: number;
  errorRate: number;
  lastUpdated: Date;
}

interface UseRealTimeReturn {
  metrics: RealTimeMetrics | null;
  isConnected: boolean;
  connectionStatus: 'connecting' | 'connected' | 'disconnected' | 'error';
  reconnect: () => void;
}

const defaultMetrics: RealTimeMetrics = {
  activeUsers: 0,
  systemLoad: 0,
  responseTime: 0,
  errorRate: 0,
  lastUpdated: new Date()
};

export const useRealTime = (): UseRealTimeReturn => {
  const [metrics, setMetrics] = useState<RealTimeMetrics | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'error'>('disconnected');
  
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mountedRef = useRef(true);

  // Mock data generator for demonstration
  const generateMockMetrics = useCallback((): RealTimeMetrics => {
    return {
      activeUsers: Math.floor(Math.random() * 100) + 20,
      systemLoad: Math.random() * 100,
      responseTime: Math.floor(Math.random() * 500) + 50,
      errorRate: Math.random() * 5,
      lastUpdated: new Date()
    };
  }, []);

  // Connect to WebSocket (or mock connection)
  const connect = useCallback(() => {
    if (!mountedRef.current) return;

    setConnectionStatus('connecting');

    // For now, use mock data with intervals
    // TODO: Replace with actual WebSocket connection to backend
    const mockConnection = () => {
      if (!mountedRef.current) return;

      setIsConnected(true);
      setConnectionStatus('connected');
      setMetrics(generateMockMetrics());

      // Update metrics every 5 seconds
      const interval = setInterval(() => {
        if (mountedRef.current && isConnected) {
          setMetrics(generateMockMetrics());
        } else {
          clearInterval(interval);
        }
      }, 5000);

      return interval;
    };

    // Simulate connection delay
    setTimeout(() => {
      if (mountedRef.current) {
        mockConnection();
      }
    }, 1000);

    /* 
    // Actual WebSocket implementation for future use:
    try {
      const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8000/ws/metrics/';
      wsRef.current = new WebSocket(wsUrl);

      wsRef.current.onopen = () => {
        if (mountedRef.current) {
          setIsConnected(true);
          setConnectionStatus('connected');
        }
      };

      wsRef.current.onmessage = (event) => {
        if (mountedRef.current) {
          try {
            const data = JSON.parse(event.data);
            setMetrics({
              ...data,
              lastUpdated: new Date()
            });
          } catch (error) {
            console.error('Failed to parse WebSocket message:', error);
          }
        }
      };

      wsRef.current.onclose = () => {
        if (mountedRef.current) {
          setIsConnected(false);
          setConnectionStatus('disconnected');
          // Auto-reconnect after 3 seconds
          reconnectTimeoutRef.current = setTimeout(connect, 3000);
        }
      };

      wsRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        if (mountedRef.current) {
          setConnectionStatus('error');
        }
      };
    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
      setConnectionStatus('error');
    }
    */
  }, [generateMockMetrics, isConnected]);

  // Reconnect function
  const reconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    connect();
  }, [connect]);

  // Initialize connection
  useEffect(() => {
    connect();

    return () => {
      mountedRef.current = false;
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [connect]);

  return {
    metrics,
    isConnected,
    connectionStatus,
    reconnect,
  };
};
