import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  الرقم_المدني: {
    type: String,
    required: true,
    unique: true
  },
  الاسم: {
    type: String,
    required: true
  },
  موقع_العمل: {
    type: [String], // Array of workplace locations
    required: true
  },
  الوظيفة: {
    type: String,
    required: true
  },
  الجنس: {
    type: String,
    enum: ["ذكر", "أنثى"],
    required: true
  },
  تاريخ_الميلاد: {
    type: Date,
    required: true
  },
  الدرجة: {
    type: String,
    required: true
  },
  منطقة_العمل: {
    type: String,
    required: true
  },
  مقر_العمل: {
    type: String,
    required: true
  },
  تاريخ_التعيين: {
    type: Date,
    required: true
  },
  المجموعة_النوعية_للوظائف: {
    type: String,
    required: true
  },
  تاريخ_شغل_الدرجة: {
    type: Date,
    required: false
  },
  تاريخ_شغل_الوظيفة: {
    type: Date,
    required: false
  },
  رقم_الهاتف: {
    type: String,
    required: false
  }
}, { timestamps: true });

export default mongoose.model("Employee", employeeSchema);
