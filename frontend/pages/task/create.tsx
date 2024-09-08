import React from 'react'
import TaskCreate from '../../components/task/TaskCreate'
import { Loader } from '@mantine/core'
import { useGetTaskStatusList } from '../../services/taskService'
import { useTranslation } from 'react-i18next'
import TaskError from '../../components/task/TaskError'

export default function Create() {
  const [{ data, loading, error }] = useGetTaskStatusList()
  const { t } = useTranslation()

  if (loading) return <Loader />
  if (error) return <TaskError message={t('task.error.status')} />
  return <TaskCreate statusList={data} />
}
