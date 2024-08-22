import { useRouter } from 'next/router';
import { useEffect } from 'react';
import i18n from '../i18n'; 

export default function Layout({ children }) {
  const router = useRouter();

  useEffect(() => {
    if (router.locale !== i18n.language) {
      i18n.changeLanguage(router.locale);
    }
  }, [router.locale]);

  return <>{children}</>
}