import { useGetTask } from '../../../hooks/task/useGetTask'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import TaskUpdate from '../../../features/task/TaskUpdate'
import TaskError from '../../../features/task/TaskError'
import { Col, Typography } from 'antd'
import { Loading } from '../../../components/Loading'
import { useAuth } from '../../../context/AuthContext'

export default function Edit() {
  const { t } = useTranslation()
  const { query } = useRouter()
  const id = query.id ? Number(query.id) : undefined
  const { isAuthenticated, token } = useAuth()
  const { data, error } = useGetTask(id, token)

  // TODO:リダイレクト処理
  if (!isAuthenticated) return <Loading />

  if (error) {
    return <TaskError type="GET" message={t('task.error.get')} />
  }
  if (!data) return <Loading />
  return (
    <Col style={{ padding: '2rem' }}>
      <Typography.Title>{t('menu.task.edit')}</Typography.Title>
      <TaskUpdate task={data} />
    </Col>
  )
}
