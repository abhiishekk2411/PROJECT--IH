import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { historyEntries } from '../data/mockData';
import { useTranslation } from '../i18n';

export default function History() {
  const { t } = useTranslation();

  return (
    <div className="page-container animate-fade-in">
      <PageHeader 
        title={t('historyPage.title')} 
        subtitle={t('historyPage.subtitle')} 
      />

      {historyEntries && historyEntries.length > 0 ? (
        <div className="flex flex-col gap-4 max-w-4xl mx-auto">
          {historyEntries.map((entry) => (
            <div key={entry.id} className="card p-6 flex flex-col md:flex-row justify-between items-center gap-6 hover:shadow-md transition-shadow">
              <div className="w-full md:w-auto flex-1">
                <p className="text-base text-surface-500 mb-1">
                  {new Date(entry.date).toLocaleDateString('en-IN', {
                    year: 'numeric', month: 'short', day: 'numeric'
                  })}
                </p>
                <h3 className="text-2xl font-bold mb-1">
                  {t('crops.' + entry.crop)} <span className="text-surface-500 font-normal text-lg">({t('varieties.' + entry.variety)})</span>
                </h3>
                <p className="text-surface-700 mb-3 text-lg">{t('common.quantity')}: {entry.quantity.toLocaleString('en-IN')} {t('common.' + entry.unit)}</p>
                
                <div className="flex flex-wrap gap-2">
                  <span className={`badge ${entry.decision === 'sellNow' ? 'badge-primary' : 'badge-surface'}`}>
                    {t('common.' + entry.decision)}
                  </span>
                  <span className="badge badge-gray text-base">
                    {t('mandis.' + entry.recommendedMandi)}
                  </span>
                </div>
              </div>
              
              <div className="w-full md:w-auto text-left md:text-right flex flex-col md:items-end justify-center border-t md:border-t-0 md:border-l border-surface-200 pt-4 md:pt-0 md:pl-6">
                <p className="metric-label mb-1">{t('common.expectedNetReturn')}</p>
                <p className="metric-value-green mb-4">₹{entry.netReturn.toLocaleString('en-IN')}</p>
                <Link to="/results" className="btn btn-secondary btn-sm w-full md:w-auto">
                  {t('historyPage.viewDetails')}
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card p-12 flex flex-col items-center justify-center text-center max-w-2xl mx-auto mt-8">
          <Clock size={48} className="text-surface-300 mb-4" />
          <h3 className="text-xl font-bold mb-2">{t('historyPage.noDecisions')}</h3>
          <p className="text-surface-600 mb-6">{t('historyPage.noDecisionsSubtitle')}</p>
          <Link to="/analyze" className="btn btn-primary">
            {t('historyPage.startNewAnalysis')}
          </Link>
        </div>
      )}
    </div>
  );
}
