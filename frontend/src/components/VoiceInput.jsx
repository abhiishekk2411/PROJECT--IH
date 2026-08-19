import React from 'react';
import { Mic } from 'lucide-react';
import { useTranslation } from '../i18n';

const VoiceInput = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <button 
        className="relative group mb-4 focus:outline-none"
        onClick={(e) => e.preventDefault()}
        type="button"
      >
        <div className="absolute inset-0 bg-primary-100 rounded-full group-hover:animate-ping opacity-75"></div>
        <div className="relative bg-primary-600 hover:bg-primary-700 text-white p-6 rounded-full shadow-lg transition-colors z-10 flex items-center justify-center">
          <Mic className="w-10 h-10" />
        </div>
      </button>
      
      <h3 className="text-xl font-medium text-surface-900 mb-1">{t('voice.tapToSpeak')}</h3>
      <p className="text-surface-500 text-base">{t('voice.comingSoon')}</p>
    </div>
  );
};

export default VoiceInput;
