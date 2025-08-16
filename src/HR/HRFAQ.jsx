import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Plus,
  X,
  Save,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectOption } from "../components/ui/select";

const HRFAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newFAQ, setNewFAQ] = useState({
    question: "",
    answer: "",
    category: ""
  });

  const faqData = [
    // إدارة الموظفين
    {
      id: 1,
      category: "إدارة الموظفين",
      question: "كيف يمكنني إضافة موظف جديد إلى النظام؟",
      answer: "يمكنك إضافة موظف جديد من خلال صفحة قاعدة البيانات، حيث يجب ملء جميع البيانات المطلوبة مثل الاسم، الرقم المدني، الوظيفة، والدرجة المالية."
    },
    {
      id: 2,
      category: "إدارة الموظفين",
      question: "ما هي الخطوات المطلوبة لتعديل بيانات موظف؟",
      answer: "لتعديل بيانات موظف، اذهب إلى قاعدة البيانات، ابحث عن الموظف، ثم اضغط على زر التعديل وقم بتحديث البيانات المطلوبة."
    },
    {
      id: 3,
      category: "إدارة الموظفين",
      question: "كيف يمكنني حذف موظف من النظام؟",
      answer: "يمكن حذف موظف من خلال البحث عنه في قاعدة البيانات، ثم الضغط على زر الحذف وتأكيد العملية."
    },

    // إعلانات الوظائف
    {
      id: 4,
      category: "إعلانات الوظائف",
      question: "كيف يمكنني إنشاء إعلان وظيفي جديد؟",
      answer: "يمكن إنشاء إعلان وظيفي جديد من خلال صفحة إعلان الوظيفة، حيث يجب تحديد الوظيفة المطلوبة، المؤهلات، والمواصفات المطلوبة."
    },
    {
      id: 5,
      category: "إعلانات الوظائف",
      question: "ما هي المعلومات المطلوبة في الإعلان الوظيفي؟",
      answer: "المعلومات المطلوبة تشمل: عنوان الوظيفة، الوصف الوظيفي، المؤهلات المطلوبة، الخبرة المطلوبة، والراتب المقدم."
    },
    {
      id: 6,
      category: "إعلانات الوظائف",
      question: "كيف يمكنني تعديل إعلان وظيفي موجود؟",
      answer: "يمكن تعديل الإعلان من خلال الذهاب إلى صفحة جميع الإعلانات، البحث عن الإعلان المطلوب، ثم الضغط على زر التعديل."
    },

    // المقابلات والتقييم
    {
      id: 7,
      category: "المقابلات والتقييم",
      question: "كيف يمكنني إدارة المقابلات الوظيفية؟",
      answer: "يمكن إدارة المقابلات من خلال صفحة مقابلة وظيفية، حيث يمكن تقييم المتقدمين ومراجعة مؤهلاتهم وخبراتهم."
    },
    {
      id: 8,
      category: "المقابلات والتقييم",
      question: "ما هي معايير تقييم المتقدمين؟",
      answer: "معايير التقييم تشمل: المؤهلات العلمية، الخبرة العملية، المهارات الشخصية، والملاءمة للوظيفة المطلوبة."
    },
    {
      id: 9,
      category: "المقابلات والتقييم",
      question: "كيف يمكنني إنشاء تقرير نهائي للمقابلة؟",
      answer: "يمكن إنشاء التقرير النهائي من خلال صفحة ملخص النتيجة النهائية، حيث يتم تجميع جميع التقييمات واتخاذ القرار النهائي."
    }
  ];

  const categories = [
    { id: "all", name: "جميع الأسئلة" },
    { id: "إدارة الموظفين", name: "إدارة الموظفين" },
    { id: "إعلانات الوظائف", name: "إعلانات الوظائف" },
    { id: "المقابلات والتقييم", name: "المقابلات والتقييم" }
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

  const handleAddFAQ = () => {
    if (newFAQ.question && newFAQ.answer && newFAQ.category) {
      // Here you would typically save to a database
      // For now, we'll just close the dialog
      setShowAddDialog(false);
      setNewFAQ({ question: "", answer: "", category: "" });
      // You could add a success notification here
    }
  };

  const handleCancel = () => {
    setShowAddDialog(false);
    setNewFAQ({ question: "", answer: "", category: "" });
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

  const dialogVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
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
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                  الأسئلة الشائعة - الموارد البشرية
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  إدارة الأسئلة الشائعة وإضافة أسئلة جديدة للموظفين
                </p>
              </div>
              <Button
                onClick={() => setShowAddDialog(true)}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600"
              >
                <Plus className="w-4 h-4" />
                إضافة سؤال جديد
              </Button>
            </div>
          </motion.div>

          {/* Search and Filter Section */}
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 mb-8"
            variants={itemVariants}
          >
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="البحث في الأسئلة الشائعة..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-12 h-14 text-base"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10 pointer-events-none" />
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="min-w-[220px] h-14 text-base pr-12"
                >
                  {categories.map(category => (
                    <SelectOption key={category.id} value={category.id}>
                      {category.name}
                    </SelectOption>
                  ))}
                </Select>
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
                    <HelpCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <div className="text-right">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                        {item.question}
                      </h3>
                      <span className="text-sm text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded-lg">
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

      {/* Add FAQ Dialog */}
      <AnimatePresence>
        {showAddDialog && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              variants={dialogVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    إضافة سؤال جديد
                  </h2>
                  <button
                    onClick={handleCancel}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Category Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    الفئة
                  </label>
                  <Select
                    value={newFAQ.category}
                    onChange={(e) => setNewFAQ({ ...newFAQ, category: e.target.value })}
                    className="w-full"
                  >
                    <SelectOption value="">اختر الفئة</SelectOption>
                    {categories.filter(cat => cat.id !== "all").map(category => (
                      <SelectOption key={category.id} value={category.id}>
                        {category.name}
                      </SelectOption>
                    ))}
                  </Select>
                </div>

                {/* Question */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    السؤال
                  </label>
                  <Input
                    type="text"
                    placeholder="اكتب السؤال هنا..."
                    value={newFAQ.question}
                    onChange={(e) => setNewFAQ({ ...newFAQ, question: e.target.value })}
                    className="w-full"
                  />
                </div>

                {/* Answer */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    الإجابة
                  </label>
                  <textarea
                    placeholder="اكتب الإجابة هنا..."
                    value={newFAQ.answer}
                    onChange={(e) => setNewFAQ({ ...newFAQ, answer: e.target.value })}
                    className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  إلغاء
                </Button>
                <Button
                  onClick={handleAddFAQ}
                  disabled={!newFAQ.question || !newFAQ.answer || !newFAQ.category}
                  className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600"
                >
                  <Save className="w-4 h-4" />
                  حفظ السؤال
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HRFAQ;
