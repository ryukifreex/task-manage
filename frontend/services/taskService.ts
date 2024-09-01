import useAxios from 'axios-hooks'
import { API_BASE_URL } from '../config/api'

export const useGetTask = (id: number) => {
  return useAxios(
    {
      url: `${API_BASE_URL}/task/${id}`,
      method: 'GET',
    },
    { manual: true }
  )
}

export const useGetTaskList = () => {
  return useAxios(
    {
      url: `${API_BASE_URL}/task/`,
      method: 'GET',
    },
    { manual: true }
  )
}

export const useUpdateTask = (id: number) => {
  return useAxios(
    {
      url: `${API_BASE_URL}/task/${id}/`,
      method: 'PUT',
    },
    { manual: true }
  )
}

export const useCreateTask = () => {
  return useAxios(
    {
      url: `${API_BASE_URL}/task/`,
      method: 'POST',
    },
    { manual: true }
  )
}

export const useDeleteTask = (id: number) => {
  return useAxios(
    {
      url: `${API_BASE_URL}/task/${id}/`,
      method: 'DELETE',
    },
    { manual: true }
  )
}
