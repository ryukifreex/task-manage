import useSWR from 'swr'
import { API_BASE_URL } from '../../config/api'
import { TaskType } from '../../types/task'
import { fetcher } from '../fetcher'

export const useGetTask = (id?: number) => {
  const { data, error, mutate } = useSWR<TaskType>(
    id ? `${API_BASE_URL}/task/${id}` : null,
    fetcher
  )
  return { data, error, mutate }
}
