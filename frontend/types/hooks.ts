import { AxiosPromise } from 'axios'

export type UseAxiosResult<T> = [
  { data?: T; loading: boolean; error?: Error },
  () => AxiosPromise<T>
]

export type UseAxiosResultWithData<T> = [
  { data?: T; loading: boolean; error?: Error },
  (data: T) => AxiosPromise<T>
]

export type UseAxiosResultWithId<T> = [
  { data?: T; loading: boolean; error?: Error },
  (id: number, data?: T) => AxiosPromise<T>
]
