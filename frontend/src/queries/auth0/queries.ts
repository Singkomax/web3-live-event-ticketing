import { QueryFunctionContext, useQuery } from "react-query"
import { GetUserOptions, UserProfile } from "./types"
import { getUser } from "./api"
import { useGetKvSet } from "../quicknode"
import { valueKvSetSelector } from "../quicknode/kv/selectors"

export const auth0QueryKeys = {
  user: [{ scope: 'auth0-user'}] as const,
  getUser: (userId: string, auth0ApiKey: string) => [{ ...auth0QueryKeys.user[0], userId, auth0ApiKey }] as const,
}

const fetchUser = async ({
  queryKey: [{ userId, auth0ApiKey }]
}: QueryFunctionContext<ReturnType<(typeof auth0QueryKeys)['getUser']>>) => {
  return getUser({ userId, auth0ApiKey })
}

export const useGetUserProfile = <T = UserProfile>(userId: string, options?: GetUserOptions<T>) => {
  const auth0ApiKey = useGetKvSet('AUTH0_MANAGEMENT_API_TOKEN', {
    select: valueKvSetSelector
  })

  const query = useQuery({
    queryKey: auth0QueryKeys.getUser(userId, auth0ApiKey.data ?? ''),
    queryFn: fetchUser,
    ...options,
    enabled: options?.enabled !== false && !!auth0ApiKey.data,
  })

  return query
}