export type TaskType = {
  id: number
  title: string
  description?: string
  status: TaskStatusType
  assigned_to?: string
  created_by: string
  end_date?: Date
  start_date?: Date
  created_at?: string
  updated_at?: string
}

export type TaskFormType = {
  id?: number
  title: string
  description?: string
  status: string
}

export type TaskStatusType = 'open' | 'in_progress' | 'done' | 'closed' | 'pending'

export type TaskStatusListType = {
  [key in TaskStatusType]: TaskStatusType
}
