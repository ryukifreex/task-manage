// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend) // 翻訳ファイルを読み込むための Backend
  .use(LanguageDetector) // ユーザーの言語を検出
  .use(initReactI18next) // react-i18next と連携
  .init({
    fallbackLng: 'ja', // フォールバック言語
    debug: true, //debug
    interpolation: {
      escapeValue: false, // React では自動的にエスケープされる
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json', // 翻訳ファイルのパス
    },
  });

export default i18n;
