import express from "express";
import Employee from "../models/Employee.js";

const router = express.Router();

// Test endpoint to verify backend is working
router.get("/test", (req, res) => {
  console.log('🔍 Test endpoint called');
  res.json({ message: "Backend is working!", timestamp: new Date().toISOString() });
});

// Helper function for standardized responses
const sendResponse = (res, statusCode, success, message, data = null) => {
  const response = { success, message };
  if (data !== null) response.data = data;
  res.status(statusCode).json(response);
};

// GET all employees with pagination, search, filtering, and sorting
router.get("/", async (req, res) => {
  try {
    console.log('🔍 ===== BACKEND REQUEST RECEIVED =====');
    console.log('🔍 Backend received query params:', req.query);
    console.log('🔍 Backend received sortBy:', req.query.sortBy);
    console.log('🔍 Backend received sortOrder:', req.query.sortOrder);
    console.log('🔍 Backend is processing request...');
    
    const {
      page = 1,
      limit = 10,
      search = "",
      department = "",
      gender = "",
      grade = "",
      jobGroup = "",
      workLocation = "",
      workOffice = "",
      status = "",
      sortBy = "name",
      sortOrder = "desc"
    } = req.query;

    // Build filter object
    const filter = {};
    
    console.log('🔍 Building filter with params:', { search, department, gender, grade, jobGroup, workLocation, workOffice });
    
    // Search functionality - only search by name
    if (search) {
      filter.الاسم = { $regex: search, $options: 'i' };
    }

    // Department filter
    if (department) {
      filter.منطقة_العمل = department;
    }

    // Gender filter
    if (gender) {
      filter.الجنس = gender;
    }

    // Grade filter
    if (grade) {
      filter.الدرجة = grade;
    }

    // Job Group filter
    if (jobGroup) {
      filter.المجموعة_النوعية_للوظائف = jobGroup;
    }

    // Work Location filter
    if (workLocation) {
      filter.مقر_العمل = workLocation;
    }

    // Work Office filter
    if (workOffice) {
      filter.موقع_العمل = { $in: [workOffice] };
    }

    // Status filter (if you add status field later)
    if (status) {
      filter.status = status;
    }

    console.log('🔍 Final filter object:', filter);

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    let employees;
    
    // Special handling for grade sorting to ensure numeric sorting
    console.log('🔍 Checking if sortBy === "grade":', sortBy === 'grade', 'sortBy value:', sortBy);
    if (sortBy === 'grade') {
      try {
        console.log('🔍 Grade sorting - sortBy:', sortBy, 'sortOrder:', sortOrder);
        
        // First, let's get all employees and sort them in JavaScript
        const allEmployees = await Employee.find(filter).lean();
        console.log('🔍 Total employees found:', allEmployees.length);
        
        // Log raw grade values
        console.log('🔍 Raw grade values:', allEmployees.map(emp => ({ name: emp.الاسم, grade: emp.الدرجة, gradeType: typeof emp.الدرجة })));
        
        // Convert grades to numbers and sort
        const sortedEmployees = allEmployees
          .map(emp => {
            const numericGrade = parseInt(emp.الدرجة) || 0;
            console.log(`🔍 Converting grade for ${emp.الاسم}: "${emp.الدرجة}" -> ${numericGrade}`);
            return {
              ...emp,
              numericGrade: numericGrade
            };
          })
          .sort((a, b) => {
            console.log(`🔍 Comparing ${a.الاسم} (${a.numericGrade}) with ${b.الاسم} (${b.numericGrade})`);
            if (sortOrder === 'asc') {
              return a.numericGrade - b.numericGrade;
            } else {
              return b.numericGrade - a.numericGrade;
            }
          });
        
        console.log('🔍 After sorting:', sortedEmployees.map(emp => ({ name: emp.الاسم, grade: emp.الدرجة, numericGrade: emp.numericGrade })));
        
        // Apply pagination
        employees = sortedEmployees.slice(skip, skip + parseInt(limit));
        
        console.log('🔍 Final result after pagination:', employees.map(emp => ({ name: emp.الاسم, grade: emp.الدرجة, numericGrade: emp.numericGrade })));
      } catch (error) {
        console.error('🔍 Error in grade sorting:', error);
        // Fallback to regular sorting
        const sort = {};
        sort['الدرجة'] = sortOrder === 'desc' ? -1 : 1;
        employees = await Employee.find(filter).sort(sort).skip(skip).limit(parseInt(limit)).lean();
      }
    } else {
      // Build sort object - map frontend field names to database field names
      const sort = {};
      const fieldMapping = {
        'name': 'الاسم',
        'department': 'منطقة_العمل',
        'position': 'الوظيفة',
        'gender': 'الجنس'
      };
      const dbField = fieldMapping[sortBy] || 'الاسم'; // Default to name if field not found
      sort[dbField] = sortOrder === 'desc' ? -1 : 1;
      
      // Execute query with pagination - fetch all employee data
      employees = await Employee.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .lean();
    }

    // Get total count for pagination
    let total;
    if (sortBy === 'grade') {
      total = await Employee.countDocuments(filter);
    } else {
      total = await Employee.countDocuments(filter);
    }
    const totalPages = Math.ceil(total / parseInt(limit));

    // Pagination info
    const pagination = {
      currentPage: parseInt(page),
      totalPages,
      totalItems: total,
      itemsPerPage: parseInt(limit),
      hasNextPage: parseInt(page) < totalPages,
      hasPrevPage: parseInt(page) > 1
    };

    // Transform data to match frontend table structure with real data
    const transformedEmployees = employees.map((employee) => ({
      _id: employee._id,
      name: employee.الاسم,
      department: employee.منطقة_العمل,
      position: employee.الوظيفة,
      gender: employee.الجنس,
      contactNumber: employee.رقم_الهاتف || '-',
      civilId: employee.الرقم_المدني,
      birthDate: employee.تاريخ_الميلاد,
      grade: employee.الدرجة,
      hireDate: employee.تاريخ_التعيين,
      jobGroup: employee.المجموعة_النوعية_للوظائف,
      gradeDate: employee.تاريخ_شغل_الدرجة,
      jobDate: employee.تاريخ_شغل_الوظيفة,
      workLocation: employee.مقر_العمل,
      workLocations: employee.موقع_العمل
    }));

    console.log('🔍 Sending response with', transformedEmployees.length, 'employees');
    console.log('🔍 First few employees in response:', transformedEmployees.slice(0, 3));
    sendResponse(res, 200, true, "Employees fetched successfully", {
      data: transformedEmployees,
      pagination
    });

  } catch (error) {
    console.error("🔍 ===== ERROR IN EMPLOYEE FETCH =====");
    console.error("Error fetching employees:", error);
    console.error("Error stack:", error.stack);
    sendResponse(res, 500, false, "Error fetching employees", { error: error.message });
  }
});

