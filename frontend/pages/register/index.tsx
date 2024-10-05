import { useForm, SubmitHandler } from 'react-hook-form'
import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

// フォーム入力の型定義
type UserRegisterFormInputs = {
  email: string
  username: string
  password: string
}

export default function UserRegister() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegisterFormInputs>()
  const { t } = useTranslation()
  const [message, setMessage] = useState('')
  const [errorMessages, setErrorMessages] = useState<string[]>([])
  const router = useRouter()

  // フォーム送信時の処理
  const onSubmit: SubmitHandler<UserRegisterFormInputs> = async (data) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/user/register/',
        data
      )
      setMessage(response.data.message)
      // 登録が成功したら次のページに遷移
      router.push('/register/success')
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
        setMessage('登録に失敗しました。もう一度お試しください。')
      }
    }
  }
  return (
    <div>
      <h2>新規登録</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            {...register('email', {
              required: t('form.required'),
              pattern: /^\S+@\S+$/i,
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label>ユーザー名:</label>
          <input
            type="text"
            {...register('username', {
              required: t('form.required'),
              minLength: { value: 3, message: '3文字以上入力してください' },
            })}
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>

        <div>
          <label>パスワード:</label>
          <input
            type="password"
            {...register('password', {
              required: t('form.required'),
              minLength: { value: 6, message: '6文字以上入力してください' },
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <button type="submit">登録</button>
      </form>
      {message && <p>{message}</p>}
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
    </div>
  )
}
