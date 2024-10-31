import { useTranslation } from 'react-i18next'
import { Col, Row, Typography } from 'antd'
import UserCreate from '../../features/user/UserCreate'

export default function UserRegister() {
  const { t } = useTranslation()

  return (
    <Row justify="center" align="middle">
      <Col style={{ marginInline: '10vw' }}>
        <Typography.Title level={2}>{t('user.label.new')} </Typography.Title>
        <UserCreate isAdmin={false} />
      </Col>
    </Row>
  )
}
