import React from 'react';
import DashboardGrid from '../components/DashboardGrid';
import AnalyticsPanel from '../components/AnalyticsPanel';
import MapView from '../components/MapView';
import {
  AlertTriangle,
  Clock,
  Navigation,
  TrendingUp,
  Activity
} from 'lucide-react';

function OverviewPage() {
  return (
    <div className="w-full max-w-[1600px] mx-auto px-3 py-4 sm:px-6 sm:py-6">
      {/* ================= HEADER ================= */}
      <div className="mb-5">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-200">
          Dashboard Overview
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Real-time traffic monitoring and system insights
        </p>

        <div className="flex items-center gap-3 mt-3 flex-wrap">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/60 rounded-lg border border-gray-700">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-300">System Active</span>
          </div>
          <span className="text-xs text-gray-500">Updated: Just now</span>
        </div>
      </div>

      {/* ================= QUICK STATS ================= */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          {
            label: 'Active Cameras',
            value: '15',
            note: '↑ 2 from yesterday',
            color: 'blue',
            Icon: Activity
          },
          {
            label: 'Traffic Flow',
            value: '78%',
            note: 'Optimal conditions',
            color: 'emerald',
            Icon: TrendingUp
          },
          {
            label: 'Response Time',
            value: '2.4m',
            note: '↓ 0.5m avg',
            color: 'amber',
            Icon: Clock
          },
          {
            label: 'Active Incidents',
            value: '3',
            note: '2 high priority',
            color: 'red',
            Icon: AlertTriangle
          }
        ].map(({ label, value, note, color, Icon }) => (
          <div
            key={label}
            className={`rounded-xl p-3 border bg-${color}-900/20 border-${color}-800/30`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs text-${color}-400`}>{label}</p>
                <p className="text-lg sm:text-xl font-bold text-gray-200">
                  {value}
                </p>
              </div>
              <Icon className={`w-5 h-5 text-${color}-400/50`} />
            </div>
            <p className={`text-xs text-${color}-300 mt-1`}>{note}</p>
          </div>
        ))}
      </div>

      {/* ================= MAIN GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* ================= LEFT ================= */}
        <div className="lg:col-span-2 space-y-5">
          {/* MAP */}
          <div className="bg-gray-900 rounded-xl border border-gray-800">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-blue-400" />
                <h2 className="text-sm sm:text-base font-semibold text-gray-200">
                  Interactive City Map
                </h2>
              </div>
              <div className="flex gap-2">
                <span className="px-2 py-0.5 text-xs bg-gray-800 rounded-full text-gray-300">
                  Live
                </span>
                <button className="text-xs px-3 py-1 rounded-md bg-gray-800 hover:bg-gray-700">
                  Refresh
                </button>
              </div>
            </div>

            <div className="h-[220px] sm:h-[300px] lg:h-[420px]">
              <MapView />
            </div>
          </div>

          {/* ANALYTICS (desktop only) */}
          <div className="hidden sm:block">
            <AnalyticsPanel />
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="space-y-5">
          {/* SYSTEM STATUS */}
          <div className="bg-gray-900 rounded-xl border border-gray-800">
            <div className="px-4 py-3 border-b border-gray-800">
              <h2 className="text-sm sm:text-base font-semibold text-gray-200">
                System Status
              </h2>
              <p className="text-xs text-gray-400">
                Real-time system metrics
              </p>
            </div>
            <div className="p-4">
              <DashboardGrid />
            </div>
          </div>

          {/* INCIDENTS */}
          <div className="bg-gray-900 rounded-xl border border-gray-800">
            <div className="px-4 py-3 border-b border-gray-800">
              <h2 className="text-sm sm:text-base font-semibold text-gray-200">
                Recent Incidents
              </h2>
              <p className="text-xs text-gray-400">Last 60 minutes</p>
            </div>

            <div className="max-h-[320px] overflow-y-auto divide-y divide-gray-800">
              {[
                ['Main St & 1st Ave', 'Vehicle Accident', '5 min ago'],
                ['Broadway & 5th', 'Traffic Jam', '12 min ago'],
                ['Park Avenue', 'Road Construction', '25 min ago']
              ].map(([loc, type, time]) => (
                <div key={loc} className="p-3">
                  <p className="text-sm text-gray-200 truncate">{loc}</p>
                  <p className="text-xs text-gray-400 truncate">{type}</p>
                  <p className="text-xs text-gray-500 mt-1">{time}</p>
                </div>
              ))}
            </div>

            <button className="w-full py-3 text-sm text-gray-400 hover:text-gray-200 border-t border-gray-800">
              View All Incidents
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE ANALYTICS */}
      <div className="block sm:hidden mt-6">
        <AnalyticsPanel />
      </div>
    </div>
  );
}

export default OverviewPage;
