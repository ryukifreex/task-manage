import { API_BASE_URL } from '../../config/api'
import { TaskFormType } from '../../types/task'
import axios from 'axios'

export const useCreateTask = () => {
  const createTask = async (task: TaskFormType) => {
    try {
      await axios.post(`${API_BASE_URL}/task/`, task)
    } catch (error) {
      console.log('Failed to create task', error)
    }
  }
  return { createTask }
}
