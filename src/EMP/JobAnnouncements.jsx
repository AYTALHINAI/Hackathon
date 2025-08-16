import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  Calendar,
  MapPin,
  Users,
  ArrowRight,
  Search,
  Filter,
  Eye,
  FileText,
  ArrowLeft,
  Download,
  Save,
  CheckCircle,
} from "lucide-react";
import { showNotification } from "../lib/api";

const JobAnnouncements = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  // Mock data for job announcements
  const jobAnnouncements = [
    {
      id: 1,
      title: "مدير قسم تقنية المعلومات",
      company: "وزارة الثقافة",
      location: "المقر الرئيسي",
      postedTime: "منذ 5 دقائق",
      description: "نبحث عن مدير قسم تقنية المعلومات ذو خبرة في إدارة المشاريع التقنية وتطوير الأنظمة الإلكترونية للمؤسسة التعليمية...",
      category: "تقنية المعلومات",
      workType: "دوام كامل",
      status: "نشط"
    },
    {
      id: 2,
      title: "محلل مالي",
      company: "وزارة الثقافة",
      location: "فرع الرياض",
      postedTime: "منذ 7 دقائق",

      description: "نحتاج إلى محلل مالي لتحليل البيانات المالية وإعداد التقارير المالية الشهرية والسنوية للمؤسسة...",
      category: "المالية",
      workType: "دوام كامل",
      status: "نشط"
    },
    {
      id: 3,
      title: "مصمم جرافيك",
      company: "وزارة الثقافة",
      location: "المقر الرئيسي",
      postedTime: "منذ 10 دقائق",

      description: "نبحث عن مصمم جرافيك مبدع لتصميم المواد التسويقية والمنشورات التعليمية والمواد البصرية للمؤسسة...",
      category: "التسويق",
      workType: "دوام جزئي",
      status: "نشط"
    }
  ];



  const filteredJobs = jobAnnouncements.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handlePreview = (job) => {
    // Simulate PDF download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `job-${job.id}-${job.title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification("تم تحميل ملف PDF بنجاح", "success");
  };

  const handleApply = (job) => {
    setSelectedJob(job);
    setShowApplicationForm(true);
  };

  const handleSubmitApplication = () => {
    setShowApplicationForm(false);
    setSelectedJob(null);
    showNotification("تم إرسال طلب التقديم بنجاح", "success");
  };

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

      <main className="flex-1 p-6 lg:p-10">
        <motion.div 
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div 
            className="mb-8"
            variants={itemVariants}
          >
            <div className="flex items-center gap-4 mb-4">
              <button 
                onClick={() => navigate("/employee")}
                className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-200">
                إعلانات الوظائف الداخلية
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg mr-12">
              تصفح الوظائف المتاحة والتقديم عليها
            </p>
          </motion.div>

          {/* Search Section */}
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 mb-8"
            variants={itemVariants}
          >
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search for jobs */}
              <div className="flex-1 relative">
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="البحث في الوظائف..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-12 pl-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 text-base"
                />
              </div>
            </div>
          </motion.div>

          {/* Job Cards Grid */}
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-2xl transition-all duration-300"
              >
                {/* Job Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    {/* Company Logo */}
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    
                    {/* Job Info */}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-1">
                        <span className="font-medium">{job.company}</span>
                        <span className="text-gray-400">•</span>
                        <span>{job.postedTime}</span>
                        <span className="text-gray-400">•</span>
                        <span className="font-medium">{job.salary}</span>
                      </div>
                    </div>
                  </div>

                  {/* Category Badges */}
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-lg font-medium">
                      {job.category}
                    </span>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-lg font-medium">
                      {job.workType}
                    </span>
                  </div>
                </div>

                {/* Job Description */}
                <div className="mb-6">
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {job.description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3">
                  <button 
                    onClick={() => handlePreview(job)}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 text-sm font-medium"
                  >
                    <Download className="w-4 h-4" />
                    معاينة
                  </button>
                  <button 
                    onClick={() => handleApply(job)}
                    className="flex items-center gap-2 px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200 text-sm font-medium"
                  >
                    <FileText className="w-4 h-4" />
                    التقديم الآن
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredJobs.length === 0 && (
            <motion.div 
              className="text-center py-12"
              variants={itemVariants}
            >
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <Briefcase className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                لا توجد وظائف متاحة
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                لا توجد وظائف تطابق معايير البحث المحددة
              </p>
            </motion.div>
          )}
        </motion.div>
      </main>

      {/* Application Form Modal */}
      {showApplicationForm && selectedJob && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  استمارة طلب التقدم لوظيفة شاغرة للإعلان الداخلي
                </h2>
                <button
                  onClick={() => setShowApplicationForm(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Applicant Employee Data Section */}
              <div className="mb-8">
                <div className="bg-orange-100 dark:bg-orange-900/20 p-4 rounded-lg mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    بيانات الموظف مقدم الطلب
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-400">الاسم</span>
                      <input type="text" className="text-right bg-transparent border-none outline-none flex-1" placeholder="أحمد محمد علي" />
                    </div>
                    <div className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-400">الوظيفة الحالية</span>
                      <input type="text" className="text-right bg-transparent border-none outline-none flex-1" placeholder="محلل مالي" />
                    </div>
                    <div className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-400">الدائرة</span>
                      <input type="text" className="text-right bg-transparent border-none outline-none flex-1" placeholder="دائرة الشؤون المالية" />
                    </div>
                    <div className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-400">المديرية</span>
                      <input type="text" className="text-right bg-transparent border-none outline-none flex-1" placeholder="المديرية العامة للشؤون الإدارية والمالية" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-400">الدرجة المالية الحالية</span>
                      <input type="text" className="text-right bg-transparent border-none outline-none flex-1" placeholder="الدرجة 5" />
                    </div>
                    <div className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-400">تاريخ التعيين</span>
                      <input type="date" className="text-right bg-transparent border-none outline-none flex-1" />
                    </div>
                    <div className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-400">المؤهل الدراسي الأخير</span>
                      <input type="text" className="text-right bg-transparent border-none outline-none flex-1" placeholder="بكالوريوس في إدارة الأعمال" />
                    </div>
                    <div className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-400">المعتمد</span>
                      <input type="text" className="text-right bg-transparent border-none outline-none flex-1" placeholder="وزارة التربية والتعليم" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Data Section */}
              <div className="mb-8">
                <div className="bg-orange-100 dark:bg-orange-900/20 p-4 rounded-lg mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    بيانات الوظيفة المتقدم لها من الإعلان
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <span className="text-gray-600 dark:text-gray-400">المسمى الوظيفي</span>
                    <span className="font-medium">{selectedJob.title}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <span className="text-gray-600 dark:text-gray-400">الشاغر</span>
                    <span className="font-medium">وظيفة شاغرة</span>
                  </div>
                  <div className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <span className="text-gray-600 dark:text-gray-400">موقع الوظيفة</span>
                    <span className="font-medium">{selectedJob.location}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <span className="text-gray-600 dark:text-gray-400">الدرجة المالية</span>
                    <span className="font-medium">{selectedJob.salary}</span>
                  </div>
                </div>
              </div>

              {/* Attachments Section */}
              <div className="mb-8">
                <div className="bg-orange-100 dark:bg-orange-900/20 p-4 rounded-lg mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    المرفقات
                  </h3>
                </div>
                
                <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Insert the CV and so on
                  </p>
                  <div className="mt-4">
                    <input type="file" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowApplicationForm(false)}
                  className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  إلغاء
                </button>
                <button
                  onClick={handleSubmitApplication}
                  className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  إرسال الطلب
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default JobAnnouncements;
