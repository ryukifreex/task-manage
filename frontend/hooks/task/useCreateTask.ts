import useSWR from 'swr'
import { API_BASE_URL } from '../../config/api'
import { TaskFormType } from '../../types/task'
import { fetcher } from '../fetcher'
import axios from 'axios'

export const useCreateTask = () => {
  const { mutate } = useSWR(null, fetcher, {
    revalidateOnMount: false,
  })
  const createTask = async (task: TaskFormType) => {
    await axios.post(`${API_BASE_URL}/task/`, task)
    mutate()
  }
  return { createTask }
}
