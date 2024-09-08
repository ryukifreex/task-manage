import { Box, Button, Select, Stack, Textarea, TextInput } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'
import { TaskStatusType, TaskFormType } from '../../types/task'
// import { useGetTaskStatusList } from '../../services/taskService'
import { useTaskStatusList } from '../../context/TaskStatusContext'
import { useEffect } from 'react'
export type TaskFormProps = {
  useForm: UseFormReturn<TaskFormType>
  onSubmit: SubmitHandler<TaskFormType>
}

export default function TaskForm({ useForm, onSubmit }: TaskFormProps) {
  const { t, ready } = useTranslation()
  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm
  const { statusList } = useTaskStatusList()

  return (
    <Box style={{ padding: '20px' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={'md'}>
          {/* Title */}
          <TextInput
            label={t('task.form.title')}
            placeholder={t('task.form.title')}
            {...register('title', {
              required: t('task.form.validation.required'),
            })}
            error={errors.title?.message}
          />

          {/* Description */}
          <Textarea
            label={t('task.form.description')}
            placeholder={t('task.form.description')}
            {...register('description')}
            error={errors.description?.message}
            autosize
            minRows={4}
          />

          {/* Status */}
          {ready && (
            <Select
              label={t('task.form.status')}
              data={Object.keys(statusList).map((status: TaskStatusType) => ({
                key: status,
                value: status,
                label: t(`task.status.${status}`),
              }))}
              {...register('status', {
                required: t('task.form.validation.required'),
              })}
              defaultValue={watch('status')}
              error={errors.status?.message}
              onChange={(selected) => {
                setValue('status', selected)
              }}
            />
          )}
          <Button type="submit" mt="md">
            {t('task.form.submit')}
          </Button>
        </Stack>
      </form>
    </Box>
  )
}
