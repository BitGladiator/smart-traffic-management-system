import React, { useEffect, useState } from 'react';
import { Routes, Route, useSearchParams, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

// Import page components
import OverviewPage from './pages/OverviewPage';
import MapViewPage from './pages/MapViewPage';
import AnalyticsPage from './pages/AnalyticsPage';
import AlertsPage from './pages/AlertsPage';
import UsersPage from './pages/UsersPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      try {
        // Check for token in multiple places
        const urlToken = searchParams.get('token');
        const localToken = localStorage.getItem('token');
        const sessionToken = sessionStorage.getItem('dashboard_token');
        
        const token = urlToken || localToken || sessionToken;

        console.log('Auth Check:', {
          urlToken: !!urlToken,
          localToken: !!localToken,
          sessionToken: !!sessionToken,
          finalToken: !!token
        });

        if (!token) {
          console.log('No token found, redirecting to login');
          redirectToLogin();
          return;
        }

        // Store token if it came from URL
        if (urlToken) {
          localStorage.setItem('token', urlToken);
          sessionStorage.setItem('dashboard_token', urlToken);
        }

        // Get user data from URL or localStorage
        let userData = null;

        // Try URL params first
        const userName = searchParams.get('userName');
        const userEmail = searchParams.get('userEmail');
        const userId = searchParams.get('userId');

        if (userName && userEmail) {
          userData = {
            id: userId || '1',
            name: decodeURIComponent(userName),
            email: decodeURIComponent(userEmail),
            role: searchParams.get('userRole') || 'user'
          };
          localStorage.setItem('user', JSON.stringify(userData));
        } else {
          // Try localStorage
          const localUser = localStorage.getItem('user');
          if (localUser) {
            try {
              userData = JSON.parse(localUser);
            } catch (e) {
              console.error('Error parsing user data:', e);
            }
          }
        }

        // Fallback user data
        if (!userData) {
          userData = {
            id: '1',
            name: 'User',
            email: 'user@stms.ai',
            role: 'user'
          };
        }

        console.log('Setting user:', userData);
        setUser(userData);
        setIsAuthenticated(true);

        // Clean up URL parameters after successful auth
        if (urlToken) {
          window.history.replaceState({}, document.title, window.location.pathname);
        }

      } catch (error) {
        console.error('Auth check error:', error);
        redirectToLogin();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [searchParams]);

  const redirectToLogin = () => {
    const mainAppUrl =
      process.env.NODE_ENV === 'production'
        ? 'https://smart-traffic-management-system-black-kappa.vercel.app'
        : 'http://localhost:3000';

    setTimeout(() => {
      window.location.href = `${mainAppUrl}/login`;
    }, 1500);
  };

  const handleLogout = () => {
    // Clear all auth data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.clear();

    const clientUrl =
      process.env.NODE_ENV === 'production'
        ? 'https://smart-traffic-management-system-black-kappa.vercel.app'
        : 'http://localhost:3000';

    window.location.href = `${clientUrl}/logout`;
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-6"></div>
          <p className="text-gray-400">Initializing dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-500 border-t-transparent mx-auto mb-6"></div>
          <h2 className="text-2xl font-semibold text-gray-200 mb-3">
            Authentication Required
          </h2>
          <p className="text-gray-400">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex">
      <Sidebar
        collapsed={sidebarCollapsed}
        user={user}
        onLogout={handleLogout}
        toggleSidebar={toggleSidebar}
      />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarCollapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        <Header
          user={user}
          onToggleSidebar={toggleSidebar}
          sidebarCollapsed={sidebarCollapsed}
        />

        <main className="flex-1 p-6 overflow-auto">
          <Routes>
            <Route path="/" element={<OverviewPage />} />
            <Route path="/map" element={<MapViewPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;