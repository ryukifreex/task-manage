import useSWR from 'swr'
import { API_BASE_URL } from '../../config/api'
import { TaskStatusListType } from '../../types/task'
import { fetcher } from '../fetcher'

export const useGetTaskStatusList = () => {
  const { data, error } = useSWR<TaskStatusListType>(
    `${API_BASE_URL}/task/status_label/`,
    fetcher
  )
  return { data, error }
}
