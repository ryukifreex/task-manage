import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import i18n from '../i18n';
import { MantineProvider, Container } from '@mantine/core';
import '@mantine/core/styles.css';
import Navbar from '../components/Navbar';
import ErrorBoundary from '../components/ErrorBoundary';
import { I18nextProvider } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <I18nextProvider i18n={i18n}>
      <MantineProvider withCssVariables withGlobalClasses>
        <ErrorBoundary>
          <Navbar />
          <Container style={{ padding: '20px', marginTop: '20px' }}>
            <Component {...pageProps} />
          </Container>
        </ErrorBoundary>
      </MantineProvider>
    </I18nextProvider>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'translation',
      ])),
    },
  }
}
export default appWithTranslation(MyApp)
