# 🚀 MAREN HR System - Render Deployment Guide

This guide will help you deploy the MAREN HR System to Render, a cloud platform that offers free hosting for web applications.

## 📋 Prerequisites

1. **GitHub Repository**: Your code should be pushed to GitHub
2. **Render Account**: Sign up at [render.com](https://render.com)
3. **MongoDB Atlas**: Your database should be set up on MongoDB Atlas

## 🎯 Deployment Strategy

We'll deploy two services:
- **Backend API** (Node.js/Express)
- **Frontend** (React/Vite Static Site)

## 🔧 Step 1: Prepare Your Repository

### 1.1 Environment Variables
Make sure your `.env` file in the `server/` directory contains:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
NODE_ENV=production
```

### 1.2 API Configuration
The frontend is configured to use environment variables for the API URL:
- Development: `http://localhost:5000/api`
- Production: `https://your-backend-service.onrender.com/api`

## 🌐 Step 2: Deploy Backend API

### 2.1 Create Backend Service
1. Go to [render.com](https://render.com) and sign in
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the service:

**Basic Settings:**
- **Name**: `maren-backend` (or your preferred name)
- **Environment**: `Node`
- **Region**: Choose closest to your users
- **Branch**: `main`
- **Root Directory**: Leave empty (deploy from root)

**Build & Deploy Settings:**
- **Build Command**: `cd server && npm install`
- **Start Command**: `cd server && npm start`

### 2.2 Environment Variables
Add these environment variables in Render dashboard:
- `NODE_ENV`: `production`
- `PORT`: `10000` (Render will override this)
- `MONGO_URI`: Your MongoDB Atlas connection string

### 2.3 Deploy
Click **"Create Web Service"** and wait for deployment.

## 🎨 Step 3: Deploy Frontend

### 3.1 Create Static Site
1. In Render dashboard, click **"New +"** → **"Static Site"**
2. Connect your GitHub repository
3. Configure the service:

**Basic Settings:**
- **Name**: `maren-frontend` (or your preferred name)
- **Branch**: `main`
- **Root Directory**: Leave empty

**Build & Deploy Settings:**
- **Build Command**: `npm ci && npm run build`
- **Publish Directory**: `dist`

### 3.2 Environment Variables
Add this environment variable:
- `VITE_API_URL`: `https://your-backend-service-name.onrender.com`

**Note**: Replace `your-backend-service-name` with the actual name you used for your backend service.

### 3.3 Deploy
Click **"Create Static Site"** and wait for deployment.

## 🔗 Step 4: Update CORS Configuration

After both services are deployed, update your backend CORS configuration in `server/Server.js`:

```javascript
app.use(cors({
  origin: [
    'https://your-frontend-service-name.onrender.com',
    'http://localhost:3000'
  ],
  credentials: true
}));
```

Redeploy the backend service after making this change.

## ✅ Step 5: Test Your Deployment

1. **Backend Health Check**: Visit `https://your-backend-service.onrender.com/health`
2. **Frontend**: Visit your frontend URL
3. **Test Login**: Use the credentials:
   - HR: `1` / `password1`
   - Employee: `2` / `password2`

## 🔧 Troubleshooting

### Common Issues:

1. **Build Failures**:
   - Check build logs in Render dashboard
   - Ensure all dependencies are in `package.json`

2. **API Connection Issues**:
   - Verify `VITE_API_URL` environment variable
   - Check CORS configuration
   - Test backend health endpoint

3. **Database Connection**:
   - Verify MongoDB Atlas connection string
   - Check network access settings in MongoDB Atlas

4. **Environment Variables**:
   - Ensure all required variables are set in Render dashboard
   - Check variable names match exactly

### Useful Commands:
```bash
# Check backend logs
# Use Render dashboard → Logs tab

# Test API locally
curl http://localhost:5000/health

# Test production API
curl https://your-backend-service.onrender.com/health
```

## 📞 Support

If you encounter issues:
1. Check Render deployment logs
2. Verify environment variables
3. Test API endpoints manually
4. Check MongoDB Atlas connection

## 🎉 Success!

Once deployed, your MAREN HR System will be accessible at:
- **Frontend**: `https://your-frontend-service.onrender.com`
- **Backend API**: `https://your-backend-service.onrender.com`

Your application is now live and accessible from anywhere! 🌍
