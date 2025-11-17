import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

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
  const [loading, setLoading] = useState(true);

  // Initialize language from localStorage or backend
  useEffect(() => {
    const initializeLanguage = async () => {
      try {
        // FIRST: Check localStorage (highest priority)
        const savedLanguage = localStorage.getItem('saha-hms-language');

        if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
          // Use saved language from localStorage
          const savedDirection = savedLanguage === 'ar' ? 'rtl' : 'ltr';

          setLanguage(savedLanguage);
          setDirection(savedDirection);
          i18n.changeLanguage(savedLanguage);
          document.documentElement.dir = savedDirection;
          document.documentElement.lang = savedLanguage;

          console.log(`[LanguageContext] Loaded language from localStorage: ${savedLanguage}`);
          setLoading(false);
          return;
        }

        // SECOND: Try to fetch from backend API (if no localStorage)
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8100/api';
        const response = await axios.get(`${apiUrl}/settings/system`);

        if (response.data.success) {
          const { defaultLanguage, defaultDirection } = response.data.data;

          setLanguage(defaultLanguage);
          setDirection(defaultDirection);
          i18n.changeLanguage(defaultLanguage);
          document.documentElement.dir = defaultDirection;
          document.documentElement.lang = defaultLanguage;

          console.log(`[LanguageContext] Loaded language from API: ${defaultLanguage}`);
        }
      } catch (error) {
        // THIRD: Fallback to English only if both localStorage and API fail
        console.debug('[LanguageContext] Using default language (en) - no saved preference or API unavailable');
        setLanguage('en');
        setDirection('ltr');
        i18n.changeLanguage('en');
        document.documentElement.dir = 'ltr';
        document.documentElement.lang = 'en';
      } finally {
        setLoading(false);
      }
    };

    initializeLanguage();
  }, [i18n]);

  // Update language (client-side with optional server sync for admins)
  const updateSystemLanguage = async (newLang) => {
    try {
      const newDirection = newLang === 'ar' ? 'rtl' : 'ltr';

      // Always update client-side immediately
      setLanguage(newLang);
      setDirection(newDirection);
      i18n.changeLanguage(newLang);
      document.documentElement.dir = newDirection;
      document.documentElement.lang = newLang;

      // Try to sync with server if user is logged in (optional)
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8100/api';
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const response = await axios.put(
            `${apiUrl}/settings/system/language`,
            { language: newLang },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );

          if (response.data.success) {
            return { success: true, message: response.data.message };
          }
        } catch (apiError) {
          // Silently fail API sync - client-side change already applied
          console.debug('Server language sync skipped (not logged in or no permission)');
        }
      }

      return {
        success: true,
        message: `Language changed to ${newLang === 'ar' ? 'Arabic' : 'English'}`
      };
    } catch (error) {
      console.error('Error updating language:', error);
      return {
        success: false,
        message: 'Failed to update language'
      };
    }
  };

  const value = {
    language,
    direction,
    isRTL: direction === 'rtl',
    isLTR: direction === 'ltr',
    loading,
    updateSystemLanguage, // Admin function to change system-wide language
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
