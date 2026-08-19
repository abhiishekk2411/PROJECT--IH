import React from 'react';
import { MapPin, Truck, TrendingUp, TrendingDown, Minus, IndianRupee } from 'lucide-react';
import RiskBadge from './RiskBadge';
import { useTranslation } from '../i18n';

const MandiCard = ({ mandi, rank, isHighlighted }) => {
  const { t } = useTranslation();
  if (!mandi) return null;

  const renderTrend = (trend) => {
    if (trend === 'increasing') return <TrendingUp className="w-5 h-5 text-primary-500 mr-1" />;
    if (trend === 'decreasing') return <TrendingDown className="w-5 h-5 text-danger-500 mr-1" />;
    return <Minus className="w-5 h-5 text-surface-400 mr-1" />;
  };

  return (
    <div className={`card p-5 flex flex-col h-full relative ${isHighlighted ? 'card-highlight ring-2 ring-primary-500' : ''}`}>
      {isHighlighted && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="badge badge-accent shadow-sm text-xs font-bold uppercase tracking-wider px-3 py-1">
            {t('common.bestOption')}
          </span>
        </div>
      )}
      
      <div className="flex justify-between items-start mb-3 mt-2">
        <div>
          <div className="flex items-center mb-1">
            <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-surface-100 text-surface-700 font-bold text-sm mr-2">
              #{rank}
            </span>
            <h3 className="text-2xl font-bold text-surface-900 truncate">{t('mandis.' + mandi.name)}</h3>
          </div>
          <div className="flex items-center text-base text-surface-500">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{t('common.district')} {mandi.district} • {mandi.distance.toLocaleString('en-IN')} {t('common.km')}</span>
          </div>
        </div>
        <RiskBadge level={mandi.risk} />
      </div>

      <div className="mt-auto space-y-3 pt-3 border-t border-surface-100">
        <div className="flex justify-between items-center">
          <span className="text-base text-surface-600">{t('common.price')}</span>
          <span className="font-semibold text-lg text-surface-900 flex items-center">
            <IndianRupee className="w-4 h-4" />{mandi.price.toLocaleString('en-IN')}{t('common.perKg')}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-base text-surface-600 flex items-center">
            <Truck className="w-4 h-4 mr-1 text-surface-400" />
            {t('common.transportCost')}
          </span>
          <span className="text-base font-semibold text-surface-900 flex items-center">
            <IndianRupee className="w-4 h-4" />{mandi.transportCost.toLocaleString('en-IN')}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-base text-surface-600">{t('common.priceTrend')}</span>
          <span className="text-base font-medium flex items-center text-surface-700">
            {renderTrend(mandi.trend)}
            {mandi.trend ? t('common.' + mandi.trend) : ''}
          </span>
        </div>

        <div className="pt-3 border-t border-surface-100 flex justify-between items-center">
          <span className="font-medium text-lg text-surface-900">{t('common.expectedNetReturn')}</span>
          <span className="text-3xl font-bold text-primary-700 flex items-center">
            <IndianRupee className="w-6 h-6 mr-0.5" />
            {mandi.netReturn.toLocaleString('en-IN')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MandiCard;
