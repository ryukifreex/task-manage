import { useState } from 'react'
import { TaskService } from '../../services/taskService'
import { TaskFormType } from '../../types/task'

export const useUpdateTask = () => {
  const [message, setMessage] = useState<string | null>(null)

  const updateTask = async (task: TaskFormType, token: string) => {
    try {
      await TaskService.updateTask(task, token)
      setMessage(null)
      return { success: true }
    } catch (error) {
      setMessage('update_failed')
      return { success: false }
    }
  }

  return { updateTask, message }
}
