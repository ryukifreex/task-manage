import { useTranslation } from 'react-i18next'
import { TaskType } from '../../types/task'
import { useDeleteTask } from '../../hooks/task/useDeleteTask'
import { useModal } from '../../hooks/useModal'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Button, Col, Divider, Flex, Modal, Row, Typography } from 'antd'
import { useAuth } from '../../context/AuthContext'
import { useConvertToLocal } from '../../hooks/useConvertToLocalTime'
import { useFindUser } from '../../hooks/user/useFindUser'
import { UserType } from '../../types/user'

export type TaskDetailProps = {
  task: TaskType
  userList: UserType[]
}

export default function TaskDetail({ task, userList }: TaskDetailProps) {
  const { t } = useTranslation()
  const { deleteTask, message } = useDeleteTask()
  const { token } = useAuth()
  const { isModalOpen, openModal, closeModal } = useModal()
  const { toLocalDate, toLocalDateTime } = useConvertToLocal()
  const [deleted, setDeleted] = useState(false)
  const [resultMessage, setResultMessage] = useState(message)
  const { labelName } = useFindUser()
  const router = useRouter()

  const assignee = labelName(userList, task.assignee)

  const handleDelete = async () => {
    const result = await deleteTask(task.id, token)
    if (result.success) {
      setDeleted(true)
      setResultMessage(t('form.success.delete'))
    } else {
      setResultMessage(t(`form.validation.${message}`))
    }
  }

  return (
    <Col>
      <Divider orientation={'center'}>{t('task.label.description')}</Divider>
      <Typography.Text>{task.description}</Typography.Text>

      <Divider />
      <Row>
        <Col md={12}>
          <Flex wrap={'wrap'} vertical>
            <Col md={12}>
              {t('task.label.start_date')} :
              {task.start_date ? toLocalDate(task.start_date) : ''}
            </Col>
            <Col md={12}>
              {t('task.label.end_date')} :
              {task.end_date ? toLocalDate(task.end_date) : ''}
            </Col>
          </Flex>
        </Col>
        <Col md={12}>
          <Flex vertical>
            <Col md={12}>
              {t('task.label.create')} : {toLocalDateTime(task.created_at)}
            </Col>
            <Col md={12}>
              {t('task.label.update')} : {toLocalDateTime(task.updated_at)}
            </Col>
          </Flex>
        </Col>
      </Row>
      <Divider />
      <Row style={{ marginBottom: '1rem' }}>
        <Typography.Text>
          {t('task.label.assignee')} : {assignee}
        </Typography.Text>
      </Row>

      {!deleted && (
        <Flex gap={'large'} justify="center">
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
      {/* 削除モーダル */}
      <Modal
        open={isModalOpen}
        onCancel={() => {
          closeModal()
        }}
        centered
        closeIcon={null}
        footer={null}
      >
        {deleted ? (
          // 削除後の表示
          <>
            <Typography.Text>{resultMessage}</Typography.Text>
            <Flex justify={'center'}>
              <Button
                onClick={() => {
                  router.push('/')
                  closeModal()
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
    </Col>
  )
}
