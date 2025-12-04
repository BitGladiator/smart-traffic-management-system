import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = () => {
      logout();
      
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    };
    
    performLogout();
  }, [logout, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Logging out...</h2>
        <p className="text-gray-600">You are being signed out of the system.</p>
      </div>
    </div>
  );
}

export default Logout;