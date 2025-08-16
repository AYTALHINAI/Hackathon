import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { SettingsProvider } from "./context/SettingsContext";
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";
import Login from "./PAGES/Login";
import Forgot from "./PAGES/Forgot";
import VerifyOTP from "./PAGES/VerifyOTP";
import Settings from "./PAGES/Settings";
import Profile from "./PAGES/Profile";


// HR Pages
import HRPage from "./HR/HRPage";
import DB from "./HR/Database";
import JobPost from "./HR/JobPost";
import Attachment from "./HR/JobAnnouncement/Attachments";
import JobPostFormPage from "./HR/JobAnnouncement/JobPostFormPage";
import AllJobPost from "./HR/JobAnnouncement/AllJobPosts";
import NewJob from "./HR/JobInterview/NewJob";
import JobTracking from "./HR/JobInterview/JobTracking";
import EvaluationFormPage from "./HR/JobInterview/Evaluation";
import FinalSummary from "./HR/JobInterview/FinalSummary";
import CandidateDetailsModal from "./HR/JobInterview/CandidateDetailsModal";
import JobApplicants from "./HR/JobApplicants";
import EmployeeDetailsPage from "./HR/EmployeeDetailsPage";
import HRFAQ from "./HR/HRFAQ";


// EMP Pages
import EmployeePage from "./EMP/EmployeePage";
import Care from "./EMP/Care";
import ChatBot from "./components/ChatBot";
import JobAnnouncements from "./EMP/JobAnnouncements";
import PDFRequestForm from "./EMP/PDFRequestForm";
import FAQ from "./EMP/FAQ";

// Theme-aware toast container component
const ThemeAwareToasts = () => {
  const { theme } = useTheme();
  
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: theme === 'dark' ? '#374151' : '#ffffff',
            color: theme === 'dark' ? '#f9fafb' : '#111827',
            border: theme === 'dark' ? '1px solid #4b5563' : '1px solid #e5e7eb',
            fontFamily: 'Cairo, sans-serif',
            direction: 'rtl',
            borderRadius: '12px',
            boxShadow: theme === 'dark' 
              ? '0 10px 15px -3px rgba(0, 0, 0, 0.5)' 
              : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          },
          success: {
            iconTheme: {
              primary: theme === 'dark' ? '#10b981' : '#059669',
              secondary: theme === 'dark' ? '#f9fafb' : '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: theme === 'dark' ? '#ef4444' : '#dc2626',
              secondary: theme === 'dark' ? '#f9fafb' : '#ffffff',
            },
          },
          loading: {
            iconTheme: {
              primary: theme === 'dark' ? '#3b82f6' : '#2563eb',
              secondary: theme === 'dark' ? '#f9fafb' : '#ffffff',
            },
          },
        }}
      />
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
        toastStyle={{
          fontFamily: 'Cairo, sans-serif',
          direction: 'rtl',
        }}
      />
    </>
  );
};

// Global scroll-to-top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

const AppRoutes = () => {
  return (
    <Router>
      <ThemeAwareToasts />
      <ScrollToTop />
      <div className="min-h-dvh bg-background text-foreground transition-colors duration-300">
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/verify" element={<VerifyOTP />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />

        {/* HR Routes */}
        <Route path="/hr" element={<HRPage />} />
        <Route path="/db" element={<DB />} />
        <Route path="/jobpost" element={<JobPost />} />
        <Route path="/Attachment" element={<Attachment />} />
        <Route path="/jobpostform" element={<JobPostFormPage />} />
        <Route path="/alljobpost" element={<AllJobPost />} />
        <Route path="/newjob" element={<NewJob />} />
        <Route path="/job-tracking" element={<JobTracking />} />
        <Route path="/evaluation" element={<EvaluationFormPage />} />
        <Route path="/finalsummary" element={<FinalSummary />} />
        <Route path="/hr-faq" element={<HRFAQ />} />
        <Route
          path="/candidatedetailsmodal"
          element={<CandidateDetailsModal />}
        />
        <Route path="/job-applicants" element={<JobApplicants />} />
        <Route path="/employee-details/:id" element={<EmployeeDetailsPage />} />



        {/* EMP Routes */}
        <Route path="/employee" element={<EmployeePage />} />
                    <Route path="/care" element={<Care />} />
            <Route path="/chatbot" element={<ChatBot />} />
            <Route path="/job-announcements" element={<JobAnnouncements />} />
            <Route path="/pdf-request" element={<PDFRequestForm />} />
            <Route path="/faq" element={<FAQ />} />
        </Routes>
      </div>
    </Router>
  );
};

const App = () => {
  return (
    <SettingsProvider>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </SettingsProvider>
  );
};

export default App;
