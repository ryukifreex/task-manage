import {
  Autocomplete,
  Box,
  Button,
  Flex,
  Group,
  Select,
  Stack,
  Textarea,
  TextInput,
} from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { SubmitHandler, UseFormReturn, Controller } from 'react-hook-form'
import { TaskStatusType, TaskFormType } from '../../types/task'
import { useTaskStatusList } from '../../context/TaskStatusContext'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useGetUserList } from '../../hooks/user/useGetUserList'

export type TaskFormProps = {
  useForm: UseFormReturn<TaskFormType>
  onSubmit: SubmitHandler<TaskFormType>
}

export default function TaskForm({ useForm, onSubmit }: TaskFormProps) {
  const { t, ready } = useTranslation()
  const {
    control,
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm
  const { statusList } = useTaskStatusList()
  const { data: userList, error, mutate } = useGetUserList()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={'md'}>
        {/* Title */}
        <TextInput
          label={t('task.label.title')}
          placeholder={t('task.label.title')}
          {...register('title', {
            maxLength: {
              value: 100,
              message: t('form.validation.maxLength'),
            },
            required: t('form.validation.required'),
          })}
          error={errors.title?.message}
        />

        {/* Description */}
        <Textarea
          label={t('task.label.description')}
          placeholder={t('task.label.description')}
          {...register('description')}
          error={errors.description?.message}
          autosize
          minRows={4}
        />

        {/* Status */}
        {/* TODO:並びを綺麗に */}
        <Flex justify={'space-between'}>
          {ready && statusList && (
            <Controller
              name="status"
              control={control}
              defaultValue={watch('status')}
              render={({ field }) => (
                <Select
                  label={t('task.label.status')}
                  data={Object.keys(statusList).map((status: TaskStatusType) => ({
                    key: status,
                    value: status,
                    label: t(`task.status.${status}`),
                  }))}
                  value={field.value}
                  onChange={(selected) => {
                    field.onChange(selected)
                  }}
                  error={errors.status?.message}
                />
              )}
            />
          )}
          {userList && (
            <Controller
              name="assignee"
              control={control}
              render={({ field }) => (
                <Select
                  label={t('task.label.assignee')}
                  data={Object.values(userList).map((user) => ({
                    key: user.id,
                    label: user.username,
                    value: user.id,
                  }))}
                  onChange={field.onChange}
                />
              )}
            />
          )}

          {/* Start Dates */}
          <Controller
            name="start_date"
            control={control}
            render={({ field }) => (
              <Box>
                <div>{t('task.label.start_date')}</div>
                <ReactDatePicker
                  dateFormat={t('task.date_format')}
                  selected={field.value}
                  onChange={field.onChange}
                  error={errors.start_date?.message}
                />
              </Box>
            )}
          />

          {/* End Dates */}
          <Controller
            name="end_date"
            control={control}
            render={({ field }) => (
              <Box>
                <div>{t('task.label.end_date')}</div>
                <ReactDatePicker
                  label={t('task.label.end_date')}
                  dateFormat={t('task.date_format')}
                  selected={field.value}
                  onChange={field.onChange}
                  error={errors.end_date?.message}
                />
              </Box>
            )}
          />
        </Flex>
        <Button type="submit" mt="md">
          {t('form.submit')}
        </Button>
      </Stack>
    </form>
  )
}
