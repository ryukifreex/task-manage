import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { MantineProvider, Container } from '@mantine/core';
import ErrorBoundary from '../components/ErrorBoundary';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import '@mantine/core/styles.css';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <I18nextProvider i18n={i18n}>
      {/* <MantineProvider  defaultColorScheme="dark"> */}
      <MantineProvider >
        <ErrorBoundary>
          <Layout>
            <Navbar />
            <Container style={{ padding: '20px', marginTop: '20px' }}>
              <Component {...pageProps} />
            </Container>
          </Layout>
        </ErrorBoundary>
      </MantineProvider>
    </I18nextProvider>
  );
}

export default appWithTranslation(MyApp)
