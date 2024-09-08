import { useGetTask, useGetTaskStatusList } from '../../../services/taskService'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { Loader } from '@mantine/core'
import TaskUpdate from '../../../components/task/TaskUpdate'
import TaskError from '../../../components/task/TaskError'

export default function Edit() {
  const { t } = useTranslation()
  const { query } = useRouter()
  const id = query.id ? Number(query.id) : undefined
  const [{ data, loading, error }] = useGetTask(id)
  useGetTaskStatusList()

  if (!id || !data || loading) return <Loader />
  if (error) {
    console.log({ error })
    return <TaskError type="GET" message={t('task.error.get')} />
  }

  return <TaskUpdate task={data} />
}
