// pages/index.tsx
import { useEffect, useState, useTransition } from 'react'
import TaskBoard from '../../components/task/TaskBoard'
import { useGetTaskList } from '../../hooks/task/useGetTaskList'
// import { TaskType } from '../types/task';
import { Loader } from '@mantine/core'
import TaskError from '../../components/task/TaskError'
import { useTranslation } from 'react-i18next'
import { TaskStatusType, TaskType } from '../../types/task'
import { useTaskStatusList } from '../../context/TaskStatusContext'

export default function Board() {
  const { t } = useTranslation()
  const { data, mutate } = useGetTaskList()
  const [taskList, setTaskList] = useState<TaskType[] | []>(data)
  const { statusList } = useTaskStatusList()

  useEffect(() => {
    setTaskList(data)
  }, [data, mutate])

  // タスクを動かした時
  const handleMoveTask = (taskId: number, newStatus: string) => {
    setTaskList((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    )
  }

  console.log({ data })
  if (!data || !taskList) return <Loader />
  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      {Object.keys(statusList).map((status: TaskStatusType) => (
        <TaskBoard
          key={status}
          status={status}
          taskList={taskList.filter((task) => task.status === status)}
          onMoveTask={handleMoveTask}
        />
      ))}
    </div>
  )
}
