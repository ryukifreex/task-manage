import { Controller, useForm, SubmitHandler } from 'react-hook-form'
import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { Form, Input, Button, Typography, message, Col, Flex, Row } from 'antd'
import { API_BASE_URL } from '../../config/api'
import Link from 'next/link'

// フォーム入力の型定義
type UserRegisterFormInputs = {
  email: string
  username: string
  password: string
}

export default function UserRegister() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegisterFormInputs>()
  const { t } = useTranslation()
  const router = useRouter()
  const [errorMessages, setErrorMessages] = useState<string[]>([])

  // フォーム送信時の処理
  const onSubmit: SubmitHandler<UserRegisterFormInputs> = async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/user/register/`, data)
      message.success(t(`user.message.${response.data.message}`)) // Ant Designのメッセージコンポーネントを使用
      // 登録が成功したら次のページに遷移
      router.push('/register/sent')
    } catch (error) {
      // バックエンドからのエラーメッセージを取得
      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data
        // ユニークエラーのメッセージを配列に追加
        const errorsList = []
        if (errorData.email) {
          errorsList.push(errorData.email[0]) // メールアドレスのエラーメッセージ
        }
        if (errorData.username) {
          errorsList.push(errorData.username[0]) // ユーザー名のエラーメッセージ
        }
        setErrorMessages(errorsList)
      } else {
        message.error(t('form.failed.register'))
      }
    }
  }

  return (
    <Row justify="center" align="middle">
      <Col xs={24} sm={12} md={8}>
        <Typography.Title level={2}>{t('user.label.new')}</Typography.Title>
        <Form onFinish={handleSubmit(onSubmit)}>
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
              >
                <Input type="email" {...field} />
              </Form.Item>
            )}
          />

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
              >
                <Input type="text" {...field} />
              </Form.Item>
            )}
          />

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
              >
                <Input.Password {...field} />
              </Form.Item>
            )}
          />

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

        {/* ユニークエラーの表示 */}
        {errorMessages.length > 0 && (
          <div>
            {errorMessages.map((error, index) => (
              <p key={index} style={{ color: 'red' }}>
                {error}
              </p>
            ))}
          </div>
        )}
      </Col>
    </Row>
  )
}
