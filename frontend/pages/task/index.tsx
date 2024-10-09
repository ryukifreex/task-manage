import { useTranslation } from 'react-i18next'
import { useGetTaskList } from '../../hooks/task/useGetTaskList'
import TaskCreate from '../../features/task/TaskCreate'
import { useModal } from '../../hooks/useModal'
import TaskListTable from '../../features/task/TaskListTable'
import TaskError from '../../features/task/TaskError'
import { useGetUserList } from '../../hooks/user/useGetUserList'
import { Button, Col, Flex, Modal } from 'antd'
import { Loading } from '../../components/Loading'
import { useAuth } from '../../context/AuthContext'
import { useRouter } from 'next/router'

export default function Task() {
  const { t } = useTranslation()
  const { token } = useAuth()
  const { data, error, mutate } = useGetTaskList(token)
  const { data: userList, error: userError } = useGetUserList(token)
  const { isModalOpen, openModal, closeModal } = useModal()
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  // TODO認証されていないときの処理
  if (!isAuthenticated) router.push('/login')

  if (error || userError) return <TaskError />

  return (
    <Col style={{ padding: '2rem' }}>
      {/* タスク追加ボタン */}
      <Flex justify={'flex-end'}>
        <Button type="primary" onClick={() => openModal()}>
          {t('task.add')}
        </Button>
      </Flex>

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
        footer={null}
      >
        <TaskCreate />
      </Modal>

      {/* タスク一覧テーブル */}
      {data ? (
        <TaskListTable taskList={data} userList={userList} />
      ) : (
        <Loading />
      )}
    </Col>
  )
}
