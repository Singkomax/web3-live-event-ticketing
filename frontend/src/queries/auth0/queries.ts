import { QueryFunctionContext, useQuery } from "react-query"
import { GetUserOptions, UserProfile } from "./types"
import { getUser } from "./api"

export const auth0QueryKeys = {
  user: [{ scope: 'auth0-user'}] as const,
  getUser: (userId: string) => [{ ...auth0QueryKeys.user[0], userId }] as const,
}

const fetchUser = async ({
  queryKey: [{ userId }]
}: QueryFunctionContext<ReturnType<(typeof auth0QueryKeys)['getUser']>>) => {
  return getUser({ userId })
}

export const useGetUserProfile = <T = UserProfile>(userId: string, options?: GetUserOptions<T>) => {
  const query = useQuery({
    queryKey: auth0QueryKeys.getUser(userId),
    queryFn: fetchUser,
    enabled: options?.enabled !== false,
    ...options
  })

  return query
}