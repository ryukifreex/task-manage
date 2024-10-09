import { Col, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

export default function EmailSent() {
  const { t } = useTranslation()
  return (
    <Col style={{ padding: '2rem' }}>
      <Typography.Text>{t('user.message.email_sent')}</Typography.Text>
    </Col>
  )
}
