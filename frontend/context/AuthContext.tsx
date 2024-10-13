import { useRouter } from 'next/router'
import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from 'react'
import { AuthService } from '../services/authService'
import { UserType } from '../types/user'
import { UserService } from '../services/userService'

type AuthContextType = {
  user: UserType
  token: string
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

// Context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | undefined>(undefined)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [token, setToken] = useState<string | undefined>(undefined)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('auth')
    setToken(token)

    const getData = async () => {
      if (token) {
        const data = await UserService.getUserData(token)
        if (data) {
          setIsAuthenticated(data.is_active)
          setUser(data)
        }
      }
    }

    if (token) getData()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await AuthService.Login(email, password)
      if (response.data) {
        localStorage.setItem('auth', response.data.access)
        setIsAuthenticated(true)
        setToken(response.data.access)
        // router.push('/task')
      }
    } catch (error) {
      setIsAuthenticated(false)
      console.log('Login failed:', error)
    }
  }

  const logout = () => {
    localStorage.removeItem('auth')
    setIsAuthenticated(false)
    setToken(undefined)
    router.push('/login')
  }
  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, token, login, logout }}
    >
      {children}
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
