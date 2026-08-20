import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, CheckCircle2, AlertCircle } from 'lucide-react';
import { useTranslation } from '../i18n';

const VoiceInput = ({ onVoiceSuccess }) => {
  const { t, lang } = useTranslation();
  const [status, setStatus] = useState('idle'); // idle, listening, processing, success, error, unsupported, permissionDenied
  const [transcript, setTranscript] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const recognitionRef = useRef(null);
  const transcriptRef = useRef('');

  useEffect(() => {
    // Check support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setStatus('unsupported');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    
    // Set language based on active language
    recognition.lang = lang === 'en' ? 'en-IN' : 'hi-IN';

    recognition.onstart = () => {
      setStatus('listening');
      setTranscript('');
      transcriptRef.current = '';
      setErrorMsg('');
    };

    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const result = event.results[current][0].transcript;
      setTranscript(result);
      transcriptRef.current = result;
    };

    recognition.onerror = (event) => {
      if (event.error === 'not-allowed') {
        setStatus('permissionDenied');
      } else if (event.error === 'no-speech') {
        setStatus('error');
        setErrorMsg(t('voice.error'));
      } else {
        setStatus('error');
        setErrorMsg(t('voice.error'));
      }
    };

    recognition.onend = () => {
      // Browser automatically stopped listening (e.g., user paused).
      // We must check if we captured anything and process it.
      setStatus((prevStatus) => {
        if (prevStatus === 'listening') {
          // If we have text, process it. Otherwise, return to idle.
          if (transcriptRef.current.trim().length > 0) {
            return 'processing';
          }
          return 'idle';
        }
        return prevStatus;
      });
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [lang, t]);

  // Handle the transition to 'processing' state
  useEffect(() => {
    if (status === 'processing') {
      if (transcriptRef.current.trim().length > 0) {
        processTranscript(transcriptRef.current);
      } else {
        setStatus('error');
        setErrorMsg(t('voice.error'));
      }
    }
  }, [status]);

  const processTranscript = (text) => {
    const tLower = text.toLowerCase();
    
    // 1. Crop mapping
    const cropMap = {
      'टमाटर': 'tomato', 'tomato': 'tomato', 'टोमेटो': 'tomato',
      'प्याज': 'onion', 'प्याज़': 'onion', 'onion': 'onion', 'कांदा': 'onion',
      'आलू': 'potato', 'potato': 'potato', 'बटाटा': 'potato',
      'गेहूँ': 'wheat', 'wheat': 'wheat', 'गेहूं': 'wheat',
      'धान': 'rice', 'चावल': 'rice', 'rice': 'rice',
      'कपास': 'cotton', 'cotton': 'cotton',
      'सोयाबीन': 'soybean', 'soybean': 'soybean',
      'मक्का': 'maize', 'maize': 'maize'
    };
    let crop = '';
    for (const [key, val] of Object.entries(cropMap)) {
      if (tLower.includes(key)) { crop = val; break; }
    }

    // 2. Quantity
    let quantity = '';
    const numRegex = /(\d+)\s*(kilo|kg|किलो|टन|ton)/i;
    const matchNum = tLower.match(numRegex);
    if (matchNum) {
      quantity = matchNum[1];
    } else {
      const wordNumbers = {
        'सौ': 100, 'एक सौ': 100, 'दो सौ': 200, 'तीन सौ': 300, 'चार सौ': 400, 'पांच सौ': 500, 'पाँच सौ': 500,
        'छह सौ': 600, 'सात सौ': 700, 'आठ सौ': 800, 'नौ सौ': 900, 'हजार': 1000, 'एक हजार': 1000
      };
      for (const [key, val] of Object.entries(wordNumbers)) {
        if (tLower.includes(key)) { quantity = val.toString(); break; }
      }
    }

    // 3. Location
    const locMap = {
      'नाशिक': 'Nashik', 'नासिक': 'Nashik', 'nashik': 'Nashik',
      'पुणे': 'Pune', 'pune': 'Pune',
      'मुंबई': 'Mumbai', 'mumbai': 'Mumbai'
    };
    let location = '';
    for (const [key, val] of Object.entries(locMap)) {
      if (tLower.includes(key)) { location = val; break; }
    }

    // 4. Variety
    const varietyMap = {
      'हाइब्रिड': 'hybrid', 'hybrid': 'hybrid',
      'देसी': 'local', 'local': 'local'
    };
    let variety = '';
    for (const [key, val] of Object.entries(varietyMap)) {
      if (tLower.includes(key)) { variety = val; break; }
    }

    // Validation
    if (!crop) {
      setStatus('error');
      setErrorMsg(t('voice.missingCrop'));
      return;
    }
    if (!quantity) {
      setStatus('error');
      setErrorMsg(t('voice.missingQuantity'));
      return;
    }
    if (!location) {
      setStatus('error');
      setErrorMsg(t('voice.missingLocation'));
      return;
    }
    // Variety can be default if missing
    if (!variety) variety = 'hybrid';

    setStatus('success');
    
    // Pass back to parent after a short delay so user sees success
    setTimeout(() => {
      if (onVoiceSuccess) {
        onVoiceSuccess({ crop, variety, quantity, location });
      }
    }, 1500);
  };

  const handleToggle = () => {
    if (status === 'unsupported' || status === 'permissionDenied') return;

    if (status === 'listening') {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setStatus('processing');
      if (transcript.trim().length > 0) {
        processTranscript(transcript);
      } else {
        setStatus('error');
        setErrorMsg(t('voice.error'));
      }
    } else {
      try {
        if (recognitionRef.current) {
          recognitionRef.current.start();
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const getStatusDisplay = () => {
    if (status === 'unsupported') return { icon: <MicOff className="w-10 h-10" />, text: t('voice.unsupported'), color: 'bg-surface-400' };
    if (status === 'permissionDenied') return { icon: <MicOff className="w-10 h-10" />, text: t('voice.permissionDenied'), color: 'bg-danger-500' };
    if (status === 'listening') return { icon: <Mic className="w-10 h-10 animate-pulse" />, text: t('voice.listening'), color: 'bg-danger-500' };
    if (status === 'processing') return { icon: <Mic className="w-10 h-10" />, text: t('voice.processing'), color: 'bg-primary-400' };
    if (status === 'success') return { icon: <CheckCircle2 className="w-10 h-10" />, text: t('voice.success'), color: 'bg-green-500' };
    if (status === 'error') return { icon: <AlertCircle className="w-10 h-10" />, text: errorMsg, color: 'bg-warning-500' };
    
    return { icon: <Mic className="w-10 h-10" />, text: t('voice.tapToSpeak'), color: 'bg-primary-600 hover:bg-primary-700' };
  };

  const display = getStatusDisplay();

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-8 text-center" aria-live="polite">
      <button 
        className="relative group mb-6 focus:outline-none"
        onClick={handleToggle}
        type="button"
        aria-label={display.text}
        disabled={status === 'unsupported' || status === 'permissionDenied' || status === 'processing' || status === 'success'}
      >
        {status === 'listening' && (
          <div className="absolute inset-0 bg-danger-200 rounded-full animate-ping opacity-75" style={{ transform: 'scale(1.5)' }}></div>
        )}
        <div className={`relative text-white p-6 md:p-8 rounded-full shadow-xl transition-colors z-10 flex items-center justify-center ${display.color}`}>
          {display.icon}
        </div>
      </button>
      
      <h3 className="text-xl md:text-2xl font-bold text-surface-900 mb-4">{display.text}</h3>
      
      {transcript && (
        <div className="mt-4 p-4 bg-surface-50 rounded-lg w-full max-w-lg shadow-inner border border-surface-200">
          <p className="text-lg text-surface-800 italic">"{transcript}"</p>
        </div>
      )}

      {status === 'idle' && (
        <p className="mt-6 text-base text-surface-500 bg-surface-100 p-3 rounded-md">
          {t('voice.example')}
        </p>
      )}
    </div>
  );
};

export default VoiceInput;
