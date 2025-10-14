// Attendance Calendar Component - Interactive calendar with attendance visualization
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Coffee,
  AlertTriangle,
  CheckCircle,
  X,
  Users,
  Home,
  Building2,
  Timer,
  Filter,
  Download,
  Search
} from 'lucide-react';

interface AttendanceDay {
  date: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'HOLIDAY' | 'WEEKEND';
  clock_in?: string;
  clock_out?: string;
  hours_worked?: number;
  work_mode?: 'OFFICE' | 'REMOTE' | 'HYBRID' | 'FIELD';
  ai_confidence_score?: number;
  break_duration?: number;
  overtime_hours?: number;
  is_anomaly?: boolean;
  notes?: string;
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

interface CalendarProps {
  className?: string;
  employeeId?: string;
  onDateSelect?: (date: string) => void;
}

const AttendanceCalendar: React.FC<CalendarProps> = ({
  className = '',
  employeeId,
  onDateSelect
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [attendanceData, setAttendanceData] = useState<Record<string, AttendanceDay>>({});
  const [loading, setLoading] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Generate mock attendance data
  useEffect(() => {
    const generateMockData = () => {
      const data: Record<string, AttendanceDay> = {};
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dateStr = date.toISOString().split('T')[0];
        const dayOfWeek = date.getDay();
        
        // Skip future dates
        if (date > new Date()) continue;

        let status: AttendanceDay['status'];
        let clockIn: string | undefined;
        let clockOut: string | undefined;
        let hoursWorked: number | undefined;
        let workMode: AttendanceDay['work_mode'];
        let aiScore: number | undefined;

        // Weekend
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          status = 'WEEKEND';
        }
        // Holiday (mock some holidays)
        else if (day === 1 || day === 15) {
          status = 'HOLIDAY';
        }
        // Random attendance pattern
        else {
          const rand = Math.random();
          if (rand > 0.9) {
            status = 'ABSENT';
          } else if (rand > 0.8) {
            status = 'LATE';
            clockIn = `${9 + Math.floor(Math.random() * 2)}:${15 + Math.floor(Math.random() * 45)}`;
            clockOut = '18:00';
            hoursWorked = 8 - Math.random();
          } else {
            status = 'PRESENT';
            clockIn = `${8 + Math.floor(Math.random() * 2)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`;
            clockOut = `${17 + Math.floor(Math.random() * 2)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`;
            hoursWorked = 7.5 + Math.random() * 1.5;
          }

          // Work mode distribution
          const modeRand = Math.random();
          if (modeRand > 0.7) {
            workMode = 'OFFICE';
          } else if (modeRand > 0.4) {
            workMode = 'REMOTE';
          } else if (modeRand > 0.2) {
            workMode = 'HYBRID';
          } else {
            workMode = 'FIELD';
          }

          aiScore = 75 + Math.random() * 25;
        }

        data[dateStr] = {
          date: dateStr,
          status,
          clock_in: clockIn,
          clock_out: clockOut,
          hours_worked: hoursWorked,
          work_mode: workMode,
          ai_confidence_score: aiScore,
          break_duration: status === 'PRESENT' || status === 'LATE' ? 30 + Math.random() * 30 : undefined,
          overtime_hours: hoursWorked && hoursWorked > 8 ? hoursWorked - 8 : 0,
          is_anomaly: Math.random() > 0.9,
          notes: Math.random() > 0.8 ? 'Meeting with client' : undefined
        };
      }

      setAttendanceData(data);
      setLoading(false);
    };

    generateMockData();
  }, [currentDate]);

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
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
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateStr = date.toISOString().split('T')[0];
      const today = new Date().toISOString().split('T')[0];
      
      days.push({
        date: dateStr,
        day,
        isCurrentMonth: true,
        isToday: dateStr === today
      });
    }

    // Next month's leading days
    const remainingDays = 42 - days.length; // 6 rows × 7 days
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

  const getStatusColor = (status: AttendanceDay['status']) => {
    switch (status) {
      case 'PRESENT':
        return 'bg-green-100 border-green-300 text-green-800';
      case 'LATE':
        return 'bg-orange-100 border-orange-300 text-orange-800';
      case 'ABSENT':
        return 'bg-red-100 border-red-300 text-red-800';
      case 'HOLIDAY':
        return 'bg-purple-100 border-purple-300 text-purple-800';
      case 'WEEKEND':
        return 'bg-gray-100 border-gray-300 text-gray-600';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-500';
    }
  };

  const getStatusIcon = (status: AttendanceDay['status'], isAnomaly?: boolean) => {
    if (isAnomaly) return <AlertTriangle className="w-3 h-3" />;
    
    switch (status) {
      case 'PRESENT':
        return <CheckCircle className="w-3 h-3" />;
      case 'LATE':
        return <Clock className="w-3 h-3" />;
      case 'ABSENT':
        return <X className="w-3 h-3" />;
      case 'HOLIDAY':
        return <Calendar className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const getWorkModeIcon = (workMode?: AttendanceDay['work_mode']) => {
    switch (workMode) {
      case 'OFFICE':
        return <Building2 className="w-3 h-3" />;
      case 'REMOTE':
        return <Home className="w-3 h-3" />;
      case 'HYBRID':
        return <Users className="w-3 h-3" />;
      case 'FIELD':
        return <MapPin className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const handleDateClick = (dateStr: string, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return;
    
    setSelectedDate(dateStr);
    onDateSelect?.(dateStr);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const days = getDaysInMonth();
  const selectedRecord = selectedDate ? attendanceData[selectedDate] : null;

  const filteredData = Object.values(attendanceData).filter(record => {
    if (selectedFilters.length === 0) return true;
    return selectedFilters.includes(record.status);
  });

  const stats = {
    present: filteredData.filter(d => d.status === 'PRESENT').length,
    late: filteredData.filter(d => d.status === 'LATE').length,
    absent: filteredData.filter(d => d.status === 'ABSENT').length,
    totalHours: filteredData.reduce((sum, d) => sum + (d.hours_worked || 0), 0),
    averageScore: filteredData.reduce((sum, d) => sum + (d.ai_confidence_score || 0), 0) / filteredData.length || 0
  };

  if (loading) {
    return (
      <div className={`bg-white rounded-xl shadow-lg border p-8 ${className}`}>
        <div className="flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" />
          <span className="ml-3 text-gray-600">Loading calendar...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl shadow-lg border ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Attendance Calendar</h2>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          
          <h3 className="text-xl font-semibold text-gray-900">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
            <div className="text-sm text-green-600">Present</div>
            <div className="text-xl font-bold text-green-700">{stats.present}</div>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
            <div className="text-sm text-orange-600">Late</div>
            <div className="text-xl font-bold text-orange-700">{stats.late}</div>
          </div>
          <div className="bg-red-50 p-3 rounded-lg border border-red-200">
            <div className="text-sm text-red-600">Absent</div>
            <div className="text-xl font-bold text-red-700">{stats.absent}</div>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <div className="text-sm text-blue-600">Total Hours</div>
            <div className="text-xl font-bold text-blue-700">{stats.totalHours.toFixed(1)}</div>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
            <div className="text-sm text-purple-600">Avg Score</div>
            <div className="text-xl font-bold text-purple-700">{stats.averageScore.toFixed(1)}</div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Calendar Grid */}
        <div className="flex-1 p-6">
          {/* Week Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 p-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {days.map(({ date, day, isCurrentMonth, isToday }) => {
              const record = attendanceData[date];
              const isSelected = selectedDate === date;
              
              return (
                <motion.button
                  key={date}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDateClick(date, isCurrentMonth)}
                  className={`
                    relative p-2 min-h-[60px] border rounded-lg transition-all text-left
                    ${isCurrentMonth ? 'hover:shadow-md' : 'opacity-30 cursor-not-allowed'}
                    ${isSelected ? 'ring-2 ring-blue-500 shadow-md' : ''}
                    ${isToday ? 'ring-2 ring-blue-300' : ''}
                    ${record ? getStatusColor(record.status) : 'bg-gray-50 border-gray-200'}
                  `}
                  disabled={!isCurrentMonth}
                >
                  <div className="flex items-start justify-between">
                    <span className={`text-sm font-medium ${
                      isToday ? 'text-blue-700 font-bold' : ''
                    }`}>
                      {day}
                    </span>
                    {record && (
                      <div className="flex flex-col space-y-1">
                        {getStatusIcon(record.status, record.is_anomaly)}
                        {getWorkModeIcon(record.work_mode)}
                      </div>
                    )}
                  </div>
                  
                  {record?.hours_worked && (
                    <div className="text-xs opacity-75 mt-1">
                      {record.hours_worked.toFixed(1)}h
                    </div>
                  )}

                  {record?.is_anomaly && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Sidebar - Selected Day Details */}
        <AnimatePresence>
          {selectedRecord && (
            <motion.div
              initial={{ opacity: 0, x: 300, width: 0 }}
              animate={{ opacity: 1, x: 0, width: 320 }}
              exit={{ opacity: 0, x: 300, width: 0 }}
              className="border-l border-gray-200 bg-gray-50 overflow-hidden"
            >
              <div className="p-6 space-y-4 h-full overflow-y-auto">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Day Details
                  </h3>
                  <button
                    onClick={() => setSelectedDate(null)}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="text-sm text-gray-600">
                    {new Date(selectedRecord.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>

                  <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
                    getStatusColor(selectedRecord.status)
                  }`}>
                    {getStatusIcon(selectedRecord.status, selectedRecord.is_anomaly)}
                    <span>{selectedRecord.status.replace('_', ' ')}</span>
                  </div>

                  {selectedRecord.clock_in && (
                    <div className="bg-white p-3 rounded-lg border">
                      <div className="text-sm font-medium text-gray-700 mb-2">Time</div>
                      <div className="text-sm text-gray-600">
                        In: {selectedRecord.clock_in}<br />
                        Out: {selectedRecord.clock_out || 'Not clocked out'}
                      </div>
                    </div>
                  )}

                  {selectedRecord.work_mode && (
                    <div className="bg-white p-3 rounded-lg border">
                      <div className="text-sm font-medium text-gray-700 mb-2">Work Mode</div>
                      <div className="flex items-center space-x-2">
                        {getWorkModeIcon(selectedRecord.work_mode)}
                        <span className="text-sm text-gray-600">
                          {selectedRecord.work_mode.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  )}

                  {selectedRecord.hours_worked && (
                    <div className="bg-white p-3 rounded-lg border">
                      <div className="text-sm font-medium text-gray-700 mb-2">Hours</div>
                      <div className="text-sm text-gray-600">
                        Worked: {selectedRecord.hours_worked.toFixed(1)}h<br />
                        {selectedRecord.overtime_hours && selectedRecord.overtime_hours > 0 && (
                          <>Overtime: {selectedRecord.overtime_hours.toFixed(1)}h</>
                        )}
                        {selectedRecord.break_duration && (
                          <>Break: {selectedRecord.break_duration}min</>
                        )}
                      </div>
                    </div>
                  )}

                  {selectedRecord.ai_confidence_score && (
                    <div className="bg-white p-3 rounded-lg border">
                      <div className="text-sm font-medium text-gray-700 mb-2">AI Analysis</div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Confidence</span>
                        <span className={`text-sm font-medium ${
                          selectedRecord.ai_confidence_score >= 90 ? 'text-green-600' :
                          selectedRecord.ai_confidence_score >= 75 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {selectedRecord.ai_confidence_score.toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${
                            selectedRecord.ai_confidence_score >= 90 ? 'bg-green-500' :
                            selectedRecord.ai_confidence_score >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${selectedRecord.ai_confidence_score}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {selectedRecord.notes && (
                    <div className="bg-white p-3 rounded-lg border">
                      <div className="text-sm font-medium text-gray-700 mb-2">Notes</div>
                      <div className="text-sm text-gray-600">{selectedRecord.notes}</div>
                    </div>
                  )}

                  {selectedRecord.is_anomaly && (
                    <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                      <div className="flex items-center space-x-2 text-red-700">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="text-sm font-medium">Anomaly Detected</span>
                      </div>
                      <div className="text-xs text-red-600 mt-1">
                        This record shows unusual patterns that may require review.
                      </div>
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

export default AttendanceCalendar;