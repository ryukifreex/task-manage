import { useTranslation } from 'react-i18next'
import { Button, Table } from '@mantine/core'
import { TaskType } from '../../types/task'
import { useRouter } from 'next/router'
import StatusBadge from '../StatusBadge'
import { CSSProperties } from 'react'
import { useConvertToLocalTime } from '../../hooks/useConvertToLocalTime'

export type TaskListTableProps = {
  taskList: TaskType[]
}

// TODOラベルごとにソート順を作って
export default function TaskListTable({ taskList }: TaskListTableProps) {
  const { t } = useTranslation()
  const router = useRouter()
  const thStyle: CSSProperties = { textAlign: 'center' }
  const tdFullStyle: CSSProperties = {
    textWrap: 'nowrap',
  }
  const tdReadStyle: CSSProperties = {
    maxWidth: '10rem',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  }

  const head = (
    <Table.Tr>
      <Table.Th style={{ ...thStyle }}>{t('task.label.create')}</Table.Th>
      <Table.Th style={{ ...thStyle }}>{t('task.label.title')}</Table.Th>
      <Table.Th style={{ ...thStyle }}>{t('task.label.description')}</Table.Th>
      <Table.Th style={{ ...thStyle }}>{t('task.label.status')}</Table.Th>
      <Table.Th style={{ ...thStyle }}>{t('task.label.edit')}</Table.Th>
      <Table.Th style={{ ...thStyle }}>{t('task.label.update')}</Table.Th>
    </Table.Tr>
  )

  const rows = taskList.map((task) => (
    <Table.Tr key={task.id}>
      <Table.Td style={{ ...tdFullStyle }}>{useConvertToLocalTime(task.created_at)}</Table.Td>
      <Table.Td style={{ ...tdReadStyle }}>{task.title}</Table.Td>
      <Table.Td style={{ ...tdReadStyle }}>{task.description}</Table.Td>
      <Table.Td style={{ ...tdFullStyle }}>
        <StatusBadge status={task.status} />
      </Table.Td>
      <Table.Td style={{ ...tdFullStyle }}>
        <Button onClick={() => router.push(`/task/${task.id}`)}>{t('form.edit')}</Button>
      </Table.Td>
      <Table.Td style={{ ...tdFullStyle }}>{useConvertToLocalTime(task.updated_at)}</Table.Td>
    </Table.Tr>
  ))

  return (
    <>
      <Table miw={600} striped={true} stripedColor={'#fafafa'}>
        <Table.Thead>{head}</Table.Thead>
        {taskList && <Table.Tbody>{rows}</Table.Tbody>}
      </Table>
    </>
  )
}
