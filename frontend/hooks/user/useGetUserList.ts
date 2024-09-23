import useSWR from 'swr'
import { API_BASE_URL } from '../../config/api'
import { fetcher } from '../fetcher'

export const useGetUserList = () => {
  const { data, error, mutate } = useSWR(`${API_BASE_URL}/user/`, fetcher)
  return { data, error, mutate }
}
