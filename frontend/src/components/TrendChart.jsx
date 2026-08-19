import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useTranslation } from '../i18n';

const TrendChart = ({ data, title }) => {
  const { t } = useTranslation();
  if (!data || data.length === 0) return null;

  const chartTitle = title || t('trend.historicalPriceTrend');

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-surface-200 shadow-lg rounded-lg">
          <p className="text-base font-semibold text-surface-600 mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-base font-bold flex items-center" style={{ color: entry.color }}>
              <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: entry.color }}></span>
              {entry.name === 'price' || entry.name === t('common.price') ? t('trend.dailyPrice') : t('trend.sevenDayAvg')}: ₹{entry.value.toLocaleString('en-IN')}/kg
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card p-5">
      <h3 className="text-2xl font-bold text-surface-900 mb-4">{chartTitle}</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
              tickFormatter={(value) => `₹${value.toLocaleString('en-IN')}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
            <Line 
              type="monotone" 
              dataKey="price" 
              name={t('common.price')} 
              stroke="#059669" 
              strokeWidth={3} 
              dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            <Line 
              type="monotone" 
              dataKey="avg" 
              name={t('trend.sevenDayAvg')} 
              stroke="#F59E0B" 
              strokeWidth={2} 
              strokeDasharray="5 5" 
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendChart;
