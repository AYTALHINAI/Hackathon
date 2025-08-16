import { ArrowRight, Eye } from "lucide-react";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

const JobTracking = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const jobAnnouncements = [
    {
      id: 1,
      title: "الإعلان الأول - ترشيح مدير (قسم الموارد البشرية):",
      description: "يعلن قسم الموارد البشرية عن حاجته لترشيح مدير لديه الخبرة والكفاءة لتولي مهام الإدارة.",
      progress: 10,
      progressColor: "bg-gray-400",
      stage: "تم اختياره"
    },
    {
      id: 2,
      title: "الإعلان الثاني - فتح باب التقديم لوظيفة مهندس شبكات (قسم تقنية المعلومات):",
      description: "يدعو قسم تقنية المعلومات المتخصصين للتقديم على وظيفة مهندس شبكات وفقًا للشروط والمؤهلات المطلوبة.",
      progress: 75,
      progressColor: "bg-green-500",
      stage: "المقابلات"
    },
    {
      id: 3,
      title: "الإعلان الثالث - وظيفة أخصائي تسويق (قسم التسويق):",
      description: "يعلن قسم التسويق عن توفر وظيفة أخصائي تسويق لمن لديه الخبرة والرغبة في الانضمام للفريق.",
      progress: 50,
      progressColor: "bg-blue-500",
      stage: "المقابلات"
    }
  ];

  const stages = ["تم اختياره", "المقابلات", "عرض المرشحين"];

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
            <div className="flex items-center mb-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                <ArrowRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-200 mr-4">
                تتبع الإعلان الوظيفي
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              "تتبع حالة الإعلان الوظيفي" هي خدمة تتيح للمستخدم متابعة مراحل الإعلان منذ تقديمه وحتى نشره، بما في ذلك حالة المراجعة والموافقة أو الرفض، مما يوفر شفافية وسهولة في إدارة الإعلانات.
            </p>
          </motion.div>

          {/* Job Announcement Cards */}
          <motion.div 
            className="space-y-6"
            variants={containerVariants}
          >
            {jobAnnouncements.map((announcement, index) => (
              <motion.div
                key={announcement.id}
                className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-xl`}
                variants={cardVariants}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                      {announcement.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      announcement.progressColor === 'bg-green-500' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      announcement.progressColor === 'bg-blue-500' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                    }`}>
                      {announcement.stage}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {announcement.description}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${announcement.progressColor}`}
                      style={{ width: `${announcement.progress}%` }}
                    ></div>
                  </div>
                  
                  {/* Stage Labels */}
                  <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                    {stages.map((stage, stageIndex) => {
                      const isCompleted = announcement.progress > (stageIndex * 33.33);
                      const isCurrent = announcement.progress > (stageIndex * 33.33) && announcement.progress <= ((stageIndex + 1) * 33.33);
                      
                      return (
                        <div key={stageIndex} className="text-center">
                          <div className={`w-3 h-3 rounded-full mx-auto mb-1 transition-all duration-300 ${
                            isCompleted ? announcement.progressColor : 
                            isCurrent ? announcement.progressColor : 'bg-gray-300 dark:bg-gray-600'
                          }`}></div>
                          <span className={`block transition-colors duration-300 ${
                            isCompleted || isCurrent ? 'text-gray-700 dark:text-gray-200 font-medium' : ''
                          }`}>{stage}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Preview Button */}
                <div className="flex justify-end">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    معاينة
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

export default JobTracking;
