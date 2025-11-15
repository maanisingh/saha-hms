import React, { useState } from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';

export function LanguageSwitcher() {
  const { language, updateSystemLanguage } = useLanguage();
  const { user } = useAuth();
  const { t } = useTranslation('settings');
  const [updating, setUpdating] = useState(false);

  // Only show language switcher to ADMIN users
  if (!user || user.role !== 'ADMIN') {
    return null;
  }

  const handleToggle = async () => {
    setUpdating(true);
    const newLang = language === 'en' ? 'ar' : 'en';
    const result = await updateSystemLanguage(newLang);

    if (result.success) {
      // Success - language changed system-wide
      console.log('System language updated:', result.message);
    } else {
      // Error
      alert(result.message || 'Failed to update system language');
    }
    setUpdating(false);
  };

  return (
    <button
      onClick={handleToggle}
      disabled={updating}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-teal-50 hover:bg-teal-100 border border-teal-200 transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
      title={t('switchLanguage', 'Switch System Language (Admin Only)')}
    >
      <Languages className="w-5 h-5 text-teal-600 group-hover:text-teal-700" />
      <span className="text-sm font-medium text-teal-700 group-hover:text-teal-800">
        {updating ? '...' : (language === 'en' ? 'عربي' : 'English')}
      </span>
    </button>
  );
}
