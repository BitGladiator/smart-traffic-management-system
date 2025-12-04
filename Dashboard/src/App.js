import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardGrid from './components/DashboardGrid';
import AnalyticsPanel from './components/AnalyticsPanel';
import MapView from './components/MapView';

function App() {
  const [searchParams] = useSearchParams();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = searchParams.get('token') || localStorage.getItem('token');
      
      if (token) {
        sessionStorage.setItem('dashboard_token', token);
        const localUser = localStorage.getItem('user');
        console.log('Raw user data from localStorage:', localUser); // Debug log
        if (localUser) {
          try {
            const parsedUser = JSON.parse(localUser);
            console.log('Parsed user data:', parsedUser); // Debug log
            setUser(parsedUser);
          } catch (e) {
            console.error('Error parsing user data:', e);
          }
        }
        setIsAuthenticated(true);
      } else {
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
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                <MapView />
              </div>
              <div>
                <DashboardGrid />
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnalyticsPanel />
              <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
                <h3 className="text-xl font-semibold text-gray-200 mb-6">Recent Incidents</h3>
                <div className="space-y-4">
                  {[
                    { location: 'Main St & 1st Ave', type: 'Accident', time: '5 min ago', priority: 'high' },
                    { location: 'Broadway & 5th', type: 'Traffic Jam', time: '12 min ago', priority: 'medium' },
                    { location: 'Park Avenue', type: 'Road Work', time: '25 min ago', priority: 'low' },
                    { location: 'University Blvd', type: 'Signal Failure', time: '38 min ago', priority: 'high' }
                  ].map((incident, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${incident.priority === 'high' ? 'bg-red-500' : incident.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                        <div>
                          <h4 className="font-medium text-gray-200">{incident.location}</h4>
                          <p className="text-sm text-gray-400">{incident.type}</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-400">{incident.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;