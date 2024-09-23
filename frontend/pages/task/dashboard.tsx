import { useEffect, useState } from 'react'
import Dashboard from '../../components/Dashboard'
import { useGetTaskList } from '../../hooks/task/useGetTaskList'
import { Loader, Modal, Title } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { TaskStatusType, TaskType } from '../../types/task'
import { useTaskStatusList } from '../../context/TaskStatusContext'
import { useUpdateTask } from '../../hooks/task/useUpdateTask'
import TaskDetail from '../../components/task/TaskDetail'
import { useModal } from '../../hooks/useModal'
import { useAuthCheck } from '../../hooks/useAuthCheck'

export default function TaskDashboard() {
  const { t } = useTranslation()
  const { data, mutate } = useGetTaskList()
  const [taskList, setTaskList] = useState<TaskType[] | []>(data)
  const { statusList } = useTaskStatusList()
  const { updateTask } = useUpdateTask()
  const [taskDetail, setTaskDetail] = useState<TaskType | null>(null)
  const { isModalOpen, openModal, closeModal } = useModal()
  const isAuthenticated = useAuthCheck()

  useEffect(() => {
    setTaskList(data)
  }, [data, mutate])

  // タスクを動かした時
  const onMoveTask = (taskId: number, newStatus: string) => {
    const newTaskList: TaskType[] = taskList.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    )
    const selectedTask: TaskType = newTaskList.find((task) => task.id === taskId)
    setTaskList(newTaskList)
    updateTask(selectedTask)
  }

  // タスクをクリックした時
  const onClick = (taskId: number) => {
    setTaskDetail(taskList.find((task) => task.id === taskId))
    console.log(taskId)
    console.log({ taskDetail })
    // 詳細画面をモーダル表示
    openModal()
  }

  if (!isAuthenticated) return <Loader />

  if (!data || !taskList) return <Loader />

  return (
    <>
      <Title order={2}>{t('menu.task.dashboard')}</Title>

      <div style={{ display: 'flex', gap: '1rem' }}>
        {statusList &&
          Object.keys(statusList).map((status: TaskStatusType) => (
            <Dashboard
              key={status}
              label={status}
              itemList={taskList.filter((task: TaskType) => task.status === status)}
              onMove={onMoveTask}
              onClick={onClick}
            />
          ))}
      </div>
      {/* タスク詳細モーダル */}
      {taskDetail && (
        <Modal
          opened={isModalOpen}
          onClose={() => {
            closeModal()
          }}
        >
          <Title order={3}>{taskDetail.title}</Title>
          <TaskDetail task={taskDetail} />
        </Modal>
      )}
    </>
  )
}
