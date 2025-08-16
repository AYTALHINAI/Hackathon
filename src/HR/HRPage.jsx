"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import {
  Users,
  FileText,
  Database,
  ClipboardCheck,
  Calendar,
  Plus,
  Clock,
  Activity,
  Bell,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";

// Animation variants
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

// Task Dialog Component
const TaskDialog = ({ isOpen, onClose, onSave, task = null, selectedDate }) => {
  const [taskName, setTaskName] = useState(task?.name || "");
  const [taskTime, setTaskTime] = useState(task?.time || "");
  const [taskDescription, setTaskDescription] = useState(task?.description || "");

  useEffect(() => {
    if (task) {
      setTaskName(task.name);
      setTaskTime(task.time);
      setTaskDescription(task.description);
    } else {
      setTaskName("");
      setTaskTime("");
      setTaskDescription("");
    }
  }, [task]);

  const handleSave = () => {
    if (taskName.trim() && taskTime.trim()) {
      onSave({
        id: task?.id || Date.now(),
        name: taskName.trim(),
        time: taskTime.trim(),
        description: taskDescription.trim(),
        date: selectedDate
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md mx-auto border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            {task ? "تعديل المهمة" : "إضافة مهمة جديدة"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              اسم المهمة *
            </label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="أدخل اسم المهمة"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              الوقت *
            </label>
            <input
              type="time"
              value={taskTime}
              onChange={(e) => setTaskTime(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              الوصف (اختياري)
            </label>
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="أدخل وصف المهمة"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            إلغاء
          </button>
          <button
            onClick={handleSave}
            disabled={!taskName.trim() || !taskTime.trim()}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {task ? "تحديث" : "إضافة"}
          </button>
        </div>
      </div>
    </div>
  );
};

const HRDashboardPage = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Quick action cards data
  const quickActions = [
    {
      id: 1,
      title: "إضافة موظف جديد",
      description: "إضافة موظف جديد إلى النظام",
      icon: Users,
      path: "/db"
    },
    {
      id: 2,
      title: "إعلانات الوظائف",
      description: "إدارة إعلانات الوظائف",
      icon: FileText,
      path: "/alljobpost"
    },
    {
      id: 3,
      title: "نتائج المقابلات",
      description: "عرض نتائج المقابلات",
      icon: ClipboardCheck,
      path: "/newjob"
    }
  ];

  // Recent activities data
  const recentActivities = [
    {
      id: 1,
      title: "تم إضافة موظف جديد",
      description: "أحمد محمد - مطور برمجيات",
      time: "منذ ساعتين",
      icon: Users,
      color: "bg-orange-500"
    },
    {
      id: 2,
      title: "تم تحديث ملف موظف",
      description: "فاطمة علي - مدير الموارد البشرية",
      time: "منذ 4 ساعات",
      icon: Users,
      color: "bg-blue-500"
    },
    {
      id: 3,
      title: "تم نشر إعلان وظيفة",
      description: "مطور واجهة أمامية - قسم تكنولوجيا المعلومات",
      time: "منذ يوم",
      icon: FileText,
      color: "bg-green-500"
    }
  ];

  // Calendar functions
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days = [];
    
    // Add previous month days
    for (let i = startingDay - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({ date: prevDate, isCurrentMonth: false });
    }
    
    // Add current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      days.push({ date: currentDate, isCurrentMonth: true });
    }
    
    // Add next month days to complete the grid
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({ date: nextDate, isCurrentMonth: false });
    }
    
    return days;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('ar-EG', { 
      year: 'numeric', 
      month: 'long',
      calendar: 'gregory'
    });
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const hasTasks = (date) => {
    return tasks.some(task => {
      const taskDate = new Date(task.date);
      return taskDate.toDateString() === date.toDateString();
    });
  };

  const getTasksForDate = (date) => {
    return tasks.filter(task => {
      const taskDate = new Date(task.date);
      return taskDate.toDateString() === date.toDateString();
    });
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setIsTaskDialogOpen(true);
    setEditingTask(null);
  };

  const handleSaveTask = (task) => {
    if (editingTask) {
      setTasks(prev => prev.map(t => t.id === editingTask.id ? task : t));
    } else {
      setTasks(prev => [...prev, task]);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setSelectedDate(new Date(task.date));
    setIsTaskDialogOpen(true);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900" dir="rtl">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-10">
        <motion.div 
          className="max-w-7xl mx-auto space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants}>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              لوحة تحكم الموارد البشرية
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              مرحباً بك في لوحة تحكم الموارد البشرية
            </p>
          </motion.div>

          {/* Quick Actions Section */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-right">
              الإجراءات السريعة
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {quickActions.map((action) => {
                const IconComponent = action.icon;
                return (
                  <motion.div
                    key={action.id}
                    className="group relative"
                    variants={cardVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 h-full transition-all duration-300 hover:shadow-xl hover:border-orange-300 dark:hover:border-orange-600">
                      <div className="flex items-start mb-6">
                        <div className="p-4 rounded-xl bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 group-hover:from-orange-100 dark:group-hover:from-orange-800/40 group-hover:to-amber-200 dark:group-hover:to-amber-800/40 transition-all duration-300">
                          <IconComponent className="w-10 h-10 text-orange-600 dark:text-orange-400" />
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
                        {action.title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8">
                        {action.description}
                      </p>

                      <button
                        onClick={() => navigate(action.path)}
                        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                      >
                        الوصول للخدمة
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Bottom Section: Recent Activities and Calendar */}
          <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-8" variants={itemVariants}>
            {/* Recent Activities */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-right">
                النشاطات الأخيرة
              </h2>
              <div className="space-y-4">
                {recentActivities.map((activity) => {
                  const IconComponent = activity.icon;
                  return (
                    <div key={activity.id} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <div className={`w-10 h-10 ${activity.color} rounded-full flex items-center justify-center text-white flex-shrink-0`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 dark:text-white text-right">
                          {activity.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 text-right">
                          {activity.description}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 text-right mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

                         {/* Calendar */}
             <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
               <div className="mb-6">
                 <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-right">
                   التقويم
                 </h2>
               </div>

              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {formatDate(currentDate)}
                </h3>
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'].map(day => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-gray-600 dark:text-gray-400">
                    {day}
                  </div>
                ))}
              </div>

                             <div className="grid grid-cols-7 gap-1">
                 {days.map((day, index) => {
                   const dayTasks = getTasksForDate(day.date);
                   return (
                     <div key={index} className="relative group">
                                               <button
                          onClick={() => handleDateClick(day.date)}
                          className={`w-full p-2 h-12 text-sm rounded-lg transition-colors relative ${
                            day.isCurrentMonth
                              ? hasTasks(day.date)
                                ? 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700'
                                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-white'
                              : 'text-gray-400 dark:text-gray-600'
                          } ${
                            isToday(day.date) ? 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200' : ''
                          }`}
                        >
                          {day.date.getDate()}
                          {hasTasks(day.date) && (
                            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-orange-500 rounded-full"></div>
                          )}
                        </button>
                        
                                                 {/* Task Details Tooltip */}
                         {hasTasks(day.date) && (
                           <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                            <div className="bg-gray-900 text-white text-base rounded-xl p-6 shadow-xl min-w-80 max-w-96">
                                                             <div className="font-semibold mb-4 text-center text-lg">
                                 مهام {day.date.toLocaleDateString('ar-EG', { calendar: 'gregory' })}
                               </div>
                                                             <div className="space-y-4">
                                 {dayTasks.map((task) => (
                                   <div key={task.id} className="border-b border-gray-700 pb-3 last:border-b-0">
                                     <div className="flex items-start justify-between">
                                       <div className="flex-1">
                                         <div className="font-medium text-lg mb-2">{task.name}</div>
                                         <div className="text-gray-300 text-base mb-2">{task.time}</div>
                                         {task.description && (
                                           <div className="text-gray-400 text-sm mt-2 leading-relaxed">{task.description}</div>
                                         )}
                                       </div>
                                       <button
                                         onClick={(e) => {
                                           e.stopPropagation();
                                           handleDeleteTask(task.id);
                                         }}
                                         className="ml-3 p-1 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded transition-colors"
                                         title="حذف المهمة"
                                       >
                                         <Trash2 className="w-4 h-4" />
                                       </button>
                                     </div>
                                   </div>
                                 ))}
                               </div>
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                            </div>
                          </div>
                        )}
                     </div>
                   );
                 })}
               </div>

              
            </div>
          </motion.div>
        </motion.div>

        {/* Task Dialog */}
        <TaskDialog
          isOpen={isTaskDialogOpen}
          onClose={() => {
            setIsTaskDialogOpen(false);
            setEditingTask(null);
          }}
          onSave={handleSaveTask}
          task={editingTask}
          selectedDate={selectedDate}
        />
      </main>
    </div>
  );
};

export default HRDashboardPage;

