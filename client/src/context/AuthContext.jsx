import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Error parsing saved user:', e);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (userData, token) => {
    let finalToken = token;
    let finalUser = userData;
  
    if (!token || token.startsWith('mock-jwt-token')) {
      try {
        const API_BASE_URL = process.env.NODE_ENV === 'production' 
          ? 'https://smart-traffic-management-system-23fs.onrender.com' 
          : 'http://localhost:5500';
  
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: userData.email,
            password: userData.password || 'tempPassword123' 
          })
        });

        if (!response.ok) {
          throw new Error('Login failed');
        }

        const data = await response.json();
        finalToken = data.token;
        finalUser = data.user;
      } catch (error) {
        console.error('Login error:', error);
 
        console.warn('Using demo mode - payment features will not work');
      }
    }

    const completeUserData = {
      id: finalUser.id || finalUser._id || Date.now().toString(),
      name: finalUser.name || finalUser.email?.split('@')[0] || 'User',
      email: finalUser.email || 'user@stms.ai',
      role: finalUser.role || 'user',
      hasActiveSubscription: finalUser.hasActiveSubscription || false, 
      subscriptionPlan: finalUser.subscriptionPlan || null, 
      subscriptionStatus: finalUser.subscriptionStatus || 'none' 
    };
    
    console.log('AuthContext: Storing user data:', completeUserData);
    console.log('AuthContext: Storing token (first 20 chars):', finalToken.substring(0, 20));
    
    localStorage.setItem('token', finalToken);
    localStorage.setItem('user', JSON.stringify(completeUserData));
    setUser(completeUserData);
    setSubscriptionStatus(completeUserData.subscriptionStatus); 
  };
  const checkSubscription = async () => {
    try {
      const token = localStorage.getItem('token');
      const API_BASE_URL = process.env.NODE_ENV === 'production' 
        ? 'https://smart-traffic-management-system-23fs.onrender.com' 
        : 'http://localhost:5500';
  
      const response = await fetch(`${API_BASE_URL}/api/subscriptions/check-status`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      const data = await response.json();
      
      // Update user object with latest subscription status
      if (user) {
        const updatedUser = {
          ...user,
          hasActiveSubscription: data.hasActiveSubscription,
          subscriptionPlan: data.subscription?.planName || null,
          subscriptionStatus: data.subscription?.status || 'none'
        };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setSubscriptionStatus(data.subscription?.status || 'none');
      }
    } catch (error) {
      console.error('Error checking subscription:', error);
    }
  };
  const signup = async (userData, token) => {
    let finalToken = token;
    let finalUser = userData;
  
    if (!token || token.startsWith('mock-jwt-token')) {
      try {
        const API_BASE_URL = process.env.NODE_ENV === 'production' 
          ? 'https://smart-traffic-management-system-23fs.onrender.com' 
          : 'http://localhost:5500';
  
        console.log('Signup API URL:', `${API_BASE_URL}/api/auth/register`);
        console.log('Signup payload:', {
          name: userData.name,
          email: userData.email,
          password: userData.password || 'tempPassword123'
        });
  
        const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: userData.name,
            email: userData.email,
            password: userData.password || 'tempPassword123'
          })
        });
  
        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));
  
        // Get response text first to handle both JSON and text errors
        const responseText = await response.text();
        console.log('Response text:', responseText);
  
        if (!response.ok) {
          let errorMessage = 'Registration failed';
          
          try {
            // Try to parse as JSON
            const errorData = JSON.parse(responseText);
            errorMessage = errorData.message || errorData.error || 
                          `Server error: ${response.status}`;
          } catch (parseError) {
            // If not JSON, use text
            errorMessage = responseText || `Server error: ${response.status}`;
          }
          
          console.error('Signup API error:', errorMessage);
          throw new Error(errorMessage);
        }
  
        // Parse successful response
        const data = JSON.parse(responseText);
        console.log('Signup success:', data);
        finalToken = data.token;
        finalUser = data.user;
        
      } catch (error) {
        console.error('Signup fetch error:', error);
        
        // Better error messages
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
          throw new Error('Network error. Please check if backend is running at http://localhost:5500');
        }
        
        if (error.message.includes('500')) {
          throw new Error('Server error. The backend encountered an internal error.');
        }
        
        throw error;
      }
    }
  
    const completeUserData = {
      id: finalUser.id || finalUser._id || Date.now().toString(),
      name: finalUser.name || userData.name || 'User',
      email: finalUser.email || userData.email || '',
      role: finalUser.role || 'user'
    };
    
    console.log('AuthContext: Storing user data:', completeUserData);
    console.log('AuthContext: Storing token (first 20 chars):', finalToken?.substring(0, 20));
    
    localStorage.setItem('token', finalToken);
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
    loading,
    subscriptionStatus, 
    checkSubscription 
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};