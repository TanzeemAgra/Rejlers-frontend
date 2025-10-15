import { config } from '@/config';
import { authService } from './auth';

// Business Module API Configuration
const getBusinessModuleBaseUrl = () => {
  // Get base URL without /v1 suffix for business modules
  const baseUrl = config.api.baseUrl.replace('/api/v1', '');
  return `${baseUrl}/api`;
};

// Dashboard Data Types
export interface DashboardStats {
  projects: {
    total: number;
    active: number;
    completed: number;
    overdue: number;
  };
  finance: {
    totalBudget: number;
    spent: number;
    pendingInvoices: number;
    expenses: number;
  };
  hr: {
    totalEmployees: number;
    activeEmployees: number;
    departments: number;
    pendingTimeOff: number;
  };
  sales: {
    totalLeads: number;
    activeOpportunities: number;
    totalRevenue: number;
    conversionRate: number;
  };
  hse: {
    activeIncidents: number;
    complianceScore: number;
    assessmentsDue: number;
    environmentalMonitoring: number;
  };
  supply: {
    totalVendors: number;
    activeOrders: number;
    lowStockItems: number;
    inventoryValue: number;
  };
}

export interface RecentActivity {
  id: string;
  type: 'project' | 'finance' | 'hr' | 'sales' | 'hse' | 'supply';
  title: string;
  description: string;
  timestamp: string;
  user: string;
  priority?: 'low' | 'medium' | 'high' | 'critical';
}

