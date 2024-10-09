import axios from 'axios'
import { API_BASE_URL } from '../config/api'

export class AuthService {
  static async Login(email: string, password: string) {
    const response = await axios.post(`${API_BASE_URL}/token/`, {
      email,
      password,
    })
    return response
  }
}
