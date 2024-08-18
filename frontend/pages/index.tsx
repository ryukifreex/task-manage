import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next'
import { Button, Flex, Loader, Notification, Table } from '@mantine/core';
import { TaskType } from '../types/task';
import AddTaskModal from '../components/AddTaskModal';
import { useGetTask } from '../hooks/api/useTask';

// TODO分割
export default function Home() {
  const { t } = useTranslation('common')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskList, setTaskList] = useState<TaskType[]>([])
  const [{ data, loading, error }, getTaskList] = useGetTask()

  // get Tasks
  useEffect(() => {
    getTaskList()
  }, [])

  useEffect(() => {
    if (data) {
      setTaskList(data)
    }
  }, [data, error])

  const head = (
    <Table.Tr>
      <Table.Th>{t('task.title')}</Table.Th>
      <Table.Th>{t('task.description')}</Table.Th>
      <Table.Th>{t('task.completed')}</Table.Th>
    </Table.Tr>
  )
  const rows = taskList.map((task) => (
    <Table.Tr key={task.id}>
      <Table.Td>{task.title}</Table.Td>
      <Table.Td>{task.description}</Table.Td>
      <Table.Td>{task.completed ? "true" : "false"}</Table.Td>
    </Table.Tr>
  ))

  if (error) {
    return (
      <Notification color="red" title="Error">{t('task.getError')}</Notification>
    )
  }

  return (
    <>
      <h1>{t("app.name")}</h1>
      {loading && <Loader />}
      <Flex justify={"flex-end"} mb={"md"}>
      <Button onClick={() => setIsModalOpen(true)}>{t('task.add')}</Button>
      </Flex>
      <AddTaskModal
        opened={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          getTaskList()
        }}
      />

      <Table miw={700}>
        <Table.Thead>{head}</Table.Thead>
        <Table.Tbody>
          {rows}
        </Table.Tbody>
      </Table>
    </>
  )
}
