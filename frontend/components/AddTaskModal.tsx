import { Modal, Button, TextInput, Flex } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useCreateTask } from '../hooks/api/useTask'
import { useTranslation } from 'react-i18next'
import { AddTaskModalProps } from '../types/task'

export default function AddTaskModal({ opened, onClose }: AddTaskModalProps) {
  const { t } = useTranslation()
  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [{ data, error }, createTask] = useCreateTask()

  const onSubmit = async () => {
    if (newTitle.trim()) {
      createTask({
        title: newTitle,
        description: newDescription,
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
      <Modal opened={opened} onClose={onClose} title={t('menu.task.add')}>
        <TextInput
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder={t('task.form.title')}
          mt="md"
        />

        <TextInput
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder={t('task.form.description')}
          mt="md"
        />

        <Flex justify={'flex-end'} mt={'md'}>
          <Button onClick={onSubmit}>{t('task.form.submit')}</Button>
        </Flex>
      </Modal>
    </>
  )
}
