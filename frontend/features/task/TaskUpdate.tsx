import { useEffect } from 'react'
import { useUpdateTask } from '../../hooks/task/useUpdateTask'
import { useTranslation } from 'react-i18next'
import TaskForm from './TaskForm'
import { SubmitHandler, useForm } from 'react-hook-form'
import { TaskFormType } from '../../types/task'
import { TaskType } from '../../types/task'
import { useModal } from '../../hooks/useModal'
import { useRouter } from 'next/router'
import { Button, Modal, Typography } from 'antd'
import { useAuth } from '../../context/AuthContext'
import { useTaskStatusList } from '../../context/TaskStatusContext'

export type TaskUpdateFormProps = {
  task: TaskType
}

export default function TaskUpdate({ task }: TaskUpdateFormProps) {
  const { t } = useTranslation()
  const { isModalOpen, openModal, closeModal } = useModal()
  const { token } = useAuth()
  const { statusList } = useTaskStatusList()

  const { updateTask, message } = useUpdateTask()
  const router = useRouter()

  const useFormReturn = useForm<TaskFormType>({
    defaultValues: {
      title: task.title,
      description: task.description,
      status: task.status,
      assignee: task.assignee,
      start_date: task.start_date,
      end_date: task.end_date,
    },
  })
  const { setError, reset } = useFormReturn

  const onSubmit: SubmitHandler<TaskFormType> = async (formData) => {
    if (!formData.title.trim()) {
      setError('title', {
        type: 'manual',
        message: t('form.validation.required'),
      })
      return
    }
    const result = await updateTask(
      {
        id: task.id,
        title: formData.title,
        description: formData.description,
        status: formData.status,
        assignee: formData.assignee,
        start_date: formData.start_date,
        end_date: formData.end_date,
      },
      token
    )
    if (result.success) {
      openModal()
    }
  }

  // データ取得
  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description,
        status: task.status,
      })
    }
  }, [task])

  return (
    <>
      <Modal
        open={isModalOpen}
        onCancel={() => {
          closeModal()
          router.push('/')
        }}
        closeIcon={null}
        footer={
          <Button
            onClick={() => {
              closeModal()
              router.push('/')
            }}
          >
            OK
          </Button>
        }
      >
        <Typography.Text>{t('form.success.update')}</Typography.Text>
      </Modal>
      <TaskForm
        useForm={useFormReturn}
        onSubmit={onSubmit}
        statusList={statusList}
        formError={message}
      />
    </>
  )
}
