import useSWR from 'swr'
import { API_BASE_URL } from '../../config/api'
import { fetcher } from '../fetcher'
import axios from 'axios'

export const useDeleteTask = (id: number) => {
  const { mutate } = useSWR(null, fetcher, {
    revalidateOnMount: false,
  })
  const deleteTask = async () => {
    await axios.delete(`${API_BASE_URL}/task/${id}/`)
    mutate()
  }
  return { deleteTask }
}
