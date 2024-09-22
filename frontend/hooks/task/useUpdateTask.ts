import { API_BASE_URL } from '../../config/api'
import { TaskFormType } from '../../types/task'
import axios from 'axios'

export const useUpdateTask = () => {
  const updateTask = async (task: TaskFormType) => {
    try {
      await axios.put(`${API_BASE_URL}/task/${task.id}/`, task)
    } catch (error) {
      console.error('Failed to update task:', error)
    }
  }

  return { updateTask }
}
