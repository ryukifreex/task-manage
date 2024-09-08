import useAxios from 'axios-hooks'
import { API_BASE_URL } from '../config/api'
import { TaskStatusListType, TaskStatusType, TaskType } from '../types/task'

export const useGetTask = (id: number) => {
  console.log({ id })
  return useAxios<TaskType>(
    {
      url: `${API_BASE_URL}/task/${id}`,
      method: 'GET',
    },
    { manual: false }
  )
}

export const useGetTaskList = () => {
  return useAxios<TaskType[]>(
    {
      url: `${API_BASE_URL}/task/`,
      method: 'GET',
    },
    { manual: true }
  )
}

export const useUpdateTask = (id: number) => {
  return useAxios<TaskType>(
    {
      url: `${API_BASE_URL}/task/${id}/`,
      method: 'PUT',
    },
    { manual: true }
  )
}

export const useCreateTask = () => {
  return useAxios<TaskType>(
    {
      url: `${API_BASE_URL}/task/`,
      method: 'POST',
    },
    { manual: true }
  )
}

export const useDeleteTask = (id: number) => {
  return useAxios<void>(
    {
      url: `${API_BASE_URL}/task/${id}/`,
      method: 'DELETE',
    },
    { manual: true }
  )
}

export const useGetTaskStatusList = () => {
  return useAxios<TaskStatusListType>(
    {
      url: `${API_BASE_URL}/task/status_label/`,
      method: 'GET',
    },
    { manual: false }
  )
}
