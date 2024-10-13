import { useGetUserList } from '../../hooks/user/useGetUserList'
import { useTranslation } from 'react-i18next'
import { Loading } from '../../components/Loading'
import UserListTable from '../../features/user/UserListTable'
import { useAuth } from '../../context/AuthContext'
import { Button, Col, Row } from 'antd'
import Link from 'next/link'

export default function UserList() {
  const { t } = useTranslation()
  const { isAuthenticated, user, token } = useAuth()
  const { data: userList, error, mutate } = useGetUserList(token)
  // TODO:リダイレクト処理
  if (!isAuthenticated) return <Loading />
  return (
    <>
      {user && user.is_admin && (
        <Row justify={'end'}>
          <Col style={{ padding: '2rem' }}>
            <Button type="primary">
              <Link href={'/user/create'}>{t('user.label.create')}</Link>
            </Button>
          </Col>
        </Row>
      )}
      <UserListTable userList={userList} />)
    </>
  )
}
