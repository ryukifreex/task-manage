import { useGetTask } from '../../../hooks/task/useGetTask'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import TaskDetail from '../../../features/task/TaskDetail'
import TaskError from '../../../features/task/TaskError'
import StatusBadge from '../../../components/StatusBadge'
import { Col, Typography } from 'antd'
import { Loading } from '../../../components/Loading'
import { useAuth } from '../../../context/AuthContext'

export default function Detail() {
  const { t } = useTranslation()
  const { query } = useRouter()
  const id = query.id ? Number(query.id) : undefined
  const { isAuthenticated, token } = useAuth()
  const { data, error } = useGetTask(id, token)

  // TODOリダイレクト処理
  if (!isAuthenticated) return <Loading />
  if (error) {
    console.log({ error })
    return <TaskError type="GET" message={t('task.error.get')} />
  }

  if (!data) return <Loading />
  return (
    <Col style={{ paddingInline: '10vw' }}>
      <Typography.Title>{data.title}</Typography.Title>
      <StatusBadge status={data.status} />
      <TaskDetail task={data} />
    </Col>
  )
}
