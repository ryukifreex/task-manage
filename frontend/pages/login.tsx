import { SubmitHandler } from 'react-hook-form'
import { useAuth } from '../context/AuthContext' // AuthContextをインポート
import LoginForm from '../components/user/LoginForm'
import { LoginFormType } from '../types/user'
import router from 'next/router'

export default function Login() {
  const { login, isAuthenticated } = useAuth()

  const onSubmit: SubmitHandler<LoginFormType> = (data) => {
    login(data.email, data.password)
  }

  if (isAuthenticated) router.push('/')

  return <LoginForm onSubmit={onSubmit} />
}