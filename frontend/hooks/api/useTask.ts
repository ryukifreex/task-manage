import useAxios from 'axios-hooks'
import {
  taskRequestConfig,
  taskRequestConfigWithId,
  taskRequestConfigWithData,
} from '../../services/task'
import {
  CreateTaskType,
  TaskFormType,
  TaskType,
  UpdateTaskType,
} from '../../types/task'
import {
  UseAxiosResult,
  UseAxiosResultWithData,
  UseAxiosResultWithId,
} from '../../types/hooks'
import { AxiosPromise } from 'axios'

export const useGetTask = (): UseAxiosResultWithId<TaskType> => {
  const [{ data, loading, error }, execute] = useAxios(
    taskRequestConfigWithId('GET'),
    { manual: true }
  )
  const getTask = (id: number): AxiosPromise<TaskType> => {
    const config = taskRequestConfigWithId('GET', id)
    return execute(config)
  }
  return [{ data, loading, error }, getTask]
}

export const useGetTaskList = (): UseAxiosResult<TaskType[]> => {
  const [{ data, loading, error }, execute] = useAxios(
    taskRequestConfig('GET'),
    { manual: true }
  )
  return [{ data, loading, error }, execute]
}

export const useUpdateTask = (): UseAxiosResultWithId<UpdateTaskType> => {
  const [{ data, loading, error }, execute] = useAxios(
    taskRequestConfigWithId('PUT'),
    { manual: true }
  )
  const updateTask = (
    id: number,
    taskData: TaskFormType
  ): AxiosPromise<TaskType> => {
    const config = taskRequestConfigWithId('PUT', id, taskData)
    return execute(config)
  }
  return [{ data, loading, error }, updateTask]
}

export const useCreateTask = (): UseAxiosResultWithData<CreateTaskType> => {
  const [{ data, loading, error }, execute] = useAxios(
    taskRequestConfigWithData('POST'),
    { manual: true }
  )
  const createTask = (taskData: CreateTaskType): AxiosPromise<TaskType> => {
    const config = taskRequestConfigWithData('POST', taskData)
    return execute(config)
  }
  return [{ data, loading, error }, createTask]
}
