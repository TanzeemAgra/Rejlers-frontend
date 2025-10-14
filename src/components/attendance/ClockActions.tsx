// Smart Clock Actions Component - Advanced clock-in/out with AI feedback
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Square,
  Coffee,
  Timer,
  MapPin,
  Building2,
  Home,
  Monitor,
  Navigation,
  AlertTriangle,
  CheckCircle,
  Wifi,
  WifiOff,
  Clock,
  Zap
} from 'lucide-react';
import AttendanceAPI, { 
  ClockActionPayload, 
  AttendanceRecord,
  formatTime 
} from '@/lib/attendanceApi';

interface ClockActionsProps {
  todayRecord: AttendanceRecord | null;
  onRecordUpdate: (record: AttendanceRecord) => void;
  className?: string;
}

type WorkMode = 'OFFICE' | 'REMOTE' | 'HYBRID' | 'FIELD' | 'CLIENT_SITE';

const ClockActions: React.FC<ClockActionsProps> = ({
  todayRecord,
  onRecordUpdate,
  className = ''
}) => {
  const [workMode, setWorkMode] = useState<WorkMode>('OFFICE');
  const [location, setLocation] = useState<{latitude: number; longitude: number} | null>(null);
  const [locationStatus, setLocationStatus] = useState<{
    loading: boolean;
    error: string;
    verified: boolean;
    message: string;
  }>({
    loading: false,
    error: '',
    verified: false,
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);
  const [isOnBreak, setIsOnBreak] = useState(false);

  // Check if employee is on break
  useEffect(() => {
    if (todayRecord?.break_start && !todayRecord?.break_end) {
      setIsOnBreak(true);
    } else {
      setIsOnBreak(false);
    }
  }, [todayRecord]);

  // Get location when component mounts or work mode changes to OFFICE
  useEffect(() => {
    if (workMode === 'OFFICE') {
      getCurrentLocation();
    } else {
      setLocationStatus(prev => ({
        ...prev,
        error: '',
        verified: true,
        message: 'Remote work - location not required'
      }));
    }
  }, [workMode]);

  const getCurrentLocation = async () => {
    setLocationStatus(prev => ({ ...prev, loading: true, error: '' }));
    
    try {
      const currentLocation = await AttendanceAPI.getCurrentLocation();
      setLocation(currentLocation);
      
      // Validate location for office work
      const validation = await AttendanceAPI.validateWorkLocation(currentLocation, workMode);
      
      setLocationStatus({
        loading: false,
        error: validation.isValid ? '' : validation.message,
        verified: validation.isValid,
        message: validation.message
      });
    } catch (error) {
      setLocationStatus({
        loading: false,
        error: error instanceof Error ? error.message : 'Location error',
        verified: false,
        message: ''
      });
    }
  };

  const handleClockAction = async (action: ClockActionPayload['action']) => {
    // Validate location for office work
    if (workMode === 'OFFICE' && (!location || !locationStatus.verified)) {
      alert('Valid office location is required for clocking in/out at the office');
      return;
    }

    setIsLoading(true);
    setActionInProgress(action);

    try {
      const payload: ClockActionPayload = {
        action,
        work_mode: workMode,
        ...(workMode === 'OFFICE' && location && { location })
      };

      const response = await AttendanceAPI.clockAction(payload);
      
      // Update the record
      onRecordUpdate(response.attendance_record);
      
      // Update local state
      if (action === 'break_start') {
        setIsOnBreak(true);
      } else if (action === 'break_end') {
        setIsOnBreak(false);
      }

      // Show AI feedback if available
      if (response.ai_analysis) {
        // Handle AI feedback display
        console.log('AI Analysis:', response.ai_analysis);
      }

    } catch (error) {
      console.error('Clock action error:', error);
    } finally {
      setIsLoading(false);
      setActionInProgress(null);
    }
  };

  const workModeOptions = [
    { value: 'OFFICE' as WorkMode, label: 'Office', icon: Building2, color: 'blue' },
    { value: 'REMOTE' as WorkMode, label: 'Remote', icon: Home, color: 'green' },
    { value: 'HYBRID' as WorkMode, label: 'Hybrid', icon: Monitor, color: 'purple' },
    { value: 'FIELD' as WorkMode, label: 'Field', icon: MapPin, color: 'orange' },
  ];

  const getActionButtonConfig = (action: ClockActionPayload['action']) => {
    const configs = {
      clock_in: {
        icon: Play,
        label: 'Clock In',
        color: 'green',
        disabled: todayRecord?.clock_in && !todayRecord?.clock_out,
        time: todayRecord?.clock_in
      },
      clock_out: {
        icon: Square,
        label: 'Clock Out',
        color: 'red',
        disabled: !todayRecord?.clock_in || todayRecord?.clock_out,
        time: todayRecord?.clock_out
      },
      break_start: {
        icon: Coffee,
        label: 'Start Break',
        color: 'orange',
        disabled: !todayRecord?.clock_in || todayRecord?.clock_out || isOnBreak,
        time: null
      },
      break_end: {
        icon: Timer,
        label: 'End Break',
        color: 'blue',
        disabled: !isOnBreak,
        time: null
      }
    };
    return configs[action];
  };

  const getLocationIcon = () => {
    if (locationStatus.loading) return <div className="animate-spin w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full" />;
    if (locationStatus.verified) return <Navigation className="w-4 h-4 text-green-600" />;
    if (locationStatus.error) return <AlertTriangle className="w-4 h-4 text-red-600" />;
    return <MapPin className="w-4 h-4 text-gray-400" />;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-xl shadow-lg border p-6 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
        <div className="flex items-center space-x-2 text-sm">
          {getLocationIcon()}
          <span className={`${
            locationStatus.verified ? 'text-green-600' : 
            locationStatus.error ? 'text-red-600' : 'text-gray-600'
          }`}>
            {locationStatus.loading ? 'Getting location...' :
             locationStatus.verified ? 'Location verified' :
             locationStatus.error || 'Location unknown'}
          </span>
        </div>
      </div>

      {/* Work Mode Selection */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Work Mode
        </label>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {workModeOptions.map((mode) => {
            const IconComponent = mode.icon;
            const isSelected = workMode === mode.value;
            
            return (
              <motion.button
                key={mode.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setWorkMode(mode.value)}
                className={`p-3 rounded-lg border-2 flex flex-col items-center justify-center space-y-1 transition-all ${
                  isSelected
                    ? `border-${mode.color}-500 bg-${mode.color}-50 text-${mode.color}-700`
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span className="text-sm font-medium">{mode.label}</span>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`w-1.5 h-1.5 rounded-full bg-${mode.color}-500`}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Clock Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {(['clock_in', 'clock_out', 'break_start', 'break_end'] as const).map((action) => {
          const config = getActionButtonConfig(action);
          const IconComponent = config.icon;
          const isActionInProgress = actionInProgress === action;
          
          return (
            <motion.button
              key={action}
              whileHover={{ scale: config.disabled ? 1 : 1.02 }}
              whileTap={{ scale: config.disabled ? 1 : 0.98 }}
              onClick={() => handleClockAction(action)}
              disabled={Boolean(config.disabled) || isLoading}
              className={`relative flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
                config.disabled
                  ? 'opacity-50 cursor-not-allowed bg-gray-50 border-gray-200'
                  : config.color === 'green'
                  ? 'border-green-200 bg-green-50 hover:bg-green-100 text-green-700'
                  : config.color === 'red'
                  ? 'border-red-200 bg-red-50 hover:bg-red-100 text-red-700'
                  : config.color === 'orange'
                  ? 'border-orange-200 bg-orange-50 hover:bg-orange-100 text-orange-700'
                  : 'border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700'
              }`}
            >
              <AnimatePresence>
                {isActionInProgress ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="animate-spin w-6 h-6 border-2 border-current border-t-transparent rounded-full" />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex flex-col items-center space-y-2"
                  >
                    <IconComponent className="w-6 h-6" />
                    <span className="text-sm font-semibold">{config.label}</span>
                    {config.time && (
                      <span className="text-xs opacity-75">
                        {formatTime(config.time)}
                      </span>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      {/* Current Status Display */}
      <AnimatePresence>
        {todayRecord && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-4 border"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  todayRecord.status === 'PRESENT' ? 'bg-green-500 animate-pulse' :
                  todayRecord.status === 'LATE' ? 'bg-orange-500 animate-pulse' :
                  'bg-gray-400'
                }`} />
                <div>
                  <span className="font-semibold text-gray-900">
                    Status: {todayRecord.status.replace('_', ' ')}
                  </span>
                  <div className="text-sm text-gray-600 mt-1">
                    {workMode === 'OFFICE' ? '📍 Office' : 
                     workMode === 'REMOTE' ? '🏠 Remote' :
                     workMode === 'HYBRID' ? '🔄 Hybrid' : '🚗 Field'}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                {todayRecord.clock_in && !todayRecord.clock_out ? (
                  <div className="flex flex-col items-end space-y-1">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>Working since {formatTime(todayRecord.clock_in)}</span>
                    </div>
                    {isOnBreak && (
                      <div className="flex items-center space-x-1 text-xs text-orange-600">
                        <Coffee className="w-3 h-3" />
                        <span>On break</span>
                      </div>
                    )}
                  </div>
                ) : todayRecord.clock_in && todayRecord.clock_out ? (
                  <div className="text-sm text-gray-600">
                    <div className="font-medium">{todayRecord.actual_hours.toFixed(1)} hours worked</div>
                    <div className="text-xs">
                      {formatTime(todayRecord.clock_in)} - {formatTime(todayRecord.clock_out)}
                    </div>
                  </div>
                ) : (
                  <span className="text-sm text-gray-500">Ready to clock in</span>
                )}
              </div>
            </div>

            {/* AI Score Indicator */}
            {todayRecord.ai_confidence_score > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-purple-600" />
                    <span className="text-gray-600">AI Confidence</span>
                  </div>
                  <span className={`font-bold ${
                    todayRecord.ai_confidence_score >= 90 ? 'text-green-600' :
                    todayRecord.ai_confidence_score >= 75 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {todayRecord.ai_confidence_score.toFixed(1)}%
                  </span>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${todayRecord.ai_confidence_score}%` }}
                    className={`h-1.5 rounded-full ${
                      todayRecord.ai_confidence_score >= 90 ? 'bg-green-500' :
                      todayRecord.ai_confidence_score >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                  />
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Location Refresh Button */}
      {workMode === 'OFFICE' && locationStatus.error && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4"
        >
          <button
            onClick={getCurrentLocation}
            disabled={locationStatus.loading}
            className="w-full p-2 text-sm text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50"
          >
            {locationStatus.loading ? 'Getting location...' : 'Retry Location'}
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ClockActions;