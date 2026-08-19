import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sprout, Menu, X } from 'lucide-react';
import { useTranslation, languages } from '../i18n';

const Navbar = ({ onMenuToggle, isMobileMenuOpen }) => {
  const location = useLocation();
  const { t, lang, setLang } = useTranslation();

  const navLinks = [
    { name: t('nav.dashboard'), path: '/dashboard' },
    { name: t('nav.analyze'), path: '/analyze' },
    { name: t('nav.chat'), path: '/chat' },
    { name: t('nav.history'), path: '/history' },
  ];

  return (
    <header className="bg-primary-800 border-b border-primary-900 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-1 flex items-center justify-start">
            <button
              onClick={onMenuToggle}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-primary-100 hover:text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white mr-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
            <Link to="/dashboard" className="flex items-center flex-shrink-0">
              <Sprout className="h-8 w-8 text-primary-300" />
              <span className="ml-2 text-xl font-bold text-white hidden sm:block">{t('brand.name')}</span>
            </Link>
          </div>

          <nav className="hidden md:flex flex-1 justify-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`${
                  location.pathname === link.path
                    ? 'border-white text-white'
                    : 'border-transparent text-primary-200 hover:border-primary-400 hover:text-white'
                } inline-flex items-center px-1 pt-1 border-b-2 text-base font-medium transition-colors duration-200`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex-1 flex items-center justify-end gap-4">
            {/* Language Toggle */}
            <div className="flex items-center text-base font-medium bg-primary-900/50 rounded-full p-1 border border-primary-700/50">
              {languages.map((l, idx) => (
                <React.Fragment key={l.code}>
                  <button
                    onClick={() => setLang(l.code)}
                    className={`px-3 py-1 rounded-full transition-colors ${
                      lang === l.code
                        ? 'bg-white text-primary-800 shadow-sm'
                        : 'text-primary-100 hover:text-white'
                    }`}
                  >
                    {l.label}
                  </button>
                  {/* Optional divider if needed, currently styled as pills so no divider needed */}
                </React.Fragment>
              ))}
            </div>

            <div className="ml-3 relative flex-shrink-0 hidden sm:block">
              <div>
                <button className="bg-primary-600 flex text-base rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-800 focus:ring-white h-8 w-8 items-center justify-center">
                  <span className="text-white font-semibold text-base">F</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
