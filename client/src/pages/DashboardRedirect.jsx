import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2, AlertCircle } from 'lucide-react';

function DashboardRedirect() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if dashboard folder exists and redirect
    // For now, we'll show a message since dashboard is separate
    const timer = setTimeout(() => {
      // In a real app, you would redirect to the actual dashboard URL
      // window.location.href = '/dashboard-app';
      // For this demo, we'll just show a message
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="max-w-md w-full text-center">
        <div className="bg-primary-50 p-6 rounded-2xl mb-6">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-primary-600 animate-spin" />
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome to Dashboard, {user?.name}!
          </h2>
          
          <p className="text-gray-600 mb-6">
            You are being redirected to the main dashboard interface...
          </p>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
              <div className="text-left">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> The dashboard interface is hosted separately. 
                  In production, you would be redirected to the full dashboard application.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm text-gray-500 mb-4">
              Your dashboard features would include:
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-3 rounded-lg shadow-sm text-sm">
                Traffic Analytics
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm text-sm">
                Signal Control
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm text-sm">
                Reports
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm text-sm">
                Alerts
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate('/')}
          className="btn-secondary"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default DashboardRedirect;