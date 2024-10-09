import { Button, Flex, Space, Tabs } from 'antd'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import LanguageSwitch from './LanguageSwitch'
import { useRouter } from 'next/router'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { t } = useTranslation()
  const { isAuthenticated, logout } = useAuth()
  const router = useRouter()
  const { pathname } = router

  const tabs = [
    { title: t('menu.task.list'), link: '/task' },
    { title: t('menu.task.dashboard'), link: '/task/dashboard' },
    { title: t('menu.task.add'), link: '/task/create' },
    // { title: t('menu.task.chart'), link: '/task/ganttchart' },
    { title: t('menu.user.list'), link: '/user' },
  ]

  return (
    // <div style={{ padding: '16px', borderBottom: '1px solid #d9d9d9' }}>
    <>
      <Flex justify={'flex-end'}>
        <Space size={'large'}>
          {isAuthenticated && (
            <Button onClick={logout} type="primary">
              {t('menu.user.logout')}
            </Button>
          )}
          <LanguageSwitch />
        </Space>
      </Flex>
      {isAuthenticated && (
        <Tabs
          activeKey={pathname}
          tabPosition="top"
          style={{ marginTop: '16px' }}
          centered
        >
          {tabs.map((tab) => (
            <Tabs.TabPane
              tab={
                <Link href={tab.link} style={{ color: 'inherit' }}>
                  {tab.title}
                </Link>
              }
              key={tab.link}
            />
          ))}
        </Tabs>
      )}
    </>
  )
}
