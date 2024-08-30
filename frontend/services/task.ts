import { AxiosRequestConfig } from 'axios'
import { CreateTaskType } from '../types/task'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const taskRequestConfig = (method: 'GET'): AxiosRequestConfig => ({
  url: `${BASE_URL}/task/`,
  method,
})

export const taskRequestConfigWithData = (
  method: 'POST',
  data?: CreateTaskType
): AxiosRequestConfig => ({
  url: `${BASE_URL}/task/`,
  method,
  data,
})

export const taskRequestConfigWithId = (
  method: 'GET' | 'PUT' | 'DELETE',
  id?: number,
  data?: CreateTaskType
): AxiosRequestConfig => ({
  url: `${BASE_URL}/task/${id}`,
  method,
  ...(data && { data }),
})
