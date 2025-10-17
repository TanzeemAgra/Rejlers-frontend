import { config } from '@/config';
import { 
  transformUserDataForAPI, 
  parseAPIError, 
  type UserCreationRequest 
} from '@/config/userApiConfig';

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

class AuthService {
  private baseUrl: string;

  constructor() {
    // Use soft coding to get the correct API base URL
    this.baseUrl = config.api.baseUrl;
  }

  // Login with email and password
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const loginUrl = `${this.baseUrl}/auth/login/`;
      console.log('Attempting login to:', loginUrl);
      console.log('CORS Check - Using baseUrl from config:', this.baseUrl);
      
      // Test backend connectivity first
      try {
        const healthCheck = await fetch(`${this.baseUrl}/health/`, {
          method: 'GET',
          mode: 'cors',
        });
        console.log('Backend health check status:', healthCheck.status);
        if (!healthCheck.ok) {
          console.warn('Backend health check failed:', healthCheck.status);
        }
      } catch (healthError) {
        console.error('Backend connectivity test failed:', healthError);
        throw new Error('Unable to connect to the server. Please try again or contact support.');
      }
      
      const response = await fetch(loginUrl, {
        method: 'POST',
        mode: 'cors', // Explicitly set CORS mode
        credentials: 'include', // Include credentials for CORS
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Login failed with status:', response.status, errorData);
        throw new Error(errorData.detail || errorData.message || 'Login failed');
      }

      const data: LoginResponse = await response.json();
      
      // Store tokens in localStorage
      this.storeTokens(data.access, data.refresh);
      
      // Store user data from login response
      this.storeUserData(data);
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      
      // Provide user-friendly error messages
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Unable to connect to the server. Please try again or contact support.');
      }
      