// GET employee statistics
router.get("/stats", async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments();
    
    // Department statistics
    const departmentStats = await Employee.aggregate([
      {
        $group: {
          _id: "$منطقة_العمل",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // Gender statistics
    const genderStats = await Employee.aggregate([
      {
        $group: {
          _id: "$الجنس",
          count: { $sum: 1 }
        }
      }
    ]);

    sendResponse(res, 200, true, "Statistics fetched successfully", {
      total: totalEmployees,
      departments: departmentStats,
      gender: genderStats
    });

  } catch (error) {
    console.error("Error fetching statistics:", error);
    sendResponse(res, 500, false, "Error fetching statistics", { error: error.message });
  }
});

// GET all employees for Excel export (without pagination)
router.get("/export", async (req, res) => {
  try {
    const {
      search = "",
      department = "",
      gender = "",
      grade = "",
      jobGroup = "",
      workLocation = "",
      workOffice = "",
      status = ""
    } = req.query;

    // Build filter object
    const filter = {};
    
    // Search functionality - only search by name
    if (search) {
      filter.الاسم = { $regex: search, $options: 'i' };
    }

    // Department filter
    if (department) {
      filter.منطقة_العمل = department;
    }

    // Gender filter
    if (gender) {
      filter.الجنس = gender;
    }

    // Grade filter
    if (grade) {
      filter.الدرجة = grade;
    }

    // Job Group filter
    if (jobGroup) {
      filter.المجموعة_النوعية_للوظائف = jobGroup;
    }

    // Work Location filter
    if (workLocation) {
      filter.مقر_العمل = workLocation;
    }

    // Work Office filter
    if (workOffice) {
      filter.موقع_العمل = { $in: [workOffice] };
    }

    // Status filter (if you add status field later)
    if (status) {
      filter.status = status;
    }

    // Get all employees matching the filters (no pagination)
    const employees = await Employee.find(filter).lean();

    sendResponse(res, 200, true, "Employees fetched successfully for export", employees);

  } catch (error) {
    console.error("Error fetching employees for export:", error);
    sendResponse(res, 500, false, "Error fetching employees for export", { error: error.message });
  }
});

// GET single employee by Civil ID
router.get("/:civilId", async (req, res) => {
  try {
    const employee = await Employee.findOne({ الرقم_المدني: req.params.civilId }).lean();
    
    if (!employee) {
      return sendResponse(res, 404, false, "Employee not found");
    }

    sendResponse(res, 200, true, "Employee fetched successfully", employee);

  } catch (error) {
    console.error("Error fetching employee:", error);
    sendResponse(res, 500, false, "Error fetching employee", { error: error.message });
  }
});

// GET single employee by Object ID (for details page)
router.get("/details/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).lean();
    
    if (!employee) {
      return sendResponse(res, 404, false, "Employee not found");
    }

    sendResponse(res, 200, true, "Employee fetched successfully", employee);

  } catch (error) {
    console.error("Error fetching employee:", error);
    sendResponse(res, 500, false, "Error fetching employee", { error: error.message });
  }
});

