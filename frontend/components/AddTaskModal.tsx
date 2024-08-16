import { Modal, Button, TextInput } from '@mantine/core';
import { useState } from 'react';
import { createTask } from '../services/task';

interface AddTaskModalProps {
  opened: boolean;
  onClose: () => void;
}
export default function AddTaskModal({ opened, onClose }: AddTaskModalProps) {
  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('');

  const handleAddTask = async () => {
    if (newTitle.trim()) {
        const response = await createTask({
          title: newTitle,
          description: newDescription,
          completed: false
        })
        setNewTitle('')
        setNewDescription('')
        onClose()
      }
    }

  return (
    <>
      <Modal opened={opened} onClose={onClose} title="add task">
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
        <Button onClick={handleAddTask}>aAdd Task</Button>
      </Modal>

    </>
  )
}