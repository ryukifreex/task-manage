import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_BASE_URL } from '../../config/api'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { Button, Col, Typography } from 'antd'

export default function () {
  const router = useRouter()
  const { t } = useTranslation()
  const { uidb64, token } = router.query
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (uidb64 && token) {
      // Django APIに認証リクエストを送信
      axios
        .get(`${API_BASE_URL}/user/activate/${uidb64}/${token}/`)
        .then((response) => {
          setMessage(t(`user.message.activate_success`))
          // 認証が完了したらトップページに2秒後に遷移
          setTimeout(() => {
            router.push('/')
          }, 2000)
        })
        .catch((error) => {
          setMessage(t('user.message.activate_failed'))
        })
    }
  }, [uidb64, token, router])

  return (
    <Col style={{ padding: '2rem' }}>
      <Typography.Title level={2}>{message}</Typography.Title>
      <Typography.Paragraph>
        {t('user.message.redirecting')}
      </Typography.Paragraph>
      <Button type="primary">
        <Link href="/">{t('app.back_login')}</Link>
      </Button>
    </Col>
  )
}
