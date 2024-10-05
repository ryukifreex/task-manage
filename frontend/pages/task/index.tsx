import { useTranslation } from 'react-i18next'
import { useGetTaskList } from '../../hooks/task/useGetTaskList'
import TaskCreate from '../../components/task/TaskCreate'
import { useModal } from '../../hooks/useModal'
import TaskListTable from '../../components/task/TaskListTable'
import TaskError from '../../components/task/TaskError'
import { useAuthCheck } from '../../hooks/useAuthCheck'
import { useGetUserList } from '../../hooks/user/useGetUserList'
import { Button, Col, Flex, Modal } from 'antd'
import { Loading } from '../../components/Loading'

export default function Task() {
  const { t } = useTranslation()
  const { data, error, mutate } = useGetTaskList()
  const { data: userList, error: userError } = useGetUserList()
  const { isModalOpen, openModal, closeModal } = useModal()
  const isAuthenticated = useAuthCheck()

  if (!isAuthenticated) return <Loading />

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
          closeModal()
          mutate()
        }}
        onCancel={() => closeModal()}
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
