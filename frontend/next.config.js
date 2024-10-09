const { i18n } = require('./next-i18next.config.js')

module.exports = {
  reactStrictMode: true,
  i18n,
  transpilePackages: [
    'antd',
    '@ant-design',
    '@ant-design/icons',
    '@ant-design/icons-svg',
    'rc-util',
    'rc-pagination',
    'rc-picker',
    'rc-notification',
    'rc-tooltip',
    'rc-tree',
    'rc-table',
  ],
}
