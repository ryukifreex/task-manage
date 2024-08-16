import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next'
import { Button, TextInput, List, Loader, Notification, Table, Checkbox, Group } from '@mantine/core';
import { getTaskList, createTask } from '../services/task';
import { TaskType, CreateTaskType } from '../types/task';
import { useDisclosure } from '@mantine/hooks';
import AddTaskModal from '../components/AddTaskModal';


// TODO分割
export default function Home() {
  const { t } = useTranslation('common')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskList, setTaskList] = useState<TaskType[]>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [opened, { open, close }] = useDisclosure(false);
  // get Tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTaskList();
        if (response instanceof Error) {
          setError(t('tasks.getError'));
        } else {
          setTaskList(response.data);
        }
      } catch (err) {
        setError('An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const rows = taskList.map((task) => (
    <Table.Tr key={task.id}>
      <Table.Td>{task.title}</Table.Td>
      <Table.Td>{task.description}</Table.Td>
      <Table.Td>{task.completed}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <h1>Task Manage</h1>
      {loading && <Loader />}
      {error && <Notification color="red" title="Error">{error}</Notification>}
      <Button onClick={openModal}>Add</Button>
      <AddTaskModal opened={isModalOpen} onClose={closeModal} />
      <Table miw={700}>
        <Table.Tbody>
          {rows}
        </Table.Tbody>
      </Table>
    </>
  )
}
