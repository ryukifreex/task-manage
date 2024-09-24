import { useGetTask } from '../../../hooks/task/useGetTask'
import { useTranslation } from 'react-i18next'
import { Container, Group, Loader, Title } from '@mantine/core'
import { useRouter } from 'next/router'
import TaskDetail from '../../../components/task/TaskDetail'
import TaskError from '../../../components/task/TaskError'
import StatusBadge from '../../../components/StatusBadge'
import { useAuthCheck } from '../../../hooks/useAuthCheck'

export default function Detail() {
  const { t } = useTranslation()
  const { query } = useRouter()
  const id = query.id ? Number(query.id) : undefined
  const { data, error } = useGetTask(id)
  const isAuthenticated = useAuthCheck()

  if (!isAuthenticated) return <Loader />
  if (error) {
    console.log({ error })
    return <TaskError type="GET" message={t('task.error.get')} />
  }

  if (!data) return <Loader />
  return (
    <Container>
      <Group justify={'space-between'}>
        <Title order={2}>{data.title}</Title>
        <StatusBadge status={data.status} />
      </Group>
      <TaskDetail task={data} />
    </Container>
  )
}
