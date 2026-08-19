import React, { useState } from 'react';
import { Mic, SendHorizontal } from 'lucide-react';
import { useTranslation } from '../i18n';

const ChatInput = ({ onSend, disabled }) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !disabled) {
      onSend(inputValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-white border-t border-surface-200 p-3 md:p-4 flex items-center gap-2"
    >
      <button
        type="button"
        className="flex-shrink-0 p-2.5 text-surface-400 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
        title={t('chat.voiceComingSoon')}
      >
        <Mic className="w-5 h-5" />
      </button>
      
      <div className="flex-1 relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={t('chat.inputPlaceholder')}
          className="form-input w-full py-2.5 pl-4 pr-4 rounded-full border-surface-300 focus:border-primary-500 focus:ring-primary-500 bg-surface-50 focus:bg-white transition-colors text-base"
        />
      </div>
      
      <button
        type="submit"
        disabled={disabled || !inputValue.trim()}
        className="flex-shrink-0 p-2.5 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 shadow-sm"
      >
        <SendHorizontal className="w-5 h-5 ml-0.5" />
      </button>
    </form>
  );
};

export default ChatInput;
