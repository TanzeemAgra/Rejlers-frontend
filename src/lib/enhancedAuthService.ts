/**
 * Enhanced Authentication Service
 * Handles token refresh, 401 errors, and soft-coded configuration
 */

import { config } from '@/config';
import { authConfig } from '@/config/authConfig';
import { 
  transformUserDataForAPI, 
  parseAPIError, 
  type UserCreationRequest 
} from '@/config/userApiConfig';

export class EnhancedAuthService {
  private baseUrl: string;
  private refreshPromise: Promise<boolean> | null = null;

  constructor() {
    this.baseUrl = config.api.baseUrl;
  }

  // Enhanced token validation with expiry check
  private isTokenValid(token: string): boolean {
    if (!token) return false;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      
      // Check if token is expired
      if (payload.exp && payload.exp <= currentTime) {
        if (authConfig.debugMode) {
          console.log('🔒 Token is expired');
        }
        return false;
      }
      
      // Check if token expires soon and should be refreshed
      if (payload.exp && payload.exp - currentTime < (authConfig.tokenRefreshThreshold * 60)) {
        if (authConfig.debugMode) {
          console.log('⏰ Token expires soon, should refresh');
        }
      }
      
      return true;
    } catch (error) {
      if (authConfig.debugMode) {
        console.error('🔒 Token validation error:', error);
      }
      return false;
    }
  }

  // Get access token from storage
  private getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('access_token');
  }

  // Get refresh token from storage
  private getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('refresh_token');
  }

  // Store tokens in localStorage
  private storeTokens(accessToken: string, refreshToken: string): void {
    if (typeof window === 'undefined') return;
    
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    
    if (authConfig.debugMode) {
      console.log('💾 Tokens stored successfully');
    }
  }

  // Clear all authentication data
  private clearTokens(): void {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_data');
    
    if (authConfig.debugMode) {
      console.log('🗑️ Authentication data cleared');
    }
  }

  // Refresh access token using refresh token
  async refreshAccessToken(): Promise<boolean> {
    // Prevent multiple simultaneous refresh attempts
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = this._performTokenRefresh();
    const result = await this.refreshPromise;
    this.refreshPromise = null;
    
    return result;
  }

  private async _performTokenRefresh(): Promise<boolean> {
    const refreshToken = this.getRefreshToken();
    
    if (!refreshToken) {
      if (authConfig.debugMode) {
        console.log('❌ No refresh token available');
      }
      return false;
    }

    try {
      const response = await fetch(`${this.baseUrl}${authConfig.endpoints.refresh}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        this.storeTokens(data.access, refreshToken);
        
        if (authConfig.debugMode) {
          console.log('✅ Token refreshed successfully');
        }
        
        return true;
      } else {
        if (authConfig.debugMode) {
          console.log('❌ Token refresh failed:', response.status);
        }
        
        // If refresh fails, clear tokens
        this.clearTokens();
        return false;
      }
    } catch (error) {
      if (authConfig.debugMode) {
        console.error('❌ Token refresh error:', error);
      }
      
      this.clearTokens();
      return false;
    }
  }

  // Get valid authentication header
  async getAuthHeader(): Promise<Record<string, string>> {
    let token = this.getAccessToken();
    
    // Check if token is valid
    if (!token || !this.isTokenValid(token)) {
      if (authConfig.automaticRefresh) {
        const refreshed = await this.refreshAccessToken();
        if (refreshed) {
          token = this.getAccessToken();
        }
      }
    }
    
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  // Enhanced API call with automatic retry on 401
  async makeAuthenticatedRequest(url: string, options: RequestInit = {}): Promise<Response> {
    let attempt = 0;
    const maxAttempts = authConfig.maxRetryAttempts;

    while (attempt < maxAttempts) {
      try {
        // Get fresh auth header for each attempt
        const authHeader = await this.getAuthHeader();
        
        const requestOptions: RequestInit = {
          ...options,
          mode: 'cors',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            ...authHeader,
            ...options.headers,
          },
        };

        if (authConfig.debugMode) {
          console.log(`🚀 Making authenticated request (attempt ${attempt + 1}):`, {
            url,
            method: requestOptions.method || 'GET',
            hasAuth: !!authHeader.Authorization
          });
        }

        const response = await fetch(url, requestOptions);

        // If successful or not auth-related, return response
        if (response.status !== 401) {
          return response;
        }

        // Handle 401 - try to refresh token
        if (authConfig.debugMode) {
          console.log('🔄 401 received, attempting token refresh...');
        }

        const refreshed = await this.refreshAccessToken();
        
        if (!refreshed) {
          // Refresh failed, clear tokens and redirect if configured
          this.clearTokens();
          
          if (authConfig.redirectOnAuthFailure && typeof window !== 'undefined') {
            window.location.href = '/login';
          }
          
          throw new Error('Authentication required. Please log in again.');
        }

        attempt++;
        
      } catch (error) {
        if (attempt === maxAttempts - 1) {
          throw error;
        }
        attempt++;
      }
    }

    throw new Error('Maximum authentication retry attempts exceeded');
  }

  // Create user with enhanced error handling
  async createUser(userData: UserCreationRequest): Promise<any> {
    try {
      // Transform frontend data to backend API format
      const backendPayload = transformUserDataForAPI(userData);
      
      if (authConfig.debugMode) {
        console.log('👤 Creating user with transformed data:', {
          original: userData,
          transformed: backendPayload
        });
      }

      const response = await this.makeAuthenticatedRequest(
        `${this.baseUrl}${authConfig.endpoints.userCreate}`,
        {
          method: 'POST',
          body: JSON.stringify(backendPayload)
        }
      );

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { detail: `HTTP ${response.status}: ${response.statusText}` };
        }
        
        if (authConfig.debugMode) {
          console.error('❌ User creation failed:', {
            status: response.status,
            statusText: response.statusText,
            errorData,
            payload: backendPayload
          });
        }
        
        // Use soft coding for error parsing
        const errorMessage = parseAPIError(errorData, response);
        throw new Error(errorMessage);
      }

      const result = await response.json();
      
      if (authConfig.debugMode) {
        console.log('✅ User created successfully:', result);
      }
      
      return result;
      
    } catch (error) {
      if (authConfig.debugMode) {
        console.error('❌ User creation error:', error);
      }
      
      // Re-throw with user-friendly message
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('Failed to create user. Please try again.');
      }
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    return token ? this.isTokenValid(token) : false;
  }

  // Check user permissions
  async checkPermission(module: string, permission: string): Promise<boolean> {
    try {
      const response = await this.makeAuthenticatedRequest(
        `${this.baseUrl}${authConfig.endpoints.checkPermission}`,
        {
          method: 'POST',
          body: JSON.stringify({ module, permission })
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data.has_permission || false;
      }
      
      return false;
    } catch (error) {
      if (authConfig.debugMode) {
        console.error('❌ Permission check failed:', error);
      }
      return false;
    }
  }

  // Get current user profile
  async getCurrentUser(): Promise<any> {
    try {
      // First try localStorage
      if (typeof window !== 'undefined') {
        const storedUserData = localStorage.getItem('user_data');
        if (storedUserData) {
          try {
            return JSON.parse(storedUserData);
          } catch (error) {
            // Invalid stored data, fetch fresh
          }
        }
      }

      // Fetch from API
      const response = await this.makeAuthenticatedRequest(
        `${this.baseUrl}${authConfig.endpoints.profile}`
      );

      if (response.ok) {
        const userData = await response.json();
        
        // Store for future use
        if (typeof window !== 'undefined') {
          localStorage.setItem('user_data', JSON.stringify(userData));
        }
        
        return userData;
      }
      
      return null;
    } catch (error) {
      if (authConfig.debugMode) {
        console.error('❌ Failed to get current user:', error);
      }
      return null;
    }
  }
}

// Export singleton instance
export const enhancedAuthService = new EnhancedAuthService();