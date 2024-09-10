import { useEffect, useRef } from 'react'
import { useDrop } from 'react-dnd'
import BoardItem from '../BoardItem'
import { TaskStatusType, TaskType } from '../../types/task'
import { useTranslation } from 'react-i18next'

export type TaskBoardProps = {
  status: TaskStatusType
  taskList: TaskType[]
  onMoveTask: (taskId: number, newStatus: TaskStatusType) => void
}

export default function TaskBoard({
  status,
  taskList,
  onMoveTask,
}: TaskBoardProps) {
  const { t } = useTranslation()
  const dropRef = useRef()

  // ドロップ処理
  const [, drop] = useDrop({
    accept: 'TASK',
    drop: (item: { id: number }) => onMoveTask(item.id, status),
  })

  useEffect(() => {
    if (dropRef.current) {
      drop(dropRef.current)
    }
  }, [drop])

  return (
    <div
      ref={dropRef}
      style={{ padding: '1rem', border: '1px solid black', width: '300px' }}
    >
      <h2>{t(`task.status.${status}`)}</h2>
      {taskList.map((task) => (
        <BoardItem key={task.id} id={task.id} label={task.title} />
      ))}
    </div>
  )
}
