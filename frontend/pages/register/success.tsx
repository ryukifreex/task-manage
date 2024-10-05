import { useTranslation } from 'react-i18next'

export default function RegisterSuccess() {
  const { t } = useTranslation()
  return <div>{t('user.form.email_sent')}</div>
}
