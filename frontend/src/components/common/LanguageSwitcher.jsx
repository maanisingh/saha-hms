import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTranslation } from 'react-i18next';

export function LanguageSwitcher() {
  const { language, switchLanguage } = useLanguage();
  const { t } = useTranslation('settings');

  const handleToggle = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    switchLanguage(newLang);
  };

  return (
    <button
      onClick={handleToggle}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-teal-50 hover:bg-teal-100 border border-teal-200 transition-all duration-200 group"
      title={t('switchLanguage', 'Switch Language')}
    >
      <Languages className="w-5 h-5 text-teal-600 group-hover:text-teal-700" />
      <span className="text-sm font-medium text-teal-700 group-hover:text-teal-800">
        {language === 'en' ? 'عربي' : 'English'}
      </span>
    </button>
  );
}
