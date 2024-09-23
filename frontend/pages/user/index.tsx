import { Checkbox, Loader, Table } from '@mantine/core'
import { useAuthCheck } from '../../hooks/useAuthCheck'
import { useGetUserList } from '../../hooks/user/useGetUserList'
import { useEffect } from 'react'
import { UserType } from '../../types/user'
export default function UserList() {
  const isAuthenticated = useAuthCheck()
  const { data: userList, error, mutate } = useGetUserList()

  if (!isAuthenticated) return <Loader />

  useEffect(() => {
    console.log({ userList })
  }, [])
  const head = (
    <Table.Tr>
      {userList && Object.keys(userList[0]).map((user) => <Table.Th key={user}>{user}</Table.Th>)}
    </Table.Tr>
  )

  const rows =
    userList &&
    Object.values(userList).map((user: UserType) => (
      <Table.Tr key={user.id}>
        <Table.Td>{user.email}</Table.Td>
        <Table.Td>{user.organization}</Table.Td>
        <Table.Td>{user.email}</Table.Td>
        <Table.Td>{user.username}</Table.Td>
        <Table.Td>{user.first_name}</Table.Td>
        <Table.Td>{user.last_name}</Table.Td>
        <Table.Td>
          <Checkbox checked={user.is_active} />
        </Table.Td>
        <Table.Td>
          <Checkbox checked={user.is_admin} />
        </Table.Td>
        <Table.Td>{user.is_superuser ? 'super' : 'normal'}</Table.Td>
      </Table.Tr>
    ))

  return (
    <>
      <Table miw={600} striped={true} stripedColor={'#fafafa'}>
        <Table.Thead>{head}</Table.Thead>
        {userList && <Table.Tbody>{rows}</Table.Tbody>}
      </Table>
    </>
  )
}
