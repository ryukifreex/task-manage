import React, { useState, useEffect } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Task from './task';
import i18n from '../i18n';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (router.locale !== i18n.language) {
      i18n.changeLanguage(router.locale);
    }
  }, [router.locale]);

  return (
    <Task />
  )
}
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const locale = 'ja'
//   return {
//     props: {
//       ...(await serverSideTranslations(locale)),
//     },
//   }
// }
