import { useGetTask } from '../../../hooks/task/useGetTask'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import TaskDetail from '../../../features/task/TaskDetail'
import TaskError from '../../../features/task/TaskError'
import { Col, Row, Typography } from 'antd'
import { Loading } from '../../../components/Loading'
import { useAuth } from '../../../context/AuthContext'
import StatusBadge from '../../../components/StatusBadge'
import { useGetUserList } from '../../../hooks/user/useGetUserList'

export default function Detail() {
  const { t } = useTranslation()
  const { query } = useRouter()
  const id = query.id ? Number(query.id) : undefined
  const { isAuthenticated, token } = useAuth()
  const { data: task, error } = useGetTask(id, token)
  const { data: userList } = useGetUserList(token)

  // TODOリダイレクト処理
  if (!isAuthenticated) return <Loading />
  if (error) {
    console.log({ error })
    return <TaskError type="GET" message={t('task.error.get')} />
  }

  if (!task) return <Loading />
  return (
    <Row justify="center" align="middle">
      <Col style={{ marginInline: '10vw' }}>
        <Typography.Title level={2}>{task.title}</Typography.Title>
        <Row>
          <StatusBadge status={task.status} />
        </Row>
        <TaskDetail task={task} userList={userList} />
      </Col>
    </Row>
  )
}
