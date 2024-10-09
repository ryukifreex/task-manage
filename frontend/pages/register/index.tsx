import { useForm, SubmitHandler } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { Button, message, Modal } from 'antd'
import { API_BASE_URL } from '../../config/api'
import UserForm from '../../features/user/UserForm'
import { UserFormType } from '../../types/user'
import EmailSent from '../../features/user/EmailSent'
import Link from 'next/link'

export default function UserRegister() {
  const useFormReturn = useForm<UserFormType>({
    defaultValues: {
      email: '',
      username: '',
      first_name: '',
      last_name: '',
      password: '',
      is_admin: false,
    },
  })
  const { isModalOpen, openModal, closeModal } = useModal()
  const { setError } = useFormReturn

  const { t } = useTranslation()
  const router = useRouter()

  // フォーム送信時の処理
  const onSubmit: SubmitHandler<UserFormType> = async (formData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/register/`,
        formData
      )
      message.success(t(`user.message.${response.data.message}`))
      openModal()
    } catch (error) {
      // APIからエラー取得
      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data
        if (errorData.email) {
          setError('email', {
            type: 'manual',
            message: t(`form.validation.${errorData.email[0]}`),
          })
        }
      } else {
        message.error(t('form.failed.register'))
      }
    }
  }

  return (
    <>
      <Modal
        open={isModalOpen}
        onCancel={() => {
          closeModal()
        }}
        footer={
          <Button type="primary">
            <Link href="/">{t('app.back_home')}</Link>
          </Button>
        }
      >
        <EmailSent />
      </Modal>
      <UserForm useForm={useFormReturn} onSubmit={onSubmit} />
    </>
  )
}
