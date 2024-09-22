import { useForm, SubmitHandler } from 'react-hook-form'
import { TextInput, PasswordInput, Paper, Group, Button, Stack, Text } from '@mantine/core'
import { useAuth } from '../context/AuthContext' // AuthContextをインポート

interface LoginFormInputs {
  email: string
  password: string
}

const LoginForm: React.FC = () => {
  const { login } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>()

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log(data)
    login(data.email, data.password) // ログイン成功後に認証状態を更新
  }

  return (
    <Paper radius="md" p="xl" withBorder>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="md">
          <TextInput
            label="Email"
            placeholder="your@email.com"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+$/, message: 'Invalid email format' },
            })}
            error={errors.email && <Text color="red">{errors.email.message}</Text>}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            {...register('password', {
              required: 'Password is required',
              // minLength: { value: 6, message: 'Password must be at least 6 characters' },
            })}
            error={errors.password && <Text color="red">{errors.password.message}</Text>}
          />
          <Group justify="flex-end" mt="md">
            <Button type="submit">Login</Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  )
}

export default LoginForm
