import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Download,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  User,
  Building,
  CreditCard,
} from "lucide-react";

const PDFRequestForm = () => {
  const navigate = useNavigate();
  const [selectedDocument, setSelectedDocument] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const documentTypes = [
    {
      id: "money_transcript",
      name: "كشف الراتب",
      description: "كشف تفصيلي بالراتب والبدلات",
      icon: CreditCard,
      requiresPeriod: true
    },
    {
      id: "employment_verification",
      name: "خطاب إثبات التوظيف",
      description: "خطاب رسمي لإثبات التوظيف",
      icon: Building,
      requiresPeriod: false
    },
    {
      id: "pay_stub",
      name: "كشوف الرواتب",
      description: "كشوف الرواتب الشهرية",
      icon: FileText,
      requiresPeriod: true
    },
    {
      id: "leave_summary",
      name: "ملخص الإجازات",
      description: "ملخص الإجازات المستخدمة والمتبقية",
      icon: Calendar,
      requiresPeriod: true
    }
  ];

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);
  const months = [
    "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
  ];

  const periods = [
    "يناير 2024", "فبراير 2024", "مارس 2024", "أبريل 2024",
    "مايو 2024", "يونيو 2024", "يوليو 2024", "أغسطس 2024"
  ];

  const handleGeneratePDF = async () => {
    if (!selectedDocument) {
      alert("يرجى اختيار نوع المستند");
      return;
    }

    const selectedDoc = documentTypes.find(doc => doc.id === selectedDocument);
    if (selectedDoc.requiresPeriod && !selectedPeriod && !selectedYear) {
      alert("يرجى اختيار الفترة المطلوبة");
      return;
    }

    setIsGenerating(true);
    
    // Simulate PDF generation
    setTimeout(() => {
      setIsGenerating(false);
      // Here you would typically trigger the actual PDF download
      alert("تم إنشاء المستند بنجاح! سيبدأ التحميل تلقائياً.");
    }, 2000);
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
                طلب المستندات
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg mr-12">
              اطلب وتحميل المستندات الرسمية الخاصة بك
            </p>
          </motion.div>

          {/* Document Types Selection */}
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 mb-8"
            variants={itemVariants}
          >
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 text-right">
              اختر نوع المستند
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documentTypes.map((doc) => {
                const IconComponent = doc.icon;
                const isSelected = selectedDocument === doc.id;
                
                return (
                  <motion.div
                    key={doc.id}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                    }`}
                    onClick={() => setSelectedDocument(doc.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        isSelected
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                      }`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 dark:text-white mb-1">
                          {doc.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {doc.description}
                        </p>
                      </div>
                      {isSelected && (
                        <CheckCircle className="w-5 h-5 text-blue-500" />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Period Selection */}
          {selectedDocument && (
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 mb-8"
              variants={itemVariants}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 text-right">
                اختر الفترة المطلوبة
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Quick Period Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 text-right">
                    فترات سريعة
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {periods.slice(0, 4).map((period) => (
                      <button
                        key={period}
                        onClick={() => setSelectedPeriod(period)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedPeriod === period
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                        }`}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Period Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 text-right">
                    فترة مخصصة
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">اختر السنة</option>
                      {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                    
                    <select
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">اختر الشهر</option>
                      {months.map((month, index) => (
                        <option key={index} value={index + 1}>{month}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Generate Button */}
          {selectedDocument && (
            <motion.div 
              className="flex justify-center mb-8"
              variants={itemVariants}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={handleGeneratePDF}
                disabled={isGenerating}
                className="flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium text-lg shadow-lg"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    جاري الإنشاء...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    إنشاء وتحميل المستند
                  </>
                )}
              </button>
            </motion.div>
          )}

          {/* Recent Requests */}
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 mb-8"
            variants={itemVariants}
          >
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 text-right">
              الطلبات الأخيرة
            </h2>
            
            <div className="space-y-4">
              {[
                {
                  id: 1,
                  document: "كشف الراتب",
                  period: "يناير 2024",
                  status: "مكتمل",
                  date: "2024-01-15",
                  icon: CheckCircle,
                  color: "text-green-500"
                },
                {
                  id: 2,
                  document: "خطاب إثبات التوظيف",
                  period: "-",
                  status: "قيد المعالجة",
                  date: "2024-01-14",
                  icon: Clock,
                  color: "text-yellow-500"
                },
                {
                  id: 3,
                  document: "كشوف الرواتب",
                  period: "ديسمبر 2023",
                  status: "مكتمل",
                  date: "2023-12-20",
                  icon: CheckCircle,
                  color: "text-green-500"
                }
              ].map((request) => {
                const IconComponent = request.icon;
                
                return (
                  <div
                    key={request.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className={`w-5 h-5 ${request.color}`} />
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">
                          {request.document}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {request.period} • {request.date}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      request.status === "مكتمل"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    }`}>
                      {request.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default PDFRequestForm;
