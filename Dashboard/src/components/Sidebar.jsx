import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map, 
  BarChart3, 
  Settings, 
  Bell, 
  Users,
  LogOut,
  TrafficCone
} from 'lucide-react';

function Sidebar({ collapsed, user, onLogout, toggleSidebar }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/' },
    { icon: Map, label: 'Map View', path: '/map' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: Bell, label: 'Alerts', path: '/alerts' },
    { icon: Users, label: 'Users', path: '/users' },
    { icon: Settings, label: 'Settings', path: '/settings' }
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className={`fixed left-0 top-0 h-screen bg-gray-900 border-r border-gray-800 flex flex-col transition-all duration-300 z-20 ${collapsed ? 'w-20' : 'w-64'}`}>
      <div className="p-6 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <TrafficCone className="h-6 w-6" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold text-white">STMS</h1>
              <p className="text-xs text-gray-400">Dashboard</p>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <li key={index}>
                <button 
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                    active 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                  title={collapsed ? item.label : ''}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && <span className="font-medium">{item.label}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-800">
        {user && !collapsed && (
          <div className="mb-4 p-3 bg-gray-800 rounded-xl">
            <p className="text-sm font-medium text-white">{user.name || 'User'}</p>
            <p className="text-xs text-gray-400">{user.email || user.name || 'user@stms.ai'}</p>
          </div>
        )}
        
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-xl transition-colors"
          title={collapsed ? 'Logout' : ''}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;