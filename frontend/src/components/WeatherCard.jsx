import React from 'react';
import { CloudRain, Thermometer, MapPin } from 'lucide-react';
import RiskBadge from './RiskBadge';
import { useTranslation } from '../i18n';

const WeatherCard = ({ weather }) => {
  const { t } = useTranslation();
  if (!weather) return null;

  const getDayTranslation = (day) => {
    const d = day.toLowerCase();
    if (d === 'today') return t('weather.today');
    if (d === 'tomorrow') return t('weather.tomorrow');
    if (d === 'day after' || d === 'dayafter') return t('weather.dayAfter');
    return day;
  };

  return (
    <div className="card p-5">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className="p-2 bg-blue-50 rounded-lg mr-3">
            <CloudRain className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-surface-900">{t('weather.title')}</h3>
            <div className="flex items-center text-base text-surface-500">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{weather.location || 'Local Area'}</span>
              {weather.condition && (
                <>
                  <span className="mx-2">•</span>
                  <span>{t('conditions.' + weather.condition)}</span>
                </>
              )}
            </div>
          </div>
        </div>
        <RiskBadge level={weather.riskLevel} />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="bg-surface-50 p-3 rounded-lg flex items-center justify-between">
          <div className="flex items-center text-surface-600 text-base">
            <Thermometer className="w-5 h-5 mr-1.5" /> {t('weather.temperature')}
          </div>
          <span className="font-bold text-xl text-surface-900">{weather.temperature}°C</span>
        </div>
        <div className="bg-surface-50 p-3 rounded-lg flex flex-col justify-center">
          <div className="flex justify-between text-base mb-1">
            <span className="text-surface-600">{t('weather.rainProbability')}</span>
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

      {weather.warning && (
        <div className="mb-5 p-3 bg-yellow-50 text-yellow-800 text-base rounded-md border border-yellow-100 flex items-start">
           <CloudRain className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
           <p>{weather.warning}</p>
        </div>
      )}

      {weather.forecast && weather.forecast.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-surface-500 uppercase tracking-wider mb-2">{t('weather.forecast')}</p>
          <div className="grid grid-cols-3 gap-2">
            {weather.forecast.map((day, index) => (
              <div key={index} className="text-center p-2 rounded bg-surface-50">
                <p className="text-sm text-surface-500 mb-1">{getDayTranslation(day.day)}</p>
                <div className="flex justify-center mb-1">
                  {day.rain > 50 ? <CloudRain className="w-5 h-5 text-blue-500" /> : <Thermometer className="w-5 h-5 text-orange-400" />}
                </div>
                <p className="text-base font-medium">{day.rain}%</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
