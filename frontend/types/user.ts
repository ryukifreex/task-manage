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

export type UserFormType = {
  id?: string
  organization?: string
  email: string
  password: string
  is_admin?: boolean
  username: string
  first_name?: string
  last_name?: string
}

export type LoginFormType = {
  email: string
  password: string
}
