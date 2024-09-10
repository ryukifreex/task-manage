import { Title } from '@mantine/core'
import TaskCreate from '../../components/task/TaskCreate'
import { useTranslation } from 'react-i18next'

export default function Create() {
  const { t } = useTranslation()

  return (
    <>
      <Title order={2}>{t('menu.task.create')}</Title>
      <TaskCreate />
    </>
  )
}
