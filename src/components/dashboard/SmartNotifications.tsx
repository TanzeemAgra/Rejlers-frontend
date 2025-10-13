'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BellIcon,
  XMarkIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  SparklesIcon,
  ClockIcon,
  UserIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { DASHBOARD_CONFIG } from '../../config/dashboard.config';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'ai' | 'system';
  timestamp: Date;
  read: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  source: string;
  actionable?: boolean;
  actions?: NotificationAction[];
  aiGenerated?: boolean;
  metadata?: any;
}

interface NotificationAction {
  id: string;
  label: string;
  type: 'primary' | 'secondary' | 'danger';
  handler: () => void;
}

interface SmartNotificationsProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const SmartNotifications: React.FC<SmartNotificationsProps> = ({
  isOpen,
  onClose,
  className = '',
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread' | 'ai' | 'urgent'>('all');
  const [isLoading, setIsLoading] = useState(false);

  // Load notifications
  useEffect(() => {
    if (isOpen) {
      loadNotifications();
    }
  }, [isOpen]);

  // Auto-refresh notifications
  useEffect(() => {
    if (isOpen && DASHBOARD_CONFIG.FEATURES.REAL_TIME.ENABLED) {
      const interval = setInterval(() => {
        loadNotifications();
      }, DASHBOARD_CONFIG.FEATURES.REAL_TIME.UPDATE_INTERVAL * 1000);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  // Load notifications from various sources
  const loadNotifications = async () => {
    setIsLoading(true);
    try {
      // Simulate loading notifications from different sources
      const mockNotifications: Notification[] = [
        {
          id: '1',
          title: 'AI Insight: Performance Alert',
          message: 'Your sales performance has increased by 23% compared to last week. Consider scaling up marketing efforts.',
          type: 'ai',
          timestamp: new Date(Date.now() - 5 * 60000),
          read: false,
          priority: 'high',
          source: 'AI Analytics',
          aiGenerated: true,
          actionable: true,
          actions: [
            {
              id: 'view-analytics',
              label: 'View Analytics',
              type: 'primary',
              handler: () => console.log('Navigate to analytics'),
            },
            {
              id: 'schedule-meeting',
              label: 'Schedule Review',
              type: 'secondary',
              handler: () => console.log('Schedule meeting'),
            },
          ],
        },
        {
          id: '2',
          title: 'System Update Available',
          message: 'New features including enhanced AI capabilities are available. Update recommended.',
          type: 'system',
          timestamp: new Date(Date.now() - 30 * 60000),
          read: false,
          priority: 'medium',
          source: 'System',
          actionable: true,
          actions: [
            {
              id: 'update-now',
              label: 'Update Now',
              type: 'primary',
              handler: () => console.log('Start update'),
            },
            {
              id: 'schedule-later',
              label: 'Later',
              type: 'secondary',
              handler: () => console.log('Schedule later'),
            },
          ],
        },
        {
          id: '3',
          title: 'Urgent: Client Follow-up Required',
          message: 'Client "Acme Corp" has been waiting for a response for over 24 hours. Immediate action recommended.',
          type: 'warning',
          timestamp: new Date(Date.now() - 60 * 60000),
          read: false,
          priority: 'urgent',
          source: 'CRM',
          actionable: true,
          actions: [
            {
              id: 'respond-now',
              label: 'Respond Now',
              type: 'primary',
              handler: () => console.log('Open client communication'),
            },
            {
              id: 'view-client',
              label: 'View Client',
              type: 'secondary',
              handler: () => console.log('Open client profile'),
            },
          ],
        },
        {
          id: '4',
          title: 'AI Suggestion: Workflow Optimization',
          message: 'I noticed you spend 40% of your time on manual data entry. Would you like me to automate this process?',
          type: 'ai',
          timestamp: new Date(Date.now() - 2 * 60 * 60000),
          read: true,
          priority: 'medium',
          source: 'AI Assistant',
          aiGenerated: true,
          actionable: true,
          actions: [
            {
              id: 'setup-automation',
              label: 'Setup Automation',
              type: 'primary',
              handler: () => console.log('Setup workflow automation'),
            },
            {
              id: 'learn-more',
              label: 'Learn More',
              type: 'secondary',
              handler: () => console.log('Show automation details'),
            },
          ],
        },
        {
          id: '5',
          title: 'Data Backup Completed',
          message: 'Daily backup completed successfully. All data is secure and up to date.',
          type: 'success',
          timestamp: new Date(Date.now() - 4 * 60 * 60000),
          read: true,
          priority: 'low',
          source: 'System',
        },
      ];

      setNotifications(mockNotifications);
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter notifications
  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread':
        return !notification.read;
      case 'ai':
        return notification.aiGenerated || notification.type === 'ai';
      case 'urgent':
        return notification.priority === 'urgent' || notification.priority === 'high';
      default:
        return true;
    }
  });

  // Mark notification as read
  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  // Dismiss notification
  const dismissNotification = (notificationId: string) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== notificationId)
    );
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  // Get notification icon
  const getNotificationIcon = (notification: Notification) => {
    if (notification.aiGenerated || notification.type === 'ai') {
      return SparklesIcon;
    }
    
    switch (notification.type) {
      case 'success':
        return CheckIcon;
      case 'warning':
        return ExclamationTriangleIcon;
      case 'error':
        return ExclamationTriangleIcon;
      case 'system':
        return InformationCircleIcon;
      default:
        return InformationCircleIcon;
    }
  };

  // Get notification color classes
  const getNotificationColors = (notification: Notification) => {
    if (notification.aiGenerated || notification.type === 'ai') {
      return {
        border: 'border-l-4 border-l-blue-500',
        icon: 'text-blue-500',
        badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      };
    }

    switch (notification.type) {
      case 'success':
        return {
          border: 'border-l-4 border-l-green-500',
          icon: 'text-green-500',
          badge: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        };
      case 'warning':
        return {
          border: 'border-l-4 border-l-yellow-500',
          icon: 'text-yellow-500',
          badge: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
        };
      case 'error':
        return {
          border: 'border-l-4 border-l-red-500',
          icon: 'text-red-500',
          badge: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
        };
      default:
        return {
          border: 'border-l-4 border-l-gray-500',
          icon: 'text-gray-500',
          badge: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
        };
    }
  };

  // Format timestamp
  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  // Get unread count
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className={`fixed right-0 top-0 h-full w-96 bg-white dark:bg-gray-800 shadow-2xl z-50 flex flex-col ${className}`}
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <BellIcon className="w-6 h-6 text-gray-700 dark:text-gray-300 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Notifications
                  </h3>
                  {unreadCount > 0 && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {unreadCount} unread
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {isLoading && (
                  <ArrowPathIcon className="w-5 h-5 text-gray-500 animate-spin" />
                )}
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <XMarkIcon className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex space-x-2">
                {(['all', 'unread', 'ai', 'urgent'] as const).map(filterType => (
                  <motion.button
                    key={filterType}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilter(filterType)}
                    className={`
                      px-3 py-1 rounded-full text-xs font-medium transition-colors
                      ${filter === filterType
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }
                    `}
                  >
                    {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                  </motion.button>
                ))}
              </div>
              
              {unreadCount > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={markAllAsRead}
                  className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Mark all read
                </motion.button>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto">
            {filteredNotifications.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <BellIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">No notifications</p>
                  <p className="text-sm">You're all caught up!</p>
                </div>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {filteredNotifications.map((notification, index) => {
                  const Icon = getNotificationIcon(notification);
                  const colors = getNotificationColors(notification);
                  
                  return (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`
                        bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 cursor-pointer
                        hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
                        ${colors.border}
                        ${!notification.read ? 'ring-2 ring-blue-500 ring-opacity-20' : ''}
                      `}
                      onClick={() => !notification.read && markAsRead(notification.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start flex-1">
                          <Icon className={`w-5 h-5 mr-3 mt-0.5 ${colors.icon}`} />
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {notification.title}
                              </h4>
                              
                              <div className="flex items-center space-x-2 ml-2">
                                {notification.aiGenerated && (
                                  <SparklesIcon className="w-4 h-4 text-blue-500" />
                                )}
                                
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                )}
                              </div>
                            </div>
                            
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              {notification.message}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <span className={`px-2 py-1 rounded text-xs ${colors.badge}`}>
                                  {notification.source}
                                </span>
                                
                                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                  <ClockIcon className="w-3 h-3 mr-1" />
                                  {formatTimestamp(notification.timestamp)}
                                </div>
                              </div>
                              
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  dismissNotification(notification.id);
                                }}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                              >
                                <XMarkIcon className="w-4 h-4" />
                              </motion.button>
                            </div>
                            
                            {/* Actions */}
                            {notification.actionable && notification.actions && (
                              <div className="flex space-x-2 mt-3">
                                {notification.actions.map(action => (
                                  <motion.button
                                    key={action.id}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      action.handler();
                                    }}
                                    className={`
                                      px-3 py-1 rounded text-xs font-medium transition-colors
                                      ${action.type === 'primary'
                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                        : action.type === 'danger'
                                        ? 'bg-red-600 text-white hover:bg-red-700'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500'
                                      }
                                    `}
                                  >
                                    {action.label}
                                  </motion.button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SmartNotifications;