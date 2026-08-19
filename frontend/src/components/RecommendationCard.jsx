import React from 'react';
import { CheckCircle2, TrendingUp, TrendingDown, Minus, Truck, IndianRupee, MapPin } from 'lucide-react';
import RiskBadge from './RiskBadge';
import { useTranslation } from '../i18n';

const RecommendationCard = ({ recommendation }) => {
  const { t } = useTranslation();
  if (!recommendation) return null;

  const mandi = recommendation.bestMandi;

  const renderTrend = (trend) => {
    if (trend === 'increasing') return <TrendingUp className="w-6 h-6 text-primary-500 mr-2" />;
    if (trend === 'decreasing') return <TrendingDown className="w-6 h-6 text-danger-500 mr-2" />;
    return <Minus className="w-6 h-6 text-surface-400 mr-2" />;
  };

  return (
    <div className="card overflow-hidden border-l-4 border-l-primary-500">
      <div className="p-6 md:p-8">
        <div className="flex items-center space-x-2 text-primary-700 mb-4">
          <CheckCircle2 className="w-6 h-6" />
          <h2 className="text-lg md:text-xl font-bold uppercase tracking-wide">{t('recommendation.recommendedMandi')}</h2>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
          <div>
            <h3 className="text-4xl md:text-5xl font-extrabold text-surface-900 mb-2">{t('mandis.' + mandi.name)}</h3>
            <div className="flex items-center text-lg text-surface-500">
              <MapPin className="w-5 h-5 mr-1" />
              <span>{mandi.distance.toLocaleString('en-IN')} {t('common.km')} {t('common.away')}</span>
            </div>
          </div>
          
          <div className="bg-primary-50 rounded-xl p-4 md:text-right flex-shrink-0">
            <p className="text-lg font-medium text-primary-800 mb-1">{t('recommendation.expectedNetReturn')}</p>
            <p className="text-4xl md:text-5xl font-bold text-primary-700 flex items-center md:justify-end">
              <IndianRupee className="w-10 h-10 mr-1" />
              {mandi.netReturn.toLocaleString('en-IN')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-surface-100">
          <div>
            <p className="text-base text-surface-500 mb-1">{t('common.price')}</p>
            <p className="text-lg font-semibold text-surface-900 flex items-center">
              <IndianRupee className="w-5 h-5" />{mandi.price.toLocaleString('en-IN')}{t('common.perKg')}
            </p>
          </div>
          <div>
            <p className="text-base text-surface-500 mb-1 flex items-center">
              <Truck className="w-4 h-4 mr-1" /> {t('common.transport')}
            </p>
            <p className="text-lg font-semibold text-surface-900 flex items-center">
              <IndianRupee className="w-5 h-5" />{mandi.transportCost.toLocaleString('en-IN')}
            </p>
          </div>
          <div>
            <p className="text-base text-surface-500 mb-1">{t('common.trend')}</p>
            <div className="text-lg font-semibold text-surface-900 flex items-center">
              {renderTrend(mandi.trend)} {mandi.trend ? t('common.' + mandi.trend) : ''}
            </div>
          </div>
          <div>
            <p className="text-base text-surface-500 mb-1">{t('common.risk')}</p>
            <RiskBadge level={mandi.risk} />
          </div>
        </div>

        <div className="mt-6 bg-surface-50 rounded-lg p-5">
          <h4 className="text-xl font-semibold text-surface-900 mb-2">{t('common.whyThisMandi')}</h4>
          <p className="text-lg text-surface-700 leading-relaxed">{recommendation.explanation}</p>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;
