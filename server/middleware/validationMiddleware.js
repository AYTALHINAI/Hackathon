import { body, param, query, validationResult } from 'express-validator';

// Helper function to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg,
        value: error.value
      }))
    });
  }
  next();
};

// Employee validation rules
export const validateEmployee = [
  body('الرقم_المدني')
    .notEmpty()
    .withMessage('Civil ID is required')
    .isLength({ min: 10, max: 10 })
    .withMessage('Civil ID must be exactly 10 digits'),
  
  body('الاسم')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  
  body('الوظيفة')
    .notEmpty()
    .withMessage('Job title is required'),
  
  body('الجنس')
    .isIn(['ذكر', 'أنثى'])
    .withMessage('Gender must be either ذكر or أنثى'),
  
  body('تاريخ_الميلاد')
    .notEmpty()
    .withMessage('Date of birth is required')
    .matches(/^\d{2}\/\d{2}\/\d{4}$/)
    .withMessage('Date of birth must be in dd/mm/yyyy format'),
  
  body('الدرجة')
    .notEmpty()
    .withMessage('Grade is required'),
  
  body('منطقة_العمل')
    .notEmpty()
    .withMessage('Work area is required'),
  
  body('مقر_العمل')
    .notEmpty()
    .withMessage('Work headquarters is required'),
  
  body('تاريخ_التعيين')
    .notEmpty()
    .withMessage('Hire date is required')
    .matches(/^\d{2}\/\d{2}\/\d{4}$/)
    .withMessage('Hire date must be in dd/mm/yyyy format'),
  
  body('المجموعة_النوعية_للوظائف')
    .notEmpty()
    .withMessage('Job category group is required'),
  
  body('تاريخ_شغل_الدرجة')
    .notEmpty()
    .withMessage('Grade assignment date is required')
    .matches(/^\d{2}\/\d{2}\/\d{4}$/)
    .withMessage('Grade assignment date must be in dd/mm/yyyy format'),
  
  body('تاريخ_شغل_الوظيفة')
    .notEmpty()
    .withMessage('Position assignment date is required')
    .matches(/^\d{2}\/\d{2}\/\d{4}$/)
    .withMessage('Position assignment date must be in dd/mm/yyyy format'),
  
  body('موقع_العمل')
    .isArray({ min: 1 })
    .withMessage('Workplace locations must be an array with at least one location'),
  
  handleValidationErrors
];

// Query parameter validation for employee listing
export const validateEmployeeQuery = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  
  query('sortOrder')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be either asc or desc'),
  
  handleValidationErrors
];

// Civil ID parameter validation
export const validateCivilId = [
  param('civilId')
    .notEmpty()
    .withMessage('Civil ID is required')
    .isLength({ min: 10, max: 10 })
    .withMessage('Civil ID must be exactly 10 digits'),
  
  handleValidationErrors
];

// User validation rules
export const validateUser = [
  body('_id')
    .notEmpty()
    .withMessage('Civil ID is required')
    .isLength({ min: 10, max: 10 })
    .withMessage('Civil ID must be exactly 10 digits'),
  
  body('email')
    .isEmail()
    .withMessage('Valid email is required'),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  
  body('role')
    .isIn(['HR', 'Employee', 'Interviewer'])
    .withMessage('Role must be HR, Employee, or Interviewer'),
  
  handleValidationErrors
];

export default {
  validateEmployee,
  validateEmployeeQuery,
  validateCivilId,
  validateUser
};
