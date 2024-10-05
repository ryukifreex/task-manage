import router from 'next/router'
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import axios from 'axios'
import { API_BASE_URL } from '../config/api'
import { Loading } from '../components/Loading'

type AuthContextType = {
  loading: boolean
  isAdmin: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

// Context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('auth')
    if (token) {
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('auth')
    const checkAdmin = async () => {
      // 自分の権限情報を取得
      if (isAuthenticated) {
        try {
          const userInfoResponse = await axios.get(
            `${API_BASE_URL}/user/self-info/`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          setIsAdmin(userInfoResponse.data.is_admin)
        } catch (error) {
          router.push('/')
        }
      }
    }
    checkAdmin()
  }, [isAuthenticated])

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/token/`, {
        email,
        password,
      })

      if (response.data) {
        // localStorage に access token を保存
        localStorage.setItem('auth', response.data.access)
        setIsAuthenticated(true)
      }
      router.push('/')
    } catch (error) {
      console.log('Login failed:', error)
      setIsAuthenticated(false)
      router.push('/login')
    }
  }

  const logout = () => {
    localStorage.removeItem('auth')
    setIsAuthenticated(false)
    router.push('/login')
  }

  return (
    <AuthContext.Provider
      value={{ loading, isAuthenticated, isAdmin, login, logout }}
    >
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  )
}

// contextのhook
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
