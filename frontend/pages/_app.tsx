import { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { MantineProvider, Container } from '@mantine/core'
import ErrorBoundary from '../components/ErrorBoundary'
import Navbar from '../components/Navbar'
import { I18nextProvider } from 'react-i18next'
import i18n from '../i18n'
import '@mantine/core/styles.css'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TaskStatusProvider } from '../context/TaskStatusContext'
import { LanguageProvider } from '../context/LanguageContext'
import { AuthProvider } from '../context/AuthContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <I18nextProvider i18n={i18n}>
      {/* <MantineProvider  defaultColorScheme="dark"> */}
      <MantineProvider>
        <AuthProvider>
          <ErrorBoundary>
            <LanguageProvider>
              <TaskStatusProvider>
                <Navbar />
                <DndProvider backend={HTML5Backend}>
                  <Container style={{ padding: '20px', marginTop: '20px' }}>
                    <Component {...pageProps} />
                  </Container>
                </DndProvider>
              </TaskStatusProvider>
            </LanguageProvider>
          </ErrorBoundary>
        </AuthProvider>
      </MantineProvider>
    </I18nextProvider>
  )
}

export default appWithTranslation(MyApp)
