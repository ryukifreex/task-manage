import { useTranslation } from 'react-i18next'
import { TaskType } from '../../types/task'
import { useRouter } from 'next/router'
import StatusBadge from '../../components/StatusBadge'
import { useConvertToLocal } from '../../hooks/useConvertToLocalTime'
import { UserType } from '../../types/user'
import { Button, Table, TableColumnsType } from 'antd'

export type TaskListTableProps = {
  taskList: TaskType[]
  userList: UserType[]
}

export default function TaskListTable({
  taskList,
  userList,
}: TaskListTableProps) {
  const { t } = useTranslation()
  const router = useRouter()
  const { toLocalDate, toLocalDateTime } = useConvertToLocal()

  const labelName = (id: string) => {
    const user = userList && userList.find((user) => user.id === id)
    return user ? user.username : ''
  }
  const columns: TableColumnsType = [
    { title: t('task.label.create'), dataIndex: 'create' },
    { title: t('task.label.title'), dataIndex: 'title' },
    { title: t('task.label.description'), dataIndex: 'description' },
    { title: t('task.label.status'), dataIndex: 'status' },
    { title: t('task.label.assignee'), dataIndex: 'assignee' },
    { title: t('task.label.start_date'), dataIndex: 'start_date' },
    { title: t('task.label.end_date'), dataIndex: 'end_date' },
    { title: t('task.label.edit'), dataIndex: 'edit' },
    { title: t('task.label.update'), dataIndex: 'update' },
  ]
  const dataSource = taskList.map((task) => ({
    key: task.id,
    title: task.title,
    create: toLocalDateTime(task.created_at),
    description: task.description,
    status: <StatusBadge status={task.status} />,
    assignee: task.assignee ? labelName(task.assignee) : '',
    start_date: task.start_date ? toLocalDate(task.start_date) : '',
    end_date: task.end_date ? toLocalDate(task.end_date) : '',
    edit: (
      <Button onClick={() => router.push(`/task/${task.id}`)}>
        {t('form.edit')}
      </Button>
    ),
    update: toLocalDateTime(task.updated_at),
  }))

  return <Table columns={columns} dataSource={dataSource} />
}