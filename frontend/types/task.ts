export type TaskType = {
  id: number
  title: string
  description?: string
  status: TaskStatusType
  assignee?: string
  created_by: string
  end_date?: Date
  start_date?: Date
  created_at?: Date
  updated_at?: Date
}

export type TaskFormType = {
  id?: number
  title: string
  description?: string
  status: string
  assignee?: string
  end_date?: Date
  start_date?: Date
}

export type TaskStatusType = 'open' | 'in_progress' | 'done' | 'closed' | 'pending'

export type TaskStatusListType = {
  [key in TaskStatusType]: TaskStatusType
}
