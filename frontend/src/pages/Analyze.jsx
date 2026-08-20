import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Keyboard, Mic, Camera, MapPin } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import VoiceInput from '../components/VoiceInput';
import ImageInput from '../components/ImageInput';
import { currentCrop, cropOptions, unitOptions } from '../data/mockData';
import { useTranslation } from '../i18n';
import { analyzeDecision } from '../services/decisionService';

export default function Analyze() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [inputMode, setInputMode] = useState('type'); // 'type', 'voice', 'image'
  const [formData, setFormData] = useState({
    crop: currentCrop.crop,
    variety: currentCrop.variety,
    quantity: currentCrop.quantity,
    unit: currentCrop.unit,
    location: currentCrop.location
  });
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrorMsg(''); // Clear error on change
  };

  const handleAnalyze = async () => {
    // 1. Validate
    if (!formData.crop || !formData.variety || !formData.quantity || !formData.location) {
      setErrorMsg('कृपया सभी आवश्यक जानकारी भरें।');
      return;
    }

    // 2. Set loading
    setIsAnalyzing(true);
    setErrorMsg('');

    try {
      // 3. Call backend
      const result = await analyzeDecision(formData);
      
      // 4. Navigate on success
      navigate('/results', { state: { decision: result } });
    } catch (err) {
      console.error("Analysis Failed:", err);
      // 5. Handle error gracefully
      setErrorMsg('सर्वर से जानकारी नहीं मिल पा रही है। कृपया कुछ देर बाद फिर कोशिश करें।');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const renderManualForm = () => (
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
    </div>
  );

  return (
    <div className="page-container animate-fade-in">
      <PageHeader 
        title={t('analyze.title')} 
        subtitle={t('analyze.subtitle')}
      />

      <div className="max-w-2xl mx-auto">
        {/* Input Mode Tabs */}
        <div className="flex flex-col sm:flex-row bg-surface-100 p-1.5 rounded-xl mb-8 gap-1.5">
          <button 
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium text-lg transition-all ${inputMode === 'type' ? 'bg-white shadow-md text-primary-700' : 'text-surface-600 hover:bg-surface-200'}`}
            onClick={() => setInputMode('type')}
          >
            <Keyboard size={20} />
            {t('analyze.typeDetails')}
          </button>
          <button 
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium text-lg transition-all ${inputMode === 'voice' ? 'bg-white shadow-md text-primary-700' : 'text-surface-600 hover:bg-surface-200'}`}
            onClick={() => setInputMode('voice')}
          >
            <Mic size={20} />
            {t('analyze.voiceInput')}
          </button>
          <button 
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium text-lg transition-all ${inputMode === 'image' ? 'bg-white shadow-md text-primary-700' : 'text-surface-600 hover:bg-surface-200'}`}
            onClick={() => setInputMode('image')}
          >
            <Camera size={20} />
            {t('analyze.imageInput') || 'फोटो लें'}
          </button>
        </div>

        <div className="card p-6 md:p-8">
          
          {inputMode === 'type' && (
            <div className="py-2">
              {renderManualForm()}
            </div>
          )}

          {inputMode === 'voice' && (
            <div className="py-8">
              <VoiceInput onVoiceSuccess={(data) => {
                setFormData(prev => ({
                  ...prev,
                  crop: data.crop || prev.crop,
                  variety: data.variety || prev.variety,
                  quantity: data.quantity || prev.quantity,
                  location: data.location || prev.location
                }));
                setInputMode('type');
              }} />
            </div>
          )}

          {inputMode === 'image' && (
            <div className="py-2 space-y-8">
              <ImageInput onImageSelect={(file) => setIsImageSelected(!!file)} />
              
              {isImageSelected && (
                <div className="pt-8 border-t-2 border-surface-200 mt-8 animate-fade-in">
                  {renderManualForm()}
                </div>
              )}
            </div>
          )}

          {/* Action Area */}
          {(inputMode === 'type' || (inputMode === 'image' && isImageSelected)) && (
            <div className="mt-8 pt-8 border-t-2 border-surface-200">
              {errorMsg && (
                <div className="mb-6 p-4 bg-danger-50 text-danger-700 rounded-lg text-center font-semibold text-lg border border-danger-100">
                  {errorMsg}
                </div>
              )}
              <button 
                onClick={handleAnalyze} 
                disabled={isAnalyzing}
                className={`btn btn-primary w-full py-4 text-xl font-bold rounded-xl shadow-md hover:shadow-lg transition-all ${isAnalyzing ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isAnalyzing ? "आपकी फसल का विश्लेषण हो रहा है..." : t('analyze.analyzeCrop')}
              </button>
              <p className="text-base text-center text-surface-500 mt-4 font-medium">
                {t('analyze.analyzeNote')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