      throw error;
    }
  }

  // Logout user
  async logout(): Promise<void> {
    try {
      const refreshToken = this.getRefreshToken();
      
      if (refreshToken) {
        // Call logout endpoint to blacklist refresh token
        await fetch(`${this.baseUrl}/auth/logout/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getAccessToken()}`,
          },
          body: JSON.stringify({ refresh: refreshToken }),
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear tokens regardless of API call success
      this.clearTokens();
    }
  }

  // Get current user profile
  async getCurrentUser(): Promise<User | null> {
    try {
      // First try to get user data from localStorage (stored during login)
      if (typeof window !== 'undefined') {
        const storedUserData = localStorage.getItem('user_data');
        if (storedUserData) {
          try {
            return JSON.parse(storedUserData);
          } catch (e) {
            console.warn('Failed to parse stored user data');
          }
        }
      }

      // Fallback to API call if no stored data
      const token = this.getAccessToken();
      if (!token) return null;

      const response = await fetch(`${this.baseUrl}/auth/user/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Token expired, try to refresh
          const refreshed = await this.refreshAccessToken();
          if (refreshed) {
            return this.getCurrentUser();
          }
        }
        return null;
      }

      const userData = await response.json();
      // Store the fetched user data for future use
      if (typeof window !== 'undefined') {
        localStorage.setItem('user_data', JSON.stringify(userData));
      }
      return userData;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }

  // Refresh access token
  async refreshAccessToken(): Promise<boolean> {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) return false;

      const response = await fetch(`${this.baseUrl}/auth/token/refresh/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!response.ok) {
        this.clearTokens();
        return false;
      }

      const data = await response.json();
      this.storeTokens(data.access, refreshToken);
      return true;
    } catch (error) {
      console.error('Token refresh error:', error);
      this.clearTokens();
      return false;
    }
  }

  // Token and User Data management
  private storeTokens(accessToken: string, refreshToken: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
    }
  }

  private storeUserData(loginResponse: LoginResponse): void {
    if (typeof window !== 'undefined') {
      // Store user information from login response
      const userData = {
        user_id: loginResponse.user_id,
        username: loginResponse.username,
        email: loginResponse.email,
        full_name: loginResponse.full_name,
        role: loginResponse.role,
        accessible_modules: loginResponse.accessible_modules,
        is_staff: loginResponse.is_staff,
        is_superuser: loginResponse.is_superuser
      };
      localStorage.setItem('user_data', JSON.stringify(userData));
    }
  }

  private clearTokens(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user_data');
    }
  }

  getAccessToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token');
    }
    return null;
  }

  private getRefreshToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('refresh_token');
    }
    return null;
  }

  // Get stored user data synchronously (no API call)
  getUserData(): any | null {
    if (typeof window !== 'undefined') {
      const storedUserData = localStorage.getItem('user_data');
      if (storedUserData) {
        try {
          return JSON.parse(storedUserData);
        } catch (e) {
          console.warn('Failed to parse stored user data');
        }
      }
    }
    return null;
  }

  // Check if user has admin/staff access
  isAdmin(): boolean {
    const userData = this.getUserData();
    return userData?.is_superuser || userData?.is_staff || false;
  }

  // Get user role
  getUserRole(): string | null {
    const userData = this.getUserData();
    return userData?.role || null;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  // Get authentication header for API calls with automatic token refresh
  async getAuthHeader(): Promise<Record<string, string>> {
    let token = this.getAccessToken();
    
    // If no token, try to refresh
    if (!token) {
      console.log('🔄 No access token found, attempting refresh...');
      const refreshed = await this.refreshAccessToken();
      if (refreshed) {
        token = this.getAccessToken();
      }
    }
    
    // Validate token is not expired (basic check)
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        
        // If token expires in less than 1 minute, refresh it
        if (payload.exp && payload.exp - currentTime < 60) {
          console.log('🔄 Token expires soon, refreshing...');
          const refreshed = await this.refreshAccessToken();
          if (refreshed) {
            token = this.getAccessToken();
          }
        }
      } catch (error) {
        console.warn('Token validation error:', error);
      }
    }
    
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  // Synchronous version for compatibility
  getAuthHeaderSync(): Record<string, string> {
    const token = this.getAccessToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  // Enhanced API call method with automatic token refresh
  private async makeAuthenticatedRequest(url: string, options: RequestInit = {}): Promise<Response> {
    // First attempt with current token
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

    let response = await fetch(url, requestOptions);
    
    // If 401, try to refresh token and retry once
    if (response.status === 401) {
      console.log('🔄 401 received, attempting token refresh...');
      const refreshed = await this.refreshAccessToken();
      
      if (refreshed) {
        console.log('✅ Token refreshed, retrying request...');
        // Update auth header with new token
        const newAuthHeader = await this.getAuthHeader();
        const retryOptions: RequestInit = {
          ...requestOptions,
          headers: {
            ...requestOptions.headers,
            ...newAuthHeader,
          },
        };
        
        response = await fetch(url, retryOptions);
      } else {
        console.log('❌ Token refresh failed, redirecting to login...');
        // Clear invalid tokens
        this.clearTokens();
        
        // In a real app, you'd redirect to login page
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        
        throw new Error('Authentication required. Please log in again.');
      }
    }
    
    return response;
  }

  // Admin Methods for User Management
  
  // Create new user (Admin only)
  async createUser(userData: UserCreationRequest): Promise<any> {
    try {
      // Transform frontend data to backend API format using soft coding
      const backendPayload = transformUserDataForAPI(userData);
      
      console.log('🔄 Creating user with transformed data:', {
        original: userData,
        transformed: backendPayload
      });

      const response = await this.makeAuthenticatedRequest(`${this.baseUrl}/auth/users/create/`, {
        method: 'POST',
        body: JSON.stringify(backendPayload)
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = {};
        }
        
        console.error('❌ User creation failed:', {
          status: response.status,
          statusText: response.statusText,
          errorData,
          payload: backendPayload
        });
        
        // Use soft coding for error parsing
        const errorMessage = parseAPIError(errorData, response);
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log('✅ User created successfully:', result);
      return result;
    } catch (error) {
      console.error('💥 User creation error:', error);
      throw error;
    }
  }

  // Bulk create users (Admin only)
  async createBulkUsers(usersData: any[]): Promise<any> {
    try {
      const authHeader = await this.getAuthHeader();
      const response = await fetch(`${this.baseUrl}/auth/users/bulk-create/`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...authHeader,
        },
        body: JSON.stringify({ users: usersData })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || errorData.message || 'Bulk user creation failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Bulk user creation error:', error);
      throw error;
    }
  }

  // Get list of users (Admin only)
  async getUsers(): Promise<any> {
    try {
      const authHeader = await this.getAuthHeader();
      const response = await fetch(`${this.baseUrl}/auth/users/`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...authHeader,
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || errorData.message || 'Failed to fetch users');
      }

      return await response.json();
    } catch (error) {
      console.error('Get users error:', error);
      throw error;
    }
  }

  // Get list of roles (Admin only)
  async getRoles(): Promise<any> {
    try {
      const authHeader = await this.getAuthHeader();
      const response = await fetch(`${this.baseUrl}/auth/roles/`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...authHeader,
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || errorData.message || 'Failed to fetch roles');
      }

      return await response.json();
    } catch (error) {
      console.error('Get roles error:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const authService = new AuthService();
