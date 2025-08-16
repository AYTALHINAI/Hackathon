import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";

const EvaluationFormPage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const tableCellBorderClass = isDarkMode ? "border border-white" : "border border-gray-300";

  const evaluationCriteria = [
    {
      category: "السمات الشخصية",
      items: [
        { label: "اللياقة وحسن المظهر", score: 5 },
        { label: "الاتزان العاطفي وعدم الانفعال", score: 5 },
        { label: "الثقة بالنفس", score: 5 },
        { label: "اللياقة الصحية", score: 5 },
      ],
    },
    {
      category: "مهارات الاتصال",
      items: [
        { label: "التعبير عن الرأي وتقبل الرأي الآخر", score: 10 },
        { label: "استخدام لغة الجسد والتواصل البصري", score: 10 },
        { label: "مهارات المشاركة والعمل الجماعي", score: 10 },
        { label: "المبادرة", score: 10 },
      ],
    },
    {
      category: "المهارات الوظيفية",
      items: [
        { label: "ملاءمة المؤهل العلمي لمتطلبات الوظيفة", score: 10 },
        { label: "ملاءمة الخبرات العملية للوظيفة", score: 10 },
        { label: "ملاءمة المهارات المكتسبة للوظيفة", score: 10 },
        { label: "استخدام البرامج والحاسب الآلي", score: 10 },
        { label: "القدرة على اتخاذ القرار", score: 10 },
      ],
    },
  ];

  const totalFields = evaluationCriteria.flatMap((cat) => cat.items);
  const [scores, setScores] = useState(Array(totalFields.length).fill(""));

  const handleScoreChange = (index, value, maxScore) => {
    const newScores = [...scores];
    const num = parseInt(value, 10);
    newScores[index] = isNaN(num) || num < 0 ? "" : Math.min(num, maxScore);
    setScores(newScores);
  };

  const totalScore = scores.reduce((acc, val) => acc + (parseInt(val) || 0), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Evaluation Scores:", scores);
    console.log("Total Score:", totalScore);
  };

  return (
    <div
      className={`flex min-h-screen ${
        isDarkMode ? "bg-gray-900" : "bg-[#f6f5fa]"
      }`}
      dir="rtl"
    >
      <Sidebar />
      <main className="flex-1 p-10">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="flex mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.button
              onClick={() => navigate("/newjob")}
              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowRight className="w-4 h-4" />
              العودة إلى المقابلة الوظيفية
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
              تقييم المتقدمين
            </motion.h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg text-right">إجراء تقييم شامل للمتقدمين وفق معايير واضحة تساعد على قياس الملاءمة والجودة.</p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className={`${
              isDarkMode ? "bg-gray-800 text-white" : "bg-white"
            } rounded-2xl shadow-lg p-8 space-y-8`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div
              className={`${
                isDarkMode
                  ? "bg-green-900 text-green-200 border-green-800"
                  : "bg-green-100 text-green-800 border-green-200"
              } border rounded-lg p-4 text-center`}
            >
              <h2 className="text-xl font-bold">
                إستمارة تقييم للمقابلة الشخصية
              </h2>
            </div>

            {/* Applicant Info */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-right text-sm">
                <tbody>
                  {[
                    ["اسم الموظف", "text"],
                    ["الوظيفة المتقدم لها", "text"],
                    ["تاريخ المقابلة", "date"],
                  ].map(([label, type], i) => (
                    <tr key={i}>
                      <td
                        className={`${tableCellBorderClass} font-medium p-3 w-1/3 ${
                          isDarkMode ? "bg-gray-700 text-white" : "bg-gray-50"
                        }`}
                      >
                        {label}
                      </td>
                      <td className={`${tableCellBorderClass} p-3`}>
                        <input
                          type={type}
                          className={`w-full bg-transparent focus:outline-none ${
                            isDarkMode ? "text-white" : "text-gray-800"
                          }`}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Evaluation Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-right text-sm">
                <thead>
                  <tr
                    className={`${
                      isDarkMode
                        ? "bg-green-900 text-green-200"
                        : "bg-green-100 text-green-800"
                    } font-bold`}
                  >
                    <th className={`${tableCellBorderClass} p-3 w-[20%]`}>العناصر</th>
                    <th className={`${tableCellBorderClass} p-3 w-[50%]`}>معايير التقييم</th>
                    <th className={`${tableCellBorderClass} p-3 w-[15%]`}>الدرجة</th>
                    <th className={`${tableCellBorderClass} p-3 w-[15%]`}>درجة التقييم</th>
                  </tr>
                </thead>
                <tbody>
                  {evaluationCriteria.map((category, catIndex) =>
                    category.items.map((item, itemIndex) => {
                      const flatIndex =
                        evaluationCriteria
                          .slice(0, catIndex)
                          .reduce((acc, cur) => acc + cur.items.length, 0) +
                        itemIndex;

                      return (
                        <tr key={`${catIndex}-${itemIndex}`}>
                          {itemIndex === 0 && (
                            <td
                              rowSpan={category.items.length}
                              className={`${tableCellBorderClass} p-3 font-medium align-top`
                              }
                            >
                              {category.category}
                            </td>
                          )}
                          <td className={`${tableCellBorderClass} p-3`}>{item.label}</td>
                          <td className={`${tableCellBorderClass} p-3 text-center`}>
                            {item.score}
                          </td>
                          <td className={`${tableCellBorderClass} p-3`}>
                            <input
                              type="number"
                              min="0"
                              max={item.score}
                              value={scores[flatIndex]}
                              onChange={(e) =>
                                handleScoreChange(
                                  flatIndex,
                                  e.target.value,
                                  item.score
                                )
                              }
                              className={`w-full bg-transparent text-center focus:outline-none ${
                                isDarkMode ? "text-white" : "text-gray-800"
                              }`}
                            />
                          </td>
                        </tr>
                      );
                    })
                  )}
                  <tr
                    className={`${
                      isDarkMode
                        ? "bg-green-900 text-green-200"
                        : "bg-green-100 text-green-800"
                    } font-bold`}
                  >
                    <td colSpan="2" className={`${tableCellBorderClass} p-3 text-center`}>
                      الدرجة النهائية
                    </td>
                    <td className={`${tableCellBorderClass} p-3 text-center`}>100</td>
                    <td className={`${tableCellBorderClass} p-3`}>
                      <input
                        type="number"
                        value={totalScore}
                        readOnly
                        className={`w-full bg-transparent text-center font-bold focus:outline-none ${
                          isDarkMode ? "text-white" : "text-gray-800"
                        }`}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Committee Section */}
            <div className="overflow-x-auto">
              <div
                className={`${
                  isDarkMode
                    ? "bg-green-900 text-green-200 border-green-800"
                    : "bg-green-100 text-green-800 border-green-200"
                } border rounded-lg p-4 text-center mb-4`}
              >
                <h3 className="text-lg font-bold">لجنة المقابلات الشخصية</h3>
              </div>
              <table className="w-full border-collapse text-right text-sm">
                <tbody>
                  {[
                    ["اسم المقيم", "text"],
                    ["التوقيع", "text"],
                  ].map(([label, type], i) => (
                    <tr key={i}>
                      <td
                        className={`${tableCellBorderClass} font-medium p-3 w-1/3 ${
                          isDarkMode ? "bg-gray-700 text-white" : "bg-gray-50"
                        }`}
                      >
                        {label}
                      </td>
                      <td className={`${tableCellBorderClass} p-3`}>
                        <input
                          type={type}
                          className={`w-full bg-transparent focus:outline-none ${
                            isDarkMode ? "text-white" : "text-gray-800"
                          }`}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 active:bg-gray-300 dark:active:bg-gray-700 transition-colors duration-200 text-base font-medium shadow-sm"
              >
                إرسال التقييم
              </button>
            </div>
          </motion.form>
        </div>
      </main>
    </div>
  );
};

export default EvaluationFormPage;
