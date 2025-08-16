"use client";

import {
  Calendar,
  Share2,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Eye,
  Users,
} from "lucide-react";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const jobPosts = [
  {
    id: 1,
    title: "أخصائي تسويق رقمي",
    location: "الرياض",
    department: "قسم التسويق",
    deadline: "2025/08/30",
    image: "/placeholder.svg?height=500&width=800",
  },
  {
    id: 2,
    title: "محلل نظم معلومات",
    location: "جدة",
    department: "قسم تقنية المعلومات",
    deadline: "2025/09/05",
    image: "/placeholder.svg?height=500&width=800",
  },
  {
    id: 3,
    title: "أخصائي موارد بشرية",
    location: "الدمام",
    department: "قسم الموارد البشرية",
    deadline: "2025/09/15",
    image: "/placeholder.svg?height=500&width=800",
  },
];

const AllJobPost = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900" dir="rtl">
      <Sidebar />

      <main className="flex-1 p-10 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
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
              جميع الإعلانات الوظيفية الداخلية
            </motion.h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 text-right">تصفح الإعلانات المتاحة داخل المؤسسة واطلع على تفاصيل الوظائف المفتوحة.</p>
          </motion.div>

          <div className="space-y-8">
            {jobPosts.map((job, index) => (
              <motion.div
                key={job.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-150 hover:shadow-xl hover:bg-gray-50 dark:hover:bg-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
              {/* Image with navigation arrows */}
              <div className="relative">
                <img
                  src={job.image || "/placeholder.svg"}
                  alt={job.title}
                  className="w-full h-64 object-cover"
                />
                <button className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Job Info Section */}
              <div className="p-6 space-y-3 text-right">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {job.title}
                </h2>

                <div className="text-sm text-gray-600 dark:text-gray-400 flex flex-wrap gap-4">
                  <span>📍 {job.location}</span>
                  <span>🏢 {job.department}</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    الموعد النهائي: {job.deadline}
                  </span>
                </div>

                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  هذا الإعلان يخص التوظيف الداخلي فقط. إذا كنت ترى أنك مؤهل لهذا
                  الدور، يرجى التقديم قبل الموعد النهائي.
                </p>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
                  <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                    <button className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition">
                      <Bookmark className="w-4 h-4" />
                      حفظ
                    </button>
                    <button className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition">
                      <Share2 className="w-4 h-4" />
                      مشاركة
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => navigate("/job-applicants")}
                      className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 transition"
                    >
                      <Users className="w-4 h-4" />
                      عرض المتقدمين
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 dark:bg-blue-600 dark:hover:bg-blue-700 transition">
                      <Eye className="w-4 h-4" />
                      عرض التفاصيل
                    </button>
                  </div>
                </div>
              </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AllJobPost;
