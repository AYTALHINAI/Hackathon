import Sidebar from "../components/Sidebar";
import {
  UserIcon,
  Briefcase,
  Mail,
  Phone,
  CreditCard,
  Calendar,
  MapPin,
  Users,
  Percent,
  CheckSquare,
  Clock,
  Edit,
  Save,
} from "lucide-react";
import { motion } from "framer-motion";

const Profile = () => {
  const userIdFromLocalStorage = typeof window !== 'undefined' ? localStorage.getItem("id") : null;

  const getBannerGradientClasses = () => {
    switch (userIdFromLocalStorage) {
      case "3": // Employee → blue accent like sidebar
        return "bg-gradient-to-r from-blue-200 via-blue-50 to-blue-100 dark:from-blue-900 dark:via-blue-800 dark:to-gray-900";
      case "1": // HR → orange accent like sidebar
        return "bg-gradient-to-r from-orange-200 via-orange-50 to-orange-100 dark:from-orange-900 dark:via-orange-800 dark:to-gray-900";
      case "2": // Employee → blue accent like sidebar
        return "bg-gradient-to-r from-blue-200 via-blue-50 to-blue-100 dark:from-blue-900 dark:via-blue-800 dark:to-gray-900";
      default:
        return "bg-gradient-to-r from-gray-200 via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900";
    }
  };
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900" dir="rtl">
      <Sidebar />

      <main className="flex-1 p-10">
        <motion.div 
          className="max-w-7xl mx-auto space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Page Heading */}
          <motion.h1 
            className="text-3xl font-bold text-gray-800 dark:text-white text-right"
            variants={itemVariants}
          >
            الحساب الشخصي
          </motion.h1>

          {/* Profile Banner */}
          <motion.div 
            className="relative flex flex-col items-center justify-center mb-20"
            variants={itemVariants}
          >
            <div className={`w-full h-40 ${getBannerGradientClasses()} rounded-2xl shadow-md`} />
            <motion.div 
              className="absolute -bottom-16 flex items-center justify-center w-32 h-32 rounded-full bg-white dark:bg-gray-700 shadow-xl border-4 border-white dark:border-gray-800"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <svg
                className="w-20 h-20 text-blue-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="7" r="4" />
                <path d="M5.5 21c1.5-4 6.5-4 8 0M16 21h3a2 2 0 0 0 2-2v-1c0-4-4-7-9-7s-9 3-9 7v1a2 2 0 0 0 2 2h3" />
              </svg>
            </motion.div>
          </motion.div>

          {/* Main Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10"
            variants={itemVariants}
          >
            {/* Personal Info Card */}
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 min-h-[400px]"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2 justify-center">
                <UserIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                معلومات شخصية
              </h3>
              <div className="space-y-5">
                {[
                  { id: "email", label: "البريد الإلكتروني", value: "sarah.johnson@company.com", icon: Mail },
                  { id: "phone", label: "رقم الهاتف", value: "+1 (555) 123-4567", icon: Phone },
                  { id: "employee-id", label: "الرقم الوظيفي", value: "HR-2025-001", icon: CreditCard },
                  { id: "start-date", label: "تاريخ البدء", value: "March 15, 2020", icon: Calendar },
                  { id: "location", label: "الموقع", value: "New York, NY - HQ Office", icon: MapPin },
                ].map(({ id, label, value, icon: Icon }) => (
                  <motion.div 
                    key={id} 
                    className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-100 dark:border-gray-600"
                    variants={itemVariants}
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.1 }}
                  >
                    <div className="flex flex-col text-right">
                      <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</span>
                      <span className="text-gray-800 dark:text-white text-base font-medium">{value}</span>
                    </div>
                    <Icon className="w-6 h-6 text-blue-400" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Work Overview Card */}
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 min-h-[400px]"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2 justify-center">
                <Briefcase className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                نظرة عامة على العمل
              </h3>
              <div className="space-y-5">
                {[
                  { label: "إجمالي الموظفين المدارين", value: "147 موظف", icon: Users },
                  { label: "معدل الحضور", value: "94.2%", icon: Percent },
                  { label: "التقييمات المكتملة", value: "89 / 92", icon: CheckSquare },
                  { label: "الطلبات الجارية", value: "12 معلقة", icon: Clock },
                ].map(({ label, value, icon: Icon }, idx) => (
                  <motion.div 
                    key={idx} 
                    className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-100 dark:border-gray-600"
                    variants={itemVariants}
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.1 }}
                  >
                    <div className="flex flex-col text-right">
                      <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</span>
                      <span className="text-gray-800 dark:text-white text-base font-medium">{value}</span>
                    </div>
                    <Icon className="w-6 h-6 text-blue-400" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div 
            className="flex flex-col items-center pt-10"
            variants={itemVariants}
          >
            <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-4">إجراءات سريعة</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-base font-medium shadow-sm">
                <Edit className="w-5 h-5" />
                تعديل الملف الشخصي
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-base font-medium shadow-md">
                <Save className="w-5 h-5" />
                حفظ
              </button>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default Profile;
