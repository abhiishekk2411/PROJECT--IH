// ============================================================================
// i18n — FasalNirnay Language Context
// ============================================================================
// Provides language state (persisted in localStorage) and a t() lookup function.
// Default language: Hindi ('hi') — target user is a farmer.
// Architecture ready for adding Marathi ('mr') and other languages later.
// ============================================================================

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import en from './en';
import hi from './hi';

// Add new languages here — e.g. import mr from './mr';
const translations = { en, hi };

// Supported languages metadata (for UI rendering)
export const languages = [
  { code: 'hi', label: 'हिंदी', labelEn: 'Hindi' },
  { code: 'en', label: 'English', labelEn: 'English' },
  // { code: 'mr', label: 'मराठी', labelEn: 'Marathi' },  // Add later
];

const STORAGE_KEY = 'fasalnirnay-lang';
const DEFAULT_LANG = 'hi';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
    } catch {
      return DEFAULT_LANG;
    }
  });

  // Persist language choice
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // localStorage unavailable — silent fail
    }
  }, [lang]);

  const setLang = useCallback((newLang) => {
    if (translations[newLang]) {
      setLangState(newLang);
    }
  }, []);

  // Translation lookup: t('landing.heroTitle1') → dot-notation key resolution
  const t = useCallback(
    (key) => {
      const keys = key.split('.');
      let value = translations[lang];
      for (const k of keys) {
        if (value == null) return key; // Key not found — return key as fallback
        value = value[k];
      }
      return value ?? key;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Hook to access translation function and language state.
 * @returns {{ t: (key: string) => string, lang: string, setLang: (code: string) => void }}
 */
export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a <LanguageProvider>');
  }
  return context;
}
