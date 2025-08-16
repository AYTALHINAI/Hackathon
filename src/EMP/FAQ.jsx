import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  HelpCircle,
} from "lucide-react";

const FAQ = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedItems, setExpandedItems] = useState(new Set());

  const faqData = [
    // الاجازات و المهمات
    {
      id: 1,
      category: "الاجازات و المهمات",
      question: "كيف يمكنني التقدم بطلب إجازة؟",
      answer: "يمكنك التقدم بطلب إجازة من خلال نظام إدارة الموارد البشرية، حيث يجب عليك ملء النموذج المطلوب وتحديد نوع الإجازة والفترة المطلوبة."
    },
    {
      id: 2,
      category: "الاجازات و المهمات",
      question: "ما هي أنواع الإجازات المتاحة؟",
      answer: "الإجازات المتاحة تشمل: الإجازة السنوية، الإجازة المرضية، إجازة الحج، إجازة العمرة، إجازة الولادة، والإجازة بدون راتب."
    },
    {
      id: 3,
      category: "الاجازات و المهمات",
      question: "كيف يمكنني التقدم بطلب مهمة رسمية؟",
      answer: "يمكن التقدم بطلب مهمة رسمية من خلال تقديم طلب خطي مع تحديد الغرض من المهمة والمدة المطلوبة والجهة المستهدفة."
    },
    {
      id: 4,
      category: "الاجازات و المهمات",
      question: "ما هي المدة القصوى للإجازة السنوية؟",
      answer: "المدة القصوى للإجازة السنوية هي 30 يوم عمل، ويمكن تجميعها لمدة تصل إلى سنتين."
    },

    // التنظيم و تنصيف الوظائف
    {
      id: 5,
      category: "التنظيم و تنصيف الوظائف",
      question: "كيف يتم تقييم الأداء الوظيفي؟",
      answer: "يتم تقييم الأداء الوظيفي سنوياً من خلال معايير محددة تشمل جودة العمل، الإنتاجية، الالتزام بالمواعيد، والمهارات القيادية."
    },
    {
      id: 6,
      category: "التنظيم و تنصيف الوظائف",
      question: "ما هي معايير الترقية الوظيفية؟",
      answer: "معايير الترقية تشمل الأداء المتميز، الخبرة العملية، المؤهلات العلمية، والالتزام بالأنظمة والقوانين."
    },
    {
      id: 7,
      category: "التنظيم و تنصيف الوظائف",
      question: "كيف يمكنني معرفة المسار الوظيفي الخاص بي؟",
      answer: "يمكنك معرفة المسار الوظيفي من خلال التواصل مع قسم الموارد البشرية أو من خلال النظام الإلكتروني للموظفين."
    },
    {
      id: 8,
      category: "التنظيم و تنصيف الوظائف",
      question: "ما هي أنواع العقود الوظيفية؟",
      answer: "أنواع العقود تشمل: العقد الدائم، العقد المؤقت، العقد الموسمي، والعقد بدوام جزئي."
    },

    // شؤون الموظفين
    {
      id: 9,
      category: "شؤون الموظفين",
      question: "كيف يمكنني تحديث بياناتي الشخصية؟",
      answer: "يمكنك تحديث بياناتك الشخصية من خلال النظام الإلكتروني للموظفين أو التواصل مع قسم الموارد البشرية."
    },
    {
      id: 10,
      category: "شؤون الموظفين",
      question: "ما هي الخدمات المتاحة للموظفين؟",
      answer: "الخدمات المتاحة تشمل: طلب المستندات، إدارة الإجازات، تحديث البيانات الشخصية، والاستفسارات العامة."
    },
    {
      id: 11,
      category: "شؤون الموظفين",
      question: "كيف يمكنني التواصل مع الموارد البشرية؟",
      answer: "يمكنك التواصل مع الموارد البشرية من خلال البريد الإلكتروني، الهاتف، أو زيارة المكتب مباشرة خلال ساعات العمل الرسمية."
    },
    {
      id: 12,
      category: "شؤون الموظفين",
      question: "ما هي حقوق وواجبات الموظف؟",
      answer: "حقوق الموظف تشمل: الراتب العادل، بيئة عمل آمنة، الإجازات المقررة. واجبات الموظف تشمل: الالتزام بمواعيد العمل، الحفاظ على سرية المعلومات، والالتزام بالأنظمة."
    }
  ];

  const categories = [
    { id: "all", name: "جميع الأسئلة" },
    { id: "الاجازات و المهمات", name: "الاجازات و المهمات" },
    { id: "التنظيم و تنصيف الوظائف", name: "التنظيم و تنصيف الوظائف" },
    { id: "شؤون الموظفين", name: "شؤون الموظفين" }
  ];

  const filteredFAQ = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpanded = (id) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
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
             <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2">
               الأسئلة الشائعة
             </h1>
             <p className="text-gray-600 dark:text-gray-400 text-lg">
               ابحث عن إجابات للأسئلة الشائعة المتعلقة بشؤون الموظفين
             </p>
           </motion.div>

          {/* Search and Filter Section */}
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 mb-8"
            variants={itemVariants}
          >
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="البحث في الأسئلة الشائعة..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none pr-10 pl-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[200px]"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>

          {/* FAQ Items */}
          <motion.div 
            className="space-y-4"
            variants={itemVariants}
          >
            {filteredFAQ.map((item) => (
              <motion.div
                key={item.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  onClick={() => toggleExpanded(item.id)}
                  className="w-full p-6 text-right flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    <div className="text-right">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                        {item.question}
                      </h3>
                      <span className="text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-lg">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  {expandedItems.has(item.id) ? (
                    <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                
                {expandedItems.has(item.id) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6 border-t border-gray-200 dark:border-gray-700"
                  >
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredFAQ.length === 0 && (
            <motion.div 
              className="text-center py-12"
              variants={itemVariants}
            >
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <HelpCircle className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                لا توجد نتائج
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                لا توجد أسئلة تطابق معايير البحث المحددة
              </p>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default FAQ;
