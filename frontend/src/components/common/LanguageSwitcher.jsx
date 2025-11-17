import React, { useState } from 'react';
import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import i18n from '../../i18n';

export function LanguageSwitcher() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [updating, setUpdating] = useState(false);

  const currentLanguage = i18n.language || 'en';

  // Only show to ADMIN users
  if (!user || user.role !== 'ADMIN') {
    return null;
  }

  const handleToggle = async () => {
    const newLang = currentLanguage === 'en' ? 'ar' : 'en';
    const newDirection = newLang === 'ar' ? 'rtl' : 'ltr';

    setUpdating(true);

    try {
      console.log(`[LanguageSwitcher] Switching from ${currentLanguage} to ${newLang}`);

      // 1. Change language in i18next (automatically saves to localStorage)
      await i18n.changeLanguage(newLang);

      // 2. Update document attributes
      document.documentElement.lang = newLang;
      document.documentElement.dir = newDirection;

      console.log(`[LanguageSwitcher] Language changed successfully. Reloading page...`);

      // 3. Reload page to apply changes throughout the app
      // This ensures all components re-render with new language
      window.location.reload();

    } catch (error) {
      console.error('[LanguageSwitcher] Error changing language:', error);
      alert('Failed to change language. Please try again.');
      setUpdating(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={updating}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-teal-50 hover:bg-teal-100 border border-teal-200 transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
      title="Switch System Language (Admin Only) / تبديل لغة النظام (للمسؤول فقط)"
    >
      <Languages className="w-5 h-5 text-teal-600 group-hover:text-teal-700" />
      <span className="text-sm font-medium text-teal-700 group-hover:text-teal-800">
        {updating ? '⏳' : (currentLanguage === 'en' ? 'عربي' : 'English')}
      </span>
    </button>
  );
}
