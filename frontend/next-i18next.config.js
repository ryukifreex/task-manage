const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'ja',
    locales: ['en', 'ja'],
  },
  localePath: '/locales', 

  // localePath: path.resolve('/public/locales'), // ロケールファイルのパス
  ns: ['translation'], // 使用するnamespace
  defaultNS: 'translation',
  serverSideTranslations: true,  // サーバーサイドでのロードを有効にする
  reloadOnPrerender: process.env.NODE_ENV === 'development', // 開発環境でのホットリロード
};