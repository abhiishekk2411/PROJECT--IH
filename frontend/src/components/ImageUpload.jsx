import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { useTranslation } from '../i18n';

const ImageUpload = ({ onImageSelect, preview }) => {
  const { t } = useTranslation();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        onImageSelect(file);
      }
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelect(e.target.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    onImageSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleChange}
      />
      
      {preview ? (
        <div className="relative rounded-lg overflow-hidden border border-surface-200">
          <img src={preview} alt="Crop preview" className="w-full h-48 object-cover" />
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1.5 bg-surface-900 bg-opacity-70 text-white rounded-full hover:bg-opacity-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors duration-200 flex flex-col items-center justify-center h-48 ${
            isDragging
              ? 'border-primary-500 bg-primary-50'
              : 'border-surface-300 hover:border-primary-400 hover:bg-surface-50'
          }`}
        >
          <div className="p-3 bg-surface-100 rounded-full mb-3 text-surface-500">
            <Upload className="w-6 h-6" />
          </div>
          <p className="text-lg text-surface-900 font-medium mb-1">{t('imageUpload.uploadTitle')}</p>
          <p className="text-surface-500 text-base">{t('imageUpload.uploadSubtitle')}</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
