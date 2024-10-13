import { useEffect, useRef } from 'react'
import { useDrop } from 'react-dnd'
import DashboardItem from './DashboardItem'
import { TaskStatusType, TaskType } from '../types/task'
import StatusBadge from './StatusBadge'

export type TaskBoardProps = {
  label: TaskStatusType
  itemList: TaskType[]
  onMove: (id: number, newStatus: TaskStatusType) => void
  onClick?: (id: number) => void
}

export default function DashBoard({
  label,
  itemList,
  onMove,
  onClick,
}: TaskBoardProps) {
  const dropRef = useRef()

  // ドロップ処理
  const [, drop] = useDrop({
    accept: 'TASK',
    drop: (item: { id: number }) => onMove(item.id, label),
  })

  useEffect(() => {
    if (dropRef.current) {
      drop(dropRef.current)
    }
  }, [drop])

  return (
    <div
      ref={dropRef}
      style={{
        padding: '1rem',
        border: '1px solid black',
        width: '300px',
        minHeight: '100vh',
      }}
    >
      <div style={{ margin: '1rem' }}>
        <StatusBadge status={label} />
      </div>
      {itemList.map((task) => (
        <DashboardItem
          key={task.id}
          id={task.id}
          label={task.title}
          onClick={onClick}
        />
      ))}
    </div>
  )
}
