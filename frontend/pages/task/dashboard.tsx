import { useEffect, useState } from 'react'
import Dashboard from '../../components/Dashboard'
import { useGetTaskList } from '../../hooks/task/useGetTaskList'
import { useTranslation } from 'react-i18next'
import { TaskStatusType, TaskType } from '../../types/task'
import { useTaskStatusList } from '../../context/TaskStatusContext'
import { useUpdateTask } from '../../hooks/task/useUpdateTask'
import TaskDetail from '../../features/task/TaskDetail'
import { useModal } from '../../hooks/useModal'
import { Button, Flex, Modal, Row, Typography } from 'antd'
import { Loading } from '../../components/Loading'
import { useAuth } from '../../context/AuthContext'

export default function TaskDashboard() {
  const { t } = useTranslation()
  const { token } = useAuth()
  const { data, mutate } = useGetTaskList(token)
  const { statusList } = useTaskStatusList()
  const { updateTask } = useUpdateTask()
  const [taskList, setTaskList] = useState<TaskType[] | []>(data)
  const [taskDetail, setTaskDetail] = useState<TaskType | null>(null)
  const { isModalOpen, openModal, closeModal } = useModal()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    setTaskList(data)
  }, [data, mutate])

  // タスクを動かした時
  const onMoveTask = (taskId: number, newStatus: string) => {
    const newTaskList: TaskType[] = taskList.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    )
    const selectedTask: TaskType = newTaskList.find(
      (task) => task.id === taskId
    )
    setTaskList(newTaskList)
    updateTask(selectedTask, token)
  }

  // タスクをクリックした時
  const onClick = (taskId: number) => {
    setTaskDetail(taskList.find((task) => task.id === taskId))
    // 詳細画面をモーダル表示
    openModal()
  }

  if (!isAuthenticated) return <Loading />

  if (!data || !taskList) return <Loading />

  return (
    <>
      <Row justify="center">
        <Typography.Title>{t('menu.task.dashboard')}</Typography.Title>
      </Row>
      <Flex justify="space-evenly">
        {statusList &&
          Object.keys(statusList).map((status: TaskStatusType) => (
            <Dashboard
              key={status}
              label={status}
              itemList={taskList.filter(
                (task: TaskType) => task.status === status
              )}
              onMove={onMoveTask}
              onClick={onClick}
            />
          ))}
      </Flex>
      {/* タスク詳細モーダル */}
      {taskDetail && (
        <Modal
          open={isModalOpen}
          footer={
            <Button type="primary" onClick={() => closeModal()}>
              OK
            </Button>
          }
        >
          <Typography.Title>{taskDetail.title}</Typography.Title>
          <TaskDetail task={taskDetail} />
        </Modal>
      )}
    </>
  )
}
