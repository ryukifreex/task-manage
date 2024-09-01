import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Flex, Loader, Modal, Notification, Title } from '@mantine/core'
import { useGetTaskList } from '../../services/taskService'
import TaskCreate from '../../components/task/TaskCreate'
import useModal from '../../hooks/useModal'
import TaskListTable from '../../components/task/TaskListTable'
import TaskError from '../../components/task/TaskError'

export default function Task() {
  const { t } = useTranslation()
  const [{ data, loading, error }, getTaskList] = useGetTaskList()
  const { isModalOpen, openModal, closeModal } = useModal()
  useEffect(() => {
    getTaskList()
  }, [])

  if (error) {
    return <TaskError />
  }

  return (
    <>
      <Title order={2}>{t('app.name')}</Title>
      <Flex justify={'flex-end'} mb={'md'}>
        <Button onClick={() => openModal()}>{t('task.add')}</Button>
      </Flex>
      <Modal
        opened={isModalOpen}
        onClose={() => {
          closeModal()
          getTaskList()
        }}
      >
        <TaskCreate />
      </Modal>
      {data && !loading ? <TaskListTable taskList={data} /> : <Loader />}
    </>
  )
}
