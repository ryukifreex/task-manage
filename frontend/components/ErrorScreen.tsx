import React from 'react'
import { Result, Button, Row, Col } from 'antd'
import { useTranslation } from 'react-i18next'

type ErrorScreenProps = {
  error?: number
}

export default function ErrorScreen({ error }: ErrorScreenProps) {
  const { t } = useTranslation()

  let title, subTitle, status

  // errorに基づいて表示を切り替え
  switch (error) {
    case 404:
      title = t('app.error.404.title')
      subTitle = t('app.error.404.description')
      status = '404'
      break
    case 500:
      title = t('app.error.500.title')
      subTitle = t('app.error.500.description')
      status = '500'
      break
    default:
      title = t('app.error.general.title')
      subTitle = t('app.error.general.description')
      status = 'error'
  }

  return (
    <Result
      status={status}
      title={title}
      subTitle={subTitle}
      extra={
        <Row justify={'center'}>
          <Col
            xs={24}
            sm={12}
            md={6}
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBlock: '1rem',
            }}
          >
            <Button type="primary" onClick={() => (window.location.href = '/')}>
              {t('app.back_home')}
            </Button>
          </Col>
          <Col
            xs={24}
            sm={12}
            md={6}
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBlock: '1rem',
            }}
          >
            <Button type="primary" onClick={() => window.location.reload()}>
              {t('app.error.refresh')}
            </Button>
          </Col>
        </Row>
      }
    />
  )
}
