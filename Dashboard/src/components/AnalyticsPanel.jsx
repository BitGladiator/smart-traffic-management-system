import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Area, AreaChart } from 'recharts';

function AnalyticsPanel() {
  const trafficData = [
    { hour: '6 AM', vehicles: 450, incidents: 2 },
    { hour: '8 AM', vehicles: 1200, incidents: 5 },
    { hour: '10 AM', vehicles: 850, incidents: 3 },
    { hour: '12 PM', vehicles: 950, incidents: 4 },
    { hour: '2 PM', vehicles: 700, incidents: 2 },
    { hour: '4 PM', vehicles: 1350, incidents: 7 },
    { hour: '6 PM', vehicles: 1100, incidents: 5 },
    { hour: '8 PM', vehicles: 600, incidents: 2 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const vehicles = payload[0]?.value || 0;
      const incidents = payload[1]?.value || 0;
      
      return (
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 shadow-xl">
          <p className="text-sm font-medium text-white mb-1">{label}</p>
          <p className="text-sm text-blue-400">Vehicles: {vehicles.toLocaleString()}</p>
          <p className="text-sm text-red-400">Incidents: {incidents}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-200">Traffic Analytics</h3>
          <p className="text-sm text-gray-400">24-hour traffic patterns and trends</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <select className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>Last 24 hours</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last quarter</option>
          </select>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trafficData}>
            <defs>
              <linearGradient id="vehicleGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="hour" 
              stroke="#9ca3af"
              tick={{ fill: '#9ca3af' }}
            />
            <YAxis 
              stroke="#9ca3af"
              tick={{ fill: '#9ca3af' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="vehicles" 
              stroke="#3b82f6" 
              fill="url(#vehicleGradient)"
              strokeWidth={3}
            />
            <Line 
              type="monotone" 
              dataKey="incidents" 
              stroke="#ef4444" 
              strokeWidth={2}
              dot={{ stroke: '#ef4444', strokeWidth: 2, r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-gray-800/50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-300">Peak Hours</h4>
            <span className="text-sm text-green-400">+18%</span>
          </div>
          <p className="text-2xl font-bold text-white">4-6 PM</p>
          <p className="text-sm text-gray-400">Average 1,350 vehicles</p>
        </div>
        
        <div className="bg-gray-800/50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-300">Incident Rate</h4>
            <span className="text-sm text-red-400">-5%</span>
          </div>
          <p className="text-2xl font-bold text-white">3.8%</p>
          <p className="text-sm text-gray-400">Per 1,000 vehicles</p>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPanel;