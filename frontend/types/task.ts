// task model
export type TaskType = {
  id: number
  title: string
  description?: string
  status: string
}

// on create
export type CreateTaskType = {
  title: string
  description?: string
}

// on update
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
// TaskModal component
export type AddTaskModalProps = {
  opened: boolean
  onClose: () => void
}
