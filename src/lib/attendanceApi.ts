// API utility functions for attendance system
import { toast } from 'react-hot-toast';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface ClockActionPayload {
  action: 'clock_in' | 'clock_out' | 'break_start' | 'break_end';
  location?: {
    latitude: number;
    longitude: number;
  };
  work_mode?: 'OFFICE' | 'REMOTE' | 'HYBRID' | 'FIELD' | 'CLIENT_SITE';
  notes?: string;
}

interface AttendanceRecord {
  id: number;
  date: string;
  clock_in?: string;
  clock_out?: string;
  break_start?: string;
  break_end?: string;
  status: string;
  work_mode: string;
  actual_hours: number;
  overtime_hours: number;
  ai_confidence_score: number;
  pattern_deviation_score: number;
  productivity_score: number;
  is_anomaly: boolean;
  anomaly_reasons: string[];
  location_verified: boolean;
}

interface EmployeeSummary {
  employee_name: string;
  employee_id: string;
  department: string;
  current_status: string;
  today_record: AttendanceRecord | null;
  monthly_stats: {
    total_days: number;
    present_days: number;
    attendance_rate: number;
    total_hours: number;
    overtime_hours: number;
  };
  ai_scores: {
    average_confidence: number;
    pattern_score: number;
    productivity_score: number;
  };
  alerts: {
    active_alerts: number;
    recent_anomalies: number;
  };
}

interface DashboardStats {
  date: string;
  timestamp: string;
  total_employees: number;
  present_today: number;
  absent_today: number;
  late_arrivals: number;
  currently_clocked_in: number;
  remote_workers: number;
  on_break: number;
  ai_alerts: {
    active_count: number;
    high_priority: number;
    recent_anomalies: number;
  };
  average_confidence_score: number;
  average_productivity_score: number;
  trends: {
    attendance_change: number;
    direction: 'up' | 'down' | 'stable';
  };
}

class AttendanceAPI {
  private static async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const token = localStorage.getItem('auth_token');
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Clock actions
  static async clockAction(payload: ClockActionPayload): Promise<{
    success: boolean;
    message: string;
    attendance_record: AttendanceRecord;
    ai_analysis: any;
  }> {
    try {
      const result = await this.request<any>('/hr/attendance-records/clock-action/', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      toast.success(result.message);
      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Clock action failed';
      toast.error(message);
      throw error;
    }
  }

  // Get employee attendance summary
  static async getEmployeeSummary(): Promise<EmployeeSummary> {
    try {
      return await this.request<EmployeeSummary>('/hr/attendance-records/my-summary/');
    } catch (error) {
      console.error('Error fetching employee summary:', error);
      throw error;
    }
  }

  // Get dashboard statistics (for HR managers)
  static async getDashboardStats(): Promise<DashboardStats> {
    try {
      return await this.request<DashboardStats>('/hr/attendance-reports/dashboard/');
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  }

  // Get attendance records
  static async getAttendanceRecords(params?: {
    start_date?: string;
    end_date?: string;
    employee?: number;
    status?: string;
  }): Promise<{
    results: AttendanceRecord[];
    count: number;
    next: string | null;
    previous: string | null;
  }> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) queryParams.append(key, value.toString());
      });
    }

    const endpoint = `/hr/attendance-records/${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.request<any>(endpoint);
  }

  // Get AI insights and recommendations
  static async getAIInsights(): Promise<{
    overall_score: number;
    confidence_level: string;
    pattern_status: string;
    productivity_level: string;
    recommendations: string[];
    trends: {
      attendance: string;
      punctuality: string;
      productivity: string;
    };
  }> {
    // Mock implementation - in production, this would be a real API endpoint
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          overall_score: Math.random() * 20 + 80, // 80-100
          confidence_level: Math.random() > 0.3 ? 'High' : Math.random() > 0.5 ? 'Medium' : 'Low',
          pattern_status: Math.random() > 0.2 ? 'Normal' : Math.random() > 0.5 ? 'Concerning' : 'Critical',
          productivity_level: Math.random() > 0.3 ? 'Excellent' : Math.random() > 0.5 ? 'Good' : 'Needs Improvement',
          recommendations: [
            'Maintain consistent morning routine',
            'Consider taking regular breaks',
            'Great job on punctuality this month!',
            'Try to maintain steady work patterns'
          ].slice(0, Math.floor(Math.random() * 3) + 2),
          trends: {
            attendance: ['improving', 'stable', 'declining'][Math.floor(Math.random() * 3)],
            punctuality: ['improving', 'stable', 'declining'][Math.floor(Math.random() * 3)],
            productivity: ['improving', 'stable', 'declining'][Math.floor(Math.random() * 3)]
          }
        });
      }, 500);
    });
  }

  // Get location information
  static async getCurrentLocation(): Promise<{
    latitude: number;
    longitude: number;
    accuracy: number;
  }> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          });
        },
        (error) => {
          let message = 'Unknown location error';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              message = 'Location access denied by user';
              break;
            case error.POSITION_UNAVAILABLE:
              message = 'Location information unavailable';
              break;
            case error.TIMEOUT:
              message = 'Location request timed out';
              break;
          }
          reject(new Error(message));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    });
  }

  // Validate work location
  static async validateWorkLocation(
    currentLocation: { latitude: number; longitude: number },
    workMode: string
  ): Promise<{
    isValid: boolean;
    distance?: number;
    message: string;
  }> {
    // Mock office locations - in production, these would come from the API
    const officeLocations = [
      { name: 'Stockholm Office', latitude: 59.3293, longitude: 18.0686, radius: 100 },
      { name: 'Göteborg Office', latitude: 57.7089, longitude: 11.9746, radius: 100 },
    ];

    if (workMode !== 'OFFICE') {
      return { isValid: true, message: 'Remote work - location validation not required' };
    }

    // Calculate distance to nearest office
    const distances = officeLocations.map(office => {
      const R = 6371e3; // Earth's radius in meters
      const φ1 = currentLocation.latitude * Math.PI/180;
      const φ2 = office.latitude * Math.PI/180;
      const Δφ = (office.latitude - currentLocation.latitude) * Math.PI/180;
      const Δλ = (office.longitude - currentLocation.longitude) * Math.PI/180;

      const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

      return {
        ...office,
        distance: R * c
      };
    });

    const nearestOffice = distances.reduce((prev, current) => 
      prev.distance < current.distance ? prev : current
    );

    const isValid = nearestOffice.distance <= nearestOffice.radius;

    return {
      isValid,
      distance: Math.round(nearestOffice.distance),
      message: isValid 
        ? `Location verified at ${nearestOffice.name}` 
        : `Too far from office (${Math.round(nearestOffice.distance)}m away, max ${nearestOffice.radius}m)`
    };
  }
}

// Utility functions
export const formatTime = (dateString: string): string => {
  return new Date(dateString).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
};

export const formatDuration = (hours: number): string => {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return `${h}h ${m}m`;
};

export const getScoreColor = (score: number): string => {
  if (score >= 90) return 'text-green-600';
  if (score >= 75) return 'text-yellow-600';
  if (score >= 60) return 'text-orange-600';
  return 'text-red-600';
};

export const getScoreBgColor = (score: number): string => {
  if (score >= 90) return 'bg-green-100 border-green-200';
  if (score >= 75) return 'bg-yellow-100 border-yellow-200';
  if (score >= 60) return 'bg-orange-100 border-orange-200';
  return 'bg-red-100 border-red-200';
};

export const getStatusColor = (status: string): string => {
  switch (status.toUpperCase()) {
    case 'PRESENT': return 'text-green-600 bg-green-100';
    case 'LATE': return 'text-orange-600 bg-orange-100';
    case 'ABSENT': return 'text-red-600 bg-red-100';
    case 'WORK_FROM_HOME': return 'text-blue-600 bg-blue-100';
    case 'ON_LEAVE': return 'text-purple-600 bg-purple-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

export default AttendanceAPI;

// Export types
export type {
  ClockActionPayload,
  AttendanceRecord,
  EmployeeSummary,
  DashboardStats
};
