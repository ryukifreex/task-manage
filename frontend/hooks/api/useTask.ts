import useAxios from 'axios-hooks'
import { taskRequestConfig } from '../../services/task'
import { CreateTaskType, TaskType } from '../../types/task'

export const useGetTask = () => {
  return useAxios(taskRequestConfig('GET'), { manual: true })
}

export const useCreateTask = () => {
   const [{ data, loading, error }, execute] = useAxios(taskRequestConfig('POST'), { manual: true });

  const createTask = (taskData: CreateTaskType) => {
    const config = taskRequestConfig('POST', taskData);
    return execute(config);
  };

  return [{ data, loading, error }, createTask] as const;
}

