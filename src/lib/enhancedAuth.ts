/**
 * Enhanced Authentication Service for Production Deployment
 * Includes comprehensive error handling, retry logic, and fallback mechanisms
 */

import { config } from '@/config';

// Authentication Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user_id: string;
  username: string;
  email: string;
  full_name: string;
  role: string;
  accessible_modules: string[];
  is_staff: boolean;
  is_superuser: boolean;
  user?: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    is_superuser: boolean;
    is_staff: boolean;
    company_name?: string;
    job_title?: string;
  };
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_superuser: boolean;
  is_staff: boolean;
  role?: string;
  company_name?: string;
  job_title?: string;
  full_name?: string;
  accessible_modules?: string[];
}

class EnhancedAuthService {
  private baseUrl: string;
  private retryCount: number = 3;
  private timeout: number = 15000; // 15 seconds

  constructor() {
    this.baseUrl = this.getApiBaseUrl();
  }

  private getApiBaseUrl(): string {
    // Priority order for API URL resolution with better production handling
    const isProduction = process.env.NODE_ENV === 'production';
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    console.log('🔗 Environment Detection:', { 
      NODE_ENV: process.env.NODE_ENV,
      isProduction,
      NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL 
    });

    if (isProduction) {
      // Production environment - use Railway backend
      const productionUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://rejlers-backend-production.up.railway.app/api/v1';
      console.log('🏭 Using production URL:', productionUrl);
      return productionUrl;
    } else if (isDevelopment) {
      // Development environment - prefer localhost if available
      const devUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';
      console.log('🛠️ Using development URL:', devUrl);
      return devUrl;
    }

    // Fallback URLs
    const urls = [
      process.env.NEXT_PUBLIC_API_BASE_URL,
      'https://rejlers-backend-production.up.railway.app/api/v1',
      'https://rejlers-backend.railway.app/api/v1',
      config.api?.baseUrl,
      'http://localhost:8000/api/v1'
    ].filter(Boolean);

    const selectedUrl = urls[0] || 'https://rejlers-backend-production.up.railway.app/api/v1';
    console.log('🔄 Fallback URL selected:', selectedUrl);
    return selectedUrl;
  }

