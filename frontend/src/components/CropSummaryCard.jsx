import React from 'react';
import { Wheat, MapPin, Scale, Hash } from 'lucide-react';
import { useTranslation } from '../i18n';

const CropSummaryCard = ({ crop }) => {
  const { t } = useTranslation();
  if (!crop) return null;
  
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary-100 rounded-lg">
            <Wheat className="w-6 h-6 text-primary-700" />
          </div>
          <h2 className="text-2xl font-bold text-surface-900 capitalize">{crop.crop}</h2>
        </div>
        <span className="badge badge-primary font-medium">{crop.variety || 'Standard'} {t('cropSummary.variety')}</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center text-surface-700">
          <Scale className="w-5 h-5 mr-2 text-surface-400" />
          <span className="font-medium mr-2">{t('cropSummary.quantity')}:</span>
          <span>{crop.quantity.toLocaleString('en-IN')} {crop.unit}</span>
        </div>
        <div className="flex items-center text-surface-700">
          <MapPin className="w-5 h-5 mr-2 text-surface-400" />
          <span className="font-medium mr-2">{t('cropSummary.location')}:</span>
          <span className="truncate">{crop.location}</span>
        </div>
        {crop.harvestDate && (
           <div className="flex items-center text-surface-700">
             <Hash className="w-5 h-5 mr-2 text-surface-400" />
             <span className="font-medium mr-2">Harvest Date:</span>
             <span>{crop.harvestDate}</span>
           </div>
        )}
      </div>
    </div>
  );
};

export default CropSummaryCard;
