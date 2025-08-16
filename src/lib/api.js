// API Base URL - Force production URL for now
const API_BASE_URL = "https://maren-backend.onrender.com/api";

// Debug logging
console.log('API Base URL:', API_BASE_URL);
console.log('Environment:', import.meta.env.MODE);
console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
console.log('Full API URL being used:', API_BASE_URL);

// Enhanced error handling for API calls
class APIError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.data = data;
  }
}

// Generic API request function with error handling
export const apiRequest = async (endpoint, options = {}) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log('Making API request to:', url);
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    console.log('API Response status:', response.status);
    
    const data = await response.json();
    console.log('API Response data:', data);

    if (!response.ok) {
      console.error('API Error - URL:', url, 'Status:', response.status, 'Data:', data);
      throw new APIError(
        data.message || `HTTP error! status: ${response.status} for URL: ${url}`,
        response.status,
        data
      );
    }

    return data;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    
    // Network errors or other fetch errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new APIError(
        'فشل في الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت أو إعادة المحاولة لاحقاً.',
        0
      );
    }
    
    throw new APIError(
      'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.',
      500
    );
  }
};

// Employee API functions
export const employeeAPI = {
  // Get all employees with pagination and filters
  getEmployees: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/employees?${queryString}`);
  },

  // Get all employees for Excel export (without pagination)
  getEmployeesForExport: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/employees/export?${queryString}`);
  },

  // Get single employee details
  getEmployeeDetails: async (id) => {
    return apiRequest(`/employees/details/${id}`);
  },

  // Update employee
  updateEmployee: async (civilId, employeeData) => {
    return apiRequest(`/employees/${civilId}`, {
      method: 'PUT',
      body: JSON.stringify(employeeData),
    });
  },

  // Delete employee
  deleteEmployee: async (civilId) => {
    return apiRequest(`/employees/${civilId}`, {
      method: 'DELETE',
    });
  },

  // Create new employee
  createEmployee: async (employeeData) => {
    return apiRequest('/employees', {
      method: 'POST',
      body: JSON.stringify(employeeData),
    });
  },
};

// Error message mapping for Arabic - matches server response patterns
export const getErrorMessage = (error) => {
  if (error instanceof APIError) {
    // Check if the server returned a specific message
    if (error.data && error.data.message) {
      return error.data.message;
    }
    
    switch (error.status) {
      case 400:
        return 'بيانات غير صحيحة. يرجى التحقق من المعلومات المدخلة.';
      case 401:
        return 'غير مصرح لك بالوصول. يرجى تسجيل الدخول مرة أخرى.';
      case 403:
        return 'ليس لديك صلاحية لتنفيذ هذا الإجراء.';
      case 404:
        return 'لم يتم العثور على البيانات المطلوبة.';
      case 409:
        return 'البيانات موجودة مسبقاً.';
      case 422:
        return 'البيانات غير صحيحة. يرجى التحقق من المعلومات المدخلة.';
      case 500:
        return 'خطأ في الخادم. يرجى المحاولة مرة أخرى لاحقاً.';
      case 0:
        return 'فشل في الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت.';
      default:
        return error.message || 'حدث خطأ غير متوقع.';
    }
  }
  
  return error.message || 'حدث خطأ غير متوقع.';
};

import toast from 'react-hot-toast';

// Toast notification helper
export const showNotification = (message, type = 'info') => {
  const options = {
    duration: 3000,
    position: 'top-center',
    style: {
      background: type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6',
      color: '#fff',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
    },
  };

  switch (type) {
    case 'success':
      toast.success(message, options);
      break;
    case 'error':
      toast.error(message, options);
      break;
    default:
      toast(message, options);
  }
};
