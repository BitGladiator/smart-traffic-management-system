import React, { useState } from 'react';
import { Navigation, ZoomIn, ZoomOut, Maximize2, Layers } from 'lucide-react';

function MapView() {
  const [zoom, setZoom] = useState(1);
  const [viewMode, setViewMode] = useState('traffic');

  const intersections = [
    { id: 1, x: '30%', y: '25%', status: 'high' },
    { id: 2, x: '50%', y: '40%', status: 'medium' },
    { id: 3, x: '70%', y: '30%', status: 'low' },
    { id: 4, x: '40%', y: '60%', status: 'high' },
    { id: 5, x: '60%', y: '70%', status: 'medium' },
    { id: 6, x: '20%', y: '50%', status: 'low' }
  ];

  const handleZoomIn = () => setZoom(Math.min(2, zoom + 0.1));
  const handleZoomOut = () => setZoom(Math.max(0.5, zoom - 0.1));

  return (
    <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-200">Live Traffic Map</h3>
          <p className="text-sm text-gray-400">Real-time city traffic visualization</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex bg-gray-800 rounded-lg p-1">
            {['traffic', 'satellite', 'heatmap'].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1 rounded text-sm font-medium ${viewMode === mode ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
          
          <button className="p-2 hover:bg-gray-800 rounded-lg">
            <Maximize2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 overflow-hidden min-h-[400px]">
        <div className="absolute inset-0" style={{ transform: `scale(${zoom})` }}>
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent"></div>
            
            <div className="absolute w-full h-full">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="absolute h-px bg-gray-700/50 w-full" style={{ top: `${(i + 1) * 12.5}%` }}></div>
              ))}
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="absolute w-px bg-gray-700/50 h-full" style={{ left: `${(i + 1) * 12.5}%` }}></div>
              ))}
            </div>

            {intersections.map((intersection) => (
              <div
                key={intersection.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: intersection.x, top: intersection.y }}
              >
                <div className="relative group">
                  <div className={`h-10 w-10 rounded-full border-4 border-white shadow-lg ${intersection.status === 'high' ? 'bg-red-500' : intersection.status === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Navigation className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap shadow-xl">
                      Intersection #{intersection.id}
                      <div className="text-xs text-gray-400 mt-1">
                        Status: {intersection.status === 'high' ? 'Heavy' : intersection.status === 'medium' ? 'Moderate' : 'Light'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="absolute bottom-4 left-4 bg-gray-900/90 backdrop-blur-sm rounded-lg p-3 border border-gray-700">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm text-gray-300">Heavy</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-sm text-gray-300">Moderate</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm text-gray-300">Light</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <button
            onClick={handleZoomIn}
            className="p-2 bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <ZoomIn className="h-5 w-5" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <ZoomOut className="h-5 w-5" />
          </button>
          <button className="p-2 bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors">
            <Layers className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-gray-800/50 rounded-lg">
          <p className="text-2xl font-bold text-white">12</p>
          <p className="text-sm text-gray-400">Active Cameras</p>
        </div>
        <div className="text-center p-3 bg-gray-800/50 rounded-lg">
          <p className="text-2xl font-bold text-white">48</p>
          <p className="text-sm text-gray-400">Signals Online</p>
        </div>
        <div className="text-center p-3 bg-gray-800/50 rounded-lg">
          <p className="text-2xl font-bold text-white">92%</p>
          <p className="text-sm text-gray-400">System Health</p>
        </div>
      </div>
    </div>
  );
}

export default MapView;