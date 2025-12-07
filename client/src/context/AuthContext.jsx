import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    const completeUserData = {
      id: userData.id || Date.now().toString(),
      name: userData.name || userData.email?.split('@')[0] || 'User',
      email: userData.email || 'user@stms.ai',
      role: userData.role || 'user'
    };
    
    console.log('AuthContext: Storing user data:', completeUserData); // Debug
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(completeUserData));
    setUser(completeUserData);
  };
  
  const signup = (userData, token) => {
    // Ensure userData has all required fields
    const completeUserData = {
      id: userData.id || Date.now().toString(),
      name: userData.name || userData.email?.split('@')[0] || 'User',
      email: userData.email || '',
      role: userData.role || 'user'
    };
    
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(completeUserData));
    setUser(completeUserData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.clear();
    setUser(null);
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};