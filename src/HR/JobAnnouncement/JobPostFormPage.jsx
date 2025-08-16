import {
  ChevronLeft,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Calendar,
  Send,
  Eye,
  Save,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../../components/Sidebar";
import { motion } from "framer-motion";

const JobPostFormPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("تم نشر الإعلان بنجاح");
    navigate("/jobpost");
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900" dir="rtl">
      <Sidebar />
      <main className="flex-1 p-10 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div 
            className="flex mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.button
              onClick={() => navigate("/jobpost")}
              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowRight className="w-4 h-4" />
              العودة إلى الإعلانات
            </motion.button>
          </motion.div>
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <motion.h1 
              className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2 text-right"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              عن طريق الاستماره
            </motion.h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg text-right">إنشاء ونشر إعلان وظيفي داخلي مع تفاصيل دقيقة للمسمى والمتطلبات.</p>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Title & Description */}
            <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                إضافة إعلان وظيفي داخلي
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                قم بملء النموذج أدناه لإنشاء إعلان وظيفي جديد للموظفين الداخليين
              </p>
            </div>

            {/* Job Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Job Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  المسمى الوظيفي
                </label>
                <input
                  type="text"
                  placeholder="أدخل المسمى الوظيفي"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-right
                             bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200
                             placeholder-gray-400 dark:placeholder-gray-500
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none
                             transition-all duration-200"
                />
              </div>
              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  القسم
                </label>
                <div className="relative">
                  <select
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-right
                               bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200
                               focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none
                               appearance-none pr-10 cursor-pointer transition-all duration-200"
                  >
                    <option>اختر القسم</option>
                    <option>الموارد البشرية</option>
                    <option>التسويق</option>
                    <option>المبيعات</option>
                  </select>
                  <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  الموقع
                </label>
                <div className="relative">
                  <select
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-right
                               bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200
                               focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none
                               appearance-none pr-10 cursor-pointer transition-all duration-200"
                  >
                    <option>اختر الموقع</option>
                    <option>الرياض</option>
                    <option>جدة</option>
                    <option>الدمام</option>
                  </select>
                  <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Job Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  نوع الوظيفة
                </label>
                <div className="relative">
                  <select
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-right
                               bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200
                               focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none
                               appearance-none pr-10 cursor-pointer transition-all duration-200"
                  >
                    <option>اختر نوع الوظيفة</option>
                    <option>دوام كامل</option>
                    <option>دوام جزئي</option>
                    <option>عقد</option>
                  </select>
                  <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                وصف الوظيفة
              </label>
              <div
                className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden
                              focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500
                              transition-all duration-200 bg-white dark:bg-gray-700"
              >
                <div className="flex gap-2 border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 p-2">
                  {[Bold, Italic, Underline, List, ListOrdered].map(
                    (Icon, i) => (
                      <button
                        key={i}
                        type="button"
                        className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors duration-200"
                      >
                        <Icon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                      </button>
                    )
                  )}
                </div>
                <textarea
                  rows="8"
                  placeholder="اكتب وصفًا مفصلاً للوظيفة والمسؤوليات المطلوبة..."
                  className="w-full p-4 text-right text-gray-800 dark:text-gray-200 resize-y
                             focus:outline-none placeholder-gray-400 dark:placeholder-gray-500
                             bg-white dark:bg-gray-700"
                ></textarea>
              </div>
            </div>

            {/* Requirements & Qualifications */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                المتطلبات والمؤهلات
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Language Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    اللغة المطلوبة
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "العربية",
                      "الإنجليزية",
                      "الفرنسية",
                      "الأوردو",
                      "الهندية",
                      "الفلبينية",
                    ].map((lang, idx) => (
                      <label
                        key={idx}
                        className="flex items-center gap-2 text-sm text-gray-800 dark:text-gray-200 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          value={lang}
                          className="form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-blue-500 transition-colors duration-200"
                        />
                        {lang}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    الخبرة المطلوبة
                  </label>
                  <div className="relative">
                    <select
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-right
                                 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200
                                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none
                                 appearance-none pr-10 cursor-pointer transition-all duration-200"
                    >
                      <option>اختر عدد سنوات الخبرة</option>
                      <option>1 - 2 سنوات</option>
                      <option>3 - 5 سنوات</option>
                      <option>6 - 10 سنوات</option>
                      <option>أكثر من 10 سنوات</option>
                      <option>بدون خبرة (خريج جديد)</option>
                    </select>
                    <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    المؤهل العلمي
                  </label>
                  <div className="relative">
                    <select
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-right
                                 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200
                                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none
                                 appearance-none pr-10 cursor-pointer transition-all duration-200"
                    >
                      <option>اختر المؤهل</option>
                      <option>الثانوية العامة</option>
                      <option>دبلوم</option>
                      <option>بكالوريوس</option>
                      <option>ماجستير</option>
                      <option>دكتوراه</option>
                      <option>شهادة مهنية</option>
                    </select>
                    <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <textarea
                rows="3"
                placeholder="...أضف متطلبات إضافية"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-right resize-y
                           focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200
                           placeholder-gray-400 dark:placeholder-gray-500
                           bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              ></textarea>
            </div>

            {/* Deadline & Manager */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Deadline */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  آخر موعد للتقديم
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="dd/mm/yyyy"
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-right
                               bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200
                               placeholder-gray-400 dark:placeholder-gray-500
                               focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none
                               transition-all duration-200"
                  />
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" />
                </div>
              </div>

              {/* Hiring Manager */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  مدير التوظيف
                </label>
                <div className="relative">
                  <select
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-right
                               bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200
                               focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none
                               appearance-none pr-10 cursor-pointer transition-all duration-200"
                  >
                    <option>اختر مدير التوظيف</option>
                    <option>مدير 1</option>
                    <option>مدير 2</option>
                  </select>
                  <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Visibility */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                مستوى الرؤية
              </h3>
              <div className="flex flex-col md:flex-row gap-4">
                <label className="flex items-center gap-2 text-sm text-gray-800 dark:text-gray-200 cursor-pointer">
                  <input
                    type="radio"
                    name="visibility"
                    value="all-employees"
                    defaultChecked
                    className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500 transition-colors duration-200"
                  />
                  داخلي فقط - جميع الموظفين
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-800 dark:text-gray-200 cursor-pointer">
                  <input
                    type="radio"
                    name="visibility"
                    value="department-only"
                    className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500 transition-colors duration-200"
                  />
                  القسم فقط
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700
                           text-gray-700 dark:text-gray-200 rounded-lg border border-gray-200 dark:border-gray-600
                           hover:bg-gray-200 dark:hover:bg-gray-600 active:bg-gray-300 dark:active:bg-gray-700
                           transition-colors duration-200 text-base font-medium shadow-sm"
              >
                <Eye className="w-5 h-5" />
                معاينة
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700
                           text-gray-700 dark:text-gray-200 rounded-lg border border-gray-200 dark:border-gray-600
                           hover:bg-gray-200 dark:hover:bg-gray-600 active:bg-gray-300 dark:active:bg-gray-700
                           transition-colors duration-200 text-base font-medium shadow-sm"
              >
                إلغاء
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700
                           text-gray-700 dark:text-gray-200 rounded-lg border border-gray-200 dark:border-gray-600
                           hover:bg-gray-200 dark:hover:bg-gray-600 active:bg-gray-300 dark:active:bg-gray-700
                           transition-colors duration-200 text-base font-medium shadow-sm"
              >
                <Save className="w-5 h-5" />
                حفظ كمسودة
              </button>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700
                           text-gray-700 dark:text-gray-200 rounded-lg border border-gray-200 dark:border-gray-600
                           hover:bg-gray-200 dark:hover:bg-gray-600 active:bg-gray-300 dark:active:bg-gray-700
                           transition-colors duration-200 text-base font-medium shadow-sm"
              >
                <Send className="w-5 h-5" />
                نشر الإعلان
              </button>
            </div>
          </motion.form>
        </div>
      </main>
    </div>
  );
};

export default JobPostFormPage;
