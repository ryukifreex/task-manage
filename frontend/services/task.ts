import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { CreateTaskType, TaskType } from '../types/task'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const taskRequestConfig = (method:'GET' | 'POST', data?:CreateTaskType ): AxiosRequestConfig => ({
  url: `${BASE_URL}/tasks/`,
  method,
  data
})

// export const createTask = async (taskData: CreateTaskType): Promise<AxiosResponse<any> | Error > => {
//   try {
//     const task = await axios.post(`${BASE_URL}/tasks/`, taskData)
//     return task
//   } catch (error) {
//     throw error
//   }
// }