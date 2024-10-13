import { useState } from 'react'
import { UserService } from '../../services/userService'
import { UserFormType } from '../../types/user'

export const useCreateUser = () => {
  const [message, setMessage] = useState(null)
  const createUser = async (user: UserFormType, token?: string) => {
    try {
      const response = await UserService.createUser(user, token)
      setMessage(null)
      return { success: true, data: response }
    } catch (error: unknown) {
      setMessage('create_failed')
      return { success: false, data: error }
    }
  }
  return { createUser, message }
}
