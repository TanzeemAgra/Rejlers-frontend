// Enhanced Employee Attendance Calendar - Enterprise-style monthly calendar with login/logout times
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  Building2,
  Home,
  MapPin,
  Monitor,
  Coffee,
  AlertTriangle,
  CheckCircle,
  X,
  Download,
  Filter,
  Search,
  MoreHorizontal,
  Timer,
  Award,
  TrendingUp,
  TrendingDown,
  Activity,
  Target,
  Zap,
  Shield,
  Eye,
  Edit,
  RefreshCw
} from 'lucide-react';

interface AttendanceEntry {
  date: string;
  clock_in?: string;
  clock_out?: string;
  break_start?: string;
  break_end?: string;
  total_hours: number;
  break_duration?: number;
  overtime_hours: number;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'HOLIDAY' | 'WEEKEND' | 'SICK_LEAVE' | 'VACATION';
  work_mode: 'OFFICE' | 'REMOTE' | 'HYBRID' | 'FIELD';
  location?: string;
  notes?: string;
  ai_confidence_score: number;
  is_anomaly: boolean;
  productivity_score?: number;
  scheduled_in_time?: string;
  scheduled_out_time?: string;
  scheduled_hours?: number;
  late_by_minutes?: number;
  early_by_minutes?: number;
  punches?: PunchRecord[];
}

interface PunchRecord {
  id: number;
  time: string;
  type: 'IN' | 'OUT' | 'BREAK_START' | 'BREAK_END';
  location?: string;
  device?: string;
  verified: boolean;
}

interface MonthlyStats {
  total_working_days: number;
  present_days: number;
  absent_days: number;
  late_days: number;
  total_hours: number;
  overtime_hours: number;
  average_daily_hours: number;
  attendance_rate: number;
  punctuality_rate: number;
  average_ai_score: number;
}

interface EmployeeInfo {
  id: string;
  name: string;
  department: string;
  position: string;
  employee_id: string;
  email: string;
  profile_image?: string;
}

interface EmployeeAttendanceCalendarProps {
  employeeId: string;
  className?: string;
  showEmployeeInfo?: boolean;
  allowEdit?: boolean;
}

