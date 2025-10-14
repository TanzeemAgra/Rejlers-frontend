'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  XCircle,
  Calendar,
  TrendingUp,
  Filter,
  Eye,
  MessageSquare,
  Phone,
  Mail,
  MoreVertical,
  UserPlus,
  Settings
} from 'lucide-react';

// Types
interface EmployeeStatus {
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

interface ManagerOverviewProps {
  teamId?: string;
  department?: string;
}

const ManagerOverview: React.FC<ManagerOverviewProps> = ({ teamId, department }) => {
  const [employees, setEmployees] = useState<EmployeeStatus[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeStatus | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterLocation, setFilterLocation] = useState<string>('all');
  const [showDetails, setShowDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with API calls
    const mockEmployees: EmployeeStatus[] = [
      {
        id: '1',
        name: 'John Smith',
        email: 'john.smith@rejlers.com',
        avatar: '/avatars/john.jpg',
        department: 'Engineering',
        position: 'Senior Engineer',
        status: 'present',
        location: 'office',
        checkInTime: '08:30',
        scheduledStart: '09:00',
        scheduledEnd: '17:00',
        currentTask: 'Code review for Project Alpha',
        lastActivity: '2 minutes ago',
        productivity: 92,
        timeInOffice: 6.5,
        breaksTaken: 2,
        overtime: 0.5
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@rejlers.com',
        avatar: '/avatars/sarah.jpg',
        department: 'Engineering',
        position: 'Lead Developer',
        status: 'on_break',
        location: 'office',
        checkInTime: '08:45',
        scheduledStart: '09:00',
        scheduledEnd: '17:00',
        currentTask: 'Database optimization',
        lastActivity: '15 minutes ago',
        productivity: 88,
        timeInOffice: 6.0,
        breaksTaken: 3,
        overtime: 0
      },
      {
        id: '3',
        name: 'Mike Chen',
        email: 'mike.chen@rejlers.com',
        avatar: '/avatars/mike.jpg',
        department: 'Engineering',
        position: 'Full Stack Developer',
        status: 'absent',
        location: 'remote',
        scheduledStart: '09:00',
        scheduledEnd: '17:00',
        lastActivity: 'Yesterday 5:30 PM',
        productivity: 0,
        timeInOffice: 0,
        breaksTaken: 0,
        overtime: 0,
        notes: 'Sick leave - notified HR'
      },
      {
        id: '4',
        name: 'Lisa Wilson',
        email: 'lisa.wilson@rejlers.com',
        avatar: '/avatars/lisa.jpg',
        department: 'Engineering',
        position: 'DevOps Engineer',
        status: 'late',
        location: 'remote',
        checkInTime: '09:30',
        scheduledStart: '09:00',
        scheduledEnd: '17:00',
        currentTask: 'Server maintenance',
        lastActivity: '5 minutes ago',
        productivity: 85,
        timeInOffice: 5.5,
        breaksTaken: 1,
        overtime: 0
      },
      {
        id: '5',
        name: 'David Brown',
        email: 'david.brown@rejlers.com',
        avatar: '/avatars/david.jpg',
        department: 'Engineering',
        position: 'Junior Developer',
        status: 'overtime',
        location: 'office',
        checkInTime: '08:00',
        scheduledStart: '09:00',
        scheduledEnd: '17:00',
        currentTask: 'Bug fixes for release',
        lastActivity: '1 minute ago',
        productivity: 95,
        timeInOffice: 9.0,
        breaksTaken: 2,
        overtime: 2.0
      }
    ];

    setEmployees(mockEmployees);
    setIsLoading(false);
  }, [teamId, department]);

