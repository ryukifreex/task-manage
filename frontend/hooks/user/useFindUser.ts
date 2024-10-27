import { UserType } from '../../types/user'

export const useFindUser = () => {
  const labelName = (userList: UserType[], id: string) => {
    const user = userList && userList.find((user) => user.id === id)
    return user ? user.username : ''
  }

  return { labelName }
}
