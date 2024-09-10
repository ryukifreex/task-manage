import { Badge, Group } from '@mantine/core'
import { TaskStatusType } from '../types/task'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export type StatusBadgeProps = {
  status: TaskStatusType
  size?: string
}

export default function StatusBadge({ status, size = 'lg' }: StatusBadgeProps) {
  const { t } = useTranslation()
  const statusColors = useMemo(
    () => ({
      open: 'blue',
      in_progress: 'orange',
      done: 'green',
      closed: 'gray',
      pending: 'grape',
    }),
    []
  )

  const color = statusColors[status]

  return (
    <Group justify={'center'}>
      <Badge size={size} color={color}>
        {t(`task.status.${status}`)}
      </Badge>
    </Group>
  )
}
