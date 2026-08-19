import React from 'react';
import { useTranslation } from '../i18n';

const RiskBadge = ({ level }) => {
  const { t } = useTranslation();
  if (!level) return null;

  let badgeClass = 'badge-gray';
  let dotClass = 'bg-gray-400';

  const normalizedLevel = level.toLowerCase();

  if (normalizedLevel === 'low') {
    badgeClass = 'badge-primary';
    dotClass = 'bg-green-500';
  } else if (normalizedLevel === 'moderate') {
    badgeClass = 'badge-surface';
    dotClass = 'bg-yellow-500';
  } else if (normalizedLevel === 'high') {
    badgeClass = 'badge-danger';
    dotClass = 'bg-danger-500';
  }

  // Handle translation if present in en.js
  const displayLevel = t(`common.${level}`) !== `common.${level}` ? t(`common.${level}`) : level;

  return (
    <span className={`badge ${badgeClass} inline-flex items-center`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${dotClass}`}></span>
      {displayLevel}
    </span>
  );
};

export default RiskBadge;