// CREATE new employee
router.post("/", async (req, res) => {
  try {
    const { employee: employeeData, user: userData } = req.body;
    
    // Check if employee with same Civil ID already exists
    const existingEmployee = await Employee.findOne({ الرقم_المدني: employeeData.الرقم_المدني });
    
    if (existingEmployee) {
      return sendResponse(res, 400, false, "Employee with this Civil ID already exists");
    }

    // Create employee
    const employee = new Employee(employeeData);
    const savedEmployee = await employee.save();

    // Create user account if user data is provided
    if (userData) {
      try {
        // Import User model dynamically to avoid circular dependencies
        const User = (await import("../models/User.js")).default;
        
        // Check if user with same email already exists
        const existingUser = await User.findOne({ email: userData.email });
        
        if (existingUser) {
          // If user exists, delete the created employee and return error
          await Employee.findByIdAndDelete(savedEmployee._id);
          return sendResponse(res, 400, false, "User with this email already exists");
        }

        // Create user account
        const user = new User(userData);
        await user.save();
        
        console.log(`Created user account for employee: ${employeeData.الاسم}`);
      } catch (userError) {
        console.error("Error creating user account:", userError);
        // If user creation fails, delete the created employee
        await Employee.findByIdAndDelete(savedEmployee._id);
        return sendResponse(res, 500, false, "Error creating user account", { error: userError.message });
      }
    }

    sendResponse(res, 201, true, "Employee created successfully", savedEmployee);

  } catch (error) {
    console.error("Error creating employee:", error);
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return sendResponse(res, 400, false, "Validation error", { errors: validationErrors });
    }

    sendResponse(res, 500, false, "Error creating employee", { error: error.message });
  }
});

// UPDATE employee by Civil ID
router.put("/:civilId", async (req, res) => {
  try {
    const updatedEmployee = await Employee.findOneAndUpdate(
      { الرقم_المدني: req.params.civilId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return sendResponse(res, 404, false, "Employee not found");
    }

    sendResponse(res, 200, true, "Employee updated successfully", updatedEmployee);

  } catch (error) {
    console.error("Error updating employee:", error);
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return sendResponse(res, 400, false, "Validation error", { errors: validationErrors });
    }

    sendResponse(res, 500, false, "Error updating employee", { error: error.message });
  }
});

// DELETE employee by Civil ID
router.delete("/:civilId", async (req, res) => {
  try {
    const deletedEmployee = await Employee.findOneAndDelete({ الرقم_المدني: req.params.civilId });

    if (!deletedEmployee) {
      return sendResponse(res, 404, false, "Employee not found");
    }

    sendResponse(res, 200, true, "Employee deleted successfully");

  } catch (error) {
    console.error("Error deleting employee:", error);
    sendResponse(res, 500, false, "Error deleting employee", { error: error.message });
  }
});

export default router;
