import { API_BASE_URL } from '../../config/api'
import axios from 'axios'

export const useDeleteTask = (id: number) => {
  const deleteTask = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/task/${id}/`)
    } catch (error) {
      console.log('Failed to update task', error)
    }
  }
  return { deleteTask }
}
