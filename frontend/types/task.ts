export type TaskType = {
  id: number
  title: string
  description?: string
  status: TaskStatusType
  created_at?: string
  updated_at?: string
}

export type TaskFormType = {
  title: string
  description?: string
  status: string
}

export type TaskStatusType =
  | 'open'
  | 'in_progress'
  | 'done'
  | 'closed'
  | 'pending'

export type TaskStatusListType = {
  [key in TaskStatusType]: string
}
