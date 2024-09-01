import { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { CreateTaskType } from '../../types/task'
import { useTranslation } from 'react-i18next'
import { useCreateTask } from '../../services/taskService'
import React from 'react'
import TaskForm from './TaskForm'
import useModal from '../../hooks/useModal'
import { Button, Modal, Text, Title } from '@mantine/core'
import { useRouter } from 'next/router'

export default function TaskCreate() {
  const { t } = useTranslation()
  const [{ data, error }, createTask] = useCreateTask()
  const { isModalOpen, openModal, closeModal } = useModal()
  const router = useRouter()

  const useFormReturn = useForm<CreateTaskType>({
    defaultValues: {
      title: '',
      description: '',
    },
  })
  const { reset, setError } = useFormReturn

  const onSubmit: SubmitHandler<CreateTaskType> = (formData) => {
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
