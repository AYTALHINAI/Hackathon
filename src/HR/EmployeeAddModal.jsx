import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, User, Building, MapPin, Calendar, Phone, Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectOption } from "../components/ui/select";
import { employeeAPI, getErrorMessage, showNotification } from "../lib/api";
import CredentialsDisplayModal from "./CredentialsDisplayModal";

const EmployeeAddModal = ({ isOpen, onClose, onSuccess }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const [formData, setFormData] = useState({
    الاسم: "",
    الرقم_المدني: "",
    الوظيفة: "",
    منطقة_العمل: "",
    مقر_العمل: "",
    الجنس: "",
    تاريخ_الميلاد: "",
    الدرجة: "",
    تاريخ_التعيين: "",
    المجموعة_النوعية_للوظائف: "",
    تاريخ_شغل_الدرجة: "",
    تاريخ_شغل_الوظيفة: "",
    رقم_الهاتف: "",
    موقع_العمل: ""
  });

  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showCredentials, setShowCredentials] = useState(false);
  const [createdCredentials, setCreatedCredentials] = useState(null);

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.الاسم.trim()) {
      newErrors.الاسم = "الاسم مطلوب";
    }

    if (!formData.الرقم_المدني.trim()) {
      newErrors.الرقم_المدني = "الرقم المدني مطلوب";
    }

    if (!formData.الوظيفة.trim()) {
      newErrors.الوظيفة = "الوظيفة مطلوبة";
    }

    if (!formData.منطقة_العمل.trim()) {
      newErrors.منطقة_العمل = "منطقة العمل مطلوبة";
    }

    if (!formData.الجنس) {
      newErrors.الجنس = "الجنس مطلوب";
    }

    if (!formData.تاريخ_الميلاد.trim()) {
      newErrors.تاريخ_الميلاد = "تاريخ الميلاد مطلوب";
    }

    if (!formData.الدرجة.trim()) {
      newErrors.الدرجة = "الدرجة مطلوبة";
    }

    if (!formData.تاريخ_التعيين.trim()) {
      newErrors.تاريخ_التعيين = "تاريخ التعيين مطلوب";
    }

    if (!formData.المجموعة_النوعية_للوظائف.trim()) {
      newErrors.المجموعة_النوعية_للوظائف = "المجموعة النوعية مطلوبة";
    }

    // User account validation
    if (!userData.email.trim()) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = "البريد الإلكتروني غير صحيح";
    }

    if (!userData.password.trim()) {
      newErrors.password = "كلمة المرور مطلوبة";
    } else if (userData.password.length < 6) {
      newErrors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
    }

    if (!userData.confirmPassword.trim()) {
      newErrors.confirmPassword = "تأكيد كلمة المرور مطلوب";
    } else if (userData.password !== userData.confirmPassword) {
      newErrors.confirmPassword = "كلمة المرور غير متطابقة";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  // Handle user data changes
  const handleUserDataChange = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  // Handle work location changes
  const handleWorkLocationChange = (value) => {
    // Allow direct input with commas, don't split immediately
    setFormData(prev => ({
      ...prev,
      موقع_العمل: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // Create both employee and user account
      const requestData = {
        employee: formData,
        user: {
          _id: formData.الرقم_المدني, // Link user account with civil ID
          email: userData.email,
          password: userData.password,
          role: "Employee",
          isActive: true
        }
      };

      await employeeAPI.createEmployee(requestData);
      
      // Set credentials for display
      setCreatedCredentials({
        employeeName: formData.الاسم,
        email: userData.email,
        password: userData.password
      });
      
      // Close the add modal first
      onClose();
      
      // Show success notification
      showNotification("تم إضافة الموظف بنجاح", "success");
      
      // Show credentials dialog after a short delay
      setTimeout(() => {
        setShowCredentials(true);
      }, 300);
      
      // Call success callback to refresh employee list
      onSuccess();
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      showNotification(errorMessage, "error");
      console.error("Error creating employee and user:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle modal close
  const handleClose = () => {
    setFormData({
      الاسم: "",
      الرقم_المدني: "",
      الوظيفة: "",
      منطقة_العمل: "",
      مقر_العمل: "",
      الجنس: "",
      تاريخ_الميلاد: "",
      الدرجة: "",
      تاريخ_التعيين: "",
      المجموعة_النوعية_للوظائف: "",
      تاريخ_شغل_الدرجة: "",
      تاريخ_شغل_الوظيفة: "",
      رقم_الهاتف: "",
      موقع_العمل: ""
    });
    setUserData({
      email: "",
      password: "",
      confirmPassword: ""
    });
    setErrors({});
    setShowCredentials(false);
    setCreatedCredentials(null);
    onClose();
  };

  // Handle credentials dialog close
  const handleCredentialsClose = () => {
    setShowCredentials(false);
    setCreatedCredentials(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal Content */}
          <motion.div
            className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className={`flex items-center justify-between p-6 border-b ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}>
              <h2 className={`text-2xl font-bold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}>
                إضافة موظف جديد
              </h2>
              <button
                onClick={handleClose}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? "text-gray-400 hover:text-white hover:bg-gray-700"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                    <User className="w-5 h-5" />
                    المعلومات الشخصية
                  </h3>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      الاسم *
                    </label>
                                         <Input
                       value={formData.الاسم}
                       onChange={(e) => handleInputChange('الاسم', e.target.value)}
                       className={errors.الاسم ? "border-red-500 h-12 text-base" : "h-12 text-base"}
                       placeholder="أدخل الاسم الكامل"
                     />
                    {errors.الاسم && (
                      <p className="text-red-500 text-sm mt-1">{errors.الاسم}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      الرقم المدني *
                    </label>
                                         <Input
                       value={formData.الرقم_المدني}
                       onChange={(e) => handleInputChange('الرقم_المدني', e.target.value)}
                       className={errors.الرقم_المدني ? "border-red-500 h-12 text-base" : "h-12 text-base"}
                       placeholder="أدخل الرقم المدني"
                     />
                    {errors.الرقم_المدني && (
                      <p className="text-red-500 text-sm mt-1">{errors.الرقم_المدني}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      الجنس *
                    </label>
                                         <Select
                       value={formData.الجنس}
                       onChange={(e) => handleInputChange('الجنس', e.target.value)}
                       className={errors.الجنس ? "border-red-500 h-12 text-base" : "h-12 text-base"}
                     >
                       <SelectOption value="">اختر الجنس</SelectOption>
                       <SelectOption value="ذكر">ذكر</SelectOption>
                       <SelectOption value="أنثى">أنثى</SelectOption>
                     </Select>
                    {errors.الجنس && (
                      <p className="text-red-500 text-sm mt-1">{errors.الجنس}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      تاريخ الميلاد *
                    </label>
                                         <Input
                       type="date"
                       value={formData.تاريخ_الميلاد}
                       onChange={(e) => handleInputChange('تاريخ_الميلاد', e.target.value)}
                       className={errors.تاريخ_الميلاد ? "border-red-500 h-12 text-base" : "h-12 text-base"}
                     />
                    {errors.تاريخ_الميلاد && (
                      <p className="text-red-500 text-sm mt-1">{errors.تاريخ_الميلاد}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      رقم الهاتف
                    </label>
                                         <Input
                       value={formData.رقم_الهاتف}
                       onChange={(e) => handleInputChange('رقم_الهاتف', e.target.value)}
                       className="h-12 text-base"
                       placeholder="أدخل رقم الهاتف"
                     />
                  </div>
                </div>

                {/* Employment Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                    <Building className="w-5 h-5" />
                    معلومات التوظيف
                  </h3>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      الوظيفة *
                    </label>
                                         <Input
                       value={formData.الوظيفة}
                       onChange={(e) => handleInputChange('الوظيفة', e.target.value)}
                       className={errors.الوظيفة ? "border-red-500 h-12 text-base" : "h-12 text-base"}
                       placeholder="أدخل الوظيفة"
                     />
                    {errors.الوظيفة && (
                      <p className="text-red-500 text-sm mt-1">{errors.الوظيفة}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      منطقة العمل *
                    </label>
                                         <Input
                       value={formData.منطقة_العمل}
                       onChange={(e) => handleInputChange('منطقة_العمل', e.target.value)}
                       className={errors.منطقة_العمل ? "border-red-500 h-12 text-base" : "h-12 text-base"}
                       placeholder="أدخل منطقة العمل"
                     />
                    {errors.منطقة_العمل && (
                      <p className="text-red-500 text-sm mt-1">{errors.منطقة_العمل}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      مقر العمل
                    </label>
                                         <Input
                       value={formData.مقر_العمل}
                       onChange={(e) => handleInputChange('مقر_العمل', e.target.value)}
                       className="h-12 text-base"
                       placeholder="أدخل مقر العمل"
                     />
                  </div>

                                     <div>
                     <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                       الدرجة *
                     </label>
                     <Input
                       value={formData.الدرجة}
                       onChange={(e) => handleInputChange('الدرجة', e.target.value)}
                       className={errors.الدرجة ? "border-red-500 h-12 text-base" : "h-12 text-base"}
                       placeholder="أدخل الدرجة"
                     />
                     {errors.الدرجة && (
                       <p className="text-red-500 text-sm mt-1">{errors.الدرجة}</p>
                     )}
                   </div>

                   <div>
                     <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                       المجموعة النوعية للوظائف *
                     </label>
                     <Input
                       value={formData.المجموعة_النوعية_للوظائف}
                       onChange={(e) => handleInputChange('المجموعة_النوعية_للوظائف', e.target.value)}
                       className={errors.المجموعة_النوعية_للوظائف ? "border-red-500 h-12 text-base" : "h-12 text-base"}
                       placeholder="أدخل المجموعة النوعية"
                     />
                     {errors.المجموعة_النوعية_للوظائف && (
                       <p className="text-red-500 text-sm mt-1">{errors.المجموعة_النوعية_للوظائف}</p>
                     )}
                   </div>
                </div>
              </div>

              {/* Dates Section */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2 mb-4">
                  <Calendar className="w-5 h-5" />
                  التواريخ المهمة
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      تاريخ التعيين *
                    </label>
                    <Input
                      type="date"
                      value={formData.تاريخ_التعيين}
                      onChange={(e) => handleInputChange('تاريخ_التعيين', e.target.value)}
                      className={errors.تاريخ_التعيين ? "border-red-500" : ""}
                    />
                    {errors.تاريخ_التعيين && (
                      <p className="text-red-500 text-sm mt-1">{errors.تاريخ_التعيين}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      تاريخ شغل الدرجة
                    </label>
                    <Input
                      type="date"
                      value={formData.تاريخ_شغل_الدرجة}
                      onChange={(e) => handleInputChange('تاريخ_شغل_الدرجة', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      تاريخ شغل الوظيفة
                    </label>
                    <Input
                      type="date"
                      value={formData.تاريخ_شغل_الوظيفة}
                      onChange={(e) => handleInputChange('تاريخ_شغل_الوظيفة', e.target.value)}
                    />
                  </div>
                </div>
              </div>

                             {/* Work Locations */}
               <div className="mt-6">
                 <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2 mb-4">
                   <MapPin className="w-5 h-5" />
                   مواقع العمل
                 </h3>
                 <div>
                   <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                     مواقع العمل (مفصولة بفواصل)
                   </label>
                                       <Input
                      value={formData.موقع_العمل}
                      onChange={(e) => handleWorkLocationChange(e.target.value)}
                      className="h-12 text-base"
                      placeholder="الوزير, دائرة الموارد البشرية, المديرية العامة للشؤون الادارية والمالية"
                    />
                 </div>
               </div>

               {/* User Account Information */}
               <div className="mt-6">
                 <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2 mb-4">
                   <User className="w-5 h-5" />
                   معلومات حساب المستخدم
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div>
                     <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                       البريد الإلكتروني *
                     </label>
                     <Input
                       type="email"
                       value={userData.email}
                       onChange={(e) => handleUserDataChange('email', e.target.value)}
                       className={errors.email ? "border-red-500 h-12 text-base" : "h-12 text-base"}
                       placeholder="employee@company.com"
                     />
                     {errors.email && (
                       <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                     )}
                   </div>

                   <div>
                     <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                       كلمة المرور *
                     </label>
                     <Input
                       type="password"
                       value={userData.password}
                       onChange={(e) => handleUserDataChange('password', e.target.value)}
                       className={errors.password ? "border-red-500 h-12 text-base" : "h-12 text-base"}
                       placeholder="أدخل كلمة المرور"
                     />
                     {errors.password && (
                       <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                     )}
                   </div>

                   <div>
                     <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                       تأكيد كلمة المرور *
                     </label>
                     <Input
                       type="password"
                       value={userData.confirmPassword}
                       onChange={(e) => handleUserDataChange('confirmPassword', e.target.value)}
                       className={errors.confirmPassword ? "border-red-500 h-12 text-base" : "h-12 text-base"}
                       placeholder="أعد إدخال كلمة المرور"
                     />
                     {errors.confirmPassword && (
                       <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                     )}
                   </div>
                 </div>
               </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={loading}
                >
                  إلغاء
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      جاري الإضافة...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      إضافة موظف
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Credentials Display Modal */}
      <CredentialsDisplayModal
        isOpen={showCredentials}
        onClose={handleCredentialsClose}
        credentials={createdCredentials}
      />
    </AnimatePresence>
  );
};

export default EmployeeAddModal;
