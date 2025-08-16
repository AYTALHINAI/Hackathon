import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Heart, Users, BookOpen, Clock } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useTheme } from '../context/ThemeContext';

const Care = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900" dir="rtl">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-10">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <div className="flex mb-4">
            <button
              onClick={() => navigate("/employee")}
              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
            >
              <ArrowRight className="w-4 h-4" />
              العودة إلى لوحة الموظف
            </button>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-3">
              <Heart className="w-8 h-8 text-red-500" />
              رعاية الموظفين
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              منصة شاملة لرعاية وتطوير الموظفين
            </p>
          </div>

          {/* Care Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Development Center */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                  مركز التنمية
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                تطوير المهارات والحصول على الدورات التدريبية
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/emp-avail-courses')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200"
                >
                  الدورات المتاحة
                </button>
                <button
                  onClick={() => navigate('/emp-course-history')}
                  className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg font-medium transition-colors duration-200"
                >
                  سجل الدورات
                </button>
              </div>
            </div>

            {/* Performance Management */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                  إدارة الأداء
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                متابعة الأداء والتقييمات الدورية
              </p>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200">
                عرض التقييمات
              </button>
            </div>

            {/* Support Services */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Heart className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                  خدمات الدعم
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                الدعم النفسي والاجتماعي للموظفين
              </p>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200">
                طلب المساعدة
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Care;
