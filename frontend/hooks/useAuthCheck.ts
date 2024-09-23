import { useAuth } from '../context/AuthContext' // AuthContextをインポート
import { useRouter } from 'next/router'
import { useEffect } from 'react'

// TODO：画面更新時に戻らないようにする
export const useAuthCheck = () => {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, loading])

  return isAuthenticated
}
