import { useTranslation } from 'react-i18next'
import { Button, Flex, Modal, Text, Title } from '@mantine/core'
import { TaskType } from '../../types/task'
import { useDeleteTask } from '../../hooks/task/useDeleteTask'
import { useModal } from '../../hooks/useModal'
import { useRouter } from 'next/router'
import { useState } from 'react'

export type TaskDetailProps = {
  task: TaskType
}

export default function TaskDetail({ task }: TaskDetailProps) {
  const { t } = useTranslation()
  const { deleteTask } = useDeleteTask(task.id)
  const { isModalOpen, openModal, closeModal } = useModal()
  const [deleted, setDeleted] = useState(false)
  const router = useRouter()

  const handleDelete = () => {
    deleteTask()
    setDeleted(true)
  }

  return (
    <>
      <p>{task.description}</p>
      {!deleted && (
        <Flex gap={'lg'}>
          <Button onClick={() => router.push(`/task/${task.id}/update`)}>
            {t('task.label.edit')}
          </Button>
          <Button color={'red'} onClick={() => openModal()}>
            {t('form.delete')}
          </Button>
        </Flex>
      )}
      {/* 削除関連モーダル */}
      <Modal
        opened={isModalOpen}
        onClose={() => {
          closeModal()
        }}
        withCloseButton={false}
        radius={5}
        centered
      >
        {deleted ? (
          // 削除後の表示
          <>
            <Text ta={'center'}>{t('form.success.delete')}</Text>
            <Flex justify={'center'}>
              <Button
                mt={'md'}
                onClick={() => {
                  closeModal()
                  router.push('/')
                }}
              >
                {t('app.back')}
              </Button>
            </Flex>
          </>
        ) : (
          // 削除前の表示
          <>
            <Text ta={'center'}>{t('form.confirm.delete')}</Text>
            <Flex justify={'space-evenly'}>
              <Button
                mt={'md'}
                onClick={() => {
                  closeModal()
                }}
              >
                {t('form.cancel')}
              </Button>
              <Button
                mt={'md'}
                color={'red'}
                onClick={() => {
                  handleDelete()
                }}
              >
                {t('form.delete')}
              </Button>
            </Flex>
          </>
        )}
      </Modal>
    </>
  )
}
