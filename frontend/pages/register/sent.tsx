import { Button, Col, Typography } from 'antd'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export default function EmailSent() {
  const { t } = useTranslation()
  return (
    <Col style={{ padding: '2rem' }}>
      <Typography.Title>{t('user.message.email_sent')}</Typography.Title>
      <Button type="primary">
        <Link href="/">{t('app.back_home')}</Link>
      </Button>
    </Col>
  )
}
