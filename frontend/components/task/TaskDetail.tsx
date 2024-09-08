import { useTranslation } from 'react-i18next'
import {
  Alert,
  Button,
  Flex,
  Loader,
  Modal,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { TaskType } from '../../types/task'
import { useDeleteTask } from '../../services/taskService'
import useModal from '../../hooks/useModal'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export type TaskDetailProps = {
  task: TaskType
}

export default function TaskDetail({ task }: TaskDetailProps) {
  const { t } = useTranslation()
  const [{ data, error }, deleteTask] = useDeleteTask(task.id)
  const { isModalOpen, openModal, closeModal } = useModal()
  const [deleted, setDeleted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (error) {
      console.log({ data, error })
    }
  }, [error])

  const handleDelete = () => {
    deleteTask()
    setDeleted(true)
  }

  return (
    <>
      <Title order={2}>{task.title}</Title>
      <span>{t(`task.status.${task.status}`)}</span>
      <p>{task.description}</p>
      {!deleted && (
        <Flex gap={'lg'}>
          <Button onClick={() => router.push(`/task/${task.id}/update`)}>
            {t('task.form.edit')}
          </Button>
          <Button color={'red'} onClick={() => openModal()}>
            {t('task.form.delete')}
          </Button>
        </Flex>
      )}
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
            <Text ta={'center'}>{t('task.form.success.delete')}</Text>
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
            <Text ta={'center'}>{t('task.form.confirm.delete')}</Text>
            <Flex justify={'space-evenly'}>
              <Button
                mt={'md'}
                onClick={() => {
                  closeModal()
                }}
              >
                {t('task.form.cancel')}
              </Button>
              <Button
                mt={'md'}
                color={'red'}
                onClick={() => {
                  handleDelete()
                }}
              >
                {t('task.form.delete')}
              </Button>
            </Flex>
          </>
        )}
      </Modal>
    </>
  )
}
