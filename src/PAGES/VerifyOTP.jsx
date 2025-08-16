import React, { useState } from "react";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");

  const handleVerify = (e) => {
    e.preventDefault();
    // TODO: Add logic to verify the OTP code
    console.log("OTP entered:", otp);
    alert("تم التحقق من الرمز بنجاح"); // Replace with actual logic
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-white" dir="rtl">
      {/* Logo */}
      <div className="mb-8">
        <img src="/assets/images/lOGO.svg" alt="MAREN Logo" className="h-20 w-auto" />
      </div>

      {/* Verify OTP Card */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg border border-gray-200 p-8">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">رمز التحقق</h2>
          <p className="text-sm text-gray-600">أدخل رمز التحقق المرسل إلى بريدك الإلكتروني</p>
        </div>

        {/* Form */}
        <form onSubmit={handleVerify} className="space-y-6">
          {/* OTP Field */}
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
              رمز التحقق
            </label>
            <input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="أدخل الرمز هنا"
              required
            />
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-200 font-medium"
          >
            تحقق
          </button>
        </form>

        {/* Resend Link */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => (window.location.href = "/forgot")}
            className="text-sm text-blue-600 hover:underline font-medium"
          >
            لم تستلم الرمز؟ إعادة الإرسال
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
