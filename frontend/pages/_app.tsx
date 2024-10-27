import { AppProps } from 'next/app'
import Head from 'next/head'
import { appWithTranslation } from 'next-i18next'
import ErrorBoundary from '../components/ErrorBoundary'
import Navbar from '../components/Navbar'
import { I18nextProvider } from 'react-i18next'
import i18n from '../i18n'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TaskStatusProvider } from '../context/TaskStatusContext'
import { LanguageProvider } from '../context/LanguageContext'
import { AuthProvider } from '../context/AuthContext'
import { ConfigProvider, ThemeConfig } from 'antd'
import { Suspense } from 'react'
import { Loading } from '../components/Loading'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <I18nextProvider i18n={i18n}>
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <ConfigProvider theme={theme}>
            <AuthProvider>
              <LanguageProvider>
                <TaskStatusProvider>
                  <Head>
                    <title>Task Manage</title>
                  </Head>
                  <Navbar />
                  <DndProvider backend={HTML5Backend}>
                    <Component {...pageProps} />
                  </DndProvider>
                </TaskStatusProvider>
              </LanguageProvider>
            </AuthProvider>
          </ConfigProvider>
        </ErrorBoundary>
      </Suspense>
    </I18nextProvider>
  )
}

export const theme: ThemeConfig = {
  token: {
    // TODO:色設定の見直し
    fontSize: 16,
    colorPrimary: '#1890ff',
    colorSuccess: '#52c41a', // アクセントカラー
    colorBgBase: '#f0f5f5', // 背景色
    colorTextBase: '#333333', // テキスト色
    colorWarning: '#faad14', // 警告の色
    colorError: '#ff4d4f', // エラーの色
    colorInfo: '#13c2c2', // 情報の色
  },
}
export default appWithTranslation(MyApp)
