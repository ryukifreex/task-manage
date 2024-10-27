import TaskCreate from '../../features/task/TaskCreate'
import { useTranslation } from 'react-i18next'
import { Col, Row, Typography } from 'antd'
import { Loading } from '../../components/Loading'
import { useAuth } from '../../context/AuthContext'

export default function Create() {
  const { t } = useTranslation()
  const { isAuthenticated } = useAuth()

  // TODO:リダイレクト処理
  if (!isAuthenticated) return <Loading />

  return (
    <Row justify="center" align="middle">
      <Col style={{ marginInline: '10vw' }}>
        <Typography.Title level={2}>{t('menu.task.add')}</Typography.Title>
        <TaskCreate />
      </Col>
    </Row>
  )
}
