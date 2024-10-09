import axios from 'axios'
import { API_BASE_URL } from '../config/api'
import { UserFormType, UserType } from '../types/user'

export class UserService {
  private static handleError(error: any) {
    console.error('API Error:', error)
    throw new Error(error?.response?.data?.message || 'Something went wrong')
  }

  static async getUserData(token): Promise<UserType> {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/self-info/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error) {
      console.log({ error })
      this.handleError(error)
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
      this.handleError(error)
    }
  }

  static async createUser(user: UserFormType, token): Promise<UserType> {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/register/`,
        user,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data
    } catch (error) {
      this.handleError(error)
    }
  }
}
