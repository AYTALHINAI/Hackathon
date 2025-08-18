import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { showNotification } from "../lib/api";

const LoginPage = () => {
  const navigate = useNavigate();
  const [civilId, setCivilId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!civilId || !password) {
      showNotification("الرجاء إدخال الرقم الوظيفي وكلمة المرور", "error");
      return;
    }

    // Format the civil ID into email format
    const email = `${civilId}@maren.gov.om`;
    
    // Simple validation - in a real app, this would be an API call
    if (civilId === "1" && password === "password1") {
      localStorage.setItem("id", civilId);
      navigate("/hr");
    } else if (civilId === "2" && password === "password2") {
      localStorage.setItem("id", civilId);
      navigate("/employee");
    } else if (civilId === "3" && password === "password3") {
      localStorage.setItem("id", civilId);
      navigate("/employee");
    } else {
      // Generic error message to prevent brute force attacks
      showNotification("الرقم الوظيفي وكلمة المرور غير متطابقين", "error");
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot");
  };

  const handleCivilIdChange = (e) => {
    // Only allow numbers
    const value = e.target.value.replace(/[^0-9]/g, '');
    setCivilId(value);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-white" dir="rtl">
      {/* Logo */}
      <div className="mb-8">
        <img src="/assets/images/lOGO.svg" alt="MAREN Logo" className="h-20 w-auto" onError={(e) => {
          console.log('Logo failed to load:', e.target.src);
          e.target.style.display = 'none';
        }} />
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg border border-gray-200 p-8">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">تسجيل الدخول إلى حسابك</h2>
          <p className="text-sm text-gray-600">أدخل بريدك الإلكتروني أدناه لتسجيل الدخول إلى حسابك</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              الرقم الوظيفي
            </label>
            <input
              id="email"
              type="text"
              value={civilId}
              onChange={handleCivilIdChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="12345678"
              required
            />
            {civilId && (
              <p className="text-xs text-gray-500 mt-1" dir="ltr">
                {civilId}@maren.gov.om : البريد الإلكتروني الكامل
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              كلمة المرور
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-200 font-medium"
          >
            تسجيل الدخول
          </button>

          {/* Forgot Password Link */}
          <div className="text-center">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-blue-600 hover:underline font-medium"
            >
              نسيت كلمة المرور؟
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
