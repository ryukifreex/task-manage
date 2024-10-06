const { i18n } = require('./next-i18next.config.js')

module.exports = {
  i18n,
  transpilePackages: [
    'antd',
    '@ant-design',
    '@ant-design/icons',
    'rc-util',
    'rc-pagination',
    'rc-picker',
    'rc-notification',
    'rc-tooltip',
    'rc-tree',
    'rc-table',
  ],
}
