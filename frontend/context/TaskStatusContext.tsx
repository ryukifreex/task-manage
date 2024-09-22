import React, { createContext, useContext, ReactNode } from 'react'
import { TaskStatusListType } from '../types/task'
import { useGetTaskStatusList } from '../hooks/task/useGetTaskStatusList'

type TaskStatusContextType =
  | {
      statusList: TaskStatusListType | undefined
      error: any
    }
  | undefined

// Context
const TaskStatusContext = createContext<TaskStatusContextType>(undefined)

// Provider
export const TaskStatusProvider = ({ children }: { children: ReactNode }) => {
  const { data: statusList, error } = useGetTaskStatusList()

  return (
    <TaskStatusContext.Provider value={{ statusList, error }}>
      {children}
    </TaskStatusContext.Provider>
  )
}

// Contextのhook
export const useTaskStatusList = () => {
  const context = useContext(TaskStatusContext)
  if (!context) {
    throw new Error('useTaskStatusList must be within a TaskStatusProvider')
  }
  return context
}
