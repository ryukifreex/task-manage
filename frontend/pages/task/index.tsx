import { useTranslation } from 'react-i18next'
import { Button, Flex, Loader, Modal, Title } from '@mantine/core'
import { useGetTaskList } from '../../hooks/task/useGetTaskList'
import TaskCreate from '../../components/task/TaskCreate'
import { useModal } from '../../hooks/useModal'
import TaskListTable from '../../components/task/TaskListTable'
import TaskError from '../../components/task/TaskError'
import { useAuthCheck } from '../../hooks/useAuthCheck'
import { useGetUserList } from '../../hooks/user/useGetUserList'

export default function Task() {
  const { t } = useTranslation()
  const { data, error, mutate } = useGetTaskList()
  const { data: userList, error: userError } = useGetUserList()
  const { isModalOpen, openModal, closeModal } = useModal()
  const isAuthenticated = useAuthCheck()

  if (!isAuthenticated) return <Loader />

  if (error || userError) return <TaskError />

  return (
    <>
      {/* <Title order={2}>{t('app.name')}</Title> */}

      {/* タスク追加ボタン */}
      <Flex justify={'flex-end'} mb={'md'}>
        <Button onClick={() => openModal()}>{t('task.add')}</Button>
      </Flex>

      {/* タスク追加モーダル */}
      <Modal
        opened={isModalOpen}
        onClose={() => {
          closeModal()
          mutate()
        }}
      >
        <TaskCreate />
      </Modal>

      {/* タスク一覧テーブル */}
      {data ? <TaskListTable taskList={data} userList={userList} /> : <Loader />}
    </>
  )
}
