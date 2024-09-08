import { Box, Button, Select, Stack, Textarea, TextInput } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'
import { TaskStatusType, TaskFormType } from '../../types/task'
import { useGetTaskStatusList } from '../../services/taskService'
import { useEffect } from 'react'
export type TaskFormProps = {
  useForm: UseFormReturn<TaskFormType>
  onSubmit: SubmitHandler<TaskFormType>
}

export default function TaskForm({ useForm, onSubmit }: TaskFormProps) {
  const { t } = useTranslation()
  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm
  const [{ data: statusList, error: statusError }] = useGetTaskStatusList()

  useEffect(() => {
    console.log({ statusError })
  }, [statusError])

  const statusValue = watch('status')
  return (
    <Box style={{ padding: '20px' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={'md'}>
          <TextInput
            label={t('task.form.title')}
            placeholder={t('task.form.title')}
            {...register('title', {
              required: t('task.form.validation.required'),
            })}
            error={errors.title?.message}
          />

          <Textarea
            label={t('task.form.description')}
            placeholder={t('task.form.description')}
            {...register('description')}
            error={errors.description?.message}
            autosize
            minRows={4}
          />

          {statusList && (
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
              defaultValue={statusValue}
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
