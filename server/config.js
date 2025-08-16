// Configuration file for the server
const config = {
  // MongoDB Connection - Using MongoDB Atlas
  MONGO_URI: process.env.MONGO_URI || "mongodb+srv://Maren:MAREN81MAREN@maren.nyh3eog.mongodb.net/maren_db?retryWrites=true&w=majority&appName=Maren",
  
  // Server Configuration
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",
  
  // CORS Configuration
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:5173",
  
  // JWT Secret (for authentication if needed later)
  JWT_SECRET: process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production"
};

export default config;
