import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sprout, Wheat, GitCompare, Calculator, Trophy, MapPin, TrendingUp, Shield, ShieldCheck } from 'lucide-react';
import { useTranslation, languages } from '../i18n';

export default function Landing() {
  const navigate = useNavigate();
  const { t, lang, setLang } = useTranslation();

  return (
    <div className="min-h-screen bg-surface-50 flex flex-col font-sans">
      {/* Top Bar */}
      <header className="flex justify-between items-center p-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2 text-primary-700 font-bold text-3xl font-serif">
          <Sprout size={32} />
          <span>{t('brand.name')}</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center text-sm sm:text-base font-medium bg-primary-100 rounded-full p-1 border border-primary-200">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`px-3 py-1 rounded-full transition-colors ${
                  lang === l.code
                    ? 'bg-white text-primary-800 shadow-sm'
                    : 'text-primary-700 hover:text-primary-900'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
          <Link to="/login" className="btn btn-ghost text-lg hidden sm:inline-flex">{t('nav.login')}</Link>
          <Link to="/login" className="btn btn-accent text-lg">{t('nav.getStarted')}</Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="animate-fade-in text-center px-4 py-20 bg-gradient-to-b from-primary-50 to-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-extrabold text-primary-900 leading-tight mb-6 font-serif">
              {t('landing.heroTitleCustom')}
            </h1>
            <p className="text-2xl md:text-3xl text-surface-600 mb-10 max-w-2xl mx-auto font-medium">
              {t('landing.heroSubtitleCustom')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
              <button onClick={() => navigate('/login')} className="btn btn-accent btn-lg px-12 py-4 text-xl shadow-lg shadow-accent-600/30">
                {t('nav.getStarted')}
              </button>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="section-title text-center mb-16">{t('landing.howItWorks')}</h2>
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center z-10 bg-white p-4">
                <div className="w-16 h-16 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mb-4">
                  <Wheat size={32} />
                </div>
                <h3 className="font-semibold text-xl">{t('landing.step1')}</h3>
              </div>
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-surface-200 -z-0 -translate-y-8"></div>
              
              {/* Step 2 */}
              <div className="flex flex-col items-center text-center z-10 bg-white p-4">
                <div className="w-16 h-16 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mb-4">
                  <GitCompare size={32} />
                </div>
                <h3 className="font-semibold text-xl">{t('landing.step2')}</h3>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center z-10 bg-white p-4">
                <div className="w-16 h-16 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mb-4">
                  <Calculator size={32} />
                </div>
                <h3 className="font-semibold text-xl">{t('landing.step3')}</h3>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center text-center z-10 bg-white p-4">
                <div className="w-16 h-16 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mb-4">
                  <Trophy size={32} />
                </div>
                <h3 className="font-semibold text-xl">{t('landing.step4')}</h3>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 px-4 bg-surface-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card p-8 text-center hover:shadow-lg transition-shadow">
                <MapPin size={48} className="mx-auto text-primary-500 mb-6" />
                <h3 className="text-2xl font-bold mb-4">{t('landing.feature1Title')}</h3>
                <p className="text-surface-600">{t('landing.feature1Desc')}</p>
              </div>
              <div className="card p-8 text-center hover:shadow-lg transition-shadow">
                <TrendingUp size={48} className="mx-auto text-primary-500 mb-6" />
                <h3 className="text-2xl font-bold mb-4">{t('landing.feature2Title')}</h3>
                <p className="text-surface-600">{t('landing.feature2Desc')}</p>
              </div>
              <div className="card p-8 text-center hover:shadow-lg transition-shadow">
                <Shield size={48} className="mx-auto text-primary-500 mb-6" />
                <h3 className="text-2xl font-bold mb-4">{t('landing.feature3Title')}</h3>
                <p className="text-surface-600">{t('landing.feature3Desc')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust section */}
        <section className="py-16 bg-primary-900 text-white text-center px-4">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <ShieldCheck size={64} className="text-primary-300 mb-6" />
            <h2 className="text-3xl md:text-4xl font-medium leading-relaxed">
              {t('landing.trustStatement')}
            </h2>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-900 text-surface-400 py-8 text-center">
        <p>{t('brand.footer')}</p>
      </footer>
    </div>
  );
}
