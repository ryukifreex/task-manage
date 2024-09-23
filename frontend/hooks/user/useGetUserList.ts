import useSWR from 'swr'
import { API_BASE_URL } from '../../config/api'
import { fetcher } from '../fetcher'
import { UserType } from '../../types/user'

export const useGetUserList = () => {
  const { data, error, mutate } = useSWR<UserType[]>(`${API_BASE_URL}/user/`, fetcher)
  return { data, error, mutate }
}
