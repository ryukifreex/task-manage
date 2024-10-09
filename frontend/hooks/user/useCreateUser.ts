import { useState } from 'react'
import { UserService } from '../../services/userService'
import { UserFormType } from '../../types/user'

export const useCreateUser = () => {
  const [message, setMessage] = useState<string | null>(null)

  const createUser = async (user: UserFormType, token) => {
    try {
      await UserService.createUser(user, token)
      setMessage('success')
    } catch (error: any) {
      setMessage('failed')
    }
  }

  return { createUser, message }
}
