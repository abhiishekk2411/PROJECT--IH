import React, { useState, useRef } from 'react';
import { Camera, Image as ImageIcon, X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useTranslation } from '../i18n';

const ImageInput = ({ onImageSelect }) => {
  const { t } = useTranslation();
  const [preview, setPreview] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  
  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  const handleFileChange = (e) => {
    setErrorMsg('');
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validation
      if (!file.type.startsWith('image/')) {
        setErrorMsg(t('imageInput.errorInvalid'));
        return;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setErrorMsg(t('imageInput.errorLarge'));
        return;
      }

      const url = URL.createObjectURL(file);
      setPreview(url);
      onImageSelect(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setErrorMsg('');
    onImageSelect(null);
    if (cameraInputRef.current) cameraInputRef.current.value = '';
    if (galleryInputRef.current) galleryInputRef.current.value = '';
  };

  return (
    <div className="w-full">
      {/* Hidden Inputs */}
      <input
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        ref={cameraInputRef}
        onChange={handleFileChange}
      />
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={galleryInputRef}
        onChange={handleFileChange}
      />

      {errorMsg && (
        <div className="mb-4 p-4 bg-danger-50 text-danger-700 rounded-lg flex items-center shadow-sm border border-danger-100">
          <AlertCircle className="w-6 h-6 mr-3 flex-shrink-0" />
          <p className="text-lg font-medium">{errorMsg}</p>
        </div>
      )}

      {!preview ? (
        <div className="flex flex-col items-center justify-center p-6 bg-surface-50 rounded-2xl border-2 border-dashed border-surface-300">
          <div className="mb-6 text-center">
            <h3 className="text-2xl font-bold text-surface-900 mb-2">{t('imageInput.title')}</h3>
            <p className="text-lg text-surface-600">{t('imageInput.subtitle')}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row w-full gap-4 max-w-md">
            <button
              type="button"
              onClick={() => cameraInputRef.current.click()}
              className="flex-1 btn btn-primary py-4 text-xl flex items-center justify-center shadow-md hover:shadow-lg"
            >
              <Camera className="w-6 h-6 mr-2" />
              {t('imageInput.camera')}
            </button>
            <button
              type="button"
              onClick={() => galleryInputRef.current.click()}
              className="flex-1 btn bg-white text-surface-800 border-2 border-surface-200 hover:border-primary-500 hover:text-primary-700 py-4 text-xl flex items-center justify-center shadow-sm"
            >
              <ImageIcon className="w-6 h-6 mr-2" />
              {t('imageInput.choose')}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Preview Section */}
          <div className="relative rounded-2xl overflow-hidden border-4 border-surface-100 shadow-md bg-black">
            <img src={preview} alt="Crop preview" className="w-full max-h-[400px] object-contain" />
            
            <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent flex justify-between items-start">
              <span className="inline-flex items-center bg-green-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-sm">
                <CheckCircle className="w-4 h-4 mr-1.5" />
                {t('imageInput.ready')}
              </span>
              <button
                type="button"
                onClick={handleRemove}
                className="p-2 bg-white/20 hover:bg-danger-500 text-white rounded-full backdrop-blur-sm transition-colors"
                title={t('imageInput.remove')}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="absolute bottom-4 left-4 right-4 flex justify-center">
              <button
                type="button"
                onClick={() => galleryInputRef.current.click()}
                className="bg-white/90 hover:bg-white text-surface-900 px-6 py-2.5 rounded-full font-semibold shadow-lg backdrop-blur-sm transition-all"
              >
                {t('imageInput.change')}
              </button>
            </div>
          </div>

          {/* AI Disclaimer */}
          <div className="bg-primary-50 border border-primary-100 p-4 rounded-xl flex items-start">
            <Info className="w-6 h-6 text-primary-600 mr-3 flex-shrink-0 mt-0.5" />
            <p className="text-primary-900 text-lg font-medium leading-snug">
              {t('imageInput.notAnalyzed')}
            </p>
          </div>
        </div>
      )}

      {/* Photo Quality Guidance */}
      {!preview && (
        <div className="mt-8 bg-surface-50 p-6 rounded-2xl border border-surface-200">
          <h4 className="text-xl font-bold text-surface-800 mb-4">{t('imageInput.guidanceTitle')}</h4>
          <ul className="space-y-3">
            <li className="flex items-center text-lg text-surface-700">
              <span className="w-2 h-2 rounded-full bg-primary-500 mr-3"></span>
              {t('imageInput.guidance1')}
            </li>
            <li className="flex items-center text-lg text-surface-700">
              <span className="w-2 h-2 rounded-full bg-primary-500 mr-3"></span>
              {t('imageInput.guidance2')}
            </li>
            <li className="flex items-center text-lg text-surface-700">
              <span className="w-2 h-2 rounded-full bg-primary-500 mr-3"></span>
              {t('imageInput.guidance3')}
            </li>
            <li className="flex items-center text-lg text-surface-700">
              <span className="w-2 h-2 rounded-full bg-primary-500 mr-3"></span>
              {t('imageInput.guidance4')}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageInput;
