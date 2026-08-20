import React from 'react';
import { ShieldAlert, ShieldCheck, Shield } from 'lucide-react';
import { useTranslation } from '../i18n';

const RiskBadge = ({ level, label }) => {
  const { t } = useTranslation();
  if (!level) return null;

  const normalizedLevel = level.toLowerCase();

  if (normalizedLevel === 'high') {
    return (
      <span className="badge badge-danger text-sm flex items-center gap-1 w-max">
        <ShieldAlert size={16} /> {label || t('common.high')}
      </span>
    );
  }
  
  if (normalizedLevel === 'moderate') {
    return (
      <span className="badge badge-warning text-sm flex items-center gap-1 w-max">
        <Shield size={16} /> {label || t('common.moderate')}
      </span>
    );
  }
  
  return (
    <span className="badge badge-success text-sm flex items-center gap-1 w-max">
      <ShieldCheck size={16} /> {label || t('common.low')}
    </span>
  );
};

export default RiskBadge;
