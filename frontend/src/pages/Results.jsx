import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IndianRupee, MapPin, Truck, TrendingUp, CloudRain, Clock, Image as ImageIcon, AlertCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import RecommendationCard from '../components/RecommendationCard';
import MetricCard from '../components/MetricCard';
import MandiComparison from '../components/MandiComparison';
import TrendChart from '../components/TrendChart';
import WeatherCard from '../components/WeatherCard';
import { getMarketTrend } from '../services/decisionService';
import { useTranslation } from '../i18n';

export default function Results() {
  const { t } = useTranslation();

  const location = useLocation();
  const navigate = useNavigate();
  const decision = location.state?.decision;

  const [trendData, setTrendData] = useState(null);
  const [trendError, setTrendError] = useState(false);

  useEffect(() => {
    if (decision && decision.rankedMandis && decision.rankedMandis.length > 0) {
      const fetchTrend = async () => {
        try {
          const bestMandi = decision.rankedMandis.find(m => m.mandiId === decision.bestMandi) || decision.rankedMandis[0];
          const result = await getMarketTrend(bestMandi.cropId || "tomato", bestMandi.mandiId, bestMandi.varietyId || "hybrid", 30);
          setTrendData(result);
        } catch (err) {
          console.error("Failed to fetch trend:", err);
          setTrendError(true);
        }
      };
      fetchTrend();
    }
  }, [decision]);

  if (!decision) {
    return (
      <div className="page-container flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <AlertCircle size={64} className="text-surface-400" />
        <h2 className="text-2xl font-bold text-surface-700">विश्लेषण का डेटा नहीं मिला</h2>
        <button onClick={() => navigate('/analyze')} className="btn btn-primary btn-lg">
          फसल का दोबारा विश्लेषण करें
        </button>
      </div>
    );
  }

  const bestMandiId = decision.bestMandi;
  const bestMandi = decision.rankedMandis.find(m => m.mandiId === bestMandiId) || decision.rankedMandis[0];

  // Map backend tags to Hindi strings
  const tagTranslations = {
    "weather_risk_high": "बारिश का जोखिम ज़्यादा है",
    "weather_risk_moderate": "बारिश का मध्यम जोखिम है",
    "weather_risk_low": "मौसम साफ है",
    "price_trend_decreasing": "मंडी भाव नीचे जा रहा है",
    "price_trend_increasing": "मंडी भाव बढ़ रहा है",
    "price_trend_stable": "मंडी भाव स्थिर है",
    "better_net_return": "इस मंडी में शुद्ध कमाई बेहतर है",
    "weather_supports_early_sale": "मौसम को देखते हुए जल्दी बेचना बेहतर है",
    "weather_data_unavailable": "मौसम की जानकारी उपलब्ध नहीं है"
  };

  const getReasoningText = () => {
    if (!decision.reasoningTags) return "";
    return decision.reasoningTags.map(tag => tagTranslations[tag] || tag).join(" • ");
  };

  return (
    <div className="page-container space-y-8 animate-slide-up">
      <PageHeader 
        title={t('results.title')} 
        subtitle={t('results.subtitle')}
      />

      {/* Recommendation Banner */}
      <RecommendationCard 
        mandi={bestMandi} 
        tags={decision.reasoningTags} 
        weather={decision.weather} 
      />

      {/* Mandi Comparison */}
      <div>
        <h2 className="section-title mb-4">आसपास की मंडियों की तुलना</h2>
        <MandiComparison mandis={decision.rankedMandis} bestMandiId={bestMandiId} />
      </div>

      {/* Trend Section */}
      <div className="card p-6 md:p-8">
        <h3 className="text-2xl font-bold text-surface-900 mb-6">{t('ux.trendPastDays')}</h3>
        {trendData && trendData.priceHistory ? (
          <>
            <p className="text-lg text-surface-700 leading-relaxed mb-6">
              {bestMandi.trend === 'increasing' ? t('ux.trendIncreasingExp') : bestMandi.trend === 'decreasing' ? t('ux.trendDecreasingExp') : t('ux.trendStableExp')}
            </p>
            <TrendChart data={trendData.priceHistory} title="" />
            <div className="mt-4 pt-4 border-t border-surface-200">
              <p className="font-semibold text-xl">अनुमानित भाव: ₹{(trendData.estimatedRange.min).toLocaleString('hi-IN')}–₹{(trendData.estimatedRange.max).toLocaleString('hi-IN')}/kg</p>
            </div>
          </>
        ) : trendError ? (
          <div className="flex items-center justify-center h-32 bg-surface-50 rounded-lg text-surface-500 text-lg">
            मंडी भाव का पुराना रिकॉर्ड अभी उपलब्ध नहीं है।
          </div>
        ) : (
          <div className="flex items-center justify-center h-32 bg-surface-50 rounded-lg text-surface-500 text-lg">
            डेटा लोड हो रहा है...
          </div>
        )}
      </div>

      {/* Image Analysis Section (Only rendered if actual image was uploaded and confirmed) */}
      {(() => {
        const rawImageData = sessionStorage.getItem('fasalnirnay_image_analysis');
        if (!rawImageData) return null;
        
        try {
          const imgData = JSON.parse(rawImageData);
          if (!imgData || !imgData.imagePreview) return null;

          const getConfidenceText = (conf) => {
            if (conf >= 0.85) return t('imageInput.confidenceHigh');
            if (conf >= 0.65) return t('imageInput.confidenceMedium');
            return t('imageInput.confidenceLow');
          };

          return (
            <div className="card p-6 md:p-8 animate-fade-in border-2 border-primary-100">
              <h3 className="text-2xl font-bold text-surface-900 mb-6 flex items-center gap-2">
                <span>📷</span> {t('results.uploadedCropPhoto')}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="w-full max-h-72 rounded-xl overflow-hidden shadow-md border-2 border-surface-200 bg-black flex items-center justify-center">
                  <img 
                    src={imgData.imagePreview} 
                    alt="Uploaded crop" 
                    className="w-full max-h-72 object-contain"
                  />
                </div>

                <div className="space-y-4">
                  <div className="bg-surface-50 p-5 rounded-xl border border-surface-200 space-y-4">
                    <div>
                      <span className="text-sm text-surface-500 font-semibold uppercase tracking-wider block mb-1">
                        🌱 {t('results.detectedCropLabel')}
                      </span>
                      <span className="text-3xl font-extrabold text-primary-700">
                        {t(`crops.${imgData.cropId}`) || imgData.cropName || imgData.cropId}
                      </span>
                    </div>

                    {imgData.varietyId && (
                      <div className="pt-3 border-t border-surface-200">
                        <span className="text-sm text-surface-500 font-semibold uppercase tracking-wider block mb-1">
                          🌾 {t('results.detectedVarietyLabel')}
                        </span>
                        <span className="text-xl font-bold text-surface-800">
                          {t(`varieties.${imgData.varietyId}`) || imgData.varietyName || imgData.varietyId}
                        </span>
                      </div>
                    )}

                    <div className="pt-3 border-t border-surface-200">
                      <span className="text-sm text-surface-500 font-semibold uppercase tracking-wider block mb-1">
                        🎯 {t('results.confidenceLabel')}
                      </span>
                      <span className={`inline-block font-bold text-base px-3.5 py-1.5 rounded-full ${imgData.confidence >= 0.85 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {getConfidenceText(imgData.confidence)}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-surface-500 leading-relaxed italic bg-blue-50/50 p-3 rounded-lg border border-blue-100">
                    ℹ️ {t('results.imageDisclaimer')}
                  </p>
                </div>
              </div>
            </div>
          );
        } catch (e) {
          console.error("Failed to parse image analysis session data:", e);
          return null;
        }
      })()}
    </div>
  );
}
