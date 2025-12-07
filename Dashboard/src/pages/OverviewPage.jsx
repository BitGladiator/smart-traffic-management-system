import React from 'react';
import DashboardGrid from '../components/DashboardGrid';
import AnalyticsPanel from '../components/AnalyticsPanel';
import MapView from '../components/MapView';
import { AlertTriangle, Clock, Navigation, TrendingUp, Activity, Menu, Search } from 'lucide-react';

function OverviewPage() {
  return (
    <div className="w-full px-4 py-6 max-w-[1920px] mx-auto">
      {/* Header - Responsive */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-200 mb-1 md:mb-2">Dashboard Overview</h1>
            <p className="text-sm md:text-base text-gray-400">Real-time traffic monitoring and system insights</p>
          </div>
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="flex items-center space-x-2 px-3 md:px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-xs md:text-sm text-gray-300">System Active</span>
            </div>
            <div className="text-xs md:text-sm text-gray-400 hidden sm:block">
              Updated: Just now
            </div>
          </div>
        </div>
        
        {/* Quick Stats - Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-gradient-to-br from-blue-900/30 to-blue-900/10 rounded-xl p-3 sm:p-4 border border-blue-800/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-blue-400 mb-1">Active Cameras</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-200">15</p>
              </div>
              <Activity className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400/50" />
            </div>
            <div className="mt-1 sm:mt-2 text-xs text-blue-300">↑ 2 from yesterday</div>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-900/30 to-emerald-900/10 rounded-xl p-3 sm:p-4 border border-emerald-800/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-emerald-400 mb-1">Traffic Flow</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-200">78%</p>
              </div>
              <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-400/50" />
            </div>
            <div className="mt-1 sm:mt-2 text-xs text-emerald-300">Optimal conditions</div>
          </div>
          
          <div className="bg-gradient-to-br from-amber-900/30 to-amber-900/10 rounded-xl p-3 sm:p-4 border border-amber-800/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-amber-400 mb-1">Response Time</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-200">2.4m</p>
              </div>
              <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-amber-400/50" />
            </div>
            <div className="mt-1 sm:mt-2 text-xs text-amber-300">↓ 0.5m avg</div>
          </div>
          
          <div className="bg-gradient-to-br from-red-900/30 to-red-900/10 rounded-xl p-3 sm:p-4 border border-red-800/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-red-400 mb-1">Active Incidents</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-200">3</p>
              </div>
              <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8 text-red-400/50" />
            </div>
            <div className="mt-1 sm:mt-2 text-xs text-red-300">2 high priority</div>
          </div>
        </div>
      </div>

      {/* Main Content Grid - Fully Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
        {/* Left Column - Map & Analytics */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Map Section */}
          <div className="bg-gray-900 rounded-xl sm:rounded-2xl border border-gray-800">
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Navigation className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-200">Interactive City Map</h2>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 sm:px-3 sm:py-1 text-xs bg-gray-800 text-gray-300 rounded-full">Live</span>
                  <button className="px-2 sm:px-3 py-1 sm:py-1 text-xs sm:text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors">
                    Refresh
                  </button>
                </div>
              </div>
            </div>
            <div className="p-1 sm:p-2">
              <div className="h-[300px] sm:h-[400px] lg:h-[500px]">
                <MapView />
              </div>
            </div>
          </div>

          {/* Analytics Panel */}
          <AnalyticsPanel />
        </div>

        {/* Right Column - Status & Incidents */}
        <div className="space-y-4 sm:space-y-6">
          {/* Dashboard Grid */}
          <div className="bg-gray-900 rounded-xl sm:rounded-2xl border border-gray-800">
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-800">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-200">System Status</h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">Real-time system metrics</p>
            </div>
            <div className="p-4 sm:p-6">
              <DashboardGrid />
            </div>
          </div>

          {/* Recent Incidents */}
          <div className="bg-gray-900 rounded-xl sm:rounded-2xl border border-gray-800">
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" />
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-200">Recent Incidents</h2>
                </div>
                <span className="text-xs text-gray-400">Last 60 minutes</span>
              </div>
            </div>
            
            <div className="divide-y divide-gray-800/50 max-h-[400px] overflow-y-auto">
              {[
                { 
                  location: 'Main St & 1st Ave', 
                  type: 'Vehicle Accident', 
                  time: '5 min ago', 
                  priority: 'high',
                  severity: 'Critical'
                },
                { 
                  location: 'Broadway & 5th', 
                  type: 'Major Traffic Jam', 
                  time: '12 min ago', 
                  priority: 'medium',
                  severity: 'High'
                },
                { 
                  location: 'Park Avenue', 
                  type: 'Road Construction', 
                  time: '25 min ago', 
                  priority: 'low',
                  severity: 'Medium'
                },
                { 
                  location: 'University Blvd', 
                  type: 'Signal Failure', 
                  time: '38 min ago', 
                  priority: 'high',
                  severity: 'Critical'
                },
                { 
                  location: 'Airport Expressway', 
                  type: 'Lane Closure', 
                  time: '45 min ago', 
                  priority: 'low',
                  severity: 'Low'
                }
              ].map((incident, index) => (
                <div 
                  key={index} 
                  className="p-3 sm:p-4 hover:bg-gray-800/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className={`flex-shrink-0 w-2 h-8 sm:w-10 sm:h-10 rounded sm:rounded-lg flex items-center justify-center text-sm sm:text-lg ${
                      incident.priority === 'high' ? 'bg-red-900/30' :
                      incident.priority === 'medium' ? 'bg-amber-900/30' :
                      'bg-emerald-900/30'
                    }`}>
                      <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                        incident.priority === 'high' ? 'bg-red-500' :
                        incident.priority === 'medium' ? 'bg-amber-500' :
                        'bg-emerald-500'
                      }`}></div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 gap-1">
                        <h4 className="text-sm sm:text-base font-medium text-gray-200 truncate">{incident.location}</h4>
                        <div className={`px-2 py-0.5 sm:py-1 rounded text-xs font-medium ${
                          incident.priority === 'high' ? 'bg-red-900/50 text-red-300' :
                          incident.priority === 'medium' ? 'bg-amber-900/50 text-amber-300' :
                          'bg-emerald-900/50 text-emerald-300'
                        }`}>
                          {incident.severity}
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-400 mb-2">{incident.type}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 text-xs text-gray-500">
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1 hidden sm:block" />
                            {incident.time}
                          </span>
                        </div>
                        <button className="text-blue-400 hover:text-blue-300 text-xs font-medium">
                          View →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-800">
              <button className="w-full py-2 sm:py-3 text-center text-gray-400 hover:text-gray-300 text-sm font-medium bg-gray-800/30 hover:bg-gray-800/50 rounded-lg transition-colors">
                View All Incidents
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverviewPage;