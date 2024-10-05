import { useGetTask } from '../../../hooks/task/useGetTask'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import TaskDetail from '../../../components/task/TaskDetail'
import TaskError from '../../../components/task/TaskError'
import StatusBadge from '../../../components/StatusBadge'
import { useAuthCheck } from '../../../hooks/useAuthCheck'
import { Col, Typography } from 'antd'
import { Loading } from '../../../components/Loading'

export default function Detail() {
  const { t } = useTranslation()
  const { query } = useRouter()
  const id = query.id ? Number(query.id) : undefined
  const { data, error } = useGetTask(id)
  const isAuthenticated = useAuthCheck()

  if (!isAuthenticated) return <Loading />
  if (error) {
    console.log({ error })
    return <TaskError type="GET" message={t('task.error.get')} />
  }

  if (!data) return <Loading />
  return (
    <Col style={{ padding: '2rem' }}>
      <Typography.Title>{data.title}</Typography.Title>
      <StatusBadge status={data.status} />
      <TaskDetail task={data} />
    </Col>
  )
}
