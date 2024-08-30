import { Box, Button, Stack, Textarea, TextInput, Title } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import {
  UseFormRegister,
  FieldErrors,
  SubmitHandler,
  FieldValues,
  UseFormReturn,
} from 'react-hook-form'
import { CreateTaskType, TaskFormType, UpdateTaskType } from '../../types/task'

export type FormType = CreateTaskType | UpdateTaskType
export type TaskFormProps = {
  useForm: UseFormReturn<FormType>
  onSubmit: SubmitHandler<FormType>
}

export default function TaskForm({ useForm, onSubmit }: TaskFormProps) {
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm

  return (
    <Box style={{ padding: '20px' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={'md'}>
          <Title order={1}>{t('menu.task.add')}</Title>

          <TextInput
            label={t('task.form.title')}
            placeholder={t('task.form.title')}
            {...register('title', { required: t('task.form.title.required') })}
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

          {/* TODO: status管理をDjangoで編集して */}
          {/* <Checkbox label="Completed" {...register('completed')} /> */}
          <Button type="submit" mt="md">
            {t('task.form.submit')}
          </Button>
        </Stack>
      </form>
    </Box>
  )
}
