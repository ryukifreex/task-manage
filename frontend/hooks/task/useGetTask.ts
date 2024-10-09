import useSWR from 'swr'
import { TaskService } from '../../services/taskService'
import { TaskType } from '../../types/task'

export const useGetTask = (id: number, token) => {
  const { data, error, mutate } = useSWR<TaskType>(`${token}-task-${id}`, () =>
    TaskService.getTask(id, token)
  )

  return { data, error, mutate }
}
