import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslations from './public/locales/en/translation.json';
import jaTranslations from './public/locales/ja/translation.json';

i18n
  .use(initReactI18next)
  .use(LanguageDetector) // ユーザーの言語を検出
  .init({
    resources: {
      en: { translation: enTranslations },
      ja: { translation: jaTranslations },
    },
    lng: 'ja', // デフォルトの言語
    fallbackLng: 'ja',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;
