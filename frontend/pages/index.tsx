import React, { useState, useEffect } from 'react';
import Task from './task';

export default function Home() {
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
