import { Button, Flex, Form, Input } from 'antd'
import { LoginFormType } from '../../types/user'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'

export type LoginFormProps = {
  onSubmit: SubmitHandler<LoginFormType>
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const { t } = useTranslation()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>()

  return (
    <Form
      layout="vertical"
      onSubmitCapture={handleSubmit(onSubmit)}
      style={{
        borderRadius: '8px',
        border: '1px solid #d9d9d9',
        padding: '24px',
      }}
    >
      <Controller
        name="email"
        control={control}
        rules={{
          required: t('form.validation.required'),
          pattern: {
            value: /^\S+@\S+$/,
            message: t('form.validation.type_email'),
          },
        }}
        render={({ field }) => (
          <Form.Item
            label={t('user.label.email')}
            validateStatus={errors.email ? 'error' : ''}
            help={errors.email?.message}
          >
            <Input placeholder={t('user.label.email')} {...field} />
          </Form.Item>
        )}
      />

      <Controller
        name="password"
        control={control}
        rules={{ required: t('form.validation.required') }}
        render={({ field }) => (
          <Form.Item
            label={t('user.label.password')}
            validateStatus={errors.password ? 'error' : ''}
            help={errors.password?.message}
          >
            <Input.Password placeholder={t('user.label.password')} {...field} />
          </Form.Item>
        )}
      />

      <Form.Item>
        <Flex justify={'space-evenly'}>
          <Button type="primary" htmlType="submit">
            {t('user.label.login')}
          </Button>
          <Link href={'/register'}>{t('user.label.new')}</Link>
        </Flex>
      </Form.Item>
    </Form>
  )
}
