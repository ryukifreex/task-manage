import React from 'react';
import { Container, Group, Anchor, Paper } from '@mantine/core';

export default function Navbar() {
  return (
    <Paper style={{ backgroundColor: '#282c34' }}>
      <Container>
        <Group justify="center" gap="xl">
          <Anchor href="/" color="white" style={{ textDecoration: 'none' }}>
            Home
          </Anchor>
          <Anchor href="/tasks" color="white" style={{ textDecoration: 'none' }}>
            Tasks
          </Anchor>
          <Anchor href="/create-task" color="white" style={{ textDecoration: 'none' }}>
            Create Task
          </Anchor>
        </Group>
      </Container>
    </Paper>
  )
}
