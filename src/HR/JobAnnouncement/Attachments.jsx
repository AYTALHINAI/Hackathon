import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { ChevronLeft, FileImage, Trash, Eye, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";

const Attachment = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    setPreviewUrl(URL.createObjectURL(uploadedFile));
  };

  const handleDeleteFile = () => {
    setFile(null);
    setPreviewUrl(null);
    toast.info("تم حذف المرفق");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("📄 تم معاينة المرفق بنجاح (لن يتم النشر فعليًا)");
    console.log({ title, description, file, scheduleDate });
  };

  return (
    <div
      className={`flex min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-[#f6f5fa] text-gray-800"
      }`}
      dir="rtl"
    >
      <Sidebar />

      <main className="flex-1 min-h-screen p-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
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
              عن طريق المرفقات
            </motion.h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg text-right">تحميل وإدارة المرفقات المتعلقة بإعلانات الوظائف بسهولة.</p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Upload Box */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 flex flex-col h-full">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4 text-right">
                المرفقات
              </h2>

              {!file ? (
                <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer text-gray-500 dark:text-gray-300 p-8 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <FileImage className="w-12 h-12 mb-2 text-gray-400" />
                  <span className="text-center text-sm leading-6">
                    اسحب الملفات هنا أو انقر للتحميل <br />
                    <span className="text-xs text-gray-400">
                      PDF, DOC, DOCX, صور (10MB)
                    </span>
                  </span>
                </label>
              ) : (
                <div className="flex flex-col items-center gap-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl p-6 text-gray-600 dark:text-gray-300 text-center">
                  <div className="text-sm font-medium text-green-600">
                    ✅ {file.name}
                  </div>
                  <div className="flex gap-4 mt-2">
                    <button
                      type="button"
                      onClick={() => setShowPreview(true)}
                      className="flex items-center gap-1 px-4 py-1 text-sm text-blue-600 border border-blue-200 rounded hover:bg-blue-50 dark:border-blue-500 dark:hover:bg-blue-600/20 transition"
                    >
                      <Eye className="w-4 h-4" />
                      معاينة
                    </button>
                    <button
                      type="button"
                      onClick={handleDeleteFile}
                      className="flex items-center gap-1 px-4 py-1 text-sm text-red-600 border border-red-200 rounded hover:bg-red-50 dark:border-red-500 dark:hover:bg-red-600/20 transition"
                    >
                      <Trash className="w-4 h-4" />
                      حذف الملف
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 space-y-6">
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1 text-right">
                  عنوان المرفق
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1 text-right">
                  وصف
                </label>
                <textarea
                  rows="6"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1 text-right">
                  جدولة النشر (اختياري)
                </label>
                <input
                  type="date"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                />
                {scheduleDate && (
                  <p className="text-xs text-green-600 mt-1">
                    سيتم نشر المرفق بتاريخ: {scheduleDate}
                  </p>
                )}
              </div>
            </div>
            {/* Submit Button */}
            <div className="col-span-1 lg:col-span-2 flex justify-center mt-10">
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700
                           text-gray-700 dark:text-gray-200 rounded-lg border border-gray-200 dark:border-gray-600
                           hover:bg-gray-200 dark:hover:bg-gray-600 active:bg-gray-300 dark:active:bg-gray-700
                           transition-colors duration-200 text-base font-medium shadow-sm"
              >
                معاينة المرفق
              </button>
            </div>
            
          </motion.form>
          
        </div>
      </main>
      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-auto relative">
            <button
              onClick={() => setShowPreview(false)}
              className="absolute top-3 left-3 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700 p-2 rounded-full"
            >
              ✕
            </button>

            <div className="p-6">
              <h2 className="text-xl font-bold mb-4 text-center">
                معاينة المرفق
              </h2>

              {file?.type?.startsWith("image/") ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="mx-auto rounded-md max-h-[70vh]"
                />
              ) : file?.type === "application/pdf" ? (
                <iframe
                  src={previewUrl}
                  className="w-full h-[70vh] border rounded-md"
                  title="PDF Preview"
                />
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400">
                  لا يمكن معاينة هذا النوع من الملفات.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attachment;
