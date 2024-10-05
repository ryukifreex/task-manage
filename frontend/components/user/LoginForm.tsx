import { Button, Form, Input, Space, Typography } from 'antd'
import { LoginFormType } from '../../types/user'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'

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
    <Form
      layout="vertical"
      onFinish={handleSubmit(onSubmit)}
      style={{
        borderRadius: '8px',
        border: '1px solid #d9d9d9',
        padding: '24px',
      }}
    >
      <Form.Item
        label={t('user.label.email')}
        validateStatus={errors.email ? 'error' : ''}
        help={errors.email?.message}
      >
        <Input
          placeholder={t('user.label.email')}
          {...register('email', {
            required: t('form.validation.required'),
            pattern: {
              value: /^\S+@\S+$/,
              message: t('form.validation.type_email'),
            },
          })}
        />
      </Form.Item>

      <Form.Item
        label={t('user.label.password')}
        validateStatus={errors.password ? 'error' : ''}
        help={errors.password?.message}
      >
        <Input.Password
          placeholder={t('user.label.password')}
          {...register('password', {
            required: t('form.validation.required'),
          })}
        />
      </Form.Item>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            {t('user.label.login')}
          </Button>
          <Link href={'/register'}>{t('user.register')}</Link>
        </Space>
      </Form.Item>
    </Form>
  )
}
