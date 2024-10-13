import axios from 'axios'
import { API_BASE_URL } from '../config/api'
import { UserFormType, UserType } from '../types/user'

export class UserService {
  static async getUserData(token): Promise<UserType> {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/self-info/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error) {
      throw new Error(error.response)
    }
  }

  static async getUserList(token): Promise<UserType[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error) {
      throw new Error(error.response)
    }
  }

  static async createUser(
    user: UserFormType,
    token?: string
  ): Promise<UserType | any> {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/register/`,
        user,
        token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      )
      return response.data
    } catch (error) {
      throw new Error(error.response)
    }
  }
}
