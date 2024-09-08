import { useTranslation } from 'react-i18next'
import { Notification } from '@mantine/core'

// TODOエラータイプで使い分けて
export type TaskErrorProps = {
  type?: 'GET'
  message?: string
}
export default function TaskError({ type = 'GET', message }: TaskErrorProps) {
  const { t } = useTranslation()

  switch (type) {
    default:
      return (
        <Notification color="red" title="Error">
          {message ?? t('task.error.get')}
        </Notification>
      )
  }
}
