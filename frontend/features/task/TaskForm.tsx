import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  Typography,
} from 'antd'
import { useTranslation } from 'react-i18next'
import { SubmitHandler, UseFormReturn, Controller } from 'react-hook-form'
import { TaskFormType, TaskStatusListType } from '../../types/task'
import { useGetUserList } from '../../hooks/user/useGetUserList'
import { useAuth } from '../../context/AuthContext'
import dayjs from 'dayjs'

export type TaskFormProps = {
  useForm: UseFormReturn<TaskFormType>
  onSubmit: SubmitHandler<TaskFormType>
  statusList: TaskStatusListType
  formError?: string
}

export default function TaskForm({
  useForm,
  onSubmit,
  statusList,
  formError,
}: TaskFormProps) {
  const { t, ready } = useTranslation()
  const { token } = useAuth()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm

  const { data: userList, error, mutate } = useGetUserList(token)

  return (
    <Row justify="center" align="middle">
      <Col xs={24} sm={12} md={12}>
        {formError && (
          <Typography.Text type="danger">
            {t(`form.validation.${formError}`)}
          </Typography.Text>
        )}

        <Form onFinish={handleSubmit(onSubmit)}>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            {/* Title */}
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
                <Form.Item
                  label={t('task.label.title')}
                  validateStatus={errors.title ? 'error' : ''}
                  help={errors.title?.message}
                >
                  <Input placeholder={t('task.label.title')} {...field} />
                </Form.Item>
              )}
            />

            {/* Description */}
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Form.Item
                  label={t('task.label.description')}
                  validateStatus={errors.description ? 'error' : ''}
                  help={errors.description?.message}
                >
                  <Input.TextArea
                    placeholder={t('task.label.description')}
                    {...field}
                    autoSize={{ minRows: 4 }}
                  />
                </Form.Item>
              )}
            />

            {/* Status */}
            {ready && statusList && (
              <Controller
                name="status"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Form.Item
                    label={t('task.label.status')}
                    validateStatus={errors.status ? 'error' : ''}
                    help={errors.status?.message}
                  >
                    <Select
                      placeholder={t('task.label.status')}
                      options={Object.keys(statusList).map((status) => ({
                        value: status,
                        label: t(`task.status.${status}`),
                      }))}
                      {...field}
                      onChange={(value) => field.onChange(value)}
                    />
                  </Form.Item>
                )}
              />
            )}

            {/* Assignee */}
            {userList && (
              <Controller
                name="assignee"
                control={control}
                render={({ field }) => (
                  <Form.Item label={t('task.label.assignee')}>
                    <Select
                      placeholder={t('task.label.assignee')}
                      options={userList.map((user) => ({
                        value: user.id,
                        label: user.username,
                      }))}
                      {...field}
                      onChange={field.onChange}
                    />
                  </Form.Item>
                )}
              />
            )}

            {/* Start Dates */}
            <Row>
              <Col md={14}>
                <Controller
                  name="start_date"
                  control={control}
                  render={({ field }) => (
                    <Form.Item
                      label={t('task.label.start_date')}
                      help={errors.start_date?.message}
                    >
                      <DatePicker
                        format={t('task.date_format')}
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(date) => {
                          field.onChange(date.toISOString())
                        }}
                      />
                    </Form.Item>
                  )}
                />
              </Col>

              {/* End Dates */}
              <Col md={16}>
                <Controller
                  name="end_date"
                  control={control}
                  render={({ field }) => (
                    <Form.Item
                      label={t('task.label.end_date')}
                      help={errors.end_date?.message}
                    >
                      <DatePicker
                        format={t('task.date_format')}
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(date) => field.onChange(date)}
                      />
                    </Form.Item>
                  )}
                />
              </Col>
            </Row>

            <Button htmlType="submit">{t('form.submit')}</Button>
          </Space>
        </Form>
      </Col>
    </Row>
  )
}
