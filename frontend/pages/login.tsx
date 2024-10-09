import { SubmitHandler } from 'react-hook-form'
import { useAuth } from '../context/AuthContext' // AuthContextをインポート
import LoginForm from '../features/user/LoginForm'
import { LoginFormType } from '../types/user'
import { useRouter } from 'next/router'
import { Row, Col, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

export default function Login() {
  const { t } = useTranslation()
  const { login, isAuthenticated } = useAuth()
  const router = useRouter()

  const onSubmit: SubmitHandler<LoginFormType> = (data) => {
    login(data.email, data.password)
  }

  if (isAuthenticated) {
    router.push('/')
  }

  return (
    <Row justify="center" align="middle">
      <Col xs={24} sm={12} md={8}>
        <Row justify="center" align="middle">
          <Typography.Title>{t('app.name')}</Typography.Title>
        </Row>
        <LoginForm onSubmit={onSubmit} />
      </Col>
    </Row>
  )
}