const EmployeeAttendanceCalendar: React.FC<EmployeeAttendanceCalendarProps> = ({
  employeeId,
  className = '',
  showEmployeeInfo = true,
  allowEdit = false
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [attendanceData, setAttendanceData] = useState<Record<string, AttendanceEntry>>({});
  const [monthlyStats, setMonthlyStats] = useState<MonthlyStats | null>(null);
  const [employeeInfo, setEmployeeInfo] = useState<EmployeeInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

  useEffect(() => {
    loadAttendanceData();
    loadEmployeeInfo();
  }, [employeeId, currentDate]);

  const loadEmployeeInfo = async () => {
    // Mock employee info - replace with API call
    const mockEmployee: EmployeeInfo = {
      id: employeeId,
      name: 'John Smith',
      department: 'Engineering',
      position: 'Senior Software Developer',
      employee_id: 'REJ2024001',
      email: 'john.smith@rejlers.com',
      profile_image: '/api/placeholder/100/100'
    };
    setEmployeeInfo(mockEmployee);
  };

  const loadAttendanceData = async () => {
    setLoading(true);
    try {
      // Generate comprehensive mock data for the month
      const data: Record<string, AttendanceEntry> = {};
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      let totalHours = 0;
      let totalPresent = 0;
      let totalLate = 0;
      let totalOvertime = 0;
      let totalAIScore = 0;
      let workingDays = 0;

      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dateStr = date.toISOString().split('T')[0];
        const dayOfWeek = date.getDay();
        
        // Skip future dates
        if (date > new Date()) continue;

        let entry: AttendanceEntry;

        // Weekend
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          entry = {
            date: dateStr,
            total_hours: 0,
            overtime_hours: 0,
            status: 'WEEKEND',
            work_mode: 'OFFICE',
            ai_confidence_score: 0,
            is_anomaly: false
          };
        }
        // Holidays (mock some)
        else if ([1, 15, 25].includes(day)) {
          entry = {
            date: dateStr,
            total_hours: 0,
            overtime_hours: 0,
            status: 'HOLIDAY',
            work_mode: 'OFFICE',
            ai_confidence_score: 0,
            is_anomaly: false,
            notes: day === 1 ? 'New Year Holiday' : day === 15 ? 'National Day' : 'Christmas Holiday'
          };
        }
        // Regular working days
        else {
          workingDays++;
          const isLate = Math.random() > 0.85;
          const isAbsent = Math.random() > 0.95;
          
          // Standard work schedule
          const scheduledInHour = 9;
          const scheduledOutHour = 17;
          const scheduledIn = '09:00';
          const scheduledOut = '17:00';
          const scheduledHours = 8;
          
          if (isAbsent) {
            entry = {
              date: dateStr,
              total_hours: 0,
              overtime_hours: 0,
              status: Math.random() > 0.5 ? 'ABSENT' : 'SICK_LEAVE',
              work_mode: 'OFFICE',
              ai_confidence_score: 0,
              is_anomaly: true,
              notes: 'Sick leave - Doctor appointment',
              scheduled_in_time: scheduledIn,
              scheduled_out_time: scheduledOut,
              scheduled_hours: scheduledHours,
              late_by_minutes: 0,
              early_by_minutes: 0,
              punches: []
            };
          } else {
            totalPresent++;
            if (isLate) totalLate++;

            // Generate realistic times
            const clockInHour = isLate ? 9 + Math.floor(Math.random() * 2) : 8 + Math.floor(Math.random() * 1);
            const clockInMinute = Math.floor(Math.random() * 60);
            const clockOutHour = 17 + Math.floor(Math.random() * 2);
            const clockOutMinute = Math.floor(Math.random() * 60);

            const clockIn = `${clockInHour.toString().padStart(2, '0')}:${clockInMinute.toString().padStart(2, '0')}`;
            const clockOut = `${clockOutHour.toString().padStart(2, '0')}:${clockOutMinute.toString().padStart(2, '0')}`;

            // Calculate late/early minutes
            const actualInMinutes = clockInHour * 60 + clockInMinute;
            const scheduledInMinutes = scheduledInHour * 60;
            const actualOutMinutes = clockOutHour * 60 + clockOutMinute;
            const scheduledOutMinutes = scheduledOutHour * 60;
            
            const lateByMinutes = Math.max(0, actualInMinutes - scheduledInMinutes);
            const earlyByMinutes = Math.max(0, scheduledOutMinutes - actualOutMinutes);

            // Calculate hours
            const hoursWorked = clockOutHour - clockInHour + (clockOutMinute - clockInMinute) / 60;
            const overtimeHours = Math.max(0, hoursWorked - scheduledHours);
            
            totalHours += hoursWorked;
            totalOvertime += overtimeHours;

            // Break times
            const breakStart = `${12 + Math.floor(Math.random() * 2)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`;
            const breakDuration = 30 + Math.floor(Math.random() * 30);

            // Work mode distribution
            const workModes: AttendanceEntry['work_mode'][] = ['OFFICE', 'REMOTE', 'HYBRID', 'FIELD'];
            const workMode = workModes[Math.floor(Math.random() * workModes.length)];

            // AI scores
            const aiScore = 70 + Math.random() * 30;
            totalAIScore += aiScore;

            // Generate punch records
            const punches: PunchRecord[] = [
              {
                id: 1,
                time: clockIn,
                type: 'IN',
                location: workMode === 'OFFICE' ? 'Main Office - Entrance' : 'Remote Location',
                device: workMode === 'OFFICE' ? 'Biometric Scanner #12' : 'Mobile App',
                verified: true
              },
              {
                id: 2,
                time: breakStart,
                type: 'BREAK_START',
                location: workMode === 'OFFICE' ? 'Main Office - Cafeteria' : 'Remote Location',
                device: 'Mobile App',
                verified: true
              },
              {
                id: 3,
                time: `${parseInt(breakStart.split(':')[0])}:${(parseInt(breakStart.split(':')[1]) + breakDuration).toString().padStart(2, '0')}`,
                type: 'BREAK_END',
                location: workMode === 'OFFICE' ? 'Main Office - Desk' : 'Remote Location',
                device: 'Mobile App',
                verified: true
              },
              {
                id: 4,
                time: clockOut,
                type: 'OUT',
                location: workMode === 'OFFICE' ? 'Main Office - Entrance' : 'Remote Location',
                device: workMode === 'OFFICE' ? 'Biometric Scanner #12' : 'Mobile App',
                verified: true
              }
            ];

            entry = {
              date: dateStr,
              clock_in: clockIn,
              clock_out: clockOut,
              break_start: breakStart,
              break_end: `${parseInt(breakStart.split(':')[0])}:${(parseInt(breakStart.split(':')[1]) + breakDuration).toString().padStart(2, '0')}`,
              total_hours: hoursWorked,
              break_duration: breakDuration,
              overtime_hours: overtimeHours,
              status: isLate ? 'LATE' : 'PRESENT',
              work_mode: workMode,
              location: workMode === 'OFFICE' ? 'Main Office' : workMode === 'REMOTE' ? 'Home' : 'Client Site',
              ai_confidence_score: aiScore,
              productivity_score: 80 + Math.random() * 20,
              is_anomaly: Math.random() > 0.9,
              notes: Math.random() > 0.8 ? 'Client meeting scheduled' : undefined,
              scheduled_in_time: scheduledIn,
              scheduled_out_time: scheduledOut,
              scheduled_hours: scheduledHours,
              late_by_minutes: lateByMinutes,
              early_by_minutes: earlyByMinutes,
              punches: punches
            };
          }
        }

        data[dateStr] = entry;
      }

      // Calculate monthly stats
      const stats: MonthlyStats = {
        total_working_days: workingDays,
        present_days: totalPresent,
        absent_days: workingDays - totalPresent,
        late_days: totalLate,
        total_hours: totalHours,
        overtime_hours: totalOvertime,
        average_daily_hours: totalPresent > 0 ? totalHours / totalPresent : 0,
        attendance_rate: workingDays > 0 ? (totalPresent / workingDays) * 100 : 0,
        punctuality_rate: totalPresent > 0 ? ((totalPresent - totalLate) / totalPresent) * 100 : 0,
        average_ai_score: totalPresent > 0 ? totalAIScore / totalPresent : 0
      };

      setAttendanceData(data);
      setMonthlyStats(stats);
    } catch (error) {
      console.error('Failed to load attendance data:', error);
    } finally {
      setLoading(false);
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
    setSelectedDate(null);
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Previous month's trailing days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      days.push({
        date: date.toISOString().split('T')[0],
        day: date.getDate(),
        isCurrentMonth: false,
        isToday: false
      });
    }

    // Current month's days
    const today = new Date().toISOString().split('T')[0];
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateStr = date.toISOString().split('T')[0];
      
      days.push({
        date: dateStr,
        day,
        isCurrentMonth: true,
        isToday: dateStr === today
      });
    }

    // Next month's leading days
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day);
      days.push({
        date: date.toISOString().split('T')[0],
        day: date.getDate(),
        isCurrentMonth: false,
        isToday: false
      });
    }

    return days;
  };

  const getStatusColor = (status: AttendanceEntry['status']) => {
    const colors = {
      PRESENT: 'bg-green-100 border-green-300 text-green-800',
      LATE: 'bg-orange-100 border-orange-300 text-orange-800',
      ABSENT: 'bg-red-100 border-red-300 text-red-800',
      HOLIDAY: 'bg-purple-100 border-purple-300 text-purple-800',
      WEEKEND: 'bg-gray-100 border-gray-300 text-gray-600',
      SICK_LEAVE: 'bg-yellow-100 border-yellow-300 text-yellow-800',
      VACATION: 'bg-blue-100 border-blue-300 text-blue-800'
    };
    return colors[status] || 'bg-gray-100 border-gray-300 text-gray-600';
  };

  const getWorkModeIcon = (workMode: AttendanceEntry['work_mode']) => {
    const icons = {
      OFFICE: Building2,
      REMOTE: Home,
      HYBRID: Monitor,
      FIELD: MapPin
    };
    const IconComponent = icons[workMode];
    return IconComponent ? <IconComponent className="w-3 h-3" /> : null;
  };

  const formatTime = (time?: string) => {
    if (!time) return '--:--';
    return time;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const days = getDaysInMonth();
  const selectedEntry = selectedDate ? attendanceData[selectedDate] : null;

  if (loading) {
    return (
      <div className={`bg-white rounded-xl shadow-lg border p-8 ${className}`}>
        <div className="flex items-center justify-center">
          <RefreshCw className="animate-spin w-8 h-8 text-blue-500" />
          <span className="ml-3 text-gray-600">Loading attendance data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl shadow-lg border ${className}`}>
      {/* Header Section */}
      {showEmployeeInfo && employeeInfo && (
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{employeeInfo.name}</h1>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><span className="font-medium">ID:</span> {employeeInfo.employee_id}</p>
                  <p><span className="font-medium">Department:</span> {employeeInfo.department}</p>
                  <p><span className="font-medium">Position:</span> {employeeInfo.position}</p>
                </div>
              </div>
            </div>
            
            {monthlyStats && (
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-white p-3 rounded-lg border shadow-sm">
                  <div className="text-2xl font-bold text-green-600">{monthlyStats.attendance_rate.toFixed(1)}%</div>
                  <div className="text-xs text-gray-600">Attendance</div>
                </div>
                <div className="bg-white p-3 rounded-lg border shadow-sm">
                  <div className="text-2xl font-bold text-blue-600">{monthlyStats.total_hours.toFixed(0)}h</div>
                  <div className="text-xs text-gray-600">Total Hours</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Calendar Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            
            <h2 className="text-2xl font-bold text-gray-900">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors">
              <Calendar className="w-4 h-4" />
              <span>View Details</span>
            </button>
          </div>
        </div>

        {/* Monthly Statistics Cards */}
        {monthlyStats && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-green-700">{monthlyStats.present_days}</div>
                  <div className="text-sm text-green-600">Present</div>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </div>

            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-red-700">{monthlyStats.absent_days}</div>
                  <div className="text-sm text-red-600">Absent</div>
                </div>
                <X className="w-8 h-8 text-red-500" />
              </div>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-orange-700">{monthlyStats.late_days}</div>
                  <div className="text-sm text-orange-600">Late</div>
                </div>
                <Clock className="w-8 h-8 text-orange-500" />
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-blue-700">{monthlyStats.overtime_hours.toFixed(1)}h</div>
                  <div className="text-sm text-blue-600">Overtime</div>
                </div>
                <Timer className="w-8 h-8 text-blue-500" />
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-purple-700">{monthlyStats.punctuality_rate.toFixed(1)}%</div>
                  <div className="text-sm text-purple-600">On Time</div>
                </div>
                <Award className="w-8 h-8 text-purple-500" />
              </div>
            </div>

            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-indigo-700">{monthlyStats.average_ai_score.toFixed(1)}</div>
                  <div className="text-sm text-indigo-600">AI Score</div>
                </div>
                <Zap className="w-8 h-8 text-indigo-500" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex">
        {/* Calendar Grid */}
        <div className="flex-1 p-6">
          {/* Week Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map(day => (
              <div key={day} className="text-center text-sm font-semibold text-gray-700 p-3 bg-gray-50 rounded-lg">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {days.map(({ date, day, isCurrentMonth, isToday }) => {
              const entry = attendanceData[date];
              const isSelected = selectedDate === date;
              
              return (
                <motion.button
                  key={date}
                  whileHover={{ scale: isCurrentMonth ? 1.02 : 1 }}
                  whileTap={{ scale: isCurrentMonth ? 0.98 : 1 }}
                  onClick={() => isCurrentMonth ? setSelectedDate(date) : null}
                  className={`
                    relative p-2 min-h-[120px] border rounded-lg transition-all text-left
                    ${!isCurrentMonth ? 'opacity-30 cursor-not-allowed bg-gray-50' : 'hover:shadow-md cursor-pointer'}
                    ${isSelected ? 'ring-2 ring-blue-500 shadow-md' : ''}
                    ${isToday ? 'ring-2 ring-blue-300 bg-blue-50' : ''}
                    ${entry ? getStatusColor(entry.status) : 'bg-gray-50 border-gray-200'}
                  `}
                  disabled={!isCurrentMonth}
                >
                  {/* Day Number */}
                  <div className="flex items-start justify-between mb-2">
                    <span className={`text-sm font-bold ${isToday ? 'text-blue-700' : ''}`}>
                      {day}
                    </span>
                    {entry?.is_anomaly && (
                      <AlertTriangle className="w-3 h-3 text-red-500" />
                    )}
                  </div>

                  {/* Entry Details */}
                  {entry && entry.status !== 'WEEKEND' && entry.status !== 'HOLIDAY' && (
                    <div className="space-y-1">
                      {/* Clock In/Out Times */}
                      {entry.clock_in && (
                        <div className="text-xs space-y-0.5">
                          <div className="flex items-center justify-between">
                            <span className="text-green-700 font-medium">In:</span>
                            <span className="text-green-800">{formatTime(entry.clock_in)}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-red-700 font-medium">Out:</span>
                            <span className="text-red-800">{formatTime(entry.clock_out)}</span>
                          </div>
                        </div>
                      )}

                      {/* Work Hours */}
                      {entry.total_hours > 0 && (
                        <div className="text-xs bg-white bg-opacity-70 rounded px-1 py-0.5">
                          <div className="font-medium text-gray-800">
                            {entry.total_hours.toFixed(1)}h
                          </div>
                        </div>
                      )}

                      {/* Work Mode Icon */}
                      <div className="flex items-center justify-between">
                        {getWorkModeIcon(entry.work_mode)}
                        {entry.overtime_hours > 0 && (
                          <span className="text-xs text-orange-600 font-medium">
                            +{entry.overtime_hours.toFixed(1)}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Status Labels */}
                  {entry && (entry.status === 'HOLIDAY' || entry.status === 'WEEKEND' || entry.status === 'ABSENT' || entry.status === 'SICK_LEAVE') && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-medium">
                        {entry.status.replace('_', ' ')}
                      </span>
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Sidebar - Day Details */}
        <AnimatePresence>
          {selectedEntry && (
            <motion.div
              initial={{ opacity: 0, x: 300, width: 0 }}
              animate={{ opacity: 1, x: 0, width: 350 }}
              exit={{ opacity: 0, x: 300, width: 0 }}
              className="border-l border-gray-200 bg-gray-50 overflow-hidden"
            >
              <div className="p-6 space-y-4 h-full overflow-y-auto">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">
                    Day Details
                  </h3>
                  <button
                    onClick={() => setSelectedDate(null)}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Date Info */}
                  <div className="bg-white p-4 rounded-lg border">
                    <div className="text-sm font-semibold text-gray-700 mb-2">Date</div>
                    <div className="text-sm text-gray-900">
                      {new Date(selectedEntry.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>

                  {/* Status */}
                  <div className="bg-white p-4 rounded-lg border">
                    <div className="text-sm font-semibold text-gray-700 mb-2">Status</div>
                    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedEntry.status)}`}>
                      <span>{selectedEntry.status.replace('_', ' ')}</span>
                    </div>
                  </div>

                  {/* Time Summary */}
                  {selectedEntry.clock_in && (
                    <div className="bg-white p-4 rounded-lg border">
                      <div className="text-sm font-semibold text-gray-700 mb-3">Time Summary</div>
                      <div className="space-y-3">
                        {/* Scheduled vs Actual Times */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-xs text-gray-500 mb-1">Scheduled In</div>
                            <div className="text-sm font-medium text-gray-700">{formatTime(selectedEntry.scheduled_in_time)}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 mb-1">Actual In</div>
                            <div className={`text-sm font-medium ${(selectedEntry.late_by_minutes || 0) > 0 ? 'text-red-700' : 'text-green-700'}`}>
                              {formatTime(selectedEntry.clock_in)}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 mb-1">Scheduled Out</div>
                            <div className="text-sm font-medium text-gray-700">{formatTime(selectedEntry.scheduled_out_time)}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 mb-1">Actual Out</div>
                            <div className={`text-sm font-medium ${(selectedEntry.early_by_minutes || 0) > 0 ? 'text-orange-700' : 'text-green-700'}`}>
                              {formatTime(selectedEntry.clock_out)}
                            </div>
                          </div>
                        </div>

                        {/* Time Analysis */}
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-xs font-semibold text-gray-600 mb-2">Time Analysis</div>
                          <div className="space-y-1">
                            {(selectedEntry.late_by_minutes || 0) > 0 && (
                              <div className="flex items-center text-red-600 text-xs">
                                <Clock className="w-3 h-3 mr-1" />
                                Late by {selectedEntry.late_by_minutes || 0} minutes
                              </div>
                            )}
                            {(selectedEntry.early_by_minutes || 0) > 0 && (
                              <div className="flex items-center text-orange-600 text-xs">
                                <Clock className="w-3 h-3 mr-1" />
                                Left early by {selectedEntry.early_by_minutes || 0} minutes
                              </div>
                            )}
                            {(selectedEntry.late_by_minutes || 0) === 0 && (selectedEntry.early_by_minutes || 0) === 0 && (
                              <div className="flex items-center text-green-600 text-xs">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Perfect timing
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Hours Summary */}
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Scheduled Hours:</span>
                            <span className="text-sm font-medium">{selectedEntry.scheduled_hours}h</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-semibold text-gray-700">Actual Hours:</span>
                            <span className="text-sm font-bold text-blue-700">{selectedEntry.total_hours.toFixed(2)}h</span>
                          </div>
                          {selectedEntry.overtime_hours > 0 && (
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-semibold text-gray-700">Overtime:</span>
                              <span className="text-sm font-bold text-orange-700">{selectedEntry.overtime_hours.toFixed(2)}h</span>
                            </div>
                          )}
                        </div>

                        {/* Break Times */}
                        {selectedEntry.break_start && (
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <div className="text-xs font-semibold text-gray-600 mb-2">Break Times</div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Break Start:</span>
                              <span className="text-sm font-medium text-orange-700">{formatTime(selectedEntry.break_start)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Break End:</span>
                              <span className="text-sm font-medium text-orange-700">{formatTime(selectedEntry.break_end)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Duration:</span>
                              <span className="text-sm font-medium">{selectedEntry.break_duration} min</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Punch Records */}
                  {selectedEntry.punches && selectedEntry.punches.length > 0 && (
                    <div className="bg-white p-4 rounded-lg border">
                      <div className="text-sm font-semibold text-gray-700 mb-3">Punch Records</div>
                      <div className="space-y-2">
                        {selectedEntry.punches.map((punch) => (
                          <div key={punch.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                punch.type === 'IN' ? 'bg-green-100 text-green-800' :
                                punch.type === 'OUT' ? 'bg-red-100 text-red-800' :
                                'bg-blue-100 text-blue-800'
                              }`}>
                                {punch.type.replace('_', ' ')}
                              </span>
                              <span className="text-sm font-medium">{formatTime(punch.time)}</span>
                              {punch.verified && (
                                <Shield className="w-3 h-3 text-green-500" />
                              )}
                            </div>
                            <div className="text-right">
                              <div className="text-xs text-gray-500">{punch.device}</div>
                              <div className="text-xs text-gray-400">{punch.location}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Work Details */}
                  <div className="bg-white p-4 rounded-lg border">
                    <div className="text-sm font-semibold text-gray-700 mb-3">Work Details</div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Mode:</span>
                        <div className="flex items-center space-x-1">
                          {getWorkModeIcon(selectedEntry.work_mode)}
                          <span className="text-sm font-medium">{selectedEntry.work_mode}</span>
                        </div>
                      </div>
                      {selectedEntry.location && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Location:</span>
                          <span className="text-sm font-medium">{selectedEntry.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* AI Analysis */}
                  {selectedEntry.ai_confidence_score > 0 && (
                    <div className="bg-white p-4 rounded-lg border">
                      <div className="text-sm font-semibold text-gray-700 mb-3">AI Analysis</div>
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">Confidence Score</span>
                            <span className="text-sm font-bold text-purple-700">
                              {selectedEntry.ai_confidence_score.toFixed(1)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-purple-500 h-2 rounded-full"
                              style={{ width: `${selectedEntry.ai_confidence_score}%` }}
                            />
                          </div>
                        </div>
                        
                        {selectedEntry.productivity_score && (
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-gray-600">Productivity</span>
                              <span className="text-sm font-bold text-blue-700">
                                {selectedEntry.productivity_score.toFixed(1)}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${selectedEntry.productivity_score}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {selectedEntry.is_anomaly && (
                          <div className="bg-red-50 p-3 rounded border border-red-200">
                            <div className="flex items-center space-x-2 text-red-700">
                              <AlertTriangle className="w-4 h-4" />
                              <span className="text-sm font-medium">Anomaly Detected</span>
                            </div>
                            <div className="text-xs text-red-600 mt-1">
                              This record shows unusual patterns.
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  {selectedEntry.notes && (
                    <div className="bg-white p-4 rounded-lg border">
                      <div className="text-sm font-semibold text-gray-700 mb-2">Notes</div>
                      <div className="text-sm text-gray-600">{selectedEntry.notes}</div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EmployeeAttendanceCalendar;