// WebSocket Manager for Real-time Data
// Handles WebSocket connections, reconnections, and real-time data streaming

type WebSocketEventHandler = (data: any) => void;

interface WebSocketConfig {
  url: string;
  reconnectAttempts?: number;
  reconnectDelay?: number;
  heartbeatInterval?: number;
}

class WebSocketManager {
  private ws: WebSocket | null = null;
  private config: WebSocketConfig;
  private eventHandlers: Map<string, WebSocketEventHandler[]> = new Map();
  private reconnectCount = 0;
  private heartbeatTimer?: NodeJS.Timeout;
  private isConnecting = false;

  constructor(config: WebSocketConfig) {
    this.config = {
      reconnectAttempts: 5,
      reconnectDelay: 3000,
      heartbeatInterval: 30000,
      ...config,
    };
  }

  // Connect to WebSocket
  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.isConnecting) return;
      
      this.isConnecting = true;
      
      try {
        this.ws = new WebSocket(this.config.url);
        
        this.ws.onopen = () => {
          console.log('WebSocket connected');
          this.isConnecting = false;
          this.reconnectCount = 0;
          this.startHeartbeat();
          this.emit('connected', {});
          resolve();
        };
        
        this.ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            this.handleMessage(data);
          } catch (error) {
            console.error('Failed to parse WebSocket message:', error);
          }
        };
        
        this.ws.onclose = (event) => {
          console.log('WebSocket disconnected:', event.code, event.reason);
          this.isConnecting = false;
          this.stopHeartbeat();
          this.emit('disconnected', { code: event.code, reason: event.reason });
          
          // Attempt to reconnect if not a manual close
          if (event.code !== 1000 && this.reconnectCount < (this.config.reconnectAttempts || 5)) {
            this.scheduleReconnect();
          }
        };
        
        this.ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          this.isConnecting = false;
          this.emit('error', { error });
          reject(error);
        };
        
      } catch (error) {
        this.isConnecting = false;
        reject(error);
      }
    });
  }

  // Disconnect from WebSocket
  disconnect(): void {
    if (this.ws) {
      this.stopHeartbeat();
      this.ws.close(1000, 'Manual disconnect');
      this.ws = null;
    }
  }

  // Send message through WebSocket
  send(message: any): boolean {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      try {
        this.ws.send(JSON.stringify(message));
        return true;
      } catch (error) {
        console.error('Failed to send WebSocket message:', error);
        return false;
      }
    }
    return false;
  }

  // Subscribe to events
  on(event: string, handler: WebSocketEventHandler): void {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, []);
    }
    this.eventHandlers.get(event)?.push(handler);
  }

  // Unsubscribe from events
  off(event: string, handler?: WebSocketEventHandler): void {
    if (!handler) {
      this.eventHandlers.delete(event);
      return;
    }
    
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    }
  }

  // Emit events to handlers
  private emit(event: string, data: any): void {
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      handlers.forEach(handler => {
        try {
          handler(data);
        } catch (error) {
          console.error('Error in WebSocket event handler:', error);
        }
      });
    }
  }

  // Handle incoming messages
  private handleMessage(data: any): void {
    const { type, payload } = data;
    
    switch (type) {
      case 'sensor_data':
        this.emit('sensor_data', payload);
        break;
      case 'alert':
        this.emit('alert', payload);
        break;
      case 'asset_status':
        this.emit('asset_status', payload);
        break;
      case 'system_message':
        this.emit('system_message', payload);
        break;
      case 'heartbeat':
        // Respond to server heartbeat
        this.send({ type: 'heartbeat_ack' });
        break;
      default:
        this.emit('message', data);
    }
  }

  // Schedule reconnection attempt
  private scheduleReconnect(): void {
    this.reconnectCount++;
    const delay = this.config.reconnectDelay! * Math.pow(1.5, this.reconnectCount - 1);
    
    console.log(`Scheduling reconnect attempt ${this.reconnectCount} in ${delay}ms`);
    
    setTimeout(() => {
      if (this.reconnectCount <= (this.config.reconnectAttempts || 5)) {
        console.log(`Attempting to reconnect (${this.reconnectCount}/${this.config.reconnectAttempts})`);
        this.connect().catch(() => {
          // Will trigger another reconnection attempt if needed
        });
      }
    }, delay);
  }

  // Start heartbeat to keep connection alive
  private startHeartbeat(): void {
    if (this.config.heartbeatInterval) {
      this.heartbeatTimer = setInterval(() => {
        this.send({ type: 'ping', timestamp: Date.now() });
      }, this.config.heartbeatInterval);
    }
  }

  // Stop heartbeat
  private stopHeartbeat(): void {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = undefined;
    }
  }

  // Get connection status
  get isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  }

  // Subscribe to specific sensor data
  subscribeSensor(sensorId: string): void {
    this.send({
      type: 'subscribe',
      target: 'sensor',
      id: sensorId,
    });
  }

  // Unsubscribe from sensor data
  unsubscribeSensor(sensorId: string): void {
    this.send({
      type: 'unsubscribe',
      target: 'sensor',
      id: sensorId,
    });
  }

  // Subscribe to asset updates
  subscribeAsset(assetId: string): void {
    this.send({
      type: 'subscribe',
      target: 'asset',
      id: assetId,
    });
  }

  // Subscribe to alerts
  subscribeAlerts(severity?: string): void {
    this.send({
      type: 'subscribe',
      target: 'alerts',
      filter: severity ? { severity } : {},
    });
  }
}

