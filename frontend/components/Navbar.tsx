import { Button, Flex, Space, Tabs, theme } from 'antd'
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
  const { token } = theme.useToken()

  const tabs = [
    { title: t('menu.task.list'), link: '/task' },
    { title: t('menu.task.dashboard'), link: '/task/dashboard' },
    { title: t('menu.task.add'), link: '/task/create' },
    // { title: t('menu.task.chart'), link: '/task/ganttchart' },
    { title: t('menu.user.list'), link: '/user' },
  ]

  return (
    <>
      <Flex
        justify={isAuthenticated ? 'space-between' : 'end'}
        align={'center'}
        gap={'middle'}
        style={{
          paddingInline: '20px',
          flexWrap: 'nowrap',
          background: token.colorBgBase,
        }}
      >
        {isAuthenticated && (
          <>
            <div style={{ flexGrow: 1 }}>
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
            </div>
            <Button onClick={logout} type="primary">
              {t('menu.user.logout')}
            </Button>
          </>
        )}
        <LanguageSwitch />
      </Flex>
    </>
  )
}
