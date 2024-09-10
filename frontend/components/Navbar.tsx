import { Container, Group, Tabs } from '@mantine/core'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import LanguageSwitch from './LanguageSwitch'
import { useRouter } from 'next/router'

export default function Navbar() {
  const { t } = useTranslation()
  const router = useRouter()
  const { pathname } = router

  const tabs = [
    { title: t('menu.task.list'), link: '/' },
    { title: t('menu.task.board'), link: '/task/board' },
    { title: t('menu.task.add'), link: '/task/create' },
    { title: t('menu.user.list'), link: '/' },
    { title: t('menu.user.self'), link: '/' },
  ]

  const tabItems = tabs.map((tab) => (
    <Link href={tab.link} key={tab.title}>
      <Tabs.Tab value={tab.link}>{tab.title}</Tabs.Tab>
    </Link>
  ))

  return (
    <>
      <Container size="md">
        <Group justify="flex-end">
          <LanguageSwitch />
        </Group>
      </Container>
      <Container size="md">
        <Tabs defaultValue={pathname} variant="outline" visibleFrom="sm">
          <Tabs.List>{tabItems}</Tabs.List>
        </Tabs>
      </Container>
    </>
  )
}
