import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [direction, setDirection] = useState('ltr');
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // Get saved language from localStorage or default to 'en'
    const savedLanguage = localStorage.getItem('saha-hms-language') || 'en';
    const savedDirection = localStorage.getItem('saha-hms-direction') || 'ltr';

    setLanguage(savedLanguage);
    setDirection(savedDirection);

    // Set i18n language
    i18n.changeLanguage(savedLanguage);

    // Set document direction and lang
    document.documentElement.dir = savedDirection;
    document.documentElement.lang = savedLanguage;
  }, [i18n]);

  const switchLanguage = (newLang) => {
    const newDirection = newLang === 'ar' ? 'rtl' : 'ltr';

    setLanguage(newLang);
    setDirection(newDirection);

    // Save to localStorage
    localStorage.setItem('saha-hms-language', newLang);
    localStorage.setItem('saha-hms-direction', newDirection);

    // Change i18n language (zero re-rendering, instant switch)
    i18n.changeLanguage(newLang);

    // Update document direction and lang
    document.documentElement.dir = newDirection;
    document.documentElement.lang = newLang;
  };

  const value = {
    language,
    direction,
    isRTL: direction === 'rtl',
    isLTR: direction === 'ltr',
    switchLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
