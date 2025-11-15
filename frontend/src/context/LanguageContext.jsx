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

  // Fetch global system language setting from backend
  useEffect(() => {
    const fetchSystemLanguage = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8100/api';
        const response = await axios.get(`${apiUrl}/settings/system`);

        if (response.data.success) {
          const { defaultLanguage, defaultDirection } = response.data.data;

          setLanguage(defaultLanguage);
          setDirection(defaultDirection);

          // Set i18n language
          i18n.changeLanguage(defaultLanguage);

          // Set document direction and lang
          document.documentElement.dir = defaultDirection;
          document.documentElement.lang = defaultLanguage;
        }
      } catch (error) {
        console.error('Error fetching system language:', error);
        // Fallback to English if API fails
        setLanguage('en');
        setDirection('ltr');
        i18n.changeLanguage('en');
        document.documentElement.dir = 'ltr';
        document.documentElement.lang = 'en';
      } finally {
        setLoading(false);
      }
    };

    fetchSystemLanguage();
  }, [i18n]);

  // Admin function to update system-wide language
  const updateSystemLanguage = async (newLang) => {
    try {
      const newDirection = newLang === 'ar' ? 'rtl' : 'ltr';
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8100/api';
      const token = localStorage.getItem('token');

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
        setLanguage(newLang);
        setDirection(newDirection);

        // Change i18n language (zero re-rendering, instant switch)
        i18n.changeLanguage(newLang);

        // Update document direction and lang
        document.documentElement.dir = newDirection;
        document.documentElement.lang = newLang;

        return { success: true, message: response.data.message };
      }
    } catch (error) {
      console.error('Error updating system language:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update system language'
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
