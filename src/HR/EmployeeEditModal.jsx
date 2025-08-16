import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, User, Building, MapPin, Calendar, Phone } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectOption } from "../components/ui/select";
import { employeeAPI, getErrorMessage, showNotification } from "../lib/api";
import { formatDateForInput } from "../lib/dateUtils";

const EmployeeEditModal = ({ employee, isOpen, onClose, onSuccess }) => {
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

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Initialize form data when employee changes
  useEffect(() => {
    console.log('🔍 EmployeeEditModal received employee:', employee);
    if (employee) {
      console.log('🔍 Employee data fields:', Object.keys(employee));
      console.log('🔍 Employee name:', employee.الاسم);
      console.log('🔍 Employee position:', employee.الوظيفة);
      console.log('🔍 Employee grade:', employee.الدرجة);
      
      setFormData({
        الاسم: employee.الاسم || employee.name || "",
        الرقم_المدني: employee.الرقم_المدني || employee.civilId || "",
        الوظيفة: employee.الوظيفة || employee.position || "",
        منطقة_العمل: employee.منطقة_العمل || employee.department || "",
        مقر_العمل: employee.مقر_العمل || employee.workLocation || "",
        الجنس: employee.الجنس || employee.gender || "",
        تاريخ_الميلاد: formatDateForInput(employee.تاريخ_الميلاد || employee.birthDate) || "",
        الدرجة: employee.الدرجة || employee.grade || "",
        تاريخ_التعيين: formatDateForInput(employee.تاريخ_التعيين || employee.hireDate) || "",
        المجموعة_النوعية_للوظائف: employee.المجموعة_النوعية_للوظائف || employee.jobGroup || "",
        تاريخ_شغل_الدرجة: formatDateForInput(employee.تاريخ_شغل_الدرجة || employee.gradeDate) || "",
        تاريخ_شغل_الوظيفة: formatDateForInput(employee.تاريخ_شغل_الوظيفة || employee.jobDate) || "",
        رقم_الهاتف: employee.رقم_الهاتف || employee.contactNumber || "",
        موقع_العمل: employee.موقع_العمل || employee.workLocations || ""
      });
      console.log('🔍 Form data set to:', formData);
      setErrors({});
    }
  }, [employee]);

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const civilId = employee.الرقم_المدني || employee.civilId;
      await employeeAPI.updateEmployee(civilId, formData);
      showNotification("تم تحديث بيانات الموظف بنجاح", "success");
      onSuccess();
      onClose();
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      showNotification(errorMessage, "error");
      console.error("Error updating employee:", err);
    } finally {
      setLoading(false);
    }
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

  // Handle work locations
  const handleWorkLocationChange = (value) => {
    // Allow direct input with commas, don't split immediately
    handleInputChange('موقع_العمل', value);
  };

  if (!isOpen || !employee) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className={`${isDarkMode ? "bg-gray-800" : "bg-white"} rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto`}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              تعديل بيانات الموظف
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
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
                    className={errors.تاريخ_التعيين ? "border-red-500 h-12 text-base" : "h-12 text-base"}
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
                    className="h-12 text-base"
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
                    className="h-12 text-base"
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
                   placeholder="الرياض, جدة, الدمام"
                 />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
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
                    جاري الحفظ...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    حفظ التغييرات
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EmployeeEditModal;