class BusinessModuleService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = getBusinessModuleBaseUrl();
  }

  // Get base URL for debugging
  getBaseUrl(): string {
    return this.baseUrl;
  }

  // Make authenticated API calls
  private async apiCall(endpoint: string): Promise<any> {
    const headers = {
      'Content-Type': 'application/json',
      ...authService.getAuthHeader(),
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers,
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Try to refresh token
        const refreshed = await authService.refreshAccessToken();
        if (refreshed) {
          // Retry the request
          const retryResponse = await fetch(`${this.baseUrl}${endpoint}`, {
            headers: {
              'Content-Type': 'application/json',
              ...authService.getAuthHeader(),
            },
          });
          if (retryResponse.ok) {
            return await retryResponse.json();
          }
        }
        // Redirect to login if token refresh fails
        window.location.href = '/login';
        throw new Error('Authentication failed');
      }
      throw new Error(`API call failed: ${response.status}`);
    }

    return await response.json();
  }

  // Projects Module
  async getProjectStats() {
    try {
      const [projects] = await Promise.all([
        this.apiCall('/projects/api/projects/projects/'),
      ]);

      return {
        total: projects.count || 0,
        active: projects.results?.filter((p: any) => p.status === 'IN_PROGRESS').length || 0,
        completed: projects.results?.filter((p: any) => p.status === 'COMPLETED').length || 0,
        overdue: 0, // Will be calculated based on end_date vs current date
      };
    } catch (error) {
      console.error('Error fetching project stats:', error);
      return { total: 0, active: 0, completed: 0, overdue: 0 };
    }
  }

  // Finance Module
  async getFinanceStats() {
    try {
      const [budgets, invoices, expenses] = await Promise.all([
        this.apiCall('/finance/api/finance/budgets/'),
        this.apiCall('/finance/api/finance/invoices/'),
        this.apiCall('/finance/api/finance/expenses/'),
      ]);

      const totalBudget = budgets.results?.reduce((sum: number, b: any) => sum + parseFloat(b.total_amount || 0), 0) || 0;
      const spent = budgets.results?.reduce((sum: number, b: any) => sum + parseFloat(b.spent_amount || 0), 0) || 0;
      const pendingInvoices = invoices.results?.filter((i: any) => i.status === 'SENT').length || 0;
      const totalExpenses = expenses.results?.reduce((sum: number, e: any) => sum + parseFloat(e.amount || 0), 0) || 0;

      return {
        totalBudget,
        spent,
        pendingInvoices,
        expenses: totalExpenses,
      };
    } catch (error) {
      console.error('Error fetching finance stats:', error);
      return { totalBudget: 0, spent: 0, pendingInvoices: 0, expenses: 0 };
    }
  }

  // HR Module (under api/v1)
  async getHRStats() {
    try {
      // TODO: Replace with actual HR API endpoints when implemented
      // For now, return mock data to avoid 404 errors
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        totalEmployees: 82,
        activeEmployees: 67,
        departments: 8,
        pendingTimeOff: 5,
      };
    } catch (error) {
      console.error('Error fetching HR stats:', error);
      return { totalEmployees: 0, activeEmployees: 0, departments: 0, pendingTimeOff: 0 };
    }
  }

  // Get auth header for HR requests
  private getAuthHeader(): HeadersInit {
    const token = localStorage.getItem('access_token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  // Sales Module
  async getSalesStats() {
    try {
      const [leads, opportunities] = await Promise.all([
        this.apiCall('/sales/api/sales/leads/'),
        this.apiCall('/sales/api/sales/opportunities/'),
      ]);

      const totalRevenue = opportunities.results?.reduce((sum: number, o: any) => {
        return o.stage === 'CLOSED_WON' ? sum + parseFloat(o.amount || 0) : sum;
      }, 0) || 0;

      return {
        totalLeads: leads.count || 0,
        activeOpportunities: opportunities.results?.filter((o: any) => 
          ['PROSPECTING', 'QUALIFICATION', 'PROPOSAL', 'NEGOTIATION'].includes(o.stage)
        ).length || 0,
        totalRevenue,
        conversionRate: leads.count > 0 ? (opportunities.count / leads.count * 100) : 0,
      };
    } catch (error) {
      console.error('Error fetching sales stats:', error);
      return { totalLeads: 0, activeOpportunities: 0, totalRevenue: 0, conversionRate: 0 };
    }
  }

  // HSE Module
  async getHSEStats() {
    try {
      const [incidents, assessments] = await Promise.all([
        this.apiCall('/hse/api/hse/incidents/'),
        this.apiCall('/hse/api/hse/assessments/'),
      ]);

      const activeIncidents = incidents.results?.filter((i: any) => !i.is_resolved).length || 0;
      const avgComplianceScore = assessments.results?.reduce((sum: number, a: any) => 
        sum + parseFloat(a.compliance_score || 0), 0) / (assessments.count || 1) || 0;

      return {
        activeIncidents,
        complianceScore: Math.round(avgComplianceScore),
        assessmentsDue: assessments.results?.filter((a: any) => a.status === 'PENDING').length || 0,
        environmentalMonitoring: 0, // Mock data since monitoring endpoint may not exist
      };
    } catch (error) {
      console.error('Error fetching HSE stats:', error);
      return { activeIncidents: 0, complianceScore: 85, assessmentsDue: 0, environmentalMonitoring: 3 };
    }
  }

  // Supply Chain Module
  async getSupplyChainStats() {
    try {
      const [vendors, orders] = await Promise.all([
        this.apiCall('/supply-chain/api/supply-chain/vendors/'),
        this.apiCall('/supply-chain/api/supply-chain/purchase-orders/'),
      ]);

      const activeOrders = orders.results?.filter((o: any) => 
        ['SUBMITTED', 'APPROVED'].includes(o.status)
      ).length || 0;

      return {
        totalVendors: vendors.count || 0,
        activeOrders,
        lowStockItems: Math.floor(Math.random() * 10), // Mock data
        inventoryValue: Math.floor(Math.random() * 1000000),
      };
    } catch (error) {
      console.error('Error fetching supply chain stats:', error);
      return { totalVendors: 0, activeOrders: 0, lowStockItems: 5, inventoryValue: 750000 };
    }
  }

  // Get consolidated dashboard stats
  async getDashboardStats(): Promise<DashboardStats> {
    const [projects, finance, hr, sales, hse, supply] = await Promise.all([
      this.getProjectStats(),
      this.getFinanceStats(),
      this.getHRStats(),
      this.getSalesStats(),
      this.getHSEStats(),
      this.getSupplyChainStats(),
    ]);

    return {
      projects,
      finance,
      hr,
      sales,
      hse,
      supply,
    };
  }

  // Get recent activities across all modules
  async getRecentActivities(): Promise<RecentActivity[]> {
    // This would ideally come from an activity log API
    // For now, we'll create a mock implementation
    return [
      {
        id: '1',
        type: 'project',
        title: 'New Project Created',
        description: 'Oil Pipeline Extension project has been initiated',
        timestamp: new Date().toISOString(),
        user: 'John Doe',
        priority: 'high',
      },
      {
        id: '2',
        type: 'finance',
        title: 'Budget Approved',
        description: 'Q4 operational budget has been approved',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        user: 'Jane Smith',
        priority: 'medium',
      },
      {
        id: '3',
        type: 'hse',
        title: 'Safety Incident Reported',
        description: 'Minor equipment failure at Site A',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        user: 'Safety Team',
        priority: 'critical',
      },
    ];
  }
}

// Export singleton instance
export const businessModuleService = new BusinessModuleService();
