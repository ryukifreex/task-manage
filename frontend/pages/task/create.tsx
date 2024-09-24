import { Container, Loader, Title } from '@mantine/core'
import TaskCreate from '../../components/task/TaskCreate'
import { useTranslation } from 'react-i18next'
import { useAuthCheck } from '../../hooks/useAuthCheck'

export default function Create() {
  const { t } = useTranslation()
  const isAuthenticated = useAuthCheck()

  if (!isAuthenticated) return <Loader />

  return (
    <Container>
      <Title order={2}>{t('menu.task.create')}</Title>
      <TaskCreate />
    </Container>
  )
}
