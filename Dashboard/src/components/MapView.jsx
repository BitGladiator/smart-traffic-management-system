// components/MapView.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Custom icons for different traffic conditions
const createTrafficIcon = (color) => {
  return L.divIcon({
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
    iconSize: [24, 24],
    className: 'traffic-marker'
  });
};

function MapView() {
  // Default center coordinates (adjust based on your city)
  const center = [51.505, -0.09]; // London coordinates
  // const center = [40.7128, -74.0060]; // New York coordinates
  // const center = [1.3521, 103.8198]; // Singapore coordinates

  // Sample traffic data points
  const trafficPoints = [
    { position: [51.505, -0.09], status: 'heavy', description: 'Heavy traffic - Downtown area', color: '#ef4444' },
    { position: [51.51, -0.1], status: 'moderate', description: 'Moderate traffic - Business district', color: '#f59e0b' },
    { position: [51.49, -0.08], status: 'light', description: 'Light traffic - Residential area', color: '#10b981' },
    { position: [51.52, -0.07], status: 'heavy', description: 'Accident reported - Major intersection', color: '#ef4444' },
    { position: [51.495, -0.095], status: 'moderate', description: 'Rush hour traffic - School zone', color: '#f59e0b' },
  ];

  // Sample camera locations
  const cameraLocations = [
    { position: [51.508, -0.095], id: 'CAM-001', status: 'active' },
    { position: [51.502, -0.085], id: 'CAM-002', status: 'active' },
    { position: [51.515, -0.105], id: 'CAM-003', status: 'maintenance' },
    { position: [51.5, -0.1], id: 'CAM-004', status: 'active' },
  ];

  // Sample traffic signal locations
  const signalLocations = [
    { position: [51.507, -0.087], id: 'SIG-001', status: 'active' },
    { position: [51.503, -0.092], id: 'SIG-002', status: 'active' },
    { position: [51.512, -0.098], id: 'SIG-003', status: 'error' },
  ];

  return (
    <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden h-[500px] relative">
      {/* Loading fallback for SSR */}
      <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-10">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading interactive map...</p>
        </div>
      </div>

      {/* Map Container - Only renders on client side */}
      <div className="absolute inset-0 z-20">
        <MapContainer
          center={center}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          zoomControl={true}
          scrollWheelZoom={true}
          className="rounded-2xl"
        >
          {/* OpenStreetMap Tile Layer */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Alternative Map Tiles (uncomment to use) */}
          {/* <TileLayer
            attribution='Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
          /> */}

          {/* Traffic Condition Circles */}
          {trafficPoints.map((point, index) => (
            <Circle
              key={`traffic-${index}`}
              center={point.position}
              radius={300}
              pathOptions={{
                fillColor: point.color,
                color: point.color,
                fillOpacity: 0.2,
                opacity: 0.6,
                weight: 2
              }}
            >
              <Popup>
                <div className="p-2">
                  <h4 className="font-semibold text-gray-900 mb-1">Traffic Alert</h4>
                  <p className="text-sm text-gray-600">{point.description}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: point.color }}></div>
                    <span className="text-xs font-medium capitalize">{point.status} traffic</span>
                  </div>
                </div>
              </Popup>
            </Circle>
          ))}

          {/* Camera Markers */}
          {cameraLocations.map((camera, index) => (
            <Marker
              key={`camera-${index}`}
              position={camera.position}
              icon={createTrafficIcon(camera.status === 'active' ? '#3b82f6' : camera.status === 'maintenance' ? '#f59e0b' : '#6b7280')}
            >
              <Popup>
                <div className="p-2">
                  <h4 className="font-semibold text-gray-900 mb-1">Traffic Camera {camera.id}</h4>
                  <p className="text-sm text-gray-600">
                    Status: <span className={`font-medium ${camera.status === 'active' ? 'text-emerald-600' : camera.status === 'maintenance' ? 'text-amber-600' : 'text-red-600'}`}>
                      {camera.status}
                    </span>
                  </p>
                  <div className="mt-2 text-xs text-gray-500">
                    Coordinates: {camera.position[0].toFixed(4)}, {camera.position[1].toFixed(4)}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Traffic Signal Markers */}
          {signalLocations.map((signal, index) => (
            <Marker
              key={`signal-${index}`}
              position={signal.position}
              icon={L.divIcon({
                html: `<div class="w-6 h-6 bg-white rounded-full flex items-center justify-center border-2 ${signal.status === 'active' ? 'border-emerald-500' : signal.status === 'error' ? 'border-red-500' : 'border-yellow-500'}">
                  <div class="w-4 h-4 ${signal.status === 'active' ? 'bg-emerald-500' : signal.status === 'error' ? 'bg-red-500' : 'bg-yellow-500'} rounded-full"></div>
                </div>`,
                iconSize: [24, 24],
                className: 'signal-marker'
              })}
            >
              <Popup>
                <div className="p-2">
                  <h4 className="font-semibold text-gray-900 mb-1">Traffic Signal {signal.id}</h4>
                  <p className="text-sm text-gray-600">
                    Status: <span className={`font-medium ${signal.status === 'active' ? 'text-emerald-600' : 'text-red-600'}`}>
                      {signal.status === 'active' ? 'Operational' : 'Needs Attention'}
                    </span>
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Legend (overlay) */}
          <div className="absolute bottom-4 left-4 bg-gray-900/90 backdrop-blur-sm rounded-xl p-4 border border-gray-800 z-[1000]">
            <h4 className="text-sm font-semibold text-gray-200 mb-2">Map Legend</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="text-xs text-gray-300">Light Traffic</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <span className="text-xs text-gray-300">Moderate Traffic</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-xs text-gray-300">Heavy Traffic</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-xs text-gray-300">Camera</span>
              </div>
            </div>
          </div>
        </MapContainer>
      </div>
    </div>
  );
}

export default MapView;