  const filteredEmployees = employees.filter(emp => {
    const matchesStatus = filterStatus === 'all' || emp.status === filterStatus;
    const matchesLocation = filterLocation === 'all' || emp.location === filterLocation;
    return matchesStatus && matchesLocation;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'absent': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'late': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'on_break': return <Clock className="w-4 h-4 text-blue-600" />;
      case 'overtime': return <TrendingUp className="w-4 h-4 text-purple-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'text-green-700 bg-green-100 border-green-200';
      case 'absent': return 'text-red-700 bg-red-100 border-red-200';
      case 'late': return 'text-yellow-700 bg-yellow-100 border-yellow-200';
      case 'on_break': return 'text-blue-700 bg-blue-100 border-blue-200';
      case 'overtime': return 'text-purple-700 bg-purple-100 border-purple-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const getLocationIcon = (location: string) => {
    switch (location) {
      case 'office': return '🏢';
      case 'remote': return '🏠';
      case 'field': return '🌍';
      default: return '📍';
    }
  };

  const handleEmployeeClick = (employee: EmployeeStatus) => {
    setSelectedEmployee(employee);
    setShowDetails(true);
  };

  const handleSendMessage = (employee: EmployeeStatus) => {
    // Implementation for sending messages
    console.log('Send message to:', employee.name);
  };

  const handleCall = (employee: EmployeeStatus) => {
    // Implementation for calling
    console.log('Call:', employee.name);
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
          <h2 className="text-2xl font-bold text-gray-900">Manager Overview</h2>
          <p className="text-gray-600">Real-time team status and management</p>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            Add Employee
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            Settings
          </motion.button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 p-4 bg-white rounded-lg border">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filters:</span>
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-1 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <option value="all">All Status</option>
          <option value="present">Present</option>
          <option value="absent">Absent</option>
          <option value="late">Late</option>
          <option value="on_break">On Break</option>
          <option value="overtime">Overtime</option>
        </select>
        <select
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
          className="px-3 py-1 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <option value="all">All Locations</option>
          <option value="office">Office</option>
          <option value="remote">Remote</option>
          <option value="field">Field</option>
        </select>
        <div className="ml-auto text-sm text-gray-600">
          Showing {filteredEmployees.length} of {employees.length} employees
        </div>
      </div>

      {/* Employee Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <motion.div
            key={employee.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-sm border p-6 cursor-pointer"
            onClick={() => handleEmployeeClick(employee)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {employee.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{employee.name}</h3>
                  <p className="text-sm text-gray-600">{employee.position}</p>
                </div>
              </div>
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-1 hover:bg-gray-100 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle more options
                  }}
                >
                  <MoreVertical className="w-4 h-4 text-gray-500" />
                </motion.button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(employee.status)}`}>
                  {getStatusIcon(employee.status)}
                  {employee.status.replace('_', ' ').toUpperCase()}
                </span>
                <span className="text-sm text-gray-600">
                  {getLocationIcon(employee.location)} {employee.location}
                </span>
              </div>

              {employee.checkInTime && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Check-in:</span>
                  <span className="font-medium">{employee.checkInTime}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Productivity:</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${employee.productivity}%` }}
                    ></div>
                  </div>
                  <span className="font-medium text-xs">{employee.productivity}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Time in office:</span>
                <span className="font-medium">{employee.timeInOffice}h</span>
              </div>

              {employee.currentTask && (
                <div className="text-sm">
                  <span className="text-gray-600">Current task:</span>
                  <p className="text-gray-900 font-medium mt-1 truncate">{employee.currentTask}</p>
                </div>
              )}

              <div className="text-xs text-gray-500">
                Last activity: {employee.lastActivity}
              </div>

              {employee.notes && (
                <div className="p-2 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-xs text-yellow-800">{employee.notes}</p>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t flex items-center justify-between">
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSendMessage(employee);
                  }}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  title="Send message"
                >
                  <MessageSquare className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCall(employee);
                  }}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                  title="Call"
                >
                  <Phone className="w-4 h-4" />
                </motion.button>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-blue-600 text-sm hover:text-blue-700 flex items-center gap-1"
              >
                <Eye className="w-4 h-4" />
                View Details
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Employee Details Modal */}
      <AnimatePresence>
        {showDetails && selectedEmployee && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {selectedEmployee.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{selectedEmployee.name}</h3>
                      <p className="text-gray-600">{selectedEmployee.position}</p>
                      <p className="text-sm text-gray-500">{selectedEmployee.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Status and Location */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusIcon(selectedEmployee.status)}
                      <span className="font-semibold text-gray-900">Status</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedEmployee.status)}`}>
                      {selectedEmployee.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{getLocationIcon(selectedEmployee.location)}</span>
                      <span className="font-semibold text-gray-900">Location</span>
                    </div>
                    <span className="text-sm font-medium capitalize">{selectedEmployee.location}</span>
                  </div>
                </div>

                {/* Time Information */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{selectedEmployee.checkInTime || 'N/A'}</div>
                    <div className="text-sm text-gray-600">Check-in</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{selectedEmployee.timeInOffice}h</div>
                    <div className="text-sm text-gray-600">Hours Today</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{selectedEmployee.breaksTaken}</div>
                    <div className="text-sm text-gray-600">Breaks</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{selectedEmployee.overtime}h</div>
                    <div className="text-sm text-gray-600">Overtime</div>
                  </div>
                </div>

                {/* Productivity */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-gray-900">Productivity Score</span>
                    <span className="text-2xl font-bold text-gray-900">{selectedEmployee.productivity}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${selectedEmployee.productivity}%` }}
                    ></div>
                  </div>
                </div>

                {/* Current Task */}
                {selectedEmployee.currentTask && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Current Task</h4>
                    <p className="text-gray-700">{selectedEmployee.currentTask}</p>
                    <p className="text-sm text-gray-500 mt-2">Last activity: {selectedEmployee.lastActivity}</p>
                  </div>
                )}

                {/* Notes */}
                {selectedEmployee.notes && (
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <h4 className="font-semibold text-yellow-800 mb-2">Notes</h4>
                    <p className="text-yellow-700">{selectedEmployee.notes}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-3 pt-4 border-t">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSendMessage(selectedEmployee)}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Send Message
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCall(selectedEmployee)}
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Call
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Email
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManagerOverview;