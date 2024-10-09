import useSWR from 'swr'
import { UserType } from '../../types/user'
import { UserService } from '../../services/userService'

export const useGetUserList = (token) => {
  const { data, error, mutate } = useSWR<UserType[]>(`${token}-user-list`, () =>
    UserService.getUserList(token)
  )
  return { data, error, mutate }
}
