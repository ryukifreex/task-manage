import React, { createContext, useContext, ReactNode } from 'react'
import useSWR from 'swr'
import { fetcher } from '../hooks/fetcher'
import { API_BASE_URL } from '../config/api'
import { TaskStatusListType } from '../types/task'
import { useGetTaskStatusList } from '../hooks/task/useGetTaskStatusList'

// コンテキストの作成
const TaskStatusContext = createContext<
  | {
      statusList: TaskStatusListType | undefined
      error: any
    }
  | undefined
>(undefined)

// Providerの作成
export const TaskStatusProvider = ({ children }: { children: ReactNode }) => {
  const { data: statusList, error } = useGetTaskStatusList()

  return (
    <TaskStatusContext.Provider value={{ statusList, error }}>
      {children}
    </TaskStatusContext.Provider>
  )
}

// Contextのカスタムフック
export const useTaskStatusList = () => {
  const context = useContext(TaskStatusContext)
  if (!context) {
    throw new Error('status error')
  }
  return context
}
