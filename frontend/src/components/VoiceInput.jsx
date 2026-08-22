import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, CheckCircle2, AlertCircle, Loader2, MicOff } from 'lucide-react';
import { useTranslation } from '../i18n';

const VoiceInput = ({ onVoiceSuccess }) => {
  const { t } = useTranslation();
  
  // Statuses: 'idle' | 'listening' | 'processing' | 'success' | 'error' | 'unsupported' | 'permissionDenied'
  const [status, setStatus] = useState('idle');
  const [transcript, setTranscript] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [parsedResult, setParsedResult] = useState(null);

  const speakHindi = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel(); // Clear any overlapping audio
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hi-IN';
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const recognitionRef = useRef(null);
  const isListeningRef = useRef(false);
  const transcriptRef = useRef('');

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setStatus('unsupported');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'hi-IN';

    recognition.onstart = () => {
      console.log('[Voice] recognition started');
      setStatus('listening');
      setErrorMsg('');
    };

    recognition.onresult = (event) => {
      let fullTranscript = '';
      for (let i = 0; i < event.results.length; i++) {
        fullTranscript += event.results[i][0].transcript;
      }
      console.log('[Voice] result:', fullTranscript);
      setTranscript(fullTranscript);
      transcriptRef.current = fullTranscript;
    };

    recognition.onerror = (event) => {
      console.log('[Voice] recognition error:', event.error);
      if (event.error === 'aborted') {
        return;
      }
      
      isListeningRef.current = false;
      
      if (event.error === 'not-allowed' || event.error === 'permission-denied') {
        setStatus('permissionDenied');
        const msg = 'माइक्रोफ़ोन की अनुमति नहीं मिली। कृपया Chrome में माइक्रोफ़ोन की अनुमति दें।';
        setErrorMsg(msg);
        speakHindi(msg);
      } else if (event.error === 'no-speech') {
        setStatus('error');
        const msg = 'आवाज़ सुनाई नहीं दी। कृपया फिर से बोलें।';
        setErrorMsg(msg);
        speakHindi(msg);
      } else if (event.error === 'network') {
        setStatus('error');
        const msg = 'आवाज़ पहचानने की सेवा से कनेक्शन नहीं हो पाया। कृपया फिर कोशिश करें।';
        setErrorMsg(msg);
        speakHindi(msg);
      } else {
        setStatus('error');
        const msg = 'आवाज़ समझ नहीं आई। कृपया दोबारा कोशिश करें।';
        setErrorMsg(msg);
        speakHindi(msg);
      }
    };

    recognition.onend = () => {
      console.log('[Voice] recognition ended. isListeningRef:', isListeningRef.current);
      if (isListeningRef.current) {
        try {
          console.log('[Voice] Auto-restarting recognition...');
          recognition.start();
        } catch (err) {
          console.warn('[Voice] Failed to restart recognition:', err);
          isListeningRef.current = false;
          handleFinishListening();
        }
      } else {
        handleFinishListening();
      }
    };

    recognitionRef.current = recognition;

    return () => {
      isListeningRef.current = false;
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {}
      }
    };
  }, []);

  const handleFinishListening = () => {
    const text = transcriptRef.current.trim();
    if (text.length > 0) {
      setStatus('processing');
      processTranscript(text);
    } else {
      setStatus((prev) => (prev === 'listening' ? 'idle' : prev));
    }
  };

  const startListening = () => {
    if (!recognitionRef.current) return;
    setTranscript('');
    transcriptRef.current = '';
    setErrorMsg('');
    setParsedResult(null);
    isListeningRef.current = true;

    try {
      recognitionRef.current.start();
    } catch (e) {
      console.warn('[Voice] Start error:', e);
      try {
        recognitionRef.current.stop();
      } catch (err) {}
      setTimeout(() => {
        try {
          recognitionRef.current.start();
        } catch (err2) {
          console.error('[Voice] Retry start failed:', err2);
        }
      }, 200);
    }
  };

  const stopListening = () => {
    isListeningRef.current = false;
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    handleFinishListening();
  };

  const processTranscript = (text) => {
    console.log('[Voice] Processing transcript:', text);
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
    const numRegex = /(\d+)\s*(kilo|kg|किलो|टन|ton|quintal|क्विंटल)?/i;
    const matchNum = tLower.match(numRegex);
    if (matchNum && matchNum[1]) {
      quantity = matchNum[1];
    } else {
      const wordNumbers = {
        'सौ': 100, 'एक सौ': 100, 'दो सौ': 200, 'तीन सौ': 300, 'चार सौ': 400, 'पांच सौ': 500, 'पाँच सौ': 500,
        'छह सौ': 600, 'सात सौ': 700, 'आठ सौ': 800, 'नौ सौ': 900, 'हजार': 1000, 'एक हजार': 1000
      };
      for (const [key, val] of Object.entries(wordNumbers)) {
        if (tLower.includes(key)) { quantity = val.toString(); break; }
      }
      if (!quantity) {
        const plainNumMatch = tLower.match(/(\d+)/);
        if (plainNumMatch) quantity = plainNumMatch[1];
      }
    }

    // 3. Location
    const locMap = {
      'नाशिक': 'Nashik', 'नासिक': 'Nashik', 'nashik': 'Nashik',
      'पुणे': 'Pune', 'pune': 'Pune',
      'मुंबई': 'Mumbai', 'mumbai': 'Mumbai',
      'दिल्ली': 'Delhi', 'delhi': 'Delhi'
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
    if (!variety) variety = 'hybrid';

    console.log('[Voice] parsed data:', { crop, variety, quantity, location });

    if (!crop && !quantity && !location) {
      setStatus('error');
      const msg = 'आपकी बात समझ नहीं आई। कृपया फसल, मात्रा और शहर का नाम साफ़ बोलें।';
      setErrorMsg(msg);
      speakHindi(msg);
      return;
    }

    if (!crop) {
      setStatus('error');
      const msg = 'फसल समझ नहीं आई। कृपया फसल का नाम बोलें, जैसे: "टमाटर"';
      setErrorMsg(msg);
      speakHindi(msg);
      return;
    }

    if (!quantity) {
      setStatus('error');
      const msg = 'मात्रा समझ नहीं आई। कृपया मात्रा बोलें, जैसे: "800 किलो"';
      setErrorMsg(msg);
      speakHindi(msg);
      return;
    }

    if (!location) {
      setStatus('error');
      const msg = 'स्थान समझ नहीं आया। कृपया शहर का नाम बोलें, जैसे: "नासिक"';
      setErrorMsg(msg);
      speakHindi(msg);
      return;
    }

    const detected = { crop, variety, quantity, location };
    setParsedResult(detected);
    setStatus('success');

    // Convert internal crop values back to Hindi for speech
    const cropNamesInHindi = {
      'tomato': 'टमाटर', 'onion': 'प्याज', 'potato': 'आलू',
      'wheat': 'गेहूँ', 'rice': 'धान', 'cotton': 'कपास',
      'soybean': 'सोयाबीन', 'maize': 'मक्का'
    };
    const speechCrop = cropNamesInHindi[crop] || crop;
    speakHindi(`आपकी जानकारी मिल गई है। फसल: ${speechCrop}, मात्रा: ${quantity} किलो, स्थान: ${location}`);

    setTimeout(() => {
      if (onVoiceSuccess) {
        onVoiceSuccess(detected);
      }
    }, 2500);
  };

  const handleToggle = () => {
    if (status === 'unsupported' || status === 'permissionDenied' || status === 'processing' || status === 'success') return;

    if (status === 'listening') {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-8 text-center" aria-live="polite">
      {status === 'unsupported' ? (
        <div className="p-6 bg-danger-50 text-danger-700 rounded-2xl border border-danger-100 max-w-md">
          <MicOff className="w-12 h-12 mx-auto mb-3 text-danger-500" />
          <h3 className="text-xl font-bold mb-2">इस ब्राउज़र में आवाज़ इनपुट उपलब्ध नहीं है</h3>
          <p className="text-base text-surface-600">कृपया आवाज़ से जानकारी भरने के लिए Chrome या Edge का इस्तेमाल करें।</p>
        </div>
      ) : status === 'permissionDenied' ? (
        <div className="p-6 bg-danger-50 text-danger-700 rounded-2xl border border-danger-100 max-w-md">
          <MicOff className="w-12 h-12 mx-auto mb-3 text-danger-500" />
          <h3 className="text-xl font-bold mb-2">माइक्रोफ़ोन की अनुमति नहीं मिली</h3>
          <p className="text-base text-surface-600">{errorMsg}</p>
        </div>
      ) : (
        <>
          <button 
            className="relative group mb-6 focus:outline-none"
            onClick={handleToggle}
            type="button"
            disabled={status === 'processing' || status === 'success'}
          >
            {status === 'listening' && (
              <div className="absolute inset-0 bg-danger-200 rounded-full animate-ping opacity-75" style={{ transform: 'scale(1.4)' }}></div>
            )}
            <div className={`relative text-white p-6 md:p-8 rounded-full shadow-xl transition-all duration-300 z-10 flex items-center justify-center ${
              status === 'listening' ? 'bg-danger-600 hover:bg-danger-700' :
              status === 'processing' ? 'bg-primary-500' :
              status === 'success' ? 'bg-green-600' : 'bg-primary-600 hover:bg-primary-700'
            }`}>
              {status === 'listening' ? (
                <Square className="w-10 h-10 fill-white" />
              ) : status === 'processing' ? (
                <Loader2 className="w-10 h-10 animate-spin" />
              ) : status === 'success' ? (
                <CheckCircle2 className="w-10 h-10" />
              ) : (
                <Mic className="w-10 h-10" />
              )}
            </div>
          </button>

          <h3 className="text-2xl font-bold text-surface-900 mb-2">
            {status === 'listening' ? '🔴 सुन रहा हूँ... बोलिए' :
             status === 'processing' ? 'जानकारी समझी जा रही है...' :
             status === 'success' ? '✓ जानकारी मिल गई!' :
             status === 'error' ? 'फिर से कोशिश करें' :
             '🎤 बोलकर जानकारी भरें'}
          </h3>

          {status === 'listening' && (
            <p className="text-base text-surface-600 mb-4">
              बोलना पूरा होने पर रोकें (⏹️) बटन दबाएं या रुकें।
            </p>
          )}

          {errorMsg && status === 'error' && (
            <div className="mb-4 p-4 bg-warning-50 text-warning-800 rounded-xl border border-warning-200 flex items-center gap-3 max-w-lg">
              <AlertCircle className="w-6 h-6 text-warning-600 flex-shrink-0" />
              <p className="text-base font-semibold text-left">{errorMsg}</p>
            </div>
          )}

          {transcript && (
            <div className="mt-2 p-4 bg-surface-50 rounded-xl w-full max-w-lg shadow-inner border border-surface-200 text-left">
              <span className="text-xs font-bold text-surface-400 uppercase tracking-wider block mb-1">मैंने सुना:</span>
              <p className="text-lg text-surface-800 font-medium italic">"{transcript}"</p>
            </div>
          )}

          {parsedResult && status === 'success' && (
            <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200 max-w-lg w-full text-left animate-fade-in">
              <span className="text-xs font-bold text-green-700 uppercase tracking-wider block mb-2">समझी गई जानकारी:</span>
              <div className="grid grid-cols-2 gap-2 text-base text-surface-800 font-semibold">
                <div>🌱 फसल: <span className="text-primary-700">{parsedResult.crop}</span></div>
                <div>🌾 किस्म: <span className="text-primary-700">{parsedResult.variety}</span></div>
                <div>📦 मात्रा: <span className="text-primary-700">{parsedResult.quantity} किलो</span></div>
                <div>📍 स्थान: <span className="text-primary-700">{parsedResult.location}</span></div>
              </div>
            </div>
          )}

          {status === 'idle' && (
            <p className="mt-6 text-base text-surface-500 bg-surface-100 p-4 rounded-xl max-w-lg font-medium border border-surface-200">
              {t('voice.example')}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default VoiceInput;
