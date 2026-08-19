import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Search, BarChart3, MessageCircle, Clock, X } from 'lucide-react';
import { useTranslation } from '../i18n';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const { t } = useTranslation();

  const navigation = [
    { name: t('nav.dashboard'), path: '/dashboard', icon: LayoutDashboard },
    { name: t('nav.analyzeCrop'), path: '/analyze', icon: Search },
    { name: t('nav.results'), path: '/results', icon: BarChart3 },
    { name: t('nav.chat'), path: '/chat', icon: MessageCircle },
    { name: t('nav.history'), path: '/history', icon: Clock },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-surface-900 bg-opacity-50 transition-opacity md:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-primary-50 border-r border-primary-200 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:w-64 flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-primary-200 md:hidden">
          <span className="text-xl font-bold text-primary-700">Menu</span>
          <button onClick={onClose} className="text-surface-500 hover:text-surface-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => {
                  if (window.innerWidth < 768) {
                    onClose();
                  }
                }}
                className={`group flex items-center px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                  isActive
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'text-primary-900 hover:bg-primary-100 hover:text-primary-900'
                }`}
              >
                <Icon
                  className={`flex-shrink-0 mr-3 h-5 w-5 ${
                    isActive ? 'text-white' : 'text-primary-600 group-hover:text-primary-700'
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-primary-200 text-center">
          <p className="text-sm font-medium text-primary-700">
            {t('brand.tagline')}
          </p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
