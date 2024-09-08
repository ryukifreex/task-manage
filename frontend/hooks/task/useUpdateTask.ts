import useSWR from 'swr'
import { API_BASE_URL } from '../../config/api'
import { TaskFormType } from '../../types/task'
import { fetcher } from '../fetcher'
import axios from 'axios'

export const useUpdateTask = (id: number) => {
  const { mutate } = useSWR(null, fetcher, {
    revalidateOnMount: false,
  })
  const updateTask = async (task: TaskFormType) => {
    await axios.put(`${API_BASE_URL}/task/${id}/`, task)
    mutate()
  }
  return { updateTask }
}