  private async fetchWithTimeout(url: string, options: RequestInit, timeout: number = this.timeout): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timeout - please check your internet connection');
      }
      throw error;
    }
  }

  private async retryRequest<T>(
    requestFn: () => Promise<T>,
    maxRetries: number = this.retryCount
  ): Promise<T> {
    let lastError: Error;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await requestFn();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error');
        
        if (attempt === maxRetries) {
          break;
        }

        // Exponential backoff: wait 1s, 2s, 4s between retries
        const delay = Math.pow(2, attempt - 1) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));

        console.warn(`Retry attempt ${attempt}/${maxRetries} failed:`, lastError.message);
      }
    }

    throw lastError!;
  }

  // Enhanced login with comprehensive error handling
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    return this.retryRequest(async () => {
      const loginUrl = `${this.baseUrl}/auth/login/`;
      
      console.log('🔐 Enhanced Auth: Attempting login to:', loginUrl);
      console.log('🌐 Environment:', process.env.NODE_ENV);
      console.log('🔗 Base URL source:', {
        env_var: process.env.NEXT_PUBLIC_API_BASE_URL,
        resolved: this.baseUrl
      });

      const requestOptions: RequestInit = {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': typeof window !== 'undefined' ? window.location.origin : 'https://rejlers-frontend.vercel.app',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify(credentials),
      };

      const response = await this.fetchWithTimeout(loginUrl, requestOptions);

      if (!response.ok) {
        let errorMessage = 'Login failed';
        
        try {
          const errorData = await response.json();
          errorMessage = errorData.detail || errorData.message || errorData.error || `HTTP ${response.status}: ${response.statusText}`;
        } catch {
          errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        }

        // Specific error handling for common issues
        if (response.status === 0) {
          throw new Error('Network error - cannot reach the server. Please check your internet connection.');
        } else if (response.status === 401) {
          throw new Error('Invalid email or password. Please check your credentials and try again.');
        } else if (response.status === 403) {
          throw new Error('Access forbidden. Your account may be disabled or you may not have permission to login.');
        } else if (response.status === 404) {
          throw new Error('Login endpoint not found. The server may be down or misconfigured.');
        } else if (response.status >= 500) {
          throw new Error('Server error. Please try again later or contact support if the problem persists.');
        } else {
          throw new Error(errorMessage);
        }
      }

      const data: LoginResponse = await response.json();
      
      if (!data.access) {
        throw new Error('Invalid response from server - no access token received');
      }

      // Store authentication data
      this.storeTokens(data.access, data.refresh);
      this.storeUserData(data);
      
      console.log('✅ Login successful:', {
        user: data.email,
        role: data.role,
        hasTokens: !!(data.access && data.refresh)
      });

      return data;
    });
  }

  // Enhanced logout with cleanup
  async logout(): Promise<void> {
    try {
      const refreshToken = this.getRefreshToken();
      
      if (refreshToken) {
        try {
          await this.fetchWithTimeout(`${this.baseUrl}/auth/logout/`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.getAccessToken()}`,
            },
            body: JSON.stringify({ refresh: refreshToken }),
          });
        } catch (error) {
          console.warn('Logout API call failed, proceeding with local cleanup:', error);
        }
      }
    } finally {
      // Always clean up local storage
      this.clearAuthData();
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    try {
      const token = this.getAccessToken();
      if (!token) return false;

      // Simple token expiry check
      const payload = this.parseJWT(token);
      if (!payload || !payload.exp) return false;

      const isExpired = Date.now() >= payload.exp * 1000;
      return !isExpired;
    } catch {
      return false;
    }
  }

  // Get current user data
  getUserData(): User | null {
    try {
      const userData = localStorage.getItem('user_data');
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  }

  // Token management
  private storeTokens(accessToken: string, refreshToken: string): void {
    try {
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
      localStorage.setItem('auth_timestamp', Date.now().toString());
    } catch (error) {
      console.error('Failed to store authentication tokens:', error);
      throw new Error('Unable to save login session. Please check your browser settings.');
    }
  }

  private storeUserData(loginResponse: LoginResponse): void {
    try {
      const userData: User = {
        id: parseInt(loginResponse.user_id),
        email: loginResponse.email,
        first_name: loginResponse.user?.first_name || '',
        last_name: loginResponse.user?.last_name || '',
        is_superuser: loginResponse.is_superuser,
        is_staff: loginResponse.is_staff,
        role: loginResponse.role,
        full_name: loginResponse.full_name,
        accessible_modules: loginResponse.accessible_modules,
        company_name: loginResponse.user?.company_name,
        job_title: loginResponse.user?.job_title,
      };

      localStorage.setItem('user_data', JSON.stringify(userData));
    } catch (error) {
      console.error('Failed to store user data:', error);
    }
  }

  getAccessToken(): string | null {
    try {
      return localStorage.getItem('access_token');
    } catch {
      return null;
    }
  }

  getRefreshToken(): string | null {
    try {
      return localStorage.getItem('refresh_token');
    } catch {
      return null;
    }
  }

  private clearAuthData(): void {
    try {
      const keysToRemove = [
        'access_token',
        'refresh_token', 
        'user_data',
        'auth_timestamp'
      ];
      
      keysToRemove.forEach(key => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.error('Failed to clear authentication data:', error);
    }
  }

  private parseJWT(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  }

  // Health check for debugging
  async checkBackendHealth(): Promise<{ status: string; details: any }> {
    try {
      const healthUrl = `${this.baseUrl}/health/`;
      const response = await this.fetchWithTimeout(healthUrl, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
        },
      }, 10000); // 10 second timeout for health check

      if (response.ok) {
        const data = await response.json();
        return { status: 'healthy', details: data };
      } else {
        return { 
          status: 'unhealthy', 
          details: { 
            status: response.status, 
            statusText: response.statusText 
          } 
        };
      }
    } catch (error) {
      return { 
        status: 'error', 
        details: { 
          error: error instanceof Error ? error.message : 'Unknown error',
          baseUrl: this.baseUrl
        } 
      };
    }
  }
}

// Export singleton instance
export const enhancedAuthService = new EnhancedAuthService();
export default enhancedAuthService;
