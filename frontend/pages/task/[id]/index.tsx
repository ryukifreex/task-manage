import { useGetTask } from '../../../hooks/task/useGetTask'
import { useTranslation } from 'react-i18next'
import { Loader } from '@mantine/core'
import { useRouter } from 'next/router'
import TaskDetail from '../../../components/task/TaskDetail'
import TaskError from '../../../components/task/TaskError'

export default function Detail() {
  const { t } = useTranslation()
  const { query } = useRouter()
  const id = query.id ? Number(query.id) : undefined
  const { data, error } = useGetTask(id)

  if (error) {
    console.log({ error })
    return <TaskError type="GET" message={t('task.error.get')} />
  }

  return data ? <TaskDetail task={data} /> : <Loader />
}
