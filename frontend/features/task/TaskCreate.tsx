import { useForm, SubmitHandler } from 'react-hook-form'
import { TaskFormType, TaskStatusType } from '../../types/task'
import { useTranslation } from 'react-i18next'
import { useCreateTask } from '../../hooks/task/useCreateTask'
import { useTaskStatusList } from '../../context/TaskStatusContext'
import TaskForm from './TaskForm'
import { useModal } from '../../hooks/useModal'
import { Modal, Typography } from 'antd'
import { useAuth } from '../../context/AuthContext'

export default function TaskCreate() {
  const { t } = useTranslation()
  const { createTask } = useCreateTask()
  const { statusList } = useTaskStatusList()
  const { isModalOpen, openModal, closeModal } = useModal()
  const { token } = useAuth()
  const defaultStatus = statusList
    ? (Object.keys(statusList)[0] as TaskStatusType)
    : undefined
  const useFormReturn = useForm<TaskFormType>({
    defaultValues: {
      title: '',
      description: '',
      status: defaultStatus,
    },
  })
  const { setError } = useFormReturn

  const onSubmit: SubmitHandler<TaskFormType> = (formData) => {
    if (!formData.title.trim()) {
      setError('title', {
        type: 'manual',
        message: t('form.validation.required'),
      })
      return
    }
    createTask(
      {
        title: formData.title,
        description: formData.description,
        status: formData.status,
        assignee: formData.assignee,
        start_date: formData.start_date,
        end_date: formData.end_date,
      },
      token
    )
    openModal()
  }

  return (
    <>
      <TaskForm useForm={useFormReturn} onSubmit={onSubmit} />

      {/* 完了時のモーダル */}
      <Modal
        open={isModalOpen}
        onCancel={() => {
          closeModal()
        }}
        footer={null}
        closeIcon={null}
      >
        <Typography.Text>{t('form.success.create')}</Typography.Text>
      </Modal>
    </>
  )
}
