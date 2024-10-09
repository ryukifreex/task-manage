import { useForm, SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import UserForm from './UserForm'
import { useModal } from '../../hooks/useModal'
import { useRouter } from 'next/router'
import { message, Modal, Typography } from 'antd'
import { UserFormType } from '../../types/user'
import { useCreateUser } from '../../hooks/user/useCreateUser'
import { useAuth } from '../../context/AuthContext'
import EmailSent from './EmailSent'

export default function UserCreate() {
  const { t } = useTranslation()
  const { token } = useAuth()
  const { createUser } = useCreateUser()
  const { isModalOpen, openModal, closeModal } = useModal()
  const router = useRouter()
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
  const { setError } = useFormReturn

  const onSubmit: SubmitHandler<UserFormType> = async (formData) => {
    try {
      await createUser(formData, token)
      openModal()
    } catch (error) {
      const errorData = error.response.data
      if (errorData.email) {
        setError('email', {
          type: 'manual',
          message: t(`form.validation.${errorData.email[0]}`),
        })
      } else {
        message.error(t('form.failed.register'))
      }
    }
  }

  return (
    <>
      <UserForm useForm={useFormReturn} onSubmit={onSubmit} isAdmin={true} />

      {/* 完了時のモーダル */}
      <Modal
        open={isModalOpen}
        onCancel={() => {
          closeModal()
        }}
        footer={null}
      >
        <EmailSent />
      </Modal>
    </>
  )
}
