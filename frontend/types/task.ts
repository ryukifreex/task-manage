export type TaskType = {
  id: number
  title: string
  description?: string
  status: string
  created_at?: string
  updated_at?: string
}

export type CreateTaskType = {
  title: string
  description?: string
  status?: string
}

export type UpdateTaskType = {
  title: string
  description?: string
  status?: string
}

export type TaskFormType = {
  id?: number
  title: string
  description?: string
  status?: string
}
