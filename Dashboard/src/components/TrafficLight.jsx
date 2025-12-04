import React from 'react';

function TrafficLight({ status = 'Medium' }) {
  const getColor = () => {
    const colors = {
      low: 'bg-green-500',
      medium: 'bg-amber-500',
      high: 'bg-red-500'
    };
    return colors[status.toLowerCase()] || colors.medium;
  };

  const getStatusText = () => {
    const texts = {
      low: 'Low Traffic',
      medium: 'Moderate Traffic',
      high: 'Heavy Traffic'
    };
    return texts[status.toLowerCase()] || texts.medium;
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`w-32 h-32 rounded-full ${getColor()} shadow-lg flex items-center justify-center mb-3`}>
        <div className="w-20 h-20 bg-white/20 rounded-full"></div>
      </div>
      <span className={`text-lg font-semibold ${getColor().replace('bg-', 'text-')}`}>
        {getStatusText()}
      </span>
    </div>
  );
}

export default TrafficLight;