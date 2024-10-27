import { useEffect, useRef } from 'react'
import { useDrop } from 'react-dnd'
import DashboardItem from './DashboardItem'
import { TaskStatusType, TaskType } from '../types/task'
import StatusBadge from './StatusBadge'
import { Row, theme } from 'antd'

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
  const { token } = theme.useToken()

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
        backgroundColor: token.colorBgBase,
        width: '300px',
        maxHeight: '80vh',
        borderRadius: '30px',
      }}
    >
      <Row style={{ margin: '1rem', width: '100%' }} justify={'center'}>
        <StatusBadge status={label} />
      </Row>
      <div
        style={{
          overflowY: 'auto',
          overflowX: 'hidden',
          maxHeight: '70vh',
        }}
      >
        {itemList.map((task) => (
          <DashboardItem
            key={task.id}
            id={task.id}
            label={task.title}
            onClick={onClick}
          />
        ))}
      </div>
    </div>
  )
}
