import React, { useState, useRef } from 'react';
import { Camera, Image as ImageIcon, X, CheckCircle, AlertCircle, Info, Loader2 } from 'lucide-react';
import { useTranslation } from '../i18n';
import { analyzeImage } from '../services/decisionService';

const compressImage = (file, maxWidth = 500, quality = 0.7) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => resolve(null);
      img.src = e.target.result;
    };
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  });
};

const ImageInput = ({ onImageSelect, onCropDetected }) => {
  const { t } = useTranslation();
  const [preview, setPreview] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detectedData, setDetectedData] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  
  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);
  const selectedFileRef = useRef(null);

  const handleFileChange = async (e) => {
    setErrorMsg('');
    setDetectedData(null);
    setIsConfirmed(false);
    sessionStorage.removeItem('fasalnirnay_image_analysis');
    
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      selectedFileRef.current = file;
      
      // Validation
      if (!file.type.startsWith('image/')) {
        setErrorMsg(t('imageInput.errorInvalid'));
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setErrorMsg(t('imageInput.errorLarge'));
        return;
      }

      const url = URL.createObjectURL(file);
      setPreview(url);
      onImageSelect(file);
      
      // Start Analysis
      setIsAnalyzing(true);
      try {
        const result = await analyzeImage(file);
        if (result.success && result.data && result.data.cropId) {
          setDetectedData(result.data);
        } else {
          setErrorMsg(t('imageInput.imageAnalysisFailed') + ' ' + t('imageInput.manualFallback'));
          onCropDetected(null); // Switch to manual
        }
      } catch (err) {
        console.error('Image Analysis Error:', err);
        setErrorMsg(t('imageInput.imageAnalysisFailed') + ' ' + t('imageInput.manualFallback'));
        onCropDetected(null); // Switch to manual
      } finally {
        setIsAnalyzing(false);
      }
    }
  };

  const handleRemove = () => {
    sessionStorage.removeItem('fasalnirnay_image_analysis');
    selectedFileRef.current = null;
    setPreview(null);
    setErrorMsg('');
    setDetectedData(null);
    setIsConfirmed(false);
    onImageSelect(null);
    onCropDetected(null);
    if (cameraInputRef.current) cameraInputRef.current.value = '';
    if (galleryInputRef.current) galleryInputRef.current.value = '';
  };
  
  const handleConfirm = async () => {
    setIsConfirmed(true);
    if (selectedFileRef.current && detectedData) {
      try {
        const compressedDataUrl = await compressImage(selectedFileRef.current);
        if (compressedDataUrl) {
          const payload = {
            imagePreview: compressedDataUrl,
            cropId: detectedData.cropId,
            cropName: detectedData.cropName,
            varietyId: detectedData.varietyId,
            varietyName: detectedData.varietyName,
            confidence: detectedData.confidence
          };
          sessionStorage.setItem('fasalnirnay_image_analysis', JSON.stringify(payload));
        }
      } catch (err) {
        console.error('Failed to store image session data:', err);
      }
    }
    onCropDetected(detectedData);
  };
  
  const handleChangeCrop = () => {
    sessionStorage.removeItem('fasalnirnay_image_analysis');
    setIsConfirmed(true); // Treat as confirmed so the manual form shows up
    onCropDetected(null); // Pass null so it defaults to manual entry
  };
  
  const getConfidenceText = (conf) => {
    if (conf >= 0.85) return t('imageInput.confidenceHigh');
    if (conf >= 0.65) return t('imageInput.confidenceMedium');
    return t('imageInput.confidenceLow');
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
        <div className="mb-4 p-4 bg-danger-50 text-danger-700 rounded-lg flex flex-col shadow-sm border border-danger-100">
          <div className="flex items-center">
            <AlertCircle className="w-6 h-6 mr-3 flex-shrink-0" />
            <p className="text-lg font-medium">{errorMsg}</p>
          </div>
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
            
            {!isAnalyzing && !isConfirmed && (
              <div className="absolute bottom-4 left-4 right-4 flex justify-center">
                <button
                  type="button"
                  onClick={() => galleryInputRef.current.click()}
                  className="bg-white/90 hover:bg-white text-surface-900 px-6 py-2.5 rounded-full font-semibold shadow-lg backdrop-blur-sm transition-all"
                >
                  {t('imageInput.change')}
                </button>
              </div>
            )}
          </div>

          {/* AI Analysis State */}
          {isAnalyzing ? (
            <div className="bg-primary-50 border border-primary-100 p-6 rounded-xl flex flex-col items-center justify-center animate-pulse">
              <Loader2 className="w-10 h-10 text-primary-500 animate-spin mb-3" />
              <p className="text-primary-900 text-xl font-bold">{t('imageInput.analyzingImage')}</p>
            </div>
          ) : detectedData && !isConfirmed ? (
            <div className="bg-white border-2 border-primary-200 p-6 rounded-xl shadow-md">
              <p className="text-surface-600 font-medium mb-2">{t('imageInput.cropDetected')}:</p>
              <h3 className="text-3xl font-bold text-primary-700 mb-2">
                {t(`crops.${detectedData.cropId}`) || detectedData.cropName} 
                {detectedData.varietyId ? ` (${t(`varieties.${detectedData.varietyId}`) || detectedData.varietyName})` : ''}
              </h3>
              <p className={`font-medium mb-6 ${detectedData.confidence >= 0.85 ? 'text-green-600' : detectedData.confidence >= 0.65 ? 'text-yellow-600' : 'text-red-500'}`}>
                {getConfidenceText(detectedData.confidence)}
              </p>
              
              <div className="flex gap-4">
                <button onClick={handleConfirm} className="flex-1 btn btn-primary py-3 text-lg">
                  {t('imageInput.confirmCrop')}
                </button>
                <button onClick={handleChangeCrop} className="flex-1 btn btn-outline py-3 text-lg">
                  {t('imageInput.changeCrop')}
                </button>
              </div>
            </div>
          ) : isConfirmed || errorMsg ? (
             <div className="bg-primary-50 border border-primary-100 p-4 rounded-xl flex items-start">
               <Info className="w-6 h-6 text-primary-600 mr-3 flex-shrink-0 mt-0.5" />
               <p className="text-primary-900 text-lg font-medium leading-snug">
                 {t('imageInput.imageDisclaimer')}
               </p>
             </div>
          ) : null}
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
