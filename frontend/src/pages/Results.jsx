import React from 'react';
import { IndianRupee, MapPin, Truck, TrendingUp, CloudRain, Clock, Image as ImageIcon } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import RecommendationCard from '../components/RecommendationCard';
import MetricCard from '../components/MetricCard';
import MandiComparison from '../components/MandiComparison';
import TrendChart from '../components/TrendChart';
import WeatherCard from '../components/WeatherCard';
import { recommendation, mandiList, priceHistory, weatherData } from '../data/mockData';
import { useTranslation } from '../i18n';

export default function Results() {
  const { t } = useTranslation();

  return (
    <div className="page-container space-y-8 animate-slide-up">
      <PageHeader 
        title={t('results.title')} 
        subtitle={t('results.subtitle')}
      />

      {/* Recommendation Banner */}
      <RecommendationCard recommendation={recommendation} />

      {/* Key Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <MetricCard 
          icon={IndianRupee} 
          label={t('common.currentPrice')} 
          value={`₹${(24).toLocaleString('en-IN')}/kg`} 
          subtext={t('mandis.pimpalgaon')} 
        />
        <MetricCard 
          icon={MapPin} 
          label={t('common.distance')} 
          value={`${(32).toLocaleString('en-IN')} km`} 
          trend="neutral" 
        />
        <MetricCard 
          icon={Truck} 
          label={t('common.transportCost')} 
          value={`₹${(1080).toLocaleString('en-IN')}`} 
        />
        <MetricCard 
          icon={TrendingUp} 
          label={t('common.priceTrend')} 
          value={`↑ ${t('common.increasing')}`}
          subtext={`+4.2% ${t('common.thisWeek')}`} 
          trend="up" 
        />
        <MetricCard 
          icon={CloudRain} 
          label={t('common.weatherRisk')} 
          value={t('common.moderate')} 
          subtext={`65% ${t('common.rainProbability')}`} 
        />
      </div>

      {/* Mandi Comparison */}
      <div>
        <h2 className="section-title mb-4">{t('results.mandiComparison')}</h2>
        <MandiComparison mandis={mandiList} />
      </div>

      {/* Two-column layout: Trend & Decision */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card p-6">
          <TrendChart data={priceHistory} title={t('trend.historicalPriceTrend')} />
          <div className="mt-4 pt-4 border-t border-surface-200">
            <p className="font-semibold text-2xl">{t('results.estimatedPriceRange')}: ₹{(23).toLocaleString('en-IN')}–₹{(26).toLocaleString('en-IN')}/kg</p>
            <p className="text-base text-surface-500 mt-1">{t('results.priceRangeDisclaimer')}</p>
          </div>
        </div>

        <div className="card p-6 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="text-primary-600" size={28} />
            <h3 className="text-xl font-bold">{t('results.sellNowOrWait')}</h3>
          </div>
          <div className="mb-6">
            <span className={`badge px-4 py-2 text-xl ${recommendation.sellNowVsWait === 'sellNow' ? 'badge-primary' : 'badge-surface'}`}>
              {t('common.' + recommendation.sellNowVsWait)}
            </span>
          </div>
          <p className="text-surface-700 text-lg leading-relaxed">
            {recommendation.sellNowReason}
          </p>
        </div>
      </div>

      {/* Two-column layout: Weather & Quality */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <WeatherCard weather={weatherData} />

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
