import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BarChart3, IndianRupee, Wheat, MapPin, Search, GitCompare, MessageCircle, AlertCircle, Loader2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import MetricCard from '../components/MetricCard';
import { getDashboard } from '../services/decisionService';
import { useTranslation } from '../i18n';

export default function Dashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const result = await getDashboard();
        setData(result);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError(t('historyPage.error'));
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [t]);

  if (loading) {
    return (
      <div className="page-container flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="w-12 h-12 text-primary-500 animate-spin mb-4" />
        <p className="text-lg text-surface-600">{t('historyPage.loading') || 'Loading...'}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container flex flex-col items-center justify-center min-h-[50vh]">
        <AlertCircle className="w-16 h-16 text-danger-500 mb-4" />
        <h3 className="text-2xl font-bold text-surface-800 mb-2">{t('historyPage.error') || 'Error'}</h3>
        <p className="text-surface-600 mb-6">{error}</p>
        <button onClick={() => window.location.reload()} className="btn btn-primary">Try Again</button>
      </div>
    );
  }

  // Handle empty state gracefully
  const hasHistory = data && data.totalAnalyses > 0;

  return (
    <div className="page-container animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <PageHeader 
          title={t('dashboard.welcome')} 
          subtitle={t('dashboard.welcomeSubtitle')} 
        />
        <button onClick={() => navigate('/analyze')} className="btn btn-primary w-full md:w-auto">
          {t('dashboard.startNewAnalysis')}
        </button>
      </div>

      {hasHistory ? (
        <>
          {/* Quick Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <MetricCard icon={BarChart3} label={t('dashboard.totalAnalyses')} value={data.totalAnalyses.toLocaleString('hi-IN')} />
            <MetricCard icon={IndianRupee} label={t('dashboard.avgNetReturn')} value={`₹${data.averageNetReturn.toLocaleString('hi-IN')}`} />
            <MetricCard icon={Wheat} label={t('dashboard.bestPerformingCrop')} value={data.latestCrop ? t(`crops.${data.latestCrop}`) || data.latestCrop : t('dashboard.noCrop')} />
            <MetricCard icon={MapPin} label={t('dashboard.latestRecommendation')} value={data.latestMandi ? t(`mandis.${data.latestMandi}`) || data.latestMandi : t('dashboard.noMandi')} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Latest Recommendation Card */}
              {data.recentAnalyses && data.recentAnalyses[0] && (
                <div className="card card-highlight p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold">{t('dashboard.latestRecommendation')}</h2>
                    <span className="badge badge-accent">{t('common.bestOption')}</span>
                  </div>
                  <div className="mb-6">
                    <p className="text-surface-600 mb-1 text-lg">{t(`mandis.${data.recentAnalyses[0].selectedMandiId}`) || data.recentAnalyses[0].selectedMandiName}</p>
                    <p className="metric-value-lg text-primary-600">₹{(data.recentAnalyses[0].expectedNetReturn).toLocaleString('hi-IN')}</p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    <div>
                      <p className="metric-label">{t('common.price')}</p>
                      <p className="font-semibold text-lg">₹{(data.recentAnalyses[0].selectedMandiPrice).toLocaleString('hi-IN')}/kg</p>
                    </div>
                    <div>
                      <p className="metric-label">{t('common.crop')}</p>
                      <p className="font-semibold text-lg">{t(`crops.${data.recentAnalyses[0].cropId}`) || data.recentAnalyses[0].cropId}</p>
                    </div>
                    <div>
                      <p className="metric-label">{t('common.transport')}</p>
                      <p className="font-semibold text-lg">₹{(data.recentAnalyses[0].transportCost).toLocaleString('hi-IN')}</p>
                    </div>
                    <div>
                      <p className="metric-label">{t('common.trend')}</p>
                      <p className={`font-semibold ${data.recentAnalyses[0].trend === 'increasing' ? 'text-green-600' : data.recentAnalyses[0].trend === 'decreasing' ? 'text-red-600' : 'text-gray-600'}`}>
                        {t(`common.${data.recentAnalyses[0].trend}`) || data.recentAnalyses[0].trend}
                      </p>
                    </div>
                  </div>
                  <Link to="/history" className="text-primary-600 font-medium hover:underline flex items-center gap-1">
                    {t('dashboard.viewFullAnalysis')} <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Right column */}
            <div className="space-y-8">
              {/* Buyer Stats (PS 26132) */}
              <div className="card p-6 border-2 border-primary-50 bg-surface-50">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2 text-surface-900">
                  <span>🛒</span> अभी उपलब्ध खरीदार
                </h3>
                <p className="text-surface-600 mb-4 text-sm">
                  सिस्टम में आपकी फसलों के लिए संभावित खरीदारों की मांग।
                </p>
                <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-surface-200">
                  <div className="text-surface-500 font-semibold">कुल खरीदार:</div>
                  <div className="text-3xl font-extrabold text-primary-700">{data.totalBuyers || 3}</div>
                </div>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-bold mb-4">{t('dashboard.quickActions')}</h3>
                <div className="flex flex-col gap-3">
                  <Link to="/analyze" className="btn btn-secondary flex items-center justify-center gap-2 py-3">
                    <Search size={20} /> {t('dashboard.analyzeNewCrop')}
                  </Link>
                  <Link to="/chat" className="btn btn-outline flex items-center justify-center gap-2 py-3">
                    <MessageCircle size={20} /> {t('dashboard.askCropAssistant')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="card p-12 flex flex-col items-center justify-center text-center max-w-2xl mx-auto mt-8 mb-12 border-dashed border-2 border-primary-200 bg-primary-50">
          <BarChart3 size={64} className="text-primary-300 mb-6" />
          <h3 className="text-2xl font-bold mb-2">{t('dashboard.noHistoryTitle')}</h3>
          <p className="text-surface-600 mb-8 text-lg">{t('dashboard.noHistorySubtitle')}</p>
          <Link to="/analyze" className="btn btn-primary btn-lg shadow-md px-8 py-4 text-lg">
            {t('dashboard.startNewAnalysis')}
          </Link>
        </div>
      )}

      {/* Quick Actions at bottom for both states */}
      <div className="mt-8">
        <h2 className="section-title mb-4">{t('dashboard.quickActions')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
          <Link to="/analyze" className="card p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <Search size={32} className="text-primary-500 mb-3" />
            <span className="font-medium text-lg">{t('dashboard.analyzeNewCrop')}</span>
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
