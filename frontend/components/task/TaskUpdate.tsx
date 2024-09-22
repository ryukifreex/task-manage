import { useEffect } from 'react'
import { useUpdateTask } from '../../hooks/task/useUpdateTask'
import { useTranslation } from 'react-i18next'
import TaskForm from './TaskForm'
import { SubmitHandler, useForm } from 'react-hook-form'
import { TaskFormType } from '../../types/task'
import { TaskType } from '../../types/task'
import { Button, Modal, Text } from '@mantine/core'
import { useModal } from '../../hooks/useModal'
import { useRouter } from 'next/router'

export type TaskUpdateFormProps = {
  task: TaskType
}

export default function TaskUpdate({ task }: TaskUpdateFormProps) {
  const { t } = useTranslation()
  const { isModalOpen, openModal, closeModal } = useModal()
  const { updateTask } = useUpdateTask()
  const router = useRouter()

  const useFormReturn = useForm<TaskFormType>({
    defaultValues: {
      title: task.title,
      description: task.description,
      status: task.status,
    },
  })
  const { setError, reset } = useFormReturn

  const onSubmit: SubmitHandler<TaskFormType> = (formData) => {
    if (!formData.title.trim()) {
      setError('title', {
        type: 'manual',
        message: t('form.validation.required'),
      })
      return
    }
    try {
      updateTask({
        id: task.id,
        title: formData.title,
        description: formData.description,
        status: formData.status,
      })
      openModal()
    } catch (error) {
      console.log({ error })
      return
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
        opened={isModalOpen}
        onClose={() => {
          closeModal()
          router.push('/')
        }}
        withCloseButton={false}
        radius={5}
        centered
      >
        <Text ta={'center'}>{t('form.success.update')}</Text>
        <Button
          mt="md"
          fullWidth
          onClick={() => {
            closeModal()
            router.push('/')
          }}
        >
          OK
        </Button>
      </Modal>
      <TaskForm useForm={useFormReturn} onSubmit={onSubmit} />
    </>
  )
}
