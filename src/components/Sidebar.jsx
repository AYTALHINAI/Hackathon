import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  FileText,
  Database,
  ClipboardCheck,
  User,
  Users,
  Settings,
  LogOut,
  Minimize2,
  Maximize2,
  Bell,
  HelpCircle,
} from "lucide-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useTheme } from "../context/ThemeContext";
import { useSettings } from "../context/SettingsContext";
import toast from "react-hot-toast";
// import marenLogo from "../../assets/images/lOGO.svg";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  const { language } = useSettings();
  // const [isCollapsed, setIsCollapsed] = useState(false);
  const id = localStorage.getItem("id");
  const MySwal = withReactContent(Swal);
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebarCollapsed");
    return saved === "true";
  });

  const getRole = () => {
    if (id === "1") return "الموارد البشرية";
    if (id === "3") return "الموظف";
    return "غير معروف";
  };

  const getSidebarStyle = () => {
    if (id === "1") return "bg-gradient-to-b from-orange-400 to-orange-500";
    if (id === "3") return "bg-gradient-to-b from-blue-600 to-blue-800";
    return "bg-gray-700";
  };

  const handleSignOut = () => {
    MySwal.fire({
      title: "هل أنت متأكد؟",
      text: "سيتم تسجيل الخروج من النظام.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "تأكيد",
      cancelButtonText: "إلغاء",
      backdrop: true,
      customClass: {
        popup: `rounded-xl ${theme === 'dark' ? 'dark' : ''}`,
        title: theme === 'dark' ? 'text-gray-100' : 'text-gray-900',
        htmlContainer: theme === 'dark' ? 'text-gray-300' : 'text-gray-600',
        confirmButton: 'rounded-lg',
        cancelButton: 'rounded-lg',
      },
      background: theme === 'dark' ? '#374151' : '#ffffff',
      color: theme === 'dark' ? '#f9fafb' : '#111827',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        
        // Show success notification
        toast.success("✓ تم تسجيل الخروج بنجاح", {
          icon: "👋",
          duration: 3000,
          position: "top-center",
          style: {
            fontFamily: "Cairo, sans-serif",
            direction: "rtl",
            padding: "16px",
            borderRadius: "12px",
            background: theme === 'dark' ? "#374151" : "#f0fdf4",
            color: theme === 'dark' ? "#f9fafb" : "#166534",
            border: theme === 'dark' ? "1px solid #4b5563" : "1px solid #22c55e",
          },
        });
        
        navigate("/");
      }
    });
  };

  // const toggleSidebar = () => {
  //   setIsCollapsed(!isCollapsed);
  // };
  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("sidebarCollapsed", newState); // Save new state
  };

  const getMenuItems = () => {
         if (id === "1") {
       return [
         { icon: Home, label: "لوحة الرئيسية", path: "/hr" },
         { icon: FileText, label: "إعلان الوظيفة", path: "/jobpost" },
         { icon: Database, label: "قاعدة البيانات", path: "/db" },
         { icon: ClipboardCheck, label: "مقابلة وظيفية", path: "/newjob" },
         { icon: HelpCircle, label: "الأسئلة الشائعة", path: "/hr-faq" },
         { icon: User, label: "الملف الشخصي", path: "/profile" },
         { icon: Settings, label: "إعدادات", path: "/settings" },
       ];
    } else if (id === "3") {
      return [
        { icon: Home, label: "لوحة الرئيسية", path: "/employee" },
        { icon: HelpCircle, label: "الأسئلة الشائعة", path: "/faq" },
        { icon: User, label: "الملف الشخصي", path: "/profile" },
        { icon: Settings, label: "إعدادات", path: "/settings" },
      ];
    }
    return [];
  };

  const menuItems = getMenuItems();

  return (
    <>
      <aside
        className={`fixed top-4 right-4 bottom-4 ${getSidebarStyle()} text-white shadow-2xl flex flex-col justify-between transition-all duration-300 ease-in-out rounded-2xl ${
          isCollapsed ? "w-20" : "w-64"
        }`}
        dir="rtl"
      >
        <div className="p-4 flex-1">
          {/* Toggle Button */}
          <button
            onClick={toggleSidebar}
            className="absolute top-4 left-4 p-4 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200 z-10"
          >
            {isCollapsed ? (
              <Maximize2 className="w-4 h-4" />
            ) : (
              <Minimize2 className="w-4 h-4" />
            )}
          </button>

          {/* Maren Logo */}
          <div
            className={`mt-12 mb-8 transition-all duration-300 ${
              isCollapsed
                ? "opacity-0 scale-0 h-0"
                : "opacity-100 scale-100 h-auto"
            }`}
          >
            <div className="flex flex-col items-center border-b border-white/30 pb-3">
                             <img
                 src="/assets/images/lOGO.svg"
                 alt="Maren Logo"
                 className="w-20 h-20 mb-2 filter brightness-0 invert"
                 onError={(e) => {
                   console.log('Logo failed to load:', e.target.src);
                   e.target.style.display = 'none';
                 }}
               />
            </div>
          </div>

          {/* Menu */}
          <nav className="space-y-3 flex-1">
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={index}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center rounded-xl transition-all duration-200 group relative overflow-hidden ${
                    isCollapsed
                      ? "justify-center p-4"
                      : "justify-start p-3 gap-4"
                  } ${
                    isActive
                      ? "bg-white/30 hover:bg-white/40 active:bg-white/50"
                      : "hover:bg-white/20 active:bg-white/30"
                  }`}
                >
                  <IconComponent className="w-6 h-6 flex-shrink-0 z-10" />
                  <span
                    className={`font-medium whitespace-nowrap transition-all duration-300 ${
                      isCollapsed
                        ? "absolute opacity-0 scale-0 translate-x-full"
                        : "opacity-100 scale-100 translate-x-0"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Logout */}
        <div className="p-4">
          <button
            onClick={handleSignOut}
            className={`w-full flex items-center rounded-xl bg-white/20 hover:bg-white/30 active:bg-white/40 transition-all duration-200 group relative overflow-hidden ${
              isCollapsed ? "justify-center p-4" : "justify-start p-3 gap-4"
            }`}
          >
            <LogOut className="w-6 h-6 flex-shrink-0 z-10" />
            <span
              className={`font-medium whitespace-nowrap transition-all duration-300 ${
                isCollapsed
                  ? "absolute opacity-0 scale-0 translate-x-full"
                  : "opacity-100 scale-100 translate-x-0"
              }`}
            >
              تسجيل الخروج
            </span>
          </button>
        </div>
      </aside>

      <div
        className={`transition-all duration-300 ${
          isCollapsed ? "mr-24" : "mr-72"
        }`}
      />
    </>
  );
};

export default Sidebar;
