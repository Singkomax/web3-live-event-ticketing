import { QueryFunctionContext, useQuery } from "react-query"
import { getAllEvents } from "./api"
import { AllEventsQnFuncResponse, GetAllEventsOptions } from "./types"

export const qnFuncQueryKeys = {
  allEvents: [{ scope: 'qn-func-all-events'}] as const,
  getAllEvents: (filter?: string) => [{ ...qnFuncQueryKeys.allEvents[0], filter }] as const,
}

const fetchAllEvents = async ({
  queryKey: [{ filter }]
}: QueryFunctionContext<ReturnType<(typeof qnFuncQueryKeys)['getAllEvents']>>) => {
  return getAllEvents(filter)
}

export const useGetAllEvents = <T = AllEventsQnFuncResponse>(filter?: string, options?: GetAllEventsOptions<T>) => {
  const query = useQuery({
    queryKey: qnFuncQueryKeys.getAllEvents(filter),
    queryFn: fetchAllEvents,
    enabled: options?.enabled !== false,
    ...options
  })

  return query
}