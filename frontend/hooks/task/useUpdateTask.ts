import useSWR from 'swr'
import { API_BASE_URL } from '../../config/api'
import { TaskFormType } from '../../types/task'
import { fetcher } from '../fetcher'
import axios from 'axios'

// TODOこれでいいなら他も同じようにして(コールバック)
export const useUpdateTask = () => {
  const { mutate } = useSWR(`${API_BASE_URL}/task/`, fetcher, {
    revalidateOnMount: false,
  })

  const updateTask = async (task: TaskFormType) => {
    try {
      await axios.put(`${API_BASE_URL}/task/${task.id}/`, task)
      mutate()
    } catch (error) {
      console.error('Failed to update task:', error)
    }
  }

  return { updateTask }
}
