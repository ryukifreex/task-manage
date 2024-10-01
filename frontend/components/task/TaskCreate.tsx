import { useForm, SubmitHandler } from 'react-hook-form'
import { TaskFormType, TaskStatusType } from '../../types/task'
import { useTranslation } from 'react-i18next'
import { useCreateTask } from '../../hooks/task/useCreateTask'
import { useTaskStatusList } from '../../context/TaskStatusContext'
import TaskForm from './TaskForm'
import { useModal } from '../../hooks/useModal'
import { Button, Modal, Text } from '@mantine/core'
import { useRouter } from 'next/router'

export default function TaskCreate() {
  const { t } = useTranslation()
  const { createTask } = useCreateTask()
  const { statusList } = useTaskStatusList()
  const { isModalOpen, openModal, closeModal } = useModal()
  const router = useRouter()
  const defaultStatus = statusList ? (Object.keys(statusList)[0] as TaskStatusType) : undefined
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
    // TODO:作成失敗時のエラーハドリング
    createTask({
      title: formData.title,
      description: formData.description,
      status: formData.status,
      assignee: formData.assignee,
      start_date: formData.start_date,
      end_date: formData.end_date,
    })
    openModal()
  }

  return (
    <>
      <TaskForm useForm={useFormReturn} onSubmit={onSubmit} />

      {/* 完了時のモーダル */}
      <Modal
        opened={isModalOpen}
        onClose={() => {
          router.push('/')
          closeModal()
        }}
        withCloseButton={false}
        radius={5}
        centered
      >
        <Text ta="center">{t('form.success.create')}</Text>
        <Button
          mt="md"
          fullWidth
          onClick={() => {
            router.push('/')
            closeModal()
          }}
        >
          OK
        </Button>
      </Modal>
    </>
  )
}
