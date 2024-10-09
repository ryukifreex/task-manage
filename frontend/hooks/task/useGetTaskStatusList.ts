import useSWR from 'swr'
import { TaskService } from '../../services/taskService'
import { TaskStatusListType } from '../../types/task'

export const useGetTaskStatusList = () => {
  const { data, error } = useSWR<TaskStatusListType>(
    `status-label`,
    TaskService.getTaskStatusList
  )

  return { data, error }
}
