import { useState } from 'react'
import { TaskService } from '../../services/taskService'
import { TaskFormType } from '../../types/task'

export const useCreateTask = () => {
  const [message, setMessage] = useState<string | null>(null)

  const createTask = async (task: TaskFormType, token) => {
    try {
      await TaskService.createTask(task, token)
      setMessage(null)
      return { success: true }
    } catch (error: any) {
      setMessage('create_failed')
      return { success: false }
    }
  }

  return { createTask, message }
}
