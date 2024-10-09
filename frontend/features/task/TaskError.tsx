import { useTranslation } from 'react-i18next'
import { Alert } from 'antd'

export type TaskErrorProps = {
  type?: 'GET'
  message?: string
}

export default function TaskError({ type = 'GET', message }: TaskErrorProps) {
  const { t } = useTranslation()

  switch (type) {
    default:
      return (
        <Alert
          message="Error"
          description={message ?? t('task.error.get')}
          type="error"
          showIcon
        />
      )
  }
}
