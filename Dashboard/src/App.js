import React, { useEffect, useState } from 'react';
import { Routes, Route, useSearchParams, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardGrid from './components/DashboardGrid';
import AnalyticsPanel from './components/AnalyticsPanel';
import MapView from './components/MapView';

// Create separate page components
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
      // First check URL params for token
      const token = searchParams.get('token');
      
      if (token) {
        // Store token from URL
        localStorage.setItem('token', token);
        sessionStorage.setItem('dashboard_token', token);
      }
      
      // Then check if we have a valid token
      const storedToken = token || localStorage.getItem('token') || sessionStorage.getItem('dashboard_token');
      
      if (storedToken) {
        // Try to get user data from multiple sources
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
          // Store for future use
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
        
        // Set default user if nothing found
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
      } else {
        // No token found - redirect to login
        const mainAppUrl = process.env.NODE_ENV === 'production'
          ? window.location.origin.replace(/dashboard.*/, '')
          : 'http://localhost:3000';
        
        setTimeout(() => {
          window.location.href = `${mainAppUrl}/login`;
        }, 1500);
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, [searchParams]);

  const handleLogout = () => {
    const clientUrl = process.env.NODE_ENV === 'production'
      ? window.location.origin.replace(/dashboard.*/, '')
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
          <h2 className="text-2xl font-semibold text-gray-200 mb-3">Authentication Required</h2>
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
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
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