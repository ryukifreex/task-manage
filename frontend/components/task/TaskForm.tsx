import { Button, Form, Input, Select, Space, Flex } from 'antd'
import { useTranslation } from 'react-i18next'
import { SubmitHandler, UseFormReturn, Controller } from 'react-hook-form'
import { TaskStatusType, TaskFormType } from '../../types/task'
import { useTaskStatusList } from '../../context/TaskStatusContext'
import { useGetUserList } from '../../hooks/user/useGetUserList'
import ReactDatePicker from 'react-datepicker'

export type TaskFormProps = {
  useForm: UseFormReturn<TaskFormType>
  onSubmit: SubmitHandler<TaskFormType>
}

export default function TaskForm({ useForm, onSubmit }: TaskFormProps) {
  const { t, ready } = useTranslation()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm

  const { statusList } = useTaskStatusList()
  const { data: userList, error, mutate } = useGetUserList()

  return (
    <Form onFinish={handleSubmit(onSubmit)}>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        {/* Title */}
        <Form.Item
          label={t('task.label.title')}
          validateStatus={errors.title ? 'error' : ''}
          help={errors.title?.message}
        >
          <Controller
            name="title"
            control={control}
            rules={{
              maxLength: {
                value: 100,
                message: t('form.validation.maxLength'),
              },
              required: t('form.validation.required'),
            }}
            render={({ field }) => (
              <Input placeholder={t('task.label.title')} {...field} />
            )}
          />
        </Form.Item>

        {/* Description */}
        <Form.Item
          label={t('task.label.description')}
          validateStatus={errors.description ? 'error' : ''}
          help={errors.description?.message}
        >
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input.TextArea
                placeholder={t('task.label.description')}
                {...field}
                autoSize={{ minRows: 4 }}
              />
            )}
          />
        </Form.Item>

        {/* Status */}
        <Form.Item
          label={t('task.label.status')}
          validateStatus={errors.status ? 'error' : ''}
          help={errors.status?.message}
        >
          {ready && statusList && (
            <Controller
              name="status"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  placeholder={t('task.label.status')}
                  options={Object.keys(statusList).map((status) => ({
                    value: status,
                    label: t(`task.status.${status}`),
                  }))}
                  {...field}
                  onChange={(value) => field.onChange(value)}
                />
              )}
            />
          )}
        </Form.Item>

        {/* Assignee */}
        <Form.Item label={t('task.label.assignee')}>
          {userList && (
            <Controller
              name="assignee"
              control={control}
              render={({ field }) => (
                <Select
                  placeholder={t('task.label.assignee')}
                  options={userList.map((user) => ({
                    value: user.id,
                    label: user.username,
                  }))}
                  {...field}
                  onChange={field.onChange}
                />
              )}
            />
          )}
        </Form.Item>

        {/* Start Dates */}
        <Controller
          name="start_date"
          control={control}
          render={({ field }) => (
            <Form.Item
              label={t('task.label.start_date')}
              help={errors.start_date?.message}
            >
              <ReactDatePicker
                dateFormat={t('task.date_format')}
                selected={field.value}
                onChange={field.onChange}
              />
            </Form.Item>
          )}
        />

        {/* End Dates */}
        <Controller
          name="end_date"
          control={control}
          render={({ field }) => (
            <Form.Item
              label={t('task.label.end_date')}
              help={errors.end_date?.message}
            >
              <ReactDatePicker
                dateFormat={t('task.date_format')}
                selected={field.value}
                onChange={field.onChange}
              />
            </Form.Item>
          )}
        />

        <Button htmlType="submit">{t('form.submit')}</Button>
      </Space>
    </Form>
  )
}
