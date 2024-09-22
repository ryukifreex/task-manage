import { Anchor, Button, Container, Group, Tabs } from '@mantine/core'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import LanguageSwitch from './LanguageSwitch'
import { useRouter } from 'next/router'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { t } = useTranslation()
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const { pathname } = router
  const { logout } = useAuth()

  const tabs = [
    { title: t('menu.task.list'), link: '/' },
    { title: t('menu.task.dashboard'), link: '/task/dashboard' },
    { title: t('menu.task.add'), link: '/task/create' },
    { title: t('menu.task.chart'), link: '/task/ganttchart' },
    { title: t('menu.user.list'), link: '/' },
  ]

  const tabItems = tabs.map((tab) => (
    <Link href={tab.link} key={tab.title}>
      <Tabs.Tab value={tab.link}>{tab.title}</Tabs.Tab>
    </Link>
  ))

  return (
    <>
      <Container size="xl">
        <Group justify="flex-end" gap="md">
          {isAuthenticated && (
            <Button onClick={() => logout()} variant="filled" color="gray" size="xs" radius="xl">
              {t('menu.user.logout')}
            </Button>
          )}
          <LanguageSwitch />
        </Group>
      </Container>
      {isAuthenticated && (
        <Container size="md">
          <Tabs defaultValue={pathname} variant="outline" visibleFrom="sm">
            <Tabs.List>{tabItems}</Tabs.List>
          </Tabs>
        </Container>
      )}
    </>
  )
}
