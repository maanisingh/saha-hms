import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import commonEn from './locales/en/common.json';
import commonAr from './locales/ar/common.json';
import navigationEn from './locales/en/navigation.json';
import navigationAr from './locales/ar/navigation.json';
import formsEn from './locales/en/forms.json';
import formsAr from './locales/ar/forms.json';
import dashboardEn from './locales/en/dashboard.json';
import dashboardAr from './locales/ar/dashboard.json';
import patientsEn from './locales/en/patients.json';
import patientsAr from './locales/ar/patients.json';
import appointmentsEn from './locales/en/appointments.json';
import appointmentsAr from './locales/ar/appointments.json';
import staffEn from './locales/en/staff.json';
import staffAr from './locales/ar/staff.json';
import departmentsEn from './locales/en/departments.json';
import departmentsAr from './locales/ar/departments.json';
import pharmacyEn from './locales/en/pharmacy.json';
import pharmacyAr from './locales/ar/pharmacy.json';
import laboratoryEn from './locales/en/laboratory.json';
import laboratoryAr from './locales/ar/laboratory.json';
import radiologyEn from './locales/en/radiology.json';
import radiologyAr from './locales/ar/radiology.json';
import billingEn from './locales/en/billing.json';
import billingAr from './locales/ar/billing.json';
import reportsEn from './locales/en/reports.json';
import reportsAr from './locales/ar/reports.json';
import settingsEn from './locales/en/settings.json';
import settingsAr from './locales/ar/settings.json';

const resources = {
  en: {
    common: commonEn,
    navigation: navigationEn,
    forms: formsEn,
    dashboard: dashboardEn,
    patients: patientsEn,
    appointments: appointmentsEn,
    staff: staffEn,
    departments: departmentsEn,
    pharmacy: pharmacyEn,
    laboratory: laboratoryEn,
    radiology: radiologyEn,
    billing: billingEn,
    reports: reportsEn,
    settings: settingsEn,
  },
  ar: {
    common: commonAr,
    navigation: navigationAr,
    forms: formsAr,
    dashboard: dashboardAr,
    patients: patientsAr,
    appointments: appointmentsAr,
    staff: staffAr,
    departments: departmentsAr,
    pharmacy: pharmacyAr,
    laboratory: laboratoryAr,
    radiology: radiologyAr,
    billing: billingAr,
    reports: reportsAr,
    settings: settingsAr,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false, // React already escapes
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'saha-hms-language',
    },
    react: {
      useSuspense: false, // Disable suspense for instant language switching
    },
  });

export default i18n;
