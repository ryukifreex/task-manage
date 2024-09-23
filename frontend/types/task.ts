export type TaskType = {
  id: number
  title: string
  description?: string
  status: TaskStatusType
  assignee?: string
  created_by: string
  end_date?: string
  start_date?: string
  created_at?: string
  updated_at?: string
}

export type TaskFormType = {
  id?: number
  title: string
  description?: string
  status: string
  assignee?: string
  end_date?: string
  start_date?: string
}

export type TaskStatusType = 'open' | 'in_progress' | 'done' | 'closed' | 'pending'

export type TaskStatusListType = {
  [key in TaskStatusType]: TaskStatusType
}
