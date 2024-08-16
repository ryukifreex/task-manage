import { useState } from 'react';
import { TextInput, Textarea, Checkbox, Button, Box, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { CreateTaskType } from '../types/task';
import axios from 'axios';



export default function CreateTask() {
  const form = useForm<CreateTaskType>({
    initialValues: {
      title: '',
      description: '',
      completed: false,
    },

    validate: {
      title: (value) => (value ? null : 'Please input the task title!'),
    },
  });

  const onSubmit = async (values: CreateTaskType) => {
    try {
      await axios.post('http://localhost:8000/api/tasks/', values);
      showNotification({
        title: 'Success',
        message: 'Task created successfully!',
        color: 'green',
      });
      form.reset();
    } catch (error) {
      console.error('Error creating task:', error);
      showNotification({
        title: 'Error',
        message: 'Failed to create task.',
        color: 'red',
      });
    }
  };

  return (
    <Box style={{ padding: '20px' }}>
      <Title order={1}>Create New Task</Title>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          label="Title"
          placeholder="Title"
          {...form.getInputProps('title')}
          required
        />
        <Textarea
          label="Description"
          placeholder="Description"
          {...form.getInputProps('description')}
          autosize
          minRows={4}
        />
        <Checkbox
          label="Completed"
          {...form.getInputProps('completed', { type: 'checkbox' })}
        />
        <Button type="submit" mt="md">
          Submit
        </Button>
      </form>
    </Box>
  );
}
