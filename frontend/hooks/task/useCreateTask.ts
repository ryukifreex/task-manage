import { API_BASE_URL } from '../../config/api'
import { TaskFormType } from '../../types/task'
import axios from 'axios'

export const useCreateTask = () => {
  const createTask = async (task: TaskFormType) => {
    const token = localStorage.getItem('auth')
    try {
      await axios.post(`${API_BASE_URL}/task/`, task, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (error) {
      console.log('Failed to create task', error)
    }
  }
  return { createTask }
}
