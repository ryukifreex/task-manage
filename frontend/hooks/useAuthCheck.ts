import { useAuth } from '../context/AuthContext' // AuthContextをインポート
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const useAuthCheck = () => {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])
  return isAuthenticated
}
