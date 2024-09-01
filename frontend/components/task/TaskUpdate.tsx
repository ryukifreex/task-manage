import { useEffect } from 'react'
import { useUpdateTask } from '../../services/taskService'
import { useTranslation } from 'react-i18next'
import TaskForm from './TaskForm'
import { SubmitHandler, useForm } from 'react-hook-form'
import { UpdateTaskType } from '../../types/task'
import { TaskType } from '../../types/task'
import { Button, Modal, Text, Title } from '@mantine/core'
import useModal from '../../hooks/useModal'
import { useRouter } from 'next/router'

export type TaskUpdateFormProps = {
  task: TaskType
}

export default function TaskUpdate({ task }: TaskUpdateFormProps) {
  const { t } = useTranslation()
  const { isModalOpen, openModal, closeModal } = useModal()
  const [
    { data: updateData, loading: updateLoading, error: updateError },
    updateTask,
  ] = useUpdateTask(task.id)
  const router = useRouter()

  const useFormReturn = useForm<UpdateTaskType>({
    defaultValues: {
      title: task.title,
      description: task.description,
      status: task.status,
    },
  })
  const { setError, reset } = useFormReturn

  const onSubmit: SubmitHandler<UpdateTaskType> = (formData) => {
    if (!formData.title.trim()) {
      setError('title', {
        type: 'manual',
        message: t('task.form.validation.required'),
      })
      return
    }
    try {
      updateTask({
        data: {
          title: formData.title,
          description: formData.description,
          status: formData.status,
        },
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

  useEffect(() => {
    if (updateError) {
      alert(t('task.form.update.failed'))
      console.log({ updateError })
    }
  }, [updateData, updateError])

  return (
    <>
      <Title order={2}>{t('menu.task.edit')}</Title>
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
        <Text ta={'center'}>{t('task.form.success.update')}</Text>
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