// Dynamic WebSocket URL based on environment
const getWebSocketUrl = () => {
  if (process.env.NEXT_PUBLIC_WS_URL) {
    return process.env.NEXT_PUBLIC_WS_URL;
  }
  
  return process.env.NODE_ENV === 'production'
    ? 'wss://rejlers-backend-production.up.railway.app/ws'
    : 'ws://localhost:8000/ws';
};

// Create WebSocket manager instance
export const websocketManager = new WebSocketManager({ url: getWebSocketUrl() });

// Real-time data hooks and utilities
export class RealtimeDataManager {
  private subscriptions: Set<string> = new Set();

  constructor(private wsManager: WebSocketManager) {}

  // Subscribe to real-time sensor data
  subscribeSensorData(sensorId: string, callback: (data: any) => void): () => void {
    const subscriptionKey = `sensor_${sensorId}`;
    
    if (!this.subscriptions.has(subscriptionKey)) {
      this.wsManager.subscribeSensor(sensorId);
      this.subscriptions.add(subscriptionKey);
    }

    this.wsManager.on('sensor_data', (data) => {
      if (data.sensorId === sensorId) {
        callback(data);
      }
    });

    // Return unsubscribe function
    return () => {
      this.wsManager.off('sensor_data', callback);
      this.subscriptions.delete(subscriptionKey);
      this.wsManager.unsubscribeSensor(sensorId);
    };
  }

  // Subscribe to real-time alerts
  subscribeAlerts(callback: (alert: any) => void): () => void {
    const subscriptionKey = 'alerts';
    
    if (!this.subscriptions.has(subscriptionKey)) {
      this.wsManager.subscribeAlerts();
      this.subscriptions.add(subscriptionKey);
    }

    this.wsManager.on('alert', callback);

    // Return unsubscribe function
    return () => {
      this.wsManager.off('alert', callback);
      this.subscriptions.delete(subscriptionKey);
    };
  }

  // Subscribe to asset status changes
  subscribeAssetStatus(assetId: string, callback: (status: any) => void): () => void {
    const subscriptionKey = `asset_${assetId}`;
    
    if (!this.subscriptions.has(subscriptionKey)) {
      this.wsManager.subscribeAsset(assetId);
      this.subscriptions.add(subscriptionKey);
    }

    this.wsManager.on('asset_status', (data) => {
      if (data.assetId === assetId) {
        callback(data);
      }
    });

    // Return unsubscribe function
    return () => {
      this.wsManager.off('asset_status', callback);
      this.subscriptions.delete(subscriptionKey);
    };
  }

  // Clean up all subscriptions
  cleanup(): void {
    this.subscriptions.clear();
  }
}

export const realtimeManager = new RealtimeDataManager(websocketManager);

export default WebSocketManager;