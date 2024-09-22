import router from 'next/router'
import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { Loader } from '@mantine/core'
import axios from 'axios'
import { API_BASE_URL } from '../config/api'

type AuthContextType = {
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

// Context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if (token) {
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

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
        router.push('/')
      }
    } catch (error) {
      console.log('Login failed:', error)
    }
  }

  const logout = () => {
    localStorage.removeItem('auth')
    setIsAuthenticated(false)
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {loading ? <Loader /> : children}
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
