import { config } from '@/config';

// Authentication Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user: {
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

      return await response.json();
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

  // Token management
  private storeTokens(accessToken: string, refreshToken: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
    }
  }

  private clearTokens(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
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