import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Keyboard, Mic, MapPin } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import ImageUpload from '../components/ImageUpload';
import VoiceInput from '../components/VoiceInput';
import { currentCrop, cropOptions, unitOptions } from '../data/mockData';
import { useTranslation } from '../i18n';

export default function Analyze() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [inputMode, setInputMode] = useState('type'); // 'type' or 'voice'
  const [formData, setFormData] = useState({
    crop: currentCrop.crop,
    variety: currentCrop.variety,
    quantity: currentCrop.quantity,
    unit: currentCrop.unit,
    location: currentCrop.location
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAnalyze = () => {
    navigate('/results');
  };

  return (
    <div className="page-container animate-fade-in">
      <PageHeader 
        title={t('analyze.title')} 
        subtitle={t('analyze.subtitle')}
      />

      <div className="max-w-2xl mx-auto">
        {/* Input Mode Tabs */}
        <div className="flex bg-surface-100 p-1 rounded-lg mb-8">
          <button 
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md font-medium transition-colors ${inputMode === 'type' ? 'bg-white shadow-sm text-primary-600' : 'text-surface-600 hover:text-surface-900'}`}
            onClick={() => setInputMode('type')}
          >
            <Keyboard size={20} />
            {t('analyze.typeDetails')}
          </button>
          <button 
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md font-medium transition-colors ${inputMode === 'voice' ? 'bg-white shadow-sm text-primary-600' : 'text-surface-600 hover:text-surface-900'}`}
            onClick={() => setInputMode('voice')}
          >
            <Mic size={20} />
            {t('analyze.voiceInput')}
          </button>
        </div>

        <div className="card p-6 md:p-8">
          {inputMode === 'type' ? (
            <div className="space-y-6">
              <div>
                <label className="form-label">{t('analyze.crop')}</label>
                <select 
                  name="crop" 
                  value={formData.crop} 
                  onChange={handleInputChange} 
                  className="form-select"
                >
                  {cropOptions && cropOptions.map(option => (
                    <option key={option} value={option}>{t('crops.' + option)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label">{t('analyze.variety')}</label>
                <input 
                  type="text" 
                  name="variety" 
                  value={formData.variety} 
                  onChange={handleInputChange} 
                  className="form-input" 
                  placeholder={t('analyze.varietyPlaceholder')}
                />
              </div>

              <div>
                <label className="form-label">{t('analyze.quantity')}</label>
                <div className="flex gap-4">
                  <input 
                    type="number" 
                    name="quantity" 
                    value={formData.quantity} 
                    onChange={handleInputChange} 
                    className="form-input flex-2" 
                    placeholder={t('analyze.quantityPlaceholder')}
                  />
                  <select 
                    name="unit" 
                    value={formData.unit} 
                    onChange={handleInputChange} 
                    className="form-select flex-1"
                  >
                    {unitOptions && unitOptions.map(unit => (
                      <option key={unit} value={unit}>{t('common.' + unit)}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="form-label">{t('analyze.location')}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin size={20} className="text-surface-400" />
                  </div>
                  <input 
                    type="text" 
                    name="location" 
                    value={formData.location} 
                    onChange={handleInputChange} 
                    className="form-input pl-10" 
                    placeholder={t('analyze.locationPlaceholder')}
                  />
                </div>
              </div>

              <div>
                <label className="form-label">{t('analyze.cropImage')}</label>
                <ImageUpload onImageSelect={(url) => setImagePreview(url)} preview={imagePreview} />
              </div>
            </div>
          ) : (
            <div className="py-8">
              <VoiceInput />
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-surface-200">
            <button 
              onClick={handleAnalyze} 
              className="btn btn-primary btn-lg w-full mb-3"
            >
              {t('analyze.analyzeCrop')}
            </button>
            <p className="text-sm text-center text-surface-500">
              {t('analyze.analyzeNote')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
