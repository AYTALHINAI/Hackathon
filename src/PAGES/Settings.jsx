import React from "react";
import Sidebar from "../components/Sidebar";
import { useTheme } from "../context/ThemeContext";
import { useSettings } from "../context/SettingsContext";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { language } = useSettings();

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
    <div
      className="flex min-h-screen bg-[#f6f5fa] dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <Sidebar />
      <main className="flex-1 p-10">
        <motion.div 
          className="max-w-7xl mx-auto space-y-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Page Title */}
          <motion.h1 
            className="text-3xl font-bold"
            variants={itemVariants}
          >
            الإعدادات
          </motion.h1>

          {/* Theme Toggle Section */}
          <motion.div 
            className="grid grid-cols-1 gap-6"
            variants={itemVariants}
          >
            {/* Dark Mode Toggle */}
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
              variants={itemVariants}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    الوضع الليلي
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                                          قم بالتبديل بين الوضع الليلي والوضع العادي
                  </p>
                </div>

                {/* Theme Toggle Button */}
                <motion.button
                  onClick={toggleTheme}
                  className={`p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 ${
                    theme === 'dark'
                      ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400'
                      : 'bg-white hover:bg-gray-50 text-gray-600 border border-gray-200'
                  }`}
                  aria-label={theme === 'dark' ? 'التبديل إلى الوضع الفاتح' : 'التبديل إلى الوضع الداكن'}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {theme === 'dark' ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </motion.button>
              </div>
            </motion.div>


          </motion.div>

          {/* Additional Settings Section */}
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
            variants={itemVariants}
          >
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              إعدادات إضافية
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-300">
                              سيتم إضافة المزيد من الإعدادات هنا في المستقبل.
            </p>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default Settings;
