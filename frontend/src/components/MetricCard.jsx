import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { useTranslation } from '../i18n';

const MetricCard = ({ icon: Icon, label, value, subtext, trend, className = '' }) => {
  const { t } = useTranslation();
  
  const renderTrend = () => {
    if (!trend) return null;
    
    if (trend === 'up') {
      return (
        <div className="flex items-center text-danger-600 text-base font-medium mt-1">
          <ArrowUpRight className="w-4 h-4 mr-1" />
          <span>{t('common.increasing')}</span>
        </div>
      );
    }
    
    if (trend === 'down') {
      return (
        <div className="flex items-center text-primary-600 text-base font-medium mt-1">
          <ArrowDownRight className="w-4 h-4 mr-1" />
          <span>{t('common.decreasing')}</span>
        </div>
      );
    }
    
    return (
      <div className="flex items-center text-surface-500 text-base font-medium mt-1">
        <Minus className="w-4 h-4 mr-1" />
        <span>{t('common.stable')}</span>
      </div>
    );
  };

  return (
    <div className={`card flex items-start p-4 md:p-5 ${className}`}>
      <div className="p-3 rounded-full bg-primary-50 mr-4 flex-shrink-0">
        <Icon className="w-6 h-6 text-primary-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="metric-label truncate">{label}</p>
        <p className="metric-value truncate">{value}</p>
        {subtext && <p className="text-base text-surface-500 mt-1">{subtext}</p>}
        {renderTrend()}
      </div>
    </div>
  );
};

export default MetricCard;
