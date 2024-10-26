import { UseQueryOptions } from "react-query"
import { qnKvQueryKeys } from "./queries"

export type KvSet = {
  code: number
  msg: string
  data: {
    value: string
  }
}

export type GetKvSetOptions<T> = Omit<
  UseQueryOptions<
  KvSet,
    unknown,
    T,
    ReturnType<typeof qnKvQueryKeys.getKvSet>
  >,
  'queryKey' | 'queryFn'
>