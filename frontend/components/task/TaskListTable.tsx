import { useTranslation } from 'react-i18next'
import { Button, Table } from '@mantine/core'
import { TaskType } from '../../types/task'
import { useRouter } from 'next/router'
import StatusBadge from '../StatusBadge'

export type TaskListTableProps = {
  taskList: TaskType[]
}

// TODOラベルごとにソート順を作って
export default function TaskListTable({ taskList }: TaskListTableProps) {
  const { t } = useTranslation()
  const router = useRouter()

  const head = (
    <Table.Tr>
      <Table.Th>{t('task.label.create')}</Table.Th>
      <Table.Th>{t('task.label.title')}</Table.Th>
      <Table.Th>{t('task.label.description')}</Table.Th>
      <Table.Th>{t('task.label.status')}</Table.Th>
      <Table.Th>{t('task.label.edit')}</Table.Th>
      <Table.Th>{t('task.label.update')}</Table.Th>
    </Table.Tr>
  )

  const rows = taskList.map((task) => (
    <Table.Tr key={task.id}>
      <Table.Td>{task.created_at}</Table.Td>
      <Table.Td>{task.title}</Table.Td>
      <Table.Td>{task.description}</Table.Td>
      <Table.Td>
        <StatusBadge status={task.status} />
      </Table.Td>
      <Table.Td>
        <Button onClick={() => router.push(`/task/${task.id}`)}>
          {t(`task.form.edit`)}
        </Button>
      </Table.Td>
      <Table.Td>{task.updated_at}</Table.Td>
    </Table.Tr>
  ))

  return (
    <>
      <Table miw={600}>
        <Table.Thead>{head}</Table.Thead>
        {taskList && <Table.Tbody>{rows}</Table.Tbody>}
      </Table>
    </>
  )
}
