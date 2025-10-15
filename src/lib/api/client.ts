// API Client Configuration for Oil & Gas Dashboard
// Handles authentication, error handling, and request/response transformation

interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, any>;
}

class ApiClient {
  private baseURL: string;
  private timeout: number;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL: string, timeout = 30000) {
    this.baseURL = baseURL;
    this.timeout = timeout;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  // Set authentication token
  setAuthToken(token: string): void {
    this.defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  // Remove authentication token
  clearAuthToken(): void {
    delete this.defaultHeaders['Authorization'];
  }

  // Build URL with query parameters
  private buildUrl(endpoint: string, params?: Record<string, any>): string {
    const url = new URL(endpoint, this.baseURL);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          url.searchParams.append(key, String(value));
        }
      });
    }
    return url.toString();
  }

  // Generic request method
  private async request<T>(endpoint: string, config: RequestConfig = {}): Promise<ApiResponse<T>> {
    const { method = 'GET', headers = {}, body, params } = config;
    
    const url = this.buildUrl(endpoint, params);
    const requestHeaders = { ...this.defaultHeaders, ...headers };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(url, {
        method,
        headers: requestHeaders,
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const responseData = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${responseData.message || 'Request failed'}`);
      }

      return {
        success: true,
        data: responseData.data || responseData,
        message: responseData.message,
        meta: responseData.meta,
      };
    } catch (error: any) {
      console.error('API Request Error:', error);
      
      // Handle different error types
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      
      return {
        success: false,
        data: null as T,
        message: error.message || 'Network error occurred',
        errors: [error.message],
      };
    }
  }

  // HTTP method shortcuts
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET', params });
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'POST', body: data });
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'PUT', body: data });
  }

  async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'PATCH', body: data });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// Dynamic API URL based on environment
const getApiUrl = () => {
  if (process.env.NEXT_PUBLIC_API_BASE_URL) {
    return process.env.NEXT_PUBLIC_API_BASE_URL;
  }
  
  return process.env.NODE_ENV === 'production'
    ? 'https://rejlers-backend-production.up.railway.app/api/v1'
    : 'http://localhost:8000/api/v1';
};

// Create API client instance
const apiClient = new ApiClient(getApiUrl());

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    profile: '/auth/profile',
  },
  
  // Assets
  assets: {
    list: '/assets',
    create: '/assets',
    get: (id: string) => `/assets/${id}`,
    update: (id: string) => `/assets/${id}`,
    delete: (id: string) => `/assets/${id}`,
    sensors: (id: string) => `/assets/${id}/sensors`,
  },
  
  // Sensors
  sensors: {
    list: '/sensors',
    get: (id: string) => `/sensors/${id}`,
    data: (id: string) => `/sensors/${id}/data`,
    realtime: '/sensors/realtime',
  },
  
  // Alerts
  alerts: {
    list: '/alerts',
    create: '/alerts',
    get: (id: string) => `/alerts/${id}`,
    acknowledge: (id: string) => `/alerts/${id}/acknowledge`,
    resolve: (id: string) => `/alerts/${id}/resolve`,
    stats: '/alerts/stats',
  },
  
  // Dashboard
  dashboard: {
    kpis: '/dashboard/kpis',
    widgets: '/dashboard/widgets',
    layout: '/dashboard/layout',
  },
  
  // Reports
  reports: {
    list: '/reports',
    generate: '/reports/generate',
    get: (id: string) => `/reports/${id}`,
  },
  
  // Users
  users: {
    list: '/users',
    create: '/users',
    get: (id: string) => `/users/${id}`,
    update: (id: string) => `/users/${id}`,
    permissions: (id: string) => `/users/${id}/permissions`,
  },
};

// Typed API service functions
export const apiService = {
  // Authentication
  async login(credentials: { email: string; password: string }) {
    return apiClient.post(API_ENDPOINTS.auth.login, credentials);
  },

  async logout() {
    return apiClient.post(API_ENDPOINTS.auth.logout);
  },

  async getProfile() {
    return apiClient.get(API_ENDPOINTS.auth.profile);
  },

  // Assets
  async getAssets(params?: { page?: number; limit?: number; type?: string; status?: string }) {
    return apiClient.get(API_ENDPOINTS.assets.list, params);
  },

  async getAsset(id: string) {
    return apiClient.get(API_ENDPOINTS.assets.get(id));
  },

  async createAsset(asset: any) {
    return apiClient.post(API_ENDPOINTS.assets.create, asset);
  },

  async updateAsset(id: string, updates: any) {
    return apiClient.patch(API_ENDPOINTS.assets.update(id), updates);
  },

  async deleteAsset(id: string) {
    return apiClient.delete(API_ENDPOINTS.assets.delete(id));
  },

  // Sensors
  async getSensors(params?: { assetId?: string; type?: string }) {
    return apiClient.get(API_ENDPOINTS.sensors.list, params);
  },

  async getSensorData(id: string, params?: { timeRange?: string; limit?: number }) {
    return apiClient.get(API_ENDPOINTS.sensors.data(id), params);
  },

  async getRealtimeSensorData() {
    return apiClient.get(API_ENDPOINTS.sensors.realtime);
  },

  // Alerts
  async getAlerts(params?: { severity?: string; status?: string; assetId?: string }) {
    return apiClient.get(API_ENDPOINTS.alerts.list, params);
  },

  async createAlert(alert: any) {
    return apiClient.post(API_ENDPOINTS.alerts.create, alert);
  },

  async acknowledgeAlert(id: string, userId: string) {
    return apiClient.post(API_ENDPOINTS.alerts.acknowledge(id), { userId });
  },

  async resolveAlert(id: string, userId: string, resolution?: string) {
    return apiClient.post(API_ENDPOINTS.alerts.resolve(id), { userId, resolution });
  },

  async getAlertStats() {
    return apiClient.get(API_ENDPOINTS.alerts.stats);
  },

  // Dashboard
  async getDashboardKPIs() {
    return apiClient.get(API_ENDPOINTS.dashboard.kpis);
  },

  async getDashboardWidgets(layoutId?: string) {
    return apiClient.get(API_ENDPOINTS.dashboard.widgets, { layoutId });
  },

  // Users
  async getUsers(params?: { page?: number; limit?: number; role?: string }) {
    return apiClient.get(API_ENDPOINTS.users.list, params);
  },

  async createUser(user: any) {
    return apiClient.post(API_ENDPOINTS.users.create, user);
  },

  async updateUser(id: string, updates: any) {
    return apiClient.patch(API_ENDPOINTS.users.update(id), updates);
  },
};

export default apiClient;
