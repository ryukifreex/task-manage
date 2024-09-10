import { useEffect, useState, useTransition } from 'react'
import TaskBoard from '../../components/task/TaskBoard'
import { useGetTaskList } from '../../hooks/task/useGetTaskList'
import { Loader, Title } from '@mantine/core'
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
  // TODO:drag and drop　した時にDBにrequest
  if (!data || !taskList) return <Loader />
  return (
    <>
      <Title order={2}>{t('menu.task.board')}</Title>
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
    </>
  )
}
