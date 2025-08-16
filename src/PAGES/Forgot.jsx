import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSendOTP = (e) => {
    e.preventDefault();

    // TODO: Replace with actual email sending logic
    console.log("OTP sent to:", email);

    toast.success("✓ تم إرسال الرمز بنجاح", {
      icon: "📧",
      duration: 2500,
      position: "top-center",
      style: {
        fontFamily: "Cairo, sans-serif",
        direction: "rtl",
        padding: "16px",
        borderRadius: "12px",
        background: "#fef3c7",
        color: "#92400e",
        border: "1px solid #f59e0b",
      },
    });

    setTimeout(() => {
      navigate("/verify");
    }, 2000); // Same duration as toast
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-white" dir="rtl">
      {/* Logo */}
      <div className="mb-8">
        <img src="/assets/images/lOGO.svg" alt="MAREN Logo" className="h-20 w-auto" />
      </div>

      {/* Forgot Password Card */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg border border-gray-200 p-8">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">نسيت كلمة المرور؟</h2>
          <p className="text-sm text-gray-600">أدخل بريدك الإلكتروني الوظيفي لإرسال رمز تحقق</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSendOTP} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              البريد الإلكتروني الوظيفي
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="أدخل بريدك الإلكتروني"
              required
            />
          </div>

          {/* Send OTP Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-200 font-medium"
          >
            إرسال رمز التحقق
          </button>
        </form>

        {/* Back to Login Link */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-sm text-blue-600 hover:underline font-medium"
          >
            العودة إلى تسجيل الدخول
          </button>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
