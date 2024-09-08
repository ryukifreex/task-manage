import useSWR from 'swr'
import { API_BASE_URL } from '../../config/api'
import { TaskType } from '../../types/task'
import { fetcher } from '../fetcher'

export const useGetTaskList = () => {
  const { data, error, mutate } = useSWR<TaskType[]>(
    `${API_BASE_URL}/task/`,
    fetcher
  )
  return { data, error, mutate }
}
