import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";
import { ArrowLeft, User, Building, MapPin, Calendar, Phone, Mail, Edit, Trash2 } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { Button } from "../components/ui/button";
import EmployeeEditModal from "./EmployeeEditModal";
import DeleteConfirmationModal from "../components/modals/DeleteConfirmationModal";
import { employeeAPI, getErrorMessage, showNotification } from "../lib/api";
import { exportEmployeeToExcel } from "../lib/excelExport";
import { formatDate } from "../lib/dateUtils";

const EmployeeDetailsPage = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const result = await employeeAPI.getEmployeeDetails(id);
        setEmployee(result.data);
      } catch (err) {
        const errorMessage = getErrorMessage(err);
        setError(errorMessage);
        console.error("Error fetching employee details:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEmployeeDetails();
    }
  }, [id]);

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const handleEditSuccess = () => {
    // Show success notification first
    showNotification("تم تحديث بيانات الموظف بنجاح", "success");
    
    // Refresh employee data after a short delay to allow notification to show
    setTimeout(() => {
      window.location.reload();
    }, 1500); // 1.5 seconds delay
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };

  const handleDelete = () => {
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setDeleteLoading(true);
    try {
      await employeeAPI.deleteEmployee(employee.الرقم_المدني);
      showNotification("تم حذف الموظف بنجاح", "success");
      setDeleteModalOpen(false);
      navigate("/db");
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
    setDeleteLoading(false);
  };

  const handleExportToExcel = () => {
    try {
      exportEmployeeToExcel(employee);
      showNotification("تم تصدير بيانات الموظف بنجاح", "success");
    } catch (err) {
      showNotification("فشل في تصدير البيانات", "error");
      console.error("Error exporting to Excel:", err);
    }
  };

  if (loading) {
    return (
      <div className={`flex min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-[#f6f5fa]"}`} dir="rtl">
        <Sidebar />
        <main className="flex-1 p-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              <span className="mr-4 text-lg">جاري التحميل...</span>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-[#f6f5fa]"}`} dir="rtl">
        <Sidebar />
        <main className="flex-1 p-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <div className="text-red-500 text-xl mb-4">{error}</div>
              <Button onClick={() => navigate("/db")} variant="outline">
                العودة إلى قاعدة البيانات
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className={`flex min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-[#f6f5fa]"}`} dir="rtl">
        <Sidebar />
        <main className="flex-1 p-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <div className="text-gray-500 text-xl mb-4">لم يتم العثور على الموظف</div>
              <Button onClick={() => navigate("/db")} variant="outline">
                العودة إلى قاعدة البيانات
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={`flex min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-[#f6f5fa]"}`} dir="rtl">
      <Sidebar />
      <main className="flex-1 p-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
                         <div className="flex items-center justify-between mb-4">
               <Button 
                 onClick={() => navigate("/db")} 
                 variant="outline"
                 className="flex items-center gap-2"
               >
                 <ArrowLeft className="w-4 h-4" />
                 العودة
               </Button>
               <div className="flex items-center gap-2">
                 <Button onClick={handleExportToExcel} variant="outline" className="flex items-center gap-2">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                   </svg>
                   تصدير Excel
                 </Button>
                 <Button onClick={handleEdit} variant="outline" className="flex items-center gap-2">
                   <Edit className="w-4 h-4" />
                   تعديل
                 </Button>
                 <Button onClick={handleDelete} variant="outline" className="flex items-center gap-2 text-red-600 hover:text-red-700">
                   <Trash2 className="w-4 h-4" />
                   حذف
                 </Button>
               </div>
             </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2 text-right">
              تفاصيل الموظف
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg text-right">
              عرض المعلومات التفصيلية للموظف
            </p>
          </motion.div>

                     {/* Employee Profile Card */}
           <motion.div
             className={`${isDarkMode ? "bg-gray-800" : "bg-white"} rounded-2xl shadow-lg p-6 mb-8`}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.1 }}
           >
            <div className="flex items-center gap-6 mb-8">
              <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl font-bold">
                {employee.الاسم?.charAt(0) || "?"}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  {employee.الاسم}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  {employee.الوظيفة}
                </p>
                <p className="text-gray-500 dark:text-gray-500">
                  {employee.منطقة_العمل}
                </p>
              </div>
            </div>

            {/* Employee Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  المعلومات الشخصية
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">الرقم المدني:</span>
                    <span className="font-medium text-gray-800 dark:text-white">{employee.الرقم_المدني}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">الجنس:</span>
                    <span className="font-medium text-gray-800 dark:text-white">{employee.الجنس}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">تاريخ الميلاد:</span>
                    <span className="font-medium text-gray-800 dark:text-white">{formatDate(employee.تاريخ_الميلاد)}</span>
                  </div>
                  {employee.رقم_الهاتف && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">رقم الهاتف:</span>
                      <span className="font-medium text-gray-800 dark:text-white flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {employee.رقم_الهاتف}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Employment Information */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  معلومات التوظيف
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">الوظيفة:</span>
                    <span className="font-medium text-gray-800 dark:text-white">{employee.الوظيفة}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">الدرجة:</span>
                    <span className="font-medium text-gray-800 dark:text-white">{employee.الدرجة}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">منطقة العمل:</span>
                    <span className="font-medium text-gray-800 dark:text-white flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {employee.منطقة_العمل}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">مقر العمل:</span>
                    <span className="font-medium text-gray-800 dark:text-white">{employee.مقر_العمل}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">المجموعة النوعية:</span>
                    <span className="font-medium text-gray-800 dark:text-white">{employee.المجموعة_النوعية_للوظائف}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dates Section */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                التواريخ المهمة
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">تاريخ التعيين</div>
                  <div className="font-medium text-gray-800 dark:text-white">{formatDate(employee.تاريخ_التعيين)}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">تاريخ شغل الدرجة</div>
                  <div className="font-medium text-gray-800 dark:text-white">{formatDate(employee.تاريخ_شغل_الدرجة)}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">تاريخ شغل الوظيفة</div>
                  <div className="font-medium text-gray-800 dark:text-white">{formatDate(employee.تاريخ_شغل_الوظيفة)}</div>
                </div>
              </div>
            </div>

            {/* Work Locations */}
            {employee.موقع_العمل && employee.موقع_العمل.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  مواقع العمل
                </h3>
                <div className="flex flex-wrap gap-2">
                  {employee.موقع_العمل.map((location, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                    >
                      {location}
                    </span>
                  ))}
                </div>
              </div>
            )}
                     </motion.div>
         </div>
       </main>

               {/* Edit Modal */}
        <EmployeeEditModal
          employee={employee}
          isOpen={editModalOpen}
          onClose={handleCloseEditModal}
          onSuccess={handleEditSuccess}
        />

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          isOpen={deleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          employeeName={employee?.الاسم || ''}
          loading={deleteLoading}
        />
      </div>
    );
  };

export default EmployeeDetailsPage;
