import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

function DashboardRedirect() {
  const { user } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      const dashboardUrl = process.env.NODE_ENV === 'production' 
        ? '/dashboard' 
        : 'http://localhost:3001';
      
      const params = new URLSearchParams();
      
      if (user) {
        params.append('userId', user.id || '1');
        params.append('userName', encodeURIComponent(user.name || 'User'));
      }
      
      const token = localStorage.getItem('token');
      if (token) {
        params.append('token', token);
      }
      
      window.location.href = `${dashboardUrl}?${params.toString()}`;
    }, 1500);

    return () => clearTimeout(timer);
  }, [user]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-6"></div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Dashboard Access Granted
        </h2>
        <p className="text-gray-600 mb-6">
          Welcome back, {user?.name || 'User'}! Redirecting you to the dashboard interface...
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> The dashboard runs as a separate application.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DashboardRedirect;