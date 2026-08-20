import React from 'react';
import { MapPin, Truck, IndianRupee } from 'lucide-react';
import { useTranslation } from '../i18n';

const MandiCard = ({ mandi, rank, isHighlighted }) => {
  const { t } = useTranslation();

  if (!mandi) return null;

  const mandiId = mandi.mandiId ?? mandi.id;
  const mandiName = mandi.mandiName ?? mandi.name ?? mandiId ?? 'मंडी';
  const distance = mandi.distanceKm ?? mandi.distance ?? 0;
  const price = mandi.price ?? mandi.currentPrice ?? 0;
  const transportCost = mandi.transportCost ?? mandi.transport ?? 0;
  const expectedNetReturn = mandi.expectedNetReturn ?? mandi.netReturn ?? mandi.expectedEarning ?? 0;

  const getRankBadge = () => {
    if (rank === 1) return { text: t('ux.rankBest'), color: 'badge-accent shadow-sm ring-1 ring-primary-500' };
    if (rank === 2 || rank === 3) return { text: t('ux.rankGood'), color: 'bg-green-100 text-green-800' };
    return { text: t('ux.rankLow'), color: 'bg-surface-100 text-surface-600' };
  };

  const badgeInfo = getRankBadge();

  const getMandiName = () => {
    const translatedName = mandiId ? t(`mandis.${mandiId}`) : null;
    return translatedName || mandiName;
  };

  return (
    <div className={`card p-5 flex flex-col h-full relative ${isHighlighted ? 'card-highlight ring-2 ring-primary-500' : ''}`}>
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
        <span className={`badge text-xs font-bold uppercase tracking-wider px-3 py-1 ${badgeInfo.color}`}>
          {badgeInfo.text}
        </span>
      </div>

      {/* Header */}
      <div className="flex flex-col mb-4 mt-3">
        <h3 className="text-2xl font-bold text-surface-900 break-words mb-1">
          {getMandiName()}
        </h3>
        <div className="flex items-center text-lg text-surface-500">
          <MapPin className="w-5 h-5 mr-1" />
          <span className="whitespace-nowrap">{distance.toLocaleString('hi-IN')} {t('common.km')}</span>
        </div>
      </div>

      {/* Details */}
      <div className="mt-auto space-y-4 pt-4 border-t border-surface-100">
        
        {/* Price */}
        <div className="flex justify-between items-center text-lg">
          <span className="text-surface-600">{t('common.price')}</span>
          <span className="font-semibold text-surface-900 whitespace-nowrap">
            ₹{price.toLocaleString('hi-IN')}{t('common.perKg')}
          </span>
        </div>

        {/* Transport */}
        <div className="flex justify-between items-center text-lg">
          <span className="text-surface-600 flex items-center">
            <Truck className="w-5 h-5 mr-2 text-surface-400" />
            {t('common.transportCost')}
          </span>
          <span className="font-semibold text-danger-600 whitespace-nowrap">
            ₹{transportCost.toLocaleString('hi-IN')}
          </span>
        </div>

        {/* Net Return */}
        <div className="pt-4 border-t border-surface-200 flex flex-col items-center justify-center">
          <span className="text-surface-600 text-lg mb-1">{t('common.expectedNetReturn')}</span>
          <span className="text-3xl font-extrabold text-primary-700 whitespace-nowrap">
            ₹{expectedNetReturn.toLocaleString('hi-IN')}
          </span>
        </div>

      </div>
    </div>
  );
};

export default MandiCard;