import { SubmitHandler } from 'react-hook-form'
import { useAuth } from '../context/AuthContext' // AuthContextをインポート
import LoginForm from '../components/user/LoginForm'
import { LoginFormType } from '../types/user'
import { useRouter } from 'next/router'
import { Row, Col } from 'antd'

export default function Login() {
  const { login, isAuthenticated } = useAuth()
  const router = useRouter()

  const onSubmit: SubmitHandler<LoginFormType> = (data) => {
    login(data.email, data.password)
  }

  if (isAuthenticated) {
    router.push('/')
  }

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col xs={24} sm={12} md={8}>
        <LoginForm onSubmit={onSubmit} />
      </Col>
    </Row>
  )
}
