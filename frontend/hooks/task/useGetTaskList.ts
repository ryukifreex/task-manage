import useSWR from 'swr'
import { TaskService } from '../../services/taskService'
import { TaskType } from '../../types/task'

export const useGetTaskList = (token) => {
  const { data, error, mutate } = useSWR<TaskType[]>(`${token}-task-list`, () =>
    TaskService.getTaskList(token)
  )

  return { data, error, mutate }
}
