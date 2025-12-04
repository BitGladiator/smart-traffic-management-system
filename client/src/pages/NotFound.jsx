import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';

function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-4">
            <AlertTriangle className="h-12 w-12 text-red-600" />
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link to="/" className="btn w-full flex items-center justify-center">
            <Home className="h-5 w-5 mr-2" />
            Back to Homepage
          </Link>
          <Link to="/dashboard" className="btn-secondary w-full">
            Go to Dashboard
          </Link>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            If you believe this is an error, please{' '}
            <Link to="/contact" className="text-primary-600 hover:text-primary-500">
              contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;