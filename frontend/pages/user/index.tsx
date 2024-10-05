import { Checkbox, Table } from 'antd'
import { useAuthCheck } from '../../hooks/useAuthCheck'
import { useGetUserList } from '../../hooks/user/useGetUserList'
import { useEffect } from 'react'
import { UserType } from '../../types/user'
import { useTranslation } from 'react-i18next'
import { Loading } from '../../components/Loading'

export default function UserList() {
  const { t } = useTranslation()
  const isAuthenticated = useAuthCheck()
  const { data: userList, error, mutate } = useGetUserList()

  if (!isAuthenticated) return <Loading />

  useEffect(() => {
    console.log({ userList })
  }, [userList])

  // テーブルヘッダー
  const columns = [
    { title: t('user.label.email'), dataIndex: 'email', key: 'email' },
    {
      title: t('user.label.organization'),
      dataIndex: 'organization',
      key: 'organization',
    },
    { title: t('user.label.username'), dataIndex: 'username', key: 'username' },
    {
      title: t('user.label.first_name'),
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: t('user.label.last_name'),
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: t('user.label.active'),
      dataIndex: 'is_active',
      key: 'is_active',
      render: (is_active: boolean) => <Checkbox checked={is_active} />,
    },
    {
      title: t('user.label.admin'),
      dataIndex: 'is_admin',
      key: 'is_admin',
      render: (is_admin: boolean) => <Checkbox checked={is_admin} />,
    },
  ]

  // テーブルデータ
  const dataSource =
    userList &&
    Object.values(userList).map((user: UserType) => ({
      key: user.id,
      email: user.email,
      organization: user.organization,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      is_active: user.is_active,
      is_admin: user.is_admin,
      is_superuser: user.is_superuser,
    }))

  return (
    <>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        rowKey="key"
      />
    </>
  )
}
