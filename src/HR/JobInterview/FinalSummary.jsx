import { useState, useRef, useEffect } from "react";
import {
  Filter,
  ListFilter,
  Search,
  ArrowRight,
  ChevronLeft,
} from "lucide-react";
import Sidebar from "../../components/Sidebar";
import CandidateDetailsModal from "./CandidateDetailsModal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const MySwal = withReactContent(Swal);

const jobPosts = [
  { id: "job1", title: "مهندس برمجيات" },
  { id: "job2", title: "مدير موارد بشرية" },
  { id: "job3", title: "مصمم UX/UI" },
  { id: "job4", title: "أخصائي تسويق" },
];

const candidatesData = [
  {
    id: 1,
    name: "أحمد محمد",
    jobApplied: "مهندس برمجيات",
    department: "تكنولوجيا المعلومات",
    evaluationScore: 85,
    interviewDate: "2024-07-20",
    status: "مقبول",
    email: "ahmed.mohamed@example.com",
    phone: "+966 50 123 4567",
    location: "الرياض",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    name: "فاطمة الزهراء",
    jobApplied: "مدير موارد بشرية",
    department: "الموارد البشرية",
    evaluationScore: 92,
    interviewDate: "2024-07-18",
    status: "مقبول",
    email: "fatima.zahra@example.com",
    phone: "+966 55 987 6543",
    location: "جدة",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    name: "خالد عبدالله",
    jobApplied: "مصمم UX/UI",
    department: "التصميم",
    evaluationScore: 78,
    interviewDate: "2024-07-22",
    status: "قيد المراجعة",
    email: "khalid.abdullah@example.com",
    phone: "+966 53 112 2334",
    location: "الدمام",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 4,
    name: "ليلى أحمد",
    jobApplied: "مهندس برمجيات",
    department: "تكنولوجيا المعلومات",
    evaluationScore: 70,
    interviewDate: "2024-07-21",
    status: "مرفوض",
    email: "layla.ahmed@example.com",
    phone: "+966 56 445 5667",
    location: "الرياض",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 5,
    name: "يوسف علي",
    jobApplied: "أخصائي تسويق",
    department: "التسويق",
    evaluationScore: 88,
    interviewDate: "2024-07-19",
    status: "مقبول",
    email: "youssef.ali@example.com",
    phone: "+966 59 778 8990",
    location: "جدة",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 6,
    name: "نور حسين",
    jobApplied: "مدير موارد بشرية",
    department: "الموارد البشرية",
    evaluationScore: 65,
    interviewDate: "2024-07-23",
    status: "قيد المراجعة",
    email: "nour.hussain@example.com",
    phone: "+966 51 223 3445",
    location: "الرياض",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 7,
    name: "سامي فهد",
    jobApplied: "مصمم UX/UI",
    department: "التصميم",
    evaluationScore: 95,
    interviewDate: "2024-07-24",
    status: "مقبول",
    email: "sami.fahad@example.com",
    phone: "+966 54 556 6778",
    location: "الدمام",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 8,
    name: "ريم سعيد",
    jobApplied: "أخصائي تسويق",
    department: "التسويق",
    evaluationScore: 80,
    interviewDate: "2024-07-25",
    status: "مقبول",
    email: "reem.saeed@example.com",
    phone: "+966 58 889 9001",
    location: "جدة",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 9,
    name: "طارق منصور",
    jobApplied: "مهندس برمجيات",
    department: "تكنولوجيا المعلومات",
    evaluationScore: 72,
    interviewDate: "2024-07-26",
    status: "مرفوض",
    email: "tariq.mansour@example.com",
    phone: "+966 52 334 4556",
    location: "الرياض",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 10,
    name: "هند ناصر",
    jobApplied: "مدير موارد بشرية",
    department: "الموارد البشرية",
    evaluationScore: 89,
    interviewDate: "2024-07-27",
    status: "مقبول",
    email: "hind.nasser@example.com",
    phone: "+966 57 667 7889",
    location: "الدمام",
    avatar: "/placeholder.svg?height=32&width=32",
  },
];

const FinalSummaryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState("all");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [sortOption, setSortOption] = useState("score-desc");
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [showFilterOptions, setShowFilterOptions] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const filterRef = useRef(null);
  const sortRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilterOptions(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setShowSortOptions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filterAndSortCandidates = () => {
    let filtered = [...candidatesData];

    if (selectedJob !== "all") {
      filtered = filtered.filter((c) => c.jobApplied === selectedJob);
    }

    if (selectedStartDate && selectedEndDate) {
      const start = new Date(selectedStartDate);
      const end = new Date(selectedEndDate);

      filtered = filtered.filter((c) => {
        const interview = new Date(c.interviewDate);
        return interview >= start && interview <= end;
      });
    }

    if (searchTerm) {
      filtered = filtered.filter((c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    switch (sortOption) {
      case "score-desc":
        filtered.sort((a, b) => b.evaluationScore - a.evaluationScore);
        break;
      case "score-asc":
        filtered.sort((a, b) => a.evaluationScore - b.evaluationScore);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "date-newest":
        filtered.sort(
          (a, b) =>
            new Date(b.interviewDate).getTime() -
            new Date(a.interviewDate).getTime()
        );
        break;
      case "date-oldest":
        filtered.sort(
          (a, b) =>
            new Date(a.interviewDate).getTime() -
            new Date(b.interviewDate).getTime()
        );
        break;
      default:
        break;
    }
    return filtered;
  };

  const candidates = filterAndSortCandidates();

  const openModal = (candidate) => {
    setSelectedCandidate(candidate);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCandidate(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900" dir="rtl">
      <Sidebar />
      <main className="flex-1 p-10 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
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
              ملخص التقييم 
            </motion.h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 text-right">عرض نتائج المقابلات وتصفية المرشحين وفق المعايير المحددة.</p>
          </motion.div>

          {/* Filter, Sort, Search Section */}
          <motion.div 
            className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex gap-4 w-full md:w-auto relative">
              {/* Job Filter dropdown */}
              <div className="relative" ref={filterRef}>
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  onClick={() => setShowFilterOptions(!showFilterOptions)}
                >
                  <Filter className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    تصفية الوظيفة
                  </span>
                </button>
                {showFilterOptions && (
                  <div className="absolute top-full mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md z-10">
                    <button
                      onClick={() => {
                        setSelectedJob("all");
                        setShowFilterOptions(false);
                      }}
                      className="w-full text-right px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-800 dark:text-gray-300"
                    >
                      جميع الوظائف
                    </button>
                    {jobPosts.map((job) => (
                      <button
                        key={job.id}
                        onClick={() => {
                          setSelectedJob(job.title);
                          setShowFilterOptions(false);
                        }}
                        className="w-full text-right px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-800 dark:text-gray-300"
                      >
                        {job.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Date Selection */}
              <div className="flex gap-2 items-center">
                <label className="text-sm text-gray-700 dark:text-gray-300">
                  من:
                </label>
                <input
                  type="date"
                  value={selectedStartDate}
                  onChange={(e) => setSelectedStartDate(e.target.value)}
                  className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-right bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                />

                <label className="text-sm text-gray-700 dark:text-gray-300">
                  إلى:
                </label>
                <input
                  type="date"
                  value={selectedEndDate}
                  onChange={(e) => setSelectedEndDate(e.target.value)}
                  className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-right bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                />
              </div>

              {/* Sort dropdown */}
              <div className="relative" ref={sortRef}>
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  onClick={() => setShowSortOptions(!showSortOptions)}
                >
                  <ListFilter className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    ترتيب
                  </span>
                </button>
                {showSortOptions && (
                  <div className="absolute top-full mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md z-10">
                    <button
                      onClick={() => {
                        setSortOption("score-desc");
                        setShowSortOptions(false);
                      }}
                      className="w-full text-right px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-800 dark:text-gray-300"
                    >
                      الدرجة (الأعلى)
                    </button>
                    <button
                      onClick={() => {
                        setSortOption("score-asc");
                        setShowSortOptions(false);
                      }}
                      className="w-full text-right px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-800 dark:text-gray-300"
                    >
                      الدرجة (الأدنى)
                    </button>
                    <button
                      onClick={() => {
                        setSortOption("name-asc");
                        setShowSortOptions(false);
                      }}
                      className="w-full text-right px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-800 dark:text-gray-300"
                    >
                      الاسم (أ - ي)
                    </button>
                    <button
                      onClick={() => {
                        setSortOption("name-desc");
                        setShowSortOptions(false);
                      }}
                      className="w-full text-right px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-800 dark:text-gray-300"
                    >
                      الاسم (ي - أ)
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Search bar */}
            <div className="relative w-full md:max-w-xs">
              <input
                type="text"
                placeholder="بحث بالاسم..."
                className="w-full px-4 py-2 pr-10 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-right transition-colors duration-200 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
            </div>
          </motion.div>

          {/* Candidates Table */}
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-right text-gray-700 dark:text-gray-300">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-semibold">
                    <th className="p-4 whitespace-nowrap">الاسم</th>
                    <th className="p-4 whitespace-nowrap">
                      الوظيفة المتقدم لها
                    </th>
                    <th className="p-4 whitespace-nowrap">تاريخ المقابلة</th>
                    <th className="p-4 whitespace-nowrap">درجة التقييم</th>
                    <th className="p-4 whitespace-nowrap">الحالة</th>
                    <th className="p-4 whitespace-nowrap">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.length > 0 ? (
                    candidates.map((candidate) => (
                      <tr
                        key={candidate.id}
                        className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={candidate.avatar || "/placeholder.svg"}
                              alt={candidate.name}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <div className="text-right">
                              <div className="font-medium text-gray-900 dark:text-gray-100">
                                {candidate.name}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {candidate.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                          {candidate.jobApplied}
                        </td>
                        <td className="p-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                          {candidate.interviewDate}
                        </td>
                        <td className="p-4 whitespace-nowrap text-gray-700 dark:text-gray-300 font-bold">
                          {candidate.evaluationScore} / 100
                        </td>
                        <td className="p-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              candidate.status === "مقبول"
                                ? "bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-200"
                                : candidate.status === "مرفوض"
                                ? "bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-200"
                                : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                            }`}
                          >
                            {candidate.status}
                          </span>
                        </td>
                        <td className="p-4 whitespace-nowrap">
                          <button
                            onClick={() => openModal(candidate)}
                            className="px-4 py-2 bg-gray-800 text-white rounded-lg text-xs font-medium hover:bg-gray-700 active:bg-gray-900 transition-colors duration-200 shadow-sm"
                          >
                            عرض التفاصيل
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="p-4 text-center text-gray-500 dark:text-gray-400"
                      >
                        لا توجد نتائج مطابقة.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination (Optional) */}
            <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 text-sm">
              <span>
                عرض 1 إلى {candidates.length} من {candidatesData.length} مرشحًا
              </span>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="px-3 py-1 rounded-md bg-gray-800 text-white font-medium">
                  1
                </button>
                <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rotate-180">
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Candidate Details Modal */}
      <CandidateDetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        candidate={selectedCandidate}
      />
    </div>
  );
};

export default FinalSummaryPage;
