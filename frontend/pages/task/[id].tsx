import { useEffect } from 'react'
import { useGetTask, useUpdateTask } from '../../hooks/api/useTask'
import { useTranslation } from 'react-i18next'
import TaskForm from '../../components/form/TaskForm'
import { SubmitHandler, useForm } from 'react-hook-form'
import { UpdateTaskType } from '../../types/task'

export default function UpdateTask(id: number) {
  const { t } = useTranslation()
  const [{ data: getData, error: getError }, getTask] = useGetTask()
  const [
    { data: updateData, loading: updateLoading, error: updateError },
    updateTask,
  ] = useUpdateTask()

  const useFormReturn = useForm<UpdateTaskType>({
    defaultValues: {
      title: getData.title,
      description: getData.description ?? '',
      completed: getData.completed ?? false,
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

    updateTask(id, {
      title: formData.title,
      description: formData.description,
      completed: formData.completed,
    })
  }

  useEffect(() => {
    getTask(id)
  }, [id])

  useEffect(() => {
    if (getData || updateData) {
      reset()
    }
    if (getError) {
      console.log({ getError })
    }
    if (updateError) {
      alert(t('task.form.update.failed'))
      console.log({ updateError })
    }
  }, [getData, updateData, getError, updateError])

  return <TaskForm useForm={useFormReturn} onSubmit={onSubmit} />
}
