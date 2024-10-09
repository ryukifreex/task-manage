import { useState } from 'react'
import { TaskService } from '../../services/taskService'
import { TaskFormType } from '../../types/task'

export const useCreateTask = () => {
  const [message, setMessage] = useState<string | null>(null)

  const createTask = async (task: TaskFormType, token) => {
    try {
      await TaskService.createTask(task, token)
      setMessage('success')
    } catch (error: any) {
      console.error('Error in creating task:', error)
      setMessage('failed')
    }
  }

  return { createTask, message }
}
