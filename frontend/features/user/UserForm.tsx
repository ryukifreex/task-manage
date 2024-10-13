import { Controller, SubmitHandler, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Form, Input, Button, Col, Flex, Row, Checkbox, Typography } from 'antd'
import Link from 'next/link'
import { UserFormType } from '../../types/user'

export type TaskFormProps = {
  useForm: UseFormReturn<UserFormType>
  onSubmit: SubmitHandler<UserFormType>
  isAdmin?: boolean
  formError?: string
}

export default function UserForm({
  useForm,
  onSubmit,
  isAdmin,
  formError,
}: TaskFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm
  const { t } = useTranslation()

  return (
    <Row justify="center" align="middle">
      <Col xs={24} sm={12} md={8}>
        {formError && (
          <Typography.Text type="danger">
            {t(`form.validation.${formError}`)}
          </Typography.Text>
        )}

        <Form onFinish={handleSubmit(onSubmit)}>
          {/* email */}
          <Controller
            name="email"
            control={control}
            rules={{
              required: t('form.validation.required'),
              pattern: {
                value: /^\S+@\S+$/i,
                message: t('form.validation.type_email'),
              },
            }}
            render={({ field }) => (
              <Form.Item
                label={t('user.label.email')}
                validateStatus={errors.email ? 'error' : ''}
                help={errors.email?.message}
                required={true}
              >
                <Input type="email" {...field} />
              </Form.Item>
            )}
          />

          {/* username */}
          <Controller
            name="username"
            control={control}
            rules={{
              required: t('form.validation.required'),
              minLength: { value: 3, message: t('form.validation.min3') },
            }}
            render={({ field }) => (
              <Form.Item
                label={t('user.label.name')}
                validateStatus={errors.username ? 'error' : ''}
                help={errors.username?.message}
                required={true}
              >
                <Input type="text" {...field} />
              </Form.Item>
            )}
          />
          <Row>
            {/* first name */}
            <Col xs={24} sm={12} md={10} offset={2}>
              <Controller
                name="first_name"
                control={control}
                rules={{
                  minLength: { value: 3, message: t('form.validation.min3') },
                }}
                render={({ field }) => (
                  <Form.Item
                    label={t('user.label.first_name')}
                    validateStatus={errors.first_name ? 'error' : ''}
                    help={errors.first_name?.message}
                  >
                    <Input type="text" {...field} />
                  </Form.Item>
                )}
              />
            </Col>
            {/* last name */}
            <Col span={10} offset={2}>
              <Controller
                name="last_name"
                control={control}
                rules={{
                  minLength: { value: 3, message: t('form.validation.min3') },
                }}
                render={({ field }) => (
                  <Form.Item
                    label={t('user.label.last_name')}
                    validateStatus={errors.last_name ? 'error' : ''}
                    help={errors.last_name?.message}
                  >
                    <Input type="text" {...field} />
                  </Form.Item>
                )}
              />
            </Col>
          </Row>

          {/* password */}
          <Controller
            name="password"
            control={control}
            rules={{
              required: t('form.validation.required'),
              minLength: { value: 6, message: t('form.validation.min6') },
            }}
            render={({ field }) => (
              <Form.Item
                label={t('user.label.password')}
                validateStatus={errors.password ? 'error' : ''}
                help={errors.password?.message}
                required={true}
              >
                <Input.Password {...field} />
              </Form.Item>
            )}
          />

          {isAdmin && (
            <Controller
              name="is_admin"
              control={control}
              render={({ field }) => (
                <Form.Item
                  label={t('user.label.admin')}
                  validateStatus={errors.is_admin ? 'error' : ''}
                  help={errors.is_admin?.message}
                >
                  <Checkbox {...field} />
                </Form.Item>
              )}
            />
          )}

          <Form.Item>
            <Flex justify={'space-evenly'}>
              <Button type="primary" htmlType="submit">
                {t('form.register')}
              </Button>
              <Button type="primary">
                <Link href="/">{t('app.back_home')}</Link>
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}
