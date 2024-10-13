import TaskCreate from '../../features/task/TaskCreate'
import { useTranslation } from 'react-i18next'
import { Col, Typography } from 'antd'
import { Loading } from '../../components/Loading'
import { useAuth } from '../../context/AuthContext'

export default function Create() {
  const { t } = useTranslation()
  const { isAuthenticated } = useAuth()

  // TODO:リダイレクト処理
  if (!isAuthenticated) return <Loading />

  return (
    <Col style={{ padding: '2rem' }}>
      <TaskCreate />
    </Col>
  )
}
