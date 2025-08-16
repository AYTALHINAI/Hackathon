import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  Download,
  Mail,
  Phone,
  Calendar,
  MapPin,
  ArrowLeft,
} from "lucide-react";

const JobApplicants = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedJob, setSelectedJob] = useState("all");

  // Mock data for job applicants
  const applicants = [
    {
      id: 1,
      name: "أحمد محمد علي",
      email: "ahmed.mohamed@company.com",
      phone: "+966-50-123-4567",
      jobTitle: "مدير قسم تقنية المعلومات",
      department: "تقنية المعلومات",
      applicationDate: "2024-01-15",
      status: "قيد المراجعة",
      matchingScore: 85,
      experience: "7 سنوات",
      location: "الرياض",
      cvUrl: "#",
      isShortlisted: false
    },
    {
      id: 2,
      name: "فاطمة أحمد حسن",
      email: "fatima.ahmed@company.com",
      phone: "+966-55-987-6543",
      jobTitle: "مدير قسم تقنية المعلومات",
      department: "تقنية المعلومات",
      applicationDate: "2024-01-14",
      status: "مؤهل للمقابلة",
      matchingScore: 92,
      experience: "9 سنوات",
      location: "جدة",
      cvUrl: "#",
      isShortlisted: true
    },
    {
      id: 3,
      name: "محمد عبدالله سالم",
      email: "mohamed.abdullah@company.com",
      phone: "+966-54-456-7890",
      jobTitle: "محلل مالي",
      department: "المالية",
      applicationDate: "2024-01-13",
      status: "تم التقييم",
      matchingScore: 78,
      experience: "5 سنوات",
      location: "الدمام",
      cvUrl: "#",
      isShortlisted: false
    },
    {
      id: 4,
      name: "سارة خالد محمد",
      email: "sara.khalid@company.com",
      phone: "+966-56-789-0123",
      jobTitle: "مصمم جرافيك",
      department: "التسويق",
      applicationDate: "2024-01-12",
      status: "مرفوض",
      matchingScore: 45,
      experience: "2 سنوات",
      location: "الرياض",
      cvUrl: "#",
      isShortlisted: false
    }
  ];

  const statuses = ["all", "قيد المراجعة", "مؤهل للمقابلة", "تم التقييم", "مرفوض"];
  const jobs = ["all", "مدير قسم تقنية المعلومات", "محلل مالي", "مصمم جرافيك"];

  const filteredApplicants = applicants.filter(applicant => {
    const matchesSearch = applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         applicant.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || applicant.status === selectedStatus;
    const matchesJob = selectedJob === "all" || applicant.jobTitle === selectedJob;
    return matchesSearch && matchesStatus && matchesJob;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "مؤهل للمقابلة":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "قيد المراجعة":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "تم التقييم":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "مرفوض":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-600 dark:text-green-400";
    if (score >= 80) return "text-blue-600 dark:text-blue-400";
    if (score >= 70) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
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

      <main className="flex-1 p-10">
        <motion.div 
          className="max-w-7xl mx-auto space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Page Heading */}
          <motion.div 
            className="flex items-center gap-4"
            variants={itemVariants}
          >
            <button 
              onClick={() => navigate("/alljobpost")}
              className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white text-right">
                المتقدمون للوظائف
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-right mt-2">
                إدارة وتقييم المتقدمين للوظائف الشاغرة
              </p>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
            variants={itemVariants}
          >
            {[
              { label: "إجمالي المتقدمين", value: applicants.length, icon: Users, color: "bg-blue-500" },
              { label: "مؤهل للمقابلة", value: applicants.filter(a => a.status === "مؤهل للمقابلة").length, icon: CheckCircle, color: "bg-green-500" },
              { label: "قيد المراجعة", value: applicants.filter(a => a.status === "قيد المراجعة").length, icon: Clock, color: "bg-yellow-500" },
              { label: "مرفوض", value: applicants.filter(a => a.status === "مرفوض").length, icon: XCircle, color: "bg-red-500" }
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {stat.label}
                      </p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-white">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`p-3 rounded-xl ${stat.color} text-white`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Search and Filter Section */}
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6"
            variants={itemVariants}
          >
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="البحث في المتقدمين..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="appearance-none pr-10 pl-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent min-w-[180px]"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>
                      {status === "all" ? "جميع الحالات" : status}
                    </option>
                  ))}
                </select>
              </div>

              {/* Job Filter */}
              <div className="relative">
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedJob}
                  onChange={(e) => setSelectedJob(e.target.value)}
                  className="appearance-none pr-10 pl-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent min-w-[200px]"
                >
                  {jobs.map(job => (
                    <option key={job} value={job}>
                      {job === "all" ? "جميع الوظائف" : job}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>

          {/* Applicants Table */}
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            variants={itemVariants}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-800 dark:text-white">
                      المتقدم
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-800 dark:text-white">
                      الوظيفة
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-800 dark:text-white">
                      تاريخ التقديم
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-800 dark:text-white">
                      درجة المطابقة
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-800 dark:text-white">
                      الحالة
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-800 dark:text-white">
                      الإجراءات
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredApplicants.map((applicant) => (
                    <tr key={applicant.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                            <span className="text-orange-600 dark:text-orange-400 font-semibold">
                              {applicant.name.split(' ')[0][0]}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-800 dark:text-white">
                              {applicant.name}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {applicant.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white">
                            {applicant.jobTitle}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {applicant.department}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                        {applicant.applicationDate}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold ${getScoreColor(applicant.matchingScore)}`}>
                            {applicant.matchingScore}%
                          </span>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= Math.floor(applicant.matchingScore / 20)
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300 dark:text-gray-600"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(applicant.status)}`}>
                          {applicant.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors">
                            <Download className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-colors">
                            <Mail className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {filteredApplicants.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <Users className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  لا يوجد متقدمون
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  لا يوجد متقدمون يطابقون معايير البحث المحددة
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default JobApplicants;
