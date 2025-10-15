// Professional SVG Icons for REJLERS Application
// Replaces unclear icofont icons with crisp, scalable SVG alternatives

import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// Navigation Arrow Icons
export const ChevronLeft: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg 
    className={className}
    width={size}
    height={size}
    fill="currentColor" 
    viewBox="0 0 24 24"
  >
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
  </svg>
);

export const ChevronRight: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg 
    className={className}
    width={size}
    height={size}
    fill="currentColor" 
    viewBox="0 0 24 24"
  >
    <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
  </svg>
);

export const ChevronDown: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg 
    className={className}
    width={size}
    height={size}
    fill="currentColor" 
    viewBox="0 0 24 24"
  >
    <path d="M7 10l5 5 5-5z"/>
  </svg>
);

export const ChevronUp: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg 
    className={className}
    width={size}
    height={size}
    fill="currentColor" 
    viewBox="0 0 24 24"
  >
    <path d="M7 14l5-5 5 5z"/>
  </svg>
);

// Quote Icons for Testimonials
export const QuoteLeft: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg 
    className={className}
    width={size}
    height={size}
    fill="currentColor" 
    viewBox="0 0 24 24"
  >
    <path d="M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z"/>
  </svg>
);

export const QuoteRight: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg 
    className={className}
    width={size}
    height={size}
    fill="currentColor" 
    viewBox="0 0 24 24"
  >
    <path d="M10,7H7L5,11V17H11V11H8M18,7H15L13,11V17H19V11H16L18,7Z"/>
  </svg>
);

// Star Rating Icons
export const StarFilled: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg 
    className={className}
    width={size}
    height={size}
    fill="currentColor" 
    viewBox="0 0 24 24"
  >
    <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.46,13.97L5.82,21L12,17.27Z"/>
  </svg>
);

export const StarOutlined: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg 
    className={className}
    width={size}
    height={size}
    fill="currentColor" 
    viewBox="0 0 24 24"
  >
    <path d="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z"/>
  </svg>
);

// Menu and Navigation Icons
export const Menu: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg 
    className={className}
    width={size}
    height={size}
    fill="currentColor" 
    viewBox="0 0 24 24"
  >
    <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"/>
  </svg>
);

export const Close: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg 
    className={className}
    width={size}
    height={size}
    fill="currentColor" 
    viewBox="0 0 24 24"
  >
    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
  </svg>
);

// Play and Media Icons
export const Play: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg 
    className={className}
    width={size}
    height={size}
    fill="currentColor" 
    viewBox="0 0 24 24"
  >
    <path d="M8,5.14V19.14L19,12.14L8,5.14Z"/>
  </svg>
);

// Search and Filter Icons  
export const Search: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg 
    className={className}
    width={size}
    height={size}
    fill="currentColor" 
    viewBox="0 0 24 24"
  >
    <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/>
  </svg>
);

export const Filter: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg 
    className={className}
    width={size}
    height={size}
    fill="currentColor" 
    viewBox="0 0 24 24"
  >
    <path d="M14,12V19.88C14.04,20.18 13.94,20.5 13.71,20.71C13.32,21.1 12.69,21.1 12.3,20.71L10.29,18.7C10.06,18.47 9.96,18.16 10,17.87V12H9.97L4.21,4.62C3.87,4.19 3.95,3.56 4.38,3.22C4.57,3.08 4.78,3 5,3V3H19V3C19.22,3 19.43,3.08 19.62,3.22C20.05,3.56 20.13,4.19 19.79,4.62L14.03,12H14Z"/>
  </svg>
);

// Social Media Icons
export const Facebook: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg 
    className={className}
    width={size}
    height={size}
    fill="currentColor" 
    viewBox="0 0 24 24"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

export const Twitter: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg 
    className={className}
    width={size}
    height={size}
    fill="currentColor" 
    viewBox="0 0 24 24"
  >
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);

export const LinkedIn: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg 
    className={className}
    width={size}
    height={size}
    fill="currentColor" 
    viewBox="0 0 24 24"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

// Contact and Communication Icons
export const Phone: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg 
    className={className}
    width={size}
    height={size}
    fill="currentColor" 
    viewBox="0 0 24 24"
  >
    <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/>
  </svg>
);

export const Email: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg 
    className={className}
    width={size}
    height={size}
    fill="currentColor" 
    viewBox="0 0 24 24"
  >
    <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/>
  </svg>
);

export const Location: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg 
    className={className}
    width={size}
    height={size}
    fill="currentColor" 
    viewBox="0 0 24 24"
  >
    <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z"/>
  </svg>
);

// Export all icons as a single object for convenience
export const Icons = {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  QuoteLeft,
  QuoteRight,
  StarFilled,
  StarOutlined,
  Menu,
  Close,
  Play,
  Search,
  Filter,
  Facebook,
  Twitter,
  LinkedIn,
  Phone,
  Email,
  Location,
};

export default Icons;
