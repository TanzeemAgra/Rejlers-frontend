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
  company_name?: string;
  job_title?: string;
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

  // Get authentication header for API calls
  getAuthHeader(): Record<string, string> {
    const token = this.getAccessToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}

// Export singleton instance
export const authService = new AuthService();