import UserCreate from '../../features/user/UserCreate'
import { useTranslation } from 'react-i18next'
import { Col, Row, Typography } from 'antd'
import { Loading } from '../../components/Loading'
import ErrorScreen from '../../components/ErrorScreen'
import { useAuth } from '../../context/AuthContext'

export default function Create() {
  const { t } = useTranslation()
  const { isAuthenticated, user } = useAuth()

  // TODO:リダイレクト処理
  if (!isAuthenticated) return <Loading />
  if (!user.is_admin) return <ErrorScreen error={404} />

  return (
    <Row justify="center" align="middle">
      <Col style={{ marginInline: '10vw' }}>
        <Typography.Title level={2}>{t('user.label.new')} </Typography.Title>
        <UserCreate isAdmin={true} />
      </Col>
    </Row>
  )
}
