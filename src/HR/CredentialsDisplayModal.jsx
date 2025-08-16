import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, AlertTriangle, User, Mail, Lock } from "lucide-react";
import { Button } from "../components/ui/button";
import { showNotification } from "../lib/api";

const CredentialsDisplayModal = ({ isOpen, onClose, credentials }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      showNotification("تم نسخ البيانات بنجاح", "success");
      
      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopiedField(null);
      }, 2000);
    } catch (err) {
      showNotification("فشل في نسخ البيانات", "error");
    }
  };

  const handleClose = () => {
    setCopiedField(null);
    onClose();
  };

  if (!credentials) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

                     {/* Modal Content */}
           <motion.div
             className={`relative w-full max-w-2xl rounded-2xl shadow-xl ${
               isDarkMode ? "bg-gray-800" : "bg-white"
             }`}
             initial={{ scale: 0.9, opacity: 0, y: 20 }}
             animate={{ scale: 1, opacity: 1, y: 0 }}
             exit={{ scale: 0.9, opacity: 0, y: 20 }}
             transition={{ type: "spring", damping: 25, stiffness: 300 }}
           >
            {/* Header */}
            <div className={`flex items-center justify-between p-6 border-b ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}>
              <h2 className={`text-xl font-bold flex items-center gap-2 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}>
                <User className="w-5 h-5" />
                بيانات تسجيل الدخول
              </h2>
              <button
                onClick={handleClose}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? "text-gray-400 hover:text-white hover:bg-gray-700"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

                         {/* Content */}
             <div className="p-6 space-y-6">
                             {/* Warning Message */}
               <div className={`p-4 rounded-lg border ${
                 isDarkMode 
                   ? "bg-red-900/20 border-red-700 text-red-300" 
                   : "bg-red-50 border-red-200 text-red-700"
               }`}>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">تنبيه مهم</h3>
                    <p className="text-sm">
                      يجب إبلاغ الموظف الجديد بهذه البيانات. عليه تسجيل الدخول وتغيير كلمة المرور في قسم الملف الشخصي.
                    </p>
                  </div>
                </div>
              </div>

                             {/* Employee Name */}
               <div>
                 <h3 className={`text-lg font-semibold mb-2 ${
                   isDarkMode ? "text-white" : "text-gray-900"
                 }`}>
                   {credentials.employeeName}
                 </h3>
               </div>

                               {/* Credentials */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {/* Email */}
                 <div className={`p-4 rounded-lg border ${
                   isDarkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"
                 }`}>
                   <div className="flex flex-col h-full">
                     <div className="flex items-center gap-3 mb-3">
                       <Mail className={`w-4 h-4 ${
                         isDarkMode ? "text-gray-300" : "text-gray-500"
                       }`} />
                       <label className={`text-sm font-medium ${
                         isDarkMode ? "text-gray-300" : "text-gray-600"
                       }`}>
                         البريد الإلكتروني
                       </label>
                     </div>
                     <p className={`text-sm mb-3 flex-1 ${
                       isDarkMode ? "text-white" : "text-gray-900"
                     }`}>
                       {credentials.email}
                     </p>
                     <Button
                       size="sm"
                       variant="outline"
                       onClick={() => handleCopy(credentials.email, 'email')}
                       className="flex items-center gap-2 w-full justify-center"
                     >
                       {copiedField === 'email' ? (
                         <Check className="w-3 h-3" />
                       ) : (
                         <Copy className="w-3 h-3" />
                       )}
                       {copiedField === 'email' ? 'تم النسخ' : 'نسخ'}
                     </Button>
                   </div>
                 </div>

                 {/* Password */}
                 <div className={`p-4 rounded-lg border ${
                   isDarkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"
                 }`}>
                   <div className="flex flex-col h-full">
                     <div className="flex items-center gap-3 mb-3">
                       <Lock className={`w-4 h-4 ${
                         isDarkMode ? "text-gray-300" : "text-gray-500"
                       }`} />
                       <label className={`text-sm font-medium ${
                         isDarkMode ? "text-gray-300" : "text-gray-600"
                       }`}>
                         كلمة المرور
                       </label>
                     </div>
                     <p className={`text-sm mb-3 flex-1 ${
                       isDarkMode ? "text-white" : "text-gray-900"
                     }`}>
                       {credentials.password}
                     </p>
                     <Button
                       size="sm"
                       variant="outline"
                       onClick={() => handleCopy(credentials.password, 'password')}
                       className="flex items-center gap-2 w-full justify-center"
                     >
                       {copiedField === 'password' ? (
                         <Check className="w-3 h-3" />
                       ) : (
                         <Copy className="w-3 h-3" />
                       )}
                       {copiedField === 'password' ? 'تم النسخ' : 'نسخ'}
                     </Button>
                   </div>
                 </div>
               </div>

                             
            </div>

            {/* Footer */}
            <div className={`flex items-center justify-end gap-3 p-6 border-t ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}>
              <Button
                onClick={handleClose}
                className="flex items-center gap-2"
              >
                تم الفهم
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CredentialsDisplayModal;
