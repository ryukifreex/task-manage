export interface TaskType  {
  id: number
  title: string
  description?: string
  completed: boolean
}

export interface CreateTaskType  {
  title: string
  description?: string
  completed: boolean
}
