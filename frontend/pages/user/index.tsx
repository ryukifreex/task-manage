import { useGetUserList } from '../../hooks/user/useGetUserList'
import { useTranslation } from 'react-i18next'
import { Loading } from '../../components/Loading'
import UserListTable from '../../features/user/UserListTable'
import { useAuth } from '../../context/AuthContext'

export default function UserList() {
  const { t } = useTranslation()
  const { isAuthenticated, user, token } = useAuth()
  const { data: userList, error, mutate } = useGetUserList(token)
  // TODO:リダイレクト処理
  if (!isAuthenticated) return <Loading />
  return <UserListTable userList={userList} isAdmin={user?.is_admin} />
}
