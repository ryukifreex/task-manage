module.exports = {
  i18n: {
    defaultLocale: 'ja',
    locales: ['en', 'ja'],
    localeDetection: false, // ブラウザの言語設定に基づいた自動切り替えを無効
  },
  serverSideTranslations: true,
  ns: ['translation'], // 使用するnamespace
}
