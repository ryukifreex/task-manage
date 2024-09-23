import { useGetTask } from '../../../hooks/task/useGetTask'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { Loader, Title } from '@mantine/core'
import TaskUpdate from '../../../components/task/TaskUpdate'
import TaskError from '../../../components/task/TaskError'
import { useAuthCheck } from '../../../hooks/useAuthCheck'

export default function Edit() {
  const { t } = useTranslation()
  const { query } = useRouter()
  const id = query.id ? Number(query.id) : undefined
  const { data, error } = useGetTask(id)
  const isAuthenticated = useAuthCheck()

  if (!isAuthenticated) return <Loader />

  if (error) {
    console.log('pare', { error })
    return <TaskError type="GET" message={t('task.error.get')} />
  }

  return data ? (
    <>
      <Title order={2}>{t('menu.task.edit')}</Title>
      <TaskUpdate task={data} />
    </>
  ) : (
    <Loader />
  )
}
