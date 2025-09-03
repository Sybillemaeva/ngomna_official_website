import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth token
    const token = localStorage.getItem('admin_token');
    const userData = localStorage.getItem('admin_user');
    
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
    
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock authentication - replace with real API call
    if (email === 'admin@ngomna.com' && password === 'admin123') {
      const userData = {
        id: 1,
        name: 'Admin User',
        email: 'admin@ngomna.com',
        role: 'administrator'
      };
      
      localStorage.setItem('admin_token', 'mock_token_123');
      localStorage.setItem('admin_user', JSON.stringify(userData));
      
      setIsAuthenticated(true);
      setUser(userData);
      return { success: true };
    }
    
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      loading,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};