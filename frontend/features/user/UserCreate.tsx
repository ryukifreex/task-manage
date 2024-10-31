import { useForm, SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import UserForm from './UserForm'
import { useModal } from '../../hooks/useModal'
import { Modal } from 'antd'
import { UserFormType } from '../../types/user'
import { useCreateUser } from '../../hooks/user/useCreateUser'
import { useAuth } from '../../context/AuthContext'
import EmailSent from './EmailSent'

type UserCreateType = {
  isAdmin?: boolean
}

export default function UserCreate({ isAdmin = false }: UserCreateType) {
  const { t } = useTranslation()
  const { token } = useAuth()
  const { createUser, message } = useCreateUser()
  const { isModalOpen, openModal, closeModal } = useModal()
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

  const onSubmit: SubmitHandler<UserFormType> = async (formData) => {
    const result = await createUser(formData, token)
    if (result.success) {
      openModal()
    }
  }

  return (
    <>
      <UserForm
        useForm={useFormReturn}
        onSubmit={onSubmit}
        isAdmin={isAdmin}
        formError={message}
      />

      {/* 完了時のモーダル */}
      <Modal
        open={isModalOpen}
        onCancel={() => {
          closeModal()
        }}
        closeIcon={null}
        footer={null}
      >
        <EmailSent />
      </Modal>
    </>
  )
}
