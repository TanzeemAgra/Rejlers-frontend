import { config } from '@/config';

// Types
export interface TeamStats {
  totalEmployees: number;
  presentToday: number;
  absentToday: number;
  lateToday: number;
  avgAttendanceRate: number;
  avgProductivity: number;
  totalOvertime: number;
  alertCount: number;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  avatar: string;
  status: 'present' | 'absent' | 'late' | 'early_departure';
  checkInTime?: string;
  checkOutTime?: string;
  scheduledStart: string;
  scheduledEnd: string;
  totalHours: number;
  overtimeHours: number;
  attendanceRate: number;
  productivity: number;
}

export interface AIInsight {
  id: string;
  type: 'pattern' | 'alert' | 'recommendation' | 'trend';
  severity: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  actionable: boolean;
  affectedEmployees: string[];
  timestamp: string;
}

export interface EmployeeStatus {
  id: string;
  name: string;
  email: string;
  avatar: string;
  department: string;
  position: string;
  status: 'present' | 'absent' | 'late' | 'on_break' | 'overtime';
  location: 'office' | 'remote' | 'field';
  checkInTime?: string;
  checkOutTime?: string;
  scheduledStart: string;
  scheduledEnd: string;
  currentTask?: string;
  lastActivity: string;
  productivity: number;
  timeInOffice: number;
  breaksTaken: number;
  overtime: number;
  notes?: string;
}

export interface TeamAnalytics {
  attendanceTrend: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor?: string | string[];
      borderColor?: string;
      borderWidth?: number;
    }[];
  };
  departmentBreakdown: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor?: string | string[];
    }[];
  };
  productivityMetrics: any;
  weeklyPattern: any;
  monthlyComparison: {
    current: number;
    previous: number;
    change: number;
  };
  topPerformers: {
    id: string;
    name: string;
    score: number;
    improvement: number;
  }[];
  alerts: any[];
}

class TeamDashboardService {
  private baseUrl = '/api/v1/hr/team-dashboard';

  private async apiRequest(url: string, options: RequestInit = {}): Promise<any> {
    const fullUrl = `${config.api.baseUrl}${url}`;
    const response = await fetch(fullUrl, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get team statistics
   */
  async getTeamStats(filters?: {
    department?: string;
    teamId?: string;
  }): Promise<TeamStats> {
    try {
      const params = new URLSearchParams();
      if (filters?.department) params.append('department', filters.department);
      if (filters?.teamId) params.append('team_id', filters.teamId);

      const data = await this.apiRequest(`${this.baseUrl}/team_stats/?${params}`);
      return data;
    } catch (error) {
      console.error('Error fetching team stats:', error);
      throw error;
    }
  }

  /**
   * Get team members list with detailed information
   */
  async getTeamMembers(filters?: {
    department?: string;
    teamId?: string;
  }): Promise<TeamMember[]> {
    try {
      const params = new URLSearchParams();
      if (filters?.department) params.append('department', filters.department);
      if (filters?.teamId) params.append('team_id', filters.teamId);

      const data = await this.apiRequest(`${this.baseUrl}/team_members/?${params}`);
      return data;
    } catch (error) {
      console.error('Error fetching team members:', error);
      throw error;
    }
  }

  /**
   * Get AI insights and recommendations
   */
  async getAIInsights(filters?: {
    department?: string;
    teamId?: string;
    type?: string;
  }): Promise<AIInsight[]> {
    try {
      const params = new URLSearchParams();
      if (filters?.department) params.append('department', filters.department);
      if (filters?.teamId) params.append('team_id', filters.teamId);
      if (filters?.type) params.append('type', filters.type);

      const data = await this.apiRequest(`${this.baseUrl}/ai_insights/?${params}`);
      return data;
    } catch (error) {
      console.error('Error fetching AI insights:', error);
      throw error;
    }
  }

  /**
   * Get comprehensive analytics data
   */
  async getAnalytics(filters?: {
    department?: string;
    teamId?: string;
    range?: 'week' | 'month' | 'quarter';
  }): Promise<TeamAnalytics> {
    try {
      const params = new URLSearchParams();
      if (filters?.department) params.append('department', filters.department);
      if (filters?.teamId) params.append('team_id', filters.teamId);
      if (filters?.range) params.append('range', filters.range);

      const data = await this.apiRequest(`${this.baseUrl}/analytics/?${params}`);
      return data;
    } catch (error) {
      console.error('Error fetching analytics:', error);
      throw error;
    }
  }

  /**
   * Get real-time employee status for manager view
   */
  async getEmployeeStatus(filters?: {
    department?: string;
    teamId?: string;
  }): Promise<EmployeeStatus[]> {
    try {
      const params = new URLSearchParams();
      if (filters?.department) params.append('department', filters.department);
      if (filters?.teamId) params.append('team_id', filters.teamId);

      const data = await this.apiRequest(`${this.baseUrl}/employee_status/?${params}`);
      return data;
    } catch (error) {
      console.error('Error fetching employee status:', error);
      throw error;
    }
  }

  /**
   * Send message to employee (placeholder for future implementation)
   */
  async sendMessage(employeeId: string, message: string): Promise<boolean> {
    try {
      // Placeholder implementation
      console.log(`Sending message to employee ${employeeId}:`, message);
      return true;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  /**
   * Call employee (placeholder for future implementation)
   */
  async callEmployee(employeeId: string): Promise<boolean> {
    try {
      // Placeholder implementation
      console.log(`Calling employee ${employeeId}`);
      return true;
    } catch (error) {
      console.error('Error calling employee:', error);
      throw error;
    }
  }

  /**
   * Update employee notes
   */
  async updateEmployeeNotes(employeeId: string, notes: string): Promise<boolean> {
    try {
      await this.apiRequest(`/api/v1/hr/employees/${employeeId}/`, {
        method: 'PATCH',
        body: JSON.stringify({ notes })
      });
      return true;
    } catch (error) {
      console.error('Error updating employee notes:', error);
      throw error;
    }
  }

  /**
   * Generate and download team report
   */
  async downloadTeamReport(filters?: {
    department?: string;
    teamId?: string;
    format?: 'pdf' | 'excel';
    dateRange?: {
      start: string;
      end: string;
    };
  }): Promise<Blob> {
    try {
      const params = new URLSearchParams();
      if (filters?.department) params.append('department', filters.department);
      if (filters?.teamId) params.append('team_id', filters.teamId);
      if (filters?.format) params.append('format', filters.format);
      if (filters?.dateRange?.start) params.append('start_date', filters.dateRange.start);
      if (filters?.dateRange?.end) params.append('end_date', filters.dateRange.end);

      const fullUrl = `${config.api.baseUrl}${this.baseUrl}/export_report/?${params}`;
      const response = await fetch(fullUrl);
      
      if (!response.ok) {
        throw new Error(`Export request failed: ${response.statusText}`);
      }
      
      return response.blob();
    } catch (error) {
      console.error('Error downloading team report:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const teamDashboardService = new TeamDashboardService();
export default teamDashboardService;