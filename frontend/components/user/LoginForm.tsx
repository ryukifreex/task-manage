import { Button, Group, Paper, PasswordInput, Stack, TextInput } from '@mantine/core'
import { LoginFormType } from '../../types/user'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export type LoginFormProps = {
  onSubmit: SubmitHandler<LoginFormType>
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>()

  return (
    <Paper radius="md" p="xl" withBorder>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="md">
          <TextInput
            label={t('user.label.email')}
            placeholder={t('user.label.email')}
            {...register('email', {
              required: t('form.validation.required'),
              pattern: { value: /^\S+@\S+$/, message: t('form.validation.type_email') },
            })}
            error={errors.email?.message}
          />
          <PasswordInput
            label={t('user.label.password')}
            placeholder={t('user.label.password')}
            {...register('password', {
              required: t('form.validation.required'),
            })}
            error={errors.password?.message}
          />
          <Group justify="flex-end" mt="md">
            <Button type="submit">{t('user.label.login')}</Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  )
}
