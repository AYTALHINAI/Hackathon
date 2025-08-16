import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (credentials) => {
    try {
      // Simulate API call - replace with actual authentication logic
      const { email, password } = credentials;
      
      // Simple validation
      if (!email || !password) {
        return { success: false, error: 'يرجى إدخال البريد الإلكتروني وكلمة المرور' };
      }

      // Mock authentication - replace with actual API call
      if (email === 'admin@maren.com' && password === 'password') {
        const mockUser = {
          id: 1,
          email: email,
          name: 'Admin User',
          role: 'admin'
        };
        
        setUser(mockUser);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return { success: false, error: 'بيانات الدخول غير صحيحة' };
      }
    } catch (error) {
      return { success: false, error: 'حدث خطأ أثناء تسجيل الدخول' };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

