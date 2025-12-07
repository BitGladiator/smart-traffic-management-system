import React from 'react';
import Dashboard from '../components/Dashboard';
import IntersectionList from '../components/IntersectionList';
import TrafficChart from '../components/TrafficChart';
import AlertPanel from '../components/AlertPanel';
import { Menu, Bell, Search, Home as HomeIcon, Activity } from 'lucide-react';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/20">
      {/* Header - Fixed for mobile */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-primary-900 to-primary-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center justify-between sm:justify-start">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-lg">
                  <Activity className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Smart Traffic Management</h1>
                  <p className="text-primary-200 text-xs sm:text-sm mt-1 hidden sm:block">
                    Real-time monitoring and optimization dashboard
                  </p>
                </div>
              </div>
              <button className="sm:hidden p-2 bg-white/10 rounded-lg">
                <Menu className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full sm:w-48 pl-10 pr-4 py-2 bg-white/10 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>
              <button className="p-2 bg-white/10 rounded-lg relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-primary-900"></span>
              </button>
            </div>
          </div>
          
          {/* Mobile description */}
          <p className="text-primary-200 text-sm mt-3 sm:hidden">
            Real-time monitoring and optimization dashboard
          </p>
        </div>
      </header>
      
      {/* Main Content - Responsive Grid */}
      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8">
        {/* Top Stats Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">System Overview</h2>
            <div className="text-xs sm:text-sm text-gray-500">
              Last updated: <span className="font-medium text-primary-600">Just now</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 mb-1">Active Cameras</p>
                  <p className="text-lg sm:text-xl font-bold text-gray-800">24</p>
                </div>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <HomeIcon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                </div>
              </div>
              <div className="mt-2 text-xs text-emerald-600">↑ 3 from yesterday</div>
            </div>
            
            <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 mb-1">Traffic Flow</p>
                  <p className="text-lg sm:text-xl font-bold text-gray-800">82%</p>
                </div>
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600" />
                </div>
              </div>
              <div className="mt-2 text-xs text-emerald-600">Optimal conditions</div>
            </div>
            
            <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-200 hidden md:block">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 mb-1">Response Time</p>
                  <p className="text-lg sm:text-xl font-bold text-gray-800">1.8m</p>
                </div>
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
                </div>
              </div>
              <div className="mt-2 text-xs text-emerald-600">↓ 0.3m avg</div>
            </div>
            
            <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-200 hidden md:block">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 mb-1">Incidents</p>
                  <p className="text-lg sm:text-xl font-bold text-gray-800">2</p>
                </div>
                <div className="p-2 bg-red-100 rounded-lg">
                  <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                </div>
              </div>
              <div className="mt-2 text-xs text-red-600">1 high priority</div>
            </div>
          </div>
        </div>

        {/* Dashboard & Intersection - Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-primary-800 mb-4 pb-3 border-b border-gray-200">
              Dashboard Overview
            </h2>
            <Dashboard />
          </div>
          
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-bold text-primary-800">
                Intersection Status
              </h2>
              <button className="text-xs sm:text-sm text-primary-600 hover:text-primary-700 font-medium">
                View All →
              </button>
            </div>
            <IntersectionList />
          </div>
        </div>
        
        {/* Traffic Analytics */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 pb-3 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-bold text-primary-800 mb-2 sm:mb-0">
              Traffic Analytics
            </h2>
            <div className="flex items-center gap-2">
              <select className="text-xs sm:text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option>Last 24 hours</option>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
              </select>
              <button className="text-xs sm:text-sm text-primary-600 hover:text-primary-700 font-medium px-3 py-1.5">
                Export
              </button>
            </div>
          </div>
          <div className="h-[250px] sm:h-[300px] md:h-[350px]">
            <TrafficChart />
          </div>
        </div>
        
        {/* System Alerts */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-bold text-primary-800">
              System Alerts
            </h2>
            <button className="text-xs sm:text-sm text-primary-600 hover:text-primary-700 font-medium">
              Clear All
            </button>
          </div>
          <AlertPanel />
        </div>
      </main>
      
      {/* Footer - Responsive */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-6 mt-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Activity className="h-5 w-5 text-primary-400" />
                <span className="text-lg font-bold">STMS</span>
              </div>
              <p className="text-sm text-gray-400">
                Smart Traffic Management System for modern cities.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Quick Links</h3>
              <div className="space-y-2">
                <a href="#" className="block text-sm text-gray-400 hover:text-white">Dashboard</a>
                <a href="#" className="block text-sm text-gray-400 hover:text-white">Analytics</a>
                <a href="#" className="block text-sm text-gray-400 hover:text-white">Settings</a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Contact</h3>
              <p className="text-sm text-gray-400">support@stms.ai</p>
              <p className="text-sm text-gray-400">+1 (555) 123-4567</p>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-6 pt-6 text-center">
            <p className="text-sm text-gray-400">
              STMS Dashboard © 2025 | Smart Traffic Management System v2.5
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;