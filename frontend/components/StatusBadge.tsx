import { Row, Tag } from 'antd'
import { TaskStatusType } from '../types/task'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export type StatusBadgeProps = {
  status: TaskStatusType
  size?: string
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const { t } = useTranslation()
  const statusColors = useMemo(
    () => ({
      open: 'magenta',
      in_progress: 'purple',
      done: 'blue',
      closed: 'grey',
      pending: 'green',
    }),
    []
  )

  const color = statusColors[status]

  return (
    <Row style={{ width: '100%' }} justify={'center'}>
      <Tag color={color}>{t(`task.status.${status}`)}</Tag>
    </Row>
  )
}
