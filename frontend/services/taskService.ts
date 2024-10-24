import axios from 'axios'
import { API_BASE_URL } from '../config/api'
import { TaskFormType, TaskStatusListType, TaskType } from '../types/task'

export class TaskService {
  static async getTaskStatusList(): Promise<TaskStatusListType> {
    try {
      const response = await axios.get(`${API_BASE_URL}/task/status-label/`)
      return response.data
    } catch (error) {
      throw new Error(error?.response)
    }
  }

  static async getTask(id: number, token): Promise<TaskType> {
    try {
      const response = await axios.get(`${API_BASE_URL}/task/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error) {
      throw new Error(error?.response)
    }
  }

  static async getTaskList(token): Promise<TaskType[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/task/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log({ response })
      return response.data
    } catch (error) {
      throw new Error(error.response)
    }
  }

  static async createTask(task: TaskFormType, token): Promise<TaskType> {
    try {
      const response = await axios.post(`${API_BASE_URL}/task/`, task, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error) {
      throw new Error(error?.response)
    }
  }

  static async deleteTask(id: number, token): Promise<void> {
    try {
      await axios.delete(`${API_BASE_URL}/task/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (error) {
      throw new Error(error?.response)
    }
  }

  static async updateTask(task: TaskFormType, token): Promise<void> {
    try {
      await axios.put(`${API_BASE_URL}/task/${task.id}/`, task, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (error) {
      throw new Error(error?.response)
    }
  }
}

export default TaskService
