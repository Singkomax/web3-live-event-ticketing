import { useMutation, useQueryClient } from "react-query"
import { auth0QueryKeys } from "./queries"
import { updateUser } from "./api"
import { PatchUserPayload } from "./types"

export const usePatchUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ userId, userProfile, auth0ApiKey }: PatchUserPayload) => {
      return await updateUser({ userId, userProfile, auth0ApiKey })
    },
    onSettled: async () => {
      queryClient.invalidateQueries({ queryKey: auth0QueryKeys.user })
    },
  })
}