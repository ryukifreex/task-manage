import React, { createContext, useContext, ReactNode, useMemo } from 'react'
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

  const contextValue = useMemo(() => ({ statusList, error }), [statusList, error])
  return <TaskStatusContext.Provider value={contextValue}>{children}</TaskStatusContext.Provider>
}

// Contextのhook
export const useTaskStatusList = () => {
  const context = useContext(TaskStatusContext)
  if (!context) {
    throw new Error('useTaskStatusList must be within a TaskStatusProvider')
  }
  return context
}
