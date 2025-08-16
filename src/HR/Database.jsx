import { Filter, ListFilter, Search, Eye, Edit, Trash2, Calendar, MapPin, Building, Users, Star, ChevronDown, Plus } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Select, SelectOption } from "../components/ui/select";
import { useNavigate } from "react-router-dom";
import { employeeAPI, getErrorMessage, showNotification } from "../lib/api";
import EmployeeEditModal from "./EmployeeEditModal";
import EmployeeAddModal from "./EmployeeAddModal";
import DeleteConfirmationModal from "../components/modals/DeleteConfirmationModal";
import { exportAllEmployeesToExcel } from "../lib/excelExport";
import { formatDate } from "../lib/dateUtils";

const DatabasePage = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const navigate = useNavigate();

  // API States
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
    hasNextPage: false,
    hasPrevPage: false
  });

  // Filter and search states
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [gradeFilter, setGradeFilter] = useState("");
  const [jobGroupFilter, setJobGroupFilter] = useState("");
  const [workLocationFilter, setWorkLocationFilter] = useState("");
  const [workOfficeFilter, setWorkOfficeFilter] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("desc");
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [showGenderOptions, setShowGenderOptions] = useState(false);
  const [showGradeOptions, setShowGradeOptions] = useState(false);
  const [showJobGroupOptions, setShowJobGroupOptions] = useState(false);
  const [showWorkLocationOptions, setShowWorkLocationOptions] = useState(false);
  const [showWorkOfficeOptions, setShowWorkOfficeOptions] = useState(false);

  // Function to close all filter dropdowns except the specified one
  const closeAllDropdowns = (except = null) => {
    console.log('🔧 closeAllDropdowns called with except:', except);
    if (except !== 'sort') {
      console.log('🔧 Closing sort dropdown');
      setShowSortOptions(false);
    }
    if (except !== 'gender') {
      console.log('🔧 Closing gender dropdown');
      setShowGenderOptions(false);
    }
    if (except !== 'grade') {
      console.log('🔧 Closing grade dropdown');
      setShowGradeOptions(false);
    }
    if (except !== 'jobGroup') {
      console.log('🔧 Closing jobGroup dropdown');
      setShowJobGroupOptions(false);
    }
    if (except !== 'workLocation') {
      console.log('🔧 Closing workLocation dropdown');
      setShowWorkLocationOptions(false);
    }
    if (except !== 'workOffice') {
      console.log('🔧 Closing workOffice dropdown');
      setShowWorkOfficeOptions(false);
    }
  };

  // Edit modal states
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Add modal states
  const [addModalOpen, setAddModalOpen] = useState(false);

  // Delete modal states
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);



    // Fetch employees from API
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        page: pagination.currentPage.toString(),
        limit: pagination.itemsPerPage.toString(),
        search: searchTerm,
        gender: genderFilter,
        grade: gradeFilter,
        jobGroup: jobGroupFilter,
        workLocation: workLocationFilter,
        workOffice: workOfficeFilter,
        sortBy: sortBy,
        sortOrder: sortOrder
      };

      // Remove empty parameters
      Object.keys(params).forEach(key => {
        if (params[key] === '' || params[key] === null || params[key] === undefined) {
          delete params[key];
        }
      });

      console.log('🔍 Frontend sending params:', params);
      console.log('🔍 Current filter states:', {
        genderFilter,
        gradeFilter,
        jobGroupFilter,
        workLocationFilter,
        workOfficeFilter,
        sortBy,
        sortOrder
      });
      console.log('🔍 Sort parameters - sortBy:', sortBy, 'sortOrder:', sortOrder);
      console.log('🔍 Full params object being sent:', JSON.stringify(params, null, 2));

      const result = await employeeAPI.getEmployees(params);
      console.log('🔍 API Response:', result);
      
      setEmployees(result.data.data);
      setPagination(result.data.pagination);
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      console.error("Error fetching employees:", err);
    } finally {
      setLoading(false);
    }
  };

  // Debug useEffect to track filter state changes
  useEffect(() => {
    console.log('🎯 Filter state changed:', {
      genderFilter,
      gradeFilter,
      jobGroupFilter,
      workLocationFilter,
      workOfficeFilter
    });
  }, [genderFilter, gradeFilter, jobGroupFilter, workLocationFilter, workOfficeFilter]);

  // Debug useEffect to track dropdown state changes
  useEffect(() => {
    console.log('📋 Dropdown states:', {
      showSortOptions,
      showGenderOptions,
      showGradeOptions,
      showJobGroupOptions,
      showWorkLocationOptions,
      showWorkOfficeOptions
    });
  }, [showSortOptions, showGenderOptions, showGradeOptions, showJobGroupOptions, showWorkLocationOptions, showWorkOfficeOptions]);

  // Fetch employees when filters change
  useEffect(() => {
    console.log('🔄 useEffect triggered with filters:', {
      pagination: pagination.currentPage,
      searchTerm,
      genderFilter,
      gradeFilter,
      jobGroupFilter,
      workLocationFilter,
      workOfficeFilter,
      sortBy,
      sortOrder
    });
    fetchEmployees();
  }, [pagination.currentPage, searchTerm, genderFilter, gradeFilter, jobGroupFilter, workLocationFilter, workOfficeFilter, sortBy, sortOrder]);

  useEffect(() => {
    function handleClickOutside(event) {
      // Check if the click is inside any dropdown or filter button
      const isInsideDropdown = event.target.closest('.filter-dropdown');
      const isInsideFilterButton = event.target.closest('.filter-button');
      
      // Only close dropdowns if clicking outside both dropdowns and filter buttons
      if (!isInsideDropdown && !isInsideFilterButton) {
        console.log('🔧 Click outside detected, closing all dropdowns');
        closeAllDropdowns();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle employee actions
  const handleView = (employee) => {
    navigate(`/employee-details/${employee._id}`);
  };

  const handleEdit = (employee) => {
    console.log('🔍 Edit button clicked for employee:', employee);
    console.log('🔍 Employee data structure:', Object.keys(employee));
    console.log('🔍 Employee name field:', employee.الاسم || employee.name);
    setSelectedEmployee(employee);
    setEditModalOpen(true);
  };

  const handleEditSuccess = () => {
    fetchEmployees();
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleAddSuccess = () => {
    fetchEmployees();
  };

  const handleCloseAddModal = () => {
    setAddModalOpen(false);
  };

  const handleDelete = (employee) => {
    setEmployeeToDelete(employee);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!employeeToDelete) return;
    
    setDeleteLoading(true);
    try {
      await employeeAPI.deleteEmployee(employeeToDelete.civilId);
      showNotification("تم حذف الموظف بنجاح", "success");
      setDeleteModalOpen(false);
      setEmployeeToDelete(null);
      // Refresh the employee list
      fetchEmployees();
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      showNotification(errorMessage, "error");
      console.error("Error deleting employee:", err);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setEmployeeToDelete(null);
    setDeleteLoading(false);
  };

  const handleExportToExcel = async () => {
    try {
      // Get all employees for export (with current filters applied)
      const params = {
        search: searchTerm,
        gender: genderFilter,
        grade: gradeFilter,
        jobGroup: jobGroupFilter,
        workLocation: workLocationFilter,
        workOffice: workOfficeFilter
      };

      // Remove empty parameters
      Object.keys(params).forEach(key => {
        if (params[key] === '' || params[key] === null || params[key] === undefined) {
          delete params[key];
        }
      });
      
      console.log('🔍 Exporting with params:', params);
      const result = await employeeAPI.getEmployeesForExport(params);
      console.log('🔍 Export result:', result);
      
      if (result && result.data && result.data.length > 0) {
        exportAllEmployeesToExcel(result.data);
        showNotification("تم تصدير بيانات الموظفين بنجاح", "success");
      } else if (result && result.data && result.data.length === 0) {
        showNotification("لا توجد بيانات للتصدير", "error");
      } else {
        console.error("Unexpected result structure:", result);
        showNotification("خطأ في تنسيق البيانات المستلمة", "error");
      }
    } catch (err) {
      console.error("Error exporting to Excel:", err);
      console.error("Error details:", {
        message: err.message,
        status: err.status,
        data: err.data
      });
      
      let errorMessage = "حدث خطأ أثناء تصدير البيانات";
      if (err.message) {
        errorMessage = err.message;
      } else if (err.status === 0) {
        errorMessage = "فشل في الاتصال بالخادم. يرجى التأكد من تشغيل الخادم";
      }
      
      showNotification(errorMessage, "error");
    }
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, currentPage: newPage }));
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setSearchTerm("");
    setGenderFilter("");
    setGradeFilter("");
    setJobGroupFilter("");
    setWorkLocationFilter("");
    setWorkOfficeFilter("");
    setSortBy("createdAt");
    setSortOrder("desc");
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };



  return (
    <div
      className={`flex min-h-screen ${
        isDarkMode ? "bg-gray-900" : "bg-[#f6f5fa]"
      }`}
      dir="rtl"
    >
      <Sidebar />
      <main className="flex-1 p-10">
        <div className="max-w-7xl mx-auto">
                     <motion.div 
             className="mb-8"
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5 }}
           >
             <motion.h1
               className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2 text-right"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 0.5, delay: 0.1 }}
             >
               قاعدة البيانات
             </motion.h1>
             <p className="text-gray-600 dark:text-gray-400 text-lg text-right">
               عرض بيانات الموظفين مع إمكانات التصفية والبحث والترتيب للحصول على رؤى سريعة.
             </p>
           </motion.div>

                       {/* Search and Sort Section */}
            <motion.div 
              className="flex flex-col md:flex-row items-center gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Add Employee Button */}
              <Button
                onClick={() => setAddModalOpen(true)}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                إضافة موظف جديد
              </Button>

              {/* Export Button */}
              <Button
                onClick={handleExportToExcel}
                variant="outline"
                className="flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                تصدير Excel
              </Button>
             {/* Search Bar */}
             <div className="relative flex-1 max-w-lg">
               <Search
                 className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 
                 ${isDarkMode ? "text-gray-300" : "text-gray-400"}`}
               />
                               <Input
                  type="text"
                  placeholder="بحث..."
                  className="pr-10 text-right h-12 text-base"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>

             {/* Sort Button - Next to Search */}
             <div className="relative">
                               <Button
                  variant="outline"
                  className="filter-button flex items-center gap-2"
                                          onClick={() => {
                          closeAllDropdowns('sort');
                          setShowSortOptions(!showSortOptions);
                        }}
                >
                  <ListFilter className="w-4 h-4" />
                  <span>
                    {sortBy === 'name' && sortOrder === 'asc' ? 'الاسم (أ - ي)' :
                     sortBy === 'name' && sortOrder === 'desc' ? 'الاسم (ي - أ)' :
                     sortBy === 'grade' && sortOrder === 'asc' ? 'درجات مالية (1 - 15)' :
                     sortBy === 'grade' && sortOrder === 'desc' ? 'درجات مالية (15 - 1)' :
                     sortBy === 'position' && sortOrder === 'asc' ? 'الوظيفة (أ - ي)' :
                     sortBy === 'position' && sortOrder === 'desc' ? 'الوظيفة (ي - أ)' :
                     'ترتيب'}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
               {showSortOptions && (
                 <div
                   className={`filter-dropdown absolute top-full mt-2 w-56 rounded-lg shadow-md z-10 border ${
                     isDarkMode
                       ? "bg-gray-800 border-gray-700 text-white"
                       : "bg-white border-gray-200"
                   }`}
                 >
                                       {[
                      ["name-asc", "الاسم (أ - ي)"],
                      ["name-desc", "الاسم (ي - أ)"],
                      ["grade-asc", "درجات مالية (1 - 15)"],
                      ["grade-desc", "درجات مالية (15 - 1)"],
                      ["position-asc", "الوظيفة (أ - ي)"],
                      ["position-desc", "الوظيفة (ي - أ)"],
                    ].map(([value, label]) => (
                     <button
                       key={value}
                                               onClick={() => {
                          const [field, order] = value.split('-');
                          console.log('🎯 Sorting option clicked:', value, 'field:', field, 'order:', order);
                          setSortBy(field);
                          setSortOrder(order);
                          setShowSortOptions(false);
                        }}
                       className={`w-full text-right px-4 py-2 text-sm transition 
                       ${
                         isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                       }`}
                     >
                       {label}
                     </button>
                   ))}
                 </div>
               )}
             </div>
           </motion.div>

             {/* Advanced Filters Section */}
             <motion.div
               className={`${
                 isDarkMode ? "bg-gray-800" : "bg-white"
               } rounded-2xl shadow-lg p-6 mb-8`}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.3 }}
             >
               <h3 className={`text-lg font-bold mb-6 text-right ${
                 isDarkMode ? "text-white" : "text-gray-800"
               }`}>
                 <Filter className="inline w-5 h-5 ml-2" />
                 التصفية 
               </h3>

                                                               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                      {/* Gender Filter */}
                    <div className="relative">
                      <Button
                        variant="outline"
                        className="filter-button flex items-center gap-2 w-full justify-between h-12 text-base"
                        onClick={() => {
                          console.log('🎯 Gender dropdown clicked, current state:', showGenderOptions);
                          // Close all other dropdowns first
                          setShowSortOptions(false);
                          setShowGradeOptions(false);
                          setShowJobGroupOptions(false);
                          setShowWorkLocationOptions(false);
                          setShowWorkOfficeOptions(false);
                          // Toggle the current dropdown
                          const newState = !showGenderOptions;
                          console.log('🎯 Setting gender dropdown to:', newState);
                          setShowGenderOptions(newState);
                        }}
                      >
                        <Users className="w-4 h-4" />
                        <span>{genderFilter || "الجنس"}</span>
                        <ChevronDown className="w-4 h-4" />
                        {genderFilter && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </Button>
                                            {showGenderOptions && (
                        <div
                          className={`filter-dropdown absolute top-full mt-2 w-full rounded-lg shadow-md z-10 border max-h-60 overflow-y-auto ${
                            isDarkMode
                              ? "bg-gray-800 border-gray-700 text-white"
                              : "bg-white border-gray-200"
                          }`}
                        >
                          <button
                            onClick={() => {
                              console.log('🎯 Gender filter clicked: جميع الجنسين');
                              setGenderFilter("");
                              setShowGenderOptions(false);
                            }}
                            className={`w-full text-right px-4 py-2 text-sm transition 
                            ${
                              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                            }`}
                          >
                            جميع الجنسين
                          </button>
                          <button
                            onClick={() => {
                              console.log('🎯 Gender filter clicked: ذكر');
                              setGenderFilter("ذكر");
                              setShowGenderOptions(false);
                            }}
                            className={`w-full text-right px-4 py-2 text-sm transition 
                            ${
                              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                            }`}
                          >
                            ذكر
                          </button>
                          <button
                            onClick={() => {
                              console.log('🎯 Gender filter clicked: أنثى');
                              setGenderFilter("أنثى");
                              setShowGenderOptions(false);
                            }}
                            className={`w-full text-right px-4 py-2 text-sm transition 
                            ${
                              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                            }`}
                          >
                            أنثى
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Grade Filter */}
                    <div className="relative">
                      <Button
                        variant="outline"
                        className="filter-button flex items-center gap-2 w-full justify-between h-12 text-base"
                        onClick={() => {
                          closeAllDropdowns('grade');
                          setShowGradeOptions(!showGradeOptions);
                        }}
                      >
                        <Star className="w-4 h-4" />
                        <span>{gradeFilter || "درجات مالية"}</span>
                        <ChevronDown className="w-4 h-4" />
                        {gradeFilter && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </Button>
                      {showGradeOptions && (
                        <div
                          className={`filter-dropdown absolute top-full mt-2 w-full rounded-lg shadow-md z-10 border max-h-60 overflow-y-auto ${
                            isDarkMode
                              ? "bg-gray-800 border-gray-700 text-white"
                              : "bg-white border-gray-200"
                          }`}
                        >
                          <button
                            onClick={() => {
                              setGradeFilter("");
                              setShowGradeOptions(false);
                            }}
                            className={`w-full text-right px-4 py-2 text-sm transition 
                            ${
                              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                            }`}
                          >
                            جميع الدرجات
                          </button>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((grade) => (
                            <button
                              key={grade}
                                                          onClick={() => {
                              setGradeFilter(grade.toString());
                              setShowGradeOptions(false);
                            }}
                              className={`w-full text-right px-4 py-2 text-sm transition 
                              ${
                                isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                              }`}
                            >
                              {grade === 1 ? "أولى" : grade === 2 ? "ثانية" : grade === 3 ? "ثالثة" : grade === 4 ? "رابعة" : grade === 5 ? "خامسة" : grade === 6 ? "سادسة" : grade === 7 ? "سابعة" : grade === 8 ? "ثامنة" : grade === 9 ? "تاسعة" : "عاشرة"}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Job Group Filter */}
                    <div className="relative">
                      <Button
                        variant="outline"
                        className="filter-button flex items-center gap-2 w-full justify-between h-12 text-base"
                        onClick={() => {
                          console.log('🎯 Job Group dropdown clicked, current state:', showJobGroupOptions);
                          // Close all other dropdowns first
                          setShowSortOptions(false);
                          setShowGenderOptions(false);
                          setShowGradeOptions(false);
                          setShowWorkLocationOptions(false);
                          setShowWorkOfficeOptions(false);
                          // Toggle the current dropdown
                          const newState = !showJobGroupOptions;
                          console.log('🎯 Setting job group dropdown to:', newState);
                          setShowJobGroupOptions(newState);
                        }}
                      >
                        <Calendar className="w-4 h-4" />
                        <span>{jobGroupFilter || "المجموعة النوعية"}</span>
                        <ChevronDown className="w-4 h-4" />
                        {jobGroupFilter && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </Button>
                      {showJobGroupOptions && (
                        <div
                          className={`filter-dropdown absolute top-full mt-2 w-full rounded-lg shadow-md z-10 border max-h-60 overflow-y-auto ${
                            isDarkMode
                              ? "bg-gray-800 border-gray-700 text-white"
                              : "bg-white border-gray-200"
                          }`}
                        >
                          <button
                            onClick={() => {
                              console.log('🎯 Job Group filter clicked: جميع المجموعات');
                              setJobGroupFilter("");
                              setShowJobGroupOptions(false);
                            }}
                            className={`w-full text-right px-4 py-2 text-sm transition 
                            ${
                              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                            }`}
                          >
                            جميع المجموعات
                          </button>
                          {["الإدارية", "الإحصاء ونظم المعلومات", "الموارد البشرية", "المالية", "التقنية"].map((group) => (
                            <button
                              key={group}
                              onClick={() => {
                                console.log('🎯 Job Group filter clicked:', group);
                                setJobGroupFilter(group);
                                setShowJobGroupOptions(false);
                              }}
                              className={`w-full text-right px-4 py-2 text-sm transition 
                              ${
                                isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                              }`}
                            >
                              {group}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Work Location Filter */}
                    <div className="relative">
                      <Button
                        variant="outline"
                        className="filter-button flex items-center gap-2 w-full justify-between h-12 text-base"
                        onClick={() => {
                          console.log('🎯 Work Location dropdown clicked, current state:', showWorkLocationOptions);
                          // Close all other dropdowns first
                          setShowSortOptions(false);
                          setShowGenderOptions(false);
                          setShowGradeOptions(false);
                          setShowJobGroupOptions(false);
                          setShowWorkOfficeOptions(false);
                          // Toggle the current dropdown
                          const newState = !showWorkLocationOptions;
                          console.log('🎯 Setting work location dropdown to:', newState);
                          setShowWorkLocationOptions(newState);
                        }}
                      >
                        <MapPin className="w-4 h-4" />
                        <span>{workLocationFilter || "مقر العمل"}</span>
                        <ChevronDown className="w-4 h-4" />
                        {workLocationFilter && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </Button>
                      {showWorkLocationOptions && (
                        <div
                          className={`filter-dropdown absolute top-full mt-2 w-full rounded-lg shadow-md z-10 border max-h-60 overflow-y-auto ${
                            isDarkMode
                              ? "bg-gray-800 border-gray-700 text-white"
                              : "bg-white border-gray-200"
                          }`}
                        >
                          <button
                            onClick={() => {
                              console.log('🎯 Work Location filter clicked: جميع المقرات');
                              setWorkLocationFilter("");
                              setShowWorkLocationOptions(false);
                            }}
                            className={`w-full text-right px-4 py-2 text-sm transition 
                            ${
                              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                            }`}
                          >
                            جميع المقرات
                          </button>
                          {["الخوير", "مطرح", "الوطية", "الغبرة", "السيب", "مسقط", "صلالة", "صحار", "نزوى"].map((location) => (
                            <button
                              key={location}
                              onClick={() => {
                                console.log('🎯 Work Location filter clicked:', location);
                                setWorkLocationFilter(location);
                                setShowWorkLocationOptions(false);
                              }}
                              className={`w-full text-right px-4 py-2 text-sm transition break-words ${
                                isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                              }`}
                            >
                              {location}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Work Office Filter - Commented out for now */}
                    {/* <div className="relative">
                      <Button
                        variant="outline"
                        className="filter-button flex items-center gap-2 w-full justify-between h-12 text-base"
                        onClick={() => {
                          console.log('🎯 Work Office dropdown clicked, current state:', showWorkOfficeOptions);
                          // Close all other dropdowns first
                          setShowSortOptions(false);
                          setShowGenderOptions(false);
                          setShowGradeOptions(false);
                          setShowJobGroupOptions(false);
                          setShowWorkLocationOptions(false);
                          // Toggle the current dropdown
                          const newState = !showWorkOfficeOptions;
                          console.log('🎯 Setting work office dropdown to:', newState);
                          setShowWorkOfficeOptions(newState);
                        }}
                      >
                        <Building className="w-4 h-4" />
                        <span>{workOfficeFilter || "الدائرة"}</span>
                        <ChevronDown className="w-4 h-4" />
                        {workOfficeFilter && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </Button>
                      {showWorkOfficeOptions && (
                        <div
                          className={`filter-dropdown absolute top-full mt-2 w-full rounded-lg shadow-md z-10 border max-h-60 overflow-y-auto ${
                            isDarkMode
                              ? "bg-gray-800 border-gray-700 text-white"
                              : "bg-white border-gray-200"
                          }`}
                        >
                          <button
                            onClick={() => {
                              console.log('🎯 Work Office filter clicked: جميع الدوائر');
                              setWorkOfficeFilter("");
                              setShowWorkOfficeOptions(false);
                            }}
                            className={`w-full text-right px-4 py-2 text-sm transition 
                            ${
                              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                            }`}
                          >
                            جميع الدوائر
                          </button>
                          {["المديرية العامة للشؤون الادارية والمالية", "دائرة الموارد البشرية", "قسم المهمات والإجازات", "الوزير", "دائرة الشؤون المالية", "دائرة الشؤون القانونية", "دائرة الشؤون الإدارية"].map((office) => (
                            <button
                              key={office}
                              onClick={() => {
                                console.log('🎯 Work Office filter clicked:', office);
                                setWorkOfficeFilter(office);
                                setShowWorkOfficeOptions(false);
                              }}
                              className={`w-full text-right px-4 py-2 text-sm transition break-words ${
                                isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                              }`}
                            >
                              {office}
                            </button>
                          ))}
                        </div>
                      )}
                    </div> */}
                 </div>

                               {/* Active Filters Display */}
               {(genderFilter || gradeFilter || jobGroupFilter || workLocationFilter) && (
                 <div className="mt-6 p-4 rounded-lg border border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-700">
                   <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">التصفية النشطة:</h4>
                   <div className="flex flex-wrap gap-2">
                     {genderFilter && (
                       <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full">
                         الجنس: {genderFilter}
                         <button
                           onClick={() => setGenderFilter("")}
                           className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
                         >
                           ×
                         </button>
                       </span>
                     )}
                     {gradeFilter && (
                       <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full">
                         الدرجة: {gradeFilter}
                         <button
                           onClick={() => setGradeFilter("")}
                           className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
                         >
                           ×
                         </button>
                       </span>
                     )}
                     {jobGroupFilter && (
                       <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full">
                         المجموعة النوعية: {jobGroupFilter}
                         <button
                           onClick={() => setJobGroupFilter("")}
                           className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
                         >
                           ×
                         </button>
                       </span>
                     )}
                     {workLocationFilter && (
                       <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full">
                         مقر العمل: {workLocationFilter}
                         <button
                           onClick={() => setWorkLocationFilter("")}
                           className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
                         >
                           ×
                         </button>
                       </span>
                     )}

                   </div>
                 </div>
               )}



               {/* Clear Filters Button */}
                <div className="mt-6 text-center">
                                                                           <Button
                      variant="outline"
                      onClick={handleClearFilters}
                    >
                      مسح جميع التصفية
                    </Button>
                </div>
             </motion.div>

              <div
                className={`${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                } rounded-2xl shadow-lg overflow-hidden`}
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-right">
                    <thead>
                      <tr
                        className={`${
                          isDarkMode
                            ? "bg-gray-700 text-white border-b border-gray-600"
                            : "bg-gray-50 text-gray-600 border-b border-gray-200"
                        } font-semibold`}
                      >
                                                                          <th className="p-4 whitespace-nowrap">الاسم</th>
                                                  <th className="p-4 whitespace-nowrap">المنصب</th>
                        <th className="p-4 whitespace-nowrap">مقر العمل</th>
                        <th className="p-4 whitespace-nowrap">الدرجة</th>
                        <th className="p-4 whitespace-nowrap">المجموعة النوعية</th>
                        <th className="p-4 whitespace-nowrap">الجنس</th>
                        <th className="p-4 whitespace-nowrap">رقم الهاتف</th>
                        <th className="p-4 whitespace-nowrap">الإجراءات</th>
                      </tr>
                    </thead>
                                                                                   <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan="9" className="p-4 text-center">
                              <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                                <span className="mr-2">جاري التحميل...</span>
                              </div>
                            </td>
                          </tr>
                                                 ) : error ? (
                           <tr>
                             <td colSpan="9" className="p-4 text-center text-red-500">
                               {error}
                             </td>
                           </tr>
                         ) : employees.length === 0 ? (
                           <tr>
                             <td colSpan="9" className="p-4 text-center text-gray-500">
                               لا توجد بيانات موظفين
                             </td>
                           </tr>
                        ) : (
                          employees.map((employee) => (
                                                  <tr
                            key={employee._id}
                            className={`border-b ${
                              isDarkMode
                                ? "border-gray-700 hover:bg-gray-700"
                                : "border-gray-100 hover:bg-gray-50"
                            } transition`}
                          >
                                                         <td className="p-4">
                               <div className="flex items-center gap-3">
                                 <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
                                   {(employee.الاسم || employee.name)?.charAt(0) || "?"}
                                 </div>
                                 <div className="text-right">
                                   <div
                                     className={`${
                                       isDarkMode ? "text-white" : "text-gray-900"
                                     } font-medium`}
                                   >
                                     {employee.الاسم || employee.name}
                                   </div>
                                 </div>
                               </div>
                             </td>
                             <td
                               className={`p-4 whitespace-nowrap ${
                                 isDarkMode ? "text-gray-300" : "text-gray-700"
                               }`}
                             >
                               {employee.الوظيفة || employee.position}
                             </td>
                             <td
                               className={`p-4 whitespace-nowrap ${
                                 isDarkMode ? "text-gray-300" : "text-gray-700"
                               }`}
                             >
                               {employee.مقر_العمل || employee.workLocation || '-'}
                             </td>
                             <td
                               className={`p-4 whitespace-nowrap ${
                                 isDarkMode ? "text-gray-300" : "text-gray-700"
                               }`}
                             >
                               {employee.الدرجة || employee.grade || '-'}
                             </td>
                             <td
                               className={`p-4 whitespace-nowrap ${
                                 isDarkMode ? "text-gray-300" : "text-gray-700"
                               }`}
                             >
                               {employee.المجموعة_النوعية_للوظائف || employee.jobGroup || '-'}
                             </td>

                             <td
                               className={`p-4 whitespace-nowrap ${
                                 isDarkMode ? "text-gray-300" : "text-gray-700"
                               }`}
                             >
                               {employee.الجنس || employee.gender || '-'}
                             </td>
                             <td
                               className={`p-4 whitespace-nowrap ${
                                 isDarkMode ? "text-gray-300" : "text-gray-700"
                               }`}
                             >
                               {(employee.رقم_الهاتف || employee.contactNumber || employee.phone || '-').replace(/^\+968\s*/, '')}
                             </td>
                            <td className="p-4 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleView(employee)}
                                  className={`p-2 rounded-lg transition-colors ${
                                    isDarkMode
                                      ? "text-blue-400 hover:bg-blue-900/20"
                                      : "text-blue-600 hover:bg-blue-50"
                                  }`}
                                  title="عرض"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleEdit(employee)}
                                  className={`p-2 rounded-lg transition-colors ${
                                    isDarkMode
                                      ? "text-green-400 hover:bg-green-900/20"
                                      : "text-green-600 hover:bg-green-50"
                                  }`}
                                  title="تعديل"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDelete(employee)}
                                  className={`p-2 rounded-lg transition-colors ${
                                    isDarkMode
                                      ? "text-red-400 hover:bg-red-900/20"
                                      : "text-red-600 hover:bg-red-50"
                                  }`}
                                  title="حذف"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                        )}
                                         </tbody>
                   </table>
                 </div>
                 
                 {/* Pagination */}
                 <div className={`px-6 py-4 border-t ${
                   isDarkMode ? "border-gray-700" : "border-gray-200"
                 }`}>
                   <div className="flex items-center justify-between">
                                           {/* Results Counter */}
                      <div className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}>
                        عرض {((pagination.currentPage - 1) * pagination.itemsPerPage) + 1}-{Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} من أصل {pagination.totalItems} موظف
                      </div>
                      
                      {/* Pagination Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handlePageChange(pagination.currentPage - 1)}
                          disabled={!pagination.hasPrevPage}
                          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                            !pagination.hasPrevPage
                              ? isDarkMode
                                ? "text-gray-600 cursor-not-allowed"
                                : "text-gray-400 cursor-not-allowed"
                              : isDarkMode
                              ? "text-gray-300 hover:bg-gray-700"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          السابق
                        </button>
                        
                        {/* Page Numbers */}
                        <div className="flex items-center gap-1">
                          {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                            let pageNumber;
                            if (pagination.totalPages <= 5) {
                              pageNumber = i + 1;
                            } else if (pagination.currentPage <= 3) {
                              pageNumber = i + 1;
                            } else if (pagination.currentPage >= pagination.totalPages - 2) {
                              pageNumber = pagination.totalPages - 4 + i;
                            } else {
                              pageNumber = pagination.currentPage - 2 + i;
                            }
                            
                            return (
                              <button
                                key={pageNumber}
                                onClick={() => handlePageChange(pageNumber)}
                                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                                  pagination.currentPage === pageNumber
                                    ? isDarkMode
                                      ? "bg-blue-600 text-white"
                                      : "bg-blue-500 text-white"
                                    : isDarkMode
                                    ? "text-gray-300 hover:bg-gray-700"
                                    : "text-gray-700 hover:bg-gray-100"
                                }`}
                              >
                                {pageNumber}
                              </button>
                            );
                          })}
                        </div>
                        
                        <button
                          onClick={() => handlePageChange(pagination.currentPage + 1)}
                          disabled={!pagination.hasNextPage}
                          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                            !pagination.hasNextPage
                              ? isDarkMode
                                ? "text-gray-600 cursor-not-allowed"
                                : "text-gray-400 cursor-not-allowed"
                              : isDarkMode
                              ? "text-gray-300 hover:bg-gray-700"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          التالي
                        </button>
                      </div>
                   </div>
                                                    </div>
                </div>
         </div>
       </main>

               {/* Add Employee Modal */}
        <EmployeeAddModal
          isOpen={addModalOpen}
          onClose={handleCloseAddModal}
          onSuccess={handleAddSuccess}
        />

        {/* Edit Modal */}
        <EmployeeEditModal
          employee={selectedEmployee}
          isOpen={editModalOpen}
          onClose={handleCloseEditModal}
          onSuccess={handleEditSuccess}
        />

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          isOpen={deleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          employeeName={employeeToDelete?.name || employeeToDelete?.الاسم || ''}
          loading={deleteLoading}
        />
      </div>
    );
  };

export default DatabasePage;
