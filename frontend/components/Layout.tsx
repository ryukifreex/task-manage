import React from 'react'
import { Layout } from 'antd'
import Footer from './footer'
import Navbar from './Navbar'
import Head from 'next/head'

export default function AppLayout({ children }) {
  const { Content } = Layout
  return (
    <Layout
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Head>
        <title>Task Manage</title>
      </Head>
      <Navbar />
      <Content style={{ flex: 1, padding: '20px', backgroundColor: '#fff' }}>
        {children}
      </Content>
      <Footer />
    </Layout>
  )
}
