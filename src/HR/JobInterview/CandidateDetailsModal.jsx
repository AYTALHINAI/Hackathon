import {
  X,
  User,
  Briefcase,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Download,
  Eye,
} from "lucide-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";

const MySwal = withReactContent(Swal);

const CandidateDetailsModal = ({ isOpen, onClose, candidate }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  if (!isOpen || !candidate) return null;

  const cvPlaceholderUrl = "/placeholder.pdf?query=candidate-cv";

  const handleDownloadCV = () => {
    window.open(cvPlaceholderUrl, "_blank");
    console.log(`Downloading CV for ${candidate.name}`);
  };

  const handleViewCV = () => {
    window.open(cvPlaceholderUrl, "_blank");
    console.log(`Viewing CV for ${candidate.name}`);
  };

  const handleHire = () => {
    MySwal.fire({
      title: "هل أنت متأكد؟",
      text: `هل تريد تعيين ${candidate.name} لوظيفة ${candidate.jobApplied}؟`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "نعم، قم بالتعيين",
      cancelButtonText: "إلغاء",
      confirmButtonColor: "#37b510ff",
      cancelButtonColor: "#ef4444",
      customClass: {
        confirmButton:
          "px-4 py-2 m-2 rounded-lg text-white font-medium shadow-md bg-green-500",
        cancelButton:
          "px-4 py-2 m-2 rounded-lg text-white font-medium shadow-md bg-red-500",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: "تم التعيين بنجاح!",
          html: `تم إرسال بريد إلكتروني إلى <strong>${candidate.name}</strong> بخصوص تعيينه في وظيفة <strong>${candidate.jobApplied}</strong>.<br/><br/>
          (رسائل بريدية رفض تلقائية تم إرسالها لباقي المرشحين لنفس الوظيفة.)`,
          icon: "success",
          confirmButtonText: "موافق",
          confirmButtonColor: "#1f2937",
          customClass: {
            confirmButton:
              "px-4 py-2 rounded-lg text-white font-medium shadow-md bg-gray-800",
          },
          buttonsStyling: false,
        });
      }
    });
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6"
      dir="rtl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={`rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden relative flex flex-col 
        ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        {/* Close Button */}
        <motion.button
          onClick={onClose}
          className={`absolute top-5 left-5 p-2 rounded-full transition-colors duration-200 z-10 
          ${
            isDarkMode
              ? "bg-gray-700 hover:bg-gray-600"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X
            className={`w-6 h-6 ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          />
        </motion.button>

        {/* Scrollable Content */}
        <div className="p-10 overflow-y-auto flex-1">
          <motion.h2 
            className="text-2xl font-bold text-center mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            تفاصيل المرشح
          </motion.h2>

          {/* Profile Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-28 h-28 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden mb-4">
              <img
                src={
                  candidate.avatar ||
                  "/placeholder.svg?height=112&width=112&query=candidate avatar"
                }
                alt={candidate.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold">{candidate.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {candidate.jobApplied}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {candidate.department}
            </p>
          </div>

          {/* Info Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personal Info */}
            <div>
              <h4 className="text-lg font-semibold mb-6 flex items-center gap-3">
                <User className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                معلومات شخصية
              </h4>
              <div className="space-y-6">
                {[
                  {
                    label: "البريد الإلكتروني",
                    value: candidate.email,
                    icon: <Mail className="w-5 h-5 text-gray-400" />,
                  },
                  {
                    label: "رقم الهاتف",
                    value: candidate.phone,
                    icon: <Phone className="w-5 h-5 text-gray-400" />,
                  },
                  {
                    label: "الموقع",
                    value: candidate.location,
                    icon: <MapPin className="w-5 h-5 text-gray-400" />,
                  },
                ].map((info, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-2">
                      {info.label}
                    </label>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-800 dark:text-gray-200">
                        {info.value}
                      </span>
                      {info.icon}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Details */}
            <div>
              <h4 className="text-lg font-semibold mb-6 flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                تفاصيل التقديم
              </h4>
              <div className="space-y-6">
                {[
                  {
                    label: "الوظيفة المتقدم لها",
                    value: candidate.jobApplied,
                    icon: <Briefcase className="w-5 h-5 text-gray-400" />,
                  },
                  {
                    label: "تاريخ المقابلة",
                    value: candidate.interviewDate,
                    icon: <Calendar className="w-5 h-5 text-gray-400" />,
                  },
                  {
                    label: "درجة التقييم",
                    value: `${candidate.evaluationScore} / 100`,
                    icon: (
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2v20M17 5H7l5 5-5 5h10l-5 5" />
                      </svg>
                    ),
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-2">
                      {item.label}
                    </label>
                    <div className="flex items-center justify-between text-sm">
                      <span
                        className={`text-gray-800 dark:text-gray-200 ${
                          item.label === "درجة التقييم" ? "font-bold" : ""
                        }`}
                      >
                        {item.value}
                      </span>
                      {item.icon}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-center md:justify-between gap-4">
            <div className="flex justify-center gap-4 flex-wrap">
              <button
                onClick={handleDownloadCV}
                className="flex items-center gap-2 px-8 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 active:bg-gray-900 transition-colors duration-200 text-base font-medium shadow-md"
              >
                <Download className="w-6 h-6" />
                تحميل السيرة الذاتية
              </button>
              <button
                onClick={handleViewCV}
                className="flex items-center gap-2 px-8 py-3 bg-gray-100 dark:bg-gray-700 dark:text-white text-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 active:bg-gray-300 transition-colors duration-200 text-base font-medium shadow-sm"
              >
                <Eye className="w-6 h-6" />
                عرض السيرة الذاتية
              </button>
            </div>
            <div className="flex justify-center md:justify-end">
              <button
                onClick={handleHire}
                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 active:bg-green-800 transition-colors duration-200 text-base font-semibold shadow-lg"
              >
                تعيين
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CandidateDetailsModal;
