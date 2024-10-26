import { QueryFunctionContext, useQuery } from "react-query"
import { retrieveSet } from "./api"
import { GetKvSetOptions, KvSet } from "./types"

export const qnKvQueryKeys = {
  kvSet: [{ scope: 'qn-kv-set'}] as const,
  getKvSet: (key: string) => [{ ...qnKvQueryKeys.kvSet[0], key }] as const,
}

const fetchKvSet = async ({
  queryKey: [{ key }]
}: QueryFunctionContext<ReturnType<(typeof qnKvQueryKeys)['getKvSet']>>) => {
  return retrieveSet(key)
}

export const useGetKvSet = <T = KvSet>(key: string, options?: GetKvSetOptions<T>) => {
  const query = useQuery({
    queryKey: qnKvQueryKeys.getKvSet(key),
    queryFn: fetchKvSet,
    enabled: options?.enabled !== false,
    ...options
  })

  return query
}