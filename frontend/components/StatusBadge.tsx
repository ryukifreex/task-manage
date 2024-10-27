import { Tag } from 'antd'
import { TaskStatusType } from '../types/task'
import { CSSProperties, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export type StatusBadgeProps = {
  status: TaskStatusType
  style?: CSSProperties
}

export default function StatusBadge({ status, style }: StatusBadgeProps) {
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
    <Tag style={style} color={color}>
      {t(`task.status.${status}`)}
    </Tag>
  )
}
