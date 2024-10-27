import { useTranslation } from 'react-i18next'
import { useGetTaskList } from '../../hooks/task/useGetTaskList'
import TaskCreate from '../../features/task/TaskCreate'
import { useModal } from '../../hooks/useModal'
import TaskListTable from '../../features/task/TaskListTable'
import { useGetUserList } from '../../hooks/user/useGetUserList'
import { Button, Col, Modal, Row } from 'antd'
import { Loading } from '../../components/Loading'
import { useAuth } from '../../context/AuthContext'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Task() {
  const { t } = useTranslation()
  const { token } = useAuth()
  const { data, error, mutate } = useGetTaskList(token)
  const { data: userList, error: userError } = useGetUserList(token)
  const { isModalOpen, openModal, closeModal } = useModal()
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  // TODO認証されていないときの処理
  useEffect(() => {
    if (!isAuthenticated) router.push('/login')
  }, [])

  if (error || userError) return <Loading />

  return (
    <Col style={{ marginInline: '5vw' }}>
      <Row justify={'end'}>
        <Col style={{ padding: '1rem' }}>
          <Button type="primary" onClick={() => openModal()}>
            {t('task.add')}
          </Button>
        </Col>
      </Row>

      {/* タスク追加モーダル */}
      <Modal
        open={isModalOpen}
        onOk={() => {
          mutate()
          closeModal()
        }}
        onCancel={() => {
          mutate()
          closeModal()
        }}
        closeIcon={null}
        footer={null}
        style={{ minWidth: '70vw' }}
      >
        <TaskCreate />
      </Modal>

      {/* タスク一覧テーブル */}
      <TaskListTable taskList={data} userList={userList} />
    </Col>
  )
}
