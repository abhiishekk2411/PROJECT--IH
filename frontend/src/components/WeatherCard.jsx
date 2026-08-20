import React from 'react';
import { CloudRain, Thermometer, MapPin } from 'lucide-react';
import RiskBadge from './RiskBadge';
import { useTranslation } from '../i18n';

const WeatherCard = ({ weather }) => {
  const { t } = useTranslation();
  if (!weather) return null;

  if (weather.available === false) {
    return (
      <div className="card p-5">
        <h3 className="text-2xl font-bold text-surface-900 mb-4">मौसम</h3>
        <p className="text-lg text-surface-600">मौसम की जानकारी अभी उपलब्ध नहीं है।</p>
      </div>
    );
  }

  const getRiskTranslation = (level) => {
    switch(level) {
      case 'low': return 'कम';
      case 'moderate': return 'मध्यम';
      case 'high': return 'ज़्यादा';
      default: return 'उपलब्ध नहीं';
    }
  };

  return (
    <div className="card p-5">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className="p-2 bg-blue-50 rounded-lg mr-3">
            <CloudRain className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-surface-900">मौसम</h3>
          </div>
        </div>
        <div className="text-right">
          <span className="text-sm text-surface-500 block mb-1">मौसम जोखिम</span>
          <RiskBadge level={weather.riskLevel} label={getRiskTranslation(weather.riskLevel)} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="bg-surface-50 p-3 rounded-lg flex items-center justify-between">
          <div className="flex items-center text-surface-600 text-base">
            <Thermometer className="w-5 h-5 mr-1.5" /> तापमान
          </div>
          <span className="font-bold text-xl text-surface-900">{weather.temperature}°C</span>
        </div>
        <div className="bg-surface-50 p-3 rounded-lg flex flex-col justify-center">
          <div className="flex justify-between text-base mb-1">
            <span className="text-surface-600">बारिश की संभावना</span>
            <span className="font-bold text-surface-900">{weather.rainProbability}%</span>
          </div>
          <div className="w-full bg-surface-200 rounded-full h-1.5">
            <div 
              className={`h-1.5 rounded-full ${
                weather.rainProbability > 70 ? 'bg-danger-500' : 
                weather.rainProbability > 30 ? 'bg-yellow-500' : 'bg-blue-500'
              }`}
              style={{ width: `${weather.rainProbability}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-2">
        <div className="p-3 bg-surface-50 rounded-lg">
          <p className="text-sm text-surface-600">अनुमानित बारिश</p>
          <p className="font-bold text-surface-900">{weather.rainMm} mm</p>
        </div>
        <div className="p-3 bg-surface-50 rounded-lg">
          <p className="text-sm text-surface-600">फसल की संवेदनशीलता</p>
          <p className="font-bold text-surface-900 capitalize">{getRiskTranslation(weather.cropPerishability)}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
