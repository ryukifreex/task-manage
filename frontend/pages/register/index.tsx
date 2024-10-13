import { useForm, SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Button, Modal } from 'antd'
import UserForm from '../../features/user/UserForm'
import { UserFormType } from '../../types/user'
import EmailSent from '../../features/user/EmailSent'
import Link from 'next/link'
import { useModal } from '../../hooks/useModal'
import { useCreateUser } from '../../hooks/user/useCreateUser'

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
  const { t } = useTranslation()
  const { createUser, message } = useCreateUser()

  // フォーム送信時の処理
  const onSubmit: SubmitHandler<UserFormType> = async (formData) => {
    const result = await createUser(formData)
    if (result.success) {
      openModal()
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
      <UserForm
        useForm={useFormReturn}
        onSubmit={onSubmit}
        formError={message}
      />
    </>
  )
}
