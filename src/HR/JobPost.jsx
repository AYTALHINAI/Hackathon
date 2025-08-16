import { FileImage, LayoutList } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const JobPostPage = () => {
  const navigate = useNavigate();

  const jobPostFeatures = [
    {
      id: 1,
      title: "جميع الإعلانات",
      description: "عرض وإدارة جميع إعلانات الوظائف المنشورة",
      icon: LayoutList,
      route: "/alljobpost",
      badge: "متاح",
      badgeColor: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    },
    {
      id: 2,
      title: "إضافة إعلان جديد",
      description: "إنشاء إعلان وظيفة جديد عبر المرفقات أو الاستمارة",
      icon: FileImage,
      route: "/Attachment",
      badge: "جديد",
      badgeColor: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    },
    {
      id: 3,
      title: "استمارة إعلان",
      description: "إنشاء إعلان وظيفة جديد باستخدام النموذج التفاعلي",
      icon: LayoutList,
      route: "/jobpostform",
      badge: "نشط",
      badgeColor: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    }
  ];

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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
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
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              الوظائف الداخلية
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              إدارة شاملة لإعلانات الوظائف والفرص الوظيفية
            </p>
          </motion.div>

          {/* Cards Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {jobPostFeatures.map((feature) => (
              <motion.div
                key={feature.id}
                className="group relative"
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 h-full transition-all duration-300 hover:shadow-xl hover:border-orange-300 dark:hover:border-orange-600">
                  <div className="flex items-start mb-6">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 group-hover:from-orange-100 dark:group-hover:from-orange-800/40 group-hover:to-amber-200 dark:group-hover:to-amber-800/40 transition-all duration-300">
                      <feature.icon className="w-10 h-10 text-orange-600 dark:text-orange-400" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8">
                    {feature.description}
                  </p>

                  <button
                    onClick={() => navigate(feature.route)}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                  >
                    الوصول للخدمة
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default JobPostPage;
