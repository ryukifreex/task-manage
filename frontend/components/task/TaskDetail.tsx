import { useTranslation } from 'react-i18next'
import { TaskType } from '../../types/task'
import { useDeleteTask } from '../../hooks/task/useDeleteTask'
import { useModal } from '../../hooks/useModal'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Button, Flex, Modal, Typography } from 'antd'

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
        <Flex>
          <Button
            type="primary"
            onClick={() => router.push(`/task/${task.id}/update`)}
          >
            {t('task.label.edit')}
          </Button>
          <Button danger={true} onClick={() => openModal()}>
            {t('form.delete')}
          </Button>
        </Flex>
      )}
      {/* 削除関連モーダル */}
      <Modal
        open={isModalOpen}
        onCancel={() => {
          closeModal()
        }}
        centered
      >
        {deleted ? (
          // 削除後の表示
          <>
            <Typography.Text>{t('form.success.delete')}</Typography.Text>
            <Flex justify={'center'}>
              <Button
                onClick={() => {
                  closeModal()
                  router.push('/')
                }}
              >
                {t('app.back_home')}
              </Button>
            </Flex>
          </>
        ) : (
          // 削除前の表示
          <>
            <Typography.Text>{t('form.confirm.delete')}</Typography.Text>
            <Flex justify={'space-evenly'}>
              <Button
                type="primary"
                onClick={() => {
                  closeModal()
                }}
              >
                {t('form.cancel')}
              </Button>
              <Button
                danger={true}
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
