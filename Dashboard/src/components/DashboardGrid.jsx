import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, Clock, Car, TrafficCone } from 'lucide-react';

function DashboardGrid() {
  const stats = [
    {
      title: 'Total Vehicles',
      value: '1,248',
      change: '+12.5%',
      trend: 'up',
      icon: Car,
      color: 'bg-blue-500'
    },
    {
      title: 'Avg Speed',
      value: '38 km/h',
      change: '-2.3%',
      trend: 'down',
      icon: Clock,
      color: 'bg-green-500'
    },
    {
      title: 'Active Alerts',
      value: '7',
      change: '+2',
      trend: 'up',
      icon: AlertTriangle,
      color: 'bg-red-500'
    },
    {
      title: 'Signal Efficiency',
      value: '94%',
      change: '+4.1%',
      trend: 'up',
      icon: TrafficCone,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
      <h3 className="text-xl font-semibold text-gray-200 mb-6">System Metrics</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-gray-800/50 rounded-xl p-4 hover:bg-gray-800 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className={`${stat.color} p-2 rounded-lg`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className={`flex items-center text-sm ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.trend === 'up' ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                  {stat.change}
                </div>
              </div>
              
              <div>
                <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-800">
        <h4 className="font-medium text-gray-300 mb-4">Traffic Density</h4>
        <div className="space-y-3">
          {[
            { location: 'Downtown Core', density: 85, color: 'bg-red-500' },
            { location: 'Financial District', density: 72, color: 'bg-yellow-500' },
            { location: 'Residential Zone', density: 45, color: 'bg-green-500' },
            { location: 'Industrial Area', density: 38, color: 'bg-blue-500' }
          ].map((area, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-300">{area.location}</span>
                <span className="text-gray-400">{area.density}%</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${area.color} rounded-full`}
                  style={{ width: `${area.density}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardGrid;