import React from 'react';
import TrafficLight from './TrafficLight';
import { Activity, AlertTriangle, Clock, MapPin } from 'lucide-react';

function Dashboard() {
  const stats = [
    { label: 'Active Intersections', value: '12', icon: MapPin, color: 'text-blue-600' },
    { label: 'Active Alerts', value: '3', icon: AlertTriangle, color: 'text-red-600' },
    { label: 'Avg Wait Time', value: '45s', icon: Clock, color: 'text-amber-600' },
    { label: 'System Load', value: 'Medium', icon: Activity, color: 'text-green-600' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">System Overview</h2>
      
      <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
        <TrafficLight status="Medium" />
        
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Current Traffic Status</h3>
          <p className="text-3xl font-bold text-amber-600 mb-4">Moderate Congestion</p>
          <p className="text-gray-600">System operating within normal parameters</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="flex justify-center mb-2">
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 flex gap-3">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Refresh Data
        </button>
        <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
          Simulate Peak Hour
        </button>
      </div>
    </div>
  );
}

export default Dashboard;