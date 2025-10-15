'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  Calendar,
  Search,
  Filter,
  Download,
  Bell,
  Eye,
  ChevronDown,
  UserCheck,
  UserX,
  Timer,
  Target,
  Award,
  AlertCircle
} from 'lucide-react';
import teamDashboardService, { 
  type TeamStats, 
  type TeamMember, 
  type AIInsight 
} from '@/services/teamDashboardService';

// Types imported from service

const TeamDashboard: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [teamStats, setTeamStats] = useState<TeamStats | null>(null);
  const [aiInsights, setAIInsights] = useState<AIInsight[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedInsightType, setSelectedInsightType] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Load data from API
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        
        // Load team stats, members, and insights in parallel
        const [statsData, membersData, insightsData] = await Promise.all([
          teamDashboardService.getTeamStats(),
          teamDashboardService.getTeamMembers(),
          teamDashboardService.getAIInsights()
        ]);

        setTeamStats(statsData);
        setTeamMembers(membersData);
        setAIInsights(insightsData);
      } catch (error) {
        console.error('Error loading team dashboard data:', error);
        // Fallback to mock data on error
        loadMockData();
      } finally {
        setIsLoading(false);
      }
    };

    const loadMockData = () => {
      const mockTeamMembers: TeamMember[] = [
      {
        id: '1',
        name: 'John Smith',
        email: 'john.smith@rejlers.com',
        department: 'Engineering',
        position: 'Senior Engineer',
        avatar: '/images/avatars/john.jpg',
        status: 'present',
        checkInTime: '08:30',
        scheduledStart: '09:00',
        scheduledEnd: '17:00',
        totalHours: 8.5,
        overtimeHours: 0.5,
        attendanceRate: 96,
        productivity: 92
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@rejlers.com',
        department: 'HR',
        position: 'HR Manager',
        avatar: '/images/avatars/sarah.jpg',
        status: 'late',
        checkInTime: '09:15',
        scheduledStart: '08:30',
        scheduledEnd: '16:30',
        totalHours: 7.75,
        overtimeHours: 0,
        attendanceRate: 89,
        productivity: 88
      },
      {
        id: '3',
        name: 'Mike Chen',
        email: 'mike.chen@rejlers.com',
        department: 'Engineering',
        position: 'Lead Developer',
        avatar: '/images/avatars/mike.jpg',
        status: 'absent',
        scheduledStart: '09:00',
        scheduledEnd: '17:00',
        totalHours: 0,
        overtimeHours: 0,
        attendanceRate: 78,
        productivity: 85
      },
      {
        id: '4',
        name: 'Lisa Wilson',
        email: 'lisa.wilson@rejlers.com',
        department: 'Finance',
        position: 'Financial Analyst',
        avatar: '/images/avatars/lisa.jpg',
        status: 'present',
        checkInTime: '08:45',
        scheduledStart: '09:00',
        scheduledEnd: '17:00',
        totalHours: 8.25,
        overtimeHours: 0.25,
        attendanceRate: 94,
        productivity: 91
      }
    ];

    const mockStats: TeamStats = {
      totalEmployees: 24,
      presentToday: 18,
      absentToday: 3,
      lateToday: 3,
      avgAttendanceRate: 89.5,
      avgProductivity: 88.7,
      totalOvertime: 12.5,
      alertCount: 5
    };

    const mockInsights: AIInsight[] = [
      {
        id: '1',
        type: 'alert',
        severity: 'high',
        title: 'Unusual Absence Pattern',
        description: 'Mike Chen has been absent 3 days this week, which is unusual for his attendance pattern.',
        actionable: true,
        affectedEmployees: ['3'],
        timestamp: '2025-10-14T10:30:00Z'
      },
      {
        id: '2',
        type: 'trend',
        severity: 'medium',
        title: 'Late Arrivals Increasing',
        description: 'Engineering department shows 15% increase in late arrivals over the past month.',
        actionable: true,
        affectedEmployees: ['1', '3'],
        timestamp: '2025-10-14T09:15:00Z'
      },
      {
        id: '3',
        type: 'recommendation',
        severity: 'low',
        title: 'Flexible Hours Suggestion',
        description: 'Consider implementing flexible start times for Engineering team based on productivity patterns.',
        actionable: true,
        affectedEmployees: ['1', '3'],
        timestamp: '2025-10-14T08:45:00Z'
      }
    ];

      setTeamMembers(mockTeamMembers);
      setTeamStats(mockStats);
      setAIInsights(mockInsights);
    };

    // Try to load real data, fallback to mock on error
    loadData();
  }, []);

  // Filtered data
  const filteredTeamMembers = useMemo(() => {
    return teamMembers.filter(member => {
      const matchesDepartment = selectedDepartment === 'all' || member.department === selectedDepartment;
      const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          member.email.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesDepartment && matchesSearch;
    });
  }, [teamMembers, selectedDepartment, searchTerm]);

  const filteredInsights = useMemo(() => {
    return aiInsights.filter(insight => 
      selectedInsightType === 'all' || insight.type === selectedInsightType
    );
  }, [aiInsights, selectedInsightType]);

  const departments = useMemo(() => {
    const deps = Array.from(new Set(teamMembers.map(member => member.department)));
    return deps;
  }, [teamMembers]);

  // Status colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'text-green-600 bg-green-50';
      case 'absent': return 'text-red-600 bg-red-50';
      case 'late': return 'text-yellow-600 bg-yellow-50';
      case 'early_departure': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor team attendance with AI insights</p>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export Report
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Bell className="w-4 h-4" />
            Alerts ({teamStats?.alertCount})
          </motion.button>
        </div>
      </div>

      {/* Stats Overview */}
      {teamStats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6 border"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Present Today</p>
                <p className="text-2xl font-bold text-green-600">
                  {teamStats.presentToday}/{teamStats.totalEmployees}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(teamStats.presentToday / teamStats.totalEmployees) * 100}%` }}
                ></div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6 border"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Absent Today</p>
                <p className="text-2xl font-bold text-red-600">{teamStats.absentToday}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <UserX className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">
                {teamStats.lateToday} late arrivals
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6 border"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Attendance</p>
                <p className="text-2xl font-bold text-blue-600">{teamStats.avgAttendanceRate}%</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${teamStats.avgAttendanceRate}%` }}
                ></div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-6 border"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Overtime</p>
                <p className="text-2xl font-bold text-purple-600">{teamStats.totalOvertime}h</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Timer className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">
                Avg productivity: {teamStats.avgProductivity}%
              </p>
            </div>
          </motion.div>
        </div>
      )}

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl shadow-sm border"
      >
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">AI Insights</h2>
                <p className="text-gray-600">Intelligent analysis and recommendations</p>
              </div>
            </div>
            <select
              value={selectedInsightType}
              onChange={(e) => setSelectedInsightType(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Insights</option>
              <option value="alert">Alerts</option>
              <option value="trend">Trends</option>
              <option value="recommendation">Recommendations</option>
              <option value="pattern">Patterns</option>
            </select>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {filteredInsights.map((insight) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`p-4 rounded-lg border ${getSeverityColor(insight.severity)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-4 h-4" />
                      <span className="font-semibold text-sm uppercase tracking-wide">
                        {insight.type}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(insight.severity)}`}>
                        {insight.severity}
                      </span>
                    </div>
                    <h3 className="font-semibold mb-1">{insight.title}</h3>
                    <p className="text-sm mb-3">{insight.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span>Affects {insight.affectedEmployees.length} employee(s)</span>
                      <span>{new Date(insight.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                  {insight.actionable && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="ml-4 px-3 py-1 bg-white text-gray-700 border rounded-lg text-sm hover:bg-gray-50"
                    >
                      Take Action
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 w-64"
            />
          </div>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            <Users className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Team Members */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeamMembers.map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-sm border p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{member.name}</h3>
                      <p className="text-sm text-gray-600">{member.position}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                    {member.status.replace('_', ' ')}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Check-in:</span>
                    <span className="font-medium">
                      {member.checkInTime || 'Not checked in'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Hours today:</span>
                    <span className="font-medium">{member.totalHours}h</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Attendance:</span>
                    <span className="font-medium">{member.attendanceRate}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Productivity:</span>
                    <span className="font-medium">{member.productivity}%</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{member.department}</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-blue-600 text-sm hover:text-blue-700"
                    >
                      View Details
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left py-3 px-6 font-semibold text-gray-900">Employee</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-900">Status</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-900">Check-in</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-900">Hours</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-900">Attendance</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-900">Productivity</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeamMembers.map((member) => (
                    <tr key={member.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{member.name}</div>
                            <div className="text-sm text-gray-600">{member.position}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                          {member.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm">
                        {member.checkInTime || 'Not checked in'}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium">
                        {member.totalHours}h
                      </td>
                      <td className="py-4 px-6 text-sm font-medium">
                        {member.attendanceRate}%
                      </td>
                      <td className="py-4 px-6 text-sm font-medium">
                        {member.productivity}%
                      </td>
                      <td className="py-4 px-6">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-blue-600 text-sm hover:text-blue-700"
                        >
                          View Details
                        </motion.button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default TeamDashboard;
