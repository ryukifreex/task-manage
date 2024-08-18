import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { MantineProvider, Container } from '@mantine/core';
import '@mantine/core/styles.css';
import Navbar from '../components/Navbar';
import ErrorBoundary from '../components/ErrorBoundary';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider withCssVariables withGlobalClasses>
      <ErrorBoundary>
        <Navbar />
        <Container style={{ padding: '20px', marginTop: '20px' }}>
          <Component {...pageProps} />
        </Container>
      </ErrorBoundary>
    </MantineProvider>
  );
}
export default appWithTranslation(MyApp)
