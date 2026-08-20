import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, TrendingUp, TrendingDown, Minus, CloudRain, Sun, Cloud, AlertTriangle, Volume2, Square } from 'lucide-react';
import { useTranslation } from '../i18n';

const RecommendationCard = ({ mandi, tags, weather }) => {
  const { t, lang } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const synthRef = useRef(window.speechSynthesis);

  useEffect(() => {
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  if (!mandi) return null;

  const getWeatherIcon = (level) => {
    if (level === 'high') return <CloudRain className="w-8 h-8 text-blue-500 mr-3" />;
    if (level === 'moderate') return <Cloud className="w-8 h-8 text-blue-400 mr-3" />;
    return <Sun className="w-8 h-8 text-orange-400 mr-3" />;
  };

  const getWeatherTitle = (level) => {
    if (level === 'high') return t('tags.weather_risk_high');
    if (level === 'moderate') return t('tags.weather_risk_moderate');
    if (level === 'low') return t('tags.weather_risk_low');
    return t('tags.weather_data_unavailable');
  };

  const getWeatherExplanation = (level) => {
    if (level === 'high') return t('ux.weatherHighExp');
    if (level === 'moderate') return t('ux.weatherModerateExp');
    if (level === 'low') return t('ux.weatherLowExp');
    return '';
  };

  const generateSpeechText = () => {
    const mandiName = t('mandis.' + mandi.mandiId) || mandi.mandiName;
    const amount = mandi.expectedNetReturn.toString();
    const advice = mandi.sell_now_vs_wait === 'sell_now' ? t('ux.sellNowReason') : t('ux.waitReason');
    const weatherExp = weather && weather.available ? getWeatherExplanation(weather.riskLevel) : '';

    let text = `${t('tts.speechIntro').replace('{{mandi}}', mandiName)} ${t('tts.speechReturn').replace('{{amount}}', amount)} ${t('tts.speechAdvice').replace('{{advice}}', advice)}`;
    if (weatherExp) {
      text += ` ${t('tts.speechWeather').replace('{{weather}}', weatherExp)}`;
    }
    return text;
  };

  const toggleSpeech = () => {
    if (isPlaying) {
      synthRef.current.cancel();
      setIsPlaying(false);
    } else {
      synthRef.current.cancel(); // cancel any ongoing speech
      const text = generateSpeechText();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'en' ? 'en-IN' : 'hi-IN';
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      synthRef.current.speak(utterance);
      setIsPlaying(true);
    }
  };

  // Derive quantity from expectedRevenue and price
  const quantity = Math.round(mandi.expectedRevenue / mandi.price);

  return (
    <div className="space-y-6">
      
      {/* Main Recommendation Section */}
      <div className="card overflow-hidden border-l-8 border-l-primary-500 bg-white">
        <div className="p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
            <div className="flex items-center space-x-2 text-primary-700">
              <CheckCircle2 className="w-8 h-8" />
              <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wide">{t('ux.bestMandiHeading')}</h2>
            </div>
            
            <button 
              onClick={toggleSpeech}
              className={`flex items-center justify-center px-4 py-2.5 rounded-full font-bold transition-all ${isPlaying ? 'bg-danger-100 text-danger-700 hover:bg-danger-200' : 'bg-primary-100 text-primary-700 hover:bg-primary-200 shadow-sm'}`}
            >
              {isPlaying ? (
                <>
                  <Square className="w-5 h-5 mr-2 fill-current" />
                  {t('tts.stopListening')}
                </>
              ) : (
                <>
                  <Volume2 className="w-5 h-5 mr-2" />
                  {t('tts.listenRecommendation')}
                </>
              )}
            </button>
          </div>
          
          <h3 className="text-4xl md:text-5xl font-extrabold text-surface-900 mb-4 break-words">
            {t('mandis.' + mandi.mandiId) || mandi.mandiName}
          </h3>
          
          <p className="text-xl md:text-2xl text-surface-700 mb-6 leading-relaxed">
            {t('ux.approximateReturn')} <span className="font-bold text-primary-700 text-3xl mx-1 whitespace-nowrap">₹{mandi.expectedNetReturn.toLocaleString('hi-IN')}</span> {t('ux.approximateReturnEnd')}
          </p>
          <p className="text-base text-surface-500">
            ({t('ux.netReturnDesc')})
          </p>
        </div>
      </div>

      {/* Our Advice: Sell Now vs Wait */}
      <div className={`card overflow-hidden border-2 ${mandi.sell_now_vs_wait === 'sell_now' ? 'border-primary-500 bg-primary-50' : 'border-surface-400 bg-surface-50'}`}>
        <div className="p-6 md:p-8">
          <h3 className="text-lg font-bold text-surface-600 mb-2">{t('ux.ourAdvice')}</h3>
          <h4 className={`text-3xl md:text-4xl font-extrabold mb-3 ${mandi.sell_now_vs_wait === 'sell_now' ? 'text-primary-800' : 'text-surface-800'}`}>
            {t(`tags.${mandi.sell_now_vs_wait}`)}
          </h4>
          <p className="text-lg text-surface-700 leading-relaxed">
            {mandi.sell_now_vs_wait === 'sell_now' ? t('ux.sellNowReason') : t('ux.waitReason')}
          </p>
        </div>
      </div>

      {/* Why This Mandi? */}
      <div className="card p-6 md:p-8">
        <h3 className="text-2xl font-bold text-surface-900 mb-5">{t('ux.whyThisMandi')}</h3>
        <ul className="space-y-4">
          {tags && tags.map((tag, idx) => (
            <li key={idx} className="flex items-start text-lg md:text-xl text-surface-700">
              <CheckCircle2 className="w-6 h-6 text-primary-500 mr-3 mt-1 flex-shrink-0" />
              <span>{t(`tags.${tag}`) || tag}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Weather Risk */}
      {weather && weather.available && (
        <div className="card p-6 md:p-8 flex items-start bg-white">
          {getWeatherIcon(weather.riskLevel)}
          <div>
            <h3 className="text-2xl font-bold text-surface-900 mb-2">{getWeatherTitle(weather.riskLevel)}</h3>
            <p className="text-lg text-surface-700 leading-relaxed mb-2">{getWeatherExplanation(weather.riskLevel)}</p>
            <p className="text-base text-surface-500 font-medium">{t('common.rainProbability')}: {weather.rainProbability}%</p>
          </div>
        </div>
      )}

      {/* Money Breakdown */}
      <div className="card p-6 md:p-8 bg-surface-50">
        <h3 className="text-2xl font-bold text-surface-900 mb-6">{t('ux.moneyBreakdownTitle')}</h3>
        
        <div className="space-y-4 text-lg md:text-xl">
          <div className="flex justify-between items-center text-surface-700">
            <span>{t('ux.cropAmount')}</span>
            <span className="font-medium whitespace-nowrap">{quantity.toLocaleString('hi-IN')} {t('common.kg')}</span>
          </div>
          <div className="flex justify-between items-center text-surface-700">
            <span>{t('common.price')}</span>
            <span className="font-medium whitespace-nowrap">₹{mandi.price.toLocaleString('hi-IN')} {t('common.perKg')}</span>
          </div>
          
          <div className="border-b-2 border-surface-200 my-4"></div>
          
          <div className="flex justify-between items-center font-bold text-surface-900">
            <span>{t('ux.totalSale')}</span>
            <span className="whitespace-nowrap">₹{mandi.expectedRevenue.toLocaleString('hi-IN')}</span>
          </div>
          
          <div className="border-b-2 border-surface-200 my-4"></div>
          
          <div className="flex justify-between items-center text-danger-600">
            <span>{t('common.transportCost')}</span>
            <span className="whitespace-nowrap">− ₹{mandi.transportCost.toLocaleString('hi-IN')}</span>
          </div>
          <div className="flex justify-between items-center text-danger-600">
            <span>{t('common.weatherRisk')}</span>
            <span className="whitespace-nowrap">− ₹{mandi.riskPenalty.toLocaleString('hi-IN')}</span>
          </div>
          
          <div className="border-b-2 border-surface-300 my-4"></div>
          
          <div className="flex justify-between items-center text-2xl font-extrabold text-primary-700">
            <span>{t('common.expectedNetReturn')}</span>
            <span className="whitespace-nowrap">₹{mandi.expectedNetReturn.toLocaleString('hi-IN')}</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default RecommendationCard;
