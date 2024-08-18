import { Modal, Button, TextInput, Flex } from '@mantine/core';
import { useEffect, useState } from 'react';
import { CreateTaskType } from '../types/task'
import { useCreateTask } from '../hooks/api/useTask';

interface AddTaskModalProps {
  opened: boolean;
  onClose: () => void;
}

export default function AddTaskModal({ opened, onClose }: AddTaskModalProps) {
  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('');
  const [{ data, error }, createTask] = useCreateTask()

  const handleAddTask = async () => {
    if (newTitle.trim()) {
      createTask({
        title: newTitle,
        description: newDescription,
        completed: false,
      })
    }
  }

  useEffect(() => {
    if (data) {
      setNewTitle('')
      setNewDescription('')
      onClose()
    }
    if (error) console.log({ error })
  }, [data, error])

  return (
    <>
      <Modal opened={opened} onClose={onClose} title="Task">
        <TextInput
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Add new task"
          mt="md"
        />
        <TextInput
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Add new description"
          mt="md"
        />
        <Flex justify={"flex-end"} mt={"md"}>
          <Button onClick={handleAddTask}>Add Task</Button>
        </Flex>
      </Modal>

    </>
  )
}