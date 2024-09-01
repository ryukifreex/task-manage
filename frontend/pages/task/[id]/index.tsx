import { useEffect, useState } from 'react'
import { useGetTask } from '../../../services/taskService'
import { useTranslation } from 'react-i18next'
import { Loader, Notification } from '@mantine/core'
import { useRouter } from 'next/router'
import TaskDetail from '../../../components/task/TaskDetail'
import TaskError from '../../../components/task/TaskError'

export default function Detail() {
  const { t } = useTranslation()
  const { query } = useRouter()
  const id = query.id ? Number(query.id) : undefined
  const [{ data, loading, error }, getTask] = useGetTask(id)

  useEffect(() => {
    getTask()
  }, [id])

  if (loading || !data) return <Loader />
  if (error) {
    console.log({ error })
    return <TaskError />
  }

  return <TaskDetail task={data} />
}
