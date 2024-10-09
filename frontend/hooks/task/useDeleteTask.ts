import { useState } from 'react'
import { TaskService } from '../../services/taskService'

export const useDeleteTask = () => {
  const [message, setMessage] = useState<string | null>(null)

  const deleteTask = async (id: number, token) => {
    try {
      await TaskService.deleteTask(id, token)
      setMessage('success')
    } catch (error: any) {
      setMessage('failed')
    }
  }

  return { deleteTask, message }
}
