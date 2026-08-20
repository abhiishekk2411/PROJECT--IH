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

      {/* Image Quality layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <div className="card p-6">
          <h3 className="text-xl font-bold mb-4">{t('results.cropImageAssessment')}</h3>
          <div className="bg-surface-100 rounded-lg h-40 flex items-center justify-center mb-6 border-2 border-dashed border-surface-300">
            <ImageIcon size={48} className="text-surface-400" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-surface-100">
              <span className="text-surface-600">{t('imageAnalysis.quality')}</span>
              <span className="badge badge-primary">Good</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-surface-100">
              <span className="text-surface-600">{t('imageAnalysis.disease')}</span>
              <span className="font-medium">No significant issue detected</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-surface-100">
              <span className="text-surface-600">{t('imageAnalysis.confidence')}</span>
              <span className="badge badge-surface">Medium</span>
            </div>
          </div>
          <p className="text-sm text-surface-400 mt-4 text-center">
            {t('results.imageDisclaimer')}
          </p>
        </div>
      </div>
    </div>
  );
}
