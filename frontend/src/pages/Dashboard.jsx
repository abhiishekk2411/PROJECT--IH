import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BarChart3, IndianRupee, Wheat, MapPin, Search, GitCompare, MessageCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import MetricCard from '../components/MetricCard';
import CropSummaryCard from '../components/CropSummaryCard';
import MandiCard from '../components/MandiCard';
import WeatherCard from '../components/WeatherCard';
import { currentCrop, mandiList, weatherData } from '../data/mockData';
import { useTranslation } from '../i18n';

export default function Dashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="page-container animate-fade-in">
      <div className="flex justify-between items-end mb-8">
        <PageHeader 
          title={t('dashboard.welcome')} 
          subtitle={t('dashboard.welcomeSubtitle')} 
        />
        <button onClick={() => navigate('/analyze')} className="btn btn-primary">
          {t('dashboard.startNewAnalysis')}
        </button>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard icon={BarChart3} label={t('dashboard.totalAnalyses')} value={(12).toLocaleString('en-IN')} />
        <MetricCard icon={IndianRupee} label={t('dashboard.avgNetReturn')} value={`₹${(16480).toLocaleString('en-IN')}`} />
        <MetricCard icon={Wheat} label={t('dashboard.bestPerformingCrop')} value={t('crops.tomato')} />
        <MetricCard icon={MapPin} label={t('dashboard.nearbyMandis')} value={(5).toLocaleString('en-IN')} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-8">
          <CropSummaryCard crop={currentCrop} />
          
          {/* Latest Recommendation Card */}
          <div className="card card-highlight p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">{t('dashboard.latestRecommendation')}</h2>
              <span className="badge badge-accent">{t('common.bestOption')}</span>
            </div>
            <div className="mb-6">
              <p className="text-surface-600 mb-1 text-lg">{t('mandis.pimpalgaon')}</p>
              <p className="metric-value-lg text-primary-600">₹{(17920).toLocaleString('en-IN')}</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div>
                <p className="metric-label">{t('common.price')}</p>
                <p className="font-semibold text-lg">₹{(24).toLocaleString('en-IN')}/kg</p>
              </div>
              <div>
                <p className="metric-label">{t('common.distance')}</p>
                <p className="font-semibold text-lg">{(32).toLocaleString('en-IN')} km</p>
              </div>
              <div>
                <p className="metric-label">{t('common.transport')}</p>
                <p className="font-semibold text-lg">₹{(1080).toLocaleString('en-IN')}</p>
              </div>
              <div>
                <p className="metric-label">{t('common.trend')}</p>
                <p className="font-semibold text-primary-600">↑ {t('common.increasing')}</p>
              </div>
            </div>
            <Link to="/results" className="text-primary-600 font-medium hover:underline flex items-center gap-1">
              {t('dashboard.viewFullAnalysis')} <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-8">
          <WeatherCard weather={weatherData} />
        </div>
      </div>

      {/* Market Snapshot */}
      <div className="mb-8">
        <h2 className="section-title mb-4">{t('dashboard.nearbyMandis')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mandiList.slice(0, 3).map((mandi, index) => (
            <MandiCard key={mandi.id} mandi={mandi} rank={index + 1} />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="section-title mb-4">{t('dashboard.quickActions')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/analyze" className="card p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <Search size={32} className="text-primary-500 mb-3" />
            <span className="font-medium text-lg">{t('dashboard.analyzeNewCrop')}</span>
          </Link>
          <Link to="/results" className="card p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <GitCompare size={32} className="text-primary-500 mb-3" />
            <span className="font-medium text-lg">{t('dashboard.compareMarkets')}</span>
          </Link>
          <Link to="/chat" className="card p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <MessageCircle size={32} className="text-primary-500 mb-3" />
            <span className="font-medium text-lg">{t('dashboard.askCropAssistant')}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
