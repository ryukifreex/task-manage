import { AppProps } from 'next/app'
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
    fontSize: 16,
    colorPrimary: '#52c41a',
  },
}
export default appWithTranslation(MyApp)
