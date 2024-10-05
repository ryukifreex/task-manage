import TaskCreate from '../../components/task/TaskCreate'
import { useTranslation } from 'react-i18next'
import { useAuthCheck } from '../../hooks/useAuthCheck'
import { Col, Typography } from 'antd'
import { Loading } from '../../components/Loading'

export default function Create() {
  const { t } = useTranslation()
  const isAuthenticated = useAuthCheck()

  if (!isAuthenticated) return <Loading />

  return (
    <Col style={{ padding: '2rem' }}>
      <Typography.Title>{t('menu.task.create')}</Typography.Title>
      <TaskCreate />
    </Col>
  )
}
