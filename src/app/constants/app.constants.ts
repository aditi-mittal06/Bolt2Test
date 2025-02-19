export const AUTH_CONSTANTS = {
  STORAGE_KEY: 'isLoggedIn',
  STORAGE_VALUE: 'true',
  DEFAULT_USERNAME: 'admin',
  DEFAULT_PASSWORD: 'password'
} as const;

export const CUSTOMER_CONSTANTS = {
  STORAGE_KEY: 'customers',
  GENDER: {
    MALE: 'Male',
    FEMALE: 'Female'
  },
  VALIDATION: {
    MAX_NAME_LENGTH: 100,
    PHONE_LENGTH: 10,
    EMAIL_PATTERN: '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$'
  }
} as const;

export const ROUTES = {
  LOGIN: '/login',
  CUSTOMERS: '/customers',
  WELCOME: '/welcome',
  ROOT: ''
} as const;

export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid username or password',
  NAME_VALIDATION: 'First Name is required and must be less than 100 characters',
  LAST_NAME_VALIDATION: 'Last Name is required and must be less than 100 characters',
  EMAIL_VALIDATION: 'Please enter a valid email address',
  PHONE_VALIDATION: 'Please enter a valid 10-digit phone number',
  DELETE_CONFIRMATION: 'Are you sure you want to delete this customer?'
} as const;