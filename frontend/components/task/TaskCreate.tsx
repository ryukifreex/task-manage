import { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import {
  TaskFormType,
  TaskStatusListType,
  TaskStatusType,
} from '../../types/task'
import { useTranslation } from 'react-i18next'
import { useCreateTask } from '../../services/taskService'
import React from 'react'
import TaskForm from './TaskForm'
import useModal from '../../hooks/useModal'
import { Button, Modal, Text, Title } from '@mantine/core'
import { useRouter } from 'next/router'

export type TaskCreateProps = {
  statusList: TaskStatusListType
}
export default function TaskCreate({ statusList }: TaskCreateProps) {
  const { t } = useTranslation()
  const [{ data, error }, createTask] = useCreateTask()
  const { isModalOpen, openModal, closeModal } = useModal()
  const router = useRouter()
  const defaultStatus = Object.keys(statusList)[0] as TaskStatusType
  const useFormReturn = useForm<TaskFormType>({
    defaultValues: {
      title: '',
      description: '',
      status: defaultStatus,
    },
  })
  const { reset, setError } = useFormReturn
  console.log({ defaultStatus })

  const onSubmit: SubmitHandler<TaskFormType> = (formData) => {
    if (!formData.title.trim()) {
      setError('title', {
        type: 'manual',
        message: t('task.form.validation.required'),
      })
      return
    }

    createTask({
      data: {
        title: formData.title,
        description: formData.description,
        status: formData.status,
      },
    })
    openModal()
  }

  useEffect(() => {
    if (data) {
      reset()
    }
    if (error) console.log({ error })
  }, [data, error, reset])

  return (
    <>
      <Title order={2}>{t('menu.task.create')}</Title>
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
        <Text ta="center">{t('task.form.success.create')}</Text>
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
      <TaskForm useForm={useFormReturn} onSubmit={onSubmit} />
    </>
  )
}
