export type UserType = {
  id: string
  email: string
  is_active: boolean
  is_admin: boolean
  is_superuser: boolean
  username: string
  first_name: string
  last_name: string
  organization: string
}

export type LoginFormType = {
  email: string
  password: string
}
