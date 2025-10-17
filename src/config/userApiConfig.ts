// Frontend-Backend API Field Mapping Configuration (Soft Coding)
// This file provides configurable field mappings and validation

export interface UserCreationRequest {
  // Frontend form fields
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  phone: string;
  department: string;
  position: string;
  password: string;
  role_id: number;
  is_active: boolean;
  send_welcome_email: boolean;
  created_via?: string;
  ai_recommended_role?: number | null;
}

export interface BackendUserPayload {
  // Backend API expected fields
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  phone_number: string;  // Note: frontend uses 'phone', backend expects 'phone_number'
  department: string;
  job_title: string;     // Note: frontend uses 'position', backend expects 'job_title'
  password: string;
  password_confirm: string; // Backend requires password confirmation
  company_name?: string;
  role_id?: number;
  is_active?: boolean;
  send_welcome_email?: boolean;
  created_via?: string;
  ai_recommended_role?: number | null;
}

// Soft-coded field mapping configuration
export const API_FIELD_MAPPING = {
  // Frontend field -> Backend field
  phone: 'phone_number',
  position: 'job_title',
  
  // Fields that need special handling
  password: {
    field: 'password',
    requiresConfirmation: true,
    confirmationField: 'password_confirm'
  },
  
  // Optional fields with defaults
  company_name: {
    field: 'company_name',
    default: 'Rejlers'
  }
} as const;

// Validation configuration
export const VALIDATION_CONFIG = {
  required_fields: [
    'first_name',
    'last_name', 
    'email',
    'username',
    'password'
  ],
  
  email_validation: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address'
  },
  
  password_validation: {
    min_length: 8,
    require_special_chars: false, // Configurable based on environment
    message: 'Password must be at least 8 characters long'
  },
  
  username_validation: {
    pattern: /^[a-zA-Z0-9_-]+$/,
    min_length: 3,
    message: 'Username must be 3+ characters, alphanumeric with _ or - only'
  }
} as const;

// Error message configuration
export const ERROR_MESSAGES = {
  USER_CREATION_FAILED: 'Failed to create user. Please check all fields and try again.',
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  VALIDATION_ERROR: 'Please fix the validation errors before submitting.',
  UNAUTHORIZED: 'You do not have permission to create users.',
  SERVER_ERROR: 'Server error occurred. Please try again later.',
  
  // Field-specific errors
  EMAIL_REQUIRED: 'Email address is required',
  EMAIL_INVALID: 'Please enter a valid email address',
  EMAIL_EXISTS: 'This email address is already registered',
  USERNAME_REQUIRED: 'Username is required',
  USERNAME_EXISTS: 'This username is already taken',
  PASSWORD_REQUIRED: 'Password is required',
  PASSWORD_MISMATCH: 'Passwords do not match',
  PHONE_INVALID: 'Please enter a valid phone number'
} as const;

/**
 * Transform frontend user data to backend API format
 * Uses soft coding configuration for field mappings
 */
export const transformUserDataForAPI = (frontendData: UserCreationRequest): BackendUserPayload => {
  const backendData: BackendUserPayload = {
    first_name: frontendData.first_name.trim(),
    last_name: frontendData.last_name.trim(),
    email: frontendData.email.trim().toLowerCase(),
    username: frontendData.username.trim().toLowerCase(),
    phone_number: frontendData.phone.trim(), // Map phone -> phone_number
    department: frontendData.department.trim(),
    job_title: frontendData.position.trim(),  // Map position -> job_title
    password: frontendData.password,
    password_confirm: frontendData.password,  // Add required password confirmation
    company_name: API_FIELD_MAPPING.company_name.default, // Use default company name
  };

  // Add optional fields if they exist
  if (frontendData.role_id) {
    backendData.role_id = frontendData.role_id;
  }
  
  if (typeof frontendData.is_active === 'boolean') {
    backendData.is_active = frontendData.is_active;
  }
  
  if (typeof frontendData.send_welcome_email === 'boolean') {
    backendData.send_welcome_email = frontendData.send_welcome_email;
  }
  
  if (frontendData.created_via) {
    backendData.created_via = frontendData.created_via;
  }
  
  if (frontendData.ai_recommended_role) {
    backendData.ai_recommended_role = frontendData.ai_recommended_role;
  }

  return backendData;
};

/**
 * Validate user data before API submission
 * Uses soft coding configuration for validation rules
 */
export const validateUserData = (userData: UserCreationRequest): Record<string, string> => {
  const errors: Record<string, string> = {};

  // Required field validation
  VALIDATION_CONFIG.required_fields.forEach(field => {
    if (!userData[field as keyof UserCreationRequest] || 
        String(userData[field as keyof UserCreationRequest]).trim() === '') {
      errors[field] = `${field.replace('_', ' ')} is required`;
    }
  });

  // Email validation
  if (userData.email && !VALIDATION_CONFIG.email_validation.pattern.test(userData.email)) {
    errors.email = VALIDATION_CONFIG.email_validation.message;
  }

  // Password validation
  if (userData.password && userData.password.length < VALIDATION_CONFIG.password_validation.min_length) {
    errors.password = VALIDATION_CONFIG.password_validation.message;
  }

  // Username validation
  if (userData.username && 
      (!VALIDATION_CONFIG.username_validation.pattern.test(userData.username) ||
       userData.username.length < VALIDATION_CONFIG.username_validation.min_length)) {
    errors.username = VALIDATION_CONFIG.username_validation.message;
  }

  return errors;
};

/**
 * Parse and enhance API error responses
 * Provides user-friendly error messages
 */
export const parseAPIError = (error: any, response?: Response): string => {
  // Handle different error types with soft coding
  if (response) {
    switch (response.status) {
      case 400:
        return ERROR_MESSAGES.VALIDATION_ERROR;
      case 401:
        return ERROR_MESSAGES.UNAUTHORIZED;
      case 403:
        return ERROR_MESSAGES.UNAUTHORIZED;
      case 500:
        return ERROR_MESSAGES.SERVER_ERROR;
      default:
        break;
    }
  }

  // Try to extract meaningful error message
  if (error?.detail) return error.detail;
  if (error?.message) return error.message;
  if (error?.non_field_errors?.length > 0) return error.non_field_errors[0];
  
  // Field-specific errors
  if (error?.email?.length > 0) return error.email[0];
  if (error?.username?.length > 0) return error.username[0];
  if (error?.password?.length > 0) return error.password[0];

  // Fallback to generic error
  return ERROR_MESSAGES.USER_CREATION_FAILED;
};

export default {
  API_FIELD_MAPPING,
  VALIDATION_CONFIG,
  ERROR_MESSAGES,
  transformUserDataForAPI,
  validateUserData,
  parseAPIError
};