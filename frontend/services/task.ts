import axios, { AxiosResponse } from 'axios'
import { CreateTaskType, TaskType } from '../types/task'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const getTaskList = async (): Promise<AxiosResponse<any> | Error> => {
  try {
    const taskList = await axios.get(`${BASE_URL}/tasks/`)
    return taskList
  } catch (error) {
    throw error
  }
}

export const createTask = async (taskData: CreateTaskType): Promise<AxiosResponse<any> | Error > => {
  try {
    const task = await axios.post(`${BASE_URL}/tasks/`, taskData)
    return task
  } catch (error) {
    throw error
  }
}