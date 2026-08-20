import React from 'react';
import MandiCard from './MandiCard';
import { useTranslation } from '../i18n';

const MandiComparison = ({ mandis, bestMandiId }) => {
  const { t } = useTranslation();
  if (!mandis || mandis.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mandis.map((mandi, index) => (
          <MandiCard 
            key={mandi.mandiId || index} 
            mandi={mandi} 
            rank={index + 1} 
            isHighlighted={mandi.mandiId === bestMandiId || index === 0} 
          />
        ))}
      </div>
    </div>
  );
};

export default MandiComparison;
