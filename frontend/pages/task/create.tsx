import { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { CreateTaskType, TaskFormType } from '../../types/task'
import { useTranslation } from 'react-i18next'
import { useCreateTask } from '../../hooks/api/useTask'
import React from 'react'
import TaskForm from '../../components/form/TaskForm'

export default function CreateTask() {
  const { t } = useTranslation()
  const [{ data, error }, createTask] = useCreateTask()

  const useFormReturn = useForm<CreateTaskType>({
    defaultValues: {
      title: '',
      description: '',
    },
  })
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useFormReturn

  const onSubmit: SubmitHandler<CreateTaskType> = (formData) => {
    if (!formData.title.trim()) {
      setError('title', {
        type: 'manual',
        message: t('task.form.validation.required'),
      })
      return
    }

    createTask({
      title: formData.title,
      description: formData.description,
    })
  }

  useEffect(() => {
    if (data) {
      reset()
    }
    if (error) console.log({ error })
  }, [data, error, reset])

  return <TaskForm useForm={useFormReturn} onSubmit={onSubmit} />
}
