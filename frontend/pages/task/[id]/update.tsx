import { useEffect } from 'react'
import { useGetTask } from '../../../services/taskService'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { Loader, Notification } from '@mantine/core'
import TaskUpdate from '../../../components/task/TaskUpdate'
import TaskError from '../../../components/task/TaskError'

export default function Edit() {
  const { t } = useTranslation()
  const { query } = useRouter()
  const id = query.id ? Number(query.id) : undefined
  const [{ data, loading, error }, getTask] = useGetTask(id)

  useEffect(() => {
    getTask()
  }, [id])

  if (!id || !data || loading) return <Loader />
  if (error) {
    console.log({ error })
    return <TaskError />
  }

  return <TaskUpdate task={data} />
}